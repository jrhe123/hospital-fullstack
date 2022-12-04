### Redis

#### load tar file
docker load < Redis.tar.gz

#### run container
docker run -it -d --name redis -p 6380:6379 \
-v /Users/jiaronghe/Desktop/DigitalXi/askAVet/hospital-fullstack/docker/redis.conf:/usr/local/etc/redis/redis.conf \
-e TZ=America/Toronto \
redis:6.0.10 \
redis-server /usr/local/etc/redis/redis.conf
