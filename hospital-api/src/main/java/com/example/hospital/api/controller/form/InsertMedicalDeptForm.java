package com.example.hospital.api.controller.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import lombok.Data;

@Data
public class InsertMedicalDeptForm {

	@NotBlank(message = "name is required")
	@Pattern(regexp = "^[a-zA-Z0-9\\s]{1,50}$", message = "invalid name format")
	private String name;
	
	@NotNull(message = "outpatient is required")
	private Boolean outpatient;
	
	@NotNull(message = "recommended is required")
	private Boolean recommended;
	
	@NotNull(message = "description is required")
	private String description;
}
