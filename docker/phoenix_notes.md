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

#### tables
- patient_user
- patient_user_info_card
- patient_face_auth
- medical_dept
- medical_dept_sub
- doctor
- doctor_price
- medical_dept_sub_and_doctor
- doctor_work_plan
- doctor_work_plan_schedule
- medical_registration
- doctor_prescription
- doctor_consult
- mis_action
- mis_module
- mis_permission
- mis_role
- mis_role_permission
- mis_dept
- mis_user
- mis_user_role
- video_diagnose
- video_diagnose_file

#### query

select * from hospital.doctor;

