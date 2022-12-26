CREATE SCHEMA hospital;
USE
hospital;

-- 患者端用户表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.patient_user;
CREATE TABLE hospital.patient_user
(
    "id"          INTEGER NOT NULL PRIMARY KEY,
    "uuid"     VARCHAR(32),
    "nickname"    VARCHAR(255),
    "photo"       VARCHAR,
    "sex"         VARCHAR(10),
--   状态：1代表正常，2代表禁用
    "status"      TINYINT,
    "create_time" DATE
);
DROP SEQUENCE IF EXISTS hospital.patient_user_sequence;
CREATE SEQUENCE hospital.patient_user_sequence START WITH 1 increment BY 1;
CREATE INDEX patient_user_idx_1 ON hospital.patient_user ("uuid");
CREATE INDEX patient_user_idx_2 ON hospital.patient_user ("status");


-- 患者端用户基本信息表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.patient_user_info_card;
CREATE TABLE hospital.patient_user_info_card
(
    "id"              INTEGER NOT NULL PRIMARY KEY,
    "user_id"         INTEGER,
    "uuid"            VARCHAR(32),
    "name"            VARCHAR(255),
    "sex"             VARCHAR(10),
    "pid"             VARCHAR(18),
    "tel"             VARCHAR(11),
    "birthday"        DATE,
    -- 疾病史
    "medical_history" VARCHAR,
    -- 保险类型
    "insurance_type"  VARCHAR,
--     是否人脸录入面部信息
    "exist_face_model" BOOLEAN
);

DROP SEQUENCE IF EXISTS hospital.patient_user_info_card_sequence;
CREATE SEQUENCE hospital.patient_user_info_card_sequence START WITH 1 increment BY 1;
CREATE INDEX patient_user_info_card_idx_1 ON hospital.patient_user_info_card ("user_id");
CREATE INDEX patient_user_info_card_idx_2 ON hospital.patient_user_info_card ("uuid");
CREATE INDEX patient_user_info_card_idx_3 ON hospital.patient_user_info_card ("pid");

-- 人脸认证记录表-----------------------------------------------
DROP TABLE IF EXISTS hospital.patient_face_auth;
CREATE TABLE hospital.patient_face_auth(
    "id" INTEGER NOT NULL PRIMARY KEY ,
    "uuid"            VARCHAR(32),
    "patient_card_id" INTEGER,
    "date" DATE
);

DROP SEQUENCE IF EXISTS hospital.patient_face_auth_sequence;
CREATE SEQUENCE hospital.patient_face_auth_sequence START WITH 1 increment BY 1;
CREATE INDEX patient_face_auth_idx_1 ON hospital.patient_face_auth ("patient_card_id");
CREATE INDEX patient_face_auth_idx_2 ON hospital.patient_face_auth ("date");


-- 科室表 --------------------------------------------------
DROP TABLE IF EXISTS hospital.medical_dept;
CREATE TABLE hospital.medical_dept
(
    "id"          INTEGER NOT NULL PRIMARY KEY,
    "name"        VARCHAR(255),
    "uuid"        VARCHAR(32),
    "outpatient"  BOOLEAN,
    "description" VARCHAR,
--     推荐在首页科室列表中展示的
    "recommended" BOOLEAN
);

DROP SEQUENCE IF EXISTS hospital.medical_dept_sequence;
CREATE SEQUENCE hospital.medical_dept_sequence START WITH 1 increment BY 1;

UPSERT
INTO hospital.medical_dept("id","name","outpatient","description","recommended", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sequence,'Dental',true,
    'At present, it has become a large-scale medical department with a certain influence at home and abroad. The department currently has nearly 70 medical staff, 6 professors, 3 associate professors, 3 doctoral tutors, and 4 master tutors. It trains doctoral and master students every year. Nearly 20 people.',
    true, '1');

UPSERT
INTO hospital.medical_dept("id","name","outpatient","description","recommended", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sequence,'Ophthalmology',true,
    'There are a total of 67 medical staff and technicians in the whole department, including 6 professors, 9 associate professors, 10 lecturers, and 4 teaching assistants. All 29 doctors on the job have obtained masters and doctoral degrees, including 14 doctors. There are multiple professional groups such as fundus disease, glaucoma, cataract, ocular trauma, femtosecond laser treatment of myopia, orbital disease, and strabismus. Carry out various external retinal detachment reduction operations, vitreoretinal surgery for retinal detachment surgery, complex and secondary retinal detachment surgery, macular hole retinal detachment surgery, etc.',
    true, '2');

UPSERT
INTO hospital.medical_dept("id","name","outpatient","description","recommended", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sequence,'ENT',true,
    'The department has 3 professional groups of otology, rhinology, and throat head and neck surgery, equipped with 5 examination rooms for hearing test, vestibular function test, laryngeal function test, endoscopy and polysomnography, equipped with operating microscope and nasal endoscope system, ENT power system, CO2 laser treatment machine and a batch of advanced diagnosis and treatment equipment, with a total of 100 beds. The annual outpatient and emergency patient volume is nearly 100,000, the annual hospitalization is more than 3,500, and the annual operations are more than 3,000. The comprehensive strength of the discipline is in the advanced ranks in Canada.',
    true, '3');

UPSERT
INTO hospital.medical_dept("id","name","outpatient","description","recommended", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sequence,'Internal medicine',true,
    'At present, it has become a large-scale medical department with a certain influence at home and abroad. The department currently has nearly 70 medical staff, 6 professors, 3 associate professors, 3 doctoral tutors, and 4 master tutors. It trains doctoral and master students every year. Nearly 20 people. The Respiratory Department has an annual outpatient volume of more than 50,000, and annually treats more than 2,000 inpatients with various respiratory diseases. It currently has 75 beds, including 23 beds in the Internal Medicine Intensive Care Unit. It has long been responsible for the diagnosis and treatment of internal medicine critically ill patients. Long-term commitment to seven-year, undergraduate, international students and other medical classes of internal medicine, diagnostics, clinical practice and other teaching.',
    true, '4');

UPSERT
INTO hospital.medical_dept("id","name","outpatient","description","recommended", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sequence,'Surgical',true,
    'The department has 52 doctors, 8 professors and 9 associate professors. An average of more than 1,000 surgeries are performed each year. Among them, laparoscopic minimally invasive surgery accounts for more than 40% of the operation volume. In recent years, various leading techniques in thoracic surgery have been carried out one after another, such as 3-incision esophageal cancer surgery, total laparoscopic esophageal cancer surgery, laparoscopic single-port thoracic operation, single-port abdominal single-port esophageal cancer surgery, etc. The department undertakes more than 10 national, ministerial and provincial scientific research projects such as the National Natural Science Foundation of China, and has published more than 10 English papers in international core medical journals SCI, and more than 60 Chinese papers in national core journals.',
    true, '5');

UPSERT
INTO hospital.medical_dept("id","name","outpatient","description","recommended", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sequence,'Dermatology',true,
    'The Department of Dermatology was established in 1977 and now has 11 doctors (3 associate chief physicians) and 2 nurses, 8 of whom have a masters degree and 2 have a doctors degree. At present, the number of outpatients is about 120,000 per year, and it is the main place for diagnosis and treatment of skin diseases. The main diseases diagnosed and treated include childrens eczema, dermatitis, urticaria, drug eruption and other allergic allergic diseases; chickenpox, hand, foot and mouth disease, scarlet fever, infectious mononucleosis, warts, folliculitis, impetigo, candida dermatitis , tinea pedis, tinea corporis, scabies and other infectious skin diseases.',
    true, '6');

