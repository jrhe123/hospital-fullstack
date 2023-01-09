package com.example.hospital.api.service.impl;

import java.util.ArrayList;
import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hospital.api.db.dao.DoctorWorkPlanDao;
import com.example.hospital.api.db.dao.DoctorWorkPlanScheduleDao;
import com.example.hospital.api.db.pojo.DoctorWorkPlanScheduleEntity;
import com.example.hospital.api.service.DoctorWorkPlanScheduleService;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.map.BiMap;
import cn.hutool.core.map.MapUtil;

@Service
public class DoctorWorkPlanScheduleServiceImpl implements DoctorWorkPlanScheduleService {

	@Resource
	private DoctorWorkPlanScheduleDao doctorWorkPlanScheduleDao;
	
	@Resource
	private DoctorWorkPlanDao doctorWorkPlanDao;
	
	@Resource
	private RedisTemplate redisTemplate;

	@Override
	public void insert(ArrayList<DoctorWorkPlanScheduleEntity> list) {
		
		insertScheduleHanle(list);
		
		// NOTES: redis for over purchase
		// "optimistic lock"
		// eg:
		// key:  doctor_schedule_10
		// value:
		//  id: 10
		//  slot: 1
		//  maximum: 3
		//  num: 0
		//  date: 2022-10-10
		this.addSceduleCache(list);
	}
	
	@Transactional
	void insertScheduleHanle(ArrayList<DoctorWorkPlanScheduleEntity> list) {
		for (DoctorWorkPlanScheduleEntity one : list) {
			doctorWorkPlanScheduleDao.insert(one);
		}
	}
	
	public void addSceduleCache(ArrayList<DoctorWorkPlanScheduleEntity> list) {
		if (list == null || list.size() == 0) {
			return;
		}
		
		int workPlanId = list.get(0).getWorkPlanId();
		ArrayList<HashMap> newList = doctorWorkPlanScheduleDao.searchNewSchedule(workPlanId);
		
		for (HashMap one : newList) {
			int id = MapUtil.getInt(one, "id");
			int slot = MapUtil.getInt(one, "slot");
			
			String key = "doctor_schedule_" + id;
			redisTemplate.opsForHash().putAll(key, one);
			
			String date = MapUtil.getStr(one, "date");
			String time = range.getKey(slot);
			redisTemplate.expireAt(key, DateUtil.parse(date + " " + time));
		}
		
	}
	
	/**
	 * BiMap: get key by value, bidirection
	 */
	private BiMap<String, Integer> range = new BiMap<>(new HashMap() {{
		// time, slotIndex
		put("08:00", 1);
		put("08:30", 2);
		put("09:00", 3);
		put("09:30", 4);
		put("10:00", 5);
		put("10:30", 6);
		put("11:00", 7);
		put("11:30", 8);
		put("13:00", 9);
		put("13:30", 10);
		put("14:00", 11);
		put("14:30", 12);
		put("15:00", 13);
		put("15:30", 14);
		put("16:00", 15);
	}});
	
}
