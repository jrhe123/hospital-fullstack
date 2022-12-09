package com.example.hospital.api.service;

import java.util.Map;

import com.example.hospital.api.db.dto.MisUserDTO;

public interface MisUserService {
	
	public Integer login(Map param);
	
	public MisUserDTO getUserById(Integer userId);
}