UPSERT
INTO hospital.medical_dept("id","name","outpatient","description","recommended", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sequence,'Gynecology',true,
    'Gynecology currently has 89 employees, including 42 doctors (16 doctors, 26 masters), including 14 senior professionals (professors, chief physicians), 2 provincial management experts, 2 special government allowances, doctoral supervisors 3 people, 11 master tutors. Rich experience in the treatment of complex female reproductive tract deformities (congenital absence of vagina vaginoplasty, Roberts hysteroscopic correction, oblique vaginal septum correction, special type of vulvovaginal deformity correction, uterine mediastinectomy) In 2019, the outstanding achievements in basic research and clinical application of female reproductive system reconstruction won the first prize of Hebei Science and Technology Progress Award.',
    true, '7');

UPSERT
INTO hospital.medical_dept("id","name","outpatient","description","recommended", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sequence,'Pediatrics',true,
    'At present, there are 49 medical staff, including 17 doctors and 32 nurses. Among them, there are 2 chief physicians, 2 deputy chief physicians, 9 attending physicians, 6 masters degree holders, and 4 masters degree candidates. Pediatrics is divided into outpatient and ward two units. The Pediatric Outpatient Clinic accepts patients 24 hours a day all year round, and the annual outpatient and emergency volume has increased year by year, with an average annual outpatient and emergency volume of up to 80,000. The daily infusion volume is 80-100 person-times, and at most reaches 200-280 person-times. The daily atomization volume is 50 person-times, and the maximum reaches 150 person-times. The Department of Pediatrics has always focused on the theme of "taking patients as the center and quality as life", building a harmonious department and building a professional pediatric team. The satisfaction of patients has been continuously improved, and it has been widely recognized and respected by parents.',
    true, '8');

UPSERT
INTO hospital.medical_dept("id","name","outpatient","description","recommended", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sequence,'Neurology',true,
    'The department has a professional neurodiagnostic technical team, routinely carry out neuroimaging (3.0MRI, 128-slice spiral CT, DSA, TCD, ECT, OCT), neuroelectrophysiology (video EEG, dynamic EEG, sleep EEG, EMG, evoked potential, nerve conduction velocity), neuroimmunology, neurobiochemistry, neuropathology, antiepileptic drug concentration detection, gene detection, cerebrospinal fluid cytology, etc. The diagnosis provides a good technical platform. Each year, more than 200 cases of intracranial aneurysm coil embolization; more than 30 cases of internal carotid artery stent implantation; more than 20 cases of arterial thrombectomy and stent implantation;',
    true, '9');

UPSERT
INTO hospital.medical_dept("id","name","outpatient","description","recommended", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sequence,'Oncology',true,
    'The Department of Medical Oncology was established in 1964. It is one of the first batch of national key clinical specialties, cancer pain standardization demonstration ward of National Health and Family Planning Commission, tumor professional base of national clinical pharmacology institution, oncology branch of Chinese Medical Association, Chinese Society of Clinical Oncology (CSCO) and Chinese research-based It is a member of the Standing Committee of the Precision Medicine and Oncology MDT Professional Committee of the Hospital Society, and a masters and doctoral degree awarding point for oncology by the Ministry of Education. The treatments carried out by the department include preoperative neoadjuvant chemotherapy, transformation chemotherapy, postoperative adjuvant chemotherapy, palliative chemotherapy, radical chemotherapy, targeted therapy and immunotherapy, etc., and participated in dozens of international and domestic multi-center clinical trials. There are 8 subspecialties and related MDT teams in lung cancer, gastrointestinal tumors, breast cancer, lymphoma, genitourinary system tumors, bone and skin soft tissue sarcoma, gastroenteropancreatic neuroendocrine tumors and malignant melanoma, focusing on MDT guidance Multi-gene testing is carried out based on tissue or blood samples to obtain relevant information on target genes, gene polymorphisms and pathway genes, and implement standardized and individualized comprehensive treatment; the treatment and academic level have reached the domestic advanced level.',
    true, '10');

UPSERT
INTO hospital.medical_dept("id","name","outpatient","description","recommended", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sequence,'Obstetrics',true,
    'There are more than 50 professional medical staff in the obstetrics department, including 11 with senior professional titles, 3 master supervisors, and more than 10 masters. There are 3 general wards and 1 LDR ward with open beds, with a total of 124 beds. There are 16 warm family wards in the mother-baby rooming ward. The department has accumulated rich clinical experience in natural childbirth, colpotomy, new cesarean section, etc., has the technology and equipment to rescue critically ill obstetric patients, and has comprehensively carried out perinatal health care, prenatal screening, and birth defect monitoring , eugenics genetic counseling, maternity school, Duha nutrition guidance, parenting guidance, happy childbirth, happy childbirth, painless childbirth, newborn disease screening, newborn touching, newborn swimming, postpartum recovery and health care, post-hospital follow-up, etc. A series of holistic and humanized treatment and nursing measures, good at screening, monitoring and treatment of various high-risk pregnancies, pregnancy complications and diagnosis and treatment of pregnancy complications.',
    false, '11');

UPSERT
INTO hospital.medical_dept("id","name","outpatient","description","recommended", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sequence,'Orthopedics',true,
    'The department is set up in a standardized manner, with a reasonable layout and a professional medical team. The department maintains a leading level in the region for the diagnosis and treatment of orthopedic diseases, especially the diagnosis, treatment and rescue of difficult and critical patients. The department has imported "C" arm machines, a full set of imported arthroscopic instruments, imported traction beds, imported electric drills and grinding drills, CPM joint rehabilitation devices, fracture treatment instruments and other advanced equipment. Currently performing complex pelvic and acetabular anteroposterior surgery, cervical, thoracolumbar, and lumbar spine surgery, artificial total hip and total knee arthroplasty, knee arthroscopic synovial debridement, meniscus reconstruction, cruciate ligament reconstruction, and percutaneous vertebral body surgery Kyphoplasty (PKP), closed reduction and PFNA fixation, percutaneous plate fixation for extremity fractures, minimally invasive lumbar fusion, artificial humeral head, radial head replacement, severed limb (finger) replantation, lateral spine Posterior orthopedic reduction, total hip revision, etc.',
    false, '12');

UPSERT
INTO hospital.medical_dept("id","name","outpatient","description","recommended", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sequence,'Hematology',true,
    'After 30 to 40 years of hard work by several generations, the Department of Hematology has developed into a key specialty in Beijing that integrates medical treatment, teaching, and scientific research. The Department of Hematology focuses on the comprehensive diagnosis and treatment of head and neck lymphoma, especially nasal extranodal NK/T cell lymphoma, ocular adnexal lymphoma, primary intraocular lymphoma, and other types of hematopoiesis that tend to occur in the head and neck Systemic tumors, while covering various hematological problems faced by patients in other specialties, such as anemia, thrombocytopenia, coagulation disorders, etc. According to statistics, the hematology department diagnoses nearly 100 patients with NK/T cell lymphoma and more than 200 patients with other types of lymphoma each year.',
    false, '13');

-- 科室门诊表 --------------------------------------------------
DROP TABLE IF EXISTS hospital.medical_dept_sub;
CREATE TABLE hospital.medical_dept_sub(
  "id" INTEGER NOT NULL PRIMARY KEY ,
  "uuid" VARCHAR(32),
  "name" VARCHAR(255),
  "dept_id" INTEGER,
  "location" VARCHAR(255)
);

