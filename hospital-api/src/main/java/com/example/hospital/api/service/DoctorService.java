package com.example.hospital.api.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.example.hospital.api.common.PageUtils;

public interface DoctorService {

	public PageUtils searchByPage(Map param);
	
	public HashMap searchContent(int id);
	
	public String updatePhoto(MultipartFile file, Integer doctorId);
	
	public HashMap insert(Map param);
	
	public HashMap getDetailById(Integer id);
	
	public void update(Map param);
}
