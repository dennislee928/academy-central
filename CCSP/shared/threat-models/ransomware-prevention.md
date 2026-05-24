# 勒索病毒防禦手冊 / Ransomware Prevention Guide

## 偵測/對抗勒索病毒入侵並加密電腦以及橫向移動

# 目標-三段防禦：

1. **入侵初期**：釣魚、惡意附件、盜帳密、漏洞利用、RDP/SSH/VPN/瀏覽器 session 被濫用
2. **主機加密前**：下載 payload、提權、關閉防護、刪除備份、批次改檔、副檔名異常變更
3. **橫向移動**：掃描內網、盜憑證、Pass-the-Hash / token 濫用、遠端執行、共享資料夾批次加密

所以方法要同時涵蓋：

* **預防**
* **早期偵測**
* **阻斷**
* **復原**

---

# 一、核心防線：先讓「進不來、跑不起來、傳不開」

## 1. 最小權限與權限分離

這是最重要的基本盤。

### 做法

* 使用者平常**不得有本機管理員權限**
* 管理員帳號與日常帳號**分離**
* 伺服器管理、網域管理、備份管理帳號**分開**
* 不允許一般使用者寫入系統敏感路徑、啟動目錄、排程、服務設定
* 限制誰可以存取共享資料夾與 NAS，採 **need-to-know**
* 將高權限帳號限制在指定跳板機/管理網段使用

### 對勒索病毒的效果

* 降低 payload 安裝、關閉防護、刪 shadow copy、停服務、改 GPO 的能力
* 降低橫向移動成功率
* 限縮單一帳號被盜後的 blast radius

---

## 2. 應用程式白名單 / 執行控制

勒索病毒最後一定要「執行」；不讓未知程式、腳本、巨集、暫存目錄 payload 跑起來，是很有效的。

### 做法

* 只允許：

  * 受信任路徑
  * 受信任簽章
  * 核准 hash / publisher
* 阻擋從以下位置直接執行：

  * Downloads
  * Temp
  * AppData / user writable directories
  * 可寫入的共享磁碟
* 限制腳本執行：

  * PowerShell / shell script / JScript / VBScript / AppleScript / Python / bash
* 停用或嚴格限制 Office 巨集、自動執行、外掛載入
* 對 LOLBins / 系統原生工具做行為限制，而不是完全信任

### 各系統重點

**Windows**

* 阻擋使用者可寫路徑執行 EXE/DLL/script
* 限制 PowerShell、WMI、rundll、regsvr32、mshta、schtasks、psexec 類遠端或代理執行模式
* 限制巨集、COM script、未簽章腳本

**macOS**

* 僅允許已核准 app / developer
* 限制 shell script、LaunchAgents、LaunchDaemons、Login Items 的建立
* 限制 AppleScript / osascript 自動化濫用
* 對 Downloads / user writable 目錄的 binary 執行做額外審核

**Linux**

* 限制 `/tmp`, `/var/tmp`, `/dev/shm` 的執行權限與 mount option
* 避免一般使用者任意寫入 systemd service/unit、cron、profile scripts
* 限制 interpreter 執行來源與 SUID/SGID 濫用
* 收斂 sudo 規則，避免 NOPASSWD 過寬

---

## 3. 巨集、腳本、解譯器與遠端管理面縮限

勒索攻擊常不是直接丟 EXE，而是先用腳本落地、拉 payload、橫移。

### 做法

* 關閉不必要的 scripting engine
* 將 PowerShell / bash / zsh / python / perl / osascript 使用納入白名單或稽核
* 關閉不必要的遠端管理：

  * RDP
  * WinRM
  * SSH
  * SMB admin share
  * Remote registry
  * Apple Remote Events
* 必要時只允許從管理跳板機來源存取
* 對遠端管理要求 MFA、來源 IP 限制、時間限制、一次性授權

### 對橫向移動的效果

直接打斷：

* 遠端 shell
* 批次散播
* 遠端下指令
* 透過系統管理協定部署勒索程式

---

## 4. 補丁管理與攻擊面縮減

勒索集團很常利用：

* 已知 VPN / gateway 漏洞
* RDP / SMB / 檔案服務漏洞
* 瀏覽器 / 插件漏洞
* kernel / driver 提權漏洞

