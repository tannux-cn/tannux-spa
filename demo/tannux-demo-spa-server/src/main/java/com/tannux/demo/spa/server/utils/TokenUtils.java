package com.tannux.demo.spa.server.utils;

import javax.servlet.http.HttpServletRequest;

import com.tannux.core.encrypt.Encrypt;
import com.tannux.core.json.JSON;
import com.tannux.core.lang.StringUtils;
import com.tannux.core.util.TannuxUtils;
import com.tannux.framework.auth.User;
import com.tannux.framework.auth.support.SimpleUser;

public abstract class TokenUtils {

	
	
	
	/**
	 * 将用户对象转成token
	 * @return
	 */
	public static String encodeToken(User user) {
		String s = JSON.toString(user);
		return Encrypt.byte2String(StringUtils.getBytes(s, "UTF-8"));
	}
	
	
	
	/**
	 * 将token转成用户对象
	 * @param token
	 * @return
	 */
	public static User decodeToken(String token) {
		byte[] data = Encrypt.string2Byte(token);
		String s = StringUtils.valueOf(data, "UTF-8");
		return JSON.toObject(s, SimpleUser.class);
	}
	
	
	
	/**
	 * 获取登录用户
	 * @return
	 */
	public static User getLoginUser(HttpServletRequest request) {
		User user = (User)request.getAttribute("LOGIN_USER");
		
		if(user == null) {
			String token = request.getParameter("token");
			if(TannuxUtils.isEmpty(token)) {
				token = request.getHeader("token");
			}
			
			if(!TannuxUtils.isEmpty(token)) {
				try {
					user = TokenUtils.decodeToken(token);
					if(user != null) {
						request.setAttribute("LOGIN_USER", user);
					}
				}catch(Throwable t) {
					//do nothing
				}
			}
		}
		return user;
	}
	
	
	
	
	
}
