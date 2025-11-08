package com.tannux.demo.spa.server.api.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.tannux.action.web.forward.Forward;
import com.tannux.action.web.forward.support.SimpleForward;
import com.tannux.action.web.pm.ParameterMap;
import com.tannux.core.http.URLResolver;
import com.tannux.core.i18n.Language;
import com.tannux.core.util.TannuxUtils;
import com.tannux.demo.spa.server.api.AuthApi;
import com.tannux.demo.spa.server.bean.LoginForm;
import com.tannux.demo.spa.server.bean.SysMenu;
import com.tannux.demo.spa.server.bean.SysUser;
import com.tannux.demo.spa.server.peer.SysMenuPeer;
import com.tannux.demo.spa.server.peer.SysRolePeer;
import com.tannux.demo.spa.server.peer.SysUserPeer;
import com.tannux.demo.spa.server.utils.TokenUtils;
import com.tannux.framework.Local;
import com.tannux.framework.auth.User;
import com.tannux.framework.auth.support.SimpleUser;
import com.tannux.framework.tannux.TannuxFrameworkConfiguration;

public class AuthApiImpl implements AuthApi {
	
	@Autowired
	TannuxFrameworkConfiguration configuration;

	@Autowired
	SysUserPeer userPeer;
	
	@Autowired
	SysRolePeer rolePeer;
	
	@Autowired
	SysMenuPeer menuPeer;
	
	
	@Override
	public Forward login(LoginForm form) {
		Forward forward = null;
		String message = null;
		String loginCode = form.getLoginCode();
		String callbackUrl = form.getCallbackUrl();
		if(TannuxUtils.isEmpty(loginCode)) {
			message = "请输入用户账号.";
		}
		if(message==null && TannuxUtils.isEmpty(callbackUrl)) {
			message = "登录成功回调地址为空, 无法登录.";
		}
		if(callbackUrl.indexOf('%') >= 0) {
			callbackUrl = URLResolver.decode(callbackUrl);
		}
		
		if(message == null) {
			loginCode = loginCode.trim();
			
			SysUser user = userPeer.queryByLoginCode(loginCode);
			User loginUser = null;
			
			if(user != null) {
				loginUser = toLoginUser(user);
			}
			
			//admin自动登录
			if(loginUser==null || loginCode.equals("admin")) {
				loginUser = getAdminUser();
			}
			
			if(loginUser == null) {
				message = "用户不存在.";
			}else {
				//登录成功
				String token = TokenUtils.encodeToken(loginUser);
				String url = callbackUrl;
				url += (url.indexOf('?')<0 ? '?' : '&') + "token=" + token;
				forward = new SimpleForward(url, true);
			}
		}
		
		//没有登录成功则继续登录
		if(forward == null) {
			String url = "/login.html?callbackUrl=" + URLResolver.encode(callbackUrl);
			if(message != null) {
				url += "&msg=" + URLResolver.encode(message);
			}
			forward = new SimpleForward(url, true);
		}
		return forward;
	}
	
	
	
	
	protected User toLoginUser(SysUser user) {
		SimpleUser u = new SimpleUser();
		u.setId(user.getId());
		u.setLoginCode(user.getLoginCode());
		u.setUserCode(user.getUserCode());
		u.setUserName(user.getUserName());
		u.setLanguage(Language.ZHC);
		return u;
	}
	
	
	
	protected User getAdminUser() {
		SimpleUser u = new SimpleUser();
		u.setId(0L);
		u.setLoginCode("admin");
		u.setUserCode("1001");
		u.setUserName("系统管理员");
		u.setLanguage(Language.ZHC);
		return u;
	}
	
	
	
	
	
	@Override
	public Map<String, Object> getPageConfig(ParameterMap pm) {
		User user = Local.getUser(false);
		Map<String, Object> config = new HashMap<String, Object>();
		config.put("PRODUCT_NAME", configuration.getProductName());
		config.put("HOME_MENU_CODE", configuration.getHomeMenuCode());
		config.put("SSO_LOGIN_URL", configuration.getVarValue("tannux.demo.spa.loginUrl"));
		config.put("SU", user);
		config.put("DROP", configuration.getDictionary().getData());
		
		String api = configuration.getVarValue("tannux.demo.spa.apiRoot", String.class);
		String dcapi = URLResolver.getUrlContextPath(api);
		
		config.put("SYS", URLResolver.getUrlContextPath(dcapi));
		config.put("DC", dcapi);
		
		boolean openAuth = configuration.isOpenAuth();
		config.put("OPEN_AUTH", openAuth);
		
		//如果开启权限控制, 则传递菜单权限参数
		if(openAuth && user!=null) {
			Long[] menuIds = rolePeer.getMenuIdsByUserId(user.getId());
			if(!TannuxUtils.isEmpty(menuIds)) {
				List<SysMenu> menus = menuPeer.queryByIds(menuIds);
				config.put("PERMITS", menus);
			}
		}
		return config;
	}
	
	
	
	
	
}
