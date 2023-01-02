package com.example.hospital.patient.wx.api.controller;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hospital.patient.wx.api.common.R;
import com.example.hospital.patient.wx.api.controller.form.LoginOrRegisterForm;
import com.example.hospital.patient.wx.api.controller.form.SendCodeForm;
import com.example.hospital.patient.wx.api.controller.form.UpdateUserInfoCardForm;
import com.example.hospital.patient.wx.api.db.pojo.UserEntity;
import com.example.hospital.patient.wx.api.db.pojo.UserInfoCardEntity;
import com.example.hospital.patient.wx.api.service.UserInfoCardService;
import com.example.hospital.patient.wx.api.service.UserService;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaMode;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.StrUtil;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Resource
	private UserService userService;
	
	@Resource
	private UserInfoCardService userInfoCardService;
	
	@PostMapping("/sendCode")
	public R sendCode(
			@RequestBody @Valid SendCodeForm form,
			HttpSession session
			) {
		String code = userService.sendCode(form.getTel());
		session.setAttribute("code", code);
		
		return R.ok()
				.put("result", true);
	}
	
	@PostMapping("/loginOrRegister")
	public R loginOrRegister(
			@RequestBody @Valid LoginOrRegisterForm form,
			HttpSession session
			) {
		Enumeration<String> attributeNames = session.getAttributeNames();
		Object cacheCode = session.getAttribute("code");
		String code = form.getCode();
		if (cacheCode == null || !cacheCode.toString().equals(code)){
            return R.ok()
            		.put("result", false);
        }
		
		// login / register
		int userId = userService.loginOrRegister(form.getTel());
		// generate token
		StpUtil.login(userId);
		String token = StpUtil.getTokenValue();
		return R.ok()
				.put("result", true)
				.put("token", token);
	}
	
	
	@PostMapping("/update")
	@SaCheckLogin
	public R update(
			@RequestBody @Valid UpdateUserInfoCardForm form
			) {
		int userId = StpUtil.getLoginIdAsInt();
				
		// get user info card
		HashMap userInfoCard = userInfoCardService.searchUserInfoCard(userId);
		int userCardId = (int) userInfoCard.get("id");		
		
		// update user info card
		UserInfoCardEntity userInfoCardEntity = BeanUtil.toBean(form, UserInfoCardEntity.class);
		userInfoCardEntity.setId(userCardId);
		userInfoCardService.update(userInfoCardEntity);
		
		// update user
		UserEntity userEntity = new UserEntity();
		userEntity.setId(userId);
		userEntity.setNickname(userInfoCardEntity.getName());
		userEntity.setSex(userInfoCardEntity.getSex());
		userService.update(userEntity);
		
		return R.ok()
				.put("result", true);
	}

}
