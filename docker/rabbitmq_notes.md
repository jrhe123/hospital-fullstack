### Redis

#### load tar file
docker load < RabbitMQ.tar.gz

#### run container
docker run -it -d --name mq \
-p 4369:4369 -p 5671:5671 -p 5672:5672 \
-e TZ=America/Toronto \
rabbitmq:3.8.9

