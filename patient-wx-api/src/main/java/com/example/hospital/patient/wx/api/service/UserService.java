package com.example.hospital.patient.wx.api.service;

import java.util.HashMap;
import java.util.Map;

import com.example.hospital.patient.wx.api.db.pojo.UserEntity;

public interface UserService {
	
	public String sendCode(String tel);

	public int loginOrRegister(String tel);
	
	public void update(UserEntity entity);
}
