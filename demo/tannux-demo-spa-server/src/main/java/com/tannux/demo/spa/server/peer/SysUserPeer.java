package com.tannux.demo.spa.server.peer;

import java.util.List;

import com.tannux.demo.spa.server.bean.CSysUser;
import com.tannux.demo.spa.server.bean.SysUser;

public interface SysUserPeer {
	
	
	
	/**
	 * 查询
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return
	 */
	public List<SysUser> queryList(CSysUser cdt, String orders);
	
	

	/**
	 * 跟据主键查询
	 * @param id : 主键ID
	 * @return
	 */
	public SysUser queryById(Long id);
	
	
	
	/**
	 * 跟据登录代码查询用户
	 * @param loginCode
	 * @return
	 */
	public SysUser queryByLoginCode(String loginCode);
	
	
	
	/**
	 * 保存获更新
	 * @return 当前记录主键[id]值
	 */
	public Long saveOrUpdate(SysUser record);
	
	
	
	
	/**
	 * 删除
	 */
	public Integer removeById(Long id);
	
	
	
	
	
	

}
