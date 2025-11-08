package com.tannux.demo.spa.server.api;

import java.util.List;

import com.tannux.action.api.Api;
import com.tannux.action.api.Param;
import com.tannux.action.api.Params;
import com.tannux.action.api.Raw;
import com.tannux.action.api.Return;
import com.tannux.action.web.pm.ListCondition;
import com.tannux.action.web.pm.ParameterMap;
import com.tannux.action.web.pm.TreeCondition;
import com.tannux.compass.definition.annotation.Compass;
import com.tannux.demo.spa.server.bean.CSysMenu;
import com.tannux.demo.spa.server.bean.SysMenu;
import com.tannux.platform.sys.beans.bean.TreeNode;

@Api("系统菜单服务")
@Compass("/sys/menu")
public interface SysMenuApi {
	
	
	
	@Api("获取菜单树")
	@Raw(V="查询参数")
	@Return(V="树形结构数据")
	public List<TreeNode> queryTree(TreeCondition<CSysMenu> param);
	
	
	
	@Api("不分页查询")
	@Raw(V="查询参数")
	@Return(V="结果列表")
	public List<SysMenu> queryList(ListCondition<CSysMenu> param);
	
	
	
	@Api("根所主键ID查询菜单")
	@Params({
		@Param(N="id", T=Long.class, V="菜单ID")
	})
	@Return(V="菜单信息")
	public SysMenu queryById(ParameterMap pm);
	
	
	
	
	@Api("保存获更新")
	@Raw(V="数据记录")
	@Return(V="当前记录主键[id]值")
	public Long saveOrUpdate(SysMenu record);
	
	
	
	
	@Api("跟据主键删除")
	@Params({
		@Param(N="id", T=Long.class, V="菜单ID")
	})
	@Return(V="删除记录数")
	public Integer removeById(ParameterMap pm);
	
	
	
	
	

}
