# GSP100 — Google Kubernetes Engine: Qwik Start / GKE 快速入門

> **Lab ID:** GSP100  
> **Platform:** Google Skills / Qwiklabs  
> **Level:** Introductory  
> **Main Service:** Google Kubernetes Engine (GKE)  
> **Tools:** `gcloud` CLI, `kubectl`

---

## 1. Lab Objectives / 實驗目標

**English:** Deploy a GKE cluster, create a Deployment from a container image, expose it via a LoadBalancer Service, and verify external access.

**繁體中文：** 建立 GKE 叢集、從容器映像檔建立 Deployment、以 LoadBalancer Service 對外暴露服務，並驗證外部存取。

完成後應能：

1. 使用 `gcloud` 建立 GKE 叢集（Create a GKE cluster with `gcloud`）
2. 設定 `kubectl` 認證（Configure `kubectl` credentials）
3. 建立 Deployment（Create a Deployment from a container image）
4. 建立 LoadBalancer Service（Expose the app with a LoadBalancer Service）
5. 透過外部 IP 驗證應用程式（Verify the app via external IP）
6. 刪除叢集以釋放資源（Delete the cluster to clean up）

---

## 2. Architecture Overview / 架構概覽

```
Cloud Shell (gcloud + kubectl)
        │
        ▼
GKE Cluster: lab-cluster (zone: us-west4-b)
        │
        ├── Deployment: hello-server
        │     └── Pod → Container: gcr.io/google-samples/hello-app:1.0
        │
        └── Service: hello-server (LoadBalancer, port 8080)
                    └── EXTERNAL-IP → http://[EXTERNAL-IP]:8080
```

---

## 3. Step-by-Step Instructions / 操作步驟

### Step 1 — Create the cluster / 建立叢集

```bash
gcloud container clusters create lab-cluster \
  --machine-type=e2-medium \
  --zone=us-west4-b
```

| Parameter | Description / 說明 |
|-----------|-------------------|
| `lab-cluster` | Cluster name / 叢集名稱 |
| `--machine-type=e2-medium` | 2 vCPU, 4 GB RAM per node / 每節點 2 vCPU、4 GB RAM |
| `--zone=us-west4-b` | Zonal cluster in `us-west4-b` / 區域型叢集 |

---

### Step 2 — Configure kubectl / 設定 kubectl 認證

```bash
gcloud container clusters get-credentials lab-cluster
```

**English:** Downloads cluster credentials and updates your kubeconfig so `kubectl` can communicate with the cluster.

**繁體中文：** 下載叢集憑證並更新 kubeconfig，使 `kubectl` 能與叢集通訊。

---

### Step 3 — Create Deployment / 建立 Deployment

```bash
kubectl create deployment hello-server \
  --image=gcr.io/google-samples/hello-app:1.0
```

| Concept | Description / 說明 |
|---------|-------------------|
| **Deployment** | Manages Pod replicas and rolling updates / 管理 Pod 副本與滾動更新 |
| **Pod** | Smallest deployable unit; runs one or more containers / 最小部署單位，執行一個或多個容器 |
| **hello-app:1.0** | Google sample image returning `Hello, world!` / Google 範例映像檔 |

> **Lab checkpoint:** Click **Check my progress** after creating the Deployment.

---

### Step 4 — Expose with LoadBalancer / 建立 LoadBalancer Service

```bash
kubectl expose deployment hello-server \
  --type=LoadBalancer \
  --port=8080
```

| Parameter | Description / 說明 |
|-----------|-------------------|
| `--type=LoadBalancer` | Provisions a GCP external load balancer / 建立 GCP 外部負載平衡器 |
| `--port=8080` | Service port exposed externally / 對外暴露的服務埠 |

> **Lab checkpoint:** Click **Check my progress** after exposing the Service.

---

### Step 5 — Verify Service / 驗證 Service

```bash
kubectl get service hello-server
```

Expected output / 預期輸出：

```
NAME           TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)          AGE
hello-server   LoadBalancer   10.x.x.x       35.xxx.xxx.xxx   8080:3xxxx/TCP   2m
```

Wait until **EXTERNAL-IP** shows an IP address (not `<pending>`).  
等待 **EXTERNAL-IP** 欄位顯示 IP（非 `<pending>`）。

Open in browser / 在瀏覽器開啟：

```
http://[EXTERNAL-IP]:8080
```

Expected response / 預期回應：`Hello, world! Version: 1.0.0`

---

### Step 6 — Clean up / 清理資源

```bash
gcloud container clusters delete lab-cluster --zone=us-west4-b
```

**English:** Deletes the cluster and all associated resources. Confirm when prompted.

**繁體中文：** 刪除叢集及所有關聯資源，依提示確認即可。

---

## 4. Key Concepts / 核心概念

| Term | English | 繁體中文 |
|------|---------|----------|
| **GKE** | Managed Kubernetes on Google Cloud | Google Cloud 代管 Kubernetes 服務 |
| **Cluster** | Group of nodes running containerized workloads | 執行容器工作負載的節點群組 |
| **Deployment** | Declarative way to manage Pods | 以宣告式方式管理 Pod |
| **Service** | Stable network endpoint for Pods | 為 Pod 提供穩定網路端點 |
| **LoadBalancer** | External IP for public access | 分配外部 IP 供公開存取 |

---

## 5. Quick Reference / 指令速查

```bash
# Create cluster
gcloud container clusters create lab-cluster --machine-type=e2-medium --zone=us-west4-b

# Configure kubectl
gcloud container clusters get-credentials lab-cluster

# Deploy app
kubectl create deployment hello-server --image=gcr.io/google-samples/hello-app:1.0

# Expose service
kubectl expose deployment hello-server --type=LoadBalancer --port=8080

# Check status
kubectl get deployments
kubectl get pods
kubectl get service hello-server

# Delete cluster
gcloud container clusters delete lab-cluster --zone=us-west4-b
```

---

## 6. Summary / 總結

**English:** GSP100 introduces the core GKE workflow — create a cluster, deploy a containerized app, expose it externally, and clean up. This pattern is the foundation for all Kubernetes workloads on Google Cloud.

**繁體中文：** GSP100 介紹 GKE 核心流程：建立叢集 → 部署容器應用 → 對外暴露服務 → 清理資源。這是 Google Cloud 上所有 Kubernetes 工作負載的基礎模式。
