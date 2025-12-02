/*!
 * tannux-spa v1.0.0 (http://tannux.com)
 * Copyright 2024-2025 Tannux Technology Co., LTD
 * Licensed under the Apache License, Version 2.0.
 */

var MENU_DATA = {};				//key=menuCode, value=treeNode
var FIRST_MENUS = [];			//一级菜单
var CURRENT_MENU = null;		//当前菜单
var POP_MENU_STACK = [];		//弹出窗口


/** 页面框架初始化之前事件 **/
function beforeInitLayout() {
}

/** 页面框架初始化之后事件 **/
function afterInitLayout() {
}


/** 页面数据初始化之前 **/
function beforeInitialization() {
}
/** 页面数据初始化之后事件 **/
function afterInitialization() {
}

/** 页面初始化之前事件 **/
function beforeInitPage() {
}

/** 页面初始化之后事件 **/
function afterInitPage() {
}



function initApp() {
	var url = CU.trim(window.location.href + "");
	if(!CU.isHttps(url) && !url.startsWith("http://localhost")) {
		url = CU.toHttps(url);
		window.location = url;
		return false;
	}
	
	PRQ.params = CU.parseUrlParams(window.location+"");
	//废除, spa中初始化数据统一由initialization()获取
	PU.refreshLayoutObject = function(cb) { 
		if(CU.isFunction(cb)) cb(); 
	};
	if(!CU.isEmpty(window.toastr)) toastr.options = {"timeOut":"1500","closeButton":false,positionClass:"toast-top-center"};
}

/** 页面框架初始化 **/
function initLayout() {
	//废除, 单页中不需要, 保留"/"是为了避免以前旧代码出错
	window.ContextPath = "/";
	
	//单页中不需要MenuTree缓存
	PU.getMenuTree = function(cb, flag) {
		if(flag == "menu") {
			PU.loadMenuTreeData(function(rs) {
				var nodes = PU.menuTreeInterceptor(rs, flag);
				if(CU.isFunction(cb)) cb(nodes);
			});
		}else {
			if(CU.isFunction(cb)) cb(FIRST_MENUS);
		}
	};
	PU.loadMenuTreeData = function(cb) {
		var ts = getMenuTreeData();
		if(CU.isFunction(cb)) cb(ts);
	};
	PU.getHomeMenuUrl = function() { return "###"; };
	PU.getMenuTreeUrl = function(menu) { return "###"; };
	PU.getBreadLineUrl = function(menu) { return "###"; };
	
	PU.getContentHeight = function() {
		var el_thirds = $("#div_third-menu-item_panel");
		var hasthirds = !CU.isEmpty(el_thirds) && el_thirds.length>0;
		var height = $(window).height() - (hasthirds ? 186 : 124);
		return height;
	};
	PU.getDefaultGridHeight = function() {
		var h = PU.getContentHeight() - 130;
		if(h < 100) h = 100;
		return h;
	};
	PU.getDynamicDropRoot = function() { return window.SYS; };
	PU.getDynamicDropUrl = function() { return "/systools/tools/getDynamicDictsBatch"; };
	
	CC.logout = function() {
		//删除登录信息
		PU.removeToken();
		delete window.SU;
		
		ssoUrl = getSsoLoginUrl();
		CC.LOGOUTING = true;
		openLoginMenu(ssoUrl);
	};
	
	//取出jump传过来的参数
	var ps = window.localStorage.getItem("TANNUX_SPA_JUMP_PARAMS");
	if(!CU.isEmpty(ps)) {
		ps = CU.trim(ps+"");
		if(ps.length>2 && ps.charAt(0)=='{' && ps.charAt(ps.length-1)=='}') {
			PRQ.attributes = CU.toObject(ps);
		}
		
		//取出后立即删除, 一次性消费
		window.localStorage.removeItem("TANNUX_SPA_JUMP_PARAMS");
	}
	
	try {
		PU.removeUrlToken();
	}catch(e) {
		console.error("remove url token error : " + e);
	}
	
	//子类扩展
	doInitLayout();
}



