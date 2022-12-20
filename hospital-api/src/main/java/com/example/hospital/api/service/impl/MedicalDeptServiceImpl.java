package com.example.hospital.api.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.hospital.api.common.PageUtils;
import com.example.hospital.api.db.dao.MedicalDeptDao;
import com.example.hospital.api.service.MedicalDeptService;

import cn.hutool.core.map.MapUtil;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MedicalDeptServiceImpl implements MedicalDeptService {
	
	@Resource
	private MedicalDeptDao medicalDeptDao;
	
	@Override
	public ArrayList<HashMap> searchAll() {
		return medicalDeptDao.searchAll();
	}

	@Override
	public HashMap searchDeptAndSub() {
		ArrayList<HashMap> list = medicalDeptDao.searchDeptAndSub();
		LinkedHashMap result = new LinkedHashMap();
		
		for(HashMap one: list) {
			Integer deptId = MapUtil.getInt(one, "deptId");
			Integer subId = MapUtil.getInt(one, "subId");
			String deptName = MapUtil.getStr(one, "deptName");
			String subName = MapUtil.getStr(one, "subName");
			
			if (result.containsKey(deptName)) {
				ArrayList<HashMap> subList = (ArrayList<HashMap>)result.get(deptName);
				
				subList.add(new HashMap() {{
					put("subId", subId);
					put("subName", subName);
				}});
				
			} else {
				result.put(deptName, new ArrayList() {{
					
					add(new HashMap() {{
						put("subId", subId);
						put("subName", subName);
					}});
					
				}});
			}
			
		}
		
//			{
//			  "msg": "success",
//			  "result": {
//			    "口腔科": [
//			      {
//			        "subId": 1,
//			        "subName": "口腔颌面外科"
//			      },
//			      {
//			        "subId": 2,
//			        "subName": "口腔颌面内科"
//			      }
//			    ],
//			    "眼科": [
//			      {
//			        "subId": 3,
//			        "subName": "眼科门诊"
//			      },
//			      {
//			        "subId": 4,
//			        "subName": "白内障诊疗中心"
//			      },
//			      {
//			        "subId": 5,
//			        "subName": "屈光中心门诊"
//			      },
//			      {
//			        "subId": 6,
//			        "subName": "眼激光门诊"
//			      }
//			    ]
//			  },
//			  "code": 200
//			}

		
		return result;
	}

	@Override
	public PageUtils searchByPage(Map param) {
		ArrayList<HashMap> list = null;
		long count = medicalDeptDao.searchCount(param);
		if (count > 0) {
			list = medicalDeptDao.searchByPage(param);
		} else {
			list = new ArrayList<>();
		}
		
		int page = MapUtil.getInt(param, "page");
		int length = MapUtil.getInt(param, "length");
		PageUtils pageUtils = new PageUtils(list, count, page, length);
		return pageUtils;
	}

}
