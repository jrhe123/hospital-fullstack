package com.example.hospital.api.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.hospital.api.common.PageUtils;
import com.example.hospital.api.common.R;
import com.example.hospital.api.controller.form.DeleteDoctorByIdsForm;
import com.example.hospital.api.controller.form.GetDoctorDetailForm;
import com.example.hospital.api.controller.form.InsertDoctorForm;
import com.example.hospital.api.controller.form.SearchDoctorByPageForm;
import com.example.hospital.api.controller.form.SearchDoctorContentForm;
import com.example.hospital.api.controller.form.UpdateDoctorForm;
import com.example.hospital.api.service.DoctorService;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaMode;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.json.JSONUtil;
import io.lettuce.core.dynamic.annotation.Param;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

	@Resource
	private DoctorService doctorService;
	
	@PostMapping("/searchByPage")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "DOCTOR:SELECT"}, mode = SaMode.OR)
	public R searchByPage(@RequestBody @Valid SearchDoctorByPageForm form) {
		
		Map param = BeanUtil.beanToMap(form);
		int page = form.getPage();
		int length = form.getLength();
		int start = (page - 1) * length;
		param.put("start", start);
		
		PageUtils pageUtils = doctorService.searchByPage(param);
		return R.ok()
				.put("result", true)
				.put("pageUtil", pageUtils);
	}
	
	
	@PostMapping("/searchContent")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "DOCTOR:SELECT"}, mode = SaMode.OR)
	public R searchContent(@RequestBody @Valid SearchDoctorContentForm form) {
		HashMap map = doctorService.searchContent(form.getId());
		return R.ok()
				.put("result", true)
				.put("data", map);
	}
	
	@PostMapping("/updatePhoto")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "DOCTOR:UPDATE"}, mode = SaMode.OR)
	public R updatePhoto(
			@Param("file") MultipartFile file,
			@Param("doctorId") Integer doctorId
			) {
		
		String photo = doctorService.updatePhoto(file, doctorId);
		return R.ok()
				.put("result", true)
				.put("photo", photo);
	}
	
	@PostMapping("/insert")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "DOCTOR:INSERT"}, mode = SaMode.OR)
	public R insert(@RequestBody @Valid InsertDoctorForm form) {
		Map param = BeanUtil.beanToMap(form);
		
		// convert string[] to string
		String json = JSONUtil.parseArray(form.getTag()).toString();
		param.replace("tag", json);
		
		// add uuid
		param.put("uuid", IdUtil.simpleUUID().toUpperCase());
		
		HashMap doctor = doctorService.insert(param);
		
		return R.ok()
				.put("result", true)
				.put("data", doctor);
		
	}
	
	
	@PostMapping("/searchById")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "DOCTOR:SELECT"}, mode = SaMode.OR)
	public R getDoctorDetailById(@RequestBody @Valid GetDoctorDetailForm form) {
		HashMap map = doctorService.getDetailById(form.getId());
		return R.ok()	
				.put("result", true)
				.put("data", map);
	}
	
	@PatchMapping("/update")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "DOCTOR:UPDATE"}, mode = SaMode.OR)
	public R update(@RequestBody @Valid UpdateDoctorForm form) {
		Map param = BeanUtil.beanToMap(form);
		
		String json = JSONUtil.parseArray(form.getTag()).toString();
		param.replace("tag", json);
		
		doctorService.update(param);
		return R.ok()	
				.put("result", true);
	}
	
	@DeleteMapping("/deleteByIds")
	@SaCheckLogin
	@SaCheckPermission(value = {"ROOT", "DOCTOR:DELETE"}, mode = SaMode.OR)
	public R deleteByIds(@RequestBody @Valid DeleteDoctorByIdsForm form) {
		doctorService.deleteByIds(form.getIds());
		return R.ok()	
				.put("result", true);
	}
}
