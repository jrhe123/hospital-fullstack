package com.example.hospital.patient.wx.api.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.hospital.patient.wx.api.exception.HospitalException;
import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Component
public class SMSUtils {
	
	@Value("${twilio.number}")
	private String twilioAccountNumber;
	
	@Value("${twilio.sid}")
	private String twilioAccountSid;

	@Value("${twilio.token}")
	private String twilioAuthToken;
	
	public void sendSMS(String tel, String code) {
		try {
			Twilio.init(twilioAccountSid, twilioAuthToken);
	        Message.creator(
	        		new PhoneNumber(tel),
	                new PhoneNumber(twilioAccountNumber), 
	                "Verification code: " + code
	                ).create();
		} catch (ApiException e) {
			throw new HospitalException("Twilio api error");
		}
	}
	

}
