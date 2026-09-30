# CCSP 模擬測驗講義：TLS、PKI 與密碼學

> **講義類型：** 概念講義／考場心智模型  
> **適用領域：** Domain 2 資料保護與密碼學；Domain 3／5 安全通訊  
> **核心一句：** Certificate 說明這是誰的 public key；digital signature 證明持有 private key；(EC)DHE 建立 shared secret；symmetric cryptography 保護實際流量。  
> **使用方式：** 先建立整張 TLS 圖，再記「不要混」清單。不要用「憑證加密所有 HTTPS 流量」這種舊簡化。

---

## 本講義架構

1. TLS 總圖  
2. Symmetric／Asymmetric  
3. 加密與數位簽章方向  
4. Hash、HMAC、Digital Signature  
5. X.509、CA、PKI、憑證驗證  
6. TLS 1.3 角色分工與 forward secrecy  
7. 常見陷阱與快速判斷表  
8. 情境題與必背十句

---

## 1. 先記住整張圖

TLS 不應理解成：

> Certificate → encrypt everything

正確 mental model：

```text
              TLS
               │
       ┌───────┴────────┐
       │                │
 Authentication     Key Establishment
       │                │
 Certificate         (EC)DHE / PSK
 Digital Signature       │
       │                 ▼
       │            Shared Secret
       │                 │
       └────────┬────────┘
                ▼
           Key Derivation
                │
                ▼
      Symmetric Traffic Keys
                │
                ▼
       Application Data
     AES-GCM / ChaCha20-Poly1305
```

TLS 1.3 明確把：

* cipher suite
* `(EC)DHE` key establishment
* signature algorithm
* certificate authentication

視為不同的 cryptographic functions。

---

# 2. Symmetric Encryption

## 核心

**同一把 secret key** 用來進行 encryption/decryption。

NIST 對 symmetric cryptography 的基本定義就是：

> 使用同一個 secret key 執行演算法及其反向操作。

常見：

* AES
* AES-GCM
* ChaCha20-Poly1305

---

## 優點

* 快
* 適合大量資料
* computational cost 較低

所以：

> **Bulk data encryption → Symmetric**

TLS 建立安全 session 後，大量 application traffic 主要使用 symmetric cryptography。

---

## 缺點

最大問題：

> **How do both parties securely obtain the same secret key?**

也就是：

**Key distribution problem**

因此需要：

* asymmetric cryptography
* Diffie-Hellman
* ECDHE
* pre-shared key

等機制協助。

---

# 3. Asymmetric Cryptography

使用：

```text
Public Key
+
Private Key
```

兩把 mathematically related keys。

NIST 將 asymmetric cryptography 定義為使用 public/private key pair，進行 encryption/decryption 或 signature generation/verification。

---

# 4. Public Key / Private Key 到底怎麼用？

## Case A：Confidentiality

Alice 要把資料安全傳給 Bob：

```text
Alice
   │
   │ Encrypt using Bob's PUBLIC KEY
   ▼
Ciphertext
   │
   │ Bob decrypts using Bob's PRIVATE KEY
   ▼
Bob
```

### 記：

> **Public encrypt → Private decrypt**

目的：

> Confidentiality

因為只有 Bob 應該有 Bob 的 private key。

---

# 5. Digital Signature

方向完全不同。

Bob 要證明：

> 「這個 message 由該簽署者簽署，而且沒有被修改。」

流程：

```text
Bob
 │
 │ signs using Bob's PRIVATE KEY
 ▼
Digital Signature
 │
 │ verified using Bob's PUBLIC KEY
 ▼
Alice
```

### 記：

> **Private sign → Public verify**

Digital signature 可提供：

* Integrity
* Origin authentication / authenticity
* Non-repudiation support

但：

> **不提供 confidentiality**

NIST 目前同樣明確指出 digital signature 提供 authenticity、integrity 與 non-repudiation support，但不提供 confidentiality。

---

# 6. 一個非常重要的考試陷阱

