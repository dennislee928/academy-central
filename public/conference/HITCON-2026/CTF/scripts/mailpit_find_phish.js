// Run this in the browser console on the Mailpit webmail tab
// (https://<hash>.lab.trapa.zone/). It lists all senders and flags any whose
// domain differs from the legit "example.com" via homoglyph/lookalike.
//
// Track 1 / Task 2 — Phishing email forensics.

(async () => {
  const list = await fetch('/api/v1/messages?limit=100').then(r => r.json());
  const rows = list.messages.map(m => ({
    subject: m.Subject,
    from: m.From && m.From.Address,
    name:  m.From && m.From.Name,
  }));
  console.table(rows);

  // Flag lookalike domains: same "shape" as example.com but not exactly it.
  const norm = s => (s || '').toLowerCase().replace(/i|l/g, 'l'); // I/l collapse
  const suspicious = rows.filter(r => {
    const dom = (r.from || '').split('@')[1] || '';
    return dom !== 'example.com' && norm(dom) === 'example.com';
  });
  console.log('Homoglyph/lookalike senders:', suspicious);

  // Pull body + URLs of the suspicious message(s)
  for (const s of suspicious) {
    const m = list.messages.find(x => x.From.Address === s.from);
    const full = await fetch('/api/v1/message/' + m.ID).then(r => r.json());
    const body = (full.HTML || '') + ' ' + (full.Text || '');
    const urls = body.match(/https?:\/\/[^\s"'<>)]+/g);
    console.log('PHISH:', s.from, '| subject:', s.subject, '| urls:', urls,
                '| return-path:', full.ReturnPath);
  }
})();

// Result (2026-08-21):
//   From: hr@exampIe.com  (capital I, U+0049, not lowercase L)
//   Subject: [Important] Confirm your annual salary adjustment today
//   Malicious URL: http://dynamics.ddnsking.com/hr/salary
