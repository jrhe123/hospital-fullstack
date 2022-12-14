package com.example.hospital.api.controller.form;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

import lombok.Data;

@Data
public class InsertDoctorForm {

	@NotBlank(message = "name is required")
	@Pattern(regexp = "^[a-zA-Z0-9]{1,50}$", message = "invalid name format")
	private String name;
	
	@NotBlank(message = "pid is required")
	private String pid;
	
	@NotBlank(message = "sex is required")
	@Pattern(regexp = "^male$|^female$|^unisex$", message = "invalid sex format")
	private String sex;
	
	@NotBlank(message = "birthday is required")
	private String birthday;
	
	@NotBlank(message = "school is required")
	@Length(min = 2, max = 100, message = "invalid school format")
	private String school;
	
	@NotBlank(message = "degree is required")
	@Pattern(regexp = "^bachelor$|^master$|^phd$", message = "invalid degree format")
	private String degree;
	
	@NotBlank(message = "tel is required")
	private String tel;
	
	@NotBlank(message = "address is required")
	private String address;
	
	@NotBlank(message = "email is required")
	@Email
	@Length(max = 200, message = "invalid email format")
	private String email;
	
	@NotBlank(message = "job is required")
	@Pattern(regexp = "^specialist$|^vice-specialist$|^director$|^vice-director$", message = "invalid job format")
	private String job;
	
	@NotBlank(message = "remark is required")
	@Length(max = 1000, message = "invalid remark format")
	private String remark;
	
	@NotBlank(message = "description is required")
	private String description;
	
	@NotBlank(message = "hiredate is required")
	private String hiredate;
	
	private String[] tag;
	
	@NotNull(message = "recommended is required")
	private Boolean recommended;
	
	@NotNull(message = "status is required")
	@Range(min = 1, max = 3, message = "status must be in range of 1-3")
	private Byte status;
	
	@NotNull(message = "subId is required")
	@Min(value = 1, message = "subId must be greater than 1")
	private Integer subId;
}
