package com.tannux.demo.spa.server.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tannux.action.web.rp.ErrorCode;
import com.tannux.action.web.rp.RemoteResult;
import com.tannux.core.json.JSON;
import com.tannux.demo.spa.server.utils.TokenUtils;
import com.tannux.framework.auth.User;
import com.tannux.framework.exception.ValidateLoginException;
import com.tannux.framework.web.filter.TannuxFilterTemplate;

public class LoginValidateFilter extends TannuxFilterTemplate {

	
	/** 无需登录地址 **/
	private final Set<String> ignorePaths = new HashSet<String>();
	
	
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		ignorePaths.add("/login.html");
		ignorePaths.add("/api/form/sys/auth/login");
		ignorePaths.add("/api/rest2/sys/auth/getPageConfig");
	}

	
	
	@Override
	public void doFilter(ServletRequest requ, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest)requ;
		HttpServletResponse response = (HttpServletResponse)resp;
		String uri = request.getRequestURI();
		String contextPath = request.getContextPath();
		if(uri.startsWith(contextPath)) {
			uri = uri.substring(contextPath.length());
		}
		
		if(ignorePaths.contains(uri)) {
			chain.doFilter(request, response);
			return ;
		}
		
		//验证登录
		boolean ba = verifyLogin(request);
		if(!ba) {
			RemoteResult rs = new RemoteResult(false, ErrorCode.NOT_LOGIN.getCode(), " must be login! ");
			try {
				PrintWriter pw = response.getWriter();
				pw.write(JSON.toString(rs));
				pw.flush();
			}catch(IOException e) {
				throw new ValidateLoginException(e);
			}
			return ;
		}
		chain.doFilter(request, response);
	}

	
	
	protected boolean verifyLogin(HttpServletRequest request) {
		User user = TokenUtils.getLoginUser(request);
		return user != null;
	}
	
	
	
	@Override
	public void destroy() {
	}

	
	
	
}
