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
import com.tannux.demo.spa.server.bean.CSysRole;
import com.tannux.demo.spa.server.bean.SysRole;

@Api("系统角色服务")
@Compass("/sys/role")
public interface SysRoleApi {
	
	
	
	@Api("不分页查询")
	@Raw(V="查询参数")
	@Return(V="结果列表")
	public List<SysRole> queryList(ListCondition<CSysRole> param);
	
	
	
	@Api("跟据主键查询")
	@Params({
		@Param(N="id", T=Long.class, V="角色ID")
	})
	@Return(V="角色信息")
	public SysRole queryById(ParameterMap pm);
	
	
	
	
	@Api("保存获更新")
	@Raw(V="数据记录")
	@Return(V="当前记录主键[id]值")
	public Long saveOrUpdate(SysRole record);
	
	
	
	@Api("跟据主键删除")
	@Params({
		@Param(N="id", T=Long.class, V="角色ID")
	})
	@Return(V="删除记录数")
	public Integer removeById(ParameterMap pm);
	
	
	
	@Api("获取角色所对应的菜单ID")
	@Params({
		@Param(N="roleId", T=Long.class, V="角色ID")
	})
	@Return(V="菜单ID")
	public Long[] getRoleMenuIds(ParameterMap pm);
	
	
	@Api("获取角色所对应的用户ID")
	@Params({
		@Param(N="roleId", T=Long.class, V="角色ID")
	})
	@Return(V="用户ID")
	public Long[] getRoleUserIds(ParameterMap pm);
	
	
	
	
	@Api("设置角色所对应的菜单")
	@Params({
		@Param(N="roleId", T=Long.class, V="角色ID"),
		@Param(N="menuIds", T=Long[].class, V="菜单ID")
	})
	public void setRoleMenuIds(ParameterMap pm);
	
	
	
	@Api("设置角色所对应的用户")
	@Params({
		@Param(N="roleId", T=Long.class, V="角色ID"),
		@Param(N="userIds", T=Long[].class, V="用户ID")
	})
	public void setRoleUserIds(ParameterMap pm);
	
	
	
	
	
	

}
