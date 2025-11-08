

/**
 * 前端应用配置
 * 牵扯到需要访问后端数据的配置, 在请求后端时, 后端接口返回格式统一为:
 * {success:true|false, code:状态码(0=成功), message:"异常信息", errorType:"异常类型", data:结果数据}
 */
var AppConfig = {
	
	
	
	/**
	 * 配置地址, 客户端中的参数集中统一由后端维护, 页面每次刷新会重新获取配置
	 * 调用接口返回一个对象, 对象中的属性都会被统一处理为全局属性, 所以避免冲突一般属性名全部为大写
	 * 其中前端框架中会用到的固定参数需要后端提供:
	 * config : {
	 * 		PRODUCT_NAME : 产品名称
	 * 		HOME_MENU_CODE : 主页菜单编号
	 * 		SSO_LOGIN_URL : 登录地址, 前端在请求服务端数据时
	 * 						如果是response.status==401或者result.code==401, 则页面自动跳至sso登录页, 默认跳转步骤:
	 * 						1. 跳至SSO, 带上参数callbackUrl, callbackUrl默认为: tannux-spa-jump.html
	 * 						2. SSO登录成功后, 跳至callbackUrl, SSO服务端需带上参数token
	 * 						3. callbackUrl页面拿到token之后, 做隐性登录后, 再跳至系统页面
	 * 						中间加一个tannux-spa-jump.html页面目地是为了避免在导航出现系统之间的集成参数, 第三方系统跳至本系统应该也应跳至中间页
	 * 						如果是想自己定义与sso的交互过程, 可重写CC.logout()函数
	 * 		SU: 当前登录用户基本信息, {loginCode:"登录代码", userCode:"用户编号", userName:"用户名称"}
	 * 		PERMITS: 用户权限, [menu...], menu对象中menuCode不能为空, menuName,menuImg不为空时则覆盖AppConfig中的menus中的属性, menuOpts为用户对菜单的操作权限
	 * 		DROP: 系统中用到的字典数据, {"字典名称":[{code:"",name:""}...]}
	 * 		OPEN_AUTH: 是否开启权限控制, true|false, 为true时:开启权限控制, configUrl结果中应包含PERMITS, 如果没有则当前用户没有菜单权限; 为false时:不做权限控制, configUrl结果中的PERMITS被忽略, 缺省为false
	 * }
	 * 如果访问此地址需要用户认证, 则会自动跳至登录页, 如果不需要用户认证则不会跳至登录
	 */
	configUrl : "http://localhost:8080/tannux-demo-spa-server/api/rest2/sys/auth/getPageConfig",
	
	
	
	/**
	 * 系统所有页面的定义, [{},{}...{}]
	 * menuUrl指向的js文件, 里面的类名需与文件名一至, 允许不同的菜单共用一个js文件, js可通过?a=1&b=2参数方式传递给init函数, 共用js时不同的菜单是不同的菜单对象实例
	 * 菜单如果是被弹出时:openMenu(),调用函数如果传入了参数, 会与菜单定义参数合并, 同名时函数参数会覆盖菜单定义参数
	 * 菜单每次打开都会重构菜单对象, 关闭时会销毁对象及页面元素 
	 *	menu : {
	 *		menuCode:String, 	//页面编号,与系统权限配置中的菜单编号统一, 必须
	 *		parentCode:String, 	//上级编号,顶级为0, 必须
	 *		menuName:String, 	//菜单名称, 必须
	 *	 	menuType:Integer	//菜单类型, 1=系统菜单(当前用户是admin时不做权限控制), 2=普通菜单, 3=非权限控制菜单, 缺省为2
	 *		isDisp : Integer	//0|1, 是否显示菜单, 0=不显示, 1=显示, 缺省为1
	 *		menuUrl:String,		//页面JS地址, 必须, 注:文件名需与类名一至, 所以文件名是全局唯一
	 *		menuImg:String, 	//菜单图标， 可以是图片地址
	 *	}
	 */
	menus : [
		{menuCode:'1001', parentCode:'0', menuName:'主页', menuImg:'fa fa-home', menuType:3, menuUrl:'../../pages/home/Home.js?a=1&b=2&c=3'},
		
		{menuCode:'1086', parentCode:'0', menuName:'系统管理', menuImg:'fa fa-bolt'},
		{menuCode:'108601', parentCode:'1086', menuName:'系统菜单', menuImg:'fa fa-bars', menuUrl:'../../pages/sys/SysMenu.js'},
		{menuCode:'108603', parentCode:'1086', menuName:'岗位角色', menuImg:'fa fa-credit-card', menuUrl:'../../pages/sys/SysRoleList.js'},
		{menuCode:'10860301', parentCode:'108603', menuName:'岗位角色表单', isDisp:0, menuType:3, menuUrl:'../../pages/sys/SysRoleForm.js'},
		{menuCode:'108624', parentCode:'1086', menuName:'系统用户', menuImg:'fa fa-user', menuUrl:'../../pages/sys/SysUserList.js'},
		{menuCode:'10862401', parentCode:'108624', menuName:'系统用户表单', isDisp:0, menuType:3, menuUrl:'../../pages/sys/SysUserForm.js'}
	],
	
	
};


/** 页面初始化之前事件 **/
function beforeInitPage() {
	
	/**
	 * 弹出窗口选择菜单组件
	 */
	CC.showMenuSelectWin = function(cfg) {
		PU.showTreeSelectWin({addroot:DC, url:"/sys/menu/queryTree", name:"SELECT_MENU_WIN", single:cfg.single, cascadeParent:cfg.cascadeParent, reload:true, appendAttrs:cfg.appendAttrs, title:"选择菜单", cb:cfg.cb, 
			beforeParams : function(node, ps, tree) {
				  if(CU.isEmpty(ps.cdt)) ps.cdt = {};
				  if(!CU.isEmpty(cfg.cdt)) $.extend(ps.cdt, cfg.cdt);
	 		}
		});
	};
	
	/**
	 * 弹出窗口选择用户组件
	 * @param {} cfg
	 * 		cdt: {} 条件
	 * 		single : 是否单选
	 * 		cb: callback(array, grid)
	 */
	CC.showUserSelectWin = function(cfg) {
		if(CU.isEmpty(cfg)) cfg = {};
		PU.showGridSelectWin({addroot:DC, url : "/sys/user/queryList", name : "SELECT_OP_WIN", single : cfg.single, reload : true, title : "选择用户", width : 900, height : 400, cb : cfg.cb,
	  		columns : [
	  			  {title:"用户编码", data:"userCode", align:"center", width:100, cdtable:true},
		          {title:"用户姓名", data:"userName", align:"center", width:100},
		          {title:"性别", data:"sex", align:"center", width:100, cdtable:true, ctype:"enum", view:"V_SEX"},
		          {title:"生日", data:"birthday", align:"center", width:200, format:"date"},
		          {title:"登录账号", data:"loginCode", align:"center", width:100},
	  		],
	  		dataIdField : function(row) {return row.id},
			dataCode : "id", 
			dataName : "userName",
			beforeParams : function(ps, grid) {
				  if(CU.isEmpty(ps.cdt)) ps.cdt = {};
				  if(!CU.isEmpty(cfg.cdt)) $.extend(ps.cdt, cfg.cdt);
	 		}
		});
	};
}




