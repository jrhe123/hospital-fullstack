package com.example.hospital.api.controller.form;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Range;

import lombok.Data;

@Data
public class InsertWorkPlanForm {
    @NotNull(message = "deptSubId is required")
    @Min(value = 1, message = "deptSubId must be greater than 0")
    private Integer deptSubId;

    @NotNull(message = "doctorId required")
    @Min(value = 1, message = "doctorId must be greater than 0")
    private Integer doctorId;

    @NotBlank(message = "date is required")
    @Pattern(regexp = "^((((1[6-9]|[2-9]\\d)\\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\\d|3[01]))|(((1[6-9]|[2-9]\\d)\\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\\d|30))|(((1[6-9]|[2-9]\\d)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|(((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$",
            message = "invalid date format")
    private String date;

    @NotNull(message = "totalMaximum is required")
    @Range(min = 1, max = 150, message = "totalMaximum must be in range of 1 to 150")
    private Integer totalMaximum;

    @NotNull(message = "slotMaximum is required")
    @Range(min = 1, max = 10, message = "slotMaximum must be in range of 1 to 10")
    private Integer slotMaximum;

    @NotEmpty(message = "slots is required")
    private Integer[] slots;
}

