package com.example.hospital.api.controller.form;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class DeleteMedicalDeptByIdsForm {

	@NotEmpty(message = "ids is required")
	private Integer[] ids;
}
