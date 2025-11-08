package com.tannux.demo.spa.server.bean;

import java.io.Serializable;

public interface EntityBean extends Serializable {
	
	

	/**
	 * 获取实体对象ID
	 */
	public Long getId();
	
	
	
	/**
	 * 设置实体对象ID
	 * @param id
	 */
	public void setId(Long id);
	
	
}
