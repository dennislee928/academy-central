# Transcripts of Linux Kernel Tracing and System Security Research Presentations

This document compiles the detailed transcripts of all eight audio recordings (**新錄音 24.mp3** through **新錄音 33.mp3**) included in the notebook *Fundamentals and Architectures of Linux Kernel Tracing*. 

Since the original audio files are not directly accessible in the filesystem, this compilation serves as the complete textual representation of the lectures, presentations, and technical discussions extracted from the notebook's source passages.

---

## Table of Contents
1. [新錄音 24.mp3 — Web3 Red Teaming Agent & AI Agent Trust Systems](#1-新錄音-24mp3)
   - Part A: 當 AI 學會白帽漏洞救援的全自動紅隊 Agent (on)
   - Part B: AI Agent 如何透過區塊鏈去建立信任 (Williams)
2. [新錄音 25.mp3 & 26.mp3 — Fundamentals and Architectures of Linux Kernel Tracing](#2-新錄音-25mp3--26mp3)
   - Ftrace, Kprobes, Tracepoints, and Perf Event Sampling
3. [新錄音 28.mp3 & 29.mp3 — Zero-Knowledge Proofs & Virtualization Architectures](#3-新錄音-28mp3--29mp3)
   - Part A: 零知識證明與自然人憑證整合應用
   - Part B: 虛擬化與 KVM 架構技術
4. [新錄音 31.mp3, 32.mp3 & 33.mp3 — Community Challenges & USB C/OTG Security](#4-新錄音-31mp3-32mp3--33mp3)
   - Part A: 開源社群與國際溝通障礙
   - Part B: USB C / OTG 安全研究與封包竄改實作

---

import os

# Define the transcript content exactly as in the passages

transcript_24 = """### 1. 新錄音 24.mp3

#### Part A: 當 AI 學會白帽漏洞救援的全自動紅隊 Agent
* **Speaker:** on
* **Topic:** Automated Red Teaming Agent for Web3 / Web3 Security

**Transcript:**
我想了一下，我們今天應該就講，所以我們好好的把進講，然後感覺也不用太特別，就是好像我在台上聽，我一直講一直講這樣子，對，所以如果你有任何問題，你中間可以舉個手，然後我也帶一個適當的時機給你互動，這樣你直接問也可以啦，可是這樣就有可能，所以怕怕怕他怕影響裡面內容，所以你就舉個手這樣，OK, 好，那今天的主題就是當 AI 學會白電到資金救援的全自動拍，好，那大家好，我是 on, 那如果要自我介紹一下的話，就是現在就是個 W 三的載這樣，OK, 然後除了平常上學上班，然後也自己玩自己的相，就像是一個我自己創業的，不過雖然我是去練工程師，但是我創業是二的覺得 software 很有趣啦，對，然我做的主題是 sre agent, 對，有知道這個詞在幹嘛，你可以舉個什麼，好好請 sre 號比較少一點，SRE 是那個好，不要不要業配太多，好，反正 SR 是 site reliability engineering 的縮寫這樣，好，但跟今天的就有點，所以我們今天不講，對，但後面那個 agent 應該大家是了解了吧，應該還知道 agent 是什麼的，可舉手，你用過 openopen cloud, 可以舉的時候，沒有用過養過龍蝦的。哦，好誒，好，太棒了，那我大概 know 今天 OK,OK, 好，那在開始之前就是有的 QRC 是我做的 slid, 對，所以如果你比較害羞，其實你可以直接問，就是在這邊直接問題，但如果你比較害的話，你在上面問題。我這裡我有測試，我應該是可以，對啊，如果說不能用來。OK 嗎？OK, 有少了，有少了。好，OK, 那我們就開始吧。 [1, 2]

OK, 那首先呢，在開始之前，因為這場一程的算是有點特殊性，因為他的主題的問題，所以還是要再次宣導一下，我們是做好駭客，對不對？不要用我們的技術是做不合，還是做客。好，那最後一個好像沒有講，就是有一個方彈，就是我家開水主管的，但不是那個實體的水管是大家知道那個亞的鯊魚就是 100 公分，我有然後準備要養第六隻了，對，所以開始算。我快沒有地方睡覺，好，那到題今天大概會分幾個部分來跟大家介紹，首先第一個就是什麼是 W3 的治安，然後以及 W 三的紅隊可能是在做什麼樣的事情，然後第二個不外部就是一定要來 demo 一下，刺激一下這樣子，對說這個 demo, 因為它是一場公開議程，然後好像我不知道會不會錄音錄影。但是我有稍微挑了一下，我覺得有太多，嗯，這就是真的跟你會看到紅隊相關執行的結果，我把它就是 f 這樣子，OK, 然後再談談我們 agent 的架構設計，就這套要怎麼去完成，然後還有最後是我會希望這個東西是 open source, 所以雖然說我現在還在想我要怎麼把它做 open source, 對，但是可以提一下，不為了做 open source 在這個專案上去做了什麼樣子的設計，我覺得這個部分是要去的。 [2, 3]

好，所以講的第一點就是什麼東西展示什麼東西。那首先呢我們會去談到說在練上的子案就是 WM3 的子案跟紅隊一般的 WM2 的子案，它不一樣的地方是紅隊它有很多種你說拿到 root 的方法或是拿到結果的方法。那這個結果可能是 data, 然後可能是一些經驗資訊，可能是你的 assaSt 之類的，所以這邊都可以。這樣子，對，所以紅對 w2 相對來說它有非常非常多種的 variable, 對，但 w 其實我覺得相對來說簡單一點就是錢，就是變上錢，因為我們 90% 啦，就是現在我們應該都會比較居關注在就是面上的資金，對，就目前這個產業或是這個領域，目前它就是走到這邊，還沒有真的相這麼的完整，這麼的豐富這樣，對，所以我覺得我可以提第一個就是我們想要在 WB3 拿到 sorry 在 W3 對就是 W3 的那個紅，我們做 W3 紅隊的目的基本上就是去變成，然後搶救一些或是拿到一些用不法手段得到一些就是指這樣，所以第一個 key 想給大家第一個 key 就是基本上我們這邊就是以就就是基本上就是以自為核心啦這樣子，然後第二個很有趣的地方就是大家有開過一台自己的機器嗎？是幾天舉個手用過 ser 哦，好，太棒了，對，那那大家打過把機嗎？對，有一些人點頭，對，我們是打把機就會想要拿 F 或是拿 root 嘛，對不對？在 3 的世界沒有這種東西，因為 Q 鏈它上面是公開的，是透明化的，對，所以你在區塊鏈節點上的任何東西，基本上你都是公開的，就每一個人每一個人都可以看到這樣，甚至是你執行一些就是二意的程式的時候區塊他是不知道那是惡意的程式的。對，它就是直接就這樣子。OK。這跟 WB2 是比較不一樣，就是我們 WB2 它可能還是會想想，他還是會覺得有一些惡意的，就是他還是會認定說你操作到底是不是惡意的，但在 W 的世界裡面沒有惡意這種東西，你沒寫好就是寫好的，對，我們就會去執行他。好，然後第三個就是它不可逆，它無法救援在在這是這邊有維 w2 機器的人的經驗嘛，就是你是一個你是 Pform engineer 或 de engineer engineer 好數位數位好，通常我們在 puction 上面遭遇 到的一些錯誤或 DB 資料 DB 比較慘啦，對，那你在 production 遇到錯誤，第一個想法是怎麼辦？你現在有 SO 或是 SLA 要顧哦，就是你的服務水平。HFXIX 對吧，或者 R 版對吧，一定是一定是這樣子，儘量就是 90% 的情況，對，但區塊有這種東西，就是它的節點是一塊一塊往後漲的，那所以假設說我有什麼樣的 result 就是在上面，那基本上它就是一個已經被毛病，已經被寫下去的事實，對，跟大家提一個就是非常非常有名的事件，叫做 d incident, 對，你知道 ETH 這個東西舉手 E 太幣。好，他太棒了，對，那其實在 ETH 之前就應該說在就是除了 ETH 玩的東西叫 ETC, 對，那個 C 是代表 cic 的意思，那為什麼會所謂跟 ETC 呢是因為這個滿足的 D, 那我們介紹一下它是發生了什麼事情，總之呢就是大家知道智能合約嗎？我需要解釋智能合約。OK, 大家都還賺點哦，OK。那原則上就是在以台電上面又發生了一件智能合約的安全事件，然後那個漏洞的類型叫做 reaction, 也就是從入攻擊，那因為這個樣子就是以台邊上面的這個有 60 萬。到不是 60 萬， 60, 對，也就是 6 千萬的資金，那就被到走了這樣子，而且這個那個時候發生這件事情是相當於整個區整個以太電上面，以太電供電 mnet 上面資金的三分之一，所以這是非常非常嚴重的事件，但還記得我剛剛上一頁說的最後一點嗎？就是它是不可，它是不是，所以這個時候我們沒有辦法去就這一點被倒走就是被倒走吧，對，我們沒有辦法透過任何中心化去把它改回來，去把它的 oners 之類的改回來，對，所以發生了這件事情之後，我們不萬乎就是要想一個防嘛，對不對？就是這個這個審制實在是太慘重了。那 ETH Foundation 在這裡就做了一件事情，就是他搞了一個東西叫做硬分，HF 對，那目前的 ETH 它是承認這件事情的，就是承認這個音發生的，對，那有另外一個 sorry, 我講反 ETH, 目前的 ETH 它是沒有讓這些事情發生的，就是它還是違背的區塊鏈的一些特性這樣，但是有另外一個叫做 ETC, 就是 ETH Classic, 它是承認這件事情發生的。對，OK, 那為什麼做了一定分叉呢？就是外乎就是希望這件事情的影響不要那麼嚴重，然後再來第二就是還是有些人會希望去保持這個這個區塊鏈它上面的特性的完整性，所以它就是他們吵得很兇。要不就是承認這些要就不承認這件事情。 [3, 4, 5, 6]

好，OK, 所以這就是一個算是區塊鏈上面會發生的自然事件，可能跟我們一般傳統的 W2 會遇到安時間可能會那麼一些些不一樣。好，那接下來去講到就是我們在 WB3 上面做紅隊的時候，可能會有一些流程，可能會有流程，那這個流程應該如果你是對就是 Ring 有熟悉的話，應該會覺得大不查就是有一些我們在在構事的目标或是在構的内容就不太一樣，首先第一個就是它要去所謂的分類，對你在大過 et scan 可以舉一下 scan, scan 比較少一點點。OK, 好，那總之 scan 就是一個網站，你可以在上面看到基本上是出來所有的資訊直線，好，然後在這個在在第一個部分就是我們在上面可以去找任何你想要找的資訊嘛，對，但那個資訊當滿目的品質好值低，所以當然我們要挑一個比較容易打下來的比較好比較有充足的資訊讓你打下來的目標，所以所以第一步當然要去做這件事情。好，然後第二個就是所謂的解析依賴服，但是我想這部分我們就不帶了，因為這個定關乎到智能合約的開發，然後大家這場好像節奏不能到什麼後面，對，好，那首第二部分就大家可以看看。好，第三部分就是 hypothesis 每個有就是算是有做過自相關應該都會知道所謂的 Phypes 就是我去假設說它的漏洞類型是什麼，然後我可能可以怎麼拿下下來這樣，OK, 然後再來第四個是我覺得比較有趣的就是我們其實會做一個件事情報告 F PLC, 這邊知道是什麼什麼一點點好，那你們有沒有用過 F 知道它應該是一個蠻好用的工具，對，那它裡面就是有個功能，它可以去把不管是你想在 ETHM 內也好，或是也好，我們就直接做一個本地的 WK, 然後我們就會在一個下次隔的環境去執行，因為在區塊鏈上你不太能測試測試東西嘛。對，應該說你在內上造成的後果就是造成，造成的結果是造成的，所以其實我們還是會有測試練這個東西，所以不過它終究是一個電上公開真實的操作，對，所以可以在本地裡面去問做的事情，對，那所以我們在確定這個 hypothesis 跟確定我們要怎麼打下來這個漏洞之後呢，我們就會在等地產生一個。好，那最後呢，就是我們來看一下它到底是不是 predable, 也就是我們大家我需要解釋 Gas。應該大家 gas 知道就好，我應該解釋，好，那你在上操作會有一些 gas 嘛，對不對？那假如說你這筆操作的 gas, 它根本沒沒有辦法去讓你熟知品呢，你打下來你的錢根本沒有大於這個 gast, 它基本上就沒什麼沒什麼用，對，所以基本上我們來到確認它是 pfectable 的，不過大陸的情況應該是如此吧，對，只有在一些嗯這在一些是 sodia 的，sodia 是測試，只有在測試練的時候比較容易發生這件事情，因為雖然說測試代幣是不用錢的，就是你去 FT0 應該就 OK 了，對，但是假設說就是你也知道 FT 它就是一個賬號，然後每就整理一點嘛，對，那其實還是有人會花真金白銀去買測試的，因為我會希望我的車有逼進比較多的數量這樣，對，然後至於價格就打幾場。好，那最後就是 disclosure 跟 rescue, 也就是我們做完這件事情之後，原則上我們還是希望真的去操作啊，不是 ent 它自動就是看到東西就把它打下來，這樣我覺得這還是挺危險的，就是我們還是要最後一管讓人去 review 這樣不算是你的就算去 review 最後的結果。 [6, 7, 8, 9]

好，那最實展示的部分，那今天會的部分呢，我有稍微去思考了一下，對，因為我們這個畢竟是一個公開的場合，對，我覺得如果直接展示一些就是成功的結果，可能會有一點不是那麼恰當，對，而且這個就是這這不是打擊嗎？對，所以今天會看到的畫面就是首先我們會去選一個你已經有漏洞的 S 的不利的合約，對，然後接下來呢，我們會透過我們的去分析，分析完之後會產出一個 P, 就是 HPS 的部分，OK, 那其實我比較算是嗯我的部分，我覺得是如果我們這個 agent 它如何從電上去篩選一些合約有價值的合約下來打，然後之後打完之後我們要怎麼附屬上，然後把這個真真實的一個行徑打下來，這樣。我覺得這部分有點我覺得不太適合，就是直接公開的 doemo, 所以就容我去超過這個部分這樣子。好，那可以來我一下。首先呢，我們可以去這個地方，好，那這個算是一個我反正我我起的界面啊，這樣子，OK, 好，那這部我有準備一些合約，那我好，等一下這個最後的 sample 好了，那其實這邊這邊是我準備好合約，就是 01 到以但是今年不是 demo 這個 s。好，那按一下 analyze 之後呢，它這個本地的合約就會被送進去這個 agent, 然後去做分析，對，那大家如果要看一下這個 sample 的 code 的話呢，它在看一下哦。這裡我把看到我覺得大家開關開 D。好，OK, 所以如果你是手機的專家的話呢，就是你可以一下這個合約這樣，不過我的註解應該也寫很清楚了，就是基本上它就是有一個 reentrance 個 load 這樣子，那我們就希望這一個 ent 才能夠成功分析出來，然後產出 P。好，OK, 那它應該產出來了，首先呢，它會先有一個 report, 就跟你說它的 ity 是 reentrance 。這是剛剛真的跑，我不是直接靜態，我沒有做必要，對，雖然我其實還蠻擔心那個 D 我會炸掉了，就是剛剛跑的。然後之後你就可以去這邊看到就是他說了什麼問題啦，然後之後他就寫了一個程式碼去可以把它打下來的，對這樣。OK, 好，所以就簡單一下它的這整個流程，對，然後這個流程它是算是等一下會講到的所謂的 layer 2, 對，那 layer one 跟 layer 3 就是所謂從電上篩選合約到部署的部分，那可能就沒有到太可以 demo 這樣。好，OK, 所以我基本上就 d 完了，目前這個 agent 想像到的東西是這樣。 [9, 10]

好，那還要多久？好，我 12 分鐘，OK。好，接來是我們來談一下設計制好了，OK, 呃。大家有想過這個 agent 你有兩個龍蝦就知道它很貴的吧。就是基本上我們覺得 AIEN 是很誇張在少的，對，我曾經買過那個 cloud 的 20 倍，然後一個月 6000 塊那個 200 美那個，然後我還是燒完了，因為我我同時養的 openc 跟對，然後就是非常誇張，然後我也沒，因為我我就沒我沒有用一些比較基礎的模型這樣，對，就是我希望它的智商是夠的。好，那在這邊也是一樣，如果說一個 agent 它真的在區塊上面或是你自己的 Sver, 應該其實應該是你 server 上面，就是 24 運作，然後我覺得這樣子這個成本會直接爆炸的。對，所以其實我們在做工作的時候，我們要把區分出兩個部分的工作，一個是便宜的確定性的，重複性高的，然後第二個是昂貴吸數跟需要智慧的，什麼意思呢？在第一步就是大家還記得這個這個圖嗎？對，大家記得這個圖嗎？接下來我們要去用 agent 模擬這件事情嘛，對不對？但裡面有一些工作，它是可以被區分出那兩個。的好，那我們要來進入到第一件事情哦，對，第一件事情就是所謂的去把鏈從電上去找一個價值的合約，對，然後到組出一個因合約有可能是有很多份，就是一個一個商業合可能是不同的合約去組合起來的，對，所以在從電上找合約的時候，其實我們比較我自己比較不像用 LM 去設計，因為這樣會非常好，我直接去設計是一個靜態權種，我覺得應該是比較好的做法，對，因為它這個就算是大海撈針的地圖，所以我會把這一部分去列為它是確定型的，它是高頻的操作，然後我們就把它放在所謂的 band 這樣就好，然後第二個就是真正你在生 hypothesis 或是 P 的時候，然後我們把這個這些東西丟到裡面，那如果你是眼間的好朋友們呢，你要看到最右邊有個 hns 對，沒有錯，就是這一個 agent 它的 的 image 的 base 是 hermis agent, 那等下會解釋為什麼我要 hermis agent。好，那接來第三個的部分就是所謂的 rescue, 也就是在真實的要把這個東打下來的時候，我們寫的是會去應該說我們這個紅隊的 agent 會去通知人這樣子。好，那 呃這關係加速一下，對，原則上你可以想像就是我們會有這三件事情告訴。對，就是少描篩選分析。P 跟利潤加編，對，如果你上一個這個英文沒有看太懂的話，對，原上就是記得去這個順序就好了，然後他能分別就是做 back, 做 agent 的分析，然後之後再去真樣子，OK, 講到這邊太快了，大家有理解嗎？請說 [10, 11, 12]

**不好意思，想請問一下，那個 backend 是 static 的邏輯還是會 dynamic。**
呃，你的意思就是城市碼的權或是他要抓的 factor。
**呃，因為像剛剛說的第一步是人腦設計的，所以我覺得是 static。**
就這樣。對，你的動態是到多動態，我可以一下。
**呃，可以自己加 OR 或是 factor 的 weight 會自己上下動。**
但你的 vector 的意思是你是自我理解不是。
**哦，不是不是 factor。**
呃，那目前因為你在你在你在塞那些合約的時候，你可能真的去看那些合約的本身，有時候我們會重他這場下手。我講到這應該 OK 嗎？
**OKOK。**
對對，所以他應該是警態的。 [12, 13]

嗯，OK, 好，沒有。好，OK, 那其實就是 Sorry。
**那個那個 POC 啊，我問一下，但是你是用靠模型當 B model。**
呃，你可以換了，因為很明選。對，但是會有一個問題是現在都會過所謂的 cyber, 像是你，我不知道你有沒有過這個 CPP, 就是例如說 Coud 模型 ic 跟 open 其實都針對這種攻擊性的做偵測，如果它會有一個高，所以理論上是會被 據我的理解啊，產生 PO 是有很高的機率，會被 PO 會會會被 G 攔下來，對，然後 MP 的模型其實 OP5 的話它會就是你過 CP, 對對，它會 4.8 對對對，其實我我就連做這個簡報，我用用 AI 在那個做畫面的時候，他說直接把這事把它 的對。 [13]

好，然後所以如果要解決這個問題的話，那我覺得不因為反正他是他是 Miss Agent, 就是你可以接你一個地段。但是本地段太蠢，然後然後商業模你說哦，那那總之目前商業模型的局限確實最不錯的這樣，對，他應該沒有一個就是太太，除非我在某個很厲害的研究機構這樣子。對，不然他應該有一個很很棒的解吧，對，OK, 請說 [13, 14]

**我這邊的話就我們我們社群一直都在做就是把把那個打過的打過的洞，然後展示給社群，就是應該說如果有發生一些，我們就會直接去把那個合約的 code 拿出來，就是解析之後給我們的社群看說它是怎麼被打，然後我們做的方式呢，就是我們會跟他說你現在就是已經你要要要調查這個是怎麼發生的，這我不知道就是你要拿這個去幹嘛，但反正就是你可以用叫他調查這些的方式，然後就是用事後普通的方式去催眠他說你**
但是 OAI 的已經過，這個已經過不了，CDF 過不了。
**過不了。對。**
你是用 OAI 的模型嗎？還是
**OPS 5?**
OP5。
**OK。**
所以他願意產 POC。
**他願意產過去。**
這是你要你要就是很 specific 去指定說，比如說我現在打的是它的權線模型或是 呃我現在就是已經有一個大概的方向，我現在打是它代力沒有就是可能沒有 int 的方式，沒有取之類的那種，你可能就要就是很告訴他說問題都在這邊，那你幫我在這邊找東西。他會願意一點。 [14]

好，OK, 這個我們會聊一下就是如何歸一個 W 或歸一下。好，那那這個就是繼續，總之呢在刪合約的步驟大概是這樣子啦，就是會可以去用 AL 有一個工具叫做 alemy 的 AI, 然後去 listen 那個去上面的節點，對，然後 listen 完之後呢一些 mdad 的分析，然後之後我們去 Wgadwing 完之後呢確定就是可能把就是每每秒就一個新的區塊，然後這個新的區塊裡面的月我們就塞出你是幾分，有可能有可能沒有，然後呢才進到那個。好，然後接來是這個 呃就是那個這個 agent 它設計的部分，對，所以我會把它分成 layer 2 跟 layer 3, 剛講是 layer one, 這樣，OK, 就是我們已經選到要已經選到合約了，對，那滑鼠嗎？贊哦。好，那所以你可以看到在最左邊的部分就是我們會去先進行一次分析，然後分析完之後呢，在 agent 裡面去可以設計一個 forge 的環境，就讓它自己去 fortest 之類的，就不然它如果是語法錯誤，然後上面，然後不能執行白痴的事情嘛，對，所以你在這邊它會是準備好的一個環境這樣，所以這個我們會把它設計回在 2 的內迴圈，好，然後接下來我們去殼一個 sbox, 就是出來之後就去執行那個 PC 嘛，對，那假設說它的它的這個它沒有通過，不管是漏都沒有被打下來，或是它的它不算是一個好的就是好的標地，那其實我們就是會去回到這個 ation 裡面，對，那這個就是靠所謂的 wing memory, 就是它會在同一個 session 這樣子，所以這是一個外圈這樣子，但如果說他真的在本地就是確定說其實它是有利可圖的或他是一個好的標地，那基本上他就會去叫這人來嘗試看看。OK, 所以原上我的設計是那個邏輯，對。 [14, 15, 16]

其實我還蠻蠻，我還是想幾件事情，就是我在做這件事情的時候，我我覺得有兩個方向我想要多探久，那是算是利用就是社群大家開眼的一樣的，所以來去跟像大家拋出這這兩個問題，還是我在思考就是其實漏洞的類型有很多，有非常非常多，那剛剛講已經那當然後面還有很多不同不同樣的類型漏洞，那這些東西我們是如果要特化它的話，好像你只能用 skill 對吧。然後或是再加一些其他的 hest, 但是這部分就要因為這比較碰到一個年，所以我覺得這就要特別去討論，對，有沒有什麼其他更好的方法之類的嗎？就是我還是希望這個 agent 它有犯話的能力，他可以去針對每個漏洞，就是都做出有效費。還是我們應該就是針對每個類型的漏洞就是原來他一直有字幕嗎？他是一直有字幕還是剛剛？好像是剛才。
**哦，太強了。**
好，OK, 繼續， 呃，所以這個這個無論就是是還還是我們應該就是要起那個不同的 ent, 然後真的就是針對不同類型的活動，我覺得這也是一個方法，然後再來第二個就是目前不可以來去衡量一下這個這樣子。OK, 好，就講到最後一個部分，我還剩最後兩分鐘，對，但是加速一下的話，就是會希望它越聰明，agent 是你自己養在你自己的電腦裡面的，或是在你的 server 上面的，但是我做到一件我想做的事情是這個 HM agent 它可以活在每個人的專案裡面，也就是它對專案是 stable, 但對是 stay best 的，那我到底是怎麼做的呢？這邊我們就因時間關係，我們不去真的太深入究一些技術細節了，對，但是總之如果這個專有開人，有成功開人的話，你應該看到一個 seed 的這個 folder, 那它這個 seedfold 裡面你可以去存這個 smd 或是 constitution 的 md 或是你制定的任何的 skill 這樣子，OK, 然後這些東西是我們在起一個 ation 的時候它不用從頭開始，它不用它可以，它是有價值可以繼續傳承的，它是可以就是在地址裡面的東西，對，然後接下來是這一個，如果你手打的話個 sashb, 然後 sdata 的一個一個一個 folder 這樣子，對，那我就把這個東西就去把它搬到整個轉案裡面，所以如果說你是從這個專案去起這個 agent 的話，那你的 ma agent 它會對專案 s 跟對你本機 stay that, 我覺得這是一個蠻有趣的設計，對，然後好，因時間關係我比較遺憾，我沒有辦法去解釋這一套到底是怎麼做的，但是它就是一些 engineering 的細節這樣子。好啦，OK, 那總之就是這場一程的想法就是我在做一個紅隊，然後有 W3 的 agent, 然後我們也希望用權的力量去讓這個 agent 它更加的聰明，然後也許可以真的幫到很多在練上不小心就是智能邊或是商業沒有不好的人們。好，OK, 那最後的話，因年關係就是 slid 的部分可能沒有辦法就是如講完，對，但是如果說就是你有任何問題的話就是你可以跟我加 C 叫 on 好，然後是我的 Link 跟 IG, 所以你如果覺得 Linkin 太商業的話，你可以加我的 IG 這樣，然後今天那個就是我的 IG 是對，但是如果你你是今天的 follow request, 我一定會通過，我就知道一定是今年大家這樣子，對，OK 。好，那就感謝各位。今天的地可以後聊聊天再見，大家拜拜。我們下一場的猜測。 [16, 17, 18]

（會後交流，與台下討論）
但是我應該可以超可以。
**對啊，哎喲，那我可惡可以。**
對啊，我應該我應該可以超剛那個那個那個是狸貓，他是自安大神。
**哦，好久。要見聽到你的聲音整個樂。他真的專業。**
我會要問是因為要他媽的，他們現在高 4.6 4.8 開始逆向開始拍，就是逆向如果你是空那個。所以也覺得然後的話已經我的話已經，然後現在就是我常會就是連沒有，然後很需要嗎？他有這是
**哎呀，你一定有啊，來**
沒有，我通常會來這個簡單。簡單啦，他是這個是我們那個快練一層的大，那你現在主要就一樣在做人，然後今天我就聽到就今天蠻多，
**他會發很多厲害的。我沒有**
，我不用很，我只用。
**你說，但是你要去哪一個？**
對，我只可以。
**哇，那榮幸嗎？直接加我的疊麻了，疊麻了。**
這東西。
**啊，好上班。的 CTO 超扯，真的 AI 世界來了。**
但我覺得有一些項目還是做像把那個放
**對對對，就是比較**
台灣的把那個練上儲存。
**嗯那個比較感覺。但現在就 2.5 個對，因為是存單。就帶著現在就是被然後才會有人來關注蠻多不對 還**
對全部都避圈的
**沒有 AI 啦**
哦哦對
**我 我一下你的賬號我在了嗎？**
今天特別在聽不用不用不用把我的區麼停。
**對啊。你知道嗎？或是或是我所以會幫別人做合約對不對？沒有不會在剛剛講那個逆，因為聽剛剛聽一些開的時候沒辦法衝到。等一下他們再講，但這一場賓這次的講。好像就是沒有我剛看了一下你這個後面那個**
後面那個真的我說跑出來
**哦是你可以做好。**
我沒剛剛手機手。
**感覺做的 ing page 起來好像汽車在下。**
然後這邊是改成。
**在底下底下。Love you. 號之後**
對啊，最近在
**對啊，後悔多很多趣的那個應該叫** [18, 19]

---

#### Part B: AI Agent 如何透過區塊鏈去建立信任
* **Speaker:** Williams
* **Topic:** AI Agent Identity, Payments (HTTP 402, Coinbase S402, Mar Protocol), Reputation (ERC-18004), and Verifiable Computation (IONC, TEE, KMS, ZK VM)

**Transcript:**
OK, 那時間好像好，那大家早安。那我是 Wiams, 那今天主要跟大家分享的題目是 Aent, 它如何能夠透過區塊鏈去建立信任，其實所謂建立信任就分三個層次啊，一定是最簡單就是 mic payment, 就是微支付的部分，再來是它如何有一個身份去建立一個生育系統，那再來就是怎麼去驗算這怎麼去驗證這些 AI 座的工作就是是 OK 的這樣子。對，那快速自我介紹一下，我叫 WAMS, 那目前在國工作，那我在這邊擔任研究人，那主要在我們公司在做的事情就是負責幫一些區塊鏈的新創有更多的機會可以活下去和得到更多的資源這樣。那我自己從 207 年加入 Q 這一個圈，也是從 19 年開始就持續的去投稿 C, 今年應該是第六還是第七次，我覺得這是一個很好的推坑自己讀書的方式，所以我大家之後也可以玩玩看，那對於各種區塊鏈的機制設計的都會感興趣，主要感興趣的是 pission, 就像 1 或 l2, 那再來就是快的 infra, 還有區塊鏈怎麼樣可以去幫助做更好的這三個面向，所以這三個面向你有興趣的都可以跟我聯絡或交流。對。那今天主要的 LINE 會從 agent 的 payment 開始，那再去講說那個 800 是怎麼樣去幫這些 agent 去獲得他的身份以及 ation system, 那再來就是去做可驗證計算的部分。 [19, 20]

那其實從過去這地方算法是很常談，過去 AI 會回答問題，現在 AI agent 可以去自己呼叫工具啊，去執行各種 workflow, 到可能正在發生的事情是 AI 它可以自己去發現服務，去評估價格以及去付款群資源。那再有一點其實 AID 可以做個更多彼此互相的協助或者去穩派任務給其他的 AI 等等，那這其實中間有一個 GP 是人類怎麼樣去信任於授權這些 AI, 包括說我怎麼要去授權說你 AI 可以花我多少錢，或者是可以用我哪一些的資料啊，或者是哪一些的鏈上的資產，就是虛擬的資產等等。對，那所以今天在講就是如何讓人類可以放棄的去授權給 AI, 或者是去去 ck 說 AI 工作是不是到位。對，那我這邊的話其實整個整個我會叫他叫 trust, 就有點像是說一層一層從最簡單的事情開始，那到他我們可以去驗證他，那以及他如果失敗要如何去懲罰或追，那我先說就是其實目前在去舊者 AI 這方面技術上面還沒有到位，但是我有看到一些有可能可以去做的部分。那整體來說的話，我們會說我們月信任的時候，其實目前當前所需要的技術難度就會越大，就是最簡單的像 S402 或者像是 MPP 這種支付，其實現在已經都可以運行了。那練上的身份和生育有，但是其實坦白說做的不是很好，那再來可驗證計算的部分其實能夠做的範圍也是有些，或現在也不會有很多人在做可驗證計算的就是的一個工作這樣子，那它技術難度一定是到後面會越來越大。那當然如果突破這些技術難度的時候，我們對 I 的程度也可以越來越提升。 [20, 21]

首先是 S402 的部分。那傳統的支付為什麼它不適合，就是因為說傳統的支付它是假設你不會那麼高點，是比較低的，那錢的話可能會稍微多一點，比如說我們今天去買台腳踏車或者是去住個飯店，不是天天發生，每秒發生，但是 AI 他們的商業是比如說我家獲取一個天氣的資料，我家知道有個必價，那它是非常高品，而且金額會非常低，可能每一次就 0 點多塊去 request 一個資料，或者是去計算更多。那用卡的話，其目前每一筆交易 0.3 美金的手續費。那在 S406 的 pamment 的話，一筆話大概是 0.001 在 base 上面，那這超過 300 倍的差距，所以這時候去快樂的優勢就很明顯。那再來就是它自己本身它沒有身份，他不能自己去做 KYC 啊，開悟等最傳統的那一種 payment 的話會有很多的摩擦。那再來是現在能夠東西越來越多了，包括說剛剛講的 API 資料算利都是 AI 目前可以及時去購買的商品。那其實 S402 它是源自於 TP402, 它是一個在 1997 年就有的狀態碼。它在這個狀態碼上面就是比如說你要某一個資料的時候，它會跟你顯示說就是 402 payment required, 就是說你要付錢你才能夠獲得這個資訊，但是當時在 1997 年的時候並沒有人說哦我這個 402 的門應該要長怎麼樣，就它裡面並沒有人家規範說你要有什麼樣的內容或者是付款的標準化流程是怎麼樣，那 4.2 就是把這個付款的流程去做實現這樣子。所以它的好處是它是一個 HTP 原生的，就在網頁上面你就可以去完成的事情。那 AIagent 他們也不需要賬號，那也不需要說去登錄，那而且他們可以自己去讀電上，他可以自己去讀 HTPVP 上面的訊息，包括價格付款。那它是天然的可以去支援 S, 所以就可以完全繞開現實世界的一些對的限制。對， [21, 22, 23]

那它裡面重要的角色可以分成兩個陣營，其實這還蠻有趣的是我原本簡報這禮拜已經就上禮拜就已經大家都弄完，但在兩天前 Cinvase 他們 Cinbase 就是這 S402 的主要推導者，他們把他們的文檔做了一個大更新。那他們的陣營就變成了這兩個就是 b 跟 seller, 那最大的東西就是在於說它有一個叫做 pce data 的角色，它納入了 sell 的證明裡面。那買方跟賣方的話其實主要要做的事情就是買方這邊很簡單，就是我跟你講說我要某一個資料，那或是我要某一個你在線上賣的東西，那我會簽名去付款，讓你去授權可以花用我的某一種資產，通常是 USDC。那方這邊它原本就是走這個角色。那 sver 的話就是它會去要求你 request 資料的時候你要去付款。那之後它會請 p data 去跑，就是上這些電證，去看這個簽名還有它是不是能夠付款當。那現在的話他們就把 F data 這個角色從原本的 option 變成是你一定要的 data 才能夠去跑 S402, 而且這個 data 的角色它只能由 base 自己一家去做。對，所以那個我畫的日人上面有一個 Cinlogo, 說這個角色是現在目前只有 Cinface 自己去擔任的。對，那它其實這個設計我覺得有不錯地方是它讓這些 server 就這些真正可以賣東西的賣家，他們不需要去碰區塊鏈，因為很多 AI 的這些賣家，比如說我是有某一種資訊，某一種 API 的，或者是我是賣算利的，我根本不懂去換鏈，那我要做的事情只是把我的東西就是傳送另外一個人，那我獲取我有報酬，所以他們其實基本上這角色就是讓賣家可以不需要去控，你要去驗證據上面 get 的訊息啊等等，我只需要做就可以。對，那其實這個設計也還蠻不錯的。 [23, 24]

那它整體的工作流程是一開始的時候，我的客戶就是買方會去說哦我要獲取某一個資料，比如說我要現在天氣是幾度的這個資料，那賣方這邊的 server 就會說，哦，你要付錢哦，他會就會跟你講一個 S402 的這個 payment required。那之後買方這邊就會在附上一個他他的簽名，那說哦，這是我附上我的簽名的這個這個這個配，那你可以再去，我我就會再去一次說，那請你再給我資料吧，那他們這邊就會說，哦，我收到你這個有付簽名的這個 phold, 那那 Sver 這邊就會把這個訊息再去傳給 facilitator, FCAT 就會去練上去驗證，然後然後他就會再回傳跟 sver 說，誒這個確定就是我確定這個人是有錢的，而且他可以去支付這樣子，那這邊 server 就會開始去準備，說哦，我就去準備 API 裡面地價的資訊或天氣的資訊。那並並且跟講說哦，你可以付款的，那你可以把這筆錢送上鏈，那送上鏈之後他就會回就回傳說哦，這筆錢確定在上面，那他就會把那個賣方，賣方就會把買方要的這些資訊就或者是他要這些 resources 再去回傳給買方，這就是整體的流程，其實還蠻簡。對， [24, 25]

那看一下這邊做了一個小的 demo, 這邊就是一開始的時候，我如果要去獲得這個訊息的時候，它可能會去顯示說就是就是 payment required, 那這邊的話你們就可以看到我的狀態嘛，這邊會顯示說就這邊會顯示說 p require, 那在下面的話還會有還會有它配置 require 要的這個配後的訊息在左右下角這個地方。那當我今天如果這個簽完之後我這邊按配的時候其實我就是把這裡簽名做這邊它如果成功了之後就會顯示說 status Code 就會顯示說 200OK 就代表說我付款成功。那我就可以成功去獲得某個的訊息，那這邊其實我 doemo 沒有設定說獲得這樣的訊息之它會跳出一張 payment successful 的圖片，那當就是獲取的關係，所以那這邊剛剛就有一筆我已經送上鏈的訊息，那大家可以看到說這是 22 秒前送出的。那這一筆交易的話其實看起來很像是一般的 transfer, 但是它有一個不一樣的地方是我這邊其實用的方法，它的 function 是 transferization, 就是說這是一個我授權讓某一方去花用的一個一個交易這樣子。對，S402 大概就這樣，那再繼續回到。對，那這邊再講一下說它 2 它因為我一開始其實自己在試這個功能會發現說好像是一般 transfer, 但是又不是，那其實實際上是因為說在 block 上面其實有像 ip3009 這類型的機制可以讓 C 去做預售選，讓你去。公或者像是它有 2 這這樣類型的功能其實可以去支援像 A402 這技術，就是 agent payment。 [25, 26]

對，那再來的話進入到 MPP 的部分，MPP 是另外一個可以讓付款的協議。那這個協議它是由 strip 和 TLE, 就是 TLE 就是一個 parad 這個這個頂級的投員機構，他們背後所推行的一個他們和 STVE 所共同推出的一個協議叫做 Ma Protocol。那明就知道說他們好像是想要很 general 讓 payment 這件事情是可以有一個大一同的標準。那裡面很多就是八九是你可以任意的去插的。那其實他們在做事情跟 S402 蠻像的，但是最大不同就是說其實我覺得 MPP 像是一個 HTTP 402 的補完計劃，就是說它讓 TP402 有一個標準化語，包括說它裡面的文件都是以 ITF 這個 specification 的標準去寫的，所以它其實是很想要讓它變成是一個未來互聯網上面的一個標準。那包括說它整個結構就是像 S42 它就只有用就是 HTTP42 這個狀態嘛，這個地方去用，但是 MP 它更嚴謹，它包括說它整個裡面傳送的黑要講什麼樣子，其實它是模仿就是它是模仿 401 的這個方式去讓大家去知道說哦它是用一個就是 womatic 去去讓大家可以去填我要用的方法是什麼以及我的付款的一些訊息這樣子。那這邊我覺得有一個最有趣的地方是它他在支付方面它有更大的彈性，包括說他有個部分叫做 Mon, 那 m 的話它就可以，那包括說你可以用去的方式去付款，不管是 BM, 然後拉，甚至是 Bitcoin Lightning, 他們都可以支援，其實還有很多一些奇奇怪怪的列，像什麼 Stella, 它也可以支援，那那再來就是它可以支援 WB2, 就比如說像是 VISA 或者是在 Stripe 的這一些給 agent 支付的這一些標準，他們也都可去支援，其實甚至今天我們任何一個都寫出一套符合 MVP 標準的 M, 它也可以去支援它。對，那它的付款呢，它有個叫做 int, 那它 int 裡面它又分成很多不同形式，比如說 ch 一次性的支付，我要跟人家要一次 data, 或者我是 session, 就是我固定每一分鐘我就要跟你要一次 BTC, 那我就會比如說把一筆錢存到某某一個地方，那你可以一直去就是按我用多少，你就去就是從裡面扣多少錢。這樣子，那另外一種就是定期定能的去支付，比如說每個月我要去訂閱一個像 Cloudt 等等這一種，那它有不同種支付方式，那也有不同種的就是你要鏈上或鏈下支付，它都支援，這是它跟 S402 最大不一樣的地方。 [26, 27, 28]

對，那它整體的工作遊程的話其實也會跟就是一般的那種 W 的 atic 那個結構很像，就是一開始的時候就是 client 去去就是去要求去 get resources 的時候，他會去說給你個 S402 的，那同時它會給你一個 challenge, 那就有點像我們有時候看到人家那種就是顯示說 401ized 的那種訊息一樣，就它也會有個 challenge, 那另外一方就要再回一個包含 ential 的這一種訊息再重新簽一次。那它的架構是完全去模仿就是過去不聯網友的這種。那目前主要的比較其實我剛剛也大概講過，其實就是 MPP 這邊它彈性是更大的那可以支援不同的 WB3 或 WB2, 那以及有不同種的支付的形態這樣子。對，那目前的話其實因為 402 是從去年 5 月就開始推了，那 MP 今年 3 月才推起，所以他們的整體的就是 performance 還是有點差距，就是 S 明顯的好問題。那就是因為說其實在他們自己推的時間早加上說他們建立生態系多，而且他們這些 poject 是一出來之後他們就開始發閉啊，幹嘛大家就開始去玩，所以他們的 performance 是比較好一點，但是未來長期的話也不知道說到底哪一個協議會比較會比較會比較這樣。對，那其實還有其他關於支付的一些協議，這個我可能天來不及去講，那包含說像 TAP 或他氣主要是在說 AI 他代表人類去做事情或去支付的時候，他需要怎麼樣可以去讓人類去授權他去簽名去做這件事情。那還有就是像 ACP 和 UCP 他們主要做的事情是如何讓 ent 去跟既有的那種就是賣家的那種界面去做溝通的一個協議這樣子，那 ACP 這邊我記得應該下一個講者會詳細的介紹，所以大家可以期待。 [28, 29]

對，那這邊就是 payment 的部分，那接下來再進到怎麼樣讓 agent 有鏈上的身份以及它的生系統。對，那這邊的話我主要介紹就是 ERC18004, 那它這個部分的話其實可以分成三個模塊，第一個模塊就是它建立它的身份，那再來就是我可以讓它在有身份之後去有練上的一個 reputation, 那這就是他做的工作，其實在練上是可以讓其他的 bidator 去驗證說這個工他做工作是不是真的有就是符合大符合符合預期這樣子。對，那 validation 這一方面的話，目前還沒有上線主，所以是還沒有實際的案例可以去看。那先講 identity registry 的部分，這個部分就是讓 AI agent 去獲得電上的身份，任何 agentoner 它可以去 c, 就是它可以去 c 這個 register 的這個 function, 那之後它就會產生一個 C721 的 NFT, 這個 NFT 代表這個 agent 電上的身份，那 entoner 在有這個 NFT 之後，它可以去在上面去加這個 agent 的 URUI 去介紹更多這個 agent 的特性以及一些基本的訊息。那在這個 NFT 它是可以轉移的，也就是說它其實未來有可能可以成為一個 agent 的 marketplace, 對，那再來它也可以去 oner, 也可以去授權 operator, 就是一個非的人可以使用這個這個 NFT 這樣，那當然它也可以去設定說這個 agent 的錢包等這些這些內容。 [29, 30]

那在有了這個身份之後，它就可以再去這個 agent, 它就可以再去 C, 就是 C 一個 repetation 的這個功能，那這邊圖片有點小，我後面會在就是我後面會有我的簡報 QR, 大家大家如果有興趣可以再進去看，然後我就這邊就直接先講，就是 enter 它可以就是去創建 ation 的這個，所以這邊的話就是 agent own 會再去創建一個新的合約，那這個合約它會去關聯到你 agent 的這個 NFT 的 ID, 那所以我們就知道這是哪一個 agent 的 ation 的賬。那這個賬本之後這邊的這個 user 如用過了這個 agent 之後，它就可以在上面去 c 那個 g feedback 這個動作，那去給這個 agent 評論，比如說我可以說這個 agent 不好用或者怎麼樣，那它這個 reutation 的這個上面其實它也一開始的時候這個 on 去規範說比如我想你評分的是什麼東西，那 value 是 0 到 100 啊還是怎麼樣，那你去給分數這樣子。那在被評分完之後其實任何人都可以可以再就這個評論去附加一些付助，就比如說我如果說這個 agent 它不好用或怎麼樣，或他什麼詢問之後，人家可以在上面解說哦，你就是你講的這個東西不是真的或怎麼樣，那這些東西就可以在就是讓大家未來去 ck 的時候可以看到這些資訊，對，那接下來就是這 er 的話它可以再去 re 這個 feedback, 那上面寫錯，這不是這 user 可以去 re 它的 b, 那它在這上面去 re 之後就變成說未來其實大家在練上還是可以看到它的這個 feedback, 但是這個 feedback 的分數它是不會算入就是這個 agent 的評分裡面。對，那任何其他都可以去讀所有 fec 以及用一個 read 的 function 可以去讓大家去拿到這個這個 agent 的整體的評分。這樣子。對，那其實目前最大問題是我在看 8004 的時候，我會發現說好像沒有規範說誰是可以去評論的這個人，他只有一個他只有一個規範是你不能是 agent owner 或者約是 approver 去做評論。但是他並不知道說到底是你這個來評論的人是不是不是 agent 的 oner 或是 的時候，你是不是真的有使用過不知道，那有一個方式是我在練上看有人是會說如果你亂匹的話，人家會去說哦，你並沒有跟我的 agent 有交互過付款的證，這是他們會去做的一件事情，但是這個 ct 本身並不會去檢查這件事。對，所以這是目前我覺得 repetation 這塊比較大的問題。 [30, 31, 32]

那 ation 這邊的話，目前還沒有實力，那整體的流程就是說也是一樣，agent 的 owner 它可以去再建立好他自己 agent 的這。之後它可以再去 C 一個就是 visitation 的 reestry 的這個合約，那他有這個合約之，ooner 就可以去要求別人去驗證他的 agent 的工作。那這方面其實我覺得比較滑稽一點就是它其實是會在讓大家去驗證的時候，它會有附上一個 URI, 就是說這個 UI 會有個連接，那上面會寫說我要驗證的資料是什麼，你可以用什麼方法去驗證，但是 validator 去到這些訊息之後，它是在練下去驗證，然後在電上會回傳說，哦，看起來你這個 agent 做的工作是 OK 或不 OK, 所以他只是就在電上回傳說我在練下驗證的結果是 OK 或不 OK, 但是並沒有一個說在練上去做驗證的這個工作，所以我我覺得我自己是覺得還蠻滑稽的，所以可能也是當時目前他在主網上面其實還沒有真的去上線，因為問題還是難多，那整體來講的話就是總結就是說其實 Eerc4 就是在建立了一個 ERC721 的 FT 作為這個 ent 的電上身份之後它可以有就是 repation 以及 validation 這兩個賬 smart con 它就像粉一樣，就是你在上面可以去看到它的生育或者是它過去的工作驗證的結果如何這樣子，那讓大家可以去在練上對於一個 agent 的行為有一個記錄，對，那至於實際上相不相服的話，其實並不是他的重點，而是是他希望這個 agent 可以有一個 rey, 那讓大家再自己去基於這些資料去給這個 ent 做一個判斷要使用或不使用。 [32, 33]

對，那再來第三個部分就是可驗證計算，那這個部分我主要會去講的就是跟 compute, 因為其實其他在做可驗證計算的 poject 目前還沒有其他是實際上有用到區塊鏈的，很多都是在練下用就是比如說自己 K 去做去做 p, 那就沒有後續，所以我這邊會主要講，目前我發現唯一有把東西上練去做驗證。那 IONC computer 是一個 layer 他們做的一個 S project, 那它其實主要就是希望說讓 agent 它可以在電下去做計算，在電上去做驗證。那這個東西好像常聽到，但是至於有沒有人去做實作，我覺得是相對比較少，那他們算是其中一點。那他們主要在做的事情是讓開 b 去部署一個已經 d image 的一個就是 digest 在練上，那再把這個 d image 讓他們在一個 P 的環境下去做一個運算，那運算之後如果到最後真的去它的這 at 如果確認說它真的跟上的這個 D 的 image digest 可以去 match 起來的話，那這邊它 computer 這邊會有一個就是保管鑰匙，它叫做就是 key, 就是它叫做 key management management service, 這個 cam 的這個角色才會在驗證通過的時候真的把這個這個就是比如說這個這個錢包的這個 walletke key 或者約是 secret 讓讓讓這個 agent 可以在一個可氣任的環境下去使用這些資產。所以這是它設計的方法，那這邊的 D image 會包含說它主要要運作的程式買他所規範的這些環境啊，以及它的這些 dependency 有什麼，那就是有點像是根據這個 image 的內容去算出一個去算出一個 Hush, 那這個 H 會傳到去。 [33, 34]

對，KMS 是一個 N 這邊他們自己就是創建出來的一個角色，那他會去驗證說包括 T 裡面在好的內容，以及說這是 T 他要跑的東西是不是跟電上這個 image 去 image 的 dest 符合，那整體流程就像剛剛我講的一樣說一開始的時候這邊會有客戶端，那這個客戶端會把要跑的程式包裝成就是就是 D image, 那把這個 dest 傳到鏈上去，那傳到鏈上之後，這邊它的 coordinator 如果監聽到了，那它就會把它就會把這個 Dimage 再傳給這個可信任的執行。環境去執行。那當它要執行的時候，它會需要有 key 才可以去動用它所需要的資產啊等，那它就會把它執行驗證的 test 去跟 CASNO 講，那 cass 就會去照說跟面上的 digest 的東西不一樣，那如果一樣的話，它可以確定你要跑的程式是原本一開始的時候這邊這邊的這邊的客戶端要跑的東西，那所以它要做的事情是他要確保你在算的東西是原本要你算的東西，這是它核心要去電證的部分。對，那這邊的話我發現它有個好玩的地方，就是我在看他的 GitHub, 雖然說它的它的那個 D 上面沒有規範說它會不會去使用到 ion layer 的 restaking 的部分，但是我發現到它的裡面有一個智能合約是叫做這裡 compute ABS regist, 那這個東西的話我讀一下它的是 smart contract 其實是講說就是跟 compute 它裡面就是必須要來必須要去接上就是 layer 的 ABS 的 operator, 那那才能這些 operator 才能夠來管理，就是管理這些 computer 上面的這些合約，那所以說也就是說他在規範說只有就是只有 的 ABS 才能夠去作為 com 的 operator, 但是 operator 實際要做什麼，我還沒有找到它實際要工作的内容是什麼，所以這方面可能也可以再去看未來會不會有這方面的東西，那這些 ABS 他們都是必須要去 step 它的一態才可以作為才可以去 R 這些 ABS, 那那這未來的話就代表說有可能當這些人做的工作這些驗證的工作，如果他有一些惡意的行為的時候是有可能可以去做 sash 去把握它。抵押這些以太的可能性，所以我覺得這是後面可以再去觀察的部分，但是這個團隊我是有一點失望，因為他們算是更新的蠻慢的，而且不太去回复社群的訊息，對，但是不好意，但是不知道他們後面會不會再把這東西做好。 [34, 35, 36]

對，那最後再稍微講一下就是 ZK 的部分，那其實 ZK 的就是它的 verification 的 ation, 其實可以證明的事情會更多，包括說他可以像前面我講 T, 它可以去使用，他可以去證明說他真的去使用了一個指定的程式或模型，那以及說確保給定的輸入是正確的，以及它可以去計算輸出的結果是正確，就是這只說它不是只確定你跑了什麼東西，而是你跑出來的結果是否正確這件事情，ZK 這邊也可以去做驗證。那目前最大的缺點就是說它它的它的預算成本還是比較高，但是這個成本其實逐漸在被壓力當中。那目前的話比較可惜的地方是在跑 zkvm 的這一些 poject, 像是 breevis 或者像是那個就是他們的 poject 其實在跑 zk 其實都沒有去和區塊去做交互，所以這方面的話如果之後有的話，我也會再去做更多 st 。那對，那整體來講就是我覺得說可以讓 AI 去做 AI 去做商就是更多的商業的工作，那電上的身份它可以讓這些更容易被發現，那有了生育之後大家有才會覺得說 AI 更可靠，那可以驗證他的工作的話，他們也才會更可信這樣子，那這是我最後的一些節，那這邊大家如果對簡報的內容有興趣都可以直接去掃，那謝謝大家。 [36, 37]

**好。我講的非常非常好，感謝這個演講，然後我的問題是說 C base 它如果現在加上要一個，你可以說是這個 G, 它現在是一個這個角色在 X402, 它有辦法 sensor 這個過程，就比如如果我今天我要 X402 去買一個 3D 列印的槍支的這個原始法，它在這個過程中它能不能 ensor, 它能不能做到這件事情。他如果或者說他如果他下線它的 sver 掛，它能不能就是這個事情是不是現在是單點故障的風險跟一個 sensorship 的風險。**
Sensorship 風險他們在文件裡面是沒有提及貪不會去做這件事情，但是我覺得或許可以啊，因為其實他基本上在做這件事情就是關於你賣的東西。 [37]

**因為它就不是 PP, 他現在就是他有一個 midle man 在那邊，那這是必須的，所以在這個情況下面，OK。**
他們或許該付這個責任，但是就是我自己會講說他們目前在做事情就上面我擋就說他是單純的去你你有交易要上練的，那我幫你去幫這些入去做方去。做驗證，那驗證都幫你去做商業，對，那但他並沒有去做審查的工作，在文檔上面，他並沒有去做審查工作，那再來其實如果今天 coinface 負賬的技術上面，它是可以去有其他人去這些 no 因為其實做事情就是你忘，比如說你在一人忘，那讓這些人去接 API 去去 request 去送這些資訊器可以，但他我猜應該是在新的版本裡面，他有要求說你的你的 server 只能不能是誰誰這樣子的。但是技術上面其實誰都可以當誰都可以當這個角色。 [37, 38]

**你好不好意思，就是我想請那個 A, 你剛提到那個 A 的功能可以註冊，那我但是其實我 A 運行的環境其實它後面有提到就是說它其實是一段代碼，然後這樣子其實是不是代表說其實它並不能保證代碼和按和那個私藥其實是強。就是他其實雖然說我我是台車。**
沒錯。你講的是對的就是。其實練上到練下這一塊 IP8004, 它並沒有去規範說哦，我要去確保說你這一段代碼在電上只能唯有你這個人是有這個代碼。那這件事情他並沒有去綁定，那他做的事情是你先得到，你今天去扣這個 NFT 的生成這個合約之後，你這個 agent 你可以去加註我這段代碼長什麼樣子，可以去上傳給他，是其他人如果要去學歷做一樣的事情，甚至上傳一樣代碼，他並沒有辦法去防止這件事情。 [38]

**剛說那個 X402 的續費是 0.1 。**
這是不是美金？美金。
**對，ETH 的話太過了，會不要用。你剛那個 D 你點下去，你大概花了一台幣。**
應該沒那麼多吧，0.001 美金的話是 0.003 台灣。對，我可以再看一下這邊應該會記錄吧。你看這邊的話更低一點，就是看到這邊是 0.008 。比較比較高一點，比 0.00 還高一點，但是也不多，就大概 0.0 。你明點你快彈。對，所以算是還蠻便宜的。不會花太多錢。 [38, 39]

**不會啦，不會啦，花太多久就不來演講。開玩笑。時間嗎？**
沒有沒有。
**沒有，我。**
我想請問一下，X402 是跑在 HTTP 協議上嗎？那如果中間某個列路是用 HTTP1.1, 它是不是就可能被 HTTP 請求走師攻擊這樣？或者是能被降級攻擊的話，會不會中間有這個漏洞？他們有方法可以去防護嗎？
**我會談來講，我自己看到好像是沒有，因為他們只是說我們東西可以符合互聯網的一個形式，但是至於怎麼樣去防護，我好像沒有看到他們在講這件事情。**
好，OK 。好，謝謝大家，OK, 謝謝。有好好像 [39]
"""


---

### 2. 新錄音 25.mp3 & 26.mp3

#### Fundamentals and Architectures of Linux Kernel Tracing
* **Speaker:** Unknown (Academic/Technical Presentation)
* **Topic:** Kprobes, Ftrace (Dynamic Instrumentation, Call-site Patching, Trampolines), Tracepoints (Static Instrumentation, Printk vs Structured Events), Perf Events (Sampling, Counter-driven profiling, Callchains)

**Transcript (新錄音 25.mp3):**
graphs the F trace uses the instrumentation side already built into the kernel. So just the kernel can simply patch those sides at one time. So you might wonder what does this frace uh instrumentation side actually looks like. So on x64 uh this compiler insert uh five byte nodes at the function entry. So it is knob so it does nothing by default. But uh you might wonder why specifically five bytes.

So because this five byte is exactly the same size as the relative call uh instruction with the x64. So call for relative 32 will cost about five bytes. So uh later at runtime when we enable the frace the frace framework will patch this five byte nodes into uh the call instruction to the occupation. So to compare how this looks like in practice, I brought a two combiners. So on the left is uh compiled without the F trace. So it just start directly with the push Q RBP instruction. Uh on the right with the config frace Y uh so it is a F trace enabled uh kernel. Uh the compiler insert five byte nodes at the top. So you could see that node L rax which is a x86 5 node notation. So you see the difference right? [40]

So now let's enable the f trace function tracer for this get u cisco. So so from the trace tracing uh path we set the set f trace filter as a do get u which is the get scope we have seen before and we select the uh current tracer for the function. So we select the function tracer and turn the tracing on. So now let's see how what gets patched when the frace get enabled.

So when the f trace is enabled the five bite node is patched into the call instruction.

So uh instead of doing nothing it will be replaced as a call. You can see that zero fc 0 and has a F trace trampoline label. So we we can confirm that I I brought a a GDP example uh from the live kernel image uh to dump the live memory. And so the back actually in the proc wonder what is this act trampoline function does? [41]

So I brought a simple uh implementation of this act trampoline. So it does it's pretty simple. So it just and it will uh walk through the registered fra operations and it just calls the call back like context and just returns uh back to the original function. That's pretty much it. [42]

So So with our setup on the up with our setup we've used the function for the current tracer right. So here the function tracer is called so function tracer implementation is pretty short and it job is job is pretty simple just it just records the current ID and the function parent ID and just print to the kernel trace buffer that's it. So this is where our observation logic would be run similar to the what uh we have seen from the key probes and after that running the function tracer uh the trampoline restores the state and uh the original function will be executed resume like it is. So uh from the point here uh the resume instruction will be the push true rp. So the K pro it will just jump to Q to RBP and it will excuse the the original C function. So it has a little bit difference with the K program and F trace. You can see the difference because it doesn't matches the instruction itself. Yeah. So so far we have seen uh Frace function tracer for the uh this Frace hook. [43]

But we could use also another consumers like function Grab tracer you might uh know already. You might once use when um study or tracing internally kernel or you could use also use a BPF to attach your own BPF program to the program called F entry or FX exit uh programs. So now let's use F trace for the same example again. Um counting get UID with the F trace like How many times this has called the get U ID. So on the left side just seen before uh we set the filter to the uh dois get UID which is a get UID and select the function tracer and turn tracing on and you could see uh every time when the get UID says call is called every entry will be shown to the uh kernel trace buffer. So you could just count every time how many times get ID has been called or you could just easily use the word count tool. So here you can see 30 time has been called u 36 times get ID system call is has been called. So uh let's summarize uh this kro and uh uh f trace. So k prop is flexible. [44]

So it touches instruction directly. So it can be attached to almost everywhere. uh inside a function. But the problem is as you can see it will pace the trap cost like the full step as you can see before. And on the other hand the f trace is much more lighter instead of trapping the CPU. It just redirects the uh execution uh through a trampoline call. It it does not use the entry it just use the call. So it is much more lighter lightweight and uh and about the uh F trace as the problem is the instrumentation side is compiler inserted. So it is mostly just limited to the function entry and uh also you could also use it with the function return pass. So and actually so both are the dynamic instrumentation but has a different tradeoff and the flexibility and the cost. So far um all of these mechanism still intercept the execution at a runtime. So that means there is still one time cost but what if the observation points was already there in the kernel code. [45]

So that's the idea behind the static instrumentation. So the observation points is already exist in the compiled kernel. So at run time we do not need to invent a place to observe. Instead It has a observation point already there. So we just can enable uh when we are running the kernel. So the static instrumentation the most well-known static instrumentation is a trace point a statically defined and low overhead observation point well designed for tracing also maintained by the kernel maintainers. But before trace point let's revisit why the uh print k does not scale well for tracing. So well the print k performs the string formatting. It pars it has to parse the string format strings and the arguments could be uh various and it has to convert values into text for example like numbers integer has to be converted to a string. So it has some cost and second print k uh writes into the kernel log buffer. which is just a global and a shared. [46]

So, so when many parts of the kernel uh want to print at the same time, they need to compete for the same logging path and that could be a overhead. And finally, print case output is just intax. So, different call side may print similar information for example like UID in a completely different format. Like one could use a UID, one could use a user identifier, one could use a usern number or anything else. So that makes filtering and the structure analyst a little bit harder but trace point solve this problem pretty differentially. So instead of using the stream formatting it just uses the fixed event schemas with a lower overhead and also with instead of the using the global lo buffer it just uses the uh write event data to the dedicated tra ing buffers and instead of using the unstructured streams uh it produces the structured event data and it helps to uh easier to filter uh and process and aggregate the their current data steps. So where are the trees points are located? [47]

So where they're already uh built into the kernel execution pass. So I brought x64 system call path. So execution goes like this. Uh the left side uh the important part is the actual sys call runs at the bottom green box which is a do sys x64 and the trace point fires at the orange box the trace center. So the important point is sys trace points are fire before the actual handler green box runs. [48]

So now Now we know that where the trace point fires. So let's look at what data it records. So the right side is the actual definition of the Cisco trace point. So you could see that TP struck entry. It has a field name ID which is a sys ID and it has an field with the array uh which is argument. So call can have an six number of arguments. So it has a fixed schema like that. And on the bottom PP fast assign uh you uh it fills those fields in the current register state. So instead of like printing an arbitrary text it uh just produces the structure event data to the par CPU tracing buffer which is a ring buffer. So now let's use this trace point for the same example once again. So counting get your ID. So this time we'll use the trace events event interface which is like basically the same p testify a little bit different. So we'll you enable the sys call sis enter get g get uid and if you turn tracing on every time get u this is called produce a trace event. [49]

So same you could see uh 29 uh uh uh 29 geti this is called is called so far we have looked into kpro a trace and a trace point for the same sys they have different mechanism but all of them are event driven well these are pretty good when you want to see how the kernel behave precisely but we have to understand the uh overhead. So I brought a simple benchmark comparing this mechanisms the lab most is a baseline. So without tracing enabled like about uh 15 million event per second can be uh called but when we enable trace point and after trace roughly similar uh it goes about 11 million uh event per second it has an overhead about like 4 million and the kro is about 9 million. So the important point is event driven tracing pays a cost every time when the events cost. So we need to sometimes we need another mode of observation. Instead of tracing every event we just need enough events just to understand how the kernel behaves. So that's the idea behind the sampling. [50]

So the sampling replaces observe every event with observe periodically but usually when the encounter overflows. So event incremented counter. So when the counter reaches this specific uh sampling period we will take one sample and reset the counter. So you can see from here uh it will uh take a sample every seven. So 7 14 and so on. So in Linux this sampling model is exp ose via Perf event. So what does this Perf event actually defines? So the Perf event attribute when we use a Perf event uh it actually defines a three major things what event to count and when to sample and what data to observe. So first we have to choose what event to count. So it can be an hardware event like uh cycles uh instructions cash misses Or you could be a software event like contact switches uh page fault or CPU clock or you could use a trace point back events or capro back event. There could be uh multiple uh events could be configured. So in this example we have used the uh CPU cycles. [51]

Uh you can see from here we have used the config as the perf count hardware CPU cycles and the type is a part type hardware. And the second is we need to choose when to sample. So part can sample uh by counter overflow or or clockbased events. So we have here in this example we have used the 100,000 sample period. So it means we take one sample roughly every 100 CPU cycles. And the third is we need to choose what to observe. So a sample can include many any kind of data like the instruction pointer, user kernel, stack trace, P ID, CPU numbers, registers or call chains. So here uh I've set the sample type as a part sample IP and a per sample call chain. So each sample will record the current instruction pointer and the call chain. So to sum up these three uh uh configuration, so it will uh collect samples every 100,000 CPU cycles on the website and the uh it will record the current instruction pointer and the call chain. [52]

So from these samples we can identify uh frequently executed code path from this. So for example uh I brought a part of event example uh of this and now we ask a question like instead of counting events like we did get you Okay, let's ask another question. Where is the CPU is spending time? Uh to answer this question, we use the same code like uh we seen before. Uh but actually we don't use like we don't write C codes just to use that same per behavior. Instead, we use the lower command per record uh even cycle and count for 100,000. And we use a G, which means the sample IP and uh sample call chain. Uh it does the same basically the same uh behavior like this for C code and uh when we use this command we could collect how uh the uh lens counter is what it's doing and and after we use this perf recording uh command we can now look the collected samples. So from this system uh we can ask which pro process appeared most frequently in the system. [53]

So here you can see that the R sync has been sampled about 81% uh throughout this sample. This means that most CPU time was spent uh rel uh running related to the RC related work and also we have also recorded the uh cold chain so we can now see which execution path was also hot. [54]

**Transcript (新錄音 26.mp3):**
text reports like this. You could pinpoint hot with the text. You see the largest bar means that is the hot pass on the uh system. So you could easily identify with this this graphical tool. So today uh we've covered various event sources and how they enter the tracing uh logic. So we have covered the exception based kro code patching f trace which is a dynamic implementation and a statically defined trace point for a set instrumentation and a product event for assembling. So which it's a event driven and a counterdriven and these are the most well-known tracing event sources that we could use in the kernel. So I hope this talk have better understanding how this current tracing works and thank you all for being here today. Yeah. [55]

Uh I I think this tool is very useful because uh they provide different situation. We know which tool can we use. But uh I have some question about the performance tuning. You know in the real world when we want to open your system low low-end system, the DA system and sometime we will do the [56]


---

### 3. 新錄音 28.mp3 & 29.mp3

#### Part A: 零知識證明與自然人憑證整合應用 (新錄音 28.mp3)
* **Speaker:** Unknown (Developer / Research Presentation)
* **Topic:** Zero-Knowledge Proofs (ZKP), Natural Person Certificates (自然人憑證), PTT Bot Prevention, Sparse Merkle Tree (SMT) Revocation Lists, Circuit Splitting, PK Commitment, AI Audit Tools

**Transcript:**
你剛剛講說上面會動 M. 哪裡會有所先從 11 點 11 點半的不應應該看有的時候我們早那我我們下半場演講就正式開始哦，那我就用最後列的掌聲歡迎。我是今天要講的是林士。在評證驗證，然後旁邊的 QR Code 有今天的同影片的連接，還有我的方式，那因為同影片裡面也蠻多連接的，所以有興趣的話可以找一下。然後王子就是先自我介紹，我是別，然後在 2021 到 2026 的 6 月工作，然後是跟兩的兩個的開發，有興趣可以在再次下聊，然後先簡單介紹為什麼我們需要做零私的人，對，然後我去年年的時候，我們跟 T 有聯絡上，然後大家都知道他是一個 1995 年在社群 M 教出來的時候，有學生開發的平台，然後到現在都其實都還有每天約 3 萬名的使用者。然後大家知道在這個平台上，所以有人有些人會講話這樣子，所以他們就想要做本驗證的部分，就至少方式是要根據註冊。然後現在主要是非盈利帶經，就不像現在很多大的社群媒體。我拿使用者的資料就是盈利。對，但 T 來說他們就是要確保這個風有可以運行，然後大家可以在上面發表。論 [57]

好，那最一開始呢，PTDT 就是用學校性註冊，那曾經就是有遭到泰克大量註冊的賬號，然後在裡面有帶風向跟網軍的行為。對，所以之後 T 用了另外一種方式叫 AOTP 。它是反向的 OTP 。那大家可能在別的平台註冊過，可能知道正向的 OTP 是電信公。會記檢給你，然後你在平台輸入這一次性的驗證嘛，比如說六位數或四位數的驗證嘛。對，那 AOTP 就是反過來在平台顯示這驗證嘛，然後使用者輸入簡訊給電信公司。對，那電信公司會再跟說這個使用者確定有送出這個點訊。那第一種方法就是你要信任學校是你要信任學校驗證你的身份是。那第二種方法就是你要信任電信公司驗證你的資料是驗證你的身份的正確。對，那下面放一個截圖，就是現在 PT 也還是用 t 的方式做賬號的註冊。那為什麼是要證明呢？對，因為是說因為 PT 是一個非營利的平台，所以如果我需要儲存很多指使用者資料的話，它是一個成本。而不是獲利。然後也是要承擔資料外洩的自安風險，所以大家都 know 治安是非常貴的事情，那洩露使用者身份的話就是剛剛前面講到這如果就是如果如果平台出生使用的資料的話，就是平台出現犯罪或詐騙自平台。然後如果配合調查就等於侵犯使用者的人權。那可能不會信任這個平台。對，所以 D 要做的事情只要使用者證明自己是台灣人，但是我不需要知道你是誰，所以我不想存你的任何的使用者的資料。對，那這就是林志證明非常適合的應用場景，就是不用仰賴電心業者，也不用存使用者 的各資。 [57, 58]

那這邊簡單介紹需要用到 DK 技術，第一個是 DKID 。對，那去年 DKID 發表，OpenAC 的論文。那這就是我們目前用的機制。然後它的 program 是 Sparton 加 HX, 所以是主要我們背後角算邏輯。對，那它不需要，它的優點是它不需要 L, 然後可以直接合目前常用的 SC 。還有它的跨平，台的 performance 非常好，就比如說 lapptop 跟 iOS, Android 跟網頁都可以在上面產生。對，那第二個基礎 Pro 。就是它可以提供克制化的 FFI, 對，那原本是 Hello to NOR 這些，對，那克斯化的 F 的功能就是我現在即使 in 任一個 R 線，然後比如說整合這個 smart 的也可以提供這個，然後讓程式碼在 S 或 Android 上面運行。然後提供可以讓自動產生不同平台的 bindings, 所以開發者就不用為不同語言撰寫 pr, 比如說 ios 就不用在額外寫 s 的版本的 k 。那我們先這次是選證評證。有底下的原因對生人護照的可能比較高。對，但人評證它可以用電子欠，然後第二個是它的可以查詢撤銷狀態，因為它的護照校起 10 年，然後它的資料不會反應在它的那個晶片上。對，然後跨平台的能力評證也比護照好，因為照它有那個 NXC 跟晶片，所以你必須要有手機才能掃描。那使用者體驗的話就是目前行動評證的手機版有綁定那個生物辨識。你的可以使用 BID 或是指紋解鎖。對，也比護照好一點點。對，數位評論證皮夾就是目前都還是在開發跟 draft 的階段，所以很不明朗，那使用者也更熟。 [59, 60]

那接下來就是要講的設計。對，第一個是驗證，就是我們自然憑證裡面有的資料就是第一個就是政府前長，就是政府發這個憑證的時候，他會對使用者簽一個欠。然後所以驗證就可以證明這個自然人憑證是來自政府。對，那這裡有一個小細節是二代品證是 2048B 的 TIZe, 然後三代品證是 4096 。然後政府簽章裡面的 message 是使用者的 X09 的 certificate 。對，這是政府的現章。那第二個部分是使用者的現章，就是我可以給定一個，比如說平台任意給定一個 message, 然後使用者可以進行這個簽章的運算。對，那 Nuser 就是使用的功要，那就是指定的訊息，可能是可以有平台提供的。那驗證使用者就是確保使用者擁有用這個憑證的用權。所以這兩個方都很重要，所以都要驗證。所以我們最一開始的是怎麼樣這樣，第一個是驗證的千章，然後第二個是驗證是用的簽章。然後驗完之後產生一個 p 。然後這裡有個小細節是，因為這 Circuit 可以分。對，那其實如果全部都設 pvate 的話，你會沒有辦法知道使用的到底輸入了什麼資料，你可以隨便等的輸入兩個 RSS, 對，但我 們需要把資料公開的方式去讓驗證者去知道使用者到底輸入了哪些應該輸入的資料，比如說像 ureu 的 pu 就是它也是公佈在內政部的網站下來，然後去，然後我們把它是就可以去認真就是對這個運算。那第二個公開資訊是 message, 平台提供的這個 message, 我也想知道使用者到底有沒有對這個訊息做簽章。所以主要的邏輯就是去驗證這兩個 signature 。那如何確保兩個千張的關聯性呢？有點小聲，不好意思。因為我可以很隨意地輸入第一個 valet 跟第二個 valet 的 Ra signature 嗎？對，所以但剛剛我提到就是政府是對使用者的設定是可以做欠，所以在上面的那個 user CCAT 其實包含下面的 RSA 的 P 所以我們需要額外的 DK 的限制是去證明說這個 US RE 是來自政府簽當的 certificate 。 [60, 61]

那第二個問題是如何證明戰人憑證是有效的呢？不知道看不到，就下面其實每個戰人平都有使用期限，那其實也蠻動的面，然後對那所弄怎麼驗證他沒有被過，沒有沒有過期也沒有被撤銷呢。對，就是我們用 recation 的機制。那斯 CID 也有對這個問題有研究過這樣。那第一個就是檢查向期是否起，然後因為內政部其實有提供自然人憑證的廢子清，這個也是在網路上可以查詢到的資料。對，然後他每 12 個小會更新一次。所以基本上是蠻 算安全啦，就是你可以去查說這個這個自然評證有沒有被這樣。那自然評證被清車裡面用到的查詢的查詢的 index 是 serial number 是交平證序號。對，所以這個問題就是如果我在裡面提供自己的憑證群序號。的話，這即使不是你的身份認知或是你的性理，但是你某方面還是會透露自己的領。對，所以我們要怎麼做到如何證明沒有被撤銷，又維持自己的私呢？這裡提供一個 M 是不是幾次？對，它是一個 SPAR McLE Tree 。大家 know SPARS McLE 什麼？知道去手。好。對，它是一個二人的 binary tre, 然後它的定義方式是比如說我的 zero number 是 1 的話，我就在 index1 的這個 node 把它設把它設一個值。然後其他的 node 就不要，就是 default 可能是 0 這樣。然後 3 就是把兩個兩個節點 h 起來，就一路 h 上去，所以 root 的值會是一個所有 tre 的 h hash 值。那所以如果你更改了其中一個 node, 你隨便隨意更改的話，這個 root 會是一個完全不一樣的 value 。對，那這邊對，所以這邊就是定義比如說 index, 比如說 ser numers 一的話，我們就在 index 為一的地方把這個值設 value 。那比如說 index2 的話，我就在 2 的地方設一個 value, 那其都是 0 。等下有問題，等下再問我。那這個通很常被用在 的 circuit, 因為我可以在我 可以在 circuit 裡面去證明我是其中一個節點或是這個節點的值是什麼，但我不透露這個 index 到底是什麼，所以我們就可以在這個 d 裡面把 zer number 當做一個 private input, 然後我只公開 tre 的 root 。對，因為如果說有人對這個 mcle tre 相同的 mcle trep 的話，它的 mcle tre root 會理論上會一模一樣，對，那我就不用公開我的 serum number 到底是什麼。那在這裡我們要證明自己不在側消清單裡面。然後所以這個值應該要是 0, 對，所以我們要對自己的 zeral number 去證明它的值是 0 。那這只是所以我們要把這個 circuit 也剛剛驗證 RSA 簽張的 circuit 裡面。 [61, 62, 63]

對，所以現在有三個 component, 前兩個是驗證 RSA 的，然後最後一個是驗證。那全部產生一個 ate 。對，那這樣。然後也因為那個 user certificate 包含的 p key 跟 server number, 所以我們也可以用就是再加這些限制去檢查說這個 RS 的 public 自 certificate, 還有來自 ertificate 。那看起來很想，但是實際上的問題是 s 太大了，就是我要證明的東西太多了。那所以原本大概有使用者的裝置，你就要存這個的。然後跟比較嚴重的是 memory 的 using, 因為可能也超過 30, 對，那可能比較早期的手機可能就是 4GB 的 R 。那其實 2GB 連我之前在 iPhone 是有時都會把 App 都會閃，所以它是一個 memory usage 很很大的運算。對，我們的解決方法呢，就是把一個 circuit 拆成兩個小 circuit 。對，所以原本 memory pick2gb, 那我猜成兩個的話就只要各用一 GB, 然後才兩個 P 。對，所以 pick 就大概叫 B 。那但 是分成兩確保兩個來自同的自然人證。就是意圖，就是我如果猜成兩個的話，不要證明這兩個是同一個人，而不是我先送一個，然後另外一個。對，我們用一個機制叫 PK Comm 。然後它是對 user 跟做那對，那所以如果 hash 就不會透露這個 ususer 的 的 key 到底是什麼，所以 userp 是有被保護的。那第二個是 p 是一個隨機數，所以我針對我每次產生的話，我的這個 pkfy 都會不一樣的，然後使用者不會被兩個 link 在一起，就是如果你 point 跟命都一樣的話，就會知道這兩個是來自同一個人，但我們也不想要被別人知道這件事情。 [63, 64]

對，所以這兩個也會再多產出相同的這個 PK commit 。然後所以 verify 就要去檢查說這兩個 PK 是一樣的值，就可以證明這兩個是用。個的 然後最後的 formance 大概是在 one 證大概 5 秒，然後 Android 大概 6 秒，然後 er 比較久，因為它是跑在 Won 的環境大概 20, 那跟 storage 有差不多都是一局 B, 就是之前的情況可以接受非常多。然後 接下來只要談到的設計，對 NF 是什麼呢？就是我要證明使用者驗證過一次，那第二次驗證的話，我就應該應該拒絕，但是我又不能透露這個使用者的身份到底什麼。所以我不能說這個身份的好多少多少。使用身份。一我們原本的設計是用人憑證唯一的自嘛。叫做 s 那這邊就是有使用的名字國籍跟一個叫 ser number 的，然後我們原本是把 subject 跟 f 比如說發去 f 把他們起來，所以我就可以證明使用者在這個大平台註冊過一次，那第二次我就把它拒絕。對，但現在很大的問題是 SDN 不是私有的資料。因為所有串接過自然分的都拿得到這個 subject 。對，譬如說我今天去申請成本，那這個內政部就知道我的電多少。對，那所以我就可以回推說這個使用者的 if 是什麼。所以我可以到哪些。所以我們有個方法是我們只用使用者擁有的資料，就是這個東西不會被 public share 。那個私藥。所以它透過私要簽張的方式去得到這個只用使用者才能產生的資料。所以 N 設計從原本左邊的邊到右邊的對 APID 的簽章。確保只有使用者可以產生這個 signature 跟 fire 。對，但是這個是有取捨的，因為安全性，所以是要不會離開戰平晶片跟行動戰人的 dvice 上。所以現在的設計是屍體戰人憑證裡面有一個一個私藥，但在行動憑證， 它也會產生另外一個新性的公司要，所以這兩個 signature 會互相跟所以同一個人是有可能產生不同的前當的。我也不能多檢查這些 sub 去確保這些公開資料來變，不然會破壞的命名性。 [64, 65, 66]

那比較這兩個方法，就左邊是 HB 。有點是你可以確定使用的同一個人，但缺點是 n 有可能會被回推。那第二種方法就是我們後來用 signature 的方式只有使用者可以算出反 那因為其實戰人評論也有限制所在最多兩個裝置可以註冊行動戰人證，所以目前最多一個使用者只能生產只能有三個不一樣的 sign 跟 那我們覺得第二種比較能接是希望未來有更好的這個方法。那還有一個 challenge 的設計，其實就是為了讓證明有實效性，就不是可能一個月前產生的 prof, 那一個月後還能用。對，所以我們想跟你一個對這個 prof 給一個 challenge 。對，那可以變那個 challenge 是否比五分鐘啊，五分鐘的一個限制。那我們就在裡面的限制這是這是這是 C 的 circuit, 所以你可以新增一個 public input, 比如說 challeng 對，然後你對這個 challenge 做一個乘法運算，然後得到一個 square 就證明你這其實跟千張很像，但這是 K 版本的簽章，那只要加入這個限制式。對，所以如果你在證這個的話，你把這個改掉你就會得到一個 invalid 。對，在 s 跟 ca s 裡面都有相關的。那我們寫完之後，我們就希望確定，對，那以往都是要找可能大公司做這的 udit 。對，我們這次先用了 AI 的審計工具。auditor 對，那也可以可能搜尋 auditor, 如果有需要做 sface 的話。那我們這裡就要第一個是的結軌要根據自己的驅色，就符合自己的用場景這，因為原本那個落敗設計那邊他也是一直說它不是一隻，所以評為 critical 安全漏洞。那我們覺得這個是驅色過後的結果，對，那第二個是 Audit 也不是一次到位。那比如我們 ud 第二三次也有可能出現第一次沒有出現的安全漏洞，所以因畢竟它是愛工具，所以就可以省越多次越安全。對，這邊分享我們這個專案有開發的考，對，那所影是這個 K based personal 的 reos 。那以下的 reosory 都是在 privacy/ 的 organization 底下。第一個是 ZID 是實現所有的 circuit 跟 ROSTER 。那第二個是 GID verify, 因為 PTD 的後端，所以我們需要把驗證的邏輯也用 G 去 implement, 所以寫了這個 GD 。還有剛提到的 revocation, 我們也外寫個去針對自然憑證的廢子清單建立 SMT, 那個小時會更新這個 M 。那跨平台的 ver 的條件有 Switch 跟 然後根據每個 SDK 也都有範例的 APPiOS, Android 跟 WF 那可以去這個索引找，因為真的好多東西。那未來可能 發展方向是我們希望它可以跨平台的 SD 或是 T 比如 create Native Water 或是 McOS 或 Windows 希望它可以支援越來越多種平台。也雖然我們沒有開發護照所以比較但也希望未來可以支援這些不同的評估。對，反正它就是一個 SDK 的形式，看 developper 需要什麼就自己 integrate 。那我們其實有 demo 的 app 。對，左邊是 OS, 中間是 Android 跟右邊是網頁的版本。對，那目前的後端都是在 PTT 的 staging 的 backend 。所以 呃就是因為就是你可能需要去註冊這個 test 的後端，就用得 email 去註冊，對，就多一個小小步驟。但不傷。對，那我有寫文章，所以如果覺得今天來的沒有很清楚的話，也可以出看文章。那中間行動自然評是個連信，所他不是他還不是可以被被公開手到，但我覺得還是有開發的價值，就是還留在這，對，左邊是給 T 看的故事，然後最右邊是最 ag 的，那中間是如果你要開發行動憑證的話，你也可以看這裡，因為我覺得網絡上的資源真的蠻少的。對，那最後有 DK 相關的問題也都可來問我。有問題嗎？這個還是沒有， [66, 67, 68]

（會後與台下交流）
**這個還是沒有，這是那個剛說 SP 和那個驗證還要下載 Mobile app 是不是一個過度時期的設計方式？**
這是所以就是 的部分。我知道你的意思，我是比較推薦才是下載它會比較比較流暢啦，對。但確實如果可以提供用下載版本的話，確實蠻比較也很理想，對。 [68, 69]

**請問有在 Windows 上測過。Windows 瀏覽器。**
對，Windows 的瀏覽器，因為剛剛 MC 也是瀏覽器。像 NOR 它的 Windows 的瀏覽器如果要自己可以會很容易會爆掉。 [69]

**哦。很容易爆掉。**
對。所以所以想知道有沒有測過。
**有欸，有欸，有。但我才比較好**
也對，但現在 m 應該都還上線應該是一局比應該不會再超過。
**前面那個確認。確認局把自己軍方那個太**
哦蠻的，就是比如像不知道你聽過它是一個 呃錢氣，對，所以我物證明這個 proof 是是要比如領錢到我的例子的話我會想要把這個可能 adress 也放進這個 C 裡面。對，那所以我如果我今天其實你跟法想跟 signature 的概念，我想要對某一個訊息做欠，對，那是它可以在裡面做到同樣的事情，就是我對這個 challenge 算是一個倍數或是簽的概念。所以如果別人隨意篡改我的這個比 message 或 challenge 的話，這個 proof 就不會過。那那所以那個 challenge is good 是會被用在
**它是會被藏在這個 circuit 裡面，對，因為我只是要讓它用一個一個限制式去限制這件事情。因為因為原本沒有線這個限制式的話改這個我覺得這個很火的 ZK only 的我覺得可以看那個這個麼謝謝大家。** [69]

---

#### Part B: 虛擬化與 KVM 架構技術 (新錄音 29.mp3)
* **Speaker:** Unknown (Academic / SAMU / RV32MU Project Team)
* **Topic:** CPU Virtualization, Memory Virtualization (Stage 2 Translation, TLB, Page Tables), Interrupt Virtualization (GIC), KVM, Vert.io, GPU Virtualization

**Transcript:**
instruction sequence. Instead of executing that instruction directly, the translated block replace with a hyper block. The hypervisor then performs the operation safely. VMware will also use dynamic binary translation to virtualize early x86 processors before Intel and AMD support hardware assisted virtualization. Today, most same architecture Virtual machines use direct execution with hardware assisted virtualization. Most guest instruction can execute directly on physical CPU. The processor provides a control environment for guest execution. Normal instruction runs directly while sensitive operations and events transfer control to the hypervisor. With this approach, performance can be very close to native execution. The following table shows the virtualization technologies provided by different processor architectures. Operating system also expose these hardware features through their infrastructure. Linux provides KVM while Mac OS provides hypervisor framework. [70]

Direct execution leads to another important question. If guest code run directly on the physical CPU, how does the hypervisor regain control? control. This is where VM entry, VM exit and hypervisor hyper calls come to the picture. VN entry transfer execution from the hypervisor to a guest virtual CPU. Before entering the guest, the hypervisor prepares a guest environment. The pro processor then starts execute gas instruction directly. VM exits transfer execution in the opposite size direction from the guest back to the hypervisor. A VM access may be caused by an interrupt, a trap register access or another event that requires hypervisor's intervention. The guest may also request a service from the hypervisor by making what is called a hyper call. This slide shows an ARM 64 example. [71]

When the guest read a trap system register the processor transform control to the hypervisor at EL2 exception level the hypervisor provides a virtual value instead of exposing the physical register directly it's then execute e to return to the guest which continues run normally here we can see also see part of the actual ARM 64 KBN implementation in the kernel. Before entering the guest, KBM restores the guest CPU context. After restoring the CPU state, the ER instructor performs the transition into the guest. On the other hand, when a trapped event occurs, the processor transfer control to an EL2 exception handler. The handler records the exit reason and branch to the exit pass. KVM then saves the gas CPU state and returns control to the host. So far we have focused on CPU execution. Next let's look at memory. Before disc discussing memory virtualization, we first need to review how virtual machine works on a normal operating system. So what is virtual machine and why? [72]

Modern operating system allow each process to have its own private and isolated memory space via virtual memory. Virtual memory is divided into pages while physical memory is divided into equally sized frames. The operating system use page tables to map virtual pages to physical frames. The first features shows a simple page to frame mapping while the second shows how this mapping can be organized using multi-le page tables. Address translation is performed by the memory management unit or MMU. When the CPU issue a virtual address, the MMU first checks the translation look aside buffer or TLB for a cached translation. If the translation is not found, the MMU's table walk unit read the page table from memory. After obtaining the translation, the CPU can access the physical memory. The reason we need TLB is because page tables are stored in memory and address translation introduce additional memory access. [73]

For example, blocking a fourlevel page table may require up to four additional memory access. To reduce this overhead, the TLB caches recently used address translations. As as shown in the figure, a TLB hits allows the MMU to use the cached translation directly on a TLB miss. The MMU walks the page tables and then caches the result in the TLB. Usually the TLB are implemented with fast memory hardware such as SRAM. So how is address translation different in a virtual machine? A virtual machine adds a second stage of address translation. Stage one is managed by the guest operating system. It translate a guest virtual address into an intermediate physical address or IPA. Stage two is managed by the hypervisor. It translate the IPA into a real physical address. As shown in the figure, the guest manage its own stage one page tables while the hypervisor use stage two page table to control the guest access to to physical memory. [74]

Now that we have covered memory virtualization, let's move on to interrupt virtualization. A physical device generates an interrupt that is delivered to the hypervisor. The hypervisor identifies the target virtual machines and inject a virtual interrupt into its virtual CPU. The guest then handles the virtual interrupt like a normal hardware interrupt. Modern interrupt controllers provide hardware virtualization support to reduce hard hypervisor intervention. On ARM the support is provided by generic interop controller or GIC. Next let's look at how this hardware virtualiz ation features are used by Linux KVM. KVM stands for kernel based virtual machine. It is a Linux kernel subsystem that provides hardware assisted virtualization and turns Linux into a hypervisor. Each virtual machine is represented as a Linux process and each virtual CPU is represented as a thread. Q will create and controls virtual machines through the /dev/KBN interface. [75]

KVN executes guest code directly on the physical CPU and manages memory virtualization while bio provides the virtual machine model and virtual devices. So far we have discussed CPU, memory and interrupt virtualization. Next let's look at how virtual machines communicate with IO devices. Vert IO is a standard per virtualized IO interface between guest driver and virtual devices. The guest driver and virtual device exchange requests through shared memory cues called first cues. Why do we use per virtualization here? A fully emulated device may require many trap register access and VM exits. A virtualization aware interface like Vert.io make data exchange more efficient by reducing the need to repeatedly trap into and return from the hypervisor. This figure shows how the guest driver and device back end exchange an IO request through a vertq. First the Guest writes the request descriptors and adds them to the available ring. The guest then notifies the device. [76]

The device read the available descriptor and process the request. After completing the request, it's add a completion entry to the used ring. Finally, the device notifies the guest that the request has been completed. Now let's use vertio GPU as an example. Vertio GPU defines different group of commands for graphics virtualization. The 2D command support supports nonacelerated graphics rendering including resource creation, data transfers and display updates. The 3D command support hardware accelerated graphics rendering using the physical GPU. Vert.io GPU also provides command for cursor update and movement. Through this command, the guest driver can communicate with a virtual GPU using the versio interface. [77]

This video shows GPU virtualization running on SAMU, our respy system emulator. Look at you. Vertio GPU to communicate with the vert virtual graphic device. The left side shows the nonacelerated 2D only implementation while the right side shows the implementation with 3D acceleration. [78]

If you are interested in learning more, you can check out our recent presentations from open source summit North America 2026. You can also find our open source risk emulator project RV32 MU and SAMU on GitHub. Both projects are led and maintained by Professor Jin Hong. [78]

Thank you for listening. I'm happy to take any questions. [79]

Do you have any questions from the audience? [79]


---

### 4. 新錄音 31.mp3, 32.mp3 & 33.mp3

#### Part A: 開源社群與國際溝通障礙 (新錄音 31.mp3 & 32.mp3)
* **Speaker:** Japanese Open-Source Developer
* **Topic:** Language Barriers, GitHub and Subversion, Non-Native English Speakers vs. Native Speakers, Global Open-Source Collaboration

**Transcript (新錄音 31.mp3):**
discud discussion Japanese native Japanese right so and it is and very disc and discussion without ourage right and first for English and developers and like me and Taiwan and western and sorry and east people and to express my project to the common world common language that これ が 1番 難しい です 。 そう 。 So I have I have to go and English school at first and fortunately and some translation kindly to how to write the documentation English. So and Japanese and many more and Asian people misanding to use the problem word so if something if have something is so we will submit as issue not submit as program and so once program and west espally we ch how to communicate with each other with trans to know how to and more I l first you and so now online game is blooming so and it is better to use online gaming and because you must english native while American west and west am and games and ch english home engish but west love and english so I felt nervous at that time I and other to ex myself and talking about my pro but many people care about and they they want to know the information not English all for talking English but now I feel I don't feel about ここ ら 辺 本当 説明 する と あの あれ な ん です 。 あの 英語 に 日本 人 が 英語 喋 るってのは 辛い んです 、 結構 。 うん 。 それ は 分かっ て ます 。 で 、 あの 、 僕 の 學び 方 と し て は 、 えっと 、 僕 は 何 で 學んでる かって いう と 、 とにかく 絵會 が 作 るって 死ぬ ほど 學んだ 。 まず 1 つ 。 その 次 は 、 えっと 、 3 の 翻訳 チーム に 頼んで 翻訳 を 教え て もらい ました 。 はい 。 とにかく あの プログラム なんて 絶対 使う なっ て 怒られ ました 。 まず 。 はい 。 で 、 次 に やっ た の が 、 えっと 、 オン ライン ゲーム で ひたすら あの 外人 と 喋った 。 その 時 に 分かった の は 、 あの 、 西 、 あの あの 西 海岸 いわゆる サフランシス の 方 の 連中 は 何 も 考え て ない 英語 の こと で はい 。 だ から めちゃくちゃ 喋っても 問題 ないって ことを 実感 し ます 。 ただし 東側 ニューヨーク 側 の 人間 は 真面目 に 喋らない と 本当 に 怒られる の で ここ だけ は まいり ます 。 はい 。 あの よく 怒られ ます 。 はい 。 あの 今日 あの 喋ってる あの ミスクロ セッション で 地め国井参条 は 彼 は ニューヨーク 出身 な ん です けど 初め に 日本 に 來た 時 に 日本 人 の 英語 の 姿 さ に 切れ た らしい です か ? はい 。 彼 は で あ 、 そリ second happen I talk about and excation things and for I show this and once happen and a company open for and would love to manage by and the employ is and I check compatibility list but and issue should be by some employees and it is and frustrated task submit especially if you find some h But I need to catch up exploent by some micrst employees to submit and application about security home so the point is second is communicate with others espcially same country people other country people espcially as i feel indians and indian people and first they You know they some you know indian English is called English how to hear understand and the what they speak on. So I need check carefully what they want to talk. And pro much more about open and people to my pro but other only and more disc negative com negative com and make some culture I I could not understand at that time and so having a meetings and others and for and often to understand each other and not cult and not because and is open and do not documentation so I don't understand me so I could not features on my project so I need to ask again ask them ask person and read the documentation about the feature but and finally he not so my [80, 81, 82]

（日本語訳/解説：これどういう意味かっていうと、さっきドキュメンテーションの話があったと思うんですけど、ドキュメンテーションの中で、結局その機能をその自分のオープンソースのプロセスに加えて欲しいって言っても機能の内容が分からないから加えられないって何回か拒否ったことが実は何回かありまして、で、分からないからとにかく説明してくる。今みたいにギットハブがあるわけじゃなくて、サブバージョンっていうとんでもないものを使ってたので、あの、教えてくれって話をしてたんですよ。でも答えてくれないんですよ。何回か言ってもこれメカニズム分からないから教えてくれ。メカニズム分かんないから教えてくれって何回見たんだけど結局教えてもらえませんでした。はい。なので結局加えられなかった。で、さっきのランギズのあのバリアもそうですけど結局コミュニケーションを取るの結構大変で、あの、特に何でこんなこと言うのって話をすると、あの何かのやっぱり文化が違うってところで最高行きついてしまうですよ。なので、あのすごく喋る時に、あの、海外の方とこう自分でグローバルプロジェクトを持った時に本当大変な思いをしました。あの、まずお互いにノーネイティブであることで、文化が違うので話がうまく通じないことで、あの、その文化の違いからドキュメンテーション残すって言っても残してくれない人がいたと。結構、これが嫌で、あの、リカフに公開してもクロのままやり続ける人がいるんですけど、あの、あんまり良くないと思ってて、いろんな人の意見を受け入れてこそオープンソースだと思ってるので。はい。なので、どん僕はそのままオープンソースとして、ま、その時ギターがなかったんですけど、自分のオープンソースはオープンソースとしてちゃんと公開してました。コメントも欲しいと思ったし、どんどん広げていきたいと思ったので、誰のコメントでも大歓迎で、さっきちょっとインドからの話をしたんですけど、なかなかプライドの方、高い方インドの方多い。なんか大変でした僕。はい。あ、なんちみたいな例外です。あれはおかしいと思ってます。はい。なので、こういう人、あの本当にいろんな人とオープンソースのプロジェクトを組むってことはものすごく難しいことだと思います。） [83, 84]

ah, engish I should have reflective and many times reflective with each other but other people do not that so I discuss disc discuss disc discuss disc discuss about that but sorry of failed and my first pro is shing expers Ehm [84]

**Transcript (新錄音 32.mp3):**
separ English speaker native English speaker that is no speak my friend can speak English so friendly and Argentina people also can speak so friendly but some guys coming from the east are US [85]

（日本語訳/解説：こういうミーティングをグローバルミーティングやったんですけど結局、あの何が問題かって言うとやっぱりノンネイティブとネイティブのスピーカー完全に分かれちゃうんでやると。だから結局こういう問題はすごく大変なんですよ。はい。だから結局ネイティブスピーカーの方にもちゃんとあのリグレッションしてな、あの、あの、いや、リスペクトしてもらて困ること。はい。） [85]

ah, eng pro and have Japanes Japan est people Japan [85]

---

#### Part B: USB C / OTG 安全研究與封包竄改實作 (新錄音 33.mp3)
* **Speaker:** Unknown (Hardware Security Researcher)
* **Topic:** USB Devices, libusb, USB Descriptors, USB OTG (On-The-Go), Kernel Modules (configfs, functionfs, legacy gadgets), USB Proxy Architecture, Packet Injection & Modification

**Transcript:**
部分或是媒體上測試，還有 USB 相關的 surity research 這樣。好，那接下來要講的部分是針對 USB C 所使用的每一個技術的部分去稍微做一些簡單的介紹。首先是先回到剛這個，就是我們先講左邊的 USB device 的部分，然後過後再講 USB H 這一關會使用到的技術這樣。首先那個 USB 的話，它是一個 usererspace library, 那我們用這個方式去跟我接的 USB 裝置去做溝通，那我會先去知道它的 USB, 然後過後再去做傳輸之類的。那這邊我不會講太氣，因為它其實也可以複雜的東西，就是大概知道我會用這個東西就好。然後接下來是什麼是 USB descripter, 就是基本上它有點像是 USB 中式的一個身份證或是它的一些個人資料之類感覺，那它又分成它的 hirach, 又分成 dvice, 然後 configuration interface 跟 endpoint, 它每一個都代表我們的不同意，比如說 ID, 然後它需要，然後它有多少個 inface, 然後它它的 classid, storage 或是一些 audio 之類，然後話 adression transfer 。那為什麼我們會需要這件事情呢？這就是我們需要來圍照身份的很重要的一件事情，就是我們會先需要知道我到底接的 USB 裝置是什麼東西，那我們這個 USB process 才能去做照的這件事情。那 呃在好，在之點再提然後下一個是 USB transfer [86]

的類型，就是會分成這四種就是第一個是 control, 然後這基本上是每個 USB 裝置都會一定一定會有的東西，就是它在一開始在 USB setup 的時候， USB host 一定會去發出 control 的 request 去問你到底是誰，然後你是什麼東西，你是什麼 USB 些類型的種是 HID 還是什麼種這樣。然後 Nogop 的話就比較像是 HID 裝置，比如說你的滑鼠鍵盤。然後的話比如是學生點或是一條之類的，還有的話是 Wcam 或 nd vide 相關的相關。一些 USB 裝置這樣。然後好講完那個初步。講完的部分是那個 USB device 這個會需要知道的東西，那接下來我們講那個這一端的。好，一般來說 USBOTG 來說的話，一般來說的話，NAL USB 跟 USBOTG port 的差異是當你接上面這個部分的話是 Host 的 computer 接到你的 USB device 的時候，它不會有角色的轉換，那就是就是像你平常怎麼使用就是不使用這樣，但是 USBOTG 的部分的話簡單來說的話，就是它可以去做 host 跟 dice 角色 的轉換。那在我手邊這邊有一台是這個數媒，就是我現在 ctacable 上面連接的這一個 port, 就是那個 USB port 。基本上就是它可以透過一些 M 方式去讓你的 host 以為它是一個 USB 的裝置，比如說變成 serial 或是變成 storage 或是變成之類的方式。好，那在延續剛上一個片提到的 [86, 87]

部分的話，用分成這幾個方式可以搭配你的 USBOTG 去做使用，那可能最上面那一欄就是 G 於底線號類型的這些 CMEL 可能是稍微比較廣為人之一些 c module 。那就是他們可以做到些，比如說剛提到的 G 底線 sialum, G 底線，G 底線 Mask Storage, 這些可能是大家想使用的就是他們可以做到當成一個 Sport 或者當成一個水晶點的方式。但是它的缺點就是它的功能，它能做到事情基本上就是在 C 裡面已經決定好，沒辦法對它做太多克制化的東西。那另外還有是第二欄的 gadgets, 這個東西的話，它是一個比較早期引入的一個 C module, 那它可以讓你做到一些簡單的 pack 的 crol, 但是它會有一些限制的地方是在於它有一些邏輯已經寫在 cl module 裡面，雖然你可以在 userpace 裡面去做一些操作，但是限制是稍微多一點的。然後另外這個 R gage 的部分的話，就是它可以讓你做到的是你的所有 pack 的 control 都可以經過 us space 去控制，但是另一個需要注意的是這個原作者有建議大家不要在大圈使用，所以我不知道為什麼。對，就是可能還不是一個非常成熟的。的一個東西。然後另外比較還有其他類似的 C module 是分別是這個 config fs 跟 function fs 他們有類似的功能，只是我對他們沒有那麼熟，所以我 [87, 88]

這邊沒有再特別去介紹他們的差異這樣子，但據我所知可能跟 FS 會有店類似，他們多少都會有一些限制，可能也沒辦法讓 user 在透過 uspace 的方式去真的操作所有的那個 pet 的 control 。好，那到底什麼是 R 呢？那它在 Linux5.7 版本的時候被 merge 到了，所以就是如果大家有興趣要使用的話，就是基本上 5.7 之前的版 .7 之後的版本都可以直接使用，那但是要確保一件事情是你這個這個 C 要記得要打開，不然就是它不會被譯進去。然後它在我們這個 USB 裡面的主要用途就是我們在跟 LUSB 溝通完之後，我們會透過 R 的這個這個 device 去跟 USB H 去去做溝通這樣。好。那這個就是在把它們全部放在一起之後就會變成這張這個 PX machine 的一個一個圖。那基本上它就是跑在一個數美上面，然後的一個一個程式，那會透過 USB 跟 dice 裝置跟實際的 USB 裝置溝通，然後 Host 的話就是透過剛提到去做溝通這樣。好，那接下來稍微解釋一下。就是到底這個程式跑起來會長什麼樣子。好。一開始的話，Sarup 的部分的話，我們會先透過 USB 先去把這個 USB 裝置的所有 descriptor 就前面提到提到的部分全部先撈回來。然後會把它轉換成看得懂的格式。然後再開始跑，那這個時候跑起來的時候， USB Host 會發一連串的 cr [88, 89]

oller request 來問你現在到底是誰。那我就會把我這個階段就是轉換好的東西去一的回報給 USB host, 讓他以為我就是那個 USB device 。那在這個步驟完成之後呢，就是 Host 就會開始做一連串的一些接下來的風包的傳輸，那需要注意的是我們會需要建立好幾個。就是去對去 handle 這些東西。那第一個的話就是剛提到的一定會有每個 USB 裝置一定會有一種傳輸類型叫做 crol, 那它一定是用 mpoint0 的這個位置來去做傳輸，所以我們會有一個 point0 的 fame 去專門去處理來是 USB host 的 Crol 的 request 。那它它跟其他的 transfer 的類型不一樣，地方是它有同時支援 input 跟 output, 就但是都會是由 USB H 去發起，就是當他如果建議是要發 input 的話，它一樣會先從 USB Host 發，然後往左往左，然後告訴 USB device 你今天 要給我什麼資料，比如就會問說你到底是誰，你的 band ID, 你的 p ID 是什麼。那這個時候它就會迴轉過來這樣，那如果是 p 的內 ation 的話，就是 host 發完說我要丟東西給你之後，然後 dice 之後它它後期會把它接下來真的要選資料給 dvice 。好，那這是 Cl 部分，然後接下來是 data 的其他的其他的那個資料類型。我們都會建立一個每一個 end point 我們都會建立兩個兩個 gade, 分別是 [89, 90]

讀跟那如果是 inputendpoint 的話，就是我們要從 USB 裝置去讀資料，那我們會先放到一個 Q 裡面，然後再用另一個 Q 去把它傳給 USD Host, 那相的話就是 output 的話，就是 re 的 F 就會在 host 這一端。然後 run 就會在 就會在 D 這一端。然後接下來是一個簡單快速的小 demo, 讓大家知道說這到底是怎麼運作的。大量。首先我們會先知道我裝置是在我桌上這一台數害的小裝置，然後它上面現在接的一個是這個數的那個接受器這樣。然後就是謝謝謝謝，所以在這邊看到是一個 USB 的接收器，是這個無線滑鼠的接收器這樣，然後接下來要做的事情是我需要先把這個 C module 先帶起來，然後接下來是跑我們這個程式，然後就是會需要修改一下那個 bander ID 跟 ID 好，跑起來之後呢你就會看到雖然滑鼠不是真的接到它的接受器不是真的在我 的電腦上面，但是我還是可以通過我的畫素去控制，就是它的資料實際透過這台數美派，然後再到我的電腦，然後進而達到控制電腦的的需求這樣。好，這是簡單快速的一個小 doemo 。那回到我們的影片。好，就是現在我們可以做到的是可以去看到就是他到底傳了什麼東西，然後也可以實際透過數美，然後進去把這些 USB 的 package 傳到我們的電腦之後，那下一步是我們要開始去改這 [90, 91]

些 packing 。那要改這些 packing 呢，就是比剛剛前面提到的就是小美跟阿敏在傳訊息，如果你好，你就把他們原本講的話就造時傳給對方。但現在可能想要做的事情是想要去做一些壞的事情，然後去讓對方吵架之類的，那你就可以透過這樣方式呢，去改裡面內容，那又分成三個不同的 level, 第一個很簡單的就是 pattern 的 replacement, 就是你遇到這邊的 pattern, 你就把它換成另一個 pattern 。然後第二個部分的話就是可以做一些簡單的加減成除。第三個部分的話就是你可以去做算是寫一個 sprinten, 然後去做一些比較，比如說你可能想要在某些特別的情況下。然後才做某些事情，你就可以透過這樣方式去做，就是它比較沒有那麼失敗。那第一個 呃就是在介紹這些東西之前的話，就是回到剛才的那張 package 傳出的那張圖片的話，我們 injection 的會在 re 這個去去 apply, 就是它在 inute 之前會先把你想要改的資料先除好，然後再 incute 進去。然後才會傳給下一個階段的接收的人這樣。好，那首先第一個的話就是 pattern requestement, 這邊想要 demo 的是我可以去把滑鼠的左鍵跟右鍵去直接做對調，就是正常來說你按左鍵就是左鍵，但現在情況是這個如壞之後，它會把你的左鍵的功能就是按下之後 [91, 92]

實際相當預是按了右鍵這樣。好，那接下來是一個也是一個快速的小 do 。啊因為他下面回來，不好意思。好，那這邊看到是我已經把城市跑起來，然後就是我現在如果按，我想哦，按左鍵，它就會變成是右鍵的狀況，然後按右鍵，它就會變成左鍵的話。就是它會把左右鍵的內容去做對，像這樣看得見。OK 。好，那接下來回到 [92, 93]

**這個是在上。在上面跑的程式。對，這個 USB proxy 程式是執行在這個這個上面的。好。**
那接下來下一個的話是稍微複雜一點點，就是可以做到加減深成。那比如你可能今天想或想讓速度快一點，你就把它可能兩倍，你想讓你就可之類的，那想要讓反向的話，就直接做一個負號的動作，這樣，那接下來是一個快速的 demo 好，到這樣大家看看到，但首先呢等一下哦因為我這個 C 要示範的是 呃一個一個一個在這裡好了比如說我現在滑鼠我的時候往左滑，那實際上會往右滑，然後如果往右的話，它會往左滑，就是它是把它的坐標，它所傳的 data 全部做一個相反的的動作，然後然後往下好，左上那裡，然後你們上要往右下的話，我應該直接往右下洞，但是我這個時候往左上洞，它就會往下，所以它是一個就是直接相反的操作就。好，然後接下來是下一個就是稍微比較進階一點，就是你可以去設 [93]

設置一個比較複雜的去做一些 data 的判斷這樣。那就如果他在玩遊戲或是用滑鼠的話，可能會有一些經驗是你的裝置如果比較老舊的話，所以你即時放著不動，它可能還是會有點判斷到你好像有在等他。一下。
**這樣有聲音嗎？這樣有聲音嗎？**
好好，不好意思。
**好，就是大家可能有經驗是 USB 是你在使用的時候用久了，它可能會有點問題，所以你即使不動它，它可能也會有一點滑鼠的儀標，那個還是會稍微在動，那這個時候你可以透過這樣方式去設定一個，就是當你的移動的幅度小於某一個棋的時候，它就會當做不會動，這樣用這樣方式去可能稍微讓你的裝置可以稍微撐久一點，那接下來個也是一個簡單的 demo。好。呃，這邊看到。哦，就是** [93, 94]


---

