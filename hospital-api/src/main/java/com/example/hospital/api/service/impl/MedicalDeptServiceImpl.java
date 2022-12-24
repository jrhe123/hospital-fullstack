package com.example.hospital.api.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hospital.api.common.PageUtils;
import com.example.hospital.api.db.dao.MedicalDeptDao;
import com.example.hospital.api.db.pojo.MedicalDeptEntity;
import com.example.hospital.api.exception.HospitalException;
import com.example.hospital.api.service.MedicalDeptService;

import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONUtil;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MedicalDeptServiceImpl implements MedicalDeptService {
	
	@Resource
	private MedicalDeptDao medicalDeptDao;
	
	@Override
	public ArrayList<HashMap> searchAll() {
		return medicalDeptDao.searchAll();
	}

	@Override
	public HashMap searchDeptAndSub() {
		ArrayList<HashMap> list = medicalDeptDao.searchDeptAndSub();
		LinkedHashMap result = new LinkedHashMap();
		
		for(HashMap one: list) {
			Integer deptId = MapUtil.getInt(one, "deptId");
			Integer subId = MapUtil.getInt(one, "subId");
			String deptName = MapUtil.getStr(one, "deptName");
			String subName = MapUtil.getStr(one, "subName");
			
			if (result.containsKey(deptName)) {
				ArrayList<HashMap> subList = (ArrayList<HashMap>)result.get(deptName);
				
				subList.add(new HashMap() {{
					put("subId", subId);
					put("subName", subName);
				}});
				
			} else {
				result.put(deptName, new ArrayList() {{
					
					add(new HashMap() {{
						put("subId", subId);
						put("subName", subName);
					}});
					
				}});
			}
			
		}
		return result;
	}
	
	@Override
	public PageUtils searchDeptByPage(Map param) {
		ArrayList<HashMap> list = null;
		long count = medicalDeptDao.searchCount(param);
		if (count > 0) {
			list = medicalDeptDao.searchDeptByPage(param);
		} else {
			list = new ArrayList<>();
		}
		
		int page = MapUtil.getInt(param, "page");
		int length = MapUtil.getInt(param, "length");
		PageUtils pageUtils = new PageUtils(list, count, page, length);
		return pageUtils;
	}

	@Override
	public PageUtils searchByPage(Map param) {
		ArrayList<HashMap> list = null;
		long count = medicalDeptDao.searchCount(param);
		if (count > 0) {
			list = medicalDeptDao.searchByPage(param);
		} else {
			list = new ArrayList<>();
		}
		
		int page = MapUtil.getInt(param, "page");
		int length = MapUtil.getInt(param, "length");
		PageUtils pageUtils = new PageUtils(list, count, page, length);
		return pageUtils;
	}

	@Override
	public HashMap insert(MedicalDeptEntity entity) {		
		// 1. insert
		medicalDeptDao.insert(entity);
		// 2. get id from uuid
		String uuid = entity.getUuid();
		Integer medicalDeptId = medicalDeptDao.searchIdByUuid(uuid);
		// 3. response
		HashMap dept = medicalDeptDao.getDeptDetailById(medicalDeptId);
		return dept;
	}

	@Override
	public HashMap getDetailById(Integer id) {
		HashMap dept = medicalDeptDao.getDeptDetailById(id);
		return dept;
	}

	@Override
	@Transactional
	public void update(Map param) {
		medicalDeptDao.update(param);
	}

	@Override
	@Transactional
	public void deleteByIds(Integer[] ids) {
		long count = medicalDeptDao.searchSubCount(ids);		
		if (count != 0) {
			throw new HospitalException("Department has sub exists, cannot be deleted");
		}
		
		medicalDeptDao.deleteByIds(ids);
	}



}
