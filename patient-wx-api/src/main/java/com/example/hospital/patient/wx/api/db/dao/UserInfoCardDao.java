package com.example.hospital.patient.wx.api.db.dao;

import com.example.hospital.patient.wx.api.db.pojo.UserInfoCardEntity;

import java.util.HashMap;

import org.springframework.transaction.annotation.Transactional;

public interface UserInfoCardDao {
    
	public String searchUserTel(int userId);
	
	@Transactional
	public void insert(UserInfoCardEntity entity);
	
	public HashMap searchUserInfoCard(int userId);
	
	public void update(UserInfoCardEntity entity);
}
