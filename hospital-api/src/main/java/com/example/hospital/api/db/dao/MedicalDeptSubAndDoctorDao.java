package com.example.hospital.api.db.dao;

import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.example.hospital.api.db.pojo.MedicalDeptSubAndDoctorEntity;

public interface MedicalDeptSubAndDoctorDao {
   
	@Transactional
	public void insert(MedicalDeptSubAndDoctorEntity entity);
	
	public void updateDoctorSubDept(Map param);
}




