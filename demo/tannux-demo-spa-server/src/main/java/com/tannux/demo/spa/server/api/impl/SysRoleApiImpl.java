package com.tannux.demo.spa.server.api.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.tannux.action.web.pm.ListCondition;
import com.tannux.action.web.pm.ParameterMap;
import com.tannux.demo.spa.server.api.SysRoleApi;
import com.tannux.demo.spa.server.bean.CSysRole;
import com.tannux.demo.spa.server.bean.SysRole;
import com.tannux.demo.spa.server.peer.SysRolePeer;

public class SysRoleApiImpl implements SysRoleApi {
	
	
	@Autowired
	SysRolePeer rolePeer;
	
	
	
	@Override
	public List<SysRole> queryList(ListCondition<CSysRole> param) {
		CSysRole cdt = param.getCdt();
		return rolePeer.queryList(cdt, param.getOrders());
	}
	
	

	@Override
	public SysRole queryById(ParameterMap pm) {
		Long id = pm.getLong("id");
		return rolePeer.queryById(id);
	}
	
	
	
	
	
	@Override
	public Long saveOrUpdate(SysRole record) {
		return rolePeer.saveOrUpdate(record);
	}
	
	

	@Override
	public Integer removeById(ParameterMap pm) {
		Long id = pm.getLong("id");
		return rolePeer.removeById(id);
	}
	
	
	
	
	@Override
	public Long[] getRoleMenuIds(ParameterMap pm) {
		Long roleId = pm.getLong("roleId");
		return rolePeer.getRoleMenuIds(roleId);
	}
	
	
	@Override
	public Long[] getRoleUserIds(ParameterMap pm) {
		Long roleId = pm.getLong("roleId");
		return rolePeer.getRoleUserIds(roleId);
	}
	
	
	
	@Override
	public void setRoleMenuIds(ParameterMap pm) {
		Long roleId = pm.getLong("roleId");
		Long[] menuIds = pm.getLongs("menuIds");
		rolePeer.setRoleMenuIds(roleId, menuIds);
	}
	
	
	@Override
	public void setRoleUserIds(ParameterMap pm) {
		Long roleId = pm.getLong("roleId");
		Long[] userIds = pm.getLongs("userIds");
		rolePeer.setRoleUserIds(roleId, userIds);
	}
	
	
	
	

}
