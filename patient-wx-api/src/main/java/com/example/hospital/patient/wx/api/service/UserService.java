package com.example.hospital.patient.wx.api.service;

import java.util.HashMap;
import java.util.Map;

public interface UserService {
	
	public String sendCode(String tel);

	public int loginOrRegister(String tel);
}
