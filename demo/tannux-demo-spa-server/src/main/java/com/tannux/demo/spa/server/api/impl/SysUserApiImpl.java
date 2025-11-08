package com.tannux.demo.spa.server.api.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.tannux.action.web.pm.ListCondition;
import com.tannux.action.web.pm.ParameterMap;
import com.tannux.demo.spa.server.api.SysUserApi;
import com.tannux.demo.spa.server.bean.CSysUser;
import com.tannux.demo.spa.server.bean.SysUser;
import com.tannux.demo.spa.server.peer.SysUserPeer;

public class SysUserApiImpl implements SysUserApi {
	
	
	@Autowired
	SysUserPeer userPeer;
	
	
	
	@Override
	public List<SysUser> queryList(ListCondition<CSysUser> param) {
		CSysUser cdt = param.getCdt();
		List<SysUser> list = userPeer.queryList(cdt, param.getOrders());
		return list;
	}
	
	
	
	
	@Override
	public SysUser queryById(ParameterMap pm) {
		Long id = pm.getLong("id");
		SysUser op = userPeer.queryById(id);
		return op;
	}
	
	
	
	@Override
	public Long saveOrUpdate(SysUser record) {
		return userPeer.saveOrUpdate(record);
	}
	
	
	
	@Override
	public Integer removeById(ParameterMap pm) {
		Long id = pm.getLong("id");
		return userPeer.removeById(id);
	}
	
	
	

}
