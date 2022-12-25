package com.example.hospital.api.db.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.example.hospital.api.db.pojo.MedicalDeptEntity;
import com.example.hospital.api.db.pojo.MedicalDeptSubEntity;

public interface MedicalDeptSubDao {
    
	
	public ArrayList<HashMap> searchByPage(Map param);
	
	public long searchCount(Map param);
	
	@Transactional
	public int insert(MedicalDeptSubEntity entity);
	
	public Integer searchIdByUuid(String uuid);
	
	public HashMap getDeptSubDetailById(int id);
		
	public void update(Map param);
	
	public long searchDoctorCount(Integer[] ids);
	
	public void deleteByIds(Integer[] ids);
}




