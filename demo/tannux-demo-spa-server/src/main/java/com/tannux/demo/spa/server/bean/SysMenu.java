package com.tannux.demo.spa.server.bean;

import com.tannux.core.bean.Comment;
import com.tannux.jdbc.DBType;
import com.tannux.preglacial.mapping.annotation.Column;

public class SysMenu implements EntityBean {
	private static final long serialVersionUID = 1L;


	@Comment("ID")
	@Column(name="ID", type=DBType.DECIMAL)
	private Long id;


	@Comment("菜单代码")
	@Column(name="MENU_CODE", type=DBType.VARCHAR)
	private String menuCode;


	@Comment("菜单名称")
	@Column(name="MENU_NAME", type=DBType.VARCHAR)
	private String menuName;


	@Comment("上级菜单ID, 第一级统一为0")
	@Column(name="PARENT_ID", type=DBType.DECIMAL)
	private Long parentId;


	@Comment("是否末级, 0=否 1=是")
	@Column(name="IS_LEAF", type=DBType.DECIMAL)
	private Integer isLeaf;


	@Comment("菜单类型, 1=系统管理 2=业务功能 3=工具菜单")
	@Column(name="MENU_TYPE", type=DBType.DECIMAL)
	private Integer menuType;


	@Comment("菜单图标")
	@Column(name="MENU_IMG", type=DBType.VARCHAR)
	private String menuImg;



	public Long getId() {
		return this.id;
	}
	public void setId(Long id) {
		this.id = id;
	}


	public String getMenuCode() {
		return this.menuCode;
	}
	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}


	public String getMenuName() {
		return this.menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}


	public Long getParentId() {
		return this.parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	public Integer getIsLeaf() {
		return this.isLeaf;
	}
	public void setIsLeaf(Integer isLeaf) {
		this.isLeaf = isLeaf;
	}
	public Integer getMenuType() {
		return menuType;
	}
	public void setMenuType(Integer menuType) {
		this.menuType = menuType;
	}
	public String getMenuImg() {
		return menuImg;
	}
	public void setMenuImg(String menuImg) {
		this.menuImg = menuImg;
	}


}