不要把 digital signature 說成：

> 「Encrypt with private key」

這是舊教材常見的簡化說法。

CCSP 作答時比較安全的 terminology：

> **Sign with private key**
>
> **Verify with public key**

因為現代 signature algorithm 並不等價於單純的「private-key encryption」。

---

# 7. Encryption vs Digital Signature

| 操作              | 使用哪個 key    | 另一端使用       | 目的                                                 |
| --------------- | ----------- | ----------- | -------------------------------------------------- |
| Encrypt for Bob | Bob public  | Bob private | Confidentiality                                    |
| Bob signs       | Bob private | Bob public  | Integrity + Authenticity + Non-repudiation support |

記法：

```text
CONFIDENTIALITY
Public → Private

SIGNATURE
Private → Public
```

---

# 8. Hash

Hash 是另外一個東西。

例如：

* SHA-256
* SHA-384
* SHA-512

```text
Message
   ↓
Hash Function
   ↓
Digest
```

特性：

* one-way
* fixed-length output
* 不需要 secret key
* 用來 detect modification

但單純 hash：

> **不能證明是誰產生的。**

攻擊者修改文件之後，也可以重新算 hash。

因此：

```text
Hash alone
→ Integrity checking

Digital signature
→ Integrity + Authenticity
```

---

# 9. HMAC / MAC

HMAC 使用：

```text
Message
+
Shared Secret
+
Hash Function
```

提供：

* Integrity
* Message authentication

但是：

> 双方都知道同一把 shared secret。

因此通常**不能提供真正的 non-repudiation**。

因為：

```text
Alice knows secret
Bob knows secret
```

兩人理論上都可以產生 valid MAC。

---

# 10. Digital Signature vs HMAC

|                         | Digital Signature | HMAC                    |
| ----------------------- | ----------------- | ----------------------- |
| Key model               | Asymmetric        | Symmetric/shared secret |
| Integrity               | Yes               | Yes                     |
| Authentication          | Yes               | Yes                     |
| Non-repudiation support | Yes               | No                      |
| Confidentiality         | No                | No                      |

這是 CCSP 很常考的區分。

---

# 11. X.509 Certificate 到底是什麼？

最重要一句：

> **X.509 certificate 把一個 identity / subject 與一個 public key 綁在一起。**

RFC 5280 的描述就是：public-key certificate 將 public key values 綁定至 subjects，並由 trusted CA 的 digital signature 來證明這個 binding。

簡化：

```text
Certificate
│
├─ Subject
├─ Subject Public Key
├─ Issuer
├─ Serial Number
├─ Validity
│   ├─ Not Before
│   └─ Not After
├─ Extensions
│   ├─ SAN
│   ├─ Key Usage
│   └─ Extended Key Usage
└─ CA Digital Signature
```

---

# 12. Certificate 裡有什麼 Key？

通常：

> **Public key**

不是 private key。

### 必考陷阱

Question：

> What does an X.509 certificate contain?

答案可能包括：

* subject information
* public key
* issuer
* validity period
* CA signature

但：

> **Private key 不應包含在 public certificate 裡。**

---

# 13. Certificate 與 Private Key 的關係

Web server 通常實際持有：

```text
Certificate
    │
    └── Public Key

+

Private Key
```

certificate 可以公開。

private key：

> 必須保密。

如果 private key 被偷：

> 攻擊者可能 impersonate server / perform unauthorized signing operations，視 key usage 與協定而定。

---

# 14. CA 到底做什麼？

CA = Certificate Authority

CA 的工作不是：

> encrypt your traffic.

CA 的主要作用：

> **對 certificate 進行 digital signature。**

也就是：

```text
CA
│
├─ validates subject according to CA process
│
└─ signs certificate using CA private key
```

Client：

```text
Certificate
   ↓
Uses CA public key
   ↓
Verify CA signature
```

RFC 5280 明確表示，CA 的 signature 用來證明 certificate 內的 public-key material 與 subject 之間的 binding。

