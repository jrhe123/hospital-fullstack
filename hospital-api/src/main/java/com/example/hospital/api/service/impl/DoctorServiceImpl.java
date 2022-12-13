package com.example.hospital.api.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.hospital.api.common.PageUtils;
import com.example.hospital.api.db.dao.DoctorDao;
import com.example.hospital.api.service.DoctorService;

import cn.hutool.core.map.MapUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONUtil;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DoctorServiceImpl implements DoctorService {
	
	@Resource
	private DoctorDao doctorDao;
	
	@Override
	public PageUtils searchByPage(Map param) {
		
		ArrayList<HashMap> list = null;
		long count = doctorDao.searchCount(param);
		
		if (count > 0) {
			list = doctorDao.searchByPage(param);
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
	public HashMap searchContent(int id) {
		
		HashMap map = doctorDao.searchContent(id);
		
		// convert tag str -> array json
		String tag = MapUtil.getStr(map, "tag");
		JSONArray tagArr = JSONUtil.parseArray(tag);
		map.replace("tag", tagArr);
		
		return map;
	}

}
