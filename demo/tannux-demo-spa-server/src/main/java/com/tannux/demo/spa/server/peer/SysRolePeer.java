package com.tannux.demo.spa.server.peer;

import java.util.List;

import com.tannux.demo.spa.server.bean.CSysRole;
import com.tannux.demo.spa.server.bean.SysRole;

public interface SysRolePeer {
	
	
	
	/**
	 * 不分页查询
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public List<SysRole> queryList(CSysRole cdt, String orders);
	
	

	/**
	 * 跟据主键查询
	 * @param id : 主键ID
	 * @return 
	 */
	public SysRole queryById(Long id);
	
	
	
	
	/**
	 * 保存获更新
	 * @param record : SysRole数据记录
	 * @return 当前记录主键[id]值
	 */
	public Long saveOrUpdate(SysRole record);
	
	
	
	/**
	 * 删除角色
	 * @param roleId
	 * @return 是否删除   1=删除成功    0=删除失败
	 */
	public Integer removeById(Long roleId);
	
	
	/**
	 * 获取角色所对应的菜单ID
	 */
	public Long[] getRoleMenuIds(Long roleId);
	
	
	/**
	 * 获取角色所对应的用户ID
	 */
	public Long[] getRoleUserIds(Long roleId);
	
	
	
	/**
	 * 根据用户ID获取对应的菜单ID
	 * @param userId
	 * @return
	 */
	public Long[] getMenuIdsByUserId(Long userId);
	
	
	
	/**
	 * 设置角色所对应的菜单
	 */
	public void setRoleMenuIds(Long roleId, Long[] menuIds);
	
	
	
	/**
	 * 设置角色所对应的用户
	 */
	public void setRoleUserIds(Long roleId, Long[] userIds);
	
	
	
	
	
	
	

}