DROP SEQUENCE IF EXISTS hospital.medical_dept_sub_sequence;
CREATE SEQUENCE hospital.medical_dept_sub_sequence START WITH 1 increment BY 1;
CREATE INDEX medical_dept_sub_idx_1 ON hospital.medical_dept_sub ("dept_id");

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Oral and Maxillofacial Surgery',1,'Area A, 2nd Floor, Building 1', '1');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Oral and Maxillofacial Medicine',1,'Area B, Floor 2, Building 1', '2');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Eye Clinic',2,'Area A, 3rd Floor, Building 1', '3');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Cataract Clinic',2,'Area B, 3rd Floor, Building 1', '4');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Refractive Center Clinic',2,'Area C, Floor 3, Building 1', '5');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Eye Laser Clinic',2,'Area D, 3rd Floor, Building 1', '6');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'ENT Clinic',3,'Area E, 3rd Floor, Building 1', '7');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Endocrinology Clinic',4,'Area A, 4th Floor, Building 1', '8');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Respiratory Medicine Clinic',4,'Area B, 4th Floor, Building 1', '9');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Cardiovascular Clinic',4,'Area C, 4th Floor, Building 1', '10');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Gastroenterology Clinic',4,'Area D, 4th Floor, Building 1', '11');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Diabetes Clinic',4,'Area A, 5th Floor, Building 1', '12');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Nephrology Clinic',4,'Area B, 5th Floor, Building 1', '13');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Rheumatology Immunology Clinic',4,'Area C, 5th Floor, Building 1', '14');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'General Surgery Clinic',5,'Area D, 5th Floor, Building 1', '15');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Thoracic Surgery Clinic',5,'Area E, 5th Floor, Building 1', '16');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Urology Clinic',5,'Area A, 6th Floor, Building 1', '17');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Cardiac Surgery Clinic',5,'Area B, 5th Floor, Building 1', '18');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Plastic Surgery Clinic',5,'Area C, 5th Floor, Building 1', '19');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Dermatology Clinic',6,'Area D, 5th Floor, Building 1', '20');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Gynecology clinic',7,'Area A, 6th Floor, Building 1', '21');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Infertility Clinic',7,'Area B, 6th Floor, Building 1', '22');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Pediatric clinic',8,'Area C, Floor 6, Building 1', '23');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Neurology Clinic',9,'Area A, 7th Floor, Building 1', '24');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Neurosurgery Clinic',9,'Area B, 7th Floor, Building 1', '25');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Oncology Clinic',10,'Area A, 2nd Floor, Building 2', '26');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Obstetrics Clinic',11,'Area A, 3rd Floor, Building 2', '27');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Orthopedic Clinic',12,'Area A, 4th Floor, Building 2', '28');

UPSERT INTO hospital.medical_dept_sub("id","name","dept_id","location", "uuid")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_sequence,'Hematology Clinic',13,'Area A, 2nd Floor, Building 2', '29');

-- 医生表 --------------------------------------------------
DROP TABLE IF EXISTS hospital.doctor;
CREATE TABLE hospital.doctor
(
    "id"          INTEGER NOT NULL PRIMARY KEY,
    "name"        VARCHAR(255),
    "pid"         CHAR(18),
    "uuid"        VARCHAR(32),
    "sex"         VARCHAR(10),
    "photo"       VARCHAR,
    "birthday"    DATE,
    "school"      VARCHAR(255),
    "degree"      VARCHAR(255),
    "tel"         CHAR(11),
    "address"     VARCHAR(255),
    "email"       VARCHAR(255),
    "job"         VARCHAR(255),
    "remark"      VARCHAR(255),
    "description" VARCHAR,
    "hiredate"    DATE,
    "tag"         VARCHAR,
    "recommended" BOOLEAN,
    -- 1在职，2离职，3退休，4隐藏（逻辑删除）
    "status" TINYINT,
    "create_time" DATE
);