### 做法

* OS、瀏覽器、Office、VPN、檔案同步工具、hypervisor、NAS 韌體定期更新
* 移除不需要的服務、通訊埠、舊協定
* 關閉 SMBv1、舊 TLS、匿名存取、guest account
* 對公開服務做外部 attack surface inventory
* 高風險服務加快 patch SLA

---

# 二、如何「偵測」勒索病毒入侵與加密前兆

關鍵不是只找 known IOC，而是找 **行為模式**。

---

## 5. 偵測「大量改檔 / 高熵加密 / 副檔名異常」行為

勒索加密幾乎一定有檔案層面的異常。

### 可偵測訊號

* 短時間大量：

  * rename
  * write
  * delete
  * extension change
* 檔案內容熵值突然升高
* 同一程序快速開啟大量文件副檔名：

  * docx, xlsx, pdf, jpg, dwg, pst, db, sql, zip
* 大量檔案尾碼被統一改名
* 出現 ransom note 檔案名稱模式
* 使用者目錄、共享資料夾、NAS 掛載點被批次存取

### 對策

* 建立每台主機與每個使用者的「正常檔案操作 baseline」
* 對 burst write / rename 設定閾值
* 發現異常即：

  * 暫停程序
  * 隔離主機網路
  * 切斷共享磁碟存取 token
  * 封鎖帳號

---

## 6. 偵測「備份刪除 / 復原機制破壞」

勒索病毒在加密前，常先刪復原點與備份。

### Windows 典型訊號

* 刪除 shadow copies
* 關閉備份服務
* 修改 recovery / boot 設定
* 清除 event log
* 停用安全服務

### macOS / Linux 典型訊號

* 刪除快照
* 停止備份 daemon / sync process
* 卸載備份掛載點
* 刪除 rsync 目的端歷史版本
* 改寫保留策略或清空 repository

### 做法

監控：

* snapshot delete
* backup config modify
* backup target unmount
* service stop / disable
* log tampering
* recovery tool invocation

這種事件權重應該非常高，因為對一般使用者不是日常行為。

---

## 7. 偵測提權與防護停用

勒索程式常先升權，然後關閉保護與 logging。

### 監控重點

* 新增本機管理員
* sudoers / admin group / wheel group / administrators group 變更
* 關閉或卸載安全代理
* 停用 log service / audit service / EDR sensor 類代理
* 修改 kernel / security policy / firewall 規則
* 關閉 tamper protection 類保護
* 建立開機自啟項、排程、服務、launch agent、systemd unit

### 判斷邏輯

若以下串在一起，風險極高：

1. 下載未知 payload
2. 啟動腳本/解譯器
3. 提權
4. 關閉保護
5. 批次檔案改寫或橫向連線

這種應直接自動隔離。

---

## 8. 偵測憑證竊取與橫向移動前兆

真正危險的是「一台中，整域爆」。

### 要看的行為

* 對 LSASS / credential store / browser secrets / keychain / SSH keys 的存取
* 異常 token impersonation / Kerberos ticket 操作 / cached credentials 存取
* 大量登入失敗後成功
* 同帳號在短時間內從多台主機登入
* 同帳號登入從未管理過的伺服器
* 一台端點短時間連很多 SMB / RDP / SSH / RPC / WinRM / WMI 目標
* 掃描 445/3389/22/5985/5986 等管理協定

### 方法

* 對身份驗證事件做關聯分析
* 建立 east-west 連線基線
* 偵測管理協定的異常 fan-out
* 偵測 service account 橫向使用異常
* 對「單一端點同時連多個檔案伺服器」提高告警

---

## 9. 偵測 Command-and-Control 與異常外連

不是每個勒索樣本都需要長期 C2，但很多入侵階段會有。

### 看什麼

* DNS 查詢異常高 entropy 網域
* 新註冊網域、低聲譽網域
* 端點對罕見外部 IP 持續 beacon
* 使用常見埠上的異常協定型態
* 突然大量外傳檔案或壓縮後上傳
* 雲端儲存 / paste / webhook 類濫用

### 注意

現在很多攻擊會偽裝成 HTTPS 正常流量，所以要看：

