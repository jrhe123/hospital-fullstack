package com.example.hospital.patient.wx.api.controller.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import lombok.Data;

@Data
public class UpdateUserInfoCardForm {
    @NotBlank(message = "name is required")
    @Pattern(regexp = "^[a-zA-Z0-9]{1,50}$", message = "invalid name format")
    private String name;

    @NotBlank(message = "sex is required")
	@Pattern(regexp = "^male$|^female$|^unisex$", message = "invalid sex format")
    private String sex;

    @NotBlank(message = "pid is required")
    private String pid;

    @NotBlank(message = "tel is required")
    private String tel;

    @NotBlank(message = "birthday is required")
    private String birthday;

    @NotEmpty(message = "medicalHistory is required")
    private String[] medicalHistory;

    @NotBlank(message = "insuranceType is required")
    private String insuranceType;
}
