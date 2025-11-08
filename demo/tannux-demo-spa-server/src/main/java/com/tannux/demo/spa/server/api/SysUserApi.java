package com.tannux.demo.spa.server.api;

import java.util.List;

import com.tannux.action.api.Api;
import com.tannux.action.api.Param;
import com.tannux.action.api.Params;
import com.tannux.action.api.Raw;
import com.tannux.action.api.Return;
import com.tannux.action.web.pm.ListCondition;
import com.tannux.action.web.pm.ParameterMap;
import com.tannux.compass.definition.annotation.Compass;
import com.tannux.demo.spa.server.bean.CSysUser;
import com.tannux.demo.spa.server.bean.SysUser;

@Api("系统用户服务")
@Compass("/sys/user")
public interface SysUserApi {

	
	@Api("分页查询")
	@Raw(V="分页查询参数")
	@Return(V="分页结果列表")
	public List<SysUser> queryList(ListCondition<CSysUser> param);
	
	
	
	@Api("跟据主键查询")
	@Params({
		@Param(N="id", T=Long.class, V="用户ID")
	})
	@Return(V="用户信息")
	public SysUser queryById(ParameterMap pm);
	
	
	
	@Api("保存获更新")
	@Raw(V="数据记录")
	@Return(V="当前记录主键[id]值")
	public Long saveOrUpdate(SysUser record);
	
	
	
	@Api("跟据主键删除指定域")
	@Params({
		@Param(N="id", T=Long.class, V="用户ID")
	})
	@Return(V="删除记录数")
	public Integer removeById(ParameterMap pm);
	
	
	
}
