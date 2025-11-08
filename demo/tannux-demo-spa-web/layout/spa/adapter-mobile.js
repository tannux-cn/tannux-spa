

/**
 * 参数说明同adapter-pc.js
 * @type 
 */
var AppConfig = {
	
	
	/**
	 * 参数配置, 说明参见adapter-pc.js
	 * @type String
	 */
	configUrl : "http://localhost:8080/tannux-demo-spa-server/api/rest2/sys/auth/getPageConfig",
	
	
	
	/**
	 * 菜单地址, 与PC端不同的是:移动端不做菜单权限控制
	 * 默认一级菜单(parentCode=0)会做为底部菜单，其他菜单都是做为弹窗存在
	 * 一级菜单图标切换：如果是iconfont图标, 可设置菜单点击状态样式menu-active，如果是图片, menuImg为未点中图标, 需再配置属性activeImg表示点中图标
	 */
	menus : [
		{menuCode:'1001', parentCode:'0', menuName:'首页', menuImg:'fa fa-home fa-lg', menuUrl:'../../pages/mobile/Home.js?a=1&b=2&c=3'},
		{menuCode:'1002', parentCode:'0', menuName:'用户', menuImg:'fa fa-users fa-lg', menuUrl:'../../pages/mobile/SysUserList.js'},
		{menuCode:'100201', parentCode:'1002', menuName:'用户表单', menuUrl:'../../pages/mobile/SysUserForm.js'},
		{menuCode:'1003', parentCode:'0', menuName:'角色', menuImg:'fa fa-credit-card fa-lg', menuUrl:'../../pages/mobile/SysRoleList.js'},
		{menuCode:'1004', parentCode:'0', menuName:'我的', menuImg:'../../layout/imgs/user-grey.png', activeImg:"../../layout/imgs/user.png", menuUrl:'../../pages/mobile/UserMain.js'},
	]
	
	
	
	
}


