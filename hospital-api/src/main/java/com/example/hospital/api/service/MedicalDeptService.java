package com.example.hospital.api.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.example.hospital.api.common.PageUtils;

import cn.hutool.core.util.PageUtil;

public interface MedicalDeptService {

	public ArrayList<HashMap> searchAll();
	
	public HashMap searchDeptAndSub();
	
	public PageUtils searchByPage(Map param);
}
