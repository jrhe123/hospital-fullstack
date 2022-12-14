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


eg:

SELECT u."id" FROM HOSPITAL.PATIENT_USER u LEFT JOIN HOSPITAL.PATIENT_USER_INFO_CARD uic ON uic."user_id" = u."id" WHERE uic."tel" = '6479291623';

select * from hospital.patient_user;
select * from hospital.patient_user_info_card;
select "id","pid","medical_history","insurance_type","exist_face_model","birthday" from hospital.patient_user_info_card;

DELETE FROM HOSPITAL.PATIENT_USER WHERE "id" IN (1);
DELETE FROM HOSPITAL.PATIENT_USER_INFO_CARD WHERE "id" IN (1);

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

#### RBAC - check user permission

SELECT p."permission_code" AS "permission"
FROM HOSPITAL.MIS_USER u
JOIN HOSPITAL.MIS_USER_ROLE ur ON u."id" = ur."user_id"
JOIN HOSPITAL.MIS_ROLE_PERMISSION rp ON rp."role_id" = ur."role_id"
JOIN HOSPITAL.MIS_PERMISSION p ON rp."permission_id" = p."id"
WHERE u."id" = 0;


mis_user
"id","username","password","name","sex","tel","email","dept_id","job","status","create_time"
+-----+-----------+-----------------------------------+--------+------+---+
| id  | username  |             password              |  name  | sex  | t |
+-----+-----------+-----------------------------------+--------+------+---+
| 0   | admin     | 061575f43e456772015c0032c0531edf  | ???????????????  | ???    |   |
+-----+-----------+-----------------------------------+--------+------+---+


mis_user_role
+-----+----------+----------+
| id  | user_id  | role_id  |
+-----+----------+----------+
| 0   | 0        | 0        |
+-----+----------+----------+


mis_role_permission
+-----+----------+----------------+
| id  | role_id  | permission_id  |
+-----+----------+----------------+
| 0   | 0        | 0              |
| 1   | 1        | 4              |
| 2   | 1        | 16             |
| 3   | 1        | 20             |
| 4   | 1        | 24             |
| 5   | 1        | 28             |
| 6   | 1        | 32             |
| 7   | 2        | 36             |
| 8   | 2        | 37             |
+-----+----------+----------------+


mis_role;
+-----+------------+------------+
| id  | role_name  |   remark   |
+-----+------------+------------+
| 0   | ???????????????      | ???????????????      |
| 1   | ??????           | ????????????       |
| 2   | ??????????????????     | ???????????????????????????  |
+-----+------------+------------+


