package com.example.hospital.api.service.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.hospital.api.db.dao.MisUserDao;
import com.example.hospital.api.db.dto.MisUserDTO;
import com.example.hospital.api.service.MisUserService;

import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.digest.MD5;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MisUserServiceImpl implements MisUserService {
	
	@Resource
	private MisUserDao misUserDao;

	@Override
	public Integer login(Map param) {
		
		String username = MapUtil.getStr(param, "username");
		String password = MapUtil.getStr(param, "password");
		
		MD5 md5 = MD5.create();
		String tempPwd = md5.digestHex(username);
		
		// special logic handles pwd
		String pwd1 = StrUtil.subWithLength(tempPwd, 0, 6);
		String pwd2 = StrUtil.subSuf(tempPwd,tempPwd.length() - 3);
		password = md5.digestHex(pwd1 + password + pwd2);
		param.replace("password", password);
		
		// dao
		Integer userId = misUserDao.login(param);
		return userId;
	}

	@Override
	public MisUserDTO getUserById(Integer userId) {
		MisUserDTO user = misUserDao.getUserById(userId);
		return user;
	}

}