---

# 15. PKI Trust Chain

例如：

```text
Root CA
  │
  │ signs
  ▼
Intermediate CA
  │
  │ signs
  ▼
www.example.com Certificate
```

Browser trust store 預先信任：

```text
Root CA
```

因此：

```text
Server Certificate
       ↓
Intermediate CA
       ↓
Trusted Root
```

形成：

> **Chain of Trust**

---

# 16. Certificate Validation

Client 通常至少要考慮：

### 1. Signature / Chain

是不是由 trusted issuer 簽署？

### 2. Validity

```text
Not Before
Not After
```

現在是否有效？

### 3. Subject / hostname

例如要連：

```text
www.example.com
```

certificate SAN 是否涵蓋：

```text
www.example.com
```

### 4. Key Usage / Extended Key Usage

該 certificate 是否允許用於：

* server authentication
* client authentication
* signing
* etc.

### 5. Revocation

視架構可能涉及：

* CRL
* OCSP

---

# 17. X.509 Certificate 不做什麼？

這是最值得背的一張表。

| 功能                                     | X.509 certificate 本身負責？ |
| -------------------------------------- | ----------------------- |
| Bind identity to public key            | **Yes**                 |
| Carry public key                       | **Yes**                 |
| Carry private key                      | **No**                  |
| Be signed by CA                        | **Yes**                 |
| Authenticate server as part of TLS     | **Yes**                 |
| Directly encrypt all HTTPS traffic     | **No**                  |
| Automatically create TLS shared secret | **No**                  |
| Replace symmetric encryption           | **No**                  |

---

# 18. TLS 到底做什麼？

TLS 主要提供：

* Confidentiality
* Integrity
* Authentication

NIST 目前也將 TLS 描述為提供 confidentiality 與 certificate-based endpoint authentication 的 security protocol。

但 TLS 不是只靠一個 algorithm。

它是：

> **Hybrid cryptosystem**

---

# 19. 為什麼 TLS 要 Hybrid？

如果全部 asymmetric：

> 太慢。

如果全部 symmetric：

> 初始 secret 怎麼安全交換？

因此：

```text
Asymmetric / DH mechanisms
        ↓
Authentication +
Key establishment
        ↓
Symmetric session keys
        ↓
Fast bulk encryption
```

---

# 20. TLS 1.3 的核心流程

CCSP 不要求背 packet-by-packet，但需要知道角色。

簡化：

```text
CLIENT                         SERVER

ClientHello
- supported cipher suites
- supported groups
- ECDHE key share
----------------------------->

                               ServerHello
                               ECDHE key share
<-----------------------------

        Both derive shared secret
                  │
                  ▼
          symmetric handshake keys

                               Certificate
                               CertificateVerify
<-----------------------------

Client validates:
- certificate
- CA trust
- hostname
- validity
- server signature

Finished
<---------------------------->

Finished
----------------------------->

       Secure Application Data
  symmetric traffic encryption
```

TLS 1.3 的 RFC 明確指出，certificate/signature authentication 與 `(EC)DHE` key establishment 是不同的 cryptographic selections。

---

# 21. Certificate 在 TLS 裡的角色

### Certificate：

回答：

> **Who are you?**

更精確地說：

> 「Trusted CA 證明這個 public key 與這個 subject/domain 有關。」

---

# 22. Digital Signature 在 TLS 裡的角色

Server 用 private key 對 TLS handshake transcript 進行 signature operation。

Client 用 certificate 裡面的：

> **server public key**

驗證 signature。

它證明：

> Server actually possesses the private key associated with this certificate.

因此 authentication chain：

```text
Trusted CA
    ↓
signs certificate
    ↓
Certificate binds
Server identity ↔ Server public key
    ↓
Server proves private-key possession
using digital signature
```

---

# 23. ECDHE 在 TLS 裡的角色

ECDHE：

> **Ephemeral Elliptic Curve Diffie-Hellman**

主要用途：

> **Key establishment**

