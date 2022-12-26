package com.example.hospital.patient.wx.api.controller.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Data;

@Data
public class LoginOrRegisterForm {

	@NotBlank(message = "tel is required")
	@Pattern(regexp = "^\\d{10}$", message = "invalid tel format")
	private String tel;
	
	@NotBlank(message = "code is required")
	private String code;
}
