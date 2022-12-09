package com.example.hospital.api.db.dto;

import lombok.Data;

@Data
public class MisUserDTO {
    private String username;
    private String name;
    private String sex;
    private String tel;
    private String email;
    private String job;
    private Byte status;
    private String createTime;
}
