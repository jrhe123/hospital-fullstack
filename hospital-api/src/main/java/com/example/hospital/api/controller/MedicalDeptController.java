package com.example.hospital.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hospital.api.common.PageUtils;
import com.example.hospital.api.common.R;
import com.example.hospital.api.controller.form.DeleteDoctorByIdsForm;
import com.example.hospital.api.controller.form.DeleteMedicalDeptByIdsForm;
import com.example.hospital.api.controller.form.GetDoctorDetailForm;
import com.example.hospital.api.controller.form.GetMedicalDeptDetailForm;
import com.example.hospital.api.controller.form.InsertMedicalDeptForm;
import com.example.hospital.api.controller.form.SearchMedicalDeptByPageForm;
import com.example.hospital.api.controller.form.UpdateDoctorForm;
import com.example.hospital.api.controller.form.UpdateMedicalDeptForm;
import com.example.hospital.api.db.pojo.MedicalDeptEntity;
import com.example.hospital.api.service.MedicalDeptService;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaMode;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.json.JSONUtil;

@RestController
@RequestMapping("/medical/dept")
public class MedicalDeptController {

	@Resource
	private MedicalDeptService medicalDeptService;
	
	@PostMapping("/searchAll")
	@SaCheckLogin
	public R searchAll() {
		ArrayList<HashMap> list = medicalDeptService.searchAll();
		return R.ok()
				.put("result", true)
				.put("list", list);
	}
	
	@GetMapping("/searchDeptAndSub")
	@SaCheckLogin
	public R searchDeptAndSub() {
		HashMap map = medicalDeptService.searchDeptAndSub();
		return R.ok()
				.put("result", true)
				.put("data", map);
	}
	
	@PostMapping("/searchDeptByPage")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "MEDICAL_DEPT:SELECT"}, mode = SaMode.OR)
	public R searchDeptByPage(@RequestBody @Valid SearchMedicalDeptByPageForm form) {
		Map param = BeanUtil.beanToMap(form);
		int page = form.getPage();
		int length = form.getLength();
		int start = (page - 1) * length;
		param.put("start", start);
		
		PageUtils pageUtils = medicalDeptService.searchDeptByPage(param);
		return R.ok()
				.put("result", true)
				.put("pageUtil", pageUtils);
	}
	
	@PostMapping("/searchByPage")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "MEDICAL_DEPT:SELECT"}, mode = SaMode.OR)
	public R searchByPage(@RequestBody @Valid SearchMedicalDeptByPageForm form) {
		Map param = BeanUtil.beanToMap(form);
		int page = form.getPage();
		int length = form.getLength();
		int start = (page - 1) * length;
		param.put("start", start);
		
		PageUtils pageUtils = medicalDeptService.searchByPage(param);
		return R.ok()
				.put("result", true)
				.put("pageUtil", pageUtils);
	}
	
	@PostMapping("/insert")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "MEDICAL_DEPT:INSERT"}, mode = SaMode.OR)
	public R insert(@RequestBody @Valid InsertMedicalDeptForm form) {
		MedicalDeptEntity entity = BeanUtil.toBean(form, MedicalDeptEntity.class);
		// add uuid
		entity.setUuid(IdUtil.simpleUUID().toUpperCase());
		
		HashMap dept = medicalDeptService.insert(entity);
		return R.ok()
				.put("result", true)
				.put("data", dept);
	}
	
	@PostMapping("/searchById")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "MEDICAL_DEPT:SELECT"}, mode = SaMode.OR)
	public R getDeptDetailById(@RequestBody @Valid GetMedicalDeptDetailForm form) {
		HashMap map = medicalDeptService.getDetailById(form.getId());
		return R.ok()	
				.put("result", true)
				.put("data", map);
	}
	
	@PatchMapping("/update")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "MEDICAL_DEPT:UPDATE"}, mode = SaMode.OR)
	public R update(@RequestBody @Valid UpdateMedicalDeptForm form) {
		Map param = BeanUtil.beanToMap(form);
		
		medicalDeptService.update(param);
		return R.ok()	
				.put("result", true);
	}
	
	@PostMapping("/deleteByIds")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "MEDICAL_DEPT:DELETE"}, mode = SaMode.OR)
	public R deleteByIds(@RequestBody @Valid DeleteMedicalDeptByIdsForm form) {
		medicalDeptService.deleteByIds(form.getIds());
		return R.ok()
				.put("result", true);
	}
}
