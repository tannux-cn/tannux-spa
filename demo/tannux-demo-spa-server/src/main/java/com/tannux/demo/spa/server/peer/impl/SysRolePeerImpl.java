package com.tannux.demo.spa.server.peer.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tannux.core.exception.MessageException;
import com.tannux.core.json.JSON;
import com.tannux.core.lang.ArrayUtils;
import com.tannux.core.util.TannuxUtils;
import com.tannux.demo.spa.server.bean.CSysRole;
import com.tannux.demo.spa.server.bean.SysRole;
import com.tannux.demo.spa.server.peer.SysRolePeer;
import com.tannux.framework.util.FrameUtils;

public class SysRolePeerImpl extends AbstractPeer<SysRole> implements SysRolePeer {
	private static final Logger logger = LoggerFactory.getLogger(SysRolePeerImpl.class);
	
	@Override
	protected Class<SysRole> getEntityClass() {
		return SysRole.class;
	}
	
	
	@Override
	public List<SysRole> queryList(CSysRole cdt, String orders) {
		//演示环境为缓存, 条件就不处理了
		logger.info("查询条件 : " + JSON.toString(cdt));
		return getData();
	}
	
	
	@Override
	public SysRole queryById(Long id) {
		return queryById(id, false);
	}
	
	
	protected SysRole queryById(Long id, boolean verify) {
		FrameUtils.checkEmpty(id, "角色ID");
		SysRole role = get(id);
		if(verify && role==null) {
			throw new MessageException("角色["+id+"]不存在.");
		}
		return role;
	}

	
	
	@Override
	public Long saveOrUpdate(SysRole record) {
		return set(record);
	}

	
	
	
	@Override
	public Integer removeById(Long roleId) {
		FrameUtils.checkEmpty(roleId, "角色ID");
		return remove(roleId);
	}
	
	
	
	
	
	@Override
	public Long[] getRoleMenuIds(Long roleId) {
		SysRole role = queryById(roleId, true);
		return role.getMenuIds();
	}
	
	
	@Override
	public Long[] getRoleUserIds(Long roleId) {
		SysRole role = queryById(roleId, true);
		return role.getUserIds();
	}
	
	
	@Override
	public Long[] getMenuIdsByUserId(Long userId) {
		FrameUtils.checkEmpty(userId, "用户ID");
		Set<Long> menuIds = new HashSet<Long>();
		
		List<SysRole> data = getData();
		if(!TannuxUtils.isEmpty(data)) {
			for(SysRole role : data) {
				Long[] userIds = role.getUserIds();
				
				if(!TannuxUtils.isEmpty(userIds)) {
					for(Long uid : userIds) {
						if(userId.equals(uid)) {
							Long[] mids = role.getMenuIds();
							if(!TannuxUtils.isEmpty(mids)) {
								ArrayUtils.append(menuIds, mids);
							}
							break;
						}
					}
				}
			}
		}
		return menuIds.toArray(new Long[0]);
	}
	
	
	@Override
	public void setRoleMenuIds(Long roleId, Long[] menuIds) {
		FrameUtils.checkEmpty(roleId, "角色ID");
		SysRole role = queryById(roleId, true);
		role.setMenuIds(menuIds);
		saveStore();
	}
	
	
	@Override
	public void setRoleUserIds(Long roleId, Long[] userIds) {
		FrameUtils.checkEmpty(roleId, "角色ID");
		SysRole role = queryById(roleId, true);
		role.setUserIds(userIds);
		saveStore();
	}
	
	
	
	

}
