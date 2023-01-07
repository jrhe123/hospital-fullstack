package com.example.hospital.api.service;

import java.util.ArrayList;

import com.example.hospital.api.db.pojo.DoctorWorkPlanScheduleEntity;

public interface DoctorWorkPlanScheduleService {

	public void insert(
			ArrayList<DoctorWorkPlanScheduleEntity> list
			);
}
