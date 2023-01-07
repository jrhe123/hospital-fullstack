package com.example.hospital.api.db.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.example.hospital.api.db.pojo.DoctorWorkPlanEntity;

public interface DoctorWorkPlanDao {
    
	public ArrayList<HashMap> searchWorkPlanInRange(Map param);
	
	public Integer searchId(Map param);
	
	@Transactional
	public void insert(DoctorWorkPlanEntity entity);
}




