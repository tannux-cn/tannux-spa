/*!
 * tannux-spa v1.0.0 (http://tannux.com)
 * Copyright 2024-2025 Tannux Technology Co., LTD
 * Licensed under the Apache License, Version 2.0.
 */

/**
 * 嵌套iframe
 */
function $TannuxWebView() {
	var thiz = this;
	this.url = "";
	
	/**
	 * 对象创建后(元素未渲染)执行函数
	 */
	this.init = function(ps) {
		this.url = ps.url;
	};
	
	
	/**
	 * 页面元素被渲染后执行函数
	 */
	this.onShow = function() {
	};
	
	
	/**
	 * 页面被关闭(销毁)时执行函数
	 */
	this.onClose = function() {
	};
	
	
	
	/**
	 * 此函数拼装当前页面的html并返回
	 */
	this.render = function() {
		if(CU.isEmpty(thiz.url)) throw "The URL of the WebView is empty.";
		thiz.dom.css("height", $(window).height()+"px");
		thiz.dom.find(".tx-m-content").css("height", "100%");
		return '<iframe class="tx-open-view-content" src="'+thiz.url+'" frameborder="0" width="100%" height="100%" scrolling="yes"></iframe>';
	};
	
	
	
	
}

