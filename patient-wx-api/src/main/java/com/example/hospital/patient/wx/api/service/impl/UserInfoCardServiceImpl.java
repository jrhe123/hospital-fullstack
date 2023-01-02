package com.example.hospital.patient.wx.api.service.impl;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hospital.patient.wx.api.db.dao.UserInfoCardDao;
import com.example.hospital.patient.wx.api.db.pojo.UserInfoCardEntity;
import com.example.hospital.patient.wx.api.service.UserInfoCardService;

@Service
public class UserInfoCardServiceImpl implements UserInfoCardService {
	
	@Resource
	private UserInfoCardDao userInfoCardDao;

	@Override
	@Transactional
	public void update(UserInfoCardEntity entity) {
		userInfoCardDao.update(entity);
	}

	@Override
	public HashMap searchUserInfoCard(int userId) {
		HashMap userInfoCard = userInfoCardDao.searchUserInfoCard(userId);
		return userInfoCard;
	}

}
