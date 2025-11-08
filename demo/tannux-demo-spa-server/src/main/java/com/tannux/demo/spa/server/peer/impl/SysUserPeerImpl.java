package com.tannux.demo.spa.server.peer.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tannux.core.json.JSON;
import com.tannux.demo.spa.server.bean.CSysUser;
import com.tannux.demo.spa.server.bean.SysUser;
import com.tannux.demo.spa.server.peer.SysUserPeer;
import com.tannux.framework.util.FrameUtils;

public class SysUserPeerImpl extends AbstractPeer<SysUser> implements SysUserPeer {
	private static final Logger logger = LoggerFactory.getLogger(SysUserPeerImpl.class);
	
	
	
	@Override
	protected Class<SysUser> getEntityClass() {
		return SysUser.class;
	}
	

	@Override
	public List<SysUser> queryList(CSysUser cdt, String orders) {
		//演示环境为缓存, 条件就不处理了
		logger.info("查询条件 : " + JSON.toString(cdt));
		return getData();
	}

	
	
	@Override
	public SysUser queryById(Long id) {
		FrameUtils.checkEmpty(id, "用户ID");
		return get(id);
	}
	
	
	
	
	
	@Override
	public SysUser queryByLoginCode(String loginCode) {
		FrameUtils.checkEmpty(loginCode, "登录账号");
		loginCode = loginCode.trim();
		
		SysUser loginUser = null;
		List<SysUser> list = getData();
		for(SysUser user : list) {
			if(loginCode.equals(user.getLoginCode())) {
				loginUser = user;
				break;
			}
		}
		return loginUser;
	}

	
	
	@Override
	public Long saveOrUpdate(SysUser record) {
		return set(record);
	}
	
	
	

	@Override
	public Integer removeById(Long id) {
		FrameUtils.checkEmpty(id, "用户ID");
		return remove(id);
	}
	
	
	
	

}
