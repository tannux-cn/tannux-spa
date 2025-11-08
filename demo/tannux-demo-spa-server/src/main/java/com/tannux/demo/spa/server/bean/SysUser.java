package com.tannux.demo.spa.server.bean;

import com.tannux.core.bean.Comment;
import com.tannux.jdbc.DBType;
import com.tannux.preglacial.mapping.annotation.Column;

public class SysUser implements EntityBean {
	private static final long serialVersionUID = 1L;


	@Comment("ID")
	@Column(name="ID", type=DBType.DECIMAL)
	private Long id;


	@Comment("操作员编码")
	@Column(name="USER_CODE", type=DBType.VARCHAR)
	private String userCode;


	@Comment("操作员姓名")
	@Column(name="USER_NAME", type=DBType.VARCHAR)
	private String userName;


	@Comment("性别, 1=男 2=女")
	@Column(name="SEX", type=DBType.DECIMAL)
	private Integer sex;

	@Comment("生日")
	@Column(name="BIRTHDAY", type=DBType.DECIMAL)
	private Integer birthday;


	@Comment("登录编号")
	@Column(name="LOGIN_CODE", type=DBType.VARCHAR)
	private String loginCode;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getUserCode() {
		return userCode;
	}


	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public Integer getSex() {
		return sex;
	}


	public void setSex(Integer sex) {
		this.sex = sex;
	}


	public Integer getBirthday() {
		return birthday;
	}


	public void setBirthday(Integer birthday) {
		this.birthday = birthday;
	}


	public String getLoginCode() {
		return loginCode;
	}


	public void setLoginCode(String loginCode) {
		this.loginCode = loginCode;
	}


	
	
	

}
