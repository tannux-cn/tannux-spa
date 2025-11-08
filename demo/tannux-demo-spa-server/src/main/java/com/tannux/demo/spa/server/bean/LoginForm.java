package com.tannux.demo.spa.server.bean;

import com.tannux.core.bean.Comment;
import com.tannux.core.http.Form;

public class LoginForm implements Form {
	private static final long serialVersionUID = 1L;
	
	
	@Comment("登录账号")
	private String loginCode;
	
	@Comment("登录密码")
	private String password;
	
	
	@Comment("登录成功后跳转页面")
	private String callbackUrl;
	
	
	

	public String getLoginCode() {
		return loginCode;
	}

	public void setLoginCode(String loginCode) {
		this.loginCode = loginCode;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCallbackUrl() {
		return callbackUrl;
	}

	public void setCallbackUrl(String callbackUrl) {
		this.callbackUrl = callbackUrl;
	}
	
	
	
	
	

}
