/*!
 * tannux-web v3.1.0 (http://tannux.com)
 * Copyright 2014-2025 Tannux Technology Co., LTD
 * Licensed under the Apache License, Version 2.0.
 */

/**
 * 页面Request
 * 		params: request.params
 * 		attributes: request.attributes
 */
var PRQ = {params:null, attributes:null, OpenArguments:window.dialogArguments, ParentWindow:(CU.isObject(window.dialogArguments)&&CU.isObject(window.dialogArguments.ParentWindow)?window.dialogArguments.ParentWindow:window), OpenParams:(CU.isObject(window.dialogArguments)?window.dialogArguments.OpenParams:null), pageInfo:null,
		get : function(key, filterNull) {
			var v = CU.isObject(PRQ.OpenParams) ? PRQ.OpenParams[key] : null;
			if(CU.isEmpty(v)) v=PRQ.getParam(key, filterNull);
			if(CU.isEmpty(v)) v=PRQ.getAttribute(key, filterNull);
			return v;
		},
		
		getParam : function(key, filterNull) {
			if(CU.isEmpty(PRQ.params)) return null;
			var vs = PRQ.params[key];
			if(CU.isArray(vs)) {
				vs = vs.length>0 ? vs[0] : "";
			}
			if(filterNull===true && (vs===undefined||vs===null)) vs = "";
			return vs===undefined ? null : vs;
		},
		
		getParams : function(key) {
			var vs = null;
			if(CU.isObject(PRQ.params)) vs = PRQ.params[key];
			if((vs===null||vs===undefined)&&CU.isObject(PRQ.OpenParams)) {
				vs = PRQ.OpenParams[key];
				if(vs!==null&&vs!==undefined&&!CU.isArray(vs))vs=[vs];
			}
			return CU.isArray(vs) ? vs : null;
		},
		setReturnValue : function(value) {
			window.returnValue = value;
		},
		getAttribute : function(key, filterNull) {
			if(CU.isEmpty(PRQ.attributes)) return null;
			var vs = PRQ.attributes[key];
			if(filterNull===true && (vs===undefined||vs===null)) vs = "";
			return vs===undefined ? null : vs;
		},
		setAttribute : function(key, value) {
			if(CU.isEmpty(key) || CU.isEmpty(value)) return ;
			if(CU.isEmpty(PRQ.attributes)) PRQ.attributes = {};
			PRQ.attributes[key] = value;
		},
		getParentWindow : function() {
			return PRQ.ParentWindow;
		},
		closeWindow : function(value) {
			if(value !== undefined) PRQ.setReturnValue(value);
			window.close();
		},
		
		
		moveFirst : function() {PRQ.pageInfo.pageIndex=0;PRQ.refreshPage();},
		movePrevious : function() {PRQ.pageInfo.pageIndex--;PRQ.refreshPage();},
		moveNext : function() {PRQ.pageInfo.pageIndex++;PRQ.refreshPage();},
		moveLast : function() {PRQ.pageInfo.pageIndex=PRQ.pageInfo.array.length-1;PRQ.refreshPage();},
		refreshPage : function() {
			var length = PRQ.pageInfo.array.length;
			var index = PRQ.pageInfo.pageIndex;
			index = index<0 ? 0 : (index>=length ? length-1 : index);
			var empty = length == 0;
			PRQ.pageInfo.buttons.first.setDisabled(empty||index==0);
			PRQ.pageInfo.buttons.prev.setDisabled(empty||index==0);
			PRQ.pageInfo.buttons.next.setDisabled(empty||index==length-1);
			PRQ.pageInfo.buttons.last.setDisabled(empty||index==length-1);
			PRQ.pageInfo.handler(empty?"":PRQ.pageInfo.array[index], PRQ.pageInfo.array);
		},
		setPageInfo : function(array, currid, handler) {
			if(CU.isEmpty(array))array=CU.isEmpty(currid) ? [] : [currid];
			if(PRQ.pageInfo == null)PRQ.getPageButtons();
			if(typeof(array)=="string")array=array.split(",");
			PRQ.pageInfo.array = array;
			var pageIndex = -1;
			PRQ.pageInfo.currid = CU.isEmpty(currid) ? array[0] : ((pageIndex=array.indexOf(currid))>-1 ? currid : array[0]);
			PRQ.pageInfo.handler = handler;
			PRQ.pageInfo.pageIndex = pageIndex==-1 ? 0 : pageIndex;
			PRQ.refreshPage();
		},
		getPageInfo : function() {
			return PRQ.pageInfo;
		},
		getPageButtons : function() {
			if(PRQ.pageInfo == null)PRQ.pageInfo = {buttons:{
				first:EF.getButton({iconCls:"x-tbar-page-first",handler:PRQ.moveFirst}),
				prev:EF.getButton({iconCls:"x-tbar-page-prev",handler:PRQ.movePrevious}),
				next:EF.getButton({iconCls:"x-tbar-page-next",handler:PRQ.moveNext}),
				last:EF.getButton({iconCls:"x-tbar-page-last",handler:PRQ.moveLast})
			}};
			return [PRQ.pageInfo.buttons.first,PRQ.pageInfo.buttons.prev,PRQ.pageInfo.buttons.next,PRQ.pageInfo.buttons.last];
		}
};


