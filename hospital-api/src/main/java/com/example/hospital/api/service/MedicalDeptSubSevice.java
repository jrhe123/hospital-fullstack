package com.example.hospital.api.service;

import java.util.HashMap;
import java.util.Map;

import com.example.hospital.api.common.PageUtils;
import com.example.hospital.api.db.pojo.MedicalDeptSubEntity;

public interface MedicalDeptSubSevice {

	public PageUtils searchByPage(Map param);
	
	public HashMap insert(MedicalDeptSubEntity entity);
	
	public HashMap getDetailById(Integer id);
	
	public void update(Map param);
	
	public void deleteByIds(Integer[] ids);
}
