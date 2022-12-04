### Phoenix

#### load tar file
docker load < phoenix.tar.gz

#### run container
docker run -it -d -p 2181:2181 -p 8765:8765 -p 15165:15165 \
-p 16000:16000 -p 16010:16010 -p 16020:16020 \
-v hbdata:/tmp/hbase-root/hbase/data \
--name phoenix \
boostport/hbase-phoenix-all-in-one:2.0-5.0

#### exec into container & set env variable
docker exec -it phoenix bash
export HBASE_CONF_DIR=/opt/hbase/conf/

#### run phoenix in cmd
/opt/phoenix-server/bin/sqlline.py localhost

!exit