/** 页面数据初始化 **/
function initialization(cb) {
	if(CU.isEmpty(window.AppConfig)) throw "No AppConfig object was found.";
	if(CU.isEmpty(AppConfig.configUrl)) throw "The AppConfig object does not set configUrl.";
	
	//获取配置信息
	RS.ajax({addroot:false,url:AppConfig.configUrl, cb:function(rs) {
		if(CU.isObject(rs)) {
			$.extend(window, rs);
		}
		if(CU.isFunction(cb)) cb();
	}});
}





/** 页面初始化 **/
function initPage() {
	initHeader();
	initUserMenu();
	initMenus();
	doInitPage();
	forwardMenu();
}


function getSsoLoginUrl() {
	if(CU.isEmpty(window.SSO_LOGIN_URL)) throw "Configuration SSO_LOGIN_URL was not found.";
	var ssoUrl = CU.trim(SSO_LOGIN_URL);
	
	var idx = ssoUrl.indexOf('#');
	if(idx > 0) ssoUrl = ssoUrl.substring(0, idx);
	
	var callbackUrl = CU.getUri(window.location.href + "");
	callbackUrl = callbackUrl.substring(0, callbackUrl.lastIndexOf('/')) + "/tannux-spa-jump.html?type="+getLayoutType()+"&menuCode="+getCurrentMenuCode();
	
	ssoUrl += (ssoUrl.indexOf('?')<0 ? '?' : '&') + '&callbackUrl='+encodeURIComponent(callbackUrl);
	return ssoUrl;
}


function forwardMenu() {
	var menuCode = PRQ.get("menuCode");
	if(!CU.isEmpty(menuCode) && !CU.isEmpty(MENU_DATA[menuCode])) {
		switchMenu(menuCode, true);
	}else {
		if(!CU.isEmpty(window.HOME_MENU_CODE)) {
			switchMenu(window.HOME_MENU_CODE);
		}
	}
}


/**
 * 获取当前菜单
 */
function getCurrentMenu() {
	return CURRENT_MENU;
}


/**
 * 获取当前菜单代码(只包含菜单, 弹出窗口不在内)
 * @return {}
 */
function getCurrentMenuCode() {
	var code = "";
	var menu = getCurrentMenu();
	if(!CU.isEmpty(menu)) {
		code = menu.data.menuCode;
	}
	if(CU.isEmpty(code)) code = "";
	return code;
}


/**
 * 获取菜单外观类型
 */
function getCurrentMenuWrap() {
	var wrap = null;
	//如果存在弹窗
	if(POP_MENU_STACK.length > 0) {
		wrap = POP_MENU_STACK[POP_MENU_STACK.length-1];
	}else {
		if(!CU.isEmpty(CURRENT_MENU)) wrap = CURRENT_MENU;
	}
	return wrap;
}


/**
 * 获取当前菜单操作对象
 */
function getCurrentMenuObject() {
	var wrap = getCurrentMenuWrap();
	var obj = null;
	if(!CU.isEmpty(wrap)) obj = wrap.$menuObject;
	return obj;
}


/**
 * 初始化头部
 */
function initHeader() {
	if(!CU.isEmpty(window.PRODUCT_NAME)) {
		$("title").html(PRODUCT_NAME);
	}
	$("#TX_btn_logo").bind("click", goHomePage);
}

/**
 * 初始化用户菜单区域
 */
function initUserMenu() {
	if(!CU.isEmpty(window.SU)) {
		$("#a_navbar_menu_user").find("span").html(SU.userName);
	}
}


/**
 * 获取菜单树形结构数据
 */
