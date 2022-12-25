package com.example.hospital.api.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hospital.api.common.PageUtils;
import com.example.hospital.api.common.R;
import com.example.hospital.api.controller.form.DeleteMedicalDeptByIdsForm;
import com.example.hospital.api.controller.form.DeleteMedicalDeptSubByIdsForm;
import com.example.hospital.api.controller.form.GetMedicalDeptDetailForm;
import com.example.hospital.api.controller.form.InsertMedicalDeptForm;
import com.example.hospital.api.controller.form.InsertMedicalDeptSubForm;
import com.example.hospital.api.controller.form.SearchMedicalDeptByPageForm;
import com.example.hospital.api.controller.form.SearchMedicalDeptSubByIdForm;
import com.example.hospital.api.controller.form.SearchMedicalDeptSubByPageForm;
import com.example.hospital.api.controller.form.UpdateMedicalDeptForm;
import com.example.hospital.api.controller.form.UpdateMedicalDeptSubForm;
import com.example.hospital.api.db.pojo.MedicalDeptEntity;
import com.example.hospital.api.db.pojo.MedicalDeptSubEntity;
import com.example.hospital.api.service.MedicalDeptSubSevice;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaMode;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.IdUtil;

@RestController
@RequestMapping("/medical/dept/sub")
public class MedicalDeptSubController {

	@Resource
	private MedicalDeptSubSevice medicalDeptSubSevice;
	
	@PostMapping("/searchByPage")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "MEDICAL_DEPT_SUB:SELECT"}, mode = SaMode.OR)
	public R searchDeptByPage(@RequestBody @Valid SearchMedicalDeptSubByPageForm form) {
		Map param = BeanUtil.beanToMap(form);
		int page = form.getPage();
		int length = form.getLength();
		int start = (page - 1) * length;
		param.put("start", start);
		
		PageUtils pageUtils = medicalDeptSubSevice.searchByPage(param);
		return R.ok()
				.put("result", true)
				.put("pageUtil", pageUtils);
	}
	
	@PostMapping("/insert")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "MEDICAL_DEPT_SUB:INSERT"}, mode = SaMode.OR)
	public R insert(@RequestBody @Valid InsertMedicalDeptSubForm form) {
		MedicalDeptSubEntity entity = BeanUtil.toBean(form, MedicalDeptSubEntity.class);
		// add uuid
		entity.setUuid(IdUtil.simpleUUID().toUpperCase());
		
		HashMap deptSub = medicalDeptSubSevice.insert(entity);
		return R.ok()
				.put("result", true)
				.put("data", deptSub);
	}
	
	@PostMapping("/searchById")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "MEDICAL_DEPT_SUB:SELECT"}, mode = SaMode.OR)
	public R getDeptDetailById(@RequestBody @Valid SearchMedicalDeptSubByIdForm form) {
		HashMap map = medicalDeptSubSevice.getDetailById(form.getId());
		return R.ok()	
				.put("result", true)
				.put("data", map);
	}
	
	@PatchMapping("/update")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "MEDICAL_DEPT_SUB:UPDATE"}, mode = SaMode.OR)
	public R update(@RequestBody @Valid UpdateMedicalDeptSubForm form) {
		Map param = BeanUtil.beanToMap(form);
		
		medicalDeptSubSevice.update(param);
		return R.ok()	
				.put("result", true);
	}
	
	@PostMapping("/deleteByIds")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "MEDICAL_DEPT_SUB:DELETE"}, mode = SaMode.OR)
	public R deleteByIds(@RequestBody @Valid DeleteMedicalDeptSubByIdsForm form) {
		medicalDeptSubSevice.deleteByIds(form.getIds());
		return R.ok()
				.put("result", true);
	}
}
