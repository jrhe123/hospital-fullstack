package com.example.hospital.api.service.impl;

import java.util.ArrayList;
import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.hospital.api.db.dao.MedicalDeptDao;
import com.example.hospital.api.service.MedicalDeptService;

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

}