function getMenuTreeData() {
	var menus = filterAuthMenus(AppConfig.menus);
	delete MENU_DATA;
	delete FIRST_MENUS;
	MENU_DATA = {};
	
	if(CU.isEmpty(menus)) menus = [];
	addLayoutMenus(menus);
	
	if(!CU.isEmpty(menus)) {
		var nodes = [];
		var parentMap = {};		//key=parentCode
		
		for(var i=0; i<menus.length; i++) {
			var m = menus[i];
			
			var code = CU.trim(m.menuCode);
			var pc = CU.trim(m.parentCode);
			if(CU.isEmpty(code) || CU.isEmpty(pc)) continue;
			m.isDir = CU.isEmpty(m.menuUrl);
			m.id = m.menuCode;
			
			var type = m.menuType;
			if(CU.isEmpty(type)) type = 2;
			var node = {id:code, text:m.menuName, icon:m.menuImg, type:type, parentId:pc, data:m};
			nodes.push(node);
			MENU_DATA[code] = node;
			
			var cs = parentMap[pc];
			if(CU.isEmpty(cs)) {
				cs = [];
				parentMap[pc] = cs;
			}
			cs.push(node);
		}
		
		for(var i=0; i<nodes.length; i++) {
			var n = nodes[i];
			var cs = parentMap[n.id];
			if(CU.isEmpty(cs)) {
				n.leaf = 1;
			}else {
				n.leaf = 0;
				n.children = cs;
			}
		}
		
		FIRST_MENUS = parentMap["0"];
		menus = FIRST_MENUS;
	}
	if(CU.isEmpty(FIRST_MENUS)) FIRST_MENUS = [];
	return menus;
}


/**
 * 过滤权限菜单
 */
function filterAuthMenus(menus) {
	if(!CU.isEmpty(menus) && isOpenAuth()) {
		var permits = window.PERMITS;
		
		//用户配置的权限
		var permitmap = {};
		if(!CU.isEmpty(permits)) {
			for(var i=0; i<permits.length; i++) {
				var m = permits[i];
				var menuOpts = m.menuOpts;
				if(!CU.isEmpty(menuOpts) && typeof(menuOpts)=="string") {
					m.menuOpts = menuOpts.split(',');
				}
				permitmap[m.menuCode] = m;
			}
		}
		var isadmin = !CU.isEmpty(window.SU) && window.SU.loginCode=="admin";
		
		//计算用户所能操作权限菜单
		var authMenus = [];
		var mergeFields = ["menuName", "menuImg", "menuOpts"];
		
		for(var i=0; i<menus.length; i++) {
			var menu = menus[i];
			var permit = permitmap[menu.menuCode];
			
			//如果用户没有配置权限
			if(CU.isEmpty(permit)) {
				//如果菜单是不受权限控制或用户是admin且菜单是系统菜单
				if(menu.menuType==3 || (isadmin && menu.menuType==1)) {
					authMenus.push(menu);
				}
			}else {
				var ex = CU.getObjectFields(permit, mergeFields);
				$.extend(menu, ex);
				authMenus.push(menu);
			}
		}
		menus = authMenus;
		delete PERMITS;
	}
	return menus;
}


/**
 * 是否开始权限控制
 */
function isOpenAuth() {
	return CU.isTrue(window.OPEN_AUTH);
}



/**
 * 获取指定menuCode的所有上级
 * @param {} menuCode
 * @return array : array[0]=当前节点, array[length-1]=一级节点
 */
function getParentMenus(menuCode) {
	var menu = MENU_DATA[menuCode];
	var array = [];
	if(!CU.isEmpty(menu)) {
		array.push(menu);
		
		while(true) {
			menu = MENU_DATA[menu.parentId];
			if(CU.isEmpty(menu)) {
				break ;
			}
			array.push(menu);
		}
	}
	return array;
}


function buildLayoutBreadLine(menuCode) {
	if(CU.isEmpty(menuCode)) return ;
	var nodes = getParentMenus(menuCode);
	if(CU.isEmpty(nodes)) return ;
	var menu = nodes[0];
	
	var html = [];
	html.push('<div class="heading-left"><span class="menu-symbol">&nbsp;</span><span class="page-title">',menu.data.menuName,'</span></div>');
	//主页不需要面包线
	if(window.HOME_MENU_CODE != menu.data.menuCode) {
		html.push('<ul class="breadcrumb">');
		if(!CU.isEmpty(window.HOME_MENU_CODE)) {
			html.push('<li><a menuCode="',window.HOME_MENU_CODE,'" href="###"><i class="fa fa-home"></i>  主页</a></li>');
		}
		var currmid = menu.id;
		
		for(var i=nodes.length-1; i>=0; i--) {
			var node = nodes[i];
			var m = node.data;
						
			var mid = m.id;
			var dir = m.isDir == 1;
			if(dir) {
				html.push('<li> ',m.menuName,'</li>');
			}else {
				if(mid == currmid) {
					html.push('<li class="active"> ',m.menuName,'</li>');
				}else {
					var url = PU.getBreadLineUrl(m);
					html.push('<li><a menuCode="',m.menuCode,'" href="',url,'"> ',m.menuName,'</a></li>');
				}
			}
		}
		html.push('</ul>');
	}
	$("#div-base-main-content-breadlink").html(html.join(""));
	
	$("#div-base-main-content-breadlink").find("a").bind("click", function() {
		var el = $(this);
		var menuCode = el.attr("menuCode");
		switchMenu(menuCode);
	});
};