Client 和 Server 可以建立共同的：

> shared secret

而不直接把 secret 傳過 network。

---

# 24. ECDHE 最大安全特性

重要：

> **Forward Secrecy**

因為每個 session 使用 ephemeral keys。

即使未來 server 的 long-term private key 被偷：

> 過去捕獲的 session 不應因而自動可以被解密。

RFC 8446 也明確指出，如果每個連線使用 fresh `(EC)DHE` keys，產生的 keys 具有 forward secrecy。

---

# 25. TLS 1.2 vs TLS 1.3：CCSP 必須知道的程度

## Legacy TLS / TLS 1.2

過去可能存在：

```text
RSA key exchange
```

簡化理解：

Client 產生 secret，利用 server RSA public key 保護。

但：

> 沒有 forward secrecy。

---

## TLS 1.3

已經不使用傳統：

> RSA static key exchange

signature-based TLS 1.3 常見：

```text
Certificate / Signature
→ Authentication

ECDHE
→ Key establishment

AES-GCM / ChaCha20-Poly1305
→ Traffic encryption
```

因此如果舊 LearnZapp 說：

> X.509 certificate creates the shared secret

不要直接背。

---

# 26. LearnZapp 最容易出的陷阱

## Trap 1

> TLS 使用 certificate，所以 application traffic 是 asymmetric encryption。

### 錯。

Application traffic 主要使用：

> **Symmetric encryption**

---

## Trap 2

> Certificate creates the shared secret.

### 對 TLS 1.3 而言不精確。

Certificate 主要參與：

> Authentication / identity binding

而 `(EC)DHE`：

> Key establishment

---

## Trap 3

> Digital signature provides confidentiality.

### 錯。

Digital signature：

```text
Integrity
Authenticity
Non-repudiation support
```

不是 confidentiality。

---

## Trap 4

> Hash provides authentication.

### 單純 hash 不夠。

因為任何人都可以：

```text
modify data
+
compute a new hash
```

---

## Trap 5

> HMAC gives non-repudiation.

### 錯。

因為雙方共享 secret。

---

## Trap 6

> Certificate contains private key.

### 錯。

Certificate 裡是：

> Public key

private key 另外保護。

---

# 27. RSA / ECC / ECDHE 不要混在一起

## RSA

可以被用於：

* asymmetric encryption
* digital signatures

但：

> TLS 1.3 不再使用 legacy RSA key exchange。

RSA certificate/signature 仍可能存在。

---

## ECC

Elliptic Curve Cryptography 是一整類 asymmetric cryptography。

優點通常包括：

> 相同安全等級下，比傳統 RSA 使用更小的 key size。

---

## ECDSA

Elliptic Curve Digital Signature Algorithm

用途：

> **Digital signature**

---

## ECDHE

Elliptic Curve Diffie-Hellman Ephemeral

用途：

> **Key establishment**

### 必考：

```text
ECDSA
→ Signature

ECDHE
→ Key exchange / establishment
```

兩個不要混。

---

# 28. Authentication vs Encryption

這是 LearnZapp 很喜歡混淆的地方。

### Authentication

回答：

> Who are you?

可以涉及：

* Certificate
* Digital signature
* credentials

---

### Confidentiality

回答：

> Can unauthorized parties read this data?

可以涉及：

* AES
* ChaCha20

---

### Integrity

回答：

> Has the data been changed?

可涉及：

* hash
* MAC/HMAC
* digital signature

---

### Non-repudiation

回答：

> Can the signer credibly deny signing?

典型：

> Digital signature

---

# 29. 四個 Security Services 對照

| Mechanism            | Confidentiality | Integrity |             Authentication | Non-repudiation |
| -------------------- | --------------: | --------: | -------------------------: | --------------: |
| Symmetric encryption |               ✅ |  取決於 mode |                       ❌/有限 |               ❌ |
| Hash                 |               ❌ |         ✅ |                          ❌ |               ❌ |
| HMAC                 |               ❌ |         ✅ |                          ✅ |               ❌ |
| Digital Signature    |               ❌ |         ✅ |                          ✅ |       ✅ support |
| Certificate          |               ❌ |  支援 trust |         ✅ identity binding |              間接 |
| TLS                  |               ✅ |         ✅ | ✅ server / optional client |           非主要目的 |