DROP SEQUENCE IF EXISTS hospital.doctor_sequence;
CREATE SEQUENCE hospital.doctor_sequence START WITH 1 increment BY 1;
CREATE INDEX doctor_idx_1 ON hospital.doctor ("pid");
CREATE INDEX doctor_idx_2 ON hospital.doctor ("uuid");

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest1', '360201198609151112','2F0EB81AF9094277A958A41B59139DE1', 'female', '/doctor/doctor-1.jpg',
             '1968-05-03', 'Medical University', 'phd', '13593812535', '381 Church Street Markham, ON L3P 7P3','chengchunmei@hospital.com', 'director', 'university master mentor',
             'Good at diagnosis and treatment: Cardiovascular surgery, including valve replacement for rheumatic heart disease, congenital heart disease, surgical treatment of great vessel disease. It is characterized by coronary artery surgery. Since 1990, it has performed nearly 1,000 cases of coronary artery bypass surgery inside and outside the hospital. It introduced the worlds latest bypass technology, coronary artery bypass surgery under off-pump coronary artery, and achieved good results.',
             '2004-02-15', '["41yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest2', '460201197611302855','F1FDE764A9BB405596895722F1CCDB06', 'male', '/doctor/doctor-2.jpg',
             '1959-05-03', 'Medical University', 'phd', '15179382777', '381 Church Street Markham, ON L3P 7P3', 'qinxinyuan@hospital.com', 'director', 'university master mentor',
             'Good at diagnosis and treatment: minimally invasive treatment of varicose veins of lower extremities, comprehensive treatment of varicose veins of lower extremities with a variety of minimally invasive methods, including laser treatment of great saphenous vein, intracavitary radiofrequency treatment, Trivex light transmission rotary cutting, foam sclerosing agent injection treatment, treatment of different varicose veins Features Choose a targeted minimally invasive method, with less trauma and faster recovery.',
             '2004-12-11', '["46yrs","specialist","quick response"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest3','370101197707304145', '2AE43F717E444031BC0CBB5878932B07', 'male', '/doctor/doctor-3.jpg',
             '1976-11-28', 'Medical University', 'phd', '18658678090', '381 Church Street Markham, ON L3P 7P3', 'xiongjiayu@hospital.com', 'director', 'university master mentor',
             'Good at diagnosis and treatment: diagnosis and treatment of chronic cough, wheezing/dyspnea diseases such as bronchial asthma, chronic obstructive pulmonary disease, diffuse lung disease, lung tumors, respiratory difficulties and critical diseases, and pleural diseases. Main clinical research directions: basic and clinical aspects of chronic airway inflammatory diseases and interventional diagnosis and treatment of lung diseases.',
             '2005-08-04', '["27yrs","specialist","quick response"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest4','370101197707304145', '50595ADEF85C4B35A114A462B0FA0CDA', 'male', '/doctor/doctor-4.jpg',
             '1977-06-14', 'Medical University', 'phd', '14580412494', '381 Church Street Markham, ON L3P 7P3', 'mengmingyuan@hospital.com', 'director', 'university master mentor',
             'Good at diagnosis and treatment: facial nerve repair and facial plastic reconstruction. Early in the country, he performed masseter nerve anastomosis, reconstruction of multiple facial nerves, free gracilis muscle transplantation and other facial paralysis treatment operations, filling multiple technical gaps in the field of facial paralysis treatment. He has accumulated rich experience in the fields of facial plastic reconstruction, microsurgical tissue flap transplantation and repair.',
             '2005-08-04', '["27yrs","specialist","quick response"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest5','520201198509071764', 'B762C0BF9F994D23B5695EA78AE3F4F7', 'female', '/doctor/doctor-5.jpg',
             '1978-12-31', 'Medical University', 'phd', '15597529530', '381 Church Street Markham, ON L3P 7P3','fangjiayi@hospital.com',
             'director', 'university master mentor',
             'Good at diagnosis and treatment: urinary system tumors, especially kidney tumors, adrenal gland tumors, urothelial tumors (renal pelvis, ureter, bladder tumors) and minimally invasive treatment of prostate malignant tumors, benign bladder and prostate diseases, sacral nerve regulation, etc.',
             '2005-08-04', '["24yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest6','500101200212123472', '9718C444BE3646818DD264FB26EC8181', 'male', '/doctor/doctor-6.jpg',
             '1974-01-07', 'Medical University', 'phd', '17723959830', '381 Church Street Markham, ON L3P 7P3','huangtao@hospital.com',
             'director', 'university master mentor',
             'Good at diagnosis and treatment: Radiation therapy for common clinical malignant tumors: 1. Breast cancer 2. Digestive system malignant tumors such as esophageal cancer and rectal cancer 3. Head and neck malignant tumors 4. Lung cancer 5. Gynecological tumors. Clinical research direction: individualized radiotherapy for breast cancer, prevention of normal tissue damage after radiotherapy.',
             '2005-08-04', '["26yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest7','620101197707093458', '126A2D95DF2E42E4BD093FB9299623FB', 'female', '/doctor/doctor-7.jpg',
             '1977-04-04', 'Medical University', 'phd', '18362319314', '381 Church Street Markham, ON L3P 7P3','wumengmeng@hospital.com',
             'director', 'university master mentor',
             'Good at diagnosis and treatment: clinical diagnosis and treatment of glaucoma and cataract. He has unique insights into the diagnosis of various types of glaucoma and the treatment of difficult and miscellaneous diseases, especially in-depth research on the diagnosis, laser, drug and surgical treatment of glaucoma. Pay attention to the early detection and early treatment of glaucoma, and conduct in-depth research on the individualized treatment of glaucoma patients',
             '2005-08-04', '["26yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest8','130201200402256643', 'A1F9664A527F4DCBA48ADF312AFBC421', 'female', '/doctor/doctor-8.jpg',
             '1972-07-28', 'Medical University', 'phd', '18576200235', '381 Church Street Markham, ON L3P 7P3','tianfang@hospital.com',
             'director', 'university master mentor',
             'Good at diagnosis and treatment: surgery and comprehensive treatment of head and neck tumors (thyroid cancer, laryngeal and hypopharyngeal cancer, salivary gland tumors, nasal cavity and sinus benign and malignant tumors, tongue cancer, parapharyngeal skull base tumors). He has rich clinical experience in endoscopic sinus surgery, endolaryngosurgery and acoustic microsurgery, ear microsurgery, snoring surgery and comprehensive treatment.',
             '2005-08-04', '["31yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest9','420101199510078280', '3D3F7F2204204E30AD2F23C28A569B9A', 'male', '/doctor/doctor-9.jpg',
             '1977-02-14', 'Medical University', 'phd', '13822560280', '381 Church Street Markham, ON L3P 7P3','majie@hospital.com',
             'director', 'university master mentor',
             'Good at diagnosis and treatment: specialized in skin pathology, good at common skin diseases such as: eczema, drug eruption, urticaria, psoriasis, lichen planus, etc.; pigmented skin diseases such as: various pigmented spots, moles, vitiligo, etc.; infected skin Diseases and sexually transmitted diseases (syphilis, gonorrhea, genital warts, nongonococcal urethritis), etc.',
             '2005-08-04', '["22yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest10','510101198806215034', 'CD2C65C455564181ADFF84BD6A2F35C7', 'female', '/doctor/doctor-10.jpg',
             '1978-06-22', 'Medical University', 'master', '19738130796', '381 Church Street Markham, ON L3P 7P3','dujiayu@hospital.com',
             'specialist', 'university master mentor',
             'He is good at diagnosis and treatment: applying complementary methods of traditional Chinese and Western medicine to treat diabetes and its complications (diabetic cardiovascular and cerebrovascular disease, diabetic nephropathy, diabetic gastroparesis, diabetic peripheral neuropathy, factors of difficult control of blood sugar) and metabolic syndrome.',
             '2005-08-04', '["17yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest11','530201199301048406', 'FFBA296720C8495785E8A78B379C9B05', 'male', '/doctor/doctor-11.jpg',
             '1975-11-11', 'Medical University', 'phd', '13777571218', '381 Church Street Markham, ON L3P 7P3','dengguodong@hospital.com',
             'vice-director', 'university master mentor',
             'Good at diagnosis and treatment: systemic lupus erythematosus, polymyositis, dermatomyositis, rheumatoid arthritis, gout, ankylosing spondylitis, systemic vasculitis and other rheumatic immune diseases, and has rich experience in diagnosis and treatment of difficult and complicated critical rheumatic immune diseases. The clinical research direction is polymyositis and dermatomyositis, systemic lupus erythematosus, gout, rheumatic immune diseases, cardiovascular system involvement, etc.',
             '2005-08-04', '["19yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest12','120201198705219290', '0255BFF8CCC1479C898E21D1D3B0A8E7', 'male', '/doctor/doctor-12.jpg',
             '1978-12-16', 'Medical University', 'master', '13069020752', '381 Church Street Markham, ON L3P 7P3','longzeyuan@hospital.com',
             'vice-specialist', 'university master mentor',
             'Good at diagnosis and treatment: polymyositis, dermatomyositis, systemic lupus erythematosus, rheumatoid arthritis and other rheumatoid immune diseases. In-depth research on myositis with interstitial lung disease.',
             '2005-08-04', '["15yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest13','650201198402246623', '0370428B5452441C9F64658F2B7BC7F1', 'female', '/doctor/doctor-13.jpg',
             '1970-12-16', 'Medical University', 'phd', '15977965686', '381 Church Street Markham, ON L3P 7P3','songxiuying@hospital.com',
             'specialist', 'university master mentor',
             'Good at diagnosis and treatment: engaged in clinical diagnosis and treatment of rheumatic immune diseases for more than 20 yrs, has rich clinical experience, and has a high level of diagnosis and treatment of severe rheumatic diseases, difficult diseases and long-term fever cases of unknown cause.',
             '2005-08-04', '["28yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest14','450201198007308399', '6BD7AB9AE6AD417A90042FF3536ECC6C', 'male', '/doctor/doctor-14.jpg',
             '1971-01-07', 'Medical University', 'phd', '15589198858', '381 Church Street Markham, ON L3P 7P3','xuerongrun@hospital.com',
             'specialist', 'university master mentor',
             'Good at diagnosis and treatment: minimally invasive treatment of kidney stones, ureteral calculi, and bladder stones by percutaneous nephroscopy and ureteroscopy; minimally invasive treatment of adrenal gland, kidney, ureter, bladder tumors and diseases; minimally invasive treatment of renal pelvic ureteral stricture, ureteral stricture and urethral stricture ; Diagnosis and treatment of benign prostatic hyperplasia and prostate tumors.',
             '2005-08-04', '["26yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest15','610201197909271420', '6B4A32C097BA44F1B052B6F85C2D3E7B', 'male', '/doctor/doctor-15.jpg',
             '1968-01-07', 'Medical University', 'phd', '13923984769', '381 Church Street Markham, ON L3P 7P3','tanshang@hospital.com',
             'specialist', 'university master mentor',
             'Good at diagnosis and treatment: proficient in the diagnosis and treatment of various diseases in thoracic surgery, especially radical surgery for lung cancer, radical surgery for esophageal cancer, radical surgery and comprehensive treatment for mediastinal tumors and chest wall malignant tumors. Bronchoscopy and mediastinoscopy inspection and treatment, thoracoscopic minimally invasive surgical treatment and currently carry out thoracoscopic radical resection of lung cancer.',
             '2005-08-04', '["36yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest16','420201198903179411', '43E06B95BD364ACD890C73D91D9881BF', 'male', '/doctor/doctor-16.jpg',
             '1972-03-17', 'Medical University', 'phd', '18068672244', '381 Church Street Markham, ON L3P 7P3','renzhenguo@hospital.com',
             'specialist', 'university master mentor',
             'Good at diagnosis and treatment: adult orthodontics, invisible orthodontics, periodontal orthodontics, multidisciplinary treatment, early orthodontic treatment of childrens malocclusion, comprehensive treatment of skeletal malocclusion.',
             '2005-08-04', '["29yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest17','220101200306063805', 'DDAF4F5F849B4D2AB6DB8CA442794A5C', 'male', '/doctor/doctor-17.jpg',
             '1973-05-08', 'Medical University', 'phd', '17267270501', '381 Church Street Markham, ON L3P 7P3','xujingqi@hospital.com',
             'specialist', 'university master mentor',
             'Good at diagnosis and treatment: good at diagnosis and systematic treatment of caries, pulp disease and periapical disease; periodontal disease and alveolar surgery; aesthetic restoration of teeth.',
             '2005-08-04', '["26yrs","specialist","kind and warm"]', true,1,NOW());

