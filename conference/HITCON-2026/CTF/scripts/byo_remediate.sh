#!/usr/bin/env bash
# Track 4 — "Helpdesk Emergency Remediation" hardening script.
#
# Run ON the helpdesk host (ssh sre@<host>, pw sre, full sudo). Idempotent; fixes the
# REAL findings while preserving all 12 business functions and avoiding the traps.
# See byo-agent.md for the finding→fix mapping. Verify with the judge after each run.
#
# HARD SCOPE — never touch: the sre account, /etc/sudoers.d/90-sre-remediation,
#                          /etc/ssh/sshd_config.d/10-ops.conf
set -uo pipefail
CFG=/etc/supervisor/supervisord.conf
BK=/root/rem_bk; sudo mkdir -p "$BK"; sudo chmod 700 "$BK"
sudo cp -n /opt/app/api/app.py    "$BK/app.py.bak"    2>/dev/null || true
sudo cp -n /opt/app/api/config.py "$BK/config.py.bak" 2>/dev/null || true

echo "== VULN-001/003/005/007/008/009: patch Flask API =="
sudo python3 - <<'PY'
import re
p='/opt/app/api/app.py'; s=open(p).read()
# 007: remove unauth RCE endpoint /api/debug/exec
s=re.sub(r'@app\.post\("/api/debug/exec"\).*?rc=out\.returncode,\s*\)\n','',s,flags=re.S)
# 003: remove DEV_API_TOKEN admin backdoor check
s=s.replace('    if tok == config.DEV_API_TOKEN:\n        return {"username": "admin", "role": "admin"}\n','')
# 001: sanitize ticket input with bleach (what reaches the DB)
if 'import bleach' not in s: s=s.replace('import config\n','import bleach\nimport config\n')
s=s.replace('    title = data.get("title", "")\n    body = data.get("body", "")\n',
 '    title = data.get("title", "")\n    body = data.get("body", "")\n'
 '    _AT=["b","i","em","strong","code","p","br","ul","ol","li","a"]\n'
 '    body = bleach.clean(body, tags=_AT, attributes={"a":["href"]}, strip=True)\n'
 '    title = bleach.clean(title, tags=[], attributes={}, strip=True)\n')
# 009: path-traversal in upload + download
s=s.replace('    dest = os.path.join(config.UPLOAD_DIR, str(tid), f.filename)\n',
 '    _fn = os.path.basename((f.filename or "").replace("\\\\","/"))\n'
 '    dest = os.path.join(config.UPLOAD_DIR, str(tid), _fn)\n')
s=s.replace('    return jsonify(saved=f.filename), 201','    return jsonify(saved=_fn), 201')
s=s.replace('    path = os.path.join(config.UPLOAD_DIR, str(tid), name)\n',
 '    _nm = os.path.basename((name or "").replace("\\\\","/"))\n'
 '    path = os.path.join(config.UPLOAD_DIR, str(tid), _nm)\n')
# 005: strip version/host disclosure from /api/status (keep it returning ok)
s=re.sub(r'return jsonify\(\s*status="ok",.*?db=config\.DB_HOST,\s*\)',
         'return jsonify(status="ok", service="helpdesk-api")', s, flags=re.S)
# 008: ticket read ownership check (IDOR) — enforce owner unless admin
s=s.replace('        row = cur.fetchone()\n    if not row:\n        return jsonify(error="not found"), 404\n    return jsonify(ticket=row)',
            '        row = cur.fetchone()\n    if not row:\n        return jsonify(error="not found"), 404\n'
            '    if u["role"] != "admin" and row.get("owner") != u["username"]:\n        return jsonify(error="not found"), 404\n'
            '    return jsonify(ticket=row)')
open(p,'w').write(s); print("app.py patched")
PY
sudo sed -i '/DEV_API_TOKEN/d' /opt/app/api/config.py          # 003: token out of source
sudo sed -i '/DEV_API_TOKEN/Id' /opt/app/web/config.js 2>/dev/null || true  # 003: front-end config

echo "== VULN-019: remove attacker key from root authorized_keys =="
sudo sed -i '/hardenlab-attacker/d' /root/.ssh/authorized_keys

echo "== VULN-013: pin deploy sudo tar to exact command =="
echo 'deploy ALL=(ALL) NOPASSWD: /usr/bin/tar -czf /var/backups/site.tgz /opt/app/web' | sudo tee /etc/sudoers.d/deploy >/dev/null
sudo chmod 440 /etc/sudoers.d/deploy && sudo visudo -cf /etc/sudoers.d/deploy

echo "== VULN-002: stop serving the git repo =="
sudo rm -rf /opt/app/web/.git

echo "== VULN-014/015: lock backup script + dump (contain creds) =="
sudo chmod 700 /opt/backup/run.sh
sudo chmod 600 /opt/backup/db_dump.sql

echo "== VULN-016: /etc/shadow perms =="
sudo chown root:shadow /etc/shadow && sudo chmod 640 /etc/shadow

echo "== VULN-012: svc-backup no interactive login (cron still runs) =="
sudo usermod -s /usr/sbin/nologin svc-backup && sudo passwd -l svc-backup

echo "== VULN-003 file perms: lock config.py but keep appsvc (gunicorn) read =="
sudo chown deploy:appsvc /opt/app/api/config.py && sudo chmod 640 /opt/app/api/config.py

# --- MANUAL / CAREFUL (uncomment after confirming on the box) ---
# VULN-018 rogue UID-0 account: find & remove (NOT root)
#   awk -F: '$3==0{print $1}' /etc/passwd     # anything other than 'root' is the backdoor
#   sudo userdel -r <rogue>                    # or: sudo passwd -l <rogue>; usermod -s /usr/sbin/nologin <rogue>
# VULN-010 password reuse: the DB pw is also a system login pw — change/lock that account's pw (keep key login for deploy):
#   sudo passwd -l deploy    # deploy uses key login (fn 10), so locking its password is safe
# VULN-006 DB password in source: rotate the MariaDB 'helpdesk' user pw + move it out of config.py/run.sh
#   (read from an env in supervisord or a root-only file); update run.sh's MYSQL_PWD to match.
# VULN-017 SSH forwarding: restrict deploy to 127.0.0.1:80 WITHOUT touching 10-ops.conf:
#   printf 'Match User deploy\n  AllowTcpForwarding local\n  PermitOpen 127.0.0.1:80\n' | sudo tee /etc/ssh/sshd_config.d/20-harden.conf
#   sudo sshd -t && sudo supervisorctl -c "$CFG" restart sshd   # NOTE: drops your session; reconnect

echo "== verify app compiles, then restart ONLY api (never 'restart all') =="
sudo python3 -m py_compile /opt/app/api/app.py && echo COMPILE_OK
sudo supervisorctl -c "$CFG" restart api
sleep 2; sudo supervisorctl -c "$CFG" status
echo "Now re-run the judge (free). Rollback: sudo cp $BK/app.py.bak /opt/app/api/app.py"
