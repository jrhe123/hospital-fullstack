package com.example.hospital.patient.wx.api.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.hospital.patient.wx.api.db.dao.UserDao;
import com.example.hospital.patient.wx.api.db.dao.UserInfoCardDao;
import com.example.hospital.patient.wx.api.db.pojo.UserEntity;
import com.example.hospital.patient.wx.api.db.pojo.UserInfoCardEntity;
import com.example.hospital.patient.wx.api.exception.HospitalException;
import com.example.hospital.patient.wx.api.service.UserService;
import com.example.hospital.patient.wx.api.utils.SMSUtils;
import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.Feature;

import cn.hutool.core.lang.UUID;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.IdUtil;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;

@Service
public class UserServiceImpl implements UserService {
	
	@Value("${minio.endpoint}")
	private String endpoint;
	
	@Value("${minio.access-key}")
	private String accessKey;
	
	@Value("${minio.secret-key}")
	private String secretKey;
	
	@Resource
	private UserDao userDao;
	
	@Resource
	private UserInfoCardDao userInfoCardDao;
	
	@Resource
	private SMSUtils SMSUtils;
	
	@Resource
	private CloudVisionTemplate cloudVisionTemplate;
	
	@Resource
	private ResourceLoader resourceLoader;

	@Override
	public int loginOrRegister(String tel) {
				
		HashMap userRes = userDao.searchAlreadyRegistered(tel);

		if (userRes == null) { // register
			// add user
			UserEntity entity = new UserEntity();
			String uuid = IdUtil.simpleUUID().toUpperCase();
			entity.setUuid(uuid);
			entity.setNickname("patient");
			entity.setPhoto("");
			entity.setSex("male");
			entity.setStatus((byte)1);
			userDao.insert(entity);
			// add info card
			Integer userId = userDao.searchIdByUuid(uuid);
			UserInfoCardEntity cardEntity = new UserInfoCardEntity();
			String cuuid = IdUtil.simpleUUID().toUpperCase();
			cardEntity.setUserId(userId);
			cardEntity.setUuid(cuuid);
			cardEntity.setName("");
			cardEntity.setSex("male");
			cardEntity.setPid("");
			cardEntity.setTel(tel);
			cardEntity.setBirthday(new Date());
			cardEntity.setMedicalHistory("");
			cardEntity.setInsuranceType("");
			cardEntity.setExistFaceModel(false);
			userInfoCardDao.insert(cardEntity);
			// response
			userRes = userDao.searchById(userId);
		}
		
		int status = MapUtil.getInt(userRes, "status");
		int userId = MapUtil.getInt(userRes, "id");
		if (status != 1) {
			throw new HospitalException("User has been disabled");
		}
		
		return userId;
	}

	@Override
	public String sendCode(String tel) {
		Random rnd = new Random();
	    int number = rnd.nextInt(999999);
	    String code = String.format("%06d", number);
	    
	    System.out.println("+++++ code: " + code);
	    
	    // TODO: we use twilio here, it's hidden here
	    // SMSUtils.sendSMS(tel, code);
	    
		return code;
	}

	@Override
	@Transactional
	public void update(UserEntity entity) {
		userDao.update(entity);
	}

	@Override
	@Transactional
	public String updatePhoto(MultipartFile file, Integer userId) {
		try {
			// 1. upload image to minio
			UUID uuid = UUID. randomUUID();
			String uuidAsString = uuid. toString();
			String filename = "patient-" + uuidAsString + ".jpg";			
			MinioClient client = new MinioClient.Builder()
									.endpoint(endpoint)
									.credentials(accessKey, secretKey)
									.build();
			PutObjectArgs args = PutObjectArgs.builder().bucket("patient")
									.object("patient/" + filename)
									.stream(file.getInputStream(), -1, 5 * 1024 * 1024)
									.contentType("image/jpeg")
									.build();
			client.putObject(args);
			
			// 2. update db
			userDao.updatePhoto(new HashMap() {{
				put("id", userId);
				put("photo", "/patient/" + filename);
			}});
			
			return "/patient/" + filename;
			
		} catch (Exception e) {
			throw new HospitalException(e);
		}
	}

	@Override
	public String scanPhoto(String uri) {
		String data = this.cloudVisionTemplate.extractTextFromImage(
				this.resourceLoader.getResource(uri)
			);		
		return data;
	}

}
