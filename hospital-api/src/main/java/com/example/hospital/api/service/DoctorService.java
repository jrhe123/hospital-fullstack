package com.example.hospital.api.service;

import java.util.HashMap;
import java.util.Map;

import com.example.hospital.api.common.PageUtils;

public interface DoctorService {

	public PageUtils searchByPage(Map param);
	
	public HashMap searchContent(int id);
}
