package com.example.hospital.patient.wx.api.controller.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Data;

@Data
public class OcrImageForm {

	@NotBlank(message = "uri is required")
	private String uri;
}
