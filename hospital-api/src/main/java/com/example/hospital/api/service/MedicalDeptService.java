package com.example.hospital.api.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.example.hospital.api.common.PageUtils;
import com.example.hospital.api.db.pojo.MedicalDeptEntity;

import cn.hutool.core.util.PageUtil;

public interface MedicalDeptService {

	public ArrayList<HashMap> searchAll();
	
	public HashMap searchDeptAndSub();
	
	public PageUtils searchDeptByPage(Map param);
	
	public PageUtils searchByPage(Map param);
	
	public HashMap insert(MedicalDeptEntity entity);
	
	public HashMap getDetailById(Integer id);
	
	public void update(Map param);
	
	public void deleteByIds(Integer[] ids);
}
