package com.example.hospital.api.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hospital.api.common.R;
import com.example.hospital.api.controller.form.LoginForm;
import com.example.hospital.api.db.dto.MisUserDTO;
import com.example.hospital.api.service.MisUserService;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.bean.BeanUtil;

@RestController
@RequestMapping("/mis_user")
public class MisUserController {

	@Resource
	private MisUserService misUserService;
	
	@PostMapping("/login")
	public R login(@RequestBody @Valid LoginForm form) {
		Map param = BeanUtil.beanToMap(form);
		Integer userId = misUserService.login(param);
		
		if (userId != null) {
			StpUtil.login(userId);
			String token = StpUtil.getTokenValue();
			List<String> permissions = StpUtil.getPermissionList();
			
			// user info
			MisUserDTO user = misUserService.getUserById(userId);
			
			return R.ok()
					.put("result", true)
					.put("token", token)
					.put("permissions", permissions)
					.put("user", user);
		}
		return R.ok().put("result", false);
	}
	
	
	@GetMapping("/logout")
	@SaCheckLogin
	public R logout() {
		StpUtil.logout();
		return R.ok().put("result", true);
	}
	
	@GetMapping("/validate")
	@SaCheckLogin
	public R validate() {
		Integer userId = StpUtil.getLoginIdAsInt();
		List<String> permissions = StpUtil.getPermissionList();
		// user info
		MisUserDTO user = misUserService.getUserById(userId);
		
		return R.ok()
				.put("result", true)
				.put("permissions", permissions)
				.put("user", user);
	}
}