/**
 * 选择菜单
 */
function switchMenu(menuCode, expand) {
	if(CU.isEmpty(menuCode)) return ;
	menuCode = CU.trim(menuCode);
	
	var menu = MENU_DATA[menuCode];
	if(CU.isEmpty(menu)) return ;
	
	if(!CU.isEmpty(CURRENT_MENU)) {
		setMenuSelected(CURRENT_MENU.data.menuCode, false);
		destroyMainMenuContent(CURRENT_MENU);
		
		//如果存在弹出窗口则强制关闭
		cleanPopMenus();
	}
	
	CURRENT_MENU = menu;
	MENU = CURRENT_MENU.data;	//兼容旧环境
	setMenuSelected(menu.data.menuCode, true);
	
	buildLayoutBreadLine(menuCode);
	if(CU.isTrue(expand)) expandParentMenu(CURRENT_MENU.data.menuCode);
	showMenuContent(menu);
}


/**
 * 已弹出窗口的方式打开菜单
 * @param {} config
 * 		menuCode : 菜单编号
 * 		mc : menuCode的简写, 如果两个同时存在则以menuCode为准
 * 		ps : Object, 传递给目标菜单参数, 调用init()函数时传递
 * 		callback : 菜单关闭时回调函数, callback(result), result为弹出菜单对象的属性:returnValue
 * 		cb : callback的简写, 如果两个同时存在则以callback为准
 * 		title : 指定弹出窗口标题, 为空则为menuName
 */
function openPopMenu(config) {
	if(CU.isEmpty(config)) throw "The config is empty.";
	var menuCode = config.menuCode;
	if(CU.isEmpty(menuCode)) menuCode = config.mc;
	if(CU.isEmpty(menuCode)) throw "The config.menuCode is empty.";
	menuCode = CU.trim(menuCode);
	
	var menu = MENU_DATA[menuCode];
	if(CU.isEmpty(menu)) return ;
	showMenuContent(menu, true, config)
}

function closePopMenu() {
	if(CU.isEmpty(POP_MENU_STACK)) {
		return false;
	}
	
	var popo = POP_MENU_STACK.pop();
	destroyPopMenuObject(popo, true);
	delete popo;
}


/**
 * openPopMenu简写
 */
function openMenu(config) {
	openPopMenu(config);
}


/**
 * 手动关闭弹框菜单
 * @param error : 是否弹出错误信息, false=不弹, true=弹, 字符串表示弹指定消息内容, 缺省为true(一般主动调关闭都是遇到错误)
 * @param result : 指定回调返回值, result为undefined被忽略, 除此之外都会覆盖菜单操作对象的returnValue
 */
function closeMenu(error, result) {
	if(error !== false) {
		if(error===true || CU.isEmpty(error)) error = "错误的请求.";
		CC.showTip({type:"error", msg:error});
		
		//延迟点时间是为了让用户看消息
		setTimeout(function() {
			setMenuReturnValue(result);
			closePopMenu();
		}, 1500);
	}else {
		setMenuReturnValue(result);
		closePopMenu();
	}
}

/**
 * 对返回对象(returnValue)赋值, result为undefined时被忽略
 * @param {} result
 */
function setMenuReturnValue(result) {
	if(result !== undefined) {
		var mo = getCurrentMenuObject();
		if(!CU.isEmpty(mo)) {
			mo.returnValue = result;
		}
	}
}



/**
 * 关闭所有打开了的菜单, 不会执行回调
 */
function cleanPopMenus() {
	while(POP_MENU_STACK.length > 0) {
		var popo = POP_MENU_STACK.pop();
		destroyPopMenuObject(popo, false);
		delete popo;
	}
}





