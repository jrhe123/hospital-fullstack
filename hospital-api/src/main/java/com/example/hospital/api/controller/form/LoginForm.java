package com.example.hospital.api.controller.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Data;

@Data
public class LoginForm {

	@NotBlank(message = "username is required")
	@Pattern(regexp = "^[a-zA-Z0-9][5,50]$", message = "invalid username format")
	private String username;
	
	@NotBlank(message = "password is required")
	@Pattern(regexp = "^[a-zA-Z0-9][6,20]$", message = "invalid password format")
	private String password;
}
