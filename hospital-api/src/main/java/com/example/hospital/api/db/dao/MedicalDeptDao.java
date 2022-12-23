package com.example.hospital.api.db.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.example.hospital.api.db.pojo.MedicalDeptEntity;

public interface MedicalDeptDao {
    
	public ArrayList<HashMap> searchAll();

	public ArrayList<HashMap> searchDeptAndSub();
	
	public ArrayList<HashMap> searchDeptByPage(Map param);
	
	public ArrayList<HashMap> searchByPage(Map param);
	
	public long searchCount(Map param);
	
	public int insert(MedicalDeptEntity entity);
	
	public Integer searchIdByUuid(String uuid);
	
	public HashMap getDeptDetailById(int id);
	
	public HashMap searchById(int id);
	
	public void update(MedicalDeptEntity entity);
	
}




