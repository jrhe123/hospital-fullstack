package com.example.hospital.api.controller.form;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Range;

import lombok.Data;

@Data
public class SearchMedicalDeptSubByPageForm {

	@Pattern(regexp = "^[a-zA-Z0-9]{1,50}$", message = "invalid name format")
    private String name;
	
	@Min(value = 1, message = "id must be greater than 0")
	private Integer deptId;

	@Pattern(regexp = "^asc$|^desc$", message = "invalid order format")
	private String order;

    @NotNull(message = "page is required")
    @Min(value = 1, message = "page must be greater than 0")
    private Integer page;

    @NotNull(message = "length is required")
    @Range(min = 10, max = 50, message = "length is invalid")
    private Integer length;
}