* 主機行為 + 流量時間型態 + 程序關聯
  而不是只看 IP/domain 黑名單。

---

# 三、如何阻止「橫向移動」

這一段是重點。很多環境不是死於第一台，而是死於共享權限與平面網路。

---

## 10. 網路分段與管理面隔離

### 做法

把網路切成至少這幾層：

* 一般使用者端點區
* 伺服器區
* 備份區
* 管理區
* 高敏感資料區
* OT / IoT / 印表機等特殊區

### 規則原則

* 預設 deny east-west
* 只開必要 port / 必要方向
* RDP/SSH/WinRM/SMB 僅允許：

  * 指定來源
  * 指定身分
  * 指定時段
* 備份區不可被一般端點直接寫入
* AD / IdP / 檔案伺服器不得讓一般工作站任意橫向連線

### 效果

即使單機被打，也不容易擴散到：

* 網域控制面
* 備份
* 機密資料區
* 其他使用者端點

---

## 11. 管理平面獨立、跳板化

### 做法

* 所有管理流量走 jump host / bastion
* 管理帳號不可在一般工作站登入
* 管理站不可瀏覽外網、收信、裝日常軟體
* 管理操作全程留痕，必要時錄影/錄命令
* 管理權限採 JIT / 限時授權

### 對抗效果

* 減少高權限憑證落在使用者端點
* 阻止 attacker 從一台員工 PC 直接碰核心伺服器

---

## 12. 共享資料夾與 NAS 權限縮限

勒索常沿著 SMB/NFS/同步資料夾加密。

### 做法

* 共享權限最小化，不給 Everyone / Domain Users 廣泛寫入
* 把唯讀與讀寫分開
* 高價值資料夾改成流程式寫入，不是所有人直接 mount RW
* 重要共享目錄啟用版本化 / 快照
* 對單一用戶的異常大量檔案修改設節流或自動鎖定
* 對 service account 禁止互動式登入與橫向用法

---

## 13. 身分層的橫向移動抑制

### 做法

* 不共享本機管理員密碼
* 本機管理員密碼每台不同、定期輪替
* Service account 最小權限、不可廣泛登入
* 禁止高權限帳號在低信任主機登入
* 對高權限帳號啟用：

  * MFA
  * 條件式存取
  * 裝置健康檢查
  * 地理 / 來源風險限制

### 目的

讓 attacker 即便拿下一台，也拿不到「通行整個網域」的金鑰。

---

# 四、各 OS 的重點差異

---

## A. Windows

Windows 在企業裡最容易成為勒索主戰場，因為：

* AD / SMB / Office / PowerShell / RDP 生態完整
* 憑證、腳本、橫移工具鏈成熟

### Windows 防守重點

1. 關閉或限制 Office 巨集
2. 限制 PowerShell / WMI / WinRM / 遠端排程
3. 阻擋 user-writable 路徑執行
4. 強化 LSASS / credential 保護思路
5. 限制 SMB 橫向與 admin share
6. 監控 shadow copy、backup、event log 操作
7. 監控新服務、排程、registry autorun、startup folder
8. 管理員帳號分離，勿重複本機 admin 密碼
9. GPO/AD 變更高度審計
10. 對檔案伺服器做異常改檔告警

### Windows 特別要抓的事件類型

* 大量檔案改寫
* 建立/刪除服務
* 排程任務建立
* 防毒/防護停用
* 可疑 PowerShell commandline
* SMB fan-out
* 共享檔案異常 rename
* 憑證 dump 行為
* vss / wbadmin / bcdedit / event log 清理類行為

---

## B. macOS

macOS 企業環境相對少，但不是安全。近年也常見：

* 偽裝更新安裝包
* 瀏覽器憑證竊取
* 開發者機器上的 SSH/Git/雲端憑證被拿走
* LaunchAgents 持久化
* 壓縮、偷檔、再加密

### macOS 防守重點

1. 限制未知 app 與未核准開發者執行
2. 監控 LaunchAgents / LaunchDaemons / Login Items
3. 監控 TCC 權限濫用（文件、桌面、下載、全磁碟存取）
4. 強化 Keychain、SSH keys、browser tokens 保護
5. 限制 AppleScript / osascript / shell script 自動化
6. 對使用者目錄大量檔案操作設監測
7. Time Machine / snapshot / 版本化備份隔離
8. 開發機與一般辦公機分級管理

