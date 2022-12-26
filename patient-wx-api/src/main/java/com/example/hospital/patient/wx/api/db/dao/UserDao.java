package com.example.hospital.patient.wx.api.db.dao;

import com.example.hospital.patient.wx.api.db.pojo.UserEntity;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

public interface UserDao {
    
	@Transactional
	public int insert(UserEntity entity);
	
	public HashMap searchAlreadyRegistered(String tel);
	
	public Integer searchIdByUuid(String uuid);
	
	public HashMap searchById(Integer id);
}
