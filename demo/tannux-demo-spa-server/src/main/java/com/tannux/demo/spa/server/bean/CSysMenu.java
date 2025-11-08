package com.tannux.demo.spa.server.bean;

import com.tannux.core.bean.Comment;

public class CSysMenu {
	

	@Comment("ID, OP.Equal")
	private Long id;


	@Comment("ID, OP.In")
	private Long[] ids;


	@Comment("ID, OP.NotIn")
	private Long[] notIds;
	
	
	@Comment("PARENT_ID, OP.Equal")
	private Long parentId;


	@Comment("搜索字段, 菜单代码、菜单名称、菜单描述、关联代码, OP.Like")
	private String searchFieldFuzzy;


	
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Long[] getIds() {
		return ids;
	}


	public void setIds(Long[] ids) {
		this.ids = ids;
	}


	public Long[] getNotIds() {
		return notIds;
	}


	public void setNotIds(Long[] notIds) {
		this.notIds = notIds;
	}


	public String getSearchFieldFuzzy() {
		return searchFieldFuzzy;
	}


	public void setSearchFieldFuzzy(String searchFieldFuzzy) {
		this.searchFieldFuzzy = searchFieldFuzzy;
	}


	public Long getParentId() {
		return parentId;
	}


	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}


	
	
	

}