/**
 * 打开菜单
 * menuNode : 对象结构
 * 	{
 * 		id: String, 		//菜单编号
 * 		text: String, 		//菜单名称
 * 		children: menuNode[],//子菜单
 * 		data: menu,			//菜单记录数据
 * 		$menuParams: object,//菜单menuUrl带的?参数
 * 		$menuObject: object,//菜单业务处理对象(只作为菜单时, 弹出窗口同一个菜单可能会弹多次, 对象由POP_MENU_STACK管理)
 * 	}
 * 
 * POP_MENU_STACK : 存放弹出窗口对象堆栈, 其每个元素结构
 * 	{
 * 		id: String, 		//菜单编号
 * 		text: String, 		//菜单名称
 * 		data: menu,			//菜单记录数据
 * 		$open: true,		//表示是弹窗
 * 		$menu: menuNode,	//自身对应的菜单节点对象
 * 		$openConfig: object, //弹出窗口配置参数
 * 		$menuObject: object,//菜单业务处理对象
 * 		$popCallback:function//弹出窗口回调
 * 	}
 * 
 */
function showMenuContent(menuNode, open, openConfig) {
	if(CU.isEmpty(menuNode) || CU.isEmpty(menuNode.data)) return ;
	var menu = menuNode.data;
	
	var menuUrl = menu.menuUrl;
	if(CU.isEmpty(menuUrl)) throw "Menu ["+menu.menuCode+"]"+menu.menuName+" has not set menuUrl.";
	
	var uri = CU.getUri(menuUrl);
	var name = getMenuObjectName(uri);
	if(CU.isEmpty(name)) throw "Unable to obtain the object name of menu ["+menu.menuCode+"]"+menu.menuName+".";
	
	//解析URL参数
	if(CU.isEmpty(menuNode.$menuParams)) {
		menuNode.$menuParams = CU.parseUrlParams(menuUrl);
	}
	
	//先判断文件是否已加载, 如果没有则加载
	if(CU.isFunction(window[name])) {
		renderMenuContent(name, menuNode, open, openConfig);
	}else {
		loadMenuJsFile(menuUrl, function(ba) {
			if(!ba || !CU.isFunction(window[name])) {
				throw "Loading menu ["+menu.menuCode+"]"+menu.menuName+" failed ["+menuUrl+"].";
			}
			renderMenuContent(name, menuNode, open, openConfig);
		});
	}
}

function renderMenuContent(name, menuNode, open, openConfig) {
	if(!CU.isFunction(window[name]) || CU.isEmpty(menuNode) || CU.isEmpty(menuNode.data)) return ;
	open = CU.isTrue(open);
	
	//创建菜单对象
	var mo = new window[name]();
	mo.menu = menuNode.data;
	mo.$ = function(a,b) {return this.dom.find(a,b);};
	mo.$name = function(a,b,c) {return this.dom.find("input[name='"+a+"'], select[name='"+a+"'], textarea[name='"+a+"']",b);};
	mo.$n = mo.$name;
	mo.$vn = function(a,b) {return this.dom.find("[for-name='"+a+"']",b);};
	
	//菜单初始化
	executeMenuInit(open, menuNode, openConfig, mo, false);
	
	//渲染工作区dom
	var el_dom = renderMenuContentDom(open, menuNode, openConfig, mo, false);
	
	//组合页面元素及对象关联
	combineMenuContent(open, el_dom, menuNode, openConfig, mo);

	//最终显示菜单
	displayMenuContent(open, menuNode, openConfig, mo, false);
}



/**
 * 刷新当前菜单
 * 菜单对象不会被销毁, 只会将页面元素重置, 菜单对象中的函数执行顺序onClose() -> init() -> render() -> onShow()
 */
function refreshMenu() {
	var wrap = getCurrentMenuWrap();
	if(CU.isEmpty(wrap)) return ;
	
	var open = CU.isTrue(wrap.$open);
	var menuNode = open ? wrap.$menu : wrap;
	var openConfig = wrap.$openConfig;
	var mo = wrap.$menuObject;
	
	//销毁页面元素
	destroyMenuObject(mo, true);
	
	//菜单初始化
	executeMenuInit(open, menuNode, openConfig, mo, true);
	
	//渲染工作区dom
	var el_dom = renderMenuContentDom(open, menuNode, openConfig, mo, true);
	$('#TX_base_main_menu_container').append(el_dom);
	
	//最终显示菜单
	displayMenuContent(open, menuNode, openConfig, mo, true);
}


