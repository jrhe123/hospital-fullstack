package com.example.hospital.api.controller.form;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import lombok.Data;

@Data
public class UpdateMedicalDeptSubForm {

	@NotNull(message = "id is required")
	@Min(value = 1, message = "id must be greater than 0")
	private Integer id;
	
	@NotBlank(message = "name is required")
	@Pattern(regexp = "^[a-zA-Z0-9\\s]{1,50}$", message = "invalid name format")
	private String name;
	
	@NotNull(message = "deptId is required")
	@Min(value = 1, message = "deptId must be greater than 0")
	private Integer deptId;
	
	@NotBlank(message = "location is required")
	private String location;
}
