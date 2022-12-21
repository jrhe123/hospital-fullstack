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
	
	public void insert(MedicalDeptEntity entity);
}