/**
 * 刷新整个页面
 */
function refreshPage() {
	window.location.reload();
}


/**
 * 执行菜单初始函数
 */
function executeMenuInit(open, menuNode, openConfig, menuObject, refresh) {
	//菜单参数为不变对象, 每次传入为一个副本
	var ps = CU.clone(menuNode.$menuParams);
	if(open && CU.isObject(openConfig.ps)) {
		$.extend(ps, openConfig.ps);
	}
	if(CU.isFunction(menuObject.init)) menuObject.init(ps, refresh);
}



/**
 * 渲染工作区dom
 */
function renderMenuContentDom(open, menuNode, openConfig, menuObject, refresh) {
	var arr = [];
	if(open) {
		arr = createPopMenuContentDom(menuNode, menuObject, openConfig)
	}else {
		arr = createMainMenuContentDom(menuNode, menuObject);
	}
	var el_dom = arr[0];
	var el_parent = arr[1];
	menuObject.dom = el_dom;
	
	//渲染
	if(CU.isFunction(menuObject.render)) {
		var el = menuObject.render(refresh);
		if(!CU.isEmpty(el)) {
			if(typeof(el)=='string')  el = $(el);
			el_parent.append(el);
		}
	}
	return el_dom;
}

/**
 * 创建菜单工作区dom
 * @return array : [0]=顶层dom, [1]=存放object.render()的dom
 */
function createMainMenuContentDom(menuNode, menuObject) {
	var el_dom = $('<div class="tannux-menu-content tx-menu-cont none"></div>');
	return [el_dom, el_dom];
}

/**
 * 创建弹窗菜单工作区dom
 * @return array : [0]=顶层dom, [1]=存放object.render()的dom
 */
function createPopMenuContentDom(menuNode, menuObject, openConfig) {
	var el_dom = $('<div class="tannux-menu-content panel row tx-menu-pop none"></div>');
		
	var el_header = getPopMenuHeaderHtml(menuNode, openConfig);
	if(!CU.isEmpty(el_header)) {
		if(typeof(el_header)=='string') el_header = $(el_header);
		el_dom.append(el_header);
	}
	var el_parent = getPopMenuContentHtml(menuNode, openConfig);
	if(!CU.isEmpty(el_parent)) {
		if(typeof(el_parent)=='string') el_parent = $(el_parent);
		el_dom.append(el_parent);
	}
	el_dom.find(".btn-reback").bind("click", closePopMenu);
	return [el_dom, el_parent];
}

function getPopMenuHeaderHtml(menuNode, openConfig) {
	var title = openConfig.title;
	if(CU.isEmpty(title)) title = menuNode.data.menuName;
	
	var html = ['<div class="panel-heading tx-menu-pop-header">',
				'		<h3 class="panel-title tx-menu-pop-title">',
				'			<div class="pull-left">',title,'</div>',
				'			<div class="pull-right"><button type="button" class="btn btn-default btn-xs tool-btn btn-reback"><i class="fa fa-mail-reply"></i>返回</button></div>',
				'		</h3>',
				'</div>'];
	return html.join('');
}

function getPopMenuContentHtml(menuNode, openConfig) {
	return '<div class="panel tx-menu-pop-cont"></div>';
}



/**
 * 组合页面元素及对象关联
 * @return {}
 */
function combineMenuContent(open, el_dom, menuNode, openConfig, menuObject) {
	if(open) {
		combinePopMenuContent(el_dom, menuNode, menuObject, openConfig)
	}else {
		combineMainMenuContent(el_dom, menuNode, menuObject);
	}
}

function combineMainMenuContent(el_dom, menuNode, menuObject) {
	menuNode.$menuObject = menuObject;
	$('#TX_base_main_menu_container').append(el_dom);
}

