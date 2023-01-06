package com.example.hospital.api.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.hospital.api.db.dao.DoctorWorkPlanDao;
import com.example.hospital.api.service.MedicalDeptSubWorkPlanService;

import cn.hutool.core.date.DateTime;
import cn.hutool.core.map.MapUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONUtil;

@Service
public class MedicalDeptSubWorkPlanServiceImpl implements MedicalDeptSubWorkPlanService {

	@Resource
	private DoctorWorkPlanDao doctorWorkPlanDao;
	
	@Override
	public JSONArray searchWorkPlanInRange(Map param, ArrayList dateList) {
//		[
//		    {
//		        "deptSubId": 2,
//		        "deptName": "口腔科",
//		        "deptSubName": "口腔颌面内科",
//		        "plan": [
//		            {
//		                "date": "2022-10-13",
//		                "doctors": ["许靖琪"]
//		            },
//		            {
//		                "date": "2022-10-14",
//		                "doctors": ["吕成龙"]
//		            },
//		            {
//		                "date": "2022-10-15",
//		                "doctors": ["任振国","吕成龙"]
//		            },
//		            {
//		                "date": "2022-10-16",
//		                "doctors": ["许靖琪"]
//		            },
//		            {
//		                "date": "2022-10-17",
//		                "doctors": ["任振国","许靖琪","吕成龙"]
//		            },
//		            {
//		                "date": "2022-10-18",
//		                "doctors": ["任振国","许靖琪"]
//		            },
//		            {
//		                "date": "2022-10-19",
//		                "doctors": ["许靖琪","任振国","吕成龙"]
//		            },
//		            {
//		                "date": "2022-10-20",
//		                "doctors": ["吕成龙","许靖琪","任振国"]
//		            }
//		        ]
//		    },
//		    {
//		        "deptSubId": 18,
//		        "deptName": "外科",
//		        "deptSubName": "心脏外科门诊",
//		        "plan": [
//		            {
//		                "date": "2022-10-13",
//		                "doctors": ["程淳美"]
//		            },
//		            {
//		                "date": "2022-10-14",
//		                "doctors": ["程淳美"]
//		            },
//		            {
//		                "date": "2022-10-15",
//		                "doctors": ["程淳美"]
//		            },
//		            {
//		                "date": "2022-10-16",
//		                "doctors": ["程淳美"]
//		            },
//		            {
//		                "date": "2022-10-17",
//		                "doctors": []
//		            },
//		            {
//		                "date": "2022-10-18",
//		                "doctors": []
//		            },
//		            {
//		                "date": "2022-10-19",
//		                "doctors": []
//		            },
//		            {
//		                "date": "2022-10-20",
//		                "doctors": []
//		            }
//		        ]
//		    },
//		    ……
//		]

		ArrayList<HashMap> list = doctorWorkPlanDao.searchWorkPlanInRange(param);
		Integer tempSubId = null;
		String tempDate = null;
		HashMap tempResult = new HashMap();
		
		for (HashMap one : list) {
			
			String deptName = MapUtil.getStr(one, "deptName");
			int deptSubId = MapUtil.getInt(one, "deptSubId");
			String deptSubName = MapUtil.getStr(one, "deptSubName");
			String doctorName = MapUtil.getStr(one, "doctorName");
			int workPlanId = MapUtil.getInt(one, "workPlanId");
			String date = MapUtil.getStr(one, "date");
			
			// first row
			if (tempSubId == null) {
				tempSubId = deptSubId;
				tempDate = date;
				
				HashMap temp = new HashMap() {{
					put("deptName", deptName);
					put("deptSubId", deptSubId);
					put("deptSubName", deptSubName);
					// contains 7 days
					put("plan", new LinkedHashMap<>() {{
						// each day contains doctor name list
						put(date, new ArrayList<>() {{
							add(doctorName);
						}});
					}});
				}};
				
				tempResult.put(deptSubId, temp);
			}
			// not first row, same dept sub && same date
			else if (tempSubId == deptSubId && tempDate.equals(date)) {
				// get the same dept sub id hashmap
				HashMap map = (HashMap) tempResult.get(deptSubId);
				// get the "plan"
				LinkedHashMap plan = (LinkedHashMap) map.get("plan");
				// get doctor name list by date
				ArrayList doctors = (ArrayList) plan.get(date);
				// add it
				doctors.add(doctorName);
			}
			// not first row, same dept sub && different date
			else if (tempSubId == deptSubId && !tempDate.equals(date)) {
				// update to next date
				tempDate = date;
				// get the same dept sub id hashmap
				HashMap map = (HashMap) tempResult.get(deptSubId);
				// get the "plan"
				LinkedHashMap plan = (LinkedHashMap) map.get("plan");
				// new next date list
				plan.put(date, new ArrayList<>() {{
					add(doctorName);
				}});
			} else if (tempSubId != deptSubId) {
				// update to next deptSubId
				tempSubId = deptSubId;
				tempDate = date;
				
				HashMap temp = new HashMap() {{
					put("deptName", deptName);
					put("deptSubId", deptSubId);
					put("deptSubName", deptSubName);
					// contains 7 days
					put("plan", new LinkedHashMap<>() {{
						// each day contains doctor name list
						put(date, new ArrayList<>() {{
							add(doctorName);
						}});
					}});
				}};
				
				tempResult.put(deptSubId, temp);
			}
		}
		
		// format HashMap tempResult
		Set<Map.Entry> set = tempResult.entrySet();
		set.forEach(one -> {
			HashMap map = (HashMap) one.getValue();
			// date list
			LinkedHashMap plan = (LinkedHashMap) map.get("plan");
			// append the empty list if it's not exist
			dateList.forEach(date -> {
				if (!plan.containsKey(date)) {
					plan.put(date, new ArrayList<>());
				}
			});
			// sort "plan" by date (key)
			TreeMap sort = MapUtil.sort(plan, new Comparator() {
				@Override
				public int compare(Object o1, Object o2) {
					String key1 = (String) o1;
					String key2 = (String) o2;
					boolean bool = new DateTime(key1).isAfter(new DateTime(key2));
					return bool ? 1 : -1;
				}
				
			});
			// put it back
			map.replace("plan", sort);
		});
		
		// use Collection to store the result
		Collection<HashMap> values = tempResult.values();
		values.forEach(one -> {
			TreeMap plan = (TreeMap) one.get("plan");
			// iterate
			Set<Map.Entry> tempSet = plan.entrySet();
			// use list to store, instead of tree map (sorted)
			ArrayList temp = new ArrayList<>();
			tempSet.forEach(entry -> {
				temp.add(new HashMap<>() {{
					put("date", entry.getKey());
					put("doctor", entry.getValue());
				}});
			});
			// put it back
			one.replace("plan", temp);
		});
		
		return JSONUtil.parseArray(values);
	}

}