---

# 30. AES-GCM 為什麼常出現在 TLS？

AES-GCM 是：

> **Authenticated Encryption with Associated Data — AEAD**

可以同時提供：

* Confidentiality
* Integrity/authentication of ciphertext

所以 TLS 1.3 cipher suites 會使用 AEAD algorithm。

例如概念上：

```text
AES-GCM
ChaCha20-Poly1305
```

---

# 31. Cipher Suite：不要用 TLS 1.2 思維讀 TLS 1.3

TLS 1.2 cipher suite 名稱過去可能一次寫很多資訊：

```text
TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
```

它會指出：

* ECDHE
* RSA
* AES-GCM
* SHA

---

TLS 1.3：

例如：

```text
TLS_AES_128_GCM_SHA256
```

不再從 cipher-suite name 指定：

* certificate algorithm
* ECDHE group

因為 TLS 1.3 把它們分開 negotiation。

這點非常適合辨認舊題庫。

---

# 32. Mutual TLS / mTLS

普通 HTTPS：

```text
Client
    ↓
authenticates
Server certificate
```

通常：

> Server authentication

---

mTLS：

```text
Server presents certificate
+
Client presents certificate
```

雙方 certificate-based authentication。

所以：

> TLS 可以支援 client certificate authentication，但一般 public HTTPS 不一定使用。

---

# 33. CRL vs OCSP

## CRL

Certificate Revocation List

概念：

> 下載一份 revoked certificate 清單。

---

## OCSP

Online Certificate Status Protocol

概念：

> 詢問特定 certificate 的 revocation status。

CCSP 高層次知道差異即可。

---

# 34. Root CA 為什麼可以被信任？

Root CA 通常是：

> **Trust anchor**

它可能是 self-signed。

這並不代表：

> self-signed automatically trustworthy.

真正原因：

> Root CA 已經透過 OS/browser/software trust store 被預先設定為 trusted anchor。

---

# 35. Self-Signed Certificate

Self-signed：

```text
Subject = Issuer
```

自己用自己的 private key sign certificate。

Cryptographically：

> signature 可以有效。

但 trust 問題是：

> **Who says this identity should be trusted?**

沒有 external trusted CA chain 時：

> client 必須另有 out-of-band trust mechanism。

---

# 36. Certificate ≠ Encryption Key Management System

Certificate：

> Identity ↔ Public key binding

KMS：

> Key creation/storage/rotation/access/lifecycle management

HSM：

> Specialized protected hardware for cryptographic key operations

不要混。

---

# 37. CCSP 常見 Scenario #1

### Question

A browser receives the server's X.509 certificate. What is the certificate's primary cryptographic purpose?

### Answer

> Bind the server's identity to a public key through a trusted CA signature.

### 分類

`[T]`

---

# 38. Scenario #2

### Question

Which mechanism normally encrypts bulk application data after a TLS session is established?

### Answer

> Symmetric encryption using derived traffic/session keys.

### 分類

`[K]`

---

# 39. Scenario #3

### Question

Which mechanism proves possession of the private key corresponding to a certificate during certificate-based TLS authentication?

### Answer

> Digital signature.

### 分類

`[K]`

---

# 40. Scenario #4

### Question

Which mechanism establishes a fresh shared secret and can provide forward secrecy in TLS 1.3?

### Answer

> `(EC)DHE`

### 分類

`[K]`

---

# 41. Scenario #5

### Question

Alice encrypts a message using Bob's public key. What security service is primarily achieved?

### Answer

> Confidentiality.

Only Bob's corresponding private key should decrypt it.

---

# 42. Scenario #6

### Question