### macOS 特別要抓的事件類型

* 未知 binary 從 Downloads 啟動
* LaunchAgent 新增
* shell 解譯器呼叫網路下載再執行
* 文件目錄大量 rename/write
* SSH key / browser session / token 異常讀取
* 備份快照刪除

---

## C. Linux

Linux 比較常見於：

* 伺服器
* container host
* CI/CD runner
* NAS / 儲存 / DB / VM host

勒索在 Linux 常見目標不是桌面，而是：

* VM datastore
* DB / mounted volumes
* 備份儲存
* ESXi / hypervisor / container volumes
* CI/CD 供應鏈節點

### Linux 防守重點

1. 收斂 SSH：禁密碼、禁 root 直登、限制來源、加 MFA
2. `/tmp`, `/var/tmp`, `/dev/shm` 掛 noexec/nodev/nosuid 思路
3. sudo 最小化，避免寬鬆 sudoers
4. 監控 systemd service、cron、authorized_keys、profile scripts
5. 監控大量檔案改寫與 archive/compress 後外傳
6. 對 NFS/SMB mount、備份儲存做嚴格 ACL
7. 強化容器與主機隔離，避免 container escape 後加密 host volumes
8. 對 CI runner、artifact repo、部署金鑰做隔離管理
9. 關鍵資料與備份存放不可被一般應用主機直接刪改

### Linux 特別要抓的事件類型

* ssh 爆破後成功登入
* sudo 提權
* 新增 systemd/cron/persistence
* 大量 inode 變動 / rename
* 刪除快照 / 備份
* 對多台內網主機同時 SSH / SMB / NFS 連線
* 可疑壓縮與 exfil
* 修改 `authorized_keys`

---

# 五、備份與復原：真正的最後防線

沒有這段，再好的偵測也可能來不及。

## 14. 備份要能扛勒索，不只是「有備份」

### 正確做法

* **3-2-1** 思路：

  * 至少 3 份資料
  * 2 種不同媒介/儲存型態
  * 1 份離線或不可直接修改
* 備份與正式網域、正式帳號、正式網段**隔離**
* 備份帳號不能被一般 AD 帳號直接濫用
* 備份資料要有：

  * immutable / append-only / object lock 類保護思路
  * 版本化
  * 快照
* 定期做 **restore drill**
* 針對 AD / DB / NAS / VM / Git / CI secrets 做獨立復原計畫

### 常見錯誤

* 備份掛載在同一台主機可寫路徑
* 備份帳號與網域管理共用
* 從未實際還原測試
* 備份也被同一組憑證刪掉

---

# 六、實戰上該怎麼設偵測規則

不要只靠 IOC。建議用「高風險連續事件」思路。

## 15. 高價值關聯規則範例

### 規則 A：疑似勒索前置

* 未知程式從 Downloads/Temp 啟動
* 隨後呼叫腳本解譯器
* 再出現提權或停用保護
* 5 分鐘內大量 rename/write

=> 直接隔離主機

### 規則 B：疑似橫向移動

* 單一端點在 10 分鐘內嘗試連線多台 445/3389/22/WinRM
* 同帳號跨多台主機登入
* 緊接著共享磁碟異常改檔

=> 鎖帳號 + 隔離來源端點 + 封鎖 east-west

### 規則 C：疑似備份破壞

* snapshot delete / backup service stop
* event log 清理
* 隨後大量檔案操作

=> 立刻高優先級事件處置

---

# 七、入侵後的即時處置方法

## 16. 一旦發現疑似加密，先做什麼

順序通常是：

### 先隔離

* 切斷主機網路
* 暫停共享磁碟掛載
* 封鎖帳號/權杖
* 阻止該主機對其他主機的管理協定連線

### 再保全證據

* 保留記憶體、程序、網路連線、事件紀錄
* 不要急著重灌到失去調查線索
* 確認是否有資料外洩，不只是加密

### 再做範圍界定

