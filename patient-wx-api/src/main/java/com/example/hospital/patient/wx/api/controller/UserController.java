package com.example.hospital.patient.wx.api.controller;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.hospital.patient.wx.api.common.R;
import com.example.hospital.patient.wx.api.controller.form.LoginOrRegisterForm;
import com.example.hospital.patient.wx.api.controller.form.OcrImageForm;
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
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONUtil;
import io.lettuce.core.dynamic.annotation.Param;

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
	
	@GetMapping("/validate")
	@SaCheckLogin
	public R validate() {
		int userId = StpUtil.getLoginIdAsInt();
		// get user info card
		HashMap userInfoCard = userInfoCardService.searchUserInfoCard(userId);
		
		// convert history str -> array json
		String history = MapUtil.getStr(userInfoCard, "medicalHistory");
		JSONArray historyArr = JSONUtil.parseArray(history);
		userInfoCard.replace("medicalHistory", historyArr);
				
		return R.ok()
				.put("result", true)
				.put("user", userInfoCard);
	}
	
	
	@PatchMapping("/update")
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
		String json = JSONUtil.parseArray(userInfoCardEntity.getMedicalHistory()).toString();
		userInfoCardEntity.setMedicalHistory(json);
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
	
	@PostMapping("/updatePhoto")
	@SaCheckLogin
	public R updatePhoto(
			@Param("file") MultipartFile file
			) {
		
		int userId = StpUtil.getLoginIdAsInt();
		String photo = userService.updatePhoto(file, userId);
		return R.ok()
				.put("result", true)
				.put("photo", photo);
	}
	
	@PostMapping("/ocr")
	@SaCheckLogin
	public R ocr() {
		String data = userService.scanPhoto(
				"https://cloud.google.com/vision/docs/images/sign_text.png"
		);
		return R.ok()
				.put("result", true)
				.put("data", data);
	}

}
