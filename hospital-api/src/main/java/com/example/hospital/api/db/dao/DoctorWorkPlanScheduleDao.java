package com.example.hospital.api.db.dao;

import java.util.ArrayList;
import java.util.HashMap;

import com.example.hospital.api.db.pojo.DoctorWorkPlanScheduleEntity;

public interface DoctorWorkPlanScheduleDao {

	public void insert(DoctorWorkPlanScheduleEntity entity);
	
	public ArrayList<HashMap> searchNewSchedule(int workPlanId);
   
}