* 哪些帳號被用過
* 哪些檔案伺服器受影響
* 是否碰到 AD / 備份 / hypervisor / NAS
* 是否已有持久化點

### 最後才是復原

* 先封堵 root cause
* 旋轉密碼、金鑰、token
* 用乾淨映像重建
* 從乾淨時間點還原

---

# 八、最實用的落地清單

## 17. 最少應做到的 12 件事

1. 一般使用者沒有本機 admin
2. 高權限帳號與日常帳號分離
3. RDP/SSH/WinRM/SMB 僅限管理來源
4. 巨集與未知腳本預設阻擋
5. user-writable 路徑不可直接執行
6. 監控大量 rename/write/delete
7. 監控 snapshot/backup/log 清除
8. 監控新服務/排程/自啟項
9. 監控橫向掃描與管理協定 fan-out
10. 網路分段，預設阻擋 east-west
11. 備份隔離且不可直接刪改
12. 定期做 restore drill 與桌面演練

---

---
# 結論

**抓來源、封鎖來源、保留紀錄，當然值得做。**
但對勒索病毒來說，它的價值主要在這三件事：

1. **加快發現與圍堵**
2. **幫你做範圍界定與根因分析**
3. **幫你補規則，避免下次再中**

它**不能取代**：

* 最小權限
* 應用執行控制
* 橫向移動阻斷
* 備份隔離
* 異常加密行為偵測

---

# 什麼叫「來源」

這裡其實有好幾種來源，不只是一個 IP。

## 可追的來源層次

* **檔案來源**：哪個檔案、hash、簽章、下載 URL、父程序
* **程序來源**：誰啟動它、command line 是什麼、從哪個路徑跑
* **網路來源**：來源 IP、domain、URL、user-agent、TLS 指紋、DNS 查詢
* **身分來源**：哪個帳號、哪個 token、哪台裝置、哪個 session
* **橫向來源**：從哪台主機跳過來，用什麼協定，對哪些目標連
* **初始入侵來源**：釣魚郵件、惡意附件、弱密碼登入、漏洞利用、共享磁碟落地

真正有用的是把這些串起來，不是只記一個「惡意 IP」。

---

# 有幫助的地方

## 1. 幫你更快 block 擴散

如果你能在早期抓到：

* 哪個 URL 下載了 payload
* 哪個 domain 在 C2 beacon
* 哪台主機開始掃 SMB / SSH / RDP
* 哪個帳號開始跨機器登入

你就可以立刻做：

* block domain / IP / URL pattern
* 封鎖該主機 east-west 流量
* 停用該帳號或 token
* 阻擋該 hash / path / signer
* 封鎖特定通訊協定或來源網段

這對**阻止第二台、第三台被打到**很有價值。

---

## 2. 幫你找到真正入口

很多人只看到「檔案被加密」，但不知道：

* 是釣魚附件打進來
* 還是公開服務被 exploit
* 還是帳密外洩後從 VPN / RDP 進來
* 還是內部某台先被木馬，再橫移出去

如果你有完整來源紀錄，就能回答：

* 第一台中的是誰
* 第一個惡意程序是什麼
* 第一個外聯是什麼
* 哪個帳號先被濫用
* 哪條橫向路徑最先成功

這直接影響你後續補洞，不然你只是在「擦地板」。

---

## 3. 幫你做 blast radius 分析

有來源紀錄，才知道影響範圍：

* 哪些主機接觸過同一 C2
* 哪些共享資料夾被同一帳號改過
* 哪些機器收到同樣 payload
* 哪些主機彼此有 lateral connection
* 哪些憑證可能已外洩

沒有這些，你很難判斷：

* 是單機事件
* 還是整段網路已被種下持久化

---

## 4. 幫你做事後規則優化

例如你調查後發現：

* payload 都從 user writable path 啟動
* 橫向都走 SMB admin share
* 會先刪 snapshot 再加密
* 會用某種腳本下載器當第一階段
* 會用特定 parent-child process chain

那你下次就能把防守從「黑名單」提升成「行為規則」。

---

# 但為什麼它不是主防線

因為很多「來源封鎖」本身很脆弱。

## 1. IP / domain 很容易換

攻擊者可以：