UPSERT
INTO hospital.doctor( "id", "name","pid" ,"uuid", "sex", "photo", "birthday", "school", "degree", "tel", "address", "email", "job", "remark", "description", "hiredate", "tag","recommended","status", "create_time")
VALUES (NEXT VALUE FOR hospital.doctor_sequence, 'roytest18','630201198312155601', '6B946B8B0C4A42DA8DE05E62A6CDE8E6', 'male', '/doctor/doctor-18.jpg',
             '1974-12-24', 'Medical University', 'phd', '13773287399', '381 Church Street Markham, ON L3P 7P3','lvchenglong@hospital.com',
             'specialist', 'university master mentor',
             'Good at diagnosis and treatment: diagnosis and treatment of common and frequently-occurring diseases in the Department of Stomatology, including the comprehensive design and treatment of diseases related to endodontics, periodontal disease, alveolar surgery and oral restoration.',
             '2005-08-04', '["25yrs","specialist","kind and warm"]', true,1,NOW());

-- 医生挂号费表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.doctor_price;
CREATE TABLE hospital.doctor_price
(
    "id"        INTEGER NOT NULL PRIMARY KEY,
    "uuid"      VARCHAR(32),
    "doctor_id" INTEGER,
    "level"     VARCHAR(20),
    "price_1"   DECIMAL(10,2),
    "price_2"   DECIMAL(10,2)
);

DROP SEQUENCE IF EXISTS hospital.doctor_price_sequence;
CREATE SEQUENCE hospital.doctor_price_sequence START WITH 1 increment BY 1;
CREATE INDEX doctor_price_idx_1 ON hospital.doctor_price ("doctor_id");
CREATE INDEX doctor_price_idx_2 ON hospital.doctor_price ("level");

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 1, 'director',80,200, '1');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 2, 'director',80,200, '2');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 3, 'director',80,200, '3');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 4, 'director',80,200, '4');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 5, 'director',80,200, '5');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 6, 'director',80,200, '6');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 7, 'director',80,200, '7');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 8, 'director',80,200, '8');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 9, 'director',80,200, '9');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 10, 'regular',50,200, '10');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 11, 'vice-director',60,200, '11');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 12, 'vice-director',60,150, '12');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 13, 'regular',50,100, '13');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 14, 'regular',50,100, '14');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 15, 'regular',50,100, '15');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 16, 'regular',50,100, '16');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 17, 'regular',50,100, '17');

UPSERT INTO hospital.doctor_price("id","doctor_id","level","price_1","price_2", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_price_sequence, 18, 'regular',50,100, '18');

-- 门诊与医生交叉表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.medical_dept_sub_and_doctor;
CREATE TABLE hospital.medical_dept_sub_and_doctor
(
    "id"        INTEGER PRIMARY KEY,
    "dept_sub_id"   INTEGER,
    "doctor_id" INTEGER
);

DROP SEQUENCE IF EXISTS hospital.medical_dept_sub_and_doctor_sequence;
CREATE SEQUENCE hospital.medical_dept_sub_and_doctor_sequence START WITH 1 increment BY 1;
CREATE INDEX medical_dept_sub_and_doctor_idx_1 ON hospital.medical_dept_sub_and_doctor ("dept_sub_id");
CREATE INDEX medical_dept_sub_and_doctor_idx_2 ON hospital.medical_dept_sub_and_doctor ("doctor_id");

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,18,1);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,20,2);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,9,3);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,19,4);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,26,5);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,26,6);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,4,7);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,26,8);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,20,9);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,12,10);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,14,11);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,14,12);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,14,13);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,13,14);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,26,15);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,2,16);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,2,17);

UPSERT INTO hospital.medical_dept_sub_and_doctor("id","dept_sub_id","doctor_id")
VALUES(NEXT VALUE FOR hospital.medical_dept_sub_and_doctor_sequence,2,18);

-- 医生出诊表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.doctor_work_plan;
CREATE TABLE hospital.doctor_work_plan(
    "id" INTEGER NOT NULL PRIMARY KEY ,
    "uuid"      VARCHAR(32),
    "doctor_id" INTEGER,
    "dept_sub_id" INTEGER,
    "date" DATE,
--     当天挂号上限人数
    "maximum" SMALLINT,
--     实际挂号人数
    "num" SMALLINT
);

DROP SEQUENCE IF EXISTS hospital.doctor_work_plan_sequence;
CREATE SEQUENCE hospital.doctor_work_plan_sequence START WITH 1 increment BY 1;
CREATE INDEX doctor_work_plan_idx_1 ON hospital.doctor_work_plan ("doctor_id");
CREATE INDEX doctor_work_plan_idx_2 ON hospital.doctor_work_plan ("dept_sub_id");
CREATE INDEX doctor_work_plan_idx_3 ON hospital.doctor_work_plan ("date");

UPSERT INTO hospital.doctor_work_plan("id","doctor_id","dept_sub_id","date","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_sequence,16,2,TO_DATE('2022-09-23'),45,0, '1');

UPSERT INTO hospital.doctor_work_plan("id","doctor_id","dept_sub_id","date","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_sequence,17,2,TO_DATE('2022-09-23'),45,0, '2');

UPSERT INTO hospital.doctor_work_plan("id","doctor_id","dept_sub_id","date","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_sequence,18,2,TO_DATE('2022-09-23'),45,0, '3');

UPSERT INTO hospital.doctor_work_plan("id","doctor_id","dept_sub_id","date","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_sequence,16,2,TO_DATE('2022-09-24'),45,0, '4');

UPSERT INTO hospital.doctor_work_plan("id","doctor_id","dept_sub_id","date","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_sequence,16,2,TO_DATE('2022-09-25'),45,0, '5');

UPSERT INTO hospital.doctor_work_plan("id","doctor_id","dept_sub_id","date","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_sequence,16,2,TO_DATE('2022-09-26'),45,0, '6');

UPSERT INTO hospital.doctor_work_plan("id","doctor_id","dept_sub_id","date","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_sequence,1,18,TO_DATE('2022-09-23'),45,0, '7');

UPSERT INTO hospital.doctor_work_plan("id","doctor_id","dept_sub_id","date","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_sequence,2,20,TO_DATE('2022-09-23'),45,0, '8');

UPSERT INTO hospital.doctor_work_plan("id","doctor_id","dept_sub_id","date","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_sequence,9,20,TO_DATE('2022-09-23'),45,0, '9');

UPSERT INTO hospital.doctor_work_plan("id","doctor_id","dept_sub_id","date","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_sequence,9,20,TO_DATE('2022-09-24'),45,0, '10');

UPSERT INTO hospital.doctor_work_plan("id","doctor_id","dept_sub_id","date","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_sequence,9,20,TO_DATE('2022-09-25'),45,0, '11');

-- 医生出诊时间段表-----------------------------------------------
DROP TABLE IF EXISTS hospital.doctor_work_plan_schedule;
CREATE TABLE hospital.doctor_work_plan_schedule(
    "id" INTEGER NOT NULL PRIMARY KEY ,
    "uuid"      VARCHAR(32),
    "work_plan_id" INTEGER,
    "slot" TINYINT,
    "maximum" SMALLINT,
    "num" SMALLINT
);

DROP SEQUENCE IF EXISTS hospital.doctor_work_plan_schedule_sequence;
CREATE SEQUENCE hospital.doctor_work_plan_schedule_sequence START WITH 1 increment BY 1;

CREATE INDEX doctor_work_plan_schedule_idx_1 ON hospital.doctor_work_plan_schedule ("work_plan_id");

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,1,3,0, '1');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,2,3,0, '2');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,3,3,0, '3');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,4,3,0, '4');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,5,3,0, '5');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,6,3,0, '6');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,7,3,0, '7');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,8,3,0, '8');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,9,3,0, '9');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,10,3,0, '10');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,11,3,0, '11');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,12,3,0, '12');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,13,3,0, '13');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,14,3,0, '14');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,1,15,3,0, '15');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,2,1,3,0, '16');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,2,2,3,0, '17');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,2,4,3,0, '18');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,2,8,3,0, '19');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,5,1,3,0, '20');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,6,1,3,0, '21');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,3,8,3,0, '22');

UPSERT INTO hospital.doctor_work_plan_schedule("id","work_plan_id","slot","maximum","num", "uuid")
VALUES(NEXT VALUE FOR hospital.doctor_work_plan_schedule_sequence,3,1,3,0, '23');


-- 挂号表-----------------------------------------------
DROP TABLE IF EXISTS hospital.medical_registration;
CREATE TABLE hospital.medical_registration(
    "id" INTEGER NOT NULL PRIMARY KEY ,
    "uuid"      VARCHAR(32),
    "patient_card_id" INTEGER,
    "work_plan_id" INTEGER,
    "doctor_schedule_id" INTEGER,
    "doctor_id" INTEGER,
    "dept_sub_id" INTEGER,
    "date" DATE,
    "slot" TINYINT,
    "amount" DECIMAL(10,2),
    "out_trade_no" CHAR(32),
    "prepay_id" CHAR(64),
    "transaction_id" CHAR(32),
    -- 付款状态: 1.未付款，2.已付款，3.已退款，4.已过期
    "payment_status" TINYINT,
    "create_time" DATE
);

DROP SEQUENCE IF EXISTS hospital.medical_registration_sequence;
CREATE SEQUENCE hospital.medical_registration_sequence START WITH 1 increment BY 1;

CREATE INDEX medical_registration_idx_1 ON hospital.medical_registration ("patient_card_id");
CREATE INDEX medical_registration_idx_2 ON hospital.medical_registration ("work_plan_id");
CREATE INDEX medical_registration_idx_3 ON hospital.medical_registration ("doctor_schedule_id");
CREATE INDEX medical_registration_idx_4 ON hospital.medical_registration ("doctor_id");
CREATE INDEX medical_registration_idx_5 ON hospital.medical_registration ("dept_sub_id");
CREATE INDEX medical_registration_idx_6 ON hospital.medical_registration ("date");
CREATE INDEX medical_registration_idx_7 ON hospital.medical_registration ("out_trade_no");
CREATE INDEX medical_registration_idx_8 ON hospital.medical_registration ("prepay_id");
CREATE INDEX medical_registration_idx_9 ON hospital.medical_registration ("transaction_id");
CREATE INDEX medical_registration_idx_10 ON hospital.medical_registration ("payment_status");


-- 处方表-----------------------------------------------
DROP TABLE IF EXISTS hospital.doctor_prescription;
CREATE TABLE hospital.doctor_prescription(
     "id" INTEGER NOT NULL PRIMARY KEY,
     "uuid" VARCHAR(32),
     "patient_card_id" INTEGER,
     -- 诊断结果
     "diagnosis" VARCHAR,
     "sub_dept_id" INTEGER,
     "doctor_id" INTEGER,
     "registration_id" INTEGER,
     --处方
     "rp" VARCHAR
);

DROP SEQUENCE IF EXISTS hospital.doctor_prescription_sequence;
CREATE SEQUENCE hospital.doctor_prescription_sequence START WITH 1 increment BY 1;

CREATE INDEX doctor_prescription_idx_1 ON hospital.doctor_prescription ("uuid");
CREATE INDEX doctor_prescription_idx_2 ON hospital.doctor_prescription ("patient_card_id");
CREATE INDEX doctor_prescription_idx_3 ON hospital.doctor_prescription ("sub_dept_id");
CREATE INDEX doctor_prescription_idx_4 ON hospital.doctor_prescription ("doctor_id");
CREATE INDEX doctor_prescription_idx_5 ON hospital.doctor_prescription ("registration_id");

-- 医生视频咨询表-----------------------------------------------
DROP TABLE IF EXISTS hospital.doctor_consult;
CREATE TABLE hospital.doctor_consult(
    "id" INTEGER NOT NULL PRIMARY KEY,
    "uuid"      VARCHAR(32),
    "patient_card_id" INTEGER,
    "sub_dept_id" INTEGER,
    "doctor_id" INTEGER,
    "start_time" DATE,
    "end_time" DATE,
    "out_trade_no" CHAR(32),
    "amount" DECIMAL(10,2),
    "prepay_id" CHAR(64),
    "transaction_id" CHAR(32),
--     1.未付款，2.已付款，3.已退款，4.已过期
    "payment_status" TINYINT,
--     1.未开始，2.进行中，3.已结束，4.已关闭
    "status" TINYINT,
    "files" VARCHAR,
    "create_time" DATE
);

DROP SEQUENCE IF EXISTS hospital.doctor_consult_sequence;
CREATE SEQUENCE hospital.doctor_consult_sequence START WITH 1 increment BY 1;

CREATE INDEX doctor_consult_idx_1 ON hospital.doctor_consult ("patient_card_id");
CREATE INDEX doctor_consult_idx_2 ON hospital.doctor_consult ("sub_dept_id");
CREATE INDEX doctor_consult_idx_3 ON hospital.doctor_consult ("doctor_id");
CREATE INDEX doctor_consult_idx_4 ON hospital.doctor_consult ("out_trade_no");
CREATE INDEX doctor_consult_idx_5 ON hospital.doctor_consult ("prepay_id");
CREATE INDEX doctor_consult_idx_6 ON hospital.doctor_consult ("transaction_id");
CREATE INDEX doctor_consult_idx_7 ON hospital.doctor_consult ("status");
CREATE INDEX doctor_consult_idx_8 ON hospital.doctor_consult ("create_time");


-- MIS端行为表 -----------------------------------------------

DROP TABLE IF EXISTS hospital.mis_action;

CREATE TABLE hospital.mis_action
(
    "id"          INTEGER NOT NULL PRIMARY KEY,
    "action_code" VARCHAR,
    "action_name" VARCHAR
);

DROP SEQUENCE IF EXISTS hospital.mis_action_sequence;
CREATE SEQUENCE hospital.mis_action_sequence START WITH 1 increment BY 1;

UPSERT
INTO hospital.mis_action("id","action_code","action_name")
VALUES(NEXT VALUE FOR hospital.mis_action_sequence,'INSERT','INSERT');

UPSERT
INTO hospital.mis_action("id","action_code","action_name")
VALUES(NEXT VALUE FOR hospital.mis_action_sequence,'DELETE','DELETE');

UPSERT
INTO hospital.mis_action("id","action_code","action_name")
VALUES(NEXT VALUE FOR hospital.mis_action_sequence,'UPDATE','UPDATE');

UPSERT
INTO hospital.mis_action("id","action_code","action_name")
VALUES(NEXT VALUE FOR hospital.mis_action_sequence,'SELECT','SELECT');

UPSERT
INTO hospital.mis_action("id","action_code","action_name")
VALUES(NEXT VALUE FOR hospital.mis_action_sequence,'APPROVAL','APPROVAL');

UPSERT
INTO hospital.mis_action("id","action_code","action_name")
VALUES(NEXT VALUE FOR hospital.mis_action_sequence,'EXPORT','EXPORT');

UPSERT
INTO hospital.mis_action("id","action_code","action_name")
VALUES(NEXT VALUE FOR hospital.mis_action_sequence,'BACKUP','BACKUP');

UPSERT
INTO hospital.mis_action("id","action_code","action_name")
VALUES(NEXT VALUE FOR hospital.mis_action_sequence,'ARCHIVE','ARCHIVE');


-- MIS端模块表 -----------------------------------------------

DROP TABLE IF EXISTS hospital.mis_module;

CREATE TABLE hospital.mis_module
(
    "id"          SMALLINT NOT NULL PRIMARY KEY,
    "module_code" VARCHAR,
    "module_name" VARCHAR
);


UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(1,'MIS_USER','MIS_USER');

UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(2,'PATIENT_USER','PATIENT_USER');


UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(3,'WORKER_USER','WORKER_USER');

UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(4,'DEPT','DEPT');

UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(5,'MEDICAL_DEPT','MEDICAL_DEPT');

UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(6,'MEDICAL_DEPT_SUB','MEDICAL_DEPT_SUB');

UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(7,'SCHEDULE','SCHEDULE');

UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(8,'REGISTRATION','REGISTRATION');

UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(9,'VIDEO_DIAGNOSE','VIDEO_DIAGNOSE');

UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(10,'DOCTOR','DOCTOR');

UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(11,'NURSE','NURSE');

UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(12,'NURSING_ASSISTANT','NURSING_ASSISTANT');

UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(13,'DOCTOR_PRICE','DOCTOR_PRICE');

UPSERT INTO hospital.mis_module("id","module_code","module_name")
VALUES(14,'SYSTEM','SYSTEM');

-- MIS端行为表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.mis_action;

CREATE TABLE hospital.mis_action
(
    "id"          SMALLINT NOT NULL PRIMARY KEY,
    "action_code" VARCHAR,
    "action_name" VARCHAR
);

UPSERT INTO hospital.mis_action("id","action_code","action_name")
VALUES(1,'INSERT','INSERT');

UPSERT INTO hospital.mis_action("id","action_code","action_name")
VALUES(2,'DELETE','DELETE');

UPSERT INTO hospital.mis_action("id","action_code","action_name")
VALUES(3,'UPDATE','UPDATE');

UPSERT INTO hospital.mis_action("id","action_code","action_name")
VALUES(4,'SELECT','SELECT');

UPSERT INTO hospital.mis_action("id","action_code","action_name")
VALUES(5,'APPROVAL','APPROVAL');

UPSERT INTO hospital.mis_action("id","action_code","action_name")
VALUES(6,'IMPORT','IMPORT');

UPSERT INTO hospital.mis_action("id","action_code","action_name")
VALUES(7,'EXPORT','EXPORT');

UPSERT INTO hospital.mis_action("id","action_code","action_name")
VALUES(8,'BACKUP','BACKUP');

UPSERT INTO hospital.mis_action("id","action_code","action_name")
VALUES(9,'ARCHIVE','ARCHIVE');

UPSERT INTO hospital.mis_action("id","action_code","action_name")
VALUES(10,'DIAGNOSE','DIAGNOSE');

-- MIS端权限表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.mis_permission;

CREATE TABLE hospital.mis_permission
(
    "id"                SMALLINT NOT NULL PRIMARY KEY,
    "permission_code"   VARCHAR,
    "module_id"         SMALLINT,
    "action_id"         SMALLINT
);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(0,'ROOT',0,0);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(1,'MIS_USER:INSERT',1,1);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(2,'MIS_USER:DELETE',1,2);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(3,'MIS_USER:UPDATE',1,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(4,'MIS_USER:SELECT',1,4);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(5,'PATIENT_USER:INSERT',2,1);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(6,'PATIENT_USER:DELETE',2,2);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(7,'PATIENT_USER:UPDATE',2,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(8,'PATIENT_USER:SELECT',2,4);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(9,'WORKER_USER:INSERT',3,1);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(10,'WORKER_USER:DELETE',3,2);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(11,'WORKER_USER:UPDATE',3,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(12,'WORKER_USER:SELECT',3,4);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(13,'DEPT:INSERT',4,1);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(14,'DEPT:DELETE',4,2);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(15,'DEPT:UPDATE',4,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(16,'DEPT:SELECT',4,4);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(17,'MEDICAL_DEPT:INSERT',5,1);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(18,'MEDICAL_DEPT:DELETE',5,2);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(19,'MEDICAL_DEPT:UPDATE',5,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(20,'MEDICAL_DEPT:SELECT',5,4);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(21,'MEDICAL_DEPT_SUB:INSERT',6,1);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(22,'MEDICAL_DEPT_SUB:DELETE',6,2);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(23,'MEDICAL_DEPT_SUB:UPDATE',6,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(24,'MEDICAL_DEPT_SUB:SELECT',6,4);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(25,'SCHEDULE:INSERT',7,1);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(26,'SCHEDULE:DELETE',7,2);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(27,'SCHEDULE:UPDATE',7,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(28,'SCHEDULE:SELECT',7,4);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(29,'REGISTRATION:INSERT',8,1);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(30,'REGISTRATION:DELETE',8,2);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(31,'REGISTRATION:UPDATE',8,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(32,'REGISTRATION:SELECT',8,4);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(33,'VIDEO_DIAGNOSE:INSERT',9,1);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(34,'VIDEO_DIAGNOSE:DELETE',9,2);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(35,'VIDEO_DIAGNOSE:UPDATE',9,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(36,'VIDEO_DIAGNOSE:SELECT',9,4);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(37,'VIDEO_DIAGNOSE:DIAGNOSE',9,5);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(38,'DOCTOR:INSERT',10,1);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(39,'DOCTOR:DELETE',10,2);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(40,'DOCTOR:UPDATE',10,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(41,'DOCTOR:SELECT',10,4);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(42,'NURSE:INSERT',11,1);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(43,'NURSE:DELETE',11,2);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(44,'NURSE:UPDATE',11,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(45,'NURSE:SELECT',11,4);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(46,'NURSING_ASSISTANT:INSERT',12,1);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(47,'NURSING_ASSISTANT:DELETE',12,2);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(48,'NURSING_ASSISTANT:UPDATE',12,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(49,'NURSING_ASSISTANT:SELECT',12,4);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(46,'DOCTOR_PRICE:INSERT',13,1);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(47,'DOCTOR_PRICE:DELETE',14,2);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(48,'DOCTOR_PRICE:UPDATE',15,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(49,'DOCTOR_PRICE:SELECT',16,4);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(50,'SYSTEM:UPDATE',16,3);

UPSERT INTO hospital.mis_permission("id","permission_code","module_id","action_id")
VALUES(51,'SYSTEM:SELECT',16,4);


-- MIS端角色表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.mis_role;

CREATE TABLE hospital.mis_role
(
    "id"            INTEGER NOT NULL PRIMARY KEY,
    "role_name"     VARCHAR(255),
    "remark"          VARCHAR(255)
);

DROP SEQUENCE IF EXISTS hospital.mis_role_sequence;
CREATE SEQUENCE hospital.mis_role_sequence START WITH 1 increment BY 1;

UPSERT INTO hospital.mis_role("id","role_name","remark")
VALUES(0, 'SUPER_ADMIN','SUPER_ADMIN');

UPSERT INTO hospital.mis_role("id","role_name","remark")
VALUES(NEXT VALUE FOR hospital.mis_role_sequence, 'DOCTOR','DOCTOR');

UPSERT INTO hospital.mis_role("id","role_name","remark")
VALUES(NEXT VALUE FOR hospital.mis_role_sequence, 'VIDEO_CONSULT_DOCTOR','VIDEO_CONSULT_DOCTOR');

-- MIS端角色权限表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.mis_role_permission;

CREATE TABLE hospital.mis_role_permission
(
    "id"            INTEGER NOT NULL PRIMARY KEY,
    "role_id"       INTEGER,
    "permission_id" SMALLINT
);

DROP SEQUENCE IF EXISTS hospital.mis_role_permission_sequence;
CREATE SEQUENCE hospital.mis_role_permission_sequence START WITH 1 increment BY 1;

-- 超级管理员角色拥有最高权限
UPSERT INTO hospital.mis_role_permission("id","role_id","permission_id")
VALUES(0, 0,0);

-- 医生拥有查询MIS帐户权限（仅限自己）
UPSERT INTO hospital.mis_role_permission("id","role_id","permission_id")
VALUES(NEXT VALUE FOR hospital.mis_role_permission_sequence, 1,4);

-- 医生拥有查询部门权限
UPSERT INTO hospital.mis_role_permission("id","role_id","permission_id")
VALUES(NEXT VALUE FOR hospital.mis_role_permission_sequence, 1,16);

-- 医生拥有查询科室权限
UPSERT INTO hospital.mis_role_permission("id","role_id","permission_id")
VALUES(NEXT VALUE FOR hospital.mis_role_permission_sequence, 1,20);

-- 医生拥有查询诊室权限
UPSERT INTO hospital.mis_role_permission("id","role_id","permission_id")
VALUES(NEXT VALUE FOR hospital.mis_role_permission_sequence, 1,24);

-- 医生拥有查询出诊计划权限
UPSERT INTO hospital.mis_role_permission("id","role_id","permission_id")
VALUES(NEXT VALUE FOR hospital.mis_role_permission_sequence, 1,28);

-- 医生拥有查询挂号记录权限（仅限自己的患者）
UPSERT INTO hospital.mis_role_permission("id","role_id","permission_id")
VALUES(NEXT VALUE FOR hospital.mis_role_permission_sequence, 1,32);

-- 视频问诊医生拥有查询问诊记录权限（仅限自己的患者）
UPSERT INTO hospital.mis_role_permission("id","role_id","permission_id")
VALUES(NEXT VALUE FOR hospital.mis_role_permission_sequence, 2,36);

-- 视频问诊医生拥有视频问诊权限
UPSERT INTO hospital.mis_role_permission("id","role_id","permission_id")
VALUES(NEXT VALUE FOR hospital.mis_role_permission_sequence, 2,37);

-- MIS端部门表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.mis_dept;

CREATE TABLE hospital.mis_dept
(
    "id"    INTEGER NOT NULL PRIMARY KEY,
    "name"  VARCHAR
);
DROP SEQUENCE IF EXISTS hospital.mis_dept_sequence;
CREATE SEQUENCE hospital.mis_dept_sequence START WITH 1 increment BY 1;

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'directors office');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'human resources department');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'finance department');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'security department');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'logistics department');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'engineering department');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'ministry of infrastructure');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'department of materials');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'operations');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'medical department');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'outpatient department');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'nursing department');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'ministry of research and education');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'international cooperation department');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'information center');

