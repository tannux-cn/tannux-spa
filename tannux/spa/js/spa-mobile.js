/*!
 * tannux-spa v1.0.0 (http://tannux.com)
 * Copyright 2024-2025 Tannux Technology Co., LTD
 * Licensed under the Apache License, Version 2.0.
 */

function getLayoutType() {
	return "mobile";
}

/**
 * 手机端不作权限控制
 */
function isOpenAuth() {
	return false;
}

function initMenus() {
	PU.getMenuTree(function(nodes) {
		if(CU.isEmpty(FIRST_MENUS)) return ;
		
		var valids = [];
		//调出有效菜单
		for(var i=0; i<FIRST_MENUS.length; i++) {
			var node = FIRST_MENUS[i];
			if(CU.isFalse(node.data.isDisp)) {
				continue ;
			}
			valids.push(node);
		}
		
		var html = [];
		if(!CU.isEmpty(valids)) {
			var calc = parseInt(100/valids.length, 10);
			for(var i=0; i<valids.length; i++) {
				var node = valids[i];
				var menu = node.data;
				var img = menu.menuImg;
				var aimg = menu.activeImg;
				if(CU.isEmpty(img)) img = "";
				if(CU.isEmpty(aimg)) aimg = "";
				
				html.push('<div class="tx-m-menu" menuCode="',menu.menuCode,'" data-menu-img="',img,'" data-active-img="',aimg,'" style="width:',calc,'%;">',
								'<div class="tx-m-menu-img">',CU.getIconHtml(img),'</div>',
								'<div class="tx-m-menu-text">',menu.menuName,'</div>',
							'</div>');
			}
		}
		
		var el_parent = $("#TX_m_base_main_footer");
		el_parent.append(html.join(''));
		
		el_parent.find(".tx-m-menu").bind("click", function() {
			var el = $(this);
			var menuCode = el.attr("menuCode");
			switchMenu(menuCode);
		});
	}, 'menu');
	
	
	//配置参数, TOUCH_SLIDING_LENGTH : top、bottom、left、right滑动敏感值, 缺省为100
	CC.bindPageTouch({
		sensitiveValue : window.TOUCH_SLIDING_LENGTH,
		top: function(evt, touchevt, point) {
			var mo = getCurrentMenuObject();
			if(!CU.isEmpty(mo) && CU.isFunction(mo.onTouchTop)) mo.onTouchTop(evt, touchevt, point);
		}, bottom: function(evt, touchevt, point) {
			var mo = getCurrentMenuObject();
			if(!CU.isEmpty(mo) && CU.isFunction(mo.onTouchBottom)) mo.onTouchBottom(evt, touchevt, point);
		}, left: function(evt, touchevt, point) {
			var mo = getCurrentMenuObject();
			if(!CU.isEmpty(mo) && CU.isFunction(mo.onSwipeLeft)) mo.onSwipeLeft(evt, touchevt, point);
		}, right: function(evt, touchevt, point) {
			var mo = getCurrentMenuObject();
			if(!CU.isEmpty(mo) && CU.isFunction(mo.onSwipeRight)) mo.onSwipeRight(evt, touchevt, point);
		}
	});
}


function setMenuSelected(menuCode, selected) {
	var el = $("#TX_m_base_main_footer div[menucode='"+menuCode+"']");
	var mimg = el.attr("data-menu-img");
	var aimg = el.attr("data-active-img");
	var hasaimg = !CU.isEmpty(aimg);
	
	if(CU.isTrue(selected)) {
		el.addClass("active");
		if(hasaimg) el.find(".tx-m-menu-img").html(CU.getIconHtml(aimg));
	}else {
		el.removeClass("active");
		if(hasaimg) el.find(".tx-m-menu-img").html(CU.getIconHtml(mimg));
	}
}



/**
 * 主工作区
 */
function createMainMenuContentDom(menuNode, menuObject) {
	var el_dom = $('<div class="tx-m-menu-content none"></div>');
	el_dom.append('<div class="tx-m-title">'+menuNode.data.menuName+'</div>');
	var el_cont = $('<div class="tx-m-content away-title"></div>');
	el_dom.append(el_cont);
	return [el_dom, el_cont];
}

/**
 * 弹窗工作区
 */
function createPopMenuContentDom(menuNode, menuObject, openConfig) {
	var title = openConfig.title;
	if(CU.isEmpty(title)) title = menuNode.data.menuName;
	
	var el_dom = $('<div class="tx-m-menu-content tx-m-menu-pop none"></div>');
	el_dom.append('<div class="tx-m-title"><div class="tx-m-btn-back">&nbsp;</div><div>'+title+'</div></div>');
	var el_cont = $('<div class="tx-m-content away-title"></div>');
	el_dom.append(el_cont);
	el_dom.find(".tx-m-btn-back").bind("click", closePopMenu);
	return [el_dom, el_cont];
}



function closePopMenu() {
	if(CU.isEmpty(POP_MENU_STACK)) {
		return false;
	}
	var popo = POP_MENU_STACK.pop();
	var el = popo.$menuObject.dom;
	el.addClass("tx-m-body-bg tx-m-menu-fixed");
	//恢复显示最近菜单
	showLatestMenuContent();
	
	el.animate({left:"100%"}, 300, function() {
		el.addClass("none");
		destroyPopMenuObject(popo, true);
		delete popo;
	});
}



/**
 * 最终显示菜单
 */
function displayMenuContent(open, menuNode, openConfig, menuObject, refresh) {
	//如果是刷新页面
	if(CU.isTrue(refresh)) {
		setTimeout(function() {
			menuObject.dom.removeClass("none");
			if(CU.isFunction(menuObject.onShow)) menuObject.onShow(refresh);
		}, 200);
		return ;
	}
	
	if(open) {
		var el = menuObject.dom;
		el.addClass("tx-m-body-bg tx-m-menu-fixed");
		el.css("left", "100%");
		el.removeClass("none");
		
		el.animate({left:'0px'}, 300, function() {
			el.removeClass("tx-m-body-bg tx-m-menu-fixed");
			if(CU.isFunction(menuObject.onShow)) menuObject.onShow(refresh);
		});
	}else {
		menuObject.dom.removeClass("none");
		if(CU.isFunction(menuObject.onShow)) menuObject.onShow(refresh);
	}
}


function hideLatestMainMenuContent(el_dom) {
	setTimeout(function() {
		if(!CU.isEmpty(el_dom)) el_dom.addClass("none");
		$("#TX_m_base_main_footer").addClass("none");
	}, 300);
}
function hideLatestPopMenuContent(el_dom) {
	setTimeout(function() {
		if(!CU.isEmpty(el_dom)) el_dom.addClass("none");
	}, 300);
}


function showLatestMainMenuContent(el_dom) {
	$("#TX_m_base_main_footer").removeClass("none");
	if(!CU.isEmpty(el_dom)) el_dom.removeClass("none");
}



/**
 * 移动端不需要面包线
 */
function buildLayoutBreadLine() {
}

/**
 * 打开登录窗口
 */
function openLoginMenu(url) {
	openWebViewMenu({url:ssoUrl, title:"登录", cb:function() {
		CC.LOGOUTING = false;
		refreshPage();
	}});
}
