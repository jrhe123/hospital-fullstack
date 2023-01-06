package com.example.hospital.api.service;

import java.util.ArrayList;
import java.util.Map;

import cn.hutool.json.JSONArray;

public interface MedicalDeptSubWorkPlanService {

	public JSONArray searchWorkPlanInRange(Map param, ArrayList dateList);
}
