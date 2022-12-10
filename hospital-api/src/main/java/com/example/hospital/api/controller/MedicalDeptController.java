package com.example.hospital.api.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hospital.api.common.R;
import com.example.hospital.api.service.MedicalDeptService;

import cn.dev33.satoken.annotation.SaCheckLogin;

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
}
