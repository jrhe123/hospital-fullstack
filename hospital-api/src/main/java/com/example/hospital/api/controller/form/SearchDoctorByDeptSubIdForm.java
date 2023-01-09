package com.example.hospital.api.controller.form;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class SearchDoctorByDeptSubIdForm {
    @NotNull(message = "deptSubId is required")
    @Min(value = 1, message = "deptSubId must be greater than 0")
    private Integer deptSubId;
}
