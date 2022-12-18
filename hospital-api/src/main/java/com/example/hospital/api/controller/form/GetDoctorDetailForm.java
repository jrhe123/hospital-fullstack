package com.example.hospital.api.controller.form;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class GetDoctorDetailForm {

	@NotNull(message = "id is required")
	@Min(value = 1, message = "id must be greater than 0")
	private Integer id;
}
