package com.example.hospital.api.service.impl;

import java.util.ArrayList;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hospital.api.db.dao.DoctorWorkPlanDao;
import com.example.hospital.api.db.dao.DoctorWorkPlanScheduleDao;
import com.example.hospital.api.db.pojo.DoctorWorkPlanScheduleEntity;
import com.example.hospital.api.service.DoctorWorkPlanScheduleService;

@Service
public class DoctorWorkPlanScheduleServiceImpl implements DoctorWorkPlanScheduleService {

	@Resource
	private DoctorWorkPlanScheduleDao doctorWorkPlanScheduleDao;
	
	@Resource
	private DoctorWorkPlanDao doctorWorkPlanDao;

	@Override
	public void insert(ArrayList<DoctorWorkPlanScheduleEntity> list) {
		
		insertScheduleHanle(list);
		
		// TODO: redis for over purchase
		// optimistic lock
		// eg:
		// key:  doctor_schedule_10
		// value:
		//  id: 10
		//  slot: 1
		//  maximum: 3
		//  num: 0
		//  date: 2022-10-10
		
	}
	
	@Transactional
	void insertScheduleHanle(ArrayList<DoctorWorkPlanScheduleEntity> list) {
		for (DoctorWorkPlanScheduleEntity one : list) {
			doctorWorkPlanScheduleDao.insert(one);
		}
	}
	
}
