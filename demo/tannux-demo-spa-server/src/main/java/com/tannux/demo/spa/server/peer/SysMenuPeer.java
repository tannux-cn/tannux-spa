package com.tannux.demo.spa.server.peer;

import java.util.List;

import com.tannux.demo.spa.server.bean.CSysMenu;
import com.tannux.demo.spa.server.bean.SysMenu;
import com.tannux.platform.sys.beans.bean.TreeNode;

public interface SysMenuPeer {
	
	
	/**
	 * 获取菜单结构树
	 */
	public List<TreeNode> queryTree(Boolean appendAttrs, CSysMenu cdt, String orders);
	
	
	/**
	 * 查询列表
	 * @return
	 */
	public List<SysMenu> queryList(CSysMenu cdt, String orders);
	
	
	/**
	 * 根据模块ID获取模块
	 * @param id
	 * @return
	 */
	public SysMenu queryById(Long id);
	
	
	
	/**
	 * 根据模块ID获取模块
	 * @param ids
	 * @return
	 */
	public List<SysMenu> queryByIds(Long[] ids);
	
	

	/**
	 * 保存获更新
	 * @param record : SysMenu数据记录
	 * @return 当前记录主键[id]值
	 */
	public Long saveOrUpdate(SysMenu record);
	
	
	
	/**
	 * 删除菜单
	 * @param id
	 * @return
	 */
	public Integer removeById(Long id);
	
	
	
	

}
