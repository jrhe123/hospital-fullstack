package com.example.hospital.api.controller.form;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Range;

import lombok.Data;

@Data
public class SearchDoctorByPageForm {

	@Pattern(regexp = "^[a-zA-Z0-9]{5,50}$", message = "invalid name format")
	private String name;
	
	@Min(value = 1, message = "deptId must be greater than 1")
	private Integer deptId;
	
	@Pattern(regexp = "^bachelor$|^master$|^phd$", message = "invalid degree format")
	private String degree;
	
	@Pattern(regexp = "^specialist$|^vice-specialist$|^director$|^vice-director$", message = "invalid job format")
	private String job;
	
	private Boolean recommended;
	
	@NotNull(message = "status is required")
	@Range(min = 1, max = 3, message = "status must be in range of 1-3")
	private Byte status;
	
	@Pattern(regexp = "^ASC$|^DESC$", message = "invalid order format")
	private String order;
	
	@NotNull(message = "page is required")
	@Min(value = 1, message = "page must be greater than 1")
	private Integer page;
	
	@NotNull(message = "length is required")
	@Range(min = 10, max = 50, message = "length must be in range of 10-50")
	private Integer length;
}
