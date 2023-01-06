package com.example.hospital.api.controller;

import java.util.ArrayList;
import java.util.Map;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hospital.api.common.R;
import com.example.hospital.api.controller.form.SearchWorkPlanInRangeForm;
import com.example.hospital.api.service.MedicalDeptSubWorkPlanService;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaMode;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.date.DateField;
import cn.hutool.core.date.DateRange;
import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;
import cn.hutool.json.JSONArray;

@RestController
@RequestMapping("/medical/dept/sub/work_plan")
public class MedicalDeptSubWorkPlanController {
	
	@Resource
	private MedicalDeptSubWorkPlanService medicalDeptSubWorkPlanService;
	
	@PostMapping("/searchWorkPlanInRange")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "SCHEDULE:SELECT"}, mode = SaMode.OR)
	public R searchWorkPlanInRange(@RequestBody @Valid SearchWorkPlanInRangeForm form) {
		Map param = BeanUtil.beanToMap(form);
		
		DateRange range = DateUtil.range(
				new DateTime(form.getStartDate()),
				new DateTime(form.getEndDate()),
				DateField.DAY_OF_MONTH);
		
		ArrayList dateList = new ArrayList<>();
		range.forEach(one -> {
			dateList.add(one.toDateStr());
		});
		
		JSONArray array = medicalDeptSubWorkPlanService.searchWorkPlanInRange(param, dateList);
		
		dateList.clear();
		range.reset();
		
		return R.ok()
				.put("result", true)
				.put("list", array);
		
	}

}
