package com.tannux.demo.spa.server.api;

import java.util.Map;

import com.tannux.action.api.Api;
import com.tannux.action.api.Raw;
import com.tannux.action.api.Return;
import com.tannux.action.web.forward.Forward;
import com.tannux.action.web.pm.ParameterMap;
import com.tannux.compass.definition.annotation.Compass;
import com.tannux.demo.spa.server.bean.LoginForm;

@Api("登录服务(登录应由SSO管理, 此处只为演示)")
@Compass("/sys/auth")
public interface AuthApi {
	
	
	@Api("用户登录")
	@Raw(V="用户信息")
	@Return(V="成功则跳至回调页, 失败则继续跳至登录页")
	public Forward login(LoginForm form);
	
	
	
	
	@Api("获取前端配置参数")
	@Return(V="配置参数")
	public Map<String, Object> getPageConfig(ParameterMap pm);
	
	
	
	

}