function combinePopMenuContent(el_dom, menuNode, menuObject, openConfig) {
	//隐藏最近菜单
	hideLatestMenuContent();
	
	//创建弹窗对象
	var popo = {id:menuNode.id, text:menuNode.text, data:menuNode.data, $menuObject:menuObject, $menu:menuNode, $open:true, $openConfig:openConfig};
	POP_MENU_STACK.push(popo);
	
	var cb = openConfig.callback;
	if(CU.isEmpty(cb)) cb = openConfig.cb;
	popo.$popCallback = cb;
	
//		$("body").append(el_dom);
//		$("body").addClass("tx-body-hidy");
	$('#TX_base_main_menu_container').append(el_dom);
}



/**
 * 最终显示菜单
 */
function displayMenuContent(open, menuNode, openConfig, menuObject, refresh) {
	setTimeout(function() {
		menuObject.dom.removeClass("none");
		
		//渲染结束
		if(CU.isFunction(menuObject.onShow)) menuObject.onShow(refresh);
		
		//渲染页面常用组件
		afterRenderMenuContent(open, menuNode, openConfig, menuObject);
	}, 200);
}


/**
 * 弹窗菜单时, 将之前最近菜单隐藏
 */
function hideLatestMenuContent() {
	//如果没有弹出窗口, 则将主页隐藏
	if(POP_MENU_STACK.length == 0) {
		var prev_dom = CU.getObjectValue(CURRENT_MENU, "$menuObject.dom");
		hideLatestMainMenuContent(prev_dom);
	}
	//如果弹出的是多个窗口, 则将上一个窗口隐藏
	else {
		var prev_dom = CU.getObjectValue(POP_MENU_STACK[POP_MENU_STACK.length-1], "$menuObject.dom");
		hideLatestPopMenuContent(prev_dom);
	}
}

function hideLatestMainMenuContent(el_dom) {
	if(!CU.isEmpty(el_dom)) el_dom.addClass("none");
	$("#div-base-main-content-breadlink").addClass("none");
}

function hideLatestPopMenuContent(el_dom) {
	if(!CU.isEmpty(el_dom)) el_dom.addClass("none");
}


/**
 * 弹窗菜单被关闭时, 需将最近菜单恢复显示
 */
function showLatestMenuContent() {
	//如果已经没有弹出窗口, 则将主页恢复显示
	if(POP_MENU_STACK.length == 0) {
		var prev_dom = CU.getObjectValue(CURRENT_MENU, "$menuObject.dom");
		showLatestMainMenuContent(prev_dom);
	}
	//如果有弹出窗口, 则将最近窗口恢复显示
	else {
		var prev_dom = CU.getObjectValue(POP_MENU_STACK[POP_MENU_STACK.length-1], "$menuObject.dom");
		showLatestPopMenuContent(prev_dom);
	}
}

function showLatestMainMenuContent(el_dom) {
	$("#div-base-main-content-breadlink").removeClass("none");
	if(!CU.isEmpty(el_dom)) el_dom.removeClass("none");
}
function showLatestPopMenuContent(el_dom) {
	if(!CU.isEmpty(el_dom)) el_dom.removeClass("none");
}


function afterRenderMenuContent(open, menuNode, openConfig, menuObject) {
	var el_dom = menuObject.dom;
	
	//国际化转换
	CU.translatePageLang(el_dom);
	
	//处理数值框组件
	CU.onlyInteger(el_dom.find(".tannux-input-number"));
	
	//处理分类数值框组件
	CU.format3BitNumberField(el_dom.find(".form-number-3bit"));
	
	//处理下拉列表
	PU.buildSelectFields(el_dom);
	
	//处理分类上传组件
	PU.bindClassifyUploadClick(el_dom);
	
	//处理时间组件
	if($.fn.datetimepicker) {
		el_dom.find(".item-form-datetimepicker").datetimepicker($.fn.datetimepicker.defaults);
		el_dom.find(".item-form-datetimepicker-addon").bind("click", function(){$($($(this).parent()[0]).children()[0]).focus();});
	}
	
	//处理弹框选择组件
	PU.renderOpenSelectFields(el_dom);
}


/**
 * 注销菜单工作区
 */
function destroyMainMenuContent(menuNode) {
	if(CU.isEmpty(menuNode) || CU.isEmpty(menuNode.$menuObject)) return ;
	var mo = menuNode.$menuObject;
	//销毁菜单对象
	destroyMenuObject(mo, false);
	delete menuNode.$menuObject;
}


