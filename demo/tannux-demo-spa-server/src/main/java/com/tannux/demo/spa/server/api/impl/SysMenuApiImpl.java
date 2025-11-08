package com.tannux.demo.spa.server.api.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.tannux.action.web.pm.ListCondition;
import com.tannux.action.web.pm.ParameterMap;
import com.tannux.action.web.pm.TreeCondition;
import com.tannux.demo.spa.server.api.SysMenuApi;
import com.tannux.demo.spa.server.bean.CSysMenu;
import com.tannux.demo.spa.server.bean.SysMenu;
import com.tannux.demo.spa.server.peer.SysMenuPeer;
import com.tannux.platform.sys.beans.bean.TreeNode;

public class SysMenuApiImpl implements SysMenuApi {

	
	@Autowired
	SysMenuPeer menuPeer;
	
	
	@Override
	public List<TreeNode> queryTree(TreeCondition<CSysMenu> param) {
		return menuPeer.queryTree(param.getAppendAttrs(), param.getCdt(), param.getOrders());
	}
	
	
	
	@Override
	public List<SysMenu> queryList(ListCondition<CSysMenu> param) {
		CSysMenu cdt = param.getCdt();
		String orders = param.getOrders();
		return menuPeer.queryList(cdt, orders);
	}
	

	
	@Override
	public SysMenu queryById(ParameterMap pm) {
		Long id = pm.getLong("id");
		return menuPeer.queryById(id);
	}
	
	
	
	@Override
	public Long saveOrUpdate(SysMenu record) {
		return menuPeer.saveOrUpdate(record);
	}

	
	

	@Override
	public Integer removeById(ParameterMap pm) {
		Long id = pm.getLong("id");
		return menuPeer.removeById(id);
	}
	
	
	
	
	
	
	
}
