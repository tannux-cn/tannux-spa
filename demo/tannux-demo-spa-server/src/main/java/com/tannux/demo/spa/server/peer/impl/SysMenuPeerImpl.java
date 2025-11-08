package com.tannux.demo.spa.server.peer.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tannux.core.json.JSON;
import com.tannux.core.util.TannuxUtils;
import com.tannux.demo.spa.server.bean.CSysMenu;
import com.tannux.demo.spa.server.bean.SysMenu;
import com.tannux.demo.spa.server.peer.SysMenuPeer;
import com.tannux.framework.util.FrameUtils;
import com.tannux.platform.sys.beans.bean.NodeProMapping;
import com.tannux.platform.sys.beans.bean.TreeNode;
import com.tannux.platform.sys.frame.util.ComponentUtil;
import com.tannux.platform.sys.frame.util.TreeNodeHandler;

public class SysMenuPeerImpl extends AbstractPeer<SysMenu> implements SysMenuPeer {
	private static final Logger logger = LoggerFactory.getLogger(SysMenuPeerImpl.class);
	
	
	@Override
	protected Class<SysMenu> getEntityClass() {
		return SysMenu.class;
	}
	
	
	@Override
	public List<TreeNode> queryTree(Boolean appendAttrs, CSysMenu cdt, String orders) {
		//演示环境为缓存, 条件就不处理了
		logger.info("查询条件 : " + JSON.toString(cdt));
		
		Long parentId = null;
		if(cdt != null) {
			parentId = cdt.getParentId();
		}
		
		List<TreeNode> nodes = null;
		List<SysMenu> menus = getData();
		
		//parentId不为空则只查直属子节点
		if(parentId!=null && !TannuxUtils.isEmpty(menus)) {
			Map<Long, List<SysMenu>>  parentMap = TannuxUtils.toObjectGroupMap(menus, "parentId");
			menus = parentMap.get(parentId);
			if(menus == null) menus = new ArrayList<SysMenu>();
			
			for(SysMenu menu : menus) {
				List<SysMenu> cs = parentMap.get(menu.getId());
				int leaf = TannuxUtils.isEmpty(cs) ? 1 : 0;
				menu.setIsLeaf(leaf);
			}
		}
		
		if(!TannuxUtils.isEmpty(menus)) {
			nodes = ComponentUtil.toTreeNodeList(menus, true, new NodeProMapping[] {
					new NodeProMapping("id", "id"),
					new NodeProMapping("text", "menuName"),
					new NodeProMapping("icon", "menuImg"),
					new NodeProMapping("parentId", "parentId"),
					new NodeProMapping("leaf", "isLeaf")
			}, new TreeNodeHandler<SysMenu>() {
				public void handle(TreeNode node, SysMenu record) {
					String icon = record.getMenuImg();
					if(TannuxUtils.isEmpty(icon)) {
						node.setIcon("fa fa-circle fa-sm");
					}
				}
			});
		}
		
		//parentId为空表示查整棵树
		if(parentId == null) {
			nodes = ComponentUtil.toTreeStruct(nodes, "0");
		}
		if(nodes == null) nodes = new ArrayList<TreeNode>();
		return nodes;
	}
	
	
	
	@Override
	public List<SysMenu> queryList(CSysMenu cdt, String orders) {
		//演示环境为缓存, 条件就不处理了
		logger.info("查询条件 : " + JSON.toString(cdt));
		return getData();
	}
	
	

	@Override
	public SysMenu queryById(Long id) {
		FrameUtils.checkEmpty(id, "菜单ID");
		return get(id);
	}

	
	@Override
	public List<SysMenu> queryByIds(Long[] ids) {
		FrameUtils.checkEmpty(ids, "菜单ID");
		return gets(ids);
	}
	
	
	@Override
	public Long saveOrUpdate(SysMenu record) {
		Long id = record.getId();
		Long parentId = record.getParentId();
		if(id==null && parentId==null) {
			record.setParentId(0L);
		}
		return set(record);
	}

	@Override
	public Integer removeById(Long id) {
		FrameUtils.checkEmpty(id, "菜单ID");
		return remove(id);
	}

	
	
	
	
}
