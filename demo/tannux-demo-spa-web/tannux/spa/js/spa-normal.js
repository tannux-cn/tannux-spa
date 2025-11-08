/*!
 * tannux-spa v1.0.0 (http://tannux.com)
 * Copyright 2024-2025 Tannux Technology Co., LTD
 * Licensed under the Apache License, Version 2.0.
 */

function getLayoutType() {
	return "normal";
}

function initMenus() {
	if(!CU.isEmpty(window.PRODUCT_NAME)) {
		$("#TX_sidebar_product_name").html(PRODUCT_NAME);
	}
	PU.isFullWidth = function() {
		return $("body").hasClass("layout-fullwidth");
	};
	$("#tour-fullwidth").bind("click", PU.refreshModalWinWidth);
	PU.buildLayoutMenuTree();
	$("#sidebar-nav-menu .menu-leaf").bind("click", function() {
		var el = $(this);
		var menuCode = el.attr("menuCode");
		switchMenu(menuCode);
	});
}


function setMenuSelected(menuCode, selected) {
	var el = $("#sidebar-nav-menu a[menucode='"+menuCode+"']");
	if(CU.isTrue(selected)) {
		el.addClass("active active-leaf");
	}else {
		el.removeClass("active active-leaf");
	}
}


function expandParentMenu(menuCode) {
	var nodes = getParentMenus(menuCode);
	if(!CU.isEmpty(nodes) && nodes.length>1) {
		var el_parent = $("#sidebar-nav-menu");
		for(var i=nodes.length-1; i>0; i--) {
			var node = nodes[i];
			var el = el_parent.find("a[menucode='"+node.data.menuCode+"']");
			if(el.hasClass("collapsed")) {
				el.click()
			}
		}
	}
}

