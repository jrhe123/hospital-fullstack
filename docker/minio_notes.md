### Redis

#### load tar file
docker load < Minio.tar.gz

### create data folder
chmod -R 777 /Users/jiaronghe/Desktop/DigitalXi/askAVet/hospital-fullstack/docker/minio/data/

#### run container
docker run -it -d --name minio \
-p 9000:9000 -p 9001:9001 \
-v /Users/jiaronghe/Desktop/DigitalXi/askAVet/hospital-fullstack/docker/minio/data:/data \
-e TZ=America/Toronto --privileged=true \
--env MINIO_ROOT_USER="root" \
--env MINIO_ROOT_PASSWORD="abc123456" \
bitnami/minio:latest

### UI
- localhost:9001
- username: root
- pwd: abc123456

### create bucket
- hospital
- public access