Alice signs a message using her private key. Bob verifies it using Alice's public key.

Primary results:

> Integrity + authenticity + non-repudiation support.

Not:

> Confidentiality.

---

# 43. Scenario #7

### Question

Why doesn't a plain SHA-256 digest authenticate a sender?

### Answer

Because:

> Anyone who changes the message can calculate a new SHA-256 digest.

There is no secret/private signing key involved.

---

# 44. Scenario #8

### Question

Why does HMAC not normally provide non-repudiation?

### Answer

Because:

> Both parties possess the same shared secret and can generate a valid HMAC.

---

# 45. Scenario #9

### Question

If an attacker steals only a server's public certificate but not its private key, can the attacker simply impersonate the server?

### Answer

> No.

Certificate is intended to be public.

The critical secret is:

> private key.

---

# 46. Scenario #10

### Question

A server certificate expires. Does the public key mathematically stop working?

### Answer

> No.

But:

> PKI validation should reject the certificate because it is outside its approved validity period.

This distinguishes:

```text
Cryptographic functionality
vs
Trust validity
```

---

# 47. 一張圖解決 TLS 題

考試看到 TLS，就畫：

```text
Identity
   │
   ▼
X.509 Certificate
   │
   ▼
Public Key
   │
Digital Signature
   │
   ▼
Authentication
────────────────────────

Client ECDHE
     +
Server ECDHE
     │
     ▼
Shared Secret
     │
     ▼
Derived Traffic Keys
────────────────────────

Symmetric AEAD
     │
     ▼
Encrypted Application Traffic
```

---

# 48. 最重要的「不要混」

```text
Certificate
≠ Private key

Certificate
≠ Shared secret

Certificate
≠ Symmetric session key

Digital signature
≠ Encryption

Hash
≠ Encryption

ECDSA
≠ ECDHE

Authentication
≠ Confidentiality

Key establishment
≠ Bulk encryption
```

---

# 49. CCSP 快速判斷表

看到題目問：

### 「大量資料加密」

→ **Symmetric**

### 「誰簽的？」

→ **Digital signature**

### 「完整性 + 身分 + non-repudiation？」

→ **Digital signature**

### 「完整性 + shared secret authentication？」

→ **HMAC**

### 「Identity 與 public key binding？」

→ **Certificate / PKI**

### 「誰簽 certificate？」

→ **CA private key**

### 「誰驗證 certificate signature？」

→ **CA public key**

### 「TLS fresh shared secret？」

→ **(EC)DHE**

### 「TLS application traffic？」

→ **Symmetric AEAD**

### 「Forward secrecy？」

→ **Ephemeral Diffie-Hellman / ECDHE**

### 「Public key 放在哪？」

→ **Certificate**

### 「最不能外洩？」

→ **Private key**

---

# 50. 最後必背 10 句

1. **Symmetric crypto uses a shared secret and is efficient for bulk encryption.**

2. **Asymmetric crypto uses a public/private key pair.**

3. **Public-key encryption provides confidentiality; the corresponding private key decrypts.**

4. **A digital signature is created with the private key and verified with the public key.**

5. **Digital signatures provide integrity, authenticity and non-repudiation support—not confidentiality.**

6. **An X.509 certificate binds a subject identity to a public key.**

7. **A CA digitally signs a certificate; the certificate does not contain the subject's private key.**

8. **In TLS 1.3, certificate/signature authentication and ECDHE key establishment are separate functions.**

9. **TLS application traffic is normally protected using symmetric traffic keys.**

10. **ECDHE provides key establishment and forward secrecy; ECDSA provides digital signatures.**

---

# 51. 一句話總結整個 TLS

> **Certificate tells you whose public key it is; digital signature proves private-key possession; ECDHE establishes a shared secret; symmetric cryptography protects the actual traffic.**

這一句如果能真正理解，LearnZapp 大部分 TLS / X.509 / certificate / asymmetric / symmetric 題都能靠 reasoning 解，而不是死背。