* 換 VPS
* 換 domain
* 用短命 C2
* 用被入侵合法站台
* 用 CDN / cloud fronting 類手法
* 直接走合法 SaaS / webhook / object storage

所以只封 IP/domain，常常只能擋到一小段。

---

## 2. 有些勒索根本不太依賴外聯

尤其內網落地後，可能直接：

* 本地執行
* 用內部分享散播
* 直接掃 SMB / SSH / NFS
* 用偷到的帳密登入橫移

這時候「抓外部來源」幫助有限，因為真正危險的是**內網橫移來源**。

---

## 3. 初始來源未必等於真正擴散來源

例如：

* 初始來源：釣魚郵件附件
* 第二階段來源：瀏覽器下載器
* 第三階段來源：內網橫向工具
* 真正造成大規模災害來源：被盜的管理員帳號 + 檔案伺服器共享權限

所以你不能只看最一開始的外部 URL。

---

# 最有價值的做法：不是單純 block，而是「來源關聯」

你真正要做的是這種鏈條：

## 關聯鏈

**帳號** → **主機** → **程序** → **檔案** → **網路連線** → **遠端目標** → **檔案改寫行為**

例如：

* user A 在 host 17 開了一個未知 binary
* binary 由 shell script 從某 URL 下載
* 該 binary 30 秒後連了數個外部 domain
* 隨後嘗試連 20 台 SMB 主機
* 接著大量 rename 共享資料夾檔案
* 同時刪除本地 snapshot

這種關聯資料，遠比一個 blocklist 有價值。

---

# 什麼情況下「抓來源並 block」特別有用

## 很有用

* 釣魚附件 / 下載型木馬
* 明顯 C2 beacon
* 同一批 IOC 正在多台主機出現
* 外部掃描 / 爆破 / exploit 嘗試
* 某台端點開始對內大量 SMB / SSH / RDP 掃描
* 已知某帳號/token 被濫用

## 幫助有限

* 攻擊已在內網高權限帳號下擴散
* 檔案伺服器已被拿下
* 備份已被刪
* 攻擊者只用合法內部工具與管理協定
* 只剩最後加密階段才被看見

---

# 實務上應該記什麼

## 最少要留這些欄位

### 程序面

* process name
* full path
* hash
* signer
* parent process
* command line
* execution user
* first seen / last seen

### 檔案面

* create / write / rename / delete
* target path
* extension before/after
* write burst count
* entropy change
* ransom note pattern

### 網路面

* src host
* dst IP/domain/URL
* port/protocol
* DNS query
* bytes in/out
* connection frequency
* TLS/HTTP metadata

### 身分面

* user
* source host
* target host
* auth type
* success/failure
* privilege level
* token/session id

### 橫移面

* SMB/RDP/SSH/WinRM/WMI fan-out
* remote service creation
* remote command execution
* shared folder mass access

---

# block 應該 block 什麼

不是只有防火牆 block IP。

## 應同時考慮

* block 惡意 IP/domain/URL
* block hash / signer / file path
* block 特定 parent-child process chain
* block 某帳號登入
* block 某台主機 east-west 流量
* block 某協定從非管理區使用
* block 對共享目錄的大量異常寫入
* block 來自 user writable 目錄的執行

這樣才是「來源導向 + 行為導向」的實作。

---

# 你要避免的誤區

## 1. 只做 IOC 黑名單

這很快就過期。

## 2. 只記錄外部來源，不記錄內部跳點

真正造成災害的常常是橫向那段。

## 3. 沒有把來源資料和加密事件關聯

有 log 但不能用，價值很低。

## 4. 只記錄，不自動處置

勒索很快，很多時候你沒有幾小時慢慢看。

---

# 實務建議

最好的答案是：

**要抓來源、要 block、也要留證，但要把它設計成「行為關聯與快速隔離」的一部分。**

## 優先順序

1. 記錄來源與關聯鏈
2. 偵測高風險行為
3. 自動隔離主機/帳號/共享存取
4. 再補外部 IOC block

---

# 同時抓病毒來源做block跟紀錄主要有益於更快圍堵、追根因、定範圍，不足以單獨阻止勒索。真正有效的是把「來源紀錄 + 行為偵測 + 橫向阻斷 + 備份隔離」一起做。**

