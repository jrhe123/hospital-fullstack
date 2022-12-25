package com.example.hospital.api.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hospital.api.common.PageUtils;
import com.example.hospital.api.db.dao.MedicalDeptSubDao;
import com.example.hospital.api.db.pojo.MedicalDeptSubEntity;
import com.example.hospital.api.exception.HospitalException;
import com.example.hospital.api.service.MedicalDeptSubSevice;

import cn.hutool.core.map.MapUtil;

@Service
public class MedicalDeptSubServiceImpl implements MedicalDeptSubSevice {

	@Resource
	private MedicalDeptSubDao medicalDeptSubDao;

	@Override
	public PageUtils searchByPage(Map param) {
		ArrayList<HashMap> list = null;
		long count = medicalDeptSubDao.searchCount(param);
		if (count > 0) {
			list = medicalDeptSubDao.searchByPage(param);
		} else {
			list = new ArrayList<>();
		}
		
		int page = MapUtil.getInt(param, "page");
		int length = MapUtil.getInt(param, "length");
		PageUtils pageUtils = new PageUtils(
				list,
				count,
				page,
				length
				);
		return pageUtils;
	}

	@Override
	public HashMap insert(MedicalDeptSubEntity entity) {
		// 1. insert
		medicalDeptSubDao.insert(entity);
		// 2. get id from uuid
		String uuid = entity.getUuid();
		Integer medicalDeptSubId = medicalDeptSubDao.searchIdByUuid(uuid);
				
		// 3. response
		HashMap deptSub = medicalDeptSubDao.getDeptSubDetailById(medicalDeptSubId);		
		
		return deptSub;
	}

	@Override
	public HashMap getDetailById(Integer id) {
		HashMap dept = medicalDeptSubDao.getDeptSubDetailById(id);
		return dept;
	}

	@Override
	@Transactional
	public void update(Map param) {
		medicalDeptSubDao.update(param);
	}

	@Override
	@Transactional
	public void deleteByIds(Integer[] ids) {
		long count = medicalDeptSubDao.searchDoctorCount(ids);		
		if (count != 0) {
			throw new HospitalException("One of department sub has doctor exists, cannot be deleted");
		}
		
		medicalDeptSubDao.deleteByIds(ids);
		
	}
	
	
}
