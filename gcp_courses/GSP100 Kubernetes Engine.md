# Google Kubernetes Engine：Qwik Start

建立叢集：

gcloud container clusters create --machine-type=e2-medium --zone=us-west4-b lab-cluster

  
使用叢集進行驗證：

gcloud container clusters get-credentials lab-cluster

從 hello-app 容器映像檔**建立新 Deployment** hello-server，請執行下列 kubectl create 指令：

kubectl create deployment hello-server --image=gcr.io/google-samples/hello-app:1.0

＊＊先  
Kubernetes Service 是可讓您對外部流量公開應用程式的 Kubernetes 資源。如要建立 Kubernetes Service，請執行下列 kubectl expose 指令：

kubectl expose deployment hello-server --type=LoadBalancer --port 8080  
  
再建立新 Deployment：hello-server-> check my progress

  

檢查 hello-server Service，請執行 kubectl get：

kubectl get service

  

  

**開啟新分頁並輸入以下位址。輸入位址時請用** hello-server **的** EXTERNAL-IP **取代** [EXTERNAL IP]**。**

http://[EXTERNAL-IP]:8080

**  
  
執行以下指令可「刪除」叢集：**

**gcloud container clusters delete lab-cluster**