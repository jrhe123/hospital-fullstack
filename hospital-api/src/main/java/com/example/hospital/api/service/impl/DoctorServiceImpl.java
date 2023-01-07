package com.example.hospital.api.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.hospital.api.common.PageUtils;
import com.example.hospital.api.db.dao.DoctorDao;
import com.example.hospital.api.db.dao.MedicalDeptSubAndDoctorDao;
import com.example.hospital.api.db.pojo.DoctorEntity;
import com.example.hospital.api.db.pojo.MedicalDeptSubAndDoctorEntity;
import com.example.hospital.api.exception.HospitalException;
import com.example.hospital.api.service.DoctorService;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.lang.UUID;
import cn.hutool.core.map.MapUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONUtil;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DoctorServiceImpl implements DoctorService {
	
	@Value("${minio.endpoint}")
	private String endpoint;
	
	@Value("${minio.access-key}")
	private String accessKey;
	
	@Value("${minio.secret-key}")
	private String secretKey;
	
	@Resource
	private DoctorDao doctorDao;
	
	@Resource
	private MedicalDeptSubAndDoctorDao medicalDeptSubAndDoctorDao;
	
	@Override
	public PageUtils searchByPage(Map param) {
		
		ArrayList<HashMap> list = null;
		long count = doctorDao.searchCount(param);
		
		if (count > 0) {
			list = doctorDao.searchByPage(param);
		} else {
			list = new ArrayList<>();
		}
		
		int page = MapUtil.getInt(param, "page");
		int length = MapUtil.getInt(param, "length");
		
		PageUtils pageUtils = new PageUtils(
				list,
				count,
				page,
				length
				);
		return pageUtils;
	}

	@Override
	public HashMap searchContent(int id) {
		
		HashMap map = doctorDao.searchContent(id);
		
		// convert tag str -> array json
		String tag = MapUtil.getStr(map, "tag");
		JSONArray tagArr = JSONUtil.parseArray(tag);
		map.replace("tag", tagArr);
		
		return map;
	}

	@Override
	@Transactional
	public String updatePhoto(MultipartFile file, Integer doctorId) {
		try {
			// 1. upload image to minio
			UUID uuid = UUID. randomUUID();
			String uuidAsString = uuid. toString();
			String filename = "doctor-" + uuidAsString + ".jpg";			
			MinioClient client = new MinioClient.Builder()
									.endpoint(endpoint)
									.credentials(accessKey, secretKey)
									.build();
			PutObjectArgs args = PutObjectArgs.builder().bucket("hospital")
									.object("doctor/" + filename)
									.stream(file.getInputStream(), -1, 5 * 1024 * 1024)
									.contentType("image/jpeg")
									.build();
			client.putObject(args);
			
			// 2. update db
			doctorDao.updatePhoto(new HashMap() {{
				put("id", doctorId);
				put("photo", "/doctor/" + filename);
			}});
			
			return "/doctor/" + filename;
			
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HospitalException(e);
		}
	}

	@Override
	public HashMap insert(Map param) {
		// 1. insert doctor
		DoctorEntity doctorEntity = BeanUtil.toBean(param, DoctorEntity.class);
		doctorDao.insert(doctorEntity);
		
		String uuid = doctorEntity.getUuid();
		Integer doctorId = doctorDao.searchIdByUuid(uuid);
		
		// 2. insert medicalDeptSubAndDoctor
		int subId = MapUtil.getInt(param, "subId");
		MedicalDeptSubAndDoctorEntity medicalDeptSubAndDoctorEntity =
				new MedicalDeptSubAndDoctorEntity();
		medicalDeptSubAndDoctorEntity.setDoctorId(doctorId);
		medicalDeptSubAndDoctorEntity.setDeptSubId(subId);
		medicalDeptSubAndDoctorDao.insert(medicalDeptSubAndDoctorEntity);
		
		// 3. response
		HashMap doctor = doctorDao.getDoctorDetailById(doctorId);
		// convert tag str -> array json
		String tag = MapUtil.getStr(doctor, "tag");
		JSONArray tagArr = JSONUtil.parseArray(tag);
		doctor.replace("tag", tagArr);
				
		return doctor;
	}

	@Override
	public HashMap getDetailById(Integer id) {
		HashMap doctor = doctorDao.getDoctorDetailById(id);
		// convert tag str -> array json
		String tag = MapUtil.getStr(doctor, "tag");
		JSONArray tagArr = JSONUtil.parseArray(tag);
		doctor.replace("tag", tagArr);
				
		return doctor;
	}

	@Override
	@Transactional
	public void update(Map param) {
		doctorDao.update(param);
		param = MapUtil.renameKey(param, "id", "doctorId");
		medicalDeptSubAndDoctorDao.updateDoctorSubDept(param);
	}

	@Override
	@Transactional
	public void deleteByIds(Integer[] ids) {
		doctorDao.deleteByIds(ids);
	}

	@Override
	public ArrayList<HashMap> searchByDeptSubId(int deptSubId) {
		ArrayList<HashMap> doctorList = doctorDao.searchByDeptSubId(deptSubId);
		return doctorList;
	}

}