mis_permission
+-----+--------------------------+------------+------------+
| id  |     permission_code      | module_id  | action_id  |
+-----+--------------------------+------------+------------+
| 0   | ROOT                     | 0          | 0          |
| 1   | MIS_USER:INSERT          | 1          | 1          |
| 2   | MIS_USER:DELETE          | 1          | 2          |
| 3   | MIS_USER:UPDATE          | 1          | 3          |
| 4   | MIS_USER:SELECT          | 1          | 4          |
| 5   | PATIENT_USER:INSERT      | 2          | 1          |
| 6   | PATIENT_USER:DELETE      | 2          | 2          |
| 7   | PATIENT_USER:UPDATE      | 2          | 3          |
| 8   | PATIENT_USER:SELECT      | 2          | 4          |
| 9   | WORKER_USER:INSERT       | 3          | 1          |
| 10  | WORKER_USER:DELETE       | 3          | 2          |
| 11  | WORKER_USER:UPDATE       | 3          | 3          |
| 12  | WORKER_USER:SELECT       | 3          | 4          |
| 13  | DEPT:INSERT              | 4          | 1          |
| 14  | DEPT:DELETE              | 4          | 2          |
| 15  | DEPT:UPDATE              | 4          | 3          |
| 16  | DEPT:SELECT              | 4          | 4          |
| 17  | MEDICAL_DEPT:INSERT      | 5          | 1          |
| 18  | MEDICAL_DEPT:DELETE      | 5          | 2          |
| 19  | MEDICAL_DEPT:UPDATE      | 5          | 3          |
| 20  | MEDICAL_DEPT:SELECT      | 5          | 4          |
| 21  | MEDICAL_DEPT_SUB:INSERT  | 6          | 1          |
| 22  | MEDICAL_DEPT_SUB:DELETE  | 6          | 2          |
| 23  | MEDICAL_DEPT_SUB:UPDATE  | 6          | 3          |
| 24  | MEDICAL_DEPT_SUB:SELECT  | 6          | 4          |
| 25  | SCHEDULE:INSERT          | 7          | 1          |
| 26  | SCHEDULE:DELETE          | 7          | 2          |
| 27  | SCHEDULE:UPDATE          | 7          | 3          |
| 28  | SCHEDULE:SELECT          | 7          | 4          |
| 29  | REGISTRATION:INSERT      | 8          | 1          |
| 30  | REGISTRATION:DELETE      | 8          | 2          |
| 31  | REGISTRATION:UPDATE      | 8          | 3          |
| 32  | REGISTRATION:SELECT      | 8          | 4          |
| 33  | VIDEO_DIAGNOSE:INSERT    | 9          | 1          |
| 34  | VIDEO_DIAGNOSE:DELETE    | 9          | 2          |
| 35  | VIDEO_DIAGNOSE:UPDATE    | 9          | 3          |
| 36  | VIDEO_DIAGNOSE:SELECT    | 9          | 4          |
| 37  | VIDEO_DIAGNOSE:DIAGNOSE  | 9          | 5          |
| 38  | DOCTOR:INSERT            | 10         | 1          |
| 39  | DOCTOR:DELETE            | 10         | 2          |
| 40  | DOCTOR:UPDATE            | 10         | 3          |
| 41  | DOCTOR:SELECT            | 10         | 4          |
| 42  | NURSE:INSERT             | 11         | 1          |
| 43  | NURSE:DELETE             | 11         | 2          |
| 44  | NURSE:UPDATE             | 11         | 3          |
| 45  | NURSE:SELECT             | 11         | 4          |
| 46  | DOCTOR_PRICE:INSERT      | 13         | 1          |
| 47  | DOCTOR_PRICE:DELETE      | 14         | 2          |
| 48  | DOCTOR_PRICE:UPDATE      | 15         | 3          |
| 49  | DOCTOR_PRICE:SELECT      | 16         | 4          |
| 50  | SYSTEM:UPDATE            | 16         | 3          |
| 51  | SYSTEM:SELECT            | 16         | 4          |
+-----+--------------------------+------------+------------+


mis_action
+-----+--------------+--------------+
| id  | action_code  | action_name  |
+-----+--------------+--------------+
| 1   | INSERT       | ??????           |
| 2   | DELETE       | ??????           |
| 3   | UPDATE       | ??????           |
| 4   | SELECT       | ??????           |
| 5   | APPROVAL     | ??????           |
| 6   | IMPORT       | ??????           |
| 7   | EXPORT       | ??????           |
| 8   | BACKUP       | ??????           |
| 9   | ARCHIVE      | ??????           |
| 10  | DIAGNOSE     | ??????           |
+-----+--------------+--------------+


#### query

select * from hospital.doctor;
UPSEERT INTO HOSPITAL.DOCTOR("id", "status") VALUES(1,1);

AND "name" LIKE '%${name}%'

CREATE TABLE hospital.doctor
(
    "id"          INTEGER NOT NULL PRIMARY KEY,
    "name"        VARCHAR(20),
    "pid"         CHAR(18),
    "uuid"        CHAR(32),
    "sex"         VARCHAR(1),
    "photo"       VARCHAR,
    "birthday"    DATE,
    "school"      VARCHAR(50),
    "degree"      VARCHAR(20),
    "tel"         CHAR(11),
    "address"     VARCHAR(200),
    "email"       VARCHAR(200),
    "job"         VARCHAR(20),
    "remark"      VARCHAR(50),
    "description" VARCHAR,
    "hiredate"    DATE,
    "tag"         VARCHAR,
    "recommended" BOOLEAN,
    -- 1?????????2?????????3?????????4????????????????????????
    "status" TINYINT,
    "create_time" DATE
);

CREATE TABLE hospital.medical_dept
(
    "id"          INTEGER NOT NULL PRIMARY KEY,
    "name"        VARCHAR(50),
    "outpatient"  BOOLEAN,
    "description" VARCHAR(500),
    --     ???????????????????????????????????????
    "recommended" BOOLEAN
);

CREATE TABLE hospital.medical_dept_sub(
  "id" INTEGER NOT NULL PRIMARY KEY ,
  "name" VARCHAR(50),
  "dept_id" INTEGER,
  "location" VARCHAR(50)
);

CREATE TABLE hospital.medical_dept_sub_and_doctor
(
    "id"        INTEGER PRIMARY KEY,
    "dept_sub_id"   INTEGER,
    "doctor_id" INTEGER
);