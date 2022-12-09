package com.example.hospital.api.db.dao;

import java.util.ArrayList;
import java.util.Map;

import com.example.hospital.api.db.dto.MisUserDTO;


public interface MisUserDao {
    public ArrayList<String> searchUserPermissions(int userId);
    
    public Integer login(Map param);
    
    public MisUserDTO getUserById(Integer userId);
}




