/*!
 * tannux-spa v1.0.0 (http://tannux.com)
 * Copyright 2024-2025 Tannux Technology Co., LTD
 * Licensed under the Apache License, Version 2.0.
 */

function getLayoutType() {
	return "top";
}

function initMenus() {
	if(!CU.isEmpty(window.PRODUCT_NAME)) {
		$("#TX_sidebar_product_name").html(PRODUCT_NAME);
	}
	PU.buildTopLayoutMenuTree();
	$("#navbar-menu-container-left .menu-leaf").bind("click", function() {
		var el = $(this);
		var menuCode = el.attr("menuCode");
		switchMenu(menuCode);
	});
}


function setMenuSelected(menuCode, selected) {
	var nodes = getParentMenus(menuCode);
	if(!CU.isEmpty(nodes)) {
		selected = CU.isTrue(selected);
		var el_parent = $("#navbar-menu-container-left");
		
		for(var i=nodes.length-1,j=0; i>=0; i--,j++) {
			var node = nodes[i];
			var mc = node.data.menuCode;
			var el = el_parent.find("a[menucode='"+mc+"']");
			
			if(selected) {
				el.addClass("active");
				if(j > 0) {
					el.addClass("active-leaf");
				}
			}else {
				el.removeClass("active active-leaf");
			}
		}
	}
}



