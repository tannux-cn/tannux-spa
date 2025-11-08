package com.tannux.demo.spa.server.bean;

import com.tannux.core.bean.Comment;
import com.tannux.jdbc.DBType;
import com.tannux.preglacial.mapping.annotation.Column;

public class SysRole implements EntityBean {
	private static final long serialVersionUID = 1L;


	@Comment("ID")
	@Column(name="ID", type=DBType.DECIMAL)
	private Long id;


	@Comment("角色名称")
	@Column(name="ROLE_NAME", type=DBType.VARCHAR)
	private String roleName;


	@Comment("角色描述")
	@Column(name="ROLE_DESC", type=DBType.VARCHAR)
	private String roleDesc;
	
	
	@Comment("角色对应的菜单ID")
	private Long[] menuIds;
	
	
	@Comment("角色对应的菜单ID")
	private Long[] userIds;
	
	


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getRoleName() {
		return roleName;
	}


	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}


	public String getRoleDesc() {
		return roleDesc;
	}


	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}


	public Long[] getMenuIds() {
		return menuIds;
	}


	public void setMenuIds(Long[] menuIds) {
		this.menuIds = menuIds;
	}


	public Long[] getUserIds() {
		return userIds;
	}


	public void setUserIds(Long[] userIds) {
		this.userIds = userIds;
	}


	

}