UPSERT INTO hospital.mis_dept("id","name")
VALUES(NEXT VALUE FOR hospital.mis_dept_sequence, 'PR department');


-- MIS端用户表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.mis_user;

CREATE TABLE hospital.mis_user
(
    "id"        INTEGER NOT NULL PRIMARY KEY,
    "uuid"      VARCHAR(32),
    "username"  VARCHAR(255),
    "password"  VARCHAR,
    "name"      VARCHAR(255),
    "sex"       VARCHAR(10),
    "tel"       VARCHAR(11),
    "email"     VARCHAR(255),
    "dept_id"   INTEGER,
    "job"       VARCHAR(255),
    "ref_id"    INTEGER,
--     1有效，2离职，3禁用
    "status"    TINYINT,
    "create_time" DATE
);

DROP SEQUENCE IF EXISTS hospital.mis_user_sequence;
CREATE SEQUENCE hospital.mis_user_sequence START WITH 1 increment BY 1;

CREATE INDEX mis_user_idx_1 ON hospital.mis_user ("username");
CREATE INDEX mis_user_idx_2 ON hospital.mis_user ("dept_id");
CREATE INDEX mis_user_idx_3 ON hospital.mis_user ("job");
CREATE INDEX mis_user_idx_4 ON hospital.mis_user ("dept_id");
CREATE INDEX mis_user_idx_5 ON hospital.mis_user ("status");

UPSERT INTO hospital.mis_user(
    "id","username","password","name","sex","tel","email","dept_id","job","status","create_time","uuid"
)
VALUES(
    0,'admin','061575f43e456772015c0032c0531edf','admin','male',NULL,NULL,NULL,NULL,1,NOW(),'123123123'
);


-- MIS端用户角色表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.mis_user_role;

CREATE TABLE hospital.mis_user_role
(
    "id"       INTEGER NOT NULL PRIMARY KEY,
    "user_id"  INTEGER,
    "role_id"  INTEGER
);

DROP SEQUENCE IF EXISTS hospital.mis_user_role_sequence;
CREATE SEQUENCE hospital.mis_user_role_sequence START WITH 1 increment BY 1;

CREATE INDEX mis_user_role_idx_1 ON hospital.mis_user_role ("user_id");
CREATE INDEX mis_user_role_idx_2 ON hospital.mis_user_role ("role_id");

-- 超级管理员MIS帐户关联超级管理员角色
UPSERT INTO hospital.mis_user_role(
    "id","user_id","role_id"
)
VALUES(0,0,0);


-- 视频问诊订单表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.video_diagnose;
CREATE TABLE hospital.video_diagnose
(
    "id"              INTEGER NOT NULL PRIMARY KEY,
    "uuid"            VARCHAR(32),
    "patient_card_id" INTEGER,
    "doctor_id"       INTEGER,
    "out_trade_no"    CHAR(32),
    "amount"          DECIMAL(10, 2),
    -- 付款状态：1.未付款，2.已付款，3.已退款，4.已过期
    "payment_status"  TINYINT,
    "prepay_id"       CHAR(64),
    "transaction_id"  CHAR(32),
    "expect_start"     DATE,
    "expect_end"       DATE,
    "real_start"       DATE,
    "real_end"         DATE,
    -- 问诊状态：1.未开始，2.问诊中，3.已结束
    "status"          TINYINT,
    "create_time"     DATE
);

DROP SEQUENCE IF EXISTS hospital.video_diagnose_sequence;
CREATE SEQUENCE hospital.video_diagnose_sequence START WITH 1 increment BY 1;

CREATE INDEX video_diagnose_idx_1 ON hospital.video_diagnose ("patient_card_id");
CREATE INDEX video_diagnose_idx_2 ON hospital.video_diagnose ("doctor_id");
CREATE INDEX video_diagnose_idx_3 ON hospital.video_diagnose ("out_trade_no");
CREATE INDEX video_diagnose_idx_4 ON hospital.video_diagnose ("payment_status");
CREATE INDEX video_diagnose_idx_5 ON hospital.video_diagnose ("prepay_id");
CREATE INDEX video_diagnose_idx_6 ON hospital.video_diagnose ("transaction_id");
CREATE INDEX video_diagnose_idx_7 ON hospital.video_diagnose ("expect_start");
CREATE INDEX video_diagnose_idx_8 ON hospital.video_diagnose ("expect_end");
CREATE INDEX video_diagnose_idx_9 ON hospital.video_diagnose ("status");

-- 视频问诊资料表 -----------------------------------------------
DROP TABLE IF EXISTS hospital.video_diagnose_file;
CREATE TABLE hospital.video_diagnose_file(
    "id" INTEGER NOT NULL PRIMARY KEY,
    "uuid"            VARCHAR(32),
    "video_diagnose_id" INTEGER,
    "filename" VARCHAR(100),
    "path" VARCHAR(300),
    "create_time" DATE
);

DROP SEQUENCE IF EXISTS hospital.video_diagnose_file_sequence;
CREATE SEQUENCE hospital.video_diagnose_file_sequence START WITH 1 increment BY 1;

CREATE INDEX video_diagnose_file_idx_1 ON hospital.video_diagnose_file ("video_diagnose_id");
CREATE INDEX video_diagnose_file_idx_2 ON hospital.video_diagnose_file ("create_time");


