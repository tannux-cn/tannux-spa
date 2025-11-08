package com.tannux.demo.spa.server.web;

import javax.servlet.http.HttpServletRequest;

import com.tannux.action.ActionEvent;
import com.tannux.action.web.WebActionEvent;
import com.tannux.demo.spa.server.utils.TokenUtils;
import com.tannux.framework.Local;
import com.tannux.framework.auth.User;
import com.tannux.framework.tannux.TannuxActionServlet;

public class TannuxDemoServlet extends TannuxActionServlet {
	private static final long serialVersionUID = 1L;
	
	
	
	@Override
	public boolean before(ActionEvent evt) throws Throwable {
		super.before(evt);
		
		WebActionEvent we = (WebActionEvent)evt;
		HttpServletRequest request = we.getRequest();
		User user = (User)TokenUtils.getLoginUser(request);
		
		if(user != null) {
			Local.getCriticalObject().setUser(user);
		}
		return true;
	}




}