/**
 * 关闭(销毁)弹出菜单
 * @param {} menu
 */
function destroyPopMenuObject(popo, docb) {
	if(CU.isEmpty(popo) || CU.isEmpty(popo.$menuObject)) return ;
	var mo = popo.$menuObject;
	var cb = popo.$popCallback;
	var result = mo.returnValue;
	
	//销毁菜单对象
	destroyMenuObject(mo, false);
	delete popo.$menuObject;
//	$("body").removeClass("tx-body-hidy");
	
	//恢复显示最近菜单
	showLatestMenuContent();
	
	if(CU.isTrue(docb)) {
		setTimeout(function() {
			if(CU.isFunction(cb)) cb(result);
		}, 200);
	}
}



/**
 * 关闭(销毁)菜单
 * @param {} menu
 */
function destroyMenuObject(mo, refresh) {
	if(CU.isObject(mo)) {
		refresh = CU.isTrue(refresh);
		
		var name = mo.constructor.name;
		
		//执行关闭事件
		try {
			if(CU.isFunction(mo.onClose)) mo.onClose(refresh);
		}catch(e) {
			console.error(name+".onClose() error : " + e);
		}
		
		//销毁dom
		try {
			var el_dom = mo.dom;
			if(!CU.isEmpty(el_dom)) {
				el_dom.remove();
				delete mo.dom;
			}
		}catch(e) {
			console.error(name+" destroy dom error : " + e);
		}
	}
}





function getMenuObjectName(uri) {
	var idx = uri.lastIndexOf('/');
	if(idx >= 0) {
		uri = uri.substring(idx+1);
	}
	uri = uri;
	
	//去除前缀点
	while(uri.length>0 && uri.charAt(0)=='.') {
		uri = uri.substring(1);
	}
	idx = uri.indexOf('.');
	if(idx >= 0) {
		uri = uri.substring(0, idx);
	}
	return uri;
}

function loadMenuJsFile(url, cb) {
    $.getScript(url)
        .done(function(script, textStatus) {
             if(CU.isFunction(cb)) cb(true);
        })
        .fail(function(jqxhr, settings, exception) {
            if(CU.isFunction(cb)) cb(false);
        });
}


function goHomePage() {
	if(!CU.isEmpty(window.HOME_MENU_CODE)) {
		switchMenu(window.HOME_MENU_CODE);
	}
}


/**
 * 添加系统框架菜单, 避免与用户菜单冲突, 菜单框架菜单编号统一$符号开头
 */
function addLayoutMenus(menus) {
	menus.push({menuCode:'$TANNUX_WEB_VIEW', parentCode:'0', menuName:'WEB-VIEW', isDisp:0, menuType:3, menuUrl:'./menus/$TannuxWebView.js'},);
	doAddLayoutMenus(menus);
}



/**
 * 打开登入窗口
 * @param {} url
 */
function openLoginMenu(url) {
	window.location = url;
}


/**
 * 弹出web-view菜单
 * @param {} config
 * 		url : 目标页面地址
 * 		callback : 菜单关闭时回调函数, callback(result), result为弹出菜单对象的属性:returnValue
 * 		cb : callback的简写, 如果两个同时存在则以callback为准
 * 		title : 指定弹出窗口标题, 为空则为menuName
 */
function openWebViewMenu(config) {
	if(CU.isEmpty(config) || CU.isEmpty(config.url)) throw " the config.url is empty argument! ";
	config.menuCode = "$TANNUX_WEB_VIEW";
	if(CU.isEmpty(config.ps)) config.ps = {};
	config.ps.url = config.url;
	openPopMenu(config);
}





/**
 * 子类函数, 初始化菜单
 */
function initMenus() {
}


/** 子类函数, 当前框架类型 **/
function getLayoutType() {
}


/** 子类函数, 设置menu选中样式 **/
function setMenuSelected(menuCode, selected) {
}

/** 子类函数, 展开父级菜单 **/
function expandParentMenu(menuCode) {
}

/** 子类函数, 初始化框架 **/
function doInitLayout() {
}

/** 子类函数, 初始化页面 **/
function doInitPage() {
}

/** 子类扩展, 添加系统框架级菜单 **/
function doAddLayoutMenus(menus) {
}


