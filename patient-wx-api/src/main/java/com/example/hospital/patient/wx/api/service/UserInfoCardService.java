package com.example.hospital.patient.wx.api.service;

import java.util.HashMap;

import com.example.hospital.patient.wx.api.db.pojo.UserInfoCardEntity;

public interface UserInfoCardService {

	public void update(UserInfoCardEntity entity);
	
	public HashMap searchUserInfoCard(int userId);
}
