/*!
 * tannux-web v3.1.0 (http://tannux.com)
 * Copyright 2014-2025 Tannux Technology Co., LTD
 * Licensed under the Apache License, Version 2.0.
 */

var DATA_TABLE_LANGUAGE = {
		"decimal":        "",
	    "emptyTable":     "未查询到数据",
	    "info":           "Showing _START_ to _END_ of _TOTAL_ entries",
	    "infoEmpty":      "Showing 0 to 0 of 0 entries",
	    "infoFiltered":   "(filtered from _MAX_ total entries)",
	    "infoPostFix":    "",
	    "thousands":      ",",
	    "lengthMenu":     "每页 _MENU_ 条&nbsp;&nbsp;&nbsp;&nbsp;共 <span name='DATATABLE_TOTALROWS'>0</span> 条记录",
	    "loadingRecords": "Loading...",
	    "processing":     "搜索中, 请稍候...",
	    "search":         "搜索:",
	    "zeroRecords":    "No matching records found",
	    "paginate": {
	        "first":      "首页",
	        "next":       "下一页",
	        "previous":   "上一页",
	        "last":       "尾页"
	    },
	    "aria": {
	        "sortAscending":  ": activate to sort column ascending",
	        "sortDescending": ": activate to sort column descending"
	    }
};



var PrettyDataTable_DefaultRenderer = function(value, type, row, meta) {
	if(!CU.isEmpty(value)) {
		var c = meta.settings.aoColumns[meta.col];
		if(!CU.isEmpty(c) && !CU.isEmpty(c.view)) {
			value = value + "";
			if(value.indexOf(',') >= 0) {
				var s = [];
				var arr = value.split(',');
				for(var i=0; i<arr.length; i++) {
					var a = arr[i];
					if(CU.isEmpty(a)) continue;
					var v = PU.getDropValue(c.view, a, c.colorable);
					if(CU.isEmpty(v)) continue;
					s.push(v);
				}
				return s.join(",")
			}else {
				return PU.getDropValue(c.view, value, c.colorable);
			}
		}
		return value;
	}
};


var PrettyDataTable_Omdb_getParams = function(pageNum, pageSize, cdt, orders, qs, table) {
	//Integer pageNum, Integer pageSize, String fuzzy, COcInstance cdt, List<OcAttrExpress> expresss, String orders, String qs
	if(CU.isEmpty(cdt)) cdt = {};
	if(table.modelType===1 || table.modelType=="1") {
		cdt.classId = table.modelId;
	}else {
		cdt.viewId = table.modelId;
	}
	if(!CU.isEmpty(table.formId)) {
		cdt.formId = table.formId
	}
	var fuzzy = cdt.searchFieldFuzzy;
	cdt.searchFieldFuzzy = null;
	return {pageNum:pageNum, pageSize:pageSize, fuzzy:fuzzy, cdt:cdt};
};


/**
 * 数据表对象
 * @param config : 配置参数, 参见：http://www.datatables.club/reference/option
 * 	扩展参数 :  bid : 绑定页面指定的div id
 * 				addroot : RS-addroot
 * 				act : simple|rest2, 缺省为rest2
 * 				url : 请求服务端地址
 * 				passageCountUrl : passage为true时指定查询总记录数URL
 * 				getParams(pageNum, pageSize, cdt, orders) : 获取参数, 可以为空, 为空则默认传给服务器的参数为: [pageNum, pageSize, condition, orders]
 * 				errcb : 异常回调
 * 				columns扩展 : [{cdtable:true, type:"", view:"", maxLength:""}, html], 数组中可以是一个对象, 也可以是string, 如果是string则认为是自定义html
 * 								cdtable : 是否作为条件
 * 								ctype : string/number/enum/date/dateinval/numinval, 缺省为string
 * 								cdtor : 指定自定义条件选择器 cdtor(idx, col, grid)
 * 								decbit : 数据类型小数位数, 即数字类型提交时右补0位数, 缺省为0
 * 								dtime : true|false, 是否自动将date类型字段后补时间位数, 如果是在dateinval中,则startDate补000000, endDate补235959, 缺省为false
 * 								view : 如果type为enum时, 则指定对应的下拉列表数据集
 * 								cdtMaxLength : 指定文本框最大长度, 缺省为100
 * 								word : ellipsis|break, 缺省为break
 * 								prefix : 对结果加前缀
 * 								suffix : 对结果加后缀，特殊变量:
 * 											$sign : 正负号
 * 								format : 显示格式 byte|time|date|datetime|f2|f4|fee2|fee4|3num, (与跟条件显示格式冲突)
 * 												byte : 转换为字节单位
 * 												time : 转换为时间单位
 * 												date : 转换为日期格式
 * 												datetime : 转换为日期时间格式
 * 												f2 : 转换为2位小数
 * 												f4 : 转换为4位小数
 * 												3num : 3位逗号数字格式
 * 												dict: 字典
 * 								color : 显示内容颜色
 * 								style : 指定显示样式
 * 				searchFieldWidth : 搜索框高度, 缺省为250, <=0标签隐藏
 * 				opbtns : 功能按钮, html数组
 * 				searchName : 搜索文本框的name, 缺省为searchFieldFuzzy
 * 				columnLine : 是否显示表格竖线, 缺省为false
 * 				showColumnMenus : 是否显示列菜单, 缺省为true
 * 				showSearchBox : 是否显示搜索条所在行, 缺省为true
 * 				showSearchFilter : 是否显示搜索过滤条件
 * 				hideHeader : 是否隐藏列头, 缺省为false
 * 				showCheckbox : 是否显示复选框列, 缺省为false
 * 				keepCheckbox : 列表刷新时是否保持复选框选中状态, showCheckbox=true才有效, 缺省为true
 * 				dataIdField : 服务器请求数据会放在dataMap中,指定数据的哪个字段为key,缺省为id, 也可以是一个函数(function(row)), 返回id
 * 				singleSelect : 是否单选, 缺省为false
 * 				selectableType : 选择方式, 为空表示都能选, 非空则表示指定节点的类型(dataType)才能被选中, 多个以逗号分隔
 * 				classifyUpload : 是否在列表中渲染上传组件, 缺省为true
 * 				paging : 是否分页, 可以为"passage", 即:paging=true, passage=true
 * 				passage : 是否按passage方式分页, 如果true时需指定passageCountUrl
 * 				autoScrollX : 是否自动滚动条
 * 				enumCdtwinMaxHeight : 枚举条件选项窗口最大高度, 缺省为400
 * 				fixedColumns : 冻结列, {left:count, right:count}
 * 				renderRemark : 表格行备注渲染器 function(index, row, grid) || PrettyDataTableChildExpander
 */
function PrettyDataTable(config) {
	if(CU.isEmpty(config)) throw " the config is empty argument! ";
	if(CU.isEmpty(config.bid)) throw " the config.bid is empty argument! ";
	if(CU.isEmpty(config.url)) throw " the config.url is empty argument! ";
	if(CU.isEmpty(config.columns)) throw " the config.columns is empty argument! ";
	
	var thiz = this;
	config = $.extend({language:DATA_TABLE_LANGUAGE, dom:'ftrlp', pageLength:50, lengthMenu:[10,20,30,40,50,60,70,80,90,100],pagingType:"full_numbers",searching:false,serverSide:true,colReorder:true,pageNum:1,paging:true,passage:false,processing:true,ordering:false,order:[],searchFieldWidth:250,showCheckbox:false,keepCheckbox:true,dataIdField:"id",classifyUpload:true}, config);
	if(config.paging == "passage") {
		config.paging = true;
		config.passage = true;
	}
	$.extend(thiz, config);
	this.conditions = [];
	this.columnLine = config.columnLine===true || config.columnLine===1 || config.columnLine=="1";
	this.showColumnMenus = config.showColumnMenus!==false;
	this.showSearchBox = config.showSearchBox!==false;
	this.showSearchFilter = config.showSearchFilter!==false;
	this.singleSelect = config.singleSelect === true;
	this.enumCdtwinMaxHeight = CU.isEmpty(config.enumCdtwinMaxHeight) ? 400 : config.enumCdtwinMaxHeight;
	this.pageNum = 1;
	this.pageSize = this.pageLength;
	this.totalRows = 0;
//	this.searchLoading = null;
	if(typeof(this.bid)=="string") {
		this.el_base = $("#"+this.bid);
	}else {
		this.el_base = $(this.bid);
		this.bid = this.el_base.attr("id");
		if(CU.isEmpty(this.bid)) this.bid = "PrettyDataTable_"+CU.getId();
	}
	
	this.setTableSettings = function() {
		var key = "TANNUX_TABLE_SETTINGS_" + MENU.id + "_" + thiz.bid;
		var array = ["#"];
		for(var i=0; i<thiz.columns.length; i++) {
			var vis = thiz.dataTable.DataTable().column(i).visible();
			if(vis) array.push(i, "#");
		}
		var val = array.join("");
		window.localStorage.setItem(key, val);
	};
	
	
	this.getTableSettings = function() {
		var key = "TANNUX_TABLE_SETTINGS_" + MENU.id + "_" + thiz.bid;
		return window.localStorage.getItem(key);
	};
	
	this.getDataIdValue = function(row) {
		if(CU.isFunction(thiz.dataIdField)) {
			return thiz.dataIdField(row);
		}
		return row[thiz.dataIdField];
	};
	
	
	this.parseColumnFormatValue = function(value, col) {
		if(!CU.isEmpty(value) && !CU.isEmpty(value) && !CU.isEmpty(col.format)) {
			if(col.format == "byte") {
				value = CU.toByteUnit(value);
			}else if(col.format == "time") {
				value = CU.toTimeUnit(value);
			}else if(col.format == "date") {
				value = CU.toStringDate(value);
			}else if(col.format == "datetime") {
				value = CU.toStringDateTime(value);
			}else if(col.format == "f2") {
				value = (parseFloat(value)/100).toFixed(2);
			}else if(col.format == "f4") {
				value = (parseFloat(value)/10000).toFixed(4);
			}else if(col.format == "3num") {
				value = CU.to3BitNumberFormat(value);
			}else if(col.format=="enum" || col.format=="dict") {
				if(!CU.isEmpty(col.view)) {
					value = PU.getDropValue(col.view, value, true);
				}
			}
		}
		
		if(!CU.isEmpty(value) && (!CU.isEmpty(col.prefix) || !CU.isEmpty(col.suffix))) {
			if(col.prefix=="$sign" || col.suffix=="$sign") {
				var v = parseFloat(value);
				if(!CU.isEmpty(col.prefix)) value = (v>0?"+ ":(v<0?"- ":"")) + value;
				if(!CU.isEmpty(col.suffix)) value += (v>0?" +":(v<0?" -":""));
			}else {
				if(!CU.isEmpty(col.prefix)) value = col.prefix + value;
				if(!CU.isEmpty(col.suffix)) value += col.suffix;
			}
		}
		if(!CU.isEmpty(value) && (!CU.isEmpty(col.color) || !CU.isEmpty(col.style))) {
			var style = CU.isEmpty(col.style) ? "" : CU.trim(col.style+"");
			if(!CU.isEmpty(col.color)) style += (style.length>0&&style.endsWith(';')<0?";":"") + "color:"+col.color+";";
			value = "<span style='"+style+"'>"+value+"</span>";
		}
		return value;
	};
	
	
	this.defaultRender = function(value, type, row, meta) {
		if(!CU.isEmpty(value) && !CU.isEmpty(meta) && !CU.isEmpty(meta.col)) {
			var col = thiz.getColumn(meta.col);
			if(!CU.isEmpty(col) && col.cdtable) {
				if(col.ctype=="number" || col.ctype=="numinval") {
					var decbit = col.decbit;
					if(!CU.isEmpty(decbit) && (decbit=parseInt(decbit,10))>0) {
						value = (parseFloat(value)/Math.pow(10,decbit)).toFixed(decbit);
					}
				}else if(col.ctype=="date" || col.ctype=="dateinval") {
					if(col.dtime=="true" || col.dtime===true) {
						value = CU.toStringDateTime(value);
					}else {
						value = CU.toStringDate(value);
					}
				}else if(col.ctype=="enum" || col.ctype=="dict") {
					if(!CU.isEmpty(col.view)) {
						value = PU.getDropValue(col.view, value, true);
					}
				}
			}
			value = thiz.parseColumnFormatValue(value, col);
		}
		return value;
	};
	
	this.proxyDrawCallback = function(settings) {
		if(thiz.classifyUpload) PU.bindClassifyUploadClick(thiz.el_table);
		if(CU.isFunction(thiz.drawCallback)) thiz.drawCallback(settings);
	};
	
	
	var dispcols = thiz.getTableSettings();
	if(CU.isEmpty(dispcols)) dispcols = "";
	
	if(thiz.showCheckbox) {
		CU.insert(config.columns, 0, {title:'<label class="fancy-checkbox custom-bgcolor-blue" style="padding:0px 0px 0px 7px;margin:0px;"><input type="checkbox" class="input_checkbox_all"><span></span></label>', width:33, type:"checkbox", data:"id", visible:true, className:"text-center", render:function(value, type, row, meta) {
											var disabled = CU.isEmpty(thiz.selectableType) || (","+thiz.selectableType+",").indexOf(","+row.type+",")>=0 ? "" : "disabled";
											return '<label class="fancy-checkbox custom-bgcolor-blue" style="padding:0px;margin:0px;"><input data-id="'+thiz.getDataIdValue(row)+'" class="input_checkbox_item" type="checkbox" '+disabled+'><span></span></label>';
								     }});
	}
	if(CU.isObject(thiz.renderRemark) && !CU.isFunction(thiz.renderRemark)) {
		CU.insert(config.columns, 0, {title:'', width:33, visible:true, className:"text-center", data:"id", render:function(value, type, row, meta) {
			var index = meta.row;
			return '<span id="'+thiz.bid+'-expander-parent-icon-'+index+'" data-row-index="'+index+'" name="'+thiz.bid+'-expander-parent-icon" style="cursor:pointer;"><i class="fa fa-plus-square-o"></i></span>';
	    }});
	}
	for(var i=0; i<config.columns.length; i++) {
		var column = config.columns[i];
		column.index = i;
		if(CU.isEmpty(column.data)) throw " the columns["+i+"].data is empty! ";
		if(CU.isEmpty(column.defaultContent)) column.defaultContent = "&nbsp;";
		if(CU.isEmpty(column.orderable)) column.orderable = false;
		if(CU.isEmpty(column.searchable)) column.searchable = false;
		if(CU.isEmpty(column.align)) column.align = "left";
		if(CU.isEmpty(column.render)) column.render = thiz.defaultRender;
		if(CU.isEmpty(dispcols)) {
			if(CU.isEmpty(column.visible)) column.visible = true;
		}else {
			column.visible = dispcols.indexOf("#"+i+"#") >= 0;
		}
		if(column.cdtable) {
			if(CU.isEmpty(column.ctype)) column.ctype = "string";
			if(CU.isEmpty(column.decbit)) column.decbit = 0;
			if(CU.isEmpty(column.dtime)) column.dtime = false;
			this.conditions.push(column);
		}
	}
	
	if(thiz.autoScrollX===true || thiz.autoScrollX=="true") {
		var size = 0;
		for(var i=0; i<config.columns.length; i++) {
			var width = config.columns[i].width;
			var t = typeof(width);
			var w = 0;
			if(t != "number") {
				width = CU.trim(width + "");
				if(/^([0-9]+)([.][0-9]+)?$/.test(width)) {
					w = parseInt(width, 10) + 5;
				}
			}else {
				w = width;
			}
			if(w <= 0) w = 100;
			size += w;
		}
		config.sScrollX = "100%";
		config.sScrollXInner = size+"px";
		config.bScrollCollapse = true;
	}
	
	this.url = config.url;
	this.getParams = config.getParams;
	this.errcb = config.errcb;
	
	this.config = config;
	this.columns = config.columns;
	this.searchFieldWidth = config.searchFieldWidth;
	this.searchName = config.searchName;
	if(CU.isEmpty(this.searchName)) this.searchName = "searchFieldFuzzy";
	this.dataMap = {};		//key=record.id
	this.dataArray = [];
	
	this.opbtns = [];
	if(!CU.isEmpty(config.opbtns)) {
		if(CU.isArray(config.opbtns)) {
			for(var i=0; i<config.opbtns.length; i++) {
				this.opbtns.push($(config.opbtns[i]));
			}
		}else {
			this.opbtns.push($(config.opbtns));
		}
	}
	
	delete config.url;
	config.getParams = null;
	config.errcb = null;
	config.conditions = null;
	config.opbtns = null;
	delete config.searchName;
	delete config.columnLine;
	
	
	this.setHeadAlign = function() {
		var ths = thiz.el_base.find("th");
		if(!CU.isEmpty(ths) && ths.length>0) {
			for(var i=0; i<ths.length; i++) {
				var th = $(ths[i]);
				var idx = parseInt(th.attr("data-column-index"), 10);
//				th.attr('style', 'text-align:'+thiz.columns[idx].align+';');
				th.addClass("text-"+thiz.columns[idx].align);
			}
		}
	};
	this.setRowAlign = function(row) {
		var tds = $(row).children();
		if(!CU.isEmpty(tds) && tds.length>0) {
			var ths = thiz.el_base.find("th");
			for(var i=0; i<ths.length; i++) {
				var th = $(ths[i]);
				var idx = parseInt(th.attr("data-column-index"), 10);
//				$(tds[i]).attr('style', 'text-align:'+thiz.columns[idx].align+';');
				var col = thiz.columns[idx];
				if(!CU.isEmpty(col)) $(tds[i]).addClass("text-"+col.align);
			}
		}
	};
	
	
	this.setRowWordStyle = function(row) {
		var tds = $(row).children();
		if(!CU.isEmpty(tds) && tds.length>0) {
			var ths = thiz.el_base.find("th");
			for(var i=0; i<ths.length; i++) {
				var col = thiz.columns[idx];
				if(CU.isEmpty(col)) continue; 
				var th = $(ths[i]);
				var idx = parseInt(th.attr("data-column-index"), 10);
				var style = col.word;
				if(CU.isEmpty(style)) style = "break";
				$(tds[i]).addClass("text-"+style);
			}
		}
	};
	
	this.setColumnAlign = function(idx) {
		var ths = thiz.el_base.find("th");
		if(!CU.isEmpty(ths) && ths.length>0) {
			for(var i=0; i<ths.length; i++) {
				var th = $(ths[i]);
				var cidx = parseInt(th.attr("data-column-index"), 10);
				if(cidx == idx) {
					th.attr('style', 'text-align:'+thiz.columns[idx].align+';');
					
					var trs = thiz.el_base.find("tr");
					if(!CU.isEmpty(trs) && trs.length>1) {
						for(var j=1; j<trs.length; j++) {
							var row = $(trs[j]);
							row.find('td:eq('+i+')').attr('style', 'text-align:'+thiz.columns[idx].align+';');
						}
					}
					break;
				}
			}
		}
	};
	
	this.getColumn = function(idx) {
		if(CU.isEmpty(idx)) return ;
		if(typeof(idx) == "number") {
			if(idx>=0 && idx<thiz.columns.length) {
				return thiz.columns[idx];
			}
		}else {
			idx = CU.trim(idx+"");
			if(/^[0-9]+$/.test(idx)) {
				idx = parseInt(idx, 10);
				if(idx>=0 && idx<thiz.columns.length) {
					return thiz.columns[idx];
				}
			}else {
				for(var i=0; i<thiz.columns.length; i++) {
					var col = thiz.columns[i];
					if(col.data == idx) {
						return col;
					}
				}
			}
		}
	};
	
	
	
	this.buildConditionInput = function() {
		if(CU.isEmpty(thiz.conditions)) return ;
		var has = false;
		for(var i=0; i<thiz.conditions.length; i++) {
			if(thiz.conditions[i].ctype!="enum" && thiz.conditions[i].ctype!="dict") {
				has = true;
				break ;
			}
		}
		if(CU.isEmpty(PU.DATATABLE_HEADER_INPUTEDIT_WIN)) {
			var html = ['<div class="popover fade bottom in editable-container editable-popup" role="tooltip" style="max-width:350px;z-index: 9999;top:100px;left:400px;display:none;">',
						'	<div class="arrow"></div>',
						'	<div class="popover-content">',
						'		<div class="form-horizontal" style="padding-top: 10px; padding-left: 15px; padding-right: 15px;">',
						'			<div class="form-group table-condition-input-row" condition-type="string">',
						'				<div class="pull-left lw260">',
						'					<input type="text" ctype="string" class="form-control" maxlength="100">',
						'				</div>',
						'			</div>',
						'			<div class="form-group table-condition-input-row" condition-type="number">',
						'				<div class="pull-left lw260">',
						'					<input type="text" ctype="number" class="form-control tannux-input-number" maxlength="8">',
						'				</div>',
						'			</div>',
						'			<div class="form-group table-condition-input-row" condition-type="date">',
						'				<div class="pull-left lw260">',
						'					<div class="input-group date" data-date-autoclose="true" data-provide="datepicker" data-date-autoclose="true" data-date-format="yyyy-mm-dd" >',
						'						<input type="text" ctype="date" class="form-control">',
						'						<span class="input-group-addon"><i class="fa fa-calendar"></i></span>',
						'					</div>',
						'				</div>',
						'			</div>',
						'			<div class="form-group table-condition-input-row" condition-type="dateinval">',
						'				<div class="pull-left lw260">',
						'					<div class="input-daterange input-group" data-provide="datepicker" data-date-format="yyyy-mm-dd">',
						'						<input ctype="dateinval" data-provide="datepicker" data-date-autoclose="true" class="form-control" data-date-format="yyyy-mm-dd">',
						'						<span class="input-group-addon">-</span>',
						'						<input ctype="dateinval" data-provide="datepicker" data-date-autoclose="true" class="form-control" data-date-format="yyyy-mm-dd">',
						'					</div>',
						'				</div>',
						'			</div>',
						'			<div class="form-group table-condition-input-row" condition-type="numinval">',
						'				<div class="pull-left lw260">',
						'					<div class="input-daterange input-group">',
						'						<input type="text" ctype="numinval" class="form-control tannux-input-number" maxlength="8">',
						'						<span class="input-group-addon">-</span>',
						'						<input type="text" ctype="numinval" class="form-control tannux-input-number" maxlength="8">',
						'					</div>',
						'				</div>',
						'			</div>',
						'			<div class="form-group table-condition-input-row" condition-type="enum">',
						'				<div class="pull-left lw260" style="max-height:',thiz.enumCdtwinMaxHeight,'px;overflow-y:auto;">',
						'				</div>',
						'			</div>',
						'			<div class="form-group" style="text-align: center;">',
						'				<button type="button" class="btn btn-success">确定</button>&nbsp;&nbsp;<button type="button" class="btn btn-default">取消</button>',
						'			</div>',
						'		</div>',
						'	</div>',
						'</div>'];
			PU.DATATABLE_HEADER_INPUTEDIT_WIN = $(html.join(''));
			$("body").append(PU.DATATABLE_HEADER_INPUTEDIT_WIN);
			PU.DATATABLE_HEADER_INPUTEDIT_WIN.find("input").bind("keyup", function(e) {
				if(e.keyCode === 13) PU.DATATABLE_HEADER_INPUTEDIT_WIN.find("button.btn-success").click();
			});
			PU.DATATABLE_HEADER_INPUTEDIT_WIN.find("button.btn-success").bind("click", function() {
				var el_win = PU.DATATABLE_HEADER_INPUTEDIT_WIN;
				var ctype = el_win.attr("ctype");
				var idx = el_win.attr("column-index");
				if(CU.isFunction(el_win[0].callback)) {
					var value = "";
					var els = el_win.find("input[ctype='"+ctype+"']");
					if(ctype=="enum" || ctype=="dict") {
						value = [];
						for(var i=0; i<els.length; i++) {
							var el_cb = $(els[i]);
							if(el_cb.is(":checked")) {
								value.push(el_cb.attr("data-value"));
							}
						}
					}else {
						if(els.length == 1) {
							value = CU.trim($(els[0]).val());
						}else {
							value = [];
							for(var i=0; i<els.length; i++) {
								value.push(CU.trim($(els[i]).val()));
							}
						}
					}
					el_win[0].callback(ctype, idx, value);
				}
				el_win.css("display", "none");
			});
			PU.DATATABLE_HEADER_INPUTEDIT_WIN.find("button.btn-default").bind("click", function() {
				PU.DATATABLE_HEADER_INPUTEDIT_WIN.css("display", "none");
			});
		}
		return PU.DATATABLE_HEADER_INPUTEDIT_WIN;
	};
	
	this.showConditionInput = function(el_icon, idx, col) {
		var el_win = thiz.buildConditionInput();
		if(CU.isEmpty(el_win)) return ;
		
		el_win.find(".table-condition-input-row").css("display", "none");
		el_win.find("div[condition-type='"+col.ctype+"']").css("display", "block");
		el_win.attr("ctype", col.ctype);
		el_win.attr("column-index", idx);
		el_win[0].callback = thiz.showConditionInputCallback;
		
		if(col.ctype=="enum" || col.ctype=="dict") {
			var el_enums = $(el_win.find("div[condition-type='"+col.ctype+"']").children(1));
			el_enums.html("");
			
			var es = DROP[col.view];
			if(!CU.isEmpty(es)) {
				var html = [];
				for(var i=0; i<es.length; i++) {
					var r = es[i];
					html.push('<div class="fancy-checkbox custom-bgcolor-blue"><label class="control-label" style="padding-left:7px;"><input type="checkbox" ctype="enum" data-column-index="'+idx+'" data-value="'+r.code+'" ><span>',r.name,'</span></label></div>');
				}
				el_enums.html(html.join(""));
			}
		}
		
		var value = thiz.getConditionInputValue(idx);
		var els = el_win.find("input[ctype='"+col.ctype+"']");
		if(!CU.isEmpty(els) && els.length>0) {
			if(CU.isEmpty(value)) value = "";
			var isarr = CU.isArray(value);
			if(col.ctype=="numinval" || col.ctype=="dateinval") {
				$(els[0]).val(isarr ? value[0] : "");
				$(els[1]).val(isarr ? value[1] : "");
			}else if(col.ctype=="enum" || col.ctype=="dict") {
				if(isarr && !CU.isEmpty(value)) {
					for(var i=0; i<els.length; i++) {
						var el_cb = $(els[i]);
						if(value.indexOf(el_cb.attr("data-value")) >= 0) {
							el_cb.prop("checked", true);
						}
					}
				}
			}else {
				$(els[0]).val(isarr ? value[0] : value);
			}
		}
		
		var off = el_icon.offset();
		el_win.css("top", off.top+25);
		
		var left = off.left+60-200;
		if(left < 200) left = 200;
		el_win.css("left", left);
		el_win.css("display", "block");
	};
	
	this.onHeaderConditionClick = function() {
		var el = $(this);
		var idx = el.attr("data-column-index");
		var col = thiz.getColumn(idx);
		if(CU.isEmpty(col)) return ;
		if(CU.isFunction(col.cdtor)) {
			col.cdtor(idx, col, thiz);
		}else {
			thiz.showConditionInput(el, idx, col);
		}
	};
	this.onHeaderEnumConditionShow = function() {
		var el = $(this);
		var idx = el.attr("data-column-index");
		var el_cdt = thiz.el_table_cdt.find("span[column-index='"+idx+"']");
		var el_cbs = el.find(".table-header-cdt-enum-option");
		for(var i=0; i<el_cbs.length; i++) {
			$(el_cbs[i]).prop("checked", false);
		}
		
		if(!CU.isEmpty(el_cdt) && el_cdt.length>0) {
			var vals = $(el_cdt[0]).attr("cdt-value");
			if(!CU.isEmpty(vals)) {
				vals = "," + vals + ",";
				var el_cbs = el.find(".table-header-cdt-enum-option");
				for(var i=0; i<el_cbs.length; i++) {
					el_cb = $(el_cbs[i]);
					if(vals.indexOf(","+el_cb.attr("data-value")+",") >= 0) {
						el_cb.prop("checked", true);
					}
				}
			}
		}
	};
	
	this.onHeaderEnumConditionClick = function() {
		var el = $(this);
		var el_ul = el.parent().parent().parent().parent();
		var idx = el.attr("data-column-index");
		var vals = [];
		var el_cbs = el_ul.find(".table-header-cdt-enum-option");
		for(var i=0; i<el_cbs.length; i++) {
			var el_cb = $(el_cbs[i]);
			if(el_cb.is(":checked")) {
				vals.push(el_cb.attr("data-value"));
			}
		}
		thiz.setEnumConditionValue(idx, vals);
		thiz.refresh();
	};
	this.showConditionInputCallback = function(type, idx, value) {
		if(CU.isEmpty(idx)) return ;
		if(type=="numinval" || type=="dateinval") {
			var isarr = CU.isArray(value);
			var v1 = isarr && value.length>0 ? value[0] : "";
			var v2 = isarr && value.length>1 ? value[1] : "";
			thiz.addConditionValue(idx, v1, v2);
		}else if(type=="enum" || type=="dict") {
			thiz.setEnumConditionValue(idx, value);
		}else {
			thiz.addConditionValue(idx, value);
		}
		thiz.refresh();
	};
	
	
	this.getQueryCondition = function() {
		var cdt = thiz.getConditionValues();
		var sv = CU.trim(thiz.el_text_search.val()+"");
		if(!CU.isEmpty(sv)) {
			if(sv.indexOf('%')<0 && sv.indexOf('_')<0) sv = "%"+sv+"%";
			cdt[thiz.searchName] = sv;
		}
		return cdt;
	};
	
	/**
	 * 兼容老版本
	 */
	this.getConditionValue = function() {
		return thiz.getConditionValues();
	};
	
	this.getConditionValues = function() {
		var el_spans = thiz.el_table_cdt.find("span");
		var cdt = {};
		if(!CU.isEmpty(el_spans) && el_spans.length>0) {
			for(var i=0; i<el_spans.length; i++) {
				var el_val = $(el_spans[i]);
				var name = el_val.attr("column-id");
				if(CU.isEmpty(name)) continue ;
				var val = thiz.getConditionInputValueByEl(el_val);
				if(typeof(val)=="string") val = CU.trim(val);
				if(!CU.isEmpty(val)) {
					var ctype = el_val.attr("column-ctype");
					var decbit = parseInt(el_val.attr("column-decbit"), 10);
					var pow10 = decbit>0 ? Math.pow(10,decbit) : 1;
					var dtime = el_val.attr("column-dtime") == "true";
					if(ctype == "string") {
						if(val.indexOf('%')<0 && val.indexOf('_')<0) {
							val = "%"+val+"%";
						}
						cdt[name+"Fuzzy"] = val;
					}else if(ctype == "number") {
						if(decbit > 0) val = parseInt(parseFloat(val)*pow10, 10);
						cdt[name] = val;
					}else if(ctype=="enum" || ctype=="dict") {
						if(typeof(val)=="string")val = val.split(',');
						cdt[name+"s"] = val;
					}else if(ctype == "date") {
						val = val.replace(/-/g, "");
						if(dtime) val += "000000";
						cdt[name] = val;
					}else if(ctype=="numinval" || ctype=="dateinval") {
						if(CU.isArray(val) && val.length==2) {
							name = CU.upfirstChar(name);
							var v1 = CU.trim(val[0]+"");
							var v2 = CU.trim(val[1]+"");
							if(v1.length > 0) {
								if(ctype=="numinval" && decbit>0) v1 = parseInt(parseFloat(v1)*pow10, 10);
								if(ctype=="dateinval") {
									v1 = v1.replace(/-/g, "");
									if(dtime) v1 += "000000";
								}
								cdt["start"+name] = v1;
							}
							if(v2.length > 0) {
								if(ctype=="numinval" && decbit>0) v2 = parseInt(parseFloat(v2)*pow10, 10);
								if(ctype=="dateinval") {
									v2 = v2.replace(/-/g, "");
									if(dtime) v2 += "235959";
								}
								cdt["end"+name] = v2;
							}
						}
					}
				}
			}
		}
		return cdt;
	};
	
	
	/**
	 * 设置条件
	 * 区间值：例字段为: payTime, 传入值：startPayTime, endPayTime
	 * 		  例字段为: order.payTime, 传入值：order.startPayTime, order.endPayTime
	 * 枚举多值：例字段为：status, 传入值：{status:"1,2,3"}，或{status:[1,2,3]}
	 * 		    例字段为：order.status, 传入值：{"order.status":"1,2,3"}，或{"order.status":[1,2,3]}
	 */
	this.setConditionValues = function(cdt) {
		if(!CU.isObject(cdt)) return ;
		for(var k in cdt) {
			if(CU.isEmpty(k)) {
				continue ;
			}
			var v = cdt[k];
			var ev = "";
			var pi = k.lastIndexOf('.');
			var k2 = pi>=0 ? k.substring(pi+1) : k;
			
			if(k2.startsWith("start")) {
				if(pi >= 0) {
					k2 = k2.substring(5);
					var p = k.substring(0, pi+1);
					ev = cdt[p + "end"+k2];
					k = p + CU.lowerFirstChar(k2);
				}else {
					k = k.substring(5);
					ev = cdt["end"+k];
					k = CU.lowerFirstChar(k);
				}
			}else if(k.startsWith("end")) {
				ev = v;
				if(pi >= 0) {
					k2 = k2.substring(3);
					var p = k.substring(0, pi+1);
					v = cdt[p + "start"+k2];
					k = p + CU.lowerFirstChar(k2);
				}else {
					k = k.substring(3);
					v = cdt["start"+k];
					k = CU.lowerFirstChar(k);
				}
			}
			
			var col = thiz.getColumn(k);
			if(CU.isEmpty(col)) continue ;
			
			if(!CU.isEmpty(v) || !CU.isEmpty(ev)) {
				var ctype = col.ctype;
				if(ctype=="enum" || ctype=="dict") {
					if(!CU.isEmpty(v)) {
						if(!CU.isArray(v)) v = (v+"").split(',');
						for(var i=0; i<v.length; i++) {
							thiz.addConditionValue(col.index, v[i]);
						}
					}
				}else {
					if(!CU.isEmpty(v)) v = CU.trim(v+"");
					if(!CU.isEmpty(ev)) ev = CU.trim(ev+"");
					var pow10 = col.decbit>0 ? Math.pow(10,col.decbit) : 1;
					var dtime = col.dtime=="true" || col.dtime===true;
					if((col.ctype=="number"||col.ctype=="numinval") && pow10>1) {
						if(!CU.isEmpty(v)) v = parseInt(parseFloat(v)/pow10, 10);
						if(!CU.isEmpty(ev)) ev = parseInt(parseFloat(ev)/pow10, 10);
					}else if((col.ctype=="date"||col.ctype=="dateinval")) {
						if(!CU.isEmpty(v)) {
							if(dtime && v.length>6) v = v.substring(0, v.length-6);
							v = CU.toStringDate(v);
						}
						if(!CU.isEmpty(ev)) {
							if(dtime && ev.length>6) ev = ev.substring(0, ev.length-6);
							ev = CU.toStringDate(ev);
						}
					}
					thiz.addConditionValue(col.index, v, ev);
				}
			}
		}
	};
	
	
	/**
	 * 删除条件
	 * @param names : 数组或逗号分隔的字符串
	 */
	this.removeConditionValues = function(names) {
		if(CU.isEmpty(names)) return ;
		if(typeof(names)=="string") {
			names = names.split(',');
		}
		if(!CU.isArray(names)) {
			names = [names];
		}
		
		var els = thiz.el_table_cdt.find(".table-condition-remove-item");
		if(!CU.isEmpty(els) && els.length>0) {
			for(var i=0; i<els.length; i++) {
				var el = $(els[i]);
				var cid = el.attr("column-id");
				if(!CU.isEmpty(cid) && names.indexOf(cid)>=0) {
					el.parent().parent().remove();
				}
			}
		}
	};
	
	this.clearConditionValues = function() {
		thiz.el_table_cdt.html("");
	};
	
	this.getConditionInputValues = function() {
		var el_spans = thiz.el_table_cdt.find("span");
		var cdt = {};
		if(!CU.isEmpty(el_spans) && el_spans.length>0) {
			for(var i=0; i<el_spans.length; i++) {
				var el_val = $(el_spans[i]);
				var name = el_val.attr("column-id");
				if(CU.isEmpty(name)) continue ;
				var val = thiz.getConditionInputValueByEl(el_val);
				if(!CU.isEmpty(val)) {
					cdt[name] = val;
				}
			}
		}
		return cdt;
	};
	
	
	this.getConditionInputValue = function(idx) {
		var el_span = thiz.el_table_cdt.find("span[column-index='"+idx+"']");
		if(!CU.isEmpty(el_span) && el_span.length>0) {
			var el_val = $(el_span[0]);
			return thiz.getConditionInputValueByEl(el_val);
		}
	};
	this.getConditionInputValueByEl = function(el_val) {
		var type = el_val.attr("column-ctype");
		if(type=="numinval" || type=="dateinval") {
			var v1 = el_val.attr("cdt-start-value");
			var v2 = el_val.attr("cdt-end-value");
			return [v1, v2];
		}else if(type=="enum" || type=="dict") {
			var val = el_val.attr("cdt-value");
			if(!CU.isEmpty(val)) {
				return val.split(",");
			}
		}else {
			return el_val.attr("cdt-value");
		}
	};
	
	this.addConditionValue = function(idx, value, evalue) {
		var col = thiz.getColumn(idx);
		if(CU.isEmpty(col) || CU.isEmpty(col.data)) return ;
		var cid = CU.trim(col.data + "");
		if(cid.indexOf('.')>=0) cid = cid.substring(cid.lastIndexOf('.')+1);
		var el_old = thiz.el_table_cdt.find(".table-condition-item-"+cid);
		if(CU.isEmpty(el_old) || el_old.length==0) {
			var html = ['<div class="pull-left table-condition-item-',cid,'" style="padding:7px 5px 7px 5px;">',
						'	<div class="form-control" style="padding: 5px 6px;border-radius: 10px;height: 32px;">',
						'		&nbsp;',col.title,'：<span class="table-condition-value" column-index="',idx,'" column-id="',cid,'" column-ctype="',col.ctype,'" column-decbit="',col.decbit,'" column-dtime="',col.dtime,'" column-view="',col.view,'"></span></a>',
						'		<a href="###" class="table-condition-remove-item" column-id="',cid,'" style="color:#FF0000;"><i class="fa fa-times"></i></a>',
						'	</div>',
						'</div>'];
			el_old = $(html.join(''));
			thiz.el_table_cdt.append(el_old);
			el_old.find(".table-condition-remove-item").bind("click", thiz.removeConditionValue);
		}else {
			el_old = $(el_old[0]);
		}
		
		if(CU.isEmpty(value)) value = "";
		if(CU.isEmpty(evalue)) evalue = "";
		if(CU.isEmpty(value) && CU.isEmpty(evalue)) {
			el_old.remove();
			return ;
		}
		
		var el_val = $(el_old.find(".table-condition-value")[0]);
		if(col.ctype=="enum" || col.ctype=="dict") {
			var disp = PU.getDropValue(col.view, value);
			var name = el_val.html();
			var code = el_val.attr("cdt-value");
			if(CU.isEmpty(code)) {
				el_val.html(disp);
				el_val.attr("cdt-value", value)
			}else {
				if((","+code+",").indexOf(","+value+",") < 0) {
					el_val.html(name+",&nbsp;"+disp);
					el_val.attr("cdt-value", code+","+value);
				}
			}
		}else if(col.ctype=="numinval" || col.ctype=="dateinval") {
			var s = "";
			if(!CU.isEmpty(value) && !CU.isEmpty(evalue)) {
				s = value + "至" + evalue;
			}else if(!CU.isEmpty(value)) {
				s = "起始"+value;
			}else if(!CU.isEmpty(evalue)) {
				s = "截止"+evalue;
			}
			el_val.html(s);
			el_val.attr("cdt-start-value", value);
			el_val.attr("cdt-end-value", evalue);
		}else {
			el_val.html(value);
			el_val.attr("cdt-value", value)
		}
	};
	
	this.removeConditionValue = function(el_value) {
		$(this).parent().parent().remove();
		thiz.refresh();
	};
	
	this.setEnumConditionValue = function(idx, vals) {
		var col = thiz.getColumn(idx);
		if(CU.isEmpty(col) || CU.isEmpty(col.data)) return ;
		var cid = CU.trim(col.data + "");
		if(cid.indexOf('.')>=0) cid = cid.substring(cid.lastIndexOf('.')+1);
		var el_old = thiz.el_table_cdt.find(".table-condition-item-"+cid);
		if(!CU.isEmpty(el_old) && el_old.length>0) {
			el_old = $(el_old[0]);
			if(CU.isEmpty(vals)) {
				el_old.remove();
			}else {
				var el_val = $(el_old.find(".table-condition-value")[0]);
				el_val.html("");
				el_val.attr("cdt-value", "");
			}
		}
		if(!CU.isEmpty(vals)) {
			for(var i=0; i<vals.length; i++) {
				thiz.addConditionValue(idx, vals[i]);
			}
		}
	};
	
	this.addHeaderConditionIcon = function(el_th, index, column) {
		if(el_th.find(".table-header-condition-icon").length > 0) return;
		if(column.cdtable!==true) return ;
//		if(column.ctype == "enum") {
//			if(CU.isEmpty(column.view)) return ;
//			var rs = DROP[column.view];
//			if(CU.isEmpty(rs)) return ;
//			var html = ['<div class="btn-group" style="vertical-align: top;" data-column-index="'+index+'">',
//						'<i class="fa fa-filter table-header-condition-icon" style="cursor:pointer;" data-toggle="dropdown" aria-expanded="false"></i>',
//						'<ul class="dropdown-menu dropdown-menu-right" role="menu">'];
//			for(var i=0; i<rs.length; i++) {
//				var r = rs[i];
//				html.push('<li><div class="fancy-checkbox custom-bgcolor-blue"><label class="control-label" style="padding-left:7px;"><input type="checkbox" data-column-index="'+index+'" data-value="'+r.code+'" class="table-header-cdt-enum-option"><span>',r.name,'</span></label></div></li>');
//			}
//			html.push('</ul></div>');
//			var el_icon = $(html.join(''));
//			el_th.append(el_icon);
//			el_icon.find(".table-header-cdt-enum-option").bind("change", thiz.onHeaderEnumConditionClick);
//			el_icon.find("ul").bind("click",function (e) {e.stopPropagation();});
//			el_icon.bind("click", thiz.onHeaderEnumConditionShow);
//		}else {
			var el_icon = $('<i class="fa fa-filter table-header-condition-icon" style="cursor:pointer;"'
							+ ' data-column-index="'+index+'"></i>');
			el_th.append(el_icon);
			el_icon.bind("click", thiz.onHeaderConditionClick);
//		}
	};
	
	this.fillConditionHeader = function() {
		if(thiz.hideHeader===true || !thiz.showSearchFilter) return ;
		var el_thead = thiz.el_base.find("thead");
		if(CU.isEmpty(el_thead) || el_thead.length==0) return ;
		el_thead = $(el_thead[0]);
		for(var i=0; i<thiz.columns.length; i++) {
			var col = thiz.columns[i];
			if(!col.cdtable) continue;
			var el_th = el_thead.find("th[data-column-index='"+i+"']");
			if(CU.isEmpty(el_th) || el_th.length==0) continue;
			el_th = $(el_th[0]);
			thiz.addHeaderConditionIcon(el_th, i, col);
		}
	};
	
	config.rowCallback = function(row, data, displayNum, displayIndex, dataIndex) {
		thiz.setRowAlign(row);
		thiz.setRowWordStyle(row);
	};
	
	
//	config.preDrawCallback = function() {
//		if(thiz.el_btn_search.prop("disabled")) {
//			return false;
//		}
//	};
	
	this.saveCheckboxStatus = function() {
		if(!thiz.showCheckbox || !thiz.keepCheckbox) return ;
		thiz.CheckboxIds = thiz.getSelectRecordIds();
	};
	this.restoreCheckboxStatus = function() {
		if(!thiz.showCheckbox || !thiz.keepCheckbox || CU.isEmpty(thiz.CheckboxIds)) return ;
		var els = thiz.el_base.find(".input_checkbox_item");
		if(!CU.isEmpty(els) && els.length>0) {
			for(var i=0; i<els.length; i++) {
				var el = $(els[i]);
				if(thiz.CheckboxIds.indexOf(el.attr("data-id")) >= 0) {
					el.prop("checked", true);
				}
			}
		}
	};
	this.clearCheckboxStatus = function() {
		delete thiz.CheckboxIds;
	};
	
	this.getTotalRows = function() {
		return thiz.totalRows;
	};
	
	
	this.getRecord = function(id) {
		if(CU.isEmpty(id, true)) return null;
		return thiz.dataMap[id+""];
	};
	
	this.resetDataMap = function(data) {
		thiz.dataMap = {};
		thiz.dataArray = [];
		if(!CU.isEmpty(data) && CU.isArray(data)) {
			for(var i=0; i<data.length; i++) {
				var row = data[i];
				var pk = thiz.getDataIdValue(row);
				if(!CU.isEmpty(pk, true)) {
					thiz.dataMap[pk+""] = row;
				}
				thiz.dataArray.push(row);
			}
		}
		thiz.el_base.find(".input_checkbox_all").prop("checked", false);
	};
	
	this.getAllRecords = function() {
		return thiz.dataArray;
	};
	
	this.getSelectRecords = function() {
		var els = thiz.el_base.find(".input_checkbox_item");
		var records = [];
		if(!CU.isEmpty(els) && els.length>0) {
			for(var i=0; i<els.length; i++) {
				var el = $(els[i]);
				if(el.is(":checked")) {
					var id = el.attr("data-id");
					var r = thiz.getRecord(id);
					if(!CU.isEmpty(r, true)) {
						records.push(r);
					}
				}
			}
		}
		return records;
	};
	
	this.getSelectRecordIds = function() {
		var els = thiz.el_base.find(".input_checkbox_item");
		var ids = [];
		if(!CU.isEmpty(els) && els.length>0) {
			for(var i=0; i<els.length; i++) {
				var el = $(els[i]);
				if(el.is(":checked")) {
					var id = el.attr("data-id");
					ids.push(id);
				}
			}
		}
		return ids;
	};
	
	
	this.setSelectRecords = function(ids) {
		var els = thiz.el_base.find(".input_checkbox_item");
		if(!CU.isEmpty(els) && els.length>0) {
			var has = !CU.isEmpty(ids);
			if(has && typeof(ids)=="string") ids = ids.split(",");
			if(has && !CU.isArray(ids)) ids = [ids];
			
			for(var i=0; i<els.length; i++) {
				var el = $(els[i]);
				var id = el.attr("data-id");
				var ba = has && !CU.isEmpty(id) && ids.indexOf(id)>=0;
				el.prop("checked", ba);
			}
		}
	};
	
	
	this.getLoading = function() {
		if(CU.isEmpty(thiz.searchLoading)) {
			return thiz.el_search_btn;
		}else {
			return [thiz.el_search_btn, thiz.searchLoading];
		}
	};
	
	this.isPassage = function() {
		return thiz.paging===true && thiz.passage===true;
	};
	
	this.correctResult = function(rs, pageSize) {
		if(CU.isArray(rs)) {
			rs = {pageNum:1,pageSize:rs.length,totalRows:rs.length,totalPages:1,hasNext:false,data:rs};
		}else {
			if(CU.isEmpty(rs)) rs = {};
			if(thiz.isPassage()) {
				rs.pageNum = thiz.pageNum;
				rs.pageSize = pageSize;
				rs.totalRows = thiz.totalRows;
			}
			if(rs.data===null || rs.data===undefined) rs.data = [];
		}
		return rs;
	};
	
	this.ajaxCallback = function(data, callback, settings, pageNum, pageSize, ps, rs) {
		rs = thiz.correctResult(rs, pageSize);
		thiz.resetDataMap(rs.data);
		
		if(!thiz.isPassage() || CU.isEmpty(thiz.passageCountUrl)) {
			thiz.totalRows = rs.totalRows;
		}
		
		thiz.el_base.find("span[name=DATATABLE_TOTALROWS]").html(rs.totalRows);
		callback({draw:data.draw, recordsTotal:rs.totalRows, recordsFiltered:rs.totalRows, data:rs.data});
		thiz.restoreCheckboxStatus();
		thiz.doRenderRowRemark(rs.data);
		if(thiz.showCheckbox) thiz.checkCBColumnSelectAll();
	};
	this.passageCountCallback = function(data, callback, settings, totalRows) {
		if(CU.isEmpty(totalRows)) totalRows = 0;
		thiz.totalRows = totalRows;
		thiz.el_base.find(".dataTables_length").css("display", "block");
		thiz.el_base.find(".dataTables_paginate").css("display", "block");
		thiz.el_base.find("span[name=DATATABLE_TOTALROWS]").html(totalRows);
		settings._iRecordsTotal = totalRows;
		settings._iRecordsDisplay = totalRows;
//		thiz.dataTable._fnProcessingDisplay(settings, true);
	};
	
	this.ajax = function(data, callback, settings) {
		var start = parseInt(data.start, 10);
		var pageSize = thiz.pageSize = parseInt(data.length, 10);
		var pageNum = thiz.pageNum = parseInt(start/pageSize, 10) + 1;
		var orders = null;
		if(thiz.ordering && !CU.isEmpty(data.order)) {
			var idx = data.order[0].column;
			var direct = data.order[0].dir;
			orders = thiz.columns[idx].data;
			if(!CU.isEmpty(direct) && !CU.isEmpty(orders)) {
				if(orders.indexOf('.')>0) orders = orders.substring(orders.lastIndexOf('.')+1);
				orders += " " + direct;
			}
		}
		var cdt = thiz.getQueryCondition();
		var ps = [pageNum, pageSize, cdt, orders, ""];
		if(CU.isFunction(thiz.getParams)) {
			ps = thiz.getParams(pageNum, pageSize, cdt, orders, "", thiz);
		}
		if(ps === false) {
			thiz.el_base.find(".dataTables_processing").css("display", "none");
			return ;
		}
		
		if(thiz.act == "simple") {
			if(!CU.isArray(ps)) ps = [ps];
			RS.simple({addroot:thiz.addroot,url:thiz.url, ps:ps, errcb:thiz.errcb, loading:thiz.getLoading(), cb:function(rs) {
				thiz.ajaxCallback(data, callback, settings, pageNum, pageSize, ps, rs);
			}});
			if(thiz.isPassage() && !CU.isEmpty(thiz.passageCountUrl) && (pageNum==1||pageNum=="1")) {
				RS.simple({addroot:thiz.addroot,url:thiz.passageCountUrl, ps:ps, cb:function(c) {
					thiz.passageCountCallback(data, callback, settings, c);
				}});
			}
		}else {
			if(CU.isArray(ps)) ps = {pageNum:ps[0], pageSize:ps[1], cdt:ps[2], orders:ps[3], qs:ps[4]};
			RS.rest2({addroot:thiz.addroot,url:thiz.url, ps:ps, errcb:thiz.errcb, loading:thiz.getLoading(), cb:function(rs) {
				thiz.ajaxCallback(data, callback, settings, pageNum, pageSize, ps, rs);
			}});
			if(thiz.isPassage() && !CU.isEmpty(thiz.passageCountUrl) && (pageNum==1||pageNum=="1")) {
				RS.rest2({addroot:thiz.addroot,url:thiz.passageCountUrl, ps:ps, errcb:thiz.errcb, cb:function(c) {
					thiz.passageCountCallback(data, callback, settings, c);
				}});
			}
		}
	};
	
	
	if(CU.isEmpty(config.ajax)) {
		config.ajax = thiz.ajax;
	}
	
	this.el_text_search = $('<input name="'+thiz.searchName+'" type="text" class="form-control">');
	this.el_search_btn = $('<span class="search-icon"><i class="fa fa-search"></i></span>');
	this.el_table = $('<table style="width:100%;" class="table table-hover '+(thiz.columnLine?'table-bordered':'')+'"></table>');
	this.el_btn_columns = $('<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" style="width:45px; padding:6px 10px 6px 14px;"><i class="fa fa-indent"></i></button>');
	this.el_menu_columns = $('<ul class="dropdown-menu dropdown-menu-right" role="menu" style="padding:10px;"></ul>');
	for(var i=0; i<this.columns.length; i++) {
		var col = this.columns[i];
		if(col.type == "checkbox") continue;
		var cbid = thiz.bid+"_cb_column_display_"+i;
		var cbname = thiz.bid+"_cb_column_display";
		var html = ['<li><a href="###" class="fancy-checkbox custom-bgcolor-blue">',
					'	<label>',
					'		<input id="'+cbid+'" name="'+cbname+'" value="'+i+'" type="checkbox" '+(col.visible?"checked":"")+'>',
					'		<span>',col.title,'</span>',
					'	</label>',
					'</a></li>'];
		var el_p = $(html.join(''));
		this.el_menu_columns.append(el_p);
	}
	
	var el_search_p = $('<div class="main-box clearfix" style="padding-bottom: 3px;'+(thiz.showSearchBox?'':'display:none;')+'"></div>');
	var el_search_p01 = $('<div class="pull-left" style="width:'+thiz.searchFieldWidth+'px;'+(thiz.searchFieldWidth<=0?'display:none;':'')+'"></div>');
	var el_search_p0101 = $('<div class="input-group-btn"></div>');
//	el_search_p0101.append(this.el_btn_search);
	el_search_p01.append(el_search_p0101);
	
	var el_search_p01filter = $('<div class="form-group pull-left filter-block" style="width:'+(parseInt(thiz.searchFieldWidth,10))+'px;" ></div>');
	el_search_p01filter.append(this.el_text_search);
	el_search_p01filter.append(this.el_search_btn);
	el_search_p01.append(el_search_p01filter);
	el_search_p01.append(el_search_p0101);
	
	var el_search_p02 = $('<div class="input-group pull-right" ></div>');
	
	el_search_p.append(el_search_p01);
	el_search_p.append(el_search_p02);
	
	var el_table_p = $('<div class="form-horizontal"></div>');
	this.el_table_cdt = $('<div></div>');
	el_table_p.append(this.el_table_cdt);
	el_table_p.append(this.el_table);
	
	if(!CU.isEmpty(this.opbtns)) {
		for(var i=0; i<this.opbtns.length; i++) {
			el_search_p02.append(this.opbtns[i]);
		}
	}
	
	if(thiz.showColumnMenus) {
		var el_search_p0201 = $('<div class="btn-group"></div>');
		el_search_p0201.append(this.el_btn_columns);
		el_search_p0201.append(this.el_menu_columns);
		el_search_p02.append("&nbsp;");
		el_search_p02.append(el_search_p0201);
	}
	
	this.el_base.append(el_search_p);
	this.el_base.append(el_table_p);
	config.drawCallback = this.proxyDrawCallback;
	this.dataTable = $(this.el_table).dataTable(config);
	
	if(thiz.hideHeader === true) this.el_base.find("thead").css("display", "none");
	this.setHeadAlign();
	this.fillConditionHeader();
	if(!CU.isEmpty(this.conditions)) this.buildConditionInput();
	if(!CU.isEmpty(config.scrollY)) {
//		thiz.el_base.find('.dataTables_scrollHead').css('overflow', '');
	}
	
	this.search = function(s, loading) {
		if(s!==null && s!==undefined) {
			thiz.el_text_search.val(s);
		}
		if(thiz.isPassage()) {
			thiz.totalRows = 0;
			thiz.el_base.find(".dataTables_length").css("display", "none");
			thiz.el_base.find(".dataTables_paginate").css("display", "none");
		}
		thiz.searchLoading = loading;
		thiz.clearCheckboxStatus();
		thiz.dataTable.DataTable().draw();
	};
	
	this.getSearchFuzzyValue = function() {
		return thiz.el_text_search.val();
	};
	
	
	this.refresh = function() {
		thiz.saveCheckboxStatus();
		thiz.dataTable.DataTable().draw(false);
	};
	
	
	this.setSearchBoxVisible = function(vis) {
		thiz.showSearchBox = vis!==false;
		el_search_p.css("display", thiz.showSearchBox?"block":"none");
	};
	
	this.doRenderRowRemark = function(data) {
		var el_tbody = thiz.el_base.find("tbody");
		if(!CU.isEmpty(el_tbody) && el_tbody.length>0) {
			var el_rows = $(el_tbody[0]).children();
			if(!CU.isEmpty(el_rows) && el_rows.length>0) {
				var el_firsttds = $(el_rows[0]).children();
				if(!CU.isEmpty(el_firsttds) && el_firsttds.length>0) {
					for(var i=0; i<el_firsttds.length; i++) {
						var el = $(el_firsttds[i]);
						el.css("border-top", "0");
					}
				}
				
				var collength = thiz.columns.length;
				if(collength>0 && !CU.isEmpty(data)) {
					var fun = null;
					if(CU.isFunction(thiz.renderRemark)) {
						fun = thiz.renderRemark;
					}else if(CU.isObject(thiz.renderRemark)) {
						if(!(thiz.renderRemark instanceof PrettyDataTableChildExpander)) {
							thiz.renderRemark = new PrettyDataTableChildExpander(thiz.renderRemark);
						}
						fun = thiz.renderRemark.render;
					}
					var isexpander = thiz.renderRemark instanceof PrettyDataTableChildExpander;
					
					if(CU.isFunction(fun)) {
						for(var i=el_rows.length-1; i>=0; i--) {
							var r = fun(i, data[i], thiz);
							if(CU.isEmpty(r)) continue;
							
							var el_row = $(el_rows[i]);
							var el = $('<tr role="row" class="'+el_row.attr("class")+' rmk" expander="'+isexpander+'"><td class="text-left text-break" style="border-top: 0px;'+(isexpander?'display:none;':'')+'" colspan="'+collength+'">'+r+'</td></tr>');
							el_row.after(el);
						}
					}
					
					if(isexpander) {
						thiz.getChildExpanderIcons().bind("click", function() {
							var index = $(this).attr("data-row-index");
							thiz.renderRemark.expand(index, thiz);
						});
					}
				}
			}
		}
	};
	
	
	this.getChildExpander = function() {
		if(thiz.renderRemark instanceof PrettyDataTableChildExpander) {
			return thiz.renderRemark;
		}
		return null;
	};
	
	this.getChildExpanderIcons = function() {
		return $("span[name='"+thiz.bid+"-expander-parent-icon']");
	};
	
	this.getChildExpanderIcon = function(index) {
		return $("#"+thiz.bid+"-expander-parent-icon-"+index);
	};
	
	
	this.checkCBColumnSelectAll = function() {
		var el_cball = thiz.el_base.find(".input_checkbox_all");
		el_cball.prop("disabled", thiz.singleSelect===true);
		if(thiz.singleSelect) el_cball.prop("checked", false);
		var el_items = thiz.el_base.find(".input_checkbox_item");
//		el_items.unbind("change");
//		el_items.unbind("click");
		
		el_items.bind("change", function(e) {
			if(thiz.singleSelect) {
				thiz.el_base.find(".input_checkbox_item").prop("checked", false);
				$(this).prop("checked", true);
			}else {
				var cb = $(this).is(":checked");
				if(cb) {
					var els = thiz.el_base.find(".input_checkbox_item");
					for(var i=0; i<els.length; i++) {
						cb = $(els[i]).is(":checked");
						if(!cb) break ;
					}
				}
				thiz.el_base.find(".input_checkbox_all").prop("checked", cb);
			}
		});
		el_items.bind("click", function(e) {
			if(!thiz.showCheckbox) return ;
			var el = $(this);
			var cb = el.is(":checked");
			var dataId = el.attr("data-id");
			if(!CU.isEmpty(thiz.checkboxDataId) && e.altKey) {
				var els = thiz.el_base.find(".input_checkbox_item");
				var idx1 = -1;
				var idx2 = -1;
				for(var i=0; i<els.length; i++) {
					var did = $(els[i]).attr("data-id");
					if(thiz.checkboxDataId == did) idx1 = i;
					if(dataId == did) idx2 = i;
				}
				if(idx1>=0 && idx2>idx1) {
					var cb = $(els[idx1]).is(":checked");
					for(var i=idx1; i<=idx2; i++) {
						$(els[i]).prop("checked", cb);
					}
				}
			}else {
				thiz.checkboxDataId = dataId;
			}
		});
	};
	
	this.getPageNum = function() {
		return thiz.pageNum;
	};
	this.getPageSize = function() {
		return thiz.pageSize;
	};
	
	/**
	 * 事件 start ---------------------------------------------------------------------------------------
	 */
	this.el_menu_columns.bind("click",function (e) {e.stopPropagation();});
	if(!CU.isEmpty(this.el_menu_search)) this.el_menu_search.bind("click",function (e) {e.stopPropagation();});
	if(this.showCheckbox) {
		this.el_base.find(".input_checkbox_all").bind("change", function() {
			var cb = $(this).is(":checked");
			var els = thiz.el_base.find(".input_checkbox_item");
			if(!CU.isEmpty(els) && els.length>0) {
				for(var i=0; i<els.length; i++) {
					var el = $(els[i]);
					var disabled = el.is(":disabled");
					el.prop("checked", !disabled&&cb);
				}
			}
		});
	}
	
	//搜索框回车
	this.el_text_search.bind("keyup", function(e) {
		if(e.keyCode === 13) thiz.search();
	});
	
	//搜索按钮
	this.el_search_btn.bind("click", function() {
		thiz.search();
	});
	
	//选择显示列
	this.el_menu_columns.find('input[type="checkbox"]').bind("change", function() {
		var cb = $(this);
		var cked = cb.prop("checked");
		var idx = parseInt(cb.prop("value"), 10);
		thiz.dataTable.DataTable().column(idx).visible(cked);
		if(cked) thiz.setColumnAlign(idx);
		thiz.setTableSettings();
		thiz.fillConditionHeader();
	});
	
	/**
	 * 事件 end ---------------------------------------------------------------------------------------
	 */
	
	
}




/**
 * @param config
 * 				title : 标题 string|function(index, row, grid, expander)
 * 				containerStyle : 外框样式
 * 				titleStyle : 标题样式
 * 				addroot : RS-addroot
 * 				act : simple|rest2, 缺省为rest2
 * 				url : 请求服务端地址
 * 				getParams(pageNum, pageSize, index, row, grid, expander)
 * 				errcb : 异常回调
 * 				columns : [{title, data, width, align
 * 								word : ellipsis|break, 缺省为break
 * 								format : 显示格式 byte|time|date|datetime|f2|f4|fee2|fee4, (与跟条件显示格式冲突)
 * 								color : 显示内容颜色
 * 								style : 指定显示样式
 * 								render:function(value, row, meta, parentRowIndex, parentRow, parentGrid, expander)
 * 							]}
 * 				headerBackgroundColor : 列表背景色
 * 				lineColor : 表格线颜色
 *				columnLine : 是否显示表格竖线, 缺省为true
 *				hideHeader : 是否隐藏列头, 缺省为false
 *				drawCallback : 查询回调事件, drawCallback(data, qps, index, row, grid, expander)
 */
function PrettyDataTableChildExpander(config) {
	var thiz = this;
	
	$.extend(thiz, {act:"rest2", lineColor:"", columnLine:true, hideHeader:false, tableBorder:true}, config);
	if(!CU.isEmpty(this.columns)) {
		for(var i=0; i<this.columns.length; i++) {
			var col = $.extend({title:"", data:"", width:100, align:"left", word:"break"}, this.columns[i]);
			this.columns[i] = col;
		}
	}
	
	this.parentRowsMap = {};		//key=prefix, value={index:xx, row:xxx, grid:xxx}
	
	
	this.getPrefix = function(index, grid) {
		return grid.bid + "-expander-" + index + "-";
	};
	
	
	/**
	 * queryParams : pageNum, pageSize, ps
	 */
	this.ajaxCallback = function(data, qps, index, row, grid) {
		data = grid.correctResult(data, qps.pageSize);
		var prefix = thiz.getPrefix(index, grid);
		var el_tbody = $("#"+prefix+"tbody");
		var item = thiz.parentRowsMap[prefix];
		if(CU.isEmpty(item) || CU.isEmpty(el_tbody) || el_tbody.length<=0) return ;
		el_tbody.html("");
		
		var array = data.data;
		var cols = thiz.columns;
		if(!CU.isEmpty(cols)) {
			var html = [];
			if(!CU.isEmpty(array) && CU.isArray(array)) {
				for(var i=0; i<array.length; i++) {
					var row = array[i];
					
					html.push('<tr role="row" class="odd">');
					
					for(var j=0; j<cols.length; j++) {
						var col = cols[j];
						html.push('<td class="text-',col.align,' text-',col.word,'" style="border-top: 0px;width:',col.width,'px;"');
						var v = "";
						if(!CU.isEmpty(col.data)) v = CU.getObjectValue(row, col.data);
						if(CU.isFunction(col.render)) {
							v = col.render(v, row, {col:j, row:i}, item.index, item.row, item.grid, thiz);
						}
						if(!CU.isEmpty(v)) {
							v = item.grid.parseColumnFormatValue(v, col);
						}
						if(CU.isEmpty(v)) {
							v = "&nbsp;";
						}
						html.push('>', v, '</td>');
					}
					html.push('</tr>');
				}
			}else {
				html.push('<tr role="row" class="odd"><td class="text-center" style="border-top: 0px;" colspan="',cols.length,'">无数据</td></tr>');
			}
			el_tbody.html(html.join(''));
		}
		
		if(CU.isFunction(thiz.drawCallback)) {
			thiz.drawCallback(data, qps, index, row, grid, thiz);
		}
	};
	
	
	this.ajax = function(index, row, grid, loading, cb) {
		var cdt = {};
		var pageSize = 20;
		var pageNum = 1;
		var ps = [pageNum, pageSize, cdt, ""];
		if(CU.isFunction(thiz.getParams)) {
			ps = thiz.getParams(pageNum, pageSize, index, row, grid, thiz);
		}
		if(ps === false) {
			grid.el_base.find(".dataTables_processing").css("display", "none");
			return ;
		}
		if(thiz.act == "simple") {
			if(!CU.isArray(ps)) ps = [ps];
			RS.simple({addroot:thiz.addroot,url:thiz.url, ps:ps, errcb:thiz.errcb, loading:loading, cb:function(rs) {
				var qps = {pageNum:pageNum, pageSize:pageSize, ps:ps};
				thiz.ajaxCallback(rs, qps, index, row, grid);
				if(CU.isFunction(cb)) cb(rs, qps, index, row, grid);
			}});
		}else {
			if(CU.isArray(ps)) ps = {pageNum:ps[0], pageSize:ps[1], cdt:ps[2], orders:ps[3], qs:ps[4]};
			RS.rest2({addroot:thiz.addroot,url:thiz.url, ps:ps, errcb:thiz.errcb, loading:loading, cb:function(rs) {
				var qps = {pageNum:pageNum, pageSize:pageSize, ps:ps};
				thiz.ajaxCallback(rs, qps, index, row, grid);
				if(CU.isFunction(cb)) cb(rs, qps, index, row, grid);
			}});
		}
	};
	
	
	this.render = function(index, row, grid) {
		var id_prefix = thiz.getPrefix(index, grid);
		thiz.parentRowsMap[id_prefix] = {index:index, row:row, grid:grid};
		var html = ['<div id="',id_prefix,'container" style="margin:0px 10px 10px 10px;',(CU.isEmpty(thiz.containerStyle)?'':thiz.containerStyle),'">'];
		var title = thiz.title;
		if(CU.isFunction(title)) {
			title = title(index, row, grid, thiz);
		}
		if(!CU.isEmpty(title)) {
			html.push('<div style="margin:5px;',(CU.isEmpty(thiz.titleStyle)?'':thiz.titleStyle),'">',title,'</div>');
		}
		
		html.push('<table class="table-hover no-footer dtfc-has-right ',(thiz.columnLine?'table-bordered':''),'" style="',(CU.isEmpty(thiz.lineColor)?'':('border-color:'+thiz.lineColor+';')),'" role="grid">');
		if(!thiz.hideHeader) {
			html.push('<thead><tr role="row">');
			var cols = thiz.columns;
			if(!CU.isEmpty(cols)) {
				for(var i=0; i<cols.length; i++) {
					var col = cols[i];
					html.push('<th class="text-',col.align,'" data-column-index="',i,'" style="width:',col.width,'px;',(CU.isEmpty(thiz.headerBackgroundColor)?'':('background-color:'+thiz.headerBackgroundColor+';')),(CU.isEmpty(thiz.lineColor)?'':('border-color:'+thiz.lineColor+';')),'">', col.title, '</th>');
				}
			}
			html.push('</tr></thead>');
		}
		html.push('<tbody id="',id_prefix,'tbody" ></tbody>');
		html.push('</table>');
		html.push('</div>');
		
//		setTimeout(function(){
//			thiz.search(index, grid);
//		}, 1000);
		
		return html.join('');
	};
	
	
	this.getContainer = function(index, grid) {
		var prefix = thiz.getPrefix(index, grid);
		return $('#'+prefix+'container');
	};
	
	
	this.expand = function(index, grid) {
		var prefix = thiz.getPrefix(index, grid)
		var item = thiz.parentRowsMap[prefix];
		if(CU.isEmpty(item)) return ;
		
		var el_icon = grid.getChildExpanderIcon(index);
		if(CU.isEmpty(el_icon) || el_icon.length<=0 || el_icon.html().indexOf('loading') >= 0) return ;
		
		var expended = el_icon.attr("expended") == "true";
		var queryed = el_icon.attr("queryed") == "true";
		var parent = thiz.getContainer(index, grid).parent();
		
		if(expended) {
			parent.css("display", "none");
			el_icon.attr("expended", "false");
			el_icon.html("<i class='fa fa-plus-square-o' />");
		}else {
			parent.css("display", "table-cell");
			el_icon.attr("expended", "true");
			el_icon.html("<i class='fa fa-minus-square-o' />");
			
			if(!queryed) {
				thiz.search(index, grid, function() {
					el_icon.attr("queryed", true);
				}, el_icon);
			}
		}
	};
	
	
	this.search = function(index, grid, cb, loading) {
		var prefix = thiz.getPrefix(index, grid)
		var item = thiz.parentRowsMap[prefix];
		if(CU.isEmpty(item)) return ;
		thiz.ajax(item.index, item.row, item.grid, loading, cb);
	};
}



/**
 * 缩略图方式表格
 * @param config
 * 			bid : 绑定页面指定的div id
 * 			addroot : RS-addroot
 * 			act : simple|rest2, 缺省为rest2
 * 			url : 请求服务端地址
 * 			paging: 是否分页, 缺省为true, passage
 * 			pageSize : 页大小，缺省为50
 * 			opbtns: 操作按钮
 * 			style : 样式
 * 			minHeight: 内容区域最小高度, 缺省为400
 * 			maxHeight: 内容区域最大高度
 * 			autoScrollY : Y轴是否自动出滚动条, 缺省为true
 * 			getParams(pageNum, pageSize, cdt, orders) : 获取参数, 可以为空, 为空则默认传给服务器的参数为: [pageNum, pageSize, condition, orders]
 * 			callback : 正常回调
 * 			errcb : 异常回调
 * 			showSearchBox : 是否显示搜索条
 * 			renderImage : (record, grid), 自定义显示图片
 * 			renderTitle : (record, grid), 自定义标题
 * 			renderTools : (record, grid), 自定义图片上面的工具条
 * 			singleSelect : 是否单选, 缺省为true
 * 			selectableType : 选择方式, 为空表示都能选, 非空则表示指定节点的类型(dataType)才能被选中, 多个以逗号分隔
 * 			passageContainer : paging=passage时,指定容器对象, 缺省为window
 * 			passageEntity : paging=passage时,指定实体对象, 缺省为body
 * 			passageGapHeight : paging=passage时,距离底部高度低于此值则触发查询,缺省为200
 * @returns
 */
function PrettyThumbTable(config) {
	if(CU.isEmpty(config)) throw " the config is empty argument! ";
	if(CU.isEmpty(config.bid)) throw " the config.bid is empty argument! ";
	
	var thiz = this;
	$.extend(thiz, {act:"rest2", paging:true, minHeight:400, autoScrollY:true, pageNum:1, pageSize:50, passageGapHeight:200, showSearchBox:true, style:"", singleSelect:true}, config);
	if(!CU.isEmpty(thiz.passageContainer)) thiz.passageContainer = $(thiz.passageContainer);
	if(!CU.isEmpty(thiz.passageEntity)) thiz.passageEntity = $(thiz.passageEntity);
	
	this.dataMap = {};
	this.dataArray = [];
	this.searchLoading = null;
	this.locked = false;
	this.hasNext = true;
	
	this.events = {
			'dblclick' : []
	};
	
	this.bind = function(evnname, fun) {
		if(CU.isEmpty(evnname) || !CU.isFunction(fun) || !CU.isArray(thiz.events[evnname])) return;
		thiz.events[evnname].push(fun);
	};
	this.doEvent = function(name, evt, a, b, c, d, e, f, g) {
		var funs = thiz.events[name];
		if(CU.isEmpty(funs)) return ;
		for(var i=0; i<funs.length; i++) {
			funs[i](evt, a, b, c, d, e, f, g);
		}
	};
	this.doDblclick = function(e, record, grid) {
		thiz.doEvent("dblclick", e, record, grid);
	};
	
	if(typeof(this.bid)=="string") {
		this.el_base = $("#"+this.bid);
	}else {
		this.el_base = $(this.bid);
		this.bid = this.el_base.attr("id");
		if(CU.isEmpty(this.bid)) this.bid = "PrettyThumbTable_"+CU.getId();
	}
	var opbtns = config.opbtns;
	if(CU.isEmpty(opbtns)) {
		opbtns = "";
	}else if(CU.isArray(opbtns)) {
		opbtns = opbtns.join("");
	}else {
		opbtns = "";
	}
    
	var html = ['<div class="panel" style="margin: 0px;padding: 0px;',this.style,'">',
				'	<div class="panel-body" style="padding:0px;">',
				'		<div class="main-box clearfix" style="padding-bottom: 3px;',(thiz.showSearchBox?'':'display:none;'),'">',
				'			<div class="pull-left" style="width: 250px;">',
				'				<div class="form-group pull-left filter-block" style="width: 250px;padding:0px;margin:0px;">',
				'					<input type="text" class="form-control input-thumb-search"><span class="search-icon btn-thumb-search"><i class="fa fa-search"></span></i>',
				'				</div>',
				'				<div class="input-group-btn"></div>',
				'			</div>',
				'			<div class="input-group pull-right">',opbtns,'</div>',
				'		</div>',
				'		<div class="dataTables_wrapper form-inline dt-bootstrap no-footer">',
				'			<div class="clearfix table-content" style="min-height:',thiz.minHeight,'px;',(CU.isEmpty(thiz.maxHeight)?'':'max-height:'+thiz.maxHeight+"px;"),(thiz.autoScrollY?'overflow-y:auto;':''),'"></div>',
				'			<div class="row" style="',(thiz.paging===true?'':'display:none;'),'">',
				'				<div class="col-sm-6" style="line-height:40px;">',
				'					<label style="font-weight:normal;">',
				'						每页 <select style="width:75px;" class="form-control input-sm input-pagesize">',
				'								<option value="10">10</option>',
				'								<option value="20">20</option>',
				'								<option value="30">30</option>',
				'								<option value="40">40</option>',
				'								<option value="50" selected>50</option>',
				'								<option value="60">60</option>',
				'								<option value="70">70</option>',
				'								<option value="80">80</option>',
				'								<option value="90">90</option>',
				'								<option value="100">100</option>',
				'							</select>',
				'						 条&nbsp;&nbsp;&nbsp;&nbsp;共 <span class="DATATABLE_TOTALROWS">0</span> 条记录',
				'					</label>',
				'				</div>',
				'				<div class="col-sm-6">',
				'					<div class="dataTables_paginate paging_full_numbers pagination_box">',
				'						<ul class="pagination ul_pagination"></ul>',
				'					</div>',
				'				</div>',
				'			</div>',
				'		</div>',
				'		<div class="panel-floor text-center" style="display:none;"><img src="',ContextPath,'/tannux/frame/imgs/core/loading.gif"></div>',
				'	</div>',
				'</div>'];
	this.el_base.append($(html.join("")));
	
	this.findElObject = function(q) {
		var els = thiz.el_base.find(q);
		if(!CU.isEmpty(els) && els.length>0) {
			return $(els[0]);
		}
		return null;
	};
	
	this.el_searchinput = this.findElObject(".input-thumb-search");
	this.el_searchbtn = this.findElObject(".btn-thumb-search");
	this.el_tcontent = this.findElObject(".table-content");
	this.el_pagesize = this.findElObject(".input-pagesize");
	this.el_pagesize.val(this.pageSize);
	this.el_totalrows = this.findElObject(".DATATABLE_TOTALROWS");
	this.el_pagingbox = this.findElObject(".pagination_box");
	this.el_loading = this.findElObject(".panel-floor");
	
	
	this.getRecord = function(id) {
		if(CU.isEmpty(id, true)) return null;
		return thiz.dataMap[id+""];
	};
	
	this.render = function(record) {
		var imgval = "";
		var titval = "";
		var toolsval = "";
		if(CU.isFunction(thiz.renderImage)) {
			imgval = thiz.renderImage(record, thiz);
		}else {
			imgval = CU.getIconHtml(record.icon, "max-width:60px;max-height:60px;");
		}
		if(CU.isFunction(thiz.renderTitle)) {
			titval = thiz.renderTitle(record, thiz);
		}else {
			titval = record.text;
		}
		if(CU.isFunction(thiz.renderTools)) {
			toolsval = thiz.renderTools(record, thiz);
		}
		if(CU.isEmpty(imgval)) imgval = "";
		if(CU.isEmpty(titval)) titval = "";
		if(CU.isEmpty(toolsval)) toolsval = "";
		var img = '<div class="gthumb-image" data-id="'+record.id+'" data-text="'+record.text+'" >'+imgval+'</div>';
		var title = '<div class="gthumb-title" title="'+record.text+'">'+titval+'</div>';
		var s = '<div class="gthumb-box" data-id="'+record.id+'" data-text="'+record.text+'" data-type="'+record.type+'" >';
		if(!CU.isEmpty(toolsval)) s += '<div class="gthumb-tools">'+toolsval+'</div>';
		s += img+title+'</div>';
		return s;
	};
	
	this.fillContent = function(p) {
		thiz.hasNext = p.hasNext;
		if(thiz.paging!="passage" || (thiz.paging=="passage" && thiz.pageNum==1)) {
			thiz.dataMap = {};
			thiz.dataArray = [];
			thiz.el_tcontent.html("");
		}
		
		if(thiz.paging===true) {
			thiz.pageNum = p.pageNum;
			thiz.el_totalrows.html(p.totalRows);
			$(thiz.el_pagingbox.find(".ul_pagination")[0]).remove();
			thiz.el_pagingbox.html('<ul class="pagination ul_pagination"></ul>');
			
			$(thiz.el_pagingbox.find(".ul_pagination")[0]).twbsPagination({
		        totalPages: p.totalPages?p.totalPages:1,
		        visiblePages: 7,
		        startPage: p.pageNum,
		        first:"首页",
		        prev:"上一页",
		        next:"下一页",
		        last:"尾页",
		        onPageClick: function (event, page) {
		        	thiz.ajax(page);
		        }
		    });
		}
		
		var data = p.data;
		if(!CU.isEmpty(data)) {
			for(var i=0; i<data.length; i++) {
				var record = data[i];
				if(CU.isEmpty(record.id)) record.id = CU.getId();
				thiz.dataMap[record.id+""] = record;
				thiz.dataArray.push(record);
				var h = thiz.render(record, thiz);
				if(!CU.isEmpty(h)) {
					thiz.el_tcontent.append($(h));
				}
			}
		}
	};
	
	
	this.addContentListener = function(rs) {
		if(CU.isEmpty(rs)) return ;
		var el_boxs = thiz.el_base.find(".gthumb-box");
		var el_imgs = thiz.el_base.find(".gthumb-image");
		
		el_boxs.unbind("mouseover");
		el_boxs.unbind("mouseout");
		el_boxs.unbind("click");
		el_imgs.unbind("dblclick");
		
		el_boxs.bind("mouseover", function() {
			$(this).find(".gthumb-tools").css("display", "block");
		});
		el_boxs.bind("mouseout", function() {
			$(this).find(".gthumb-tools").css("display", "none");
		});
		el_boxs.bind("click", function() {
			var el = $(this);
			var has = el.hasClass('gthumb-box-active');
			if(thiz.singleSelect) {
				thiz.el_base.find(".gthumb-box").removeClass('gthumb-box-active');
			}
			if(!has) {
				if(CU.isEmpty(thiz.selectableType) || (","+thiz.selectableType+",").indexOf(","+el.attr("data-type")+",")>=0) {
					el.addClass('gthumb-box-active');
				}
			}else {
				el.removeClass('gthumb-box-active');
			}
		});
		el_imgs.bind("dblclick", function(e) {
			var el = $(this);
			var dataId = el.attr("data-id");
			var record = thiz.getRecord(dataId);
			thiz.doDblclick(e, record, thiz);
		});
		
	};
	
	
	this.getAllRecords = function() {
		return thiz.dataArray;
	};
	
	
	this.getSelectRecords = function() {
		var els = thiz.el_base.find(".gthumb-box-active");
		var records = [];
		if(!CU.isEmpty(els) && els.length>0) {
			for(var i=0; i<els.length; i++) {
				var el = $(els[i]);
				var id = el.attr("data-id");
				var r = thiz.getRecord(id);
				if(!CU.isEmpty(r, true)) {
					records.push(r);
				}
			}
		}
		return records;
	};
	
	this.getSelectRecordIds = function() {
		var els = thiz.el_base.find(".gthumb-box-active");
		var ids = [];
		if(!CU.isEmpty(els) && els.length>0) {
			for(var i=0; i<els.length; i++) {
				var el = $(els[i]);
				var id = el.attr("data-id");
				ids.push(id);
			}
		}
		return ids;
	};
	
	this.getLoading = function() {
		if(CU.isEmpty(thiz.searchLoading)) {
			return thiz.el_searchbtn;
		}else {
			return [thiz.el_searchbtn, thiz.searchLoading];
		}
	};
	
	
	this.correctResult = function(rs, pageSize) {
		if(CU.isArray(rs)) {
			rs = {pageNum:1,pageSize:rs.length,totalRows:rs.length,totalPages:1,hasNext:false,data:rs};
		}else {
			if(thiz.paging == "passage") {
				rs.pageNum = thiz.pageNum;
				rs.pageSize = pageSize;
			}
		}
		return rs;
	};
	
	this.ajax = function(pageNum) {
		if(CU.isEmpty(pageNum) || pageNum<=0) pageNum = 1;
		thiz.pageNum = pageNum;
		var searchFieldFuzzy = thiz.el_searchinput.val();
		var pageSize = thiz.el_pagesize.val();
		var ps = {pageNum:pageNum, pageSize:pageSize, cdt:{searchFieldFuzzy:searchFieldFuzzy}}
		if(CU.isFunction(thiz.getParams)) {
			ps = thiz.getParams(ps.pageNum, ps.pageSize, ps.cdt, "", "", thiz);
		}
		
		thiz.el_loading.css("display", "block");
		if(thiz.act == "simple") {
			if(!CU.isArray(ps)) ps = [ps];
			RS.simple({addroot:thiz.addroot,url:thiz.url, ps:ps, loading:thiz.getLoading(), cb:function(rs) {
				try {
					rs = thiz.correctResult(rs, pageSize);
					thiz.fillContent(rs);
					thiz.addContentListener(rs);
				}finally {
					thiz.passageCallbck(rs);
				}
				if(CU.isFunction(thiz.callback)) thiz.callback(rs, thiz);
			}, errcb:function(code, message) {
				thiz.passageCallbck();
				if(CU.isFunction(thiz.errcb)) {
					thiz.errcb(code, message);
				}else {
					RS.defaultErrorCallback(code, message);
				}
			}});
		}else {
			if(CU.isArray(ps)) ps = {pageNum:ps[0], pageSize:ps[1], cdt:ps[2], orders:ps[3], qs:ps[4]};
			RS.rest2({addroot:thiz.addroot,url:thiz.url, ps:ps, loading:thiz.getLoading(), cb:function(rs) {
				try {
					rs = thiz.correctResult(rs, pageSize);
					thiz.fillContent(rs);
					thiz.addContentListener(rs);
				}finally {
					thiz.passageCallbck(rs);
				}
				if(CU.isFunction(thiz.callback)) thiz.callback(rs, thiz);
			}, errcb:function(code, message) {
				thiz.passageCallbck();
				if(CU.isFunction(thiz.errcb)) {
					thiz.errcb(code, message);
				}else {
					RS.defaultErrorCallback(code, message);
				}
			}});
		}
	};
	
	this.search = function(s, loading) {
		if(!CU.isEmpty(s, true)) thiz.el_searchinput.val(s);
		thiz.searchLoading = loading;
		thiz.ajax();
	};
	
	this.refresh = function() {
		thiz.ajax(thiz.pageNum);
	};
	
	this.getPassageContainer = function() {
		if(CU.isEmpty(thiz.passageContainer)) {
			return $(window);
		}
		return $(thiz.passageContainer);
	};
	this.getPassageEntity = function() {
		if(CU.isEmpty(thiz.passageEntity)) {
			return $("body");
		}
		return $(thiz.passageEntity);
	};
	
	this.passage = function() {
		if(thiz.paging!="passage" || thiz.locked || thiz.hasNext!==true) return ;
		var el_container = thiz.getPassageContainer();
		var el_entity = thiz.getPassageEntity();
		if(el_entity.height() - el_container.height() - el_container.scrollTop() < thiz.passageGapHeight) {
			thiz.locked = true;
			
			if(CU.isEmpty(thiz.pageNum)) {
				thiz.ajax();
			}else {
				var page = thiz.pageNum + 1;
				thiz.ajax(page);
			}
		}
	};
	this.passageCallbck = function(rs) {
		thiz.el_loading.css("display", "none");
		if(thiz.paging != "passage") return ;
		setTimeout(function() {
			thiz.locked = false;
			thiz.passage();
		}, 500);
	};
	
	//搜索框回车
	this.el_searchinput.bind("keyup", function(e) {
		if(e.keyCode === 13) thiz.search();
	});
	
	//搜索按钮
	this.el_searchbtn.bind("click", function() {
		thiz.search();
	});
	
	if(this.paging == "passage") {
		$(window).scroll(thiz.passage);
	}
}




/**
 * 缩略图方式表格
 * @param config
 * 			bid : 绑定页面指定的div id
 * 			act : simple|rest2, 缺省为rest2
 * 			url : 请求服务端地址
 * 			style : 样式
 * 			minHeight: 内容区域最小高度, 缺省为500
 * 			maxHeight: 内容区域最大高度
 * 			autoScrollY : Y轴是否自动出滚动条, 缺省为true
 * 			columnWidth : 每一列宽度, 缺省为300
 * 			getParams(pageNum, pageSize, cdt, orders) : 获取参数, 可以为空, 为空则默认传给服务器的参数为: [pageNum, pageSize, condition, orders]
 * 			callback : 正常回调
 * 			errcb : 异常回调
 * 			showCheckbox : 是否显示复选框列, 缺省为false
 * 			renderImage : (record, grid), 自定义显示图片
 * 			renderTitle : (record, grid), 自定义标题
 * 			renderTools : (record, grid), 自定义图片上面的工具条
 * @returns
 */
function PrettyColumnTable(config) {
	if(CU.isEmpty(config)) throw " the config is empty argument! ";
	if(CU.isEmpty(config.bid)) throw " the config.bid is empty argument! ";
	
	var thiz = this;
	$.extend(thiz, {act:"rest2", paging:true, minHeight:500, autoScrollY:true, style:"", showCheckbox:false, columnWidth:300}, config);
	
	this.parentstack = [];
	this.dataMaps = {};		//key=parentId, value=dataMap
	this.dataArrays = {};	//key=parentId, value=dataArray
	this.searchLoading = null;
	
	this.events = {
			"click" : [],
			"dblclick" : []
	};
	
	this.bind = function(evnname, fun) {
		if(CU.isEmpty(evnname) || !CU.isFunction(fun) || !CU.isArray(thiz.events[evnname])) return;
		thiz.events[evnname].push(fun);
	};
	this.doEvent = function(name, evt, a, b, c, d, e, f, g) {
		var funs = thiz.events[name];
		if(CU.isEmpty(funs)) return ;
		for(var i=0; i<funs.length; i++) {
			funs[i](evt, a, b, c, d, e, f, g);
		}
	};
	this.doClick = function(e, record, grid) {
		thiz.doEvent("click", e, record, grid);
	};
	this.doDblClick = function(e, record, grid) {
		thiz.doEvent("dblclick", e, record, grid);
	};
	
	if(typeof(this.bid)=="string") {
		this.el_base = $("#"+this.bid);
	}else {
		this.el_base = $(this.bid);
		this.bid = this.el_base.attr("id");
		if(CU.isEmpty(this.bid)) this.bid = "PrettyThumbTable_"+CU.getId();
	}

	var html = ['<div class="panel" style="margin: 0px;padding: 0px;',this.style,'">',
				'	<div class="dataTables_wrapper form-inline dt-bootstrap no-footer" style="overflow-x: auto;">',
				'		<div class="clearfix table-columns-container">',
				'		</div>',
				'	</div>',
				'</div>'];
	this.el_base.append($(html.join("")));
	
	this.findElObject = function(q) {
		var els = thiz.el_base.find(q);
		if(!CU.isEmpty(els) && els.length>0) {
			return $(els[0]);
		}
		return null;
	};
	
	this.el_columns_container = this.findElObject(".table-columns-container");
	
	
	this.getLastParentId = function() {
		if(CU.isEmpty(thiz.parentstack)) return null;
		return thiz.parentstack[thiz.parentstack.length-1];
	};
	this.getRecord = function(id) {
		for(var key in thiz.dataMaps) {
			var dm = thiz.dataMaps[key];
			if(CU.isEmpty(dm))continue;
			var v = dm[id+""];
			if(!CU.isEmpty(v, true)) {
				return v;
			}
		}
		return null;
	};
	this.getColumnRecords = function(pid) {
		return thiz.dataArrays[pid+""];
	};
	this.getAllRecords = function(pid) {
		if(CU.isEmpty(pid)) pid = thiz.getLastParentId();
		return thiz.getColumnRecords(pid);
	};
	
	
	this.render = function(record) {
		var imgval = "";
		var titval = "";
		var toolsval = "";
		if(CU.isFunction(thiz.renderImage)) {
			imgval = thiz.renderImage(record, thiz);
		}else {
			imgval = CU.getIconHtml(record.icon, "max-width:16px;max-height:16px;");
		}
		if(CU.isFunction(thiz.renderTitle)) {
			titval = thiz.renderTitle(record, thiz);
		}else {
			titval = record.text;
		}
		if(CU.isFunction(thiz.renderTools)) {
			toolsval = thiz.renderTools(record, thiz);
		}
		
		if(CU.isEmpty(imgval)) imgval = "";
		if(CU.isEmpty(titval)) titval = "";
		if(CU.isEmpty(toolsval)) toolsval = "";
		var img = '<div class="gcolumn-image" data-id="'+record.id+'" data-text="'+record.text+'" >'+imgval+'</div>';
		var title = '<div class="gcolumn-title" title="'+record.text+'">'+titval+'</div>';
		var s = '<tr><td class="text-left table-column-row" data-id="'+record.id+'">';
		if(thiz.showCheckbox) {
			s += '<label class="fancy-checkbox custom-bgcolor-blue input_checklabel_columnrow"><input data-id="'+record.id+'" class="input_checkbox_columnrow" type="checkbox"><span></span></label>';
		}
		s += img + title;
		if(!CU.isEmpty(toolsval)) s += '<div class="gcolumn-tools" parentId="'+record.parentId+'" >'+toolsval+'</div>';
		s += '</td></tr>';
		return s;
	};
	
	this.isLeafColumn = function(parentId) {
		if(CU.isEmpty(parentId)) return false;
		var els = thiz.el_base.find(".table-column-item");
		return !CU.isEmpty(els) && els.length>0 && $(els[els.length-1]).attr("parentId") == parentId;
	};
	
	
	this.getColumn = function(parentId) {
		if(CU.isEmpty(parentId)) return null;
		parentId = parentId + "";
		var els = thiz.el_base.find(".table-column-item");
		if(!CU.isEmpty(els) && els.length>0) {
			for(var i=0; i<els.length; i++) {
				var el = $(els[i]);
				if(el.attr("parentId") == parentId) {
					return el;
				}
			}
		}
		return null;
	};
	
	this.addColumn = function(parentId, p) {
		if(CU.isEmpty(parentId)) return ;
		parentId += "";
		thiz.removeColumn(parentId);
		
		var buff = ['<div class="table-column-item" parentId="',parentId,'" style="border: 1px solid #d1d6e6 !important;min-height:',thiz.minHeight,'px;',(CU.isEmpty(thiz.maxHeight)?'':'max-height:'+thiz.maxHeight+"px;"),(thiz.autoScrollY?'overflow-y:auto;':''),'width:',thiz.columnWidth,'px;"><table class="table"><tbody>'];
		var data = p.data;
		var dataMap = {};
		var dataArray = [];
		if(!CU.isEmpty(data)) {
			for(var i=0; i<data.length; i++) {
				var record = data[i];
				if(CU.isEmpty(record.id)) record.id = CU.getId();
				dataMap[record.id+""] = record;
				dataArray.push(record);
				var h = thiz.render(record, thiz);
				if(!CU.isEmpty(h)) {
					buff.push(h);
				}
			}
		}
		buff.push('</tbody></table></div>');
		var el_parent = $(buff.join(""));
		thiz.el_columns_container.append(el_parent);
		thiz.parentstack.push(parentId);
		thiz.dataMaps[parentId] = dataMap;
		thiz.dataArrays[parentId] = dataArray;
		thiz.resizeContainer();
		
		var el_rows = el_parent.find(".table-column-row");
		el_rows.unbind("mouseover");
		el_rows.unbind("mouseout");
		el_rows.unbind("click");
		el_rows.unbind("dblclick");
		
		el_rows.bind("mouseover", function() {
			var el_tools = $(this).find(".gcolumn-tools");
			if(!CU.isEmpty(el_tools) && el_tools.length>0) {
				var el = $(el_tools[0]);
				var pid = el.attr("parentId");
				if(thiz.isLeafColumn(pid)) el.css("display", "block");
			}
		});
		el_rows.bind("mouseout", function() {
			$(this).find(".gcolumn-tools").css("display", "none");
		});
		el_rows.bind("click", function(e) {
			var el = $(this);
			thiz.el_base.find(".table-column-row").removeClass('table-column-row-active');
			el.addClass('table-column-row-active');
			var record = thiz.getRecord(el.attr("data-id"));
			if(record.type == "1") el.find(".gcolumn-tools").css("display", "none");
			thiz.doClick(e, record, thiz);
		});
		el_rows.bind("dblclick", function(e) {
			var el = $(this);
			var record = thiz.getRecord(el.attr("data-id"));
			thiz.doDblClick(e, record, thiz);
		});
	};
	
	this.removeColumn = function(parentId) {
		if(CU.isEmpty(parentId)) return false;
		parentId = parentId + "";
		
		var find = false;
		var parent = thiz.getRecord(parentId);
		var ppid = "";
		if(CU.isEmpty(parent) || CU.isEmpty(parent.parentId)) {	//如果不存在表示根节点
			find = true;
		}else {
			ppid = parent.parentId;
		}
		var newarr = [];
		for(var i=0; i<thiz.parentstack.length; i++) {
			var pid = thiz.parentstack[i];
			if(!find && pid==ppid) {
				find = true;
				newarr.push(pid);
				continue ;
			}
			if(find) {
				delete thiz.dataMaps[pid];
				delete thiz.dataArrays[pid];
				var el = thiz.getColumn(pid);
				if(!CU.isEmpty(el)) {
					el.remove();
				}
			}else {
				newarr.push(pid);
			}
		}
		thiz.parentstack = newarr;
		thiz.resizeContainer();
		return find;
	};
	
	
	this.clearColumns = function() {
		thiz.removeColumn("0");
	};
	
	this.resizeContainer = function() {
		thiz.el_columns_container.width((thiz.columnWidth+20)*thiz.parentstack.length);
	};
	
	
	this.getSelectRecords = function() {
		var els = null;
		if(thiz.showCheckbox) {
			els = thiz.el_base.find(".input_checkbox_columnrow");
		}else {
			els = thiz.el_base.find(".table-column-row-active");
		}
		var records = [];
		if(!CU.isEmpty(els) && els.length>0) {
			for(var i=0; i<els.length; i++) {
				var el = $(els[i]);
				var tag = el[0].tagName.toLowerCase();
				if(tag!="input" || (tag=="input" && el.is(":checked"))) {
					var id = el.attr("data-id");
					var r = thiz.getRecord(id);
					if(!CU.isEmpty(r, true)) {
						records.push(r);
					}
				}
			}
		}
		return records;
	};
	
	this.getSelectRecordIds = function() {
		var els = null;
		if(thiz.showCheckbox) {
			els = thiz.el_base.find(".input_checkbox_columnrow");
		}else {
			els = thiz.el_base.find(".table-column-row-active");
		}
		var ids = [];
		if(!CU.isEmpty(els) && els.length>0) {
			for(var i=0; i<els.length; i++) {
				var el = $(els[i]);
				var tag = el[0].tagName.toLowerCase();
				if(tag!="input" || (tag=="input" && el.is(":checked"))) {
					var id = el.attr("data-id");
					ids.push(id);
				}
			}
		}
		return ids;
	};
	
	
	this.getLoading = function() {
		return thiz.searchLoading;
	};
	
	this.search = function(s, loading) {
		thiz.searchLoading = loading;
		if(CU.isEmpty(s)) s = "";
		var ps = {}
		if(CU.isFunction(thiz.getParams)) {
			ps = thiz.getParams(1,1000,{searchFieldFuzzy:s}, null, null, thiz);
		}
		
		var parentId = ps.parentId;
		if(CU.isEmpty(parentId)) return ;
		if(!CU.isEmpty(s)) thiz.clearColumns();
		
		if(thiz.act == "simple") {
			if(!CU.isArray(ps)) ps = [ps];
			RS.simple({addroot:thiz.addroot,url:thiz.url, ps:ps, errcb:thiz.errcb, loading:thiz.getLoading(), cb:function(rs) {
				if(CU.isArray(rs)) rs = {pageNum:1,pageSize:rs.length,totalRows:rs.length,totalPages:1,data:rs};
				thiz.addColumn(parentId, rs);
				if(CU.isFunction(thiz.callback)) thiz.callback(rs, thiz);
			}});
		}else {
			if(CU.isArray(ps)) ps = {pageNum:ps[0], pageSize:ps[1], cdt:ps[2], orders:ps[3], qs:ps[4]};
			RS.rest2({addroot:thiz.addroot,url:thiz.url, ps:ps, errcb:thiz.errcb, loading:thiz.getLoading(), cb:function(rs) {
				if(CU.isArray(rs)) rs = {pageNum:1,pageSize:rs.length,totalRows:rs.length,totalPages:1,data:rs};
				thiz.addColumn(parentId, rs);
				if(CU.isFunction(thiz.callback)) thiz.callback(rs, thiz);
			}});
		}
	};
	
	this.refresh = function() {
		thiz.search();
	};
}


/**
 * 复合表格
 * @param config
 * 			bid : 绑定页面指定的div id
 * 			opbtns : 操作按钮
 * 			getDirCascadeUrl : 获取目录层级的url, 请求时会传入参数:dirId, 返回结果为:[{dirId:"", dirName:""}]
 * 			rootIcon : 根目录图标, 缺省为: /tannux/frame/imgs/core/disk25.svg
 * 			addroot : RS-addroot
 * 			tables : 指定显示表格[gthumb, glist, gcolumn], 缺省为三个都显示
 * 			gthumbcfg : 缩略图表格配置 @see PrettyThumbTable
 * 			glistcfg : 列表表格配置 @see PrettyDataTable
 * 			gcolumncfg : 分栏表格配置 @see PrettyColumnTable
 * 			showDirPath : 是否显示目录路径, 缺省为true
 * 			showSearchBox : 是否显示搜索条所在行, 缺省为true
 * 			showSearchInput : 是否显示搜索过滤条件
 * 			listUrl : 查询列表路径, 如果glistcfg、gthumbcfg、gcolumncfg没配则起作用
 * 			passageCountUrl : glistcfg.paging==passsage起作用
 * 			glistcolumns : 同listUrl起作用, 简化不用完整的配置glistcfg, 单拿出来只配置columns
 * 			glistappcols : 补充glist列, 与glistcolumns不同的是, glistcolumns是覆盖默认值, 而glistappcols是在默认列的基础上补充字段
 * 			paging: 是否分页
 * 			pageSize: 页大小
 * 			minHeight : 最小高度
 * 			maxHeight: 内容区域最大高度
 * 			autoScrollY : Y轴是否自动出滚动条, 缺省为true
 * 			showCheckbox : 列表时是否显示复选框
 * 			baseParams : 查询列表时基础参数
 * 			getParams : 查询时参数
 * 			singleSelect : 是否单选, 缺省为true
 * 			selectableType : 选择方式, 为空表示都能选, 非空则表示指定节点的类型(dataType)才能被选中, 多个以逗号分隔
 * 			nodeAttrNames : 指定数据写入html标签属性名, 可以是数组, 可以是个函数function(type)
 * 			toolsRender : function(row, grid){}
 * 			titleRender : 标题渲染器
 * 			imageRender : 图片渲染器
 * 			callback : function(rows, grid)
 * @returns
 */
function PrettyCompositeTable(config) {
	if(CU.isEmpty(config)) throw " the config is empty argument! ";
	if(CU.isEmpty(config.bid)) throw " the config.bid is empty argument! ";
	
	var thiz = this;
	$.extend(thiz, {rootIcon:"/tannux/frame/imgs/core/disk25.svg", tables:["gthumb","glist","gcolumn"], showDirPath:true, paging:false, showCheckbox:true, showSearchBox:true, showSearchInput:true, minHeight:($(document).height()-230), autoScrollY:true}, config);
	this.parentDirId = 0;
	
	this.GTYPE_MAP = {};	//key=gtype, value:{el_btn, el_grid, grid}
	this.events = {
			'glistInit' : [],
			'gthumbInit' : [],
			'gcolumnInit' : [],
			'godir' : [],
			'titleClick' : [],
			'titleDblClick' : [],
			'toolEdit' : []
	};
	
	this.bind = function(evnname, fun) {
		if(CU.isEmpty(evnname) || !CU.isFunction(fun) || !CU.isArray(thiz.events[evnname])) return;
		thiz.events[evnname].push(fun);
	};
	this.doEvent = function(name, evt, a, b, c, d, e, f, g) {
		var funs = thiz.events[name];
		if(CU.isEmpty(funs)) return ;
		for(var i=0; i<funs.length; i++) {
			funs[i](evt, a, b, c, d, e, f, g);
		}
	};
	this.doGthumbInit = function(e, grid) {
		thiz.doEvent("gthumbInit", e, grid);
	};
	this.doGlistInit = function(e, grid) {
		thiz.doEvent("glistInit", e, grid);
	};
	this.doGcolumnInit = function(e, grid) {
		thiz.doEvent("gcolumnInit", e, grid);
	};
	this.doGodir = function(e, dirId, dirName) {
		thiz.doEvent("godir", e, dirId, dirName);
	};
	this.doTitleClick = function(el, data) {
		thiz.doEvent("titleClick", el, data);
	};
	this.doTitleDblClick = function(e, el, data) {
		thiz.doEvent("titleDblClick", e, el, data);
	};
	this.doToolEditClick = function(e, el, data) {
		thiz.doEvent("toolEdit", e, el, data);
	};
	
	
	if(typeof(this.bid)=="string") {
		this.el_base = $("#"+this.bid);
	}else {
		this.el_base = $(this.bid);
		this.bid = this.el_base.attr("id");
		if(CU.isEmpty(this.bid)) this.bid = "PrettyCompositeTable_"+CU.getId();
	}
	var opbtns = config.opbtns;
	if(CU.isEmpty(opbtns)) {
		opbtns = "";
	}else if(CU.isArray(opbtns)) {
		opbtns = opbtns.join("");
	}else {
		opbtns = "";
	}
	
	
	this.hasTable = function(tab) {
		return thiz.tables.indexOf(tab) >= 0;
	};
	
	var html = ['<div class="panel" style="overflow:hidden;">',
				'	<div class="panel-body" style="padding-top: 10px;">',
				'		<div class="main-box clearfix" style="padding-bottom: 3px;">',
				'			<div class="pull-left">',
				'				<div class="btn-group pull-left" style="margin-right:10px;">',
				(!thiz.hasTable('gthumb')?'':'					<button title="以缩略图方式显示资源" type="button" name="btn-gtype" gtype="gthumb" class="btn btn-default btn-onlyicon"><i class="fa fa-th-large"></i></button>'),
				(!thiz.hasTable('glist')?'':'					<button title="以列表方式显示资源" type="button" name="btn-gtype" gtype="glist" class="btn btn-default btn-onlyicon"><i class="fa fa-align-justify"></i></button>'),
				(!thiz.hasTable('gcolumn')?'':'					<button title="以分栏方式显示资源" type="button" name="btn-gtype" gtype="gcolumn" class="btn btn-default btn-onlyicon"><i class="fa fa-columns"></i></button>'),
				'				</div>',
				'				<div class="pull-left div_dirpath" style="overflow:hidden;line-height:30px;">',
				'				</div>',
				'			</div>',
				'			',
				'			<div class="input-group pull-right" ',(thiz.showSearchInput?'':'style="display:none;"'),'>',
				'				<div class="btn-group" style="margin-right:10px;">',opbtns,'</div>',
				'				<div class="form-group pull-right filter-block lw180">',
				'					<input type="text" class="form-control input-gsearch" placeholder="搜索"><span class="search-icon pull-right btn-gsearch" style="z-index:5;"><i class="fa fa-search"></i></span>',
				'				</div>',
				'			</div>',
				'		</div>',
				'		<div class="form-horizontal">',
				'			<div class="dt-bootstrap no-footer grid-gthumb" name="grid-gtype" gtype="gthumb" style="display:none;">',
				'			</div>',
				'			<div class="dt-bootstrap no-footer grid-glist" name="grid-gtype" gtype="glist" style="display:none;">',
				'			</div>',
				'			<div class="dt-bootstrap no-footer grid-gcolumn" name="grid-gtype" gtype="gcolumn" style="display:none;">',
				'			</div>',
				'		</div>',
				'	</div>',
				'</div>'];
	this.el_base.append($(html.join("")));
	
	this.findElObject = function(q) {
		var els = thiz.el_base.find(q);
		if(!CU.isEmpty(els) && els.length>0) {
			return $(els[0]);
		}
		return null;
	};
	
	this.el_dirpath = this.findElObject(".div_dirpath");
	this.el_searchinput = this.findElObject(".input-gsearch");
	this.el_searchbtn = this.findElObject(".btn-gsearch");
	
	
	var el_btns = thiz.el_base.find("button[name='btn-gtype']");
	var el_grids = thiz.el_base.find("div[name='grid-gtype']");
	for(var i=0; i<el_btns.length; i++) {
		var el_btn = $(el_btns[i]);
		var type = el_btn.attr("gtype");
		thiz.GTYPE_MAP[type] = {el_btn:el_btn};
	}
	for(var i=0; i<el_grids.length; i++) {
		var el_grid = $(el_grids[i]);
		var type = el_grid.attr("gtype");
		var grid = thiz.GTYPE_MAP[type];
		if(!CU.isEmpty(grid)) grid.el_grid = el_grid;
	}
	
	this.el_base.find("button[name='btn-gtype']").bind("click", function() {
		var gtype = $(this).attr("gtype");
		thiz.switchGrid(gtype);
	});
	this.el_searchinput.bind("keyup", function(e) {
		if(e.keyCode === 13) thiz.el_searchbtn.click();
	});
	this.el_searchbtn.bind("click", function() {
		thiz.search();
	});
	
	
	this.getGthumbTab = function() {
		return thiz.GTYPE_MAP["gthumb"];
	};
	this.getGlistTab = function() {
		return thiz.GTYPE_MAP["glist"];
	};
	this.getGcolumnTab = function() {
		return thiz.GTYPE_MAP["gcolumn"];
	};
	
	this.getGridTab = function(gtype) {
		if(CU.isEmpty(gtype)) gtype = thiz.getGridType();
		if(gtype == "gthumb") {
			return thiz.getGthumbTab();
		}else if(gtype == "glist") {
			return thiz.getGlistTab();
		}else if(gtype == "gcolumn") {
			return thiz.getGcolumnTab();
		}
		return null;
	};
	
	this.refreshDirPath = function(dirId) {
		if(!thiz.showDirPath) return ;
		var buff = ['<a href="###" dirId="0" dirName="根" class="text-link">'+CU.getIconHtml(thiz.rootIcon)+'</a>'];
		if(!CU.isEmpty(dirId) && dirId!="0" && dirId!==0) {
			RS.ajax({addroot:thiz.addroot,url:thiz.getDirCascadeUrl, ps:{dirId:dirId}, cb:function(rs) {
				if(!CU.isEmpty(rs)) {
					for(var i=0; i<rs.length; i++) {
						var dir = rs[i];
						buff.push('<a href="###" dirId="'+dir.id+'" dirName="'+dir.dirName+'" class="text-link">'+dir.dirName+'</a>');
					}
				}
				thiz.createDirPath(buff);
			}});
		}else {
			thiz.createDirPath(buff);
		}
	};
	
	this.createDirPath = function(buff) {
		var space = '<i class="fa fa-angle-right path-separ" />';
		thiz.el_dirpath.html(buff.join(space));
		thiz.el_dirpath.find("a").bind("click", function(e) {
			var dirId = $(this).attr("dirId");
			var dirName = $(this).attr("dirName");
			thiz.godir(dirId, dirName);
		});
	};
	
	this.getParentDirId = function() {
		return thiz.parentDirId;
	};
	
	this.godir = function(dirId, dirName) {
		if(CU.isEmpty(dirId)) return ;
		thiz.parentDirId = dirId;
		thiz.doGodir(window.event, dirId, dirName);
		thiz.refreshDirPath(dirId);
		thiz.el_searchinput.val("");
		thiz.search();
	};
	
	this.search = function(gtype) {
		if(CU.isEmpty(gtype)) gtype = thiz.getGridType();
		var grid = thiz.getGridObject(gtype);
		if(!CU.isEmpty(grid)) {
			var s = thiz.el_searchinput.val();
			grid.search(s, thiz.el_searchbtn);
		}
	};
	
	this.refresh = function(gtype) {
		if(CU.isEmpty(gtype)) gtype = thiz.getGridType();
		var grid = thiz.getGridObject(gtype);
		if(!CU.isEmpty(grid)) {
			grid.refresh();
		}
	};
	
	
	this.getRecord = function(id) {
		var gtype = thiz.getGridType();
		var grid = thiz.getGridObject(gtype);
		return grid.getRecord(id);
	};
	
	this.getSelectRecords = function() {
		var gtype = thiz.getGridType();
		var grid = thiz.getGridObject(gtype);
		return grid.getSelectRecords();
	};
	
	this.getSelectRecordIds = function() {
		var gtype = thiz.getGridType();
		var grid = thiz.getGridObject(gtype);
		return grid.getSelectRecordIds();
	};
	
	/**
	 * 获取所以记录
	 * PrettyDataTable与PrettyThumbTable是获取表格内所有数据
	 * PrettyColumnTable通过参数pid(父级ID)获取指定列所有数据, 如果pid没有指定, 则表示获取最后一列所有数据
	 * @param  pid : 如果当前表格是PrettyColumnTable类型才起作用
	 */
	this.getAllRecords = function(pid) {
		var gtype = thiz.getGridType();
		var grid = thiz.getGridObject(gtype);
		return grid.getAllRecords(pid);
	};
	
	
	//[[dirIds], [recordIds]]
	this.getDirAndRecordIds = function() {
		var records = thiz.getSelectRecords();
		if(CU.isEmpty(records)) return null;
		var dirIds = [];
		var recordIds = [];
		for(var i=0; i<records.length; i++) {
			var r = records[i];
			if(r.type == "1") {
				dirIds.push(r.data.id);
			}else {
				recordIds.push(r.data.id);
			}
		}
		return [dirIds, recordIds];
	};
	

	this.getGridType = function() {
		for(var key in thiz.GTYPE_MAP) {
			var el = thiz.GTYPE_MAP[key].el_btn;
			if(el.hasClass("btn-active")) {
				return el.attr("gtype");
			}
		}
		return "";
	};
	
	this.switchGrid = function(gtype) {
		if(CU.isEmpty(gtype)) return ;
		for(var key in thiz.GTYPE_MAP) {
			var gt = thiz.GTYPE_MAP[key];
			var el_btn = gt.el_btn;
			var btnt = el_btn.attr("gtype");
			if(btnt == gtype) {
				el_btn.addClass("btn-active");
			}else {
				if(el_btn.hasClass("btn-active")) {
					el_btn.removeClass("btn-active");
				}
			}
			
			var el_grid = gt.el_grid;
			var gridt = el_grid.attr("gtype");
			if(gridt == gtype) {
				el_grid.css("display", "block");
				thiz.search(gtype);
				thiz.setGridType2Cache(gtype);
			}else {
				el_grid.css("display", "none");
			}
		}
	};
	
	this.getGridObject = function(gtype) {
		if(CU.isEmpty(gtype)) gtype = thiz.getGridType();
		if(gtype == "gthumb") {
			return thiz.getThumbGridObject();
		}else if(gtype == "glist") {
			return thiz.getListGridObject();
		}else if(gtype == "gcolumn") {
			return thiz.getColumnGridObject();
		}
	};
	
	
	this.toAttrsHtml = function(data, fields) {
		return CU.toHtmlAttrs(data, fields);
	};
	this.getHtmlAttrs = function(el, fields) {
		return CU.getHtmlAttrs(el, fields);
	};
	
	this.getNodeAttrNames = function(type) {
		var array = null;
		if(CU.isFunction(thiz.nodeAttrNames)) {
			array = thiz.nodeAttrNames(type);
		}else if(CU.isArray(thiz.nodeAttrNames)) {
			array = thiz.nodeAttrNames;
		}
		if(CU.isEmpty(array)) {
			array = type=="1" 
						? ["id", "dirName", "dirType", "parentId", "dirLvl", "dirPath", "isLeaf", "icon"]
			 		  	: ["id", "code", "name", "dirType", "type", "subType", "dirId", "icon", "status"];
		}
		return array;
	};
	
	this.toNodeAttrsHtml = function(node) {
		if(CU.isEmpty(node)) return "";
		var fields = thiz.getNodeAttrNames(node.type);
		var html = thiz.toAttrsHtml(node.data, fields);
		if(CU.isEmpty(html)) html = "";
		html += " data-nodeType=\""+node.type+"\"";
		return html;
	};
	
	this.getHtmlNodeAttrs = function(el) {
		if(CU.isEmpty(el)) return ;
		el = $(el);
		var type = el.attr("data-nodeType");
		if(CU.isEmpty(type)) return ;
		var fields = thiz.getNodeAttrNames(type);
		var data = thiz.getHtmlAttrs(el, fields);
		if(CU.isEmpty(data)) data = {};
		data.nodeType = type;
		return data;
	};
	
	
	this.defaultToolsRender = function(row, grid) {
		var tools = '<a name="a_gridrow_edit" '+thiz.toNodeAttrsHtml(row)+' href="###" class="table-link" style="margin-left:7px;" title="编辑"><i class="fa fa-edit"></i></a>';
		return tools;
	};
	
	this.defaultTitleRender = function(title, row, grid) {
		return title;
	};
	
	this.defaultImageRender = function(img, row, grid) {
		return img;
	};
	
	this.onGridRowTitleClick = function() {
		var el = $(this);
		el.attr("dblclick", "false");
		setTimeout(function() {
			if(el.attr("dblclick") == "false") {
				var data = thiz.getHtmlNodeAttrs(el);
				if(data.nodeType=="1" && thiz.getGridType()=="gcolumn") {
					thiz.godir(data.id, data.dirName);
				}
				thiz.doTitleClick(el[0], data);
			}
		}, 200);
	};
	this.onGridRowTitleDblClick = function() {
		var el = $(this);
		el.attr("dblclick", "true");
		var data = thiz.getHtmlNodeAttrs(el);
		if(data.nodeType == "1") {
			thiz.godir(data.id, data.dirName);
		}
		thiz.doTitleDblClick(el[0], data);
	};
	this.onGridRowEditClick = function() {
		var el = $(this);
		var data = thiz.getHtmlNodeAttrs(el);
		thiz.doToolEditClick(el, data);
	};
	
	this.onGridCallbackEvent = function(rs, grid) {
		 var el_parent = P_grid.getGridTab().el_grid;
		 var el_titles = el_parent.find("a[name='a_gridrow_title']");
		 var el_divtits = el_parent.find("div[name='a_gridrow_title']");
		 var el_edits = el_parent.find("a[name='a_gridrow_edit']");
		 
		 el_titles.unbind("click");
		 el_titles.unbind("dblclick");
		 el_divtits.unbind("click");
		 el_divtits.unbind("dblclick");
		 el_edits.unbind("click");
		 
		 el_titles.bind("click", thiz.onGridRowTitleClick);
		 el_titles.bind("dblclick", thiz.onGridRowTitleDblClick);
		 el_divtits.bind("click", thiz.onGridRowTitleClick);
		 el_divtits.bind("dblclick", thiz.onGridRowTitleDblClick);
		 el_edits.bind("click", thiz.onGridRowEditClick);
	};
	
	this.getQueryParams = function(base, dircdt, recordcdt) {
		if(!CU.isEmpty(thiz.baseParams)) {
			dircdt = $.extend({}, thiz.baseParams.dircdt, dircdt);
			recordcdt = $.extend({}, thiz.baseParams.recordcdt, recordcdt);
			base = $.extend({}, thiz.baseParams, base);
		}
		if(CU.isEmpty(base)) base = {};
		base.dircdt = dircdt;
		base.recordcdt = recordcdt;
		return base;
	};
	
	this.defaultThumbGridGetParams = function(pageNum, pageSize, cdt, orders) {
		if(CU.isEmpty(cdt)) cdt = {};
		return thiz.getQueryParams({dirId:thiz.getParentDirId(), iconType:1}, {searchFieldFuzzy:cdt.searchFieldFuzzy}, PU.parseSearchCondition(cdt));
	};
	
	this.defaultListGridGetParams = function(pageNum, pageSize, cdt, orders) {
		if(CU.isEmpty(cdt)) cdt = {};
		return thiz.getQueryParams({dirId:thiz.getParentDirId(), iconType:2}, {searchFieldFuzzy:cdt.searchFieldFuzzy}, PU.parseSearchCondition(cdt));
	};
	
	this.defaultColumnGridGetParams = function(pageNum, pageSize, cdt, orders) {
		if(CU.isEmpty(cdt)) cdt = {};
		var pid = thiz.getParentDirId();
		if(pid!=0 && pid!="0") pid = "DIR_" + pid;
		return thiz.getQueryParams({parentId:pid, dirId:thiz.getParentDirId(), iconType:2}, {searchFieldFuzzy:cdt.searchFieldFuzzy}, PU.parseSearchCondition(cdt));
	};
	
	this.getThumbGridObject = function() {
		var gt = thiz.GTYPE_MAP["gthumb"];
		if(CU.isEmpty(gt.grid)) {
			var toolsRender = thiz.toolsRender;
			var titleRender = thiz.titleRender;
			var imageRender = thiz.imageRender;
			var getparams = thiz.getParams;
			if(CU.isEmpty(toolsRender)) toolsRender = thiz.defaultToolsRender;
			if(CU.isEmpty(titleRender)) titleRender = thiz.defaultTitleRender;
			if(CU.isEmpty(imageRender)) imageRender = thiz.defaultImageRender;
			if(CU.isEmpty(getparams)) getparams = thiz.defaultThumbGridGetParams;
			var cfg = {url : thiz.listUrl,
					paging: thiz.paging,
					pageSize: thiz.pageSize,
					style: "padding-top:5px;",
					minHeight:thiz.minHeight,
					maxHeight:thiz.maxHeight,
					autoScrollY:thiz.autoScrollY,
					getParams : getparams,
					singleSelect : thiz.singleSelect,
					selectableType : thiz.selectableType,
					renderImage : function(row, grid) {
						var img = CU.getIconHtml(row.icon, "max-width:60px;max-height:60px;");
						return '<a href="###" name="a_gridrow_title" '+thiz.toNodeAttrsHtml(row)+' >'+imageRender(img,row,grid)+'</a>';
					},
					renderTitle : function(row, grid) {
						return '<div href="###" name="a_gridrow_title" '+thiz.toNodeAttrsHtml(row)+' style="cursor:pointer;">'+titleRender(row.text,row,grid)+'</div>';
					},
					renderTools : toolsRender,
					callback : function(rs, grid) {
						thiz.onGridCallbackEvent(rs, grid);
						if(CU.isFunction(thiz.callback)) {
							thiz.callback(rs, grid);
						}
					}
			};
			if(CU.isEmpty(cfg.minHeight) && !CU.isEmpty(thiz.minHeight)) cfg.minHeight = thiz.minHeight;
			if(CU.isEmpty(cfg.maxHeight) && !CU.isEmpty(thiz.maxHeight)) cfg.maxHeight = thiz.maxHeight;
			if(CU.isEmpty(cfg.addroot) && !CU.isEmpty(thiz.addroot)) cfg.addroot = thiz.addroot;
			$.extend(cfg, thiz.gthumbcfg, {bid:gt.el_grid, showSearchBox:false});
			gt.grid = new PrettyThumbTable(cfg);
			thiz.doGthumbInit(window.event, gt.grid);
		}
		return gt.grid;
	};

	this.getListGridObject = function() {
		var gt = thiz.GTYPE_MAP["glist"];
		if(CU.isEmpty(gt.grid)) {
			var toolsRender = thiz.toolsRender;
			var titleRender = thiz.titleRender;
			var imageRender = thiz.imageRender;
			var getparams = thiz.getParams;
			if(CU.isEmpty(toolsRender)) toolsRender = thiz.defaultToolsRender;
			if(CU.isEmpty(titleRender)) titleRender = thiz.defaultTitleRender;
			if(CU.isEmpty(imageRender)) imageRender = thiz.defaultImageRender;
			if(CU.isEmpty(getparams)) getparams = thiz.defaultListGridGetParams;
			var columns = thiz.glistcolumns;
			if(CU.isEmpty(columns)) {
				columns = [{title:"名称", data:"text", align:"left", render:function(value, type, row, meta) {
										var grid = thiz.GTYPE_MAP["glist"].grid;
										return '<a href="###" name="a_gridrow_title" '+thiz.toNodeAttrsHtml(row)+' >'+imageRender(CU.getIconHtml(row.icon, "max-width:16px;max-height:16px;"), row,grid)+"&nbsp;"+titleRender(row.text,row,grid)+'</a>';
						          }},
						          {title:"编辑", width:40, data:"id", visible:true, align:"center", render:function(value, type, row, meta) {
						        	  	return toolsRender(row, thiz.GTYPE_MAP["glist"].grid);
						          }}
						  ];
				if(!CU.isEmpty(thiz.glistappcols)) {
					if(CU.isArray(thiz.glistappcols)) {
						for(var i=0; i<thiz.glistappcols.length; i++) {
							columns.push(thiz.glistappcols[i]);
						}
					}else if(CU.isObject(thiz.glistappcols)) {
						columns.push(thiz.glistappcols);
					}
				}
				columns.push({title:"修改时间", width:160, data:"data.modifyTime", align:"center", render:function(value, type, row, meta) {
				        	  	if(!CU.isEmpty(value)) return CU.toStringDateTime(value);
					          }});
			}
			if(CU.isEmpty(toolsRender)) toolsRender = thiz.defaultToolsRender;
			var cfg = {url: thiz.listUrl,
				 	paging: thiz.paging,
				 	pageLength: thiz.pageSize,
				 	passageCountUrl: thiz.passageCountUrl,
				 	showCheckbox: thiz.showCheckbox,
					columns:columns,
					getParams : getparams,
					singleSelect : thiz.singleSelect,
					selectableType : thiz.selectableType,
					drawCallback : function(settings) {
						 thiz.onGridCallbackEvent(settings.aoData, grid);
						 if(CU.isFunction(thiz.callback)) {
						    thiz.callback(settings.aoData, grid);
						 }
					}
			};
			if(CU.isEmpty(cfg.scrollY) && !CU.isEmpty(thiz.maxHeight)) cfg.scrollY = (parseInt(thiz.maxHeight,10)-50-(thiz.paging=="passage"?25:0)) + "px";
			if(CU.isEmpty(cfg.addroot) && !CU.isEmpty(thiz.addroot)) cfg.addroot = thiz.addroot;
			$.extend(cfg, thiz.glistcfg, {bid:gt.el_grid, showSearchBox:false, showColumnMenus:false});
			gt.grid = new PrettyDataTable(cfg);
			thiz.doGlistInit(window.event, gt.grid);
		}
		return gt.grid;
	};
	

	this.getColumnGridObject = function() {
		var gt = thiz.GTYPE_MAP["gcolumn"];
		if(CU.isEmpty(gt.grid)) {
			var toolsRender = thiz.toolsRender;
			var titleRender = thiz.titleRender;
			var imageRender = thiz.imageRender;
			var getparams = thiz.getParams;
			if(CU.isEmpty(toolsRender)) toolsRender = thiz.defaultToolsRender;
			if(CU.isEmpty(titleRender)) titleRender = thiz.defaultTitleRender;
			if(CU.isEmpty(imageRender)) imageRender = thiz.defaultImageRender;
			if(CU.isEmpty(getparams)) getparams = thiz.defaultColumnGridGetParams;
			var cfg = {url : thiz.listUrl,
					minHeight: thiz.minHeight,
					getParams: getparams,
					singleSelect : thiz.singleSelect,
					selectableType : thiz.selectableType,
					renderImage : function(row, grid) {
						var img = CU.getIconHtml(row.icon, "max-width:16px;max-height:16px;");
						return imageRender(img, row, grid);
					},
					renderTitle : function(row, grid) {
						return '<div class="text-ellipsis" style="width:210px;" title="'+row.text+'" name="a_gridrow_title" '+thiz.toNodeAttrsHtml(row)+' >'+titleRender(row.text,row,grid)+'</div>';
					},
					renderTools : toolsRender,
					callback : function(rs, grid) {
						thiz.onGridCallbackEvent(rs, grid);
						if(CU.isFunction(thiz.callback)) {
						    thiz.callback(rs, grid);
						}
					}
			};
			if(CU.isEmpty(cfg.addroot) && !CU.isEmpty(thiz.addroot)) cfg.addroot = thiz.addroot;
			$.extend(cfg, thiz.gcolumncfg, {bid:gt.el_grid});
			gt.grid = new PrettyColumnTable(cfg);
			thiz.doGcolumnInit(window.event, gt.grid);
		}
		return gt.grid;
	};
	
	
	
	this.setGridType2Cache = function(gtype) {
		if(CU.isEmpty(gtype)) gtype = thiz.getGridType();
		if(CU.isEmpty(gtype)) return ;
		var key = PU.getPagePathKey() + thiz.bid;
		window.localStorage.setItem(key, gtype);
	};
	
	this.getGridType4Cache = function() {
		var key = PU.getPagePathKey() + thiz.bid;
		return window.localStorage.getItem(key);
	};
	this.switchGrid4Cache = function(defgtype) {
		var gtype = thiz.getGridType4Cache();
		if(CU.isEmpty(gtype)) gtype = CU.isEmpty(defgtype) ? "gthumb" : defgtype;
		thiz.switchGrid(gtype);
	};
	this.refreshDirPathWidth = function() {
		var mw = $(thiz.el_dirpath.parent().parent()).width();
		var gw = $($(thiz.el_dirpath.parent()).children()[0]).width();
		var rw = $($(thiz.el_dirpath.parent().parent()).children()[1]).width();
		thiz.el_dirpath.css("width", mw-rw-gw-80);
	};
	
	
	if(this.showDirPath) {
		setTimeout(thiz.refreshDirPathWidth, 1000);
	}
}



/**
 * 树对象
 * @param config : 配置参数, 参见：https://www.jstree.com.cn/api.html
 * 	扩展参数 :  bid : 绑定页面指定的div id
 * 				addroot : RS-addroot
 * 				act : simple|rest2, 缺省为rest2
 * 				url : 请求服务端地址
 * 				getParams(node, params, tree) : 获取参数, 返回false则中断查询
 * 				cb|callback(node, ps, rs, tree), return有值则替换rs
 * 				errcb : 异常回调
 * 				searchFieldWidth : 搜索条宽度, 缺省为100%
 * 				searchName : 搜索文本框的name, 缺省为searchFieldFuzzy
 * 				showSearchBox : 是否显示搜索条所在行, 缺省为false
 * 				singleSelect : 是否单选, 缺省为true
 * 				keepSelectedRow : 多选时是否保持选中行, 缺省为true
 * 				cascade : 多选是时是否级联选择, 缺省为true
 * 				loading : 加载数据时外部loading
 * 
 * 				addRootNode : 是否添加根节点 (后端支持)
 * 				appendAttrs : 是否将对象作为属性 (后端支持)
 * 				render : 节点渲染事件, render(row, parent, this), 返回false则过滤掉当前节点
 * 				loaded : 节点加载完事件, 如果是分级加载则每次都会调此事件, loaded(parent, rows, this)
 */
function PrettyTree(config) {
	if(CU.isEmpty(config)) throw " the config is empty argument! ";
	if(CU.isEmpty(config.bid)) throw " the config.bid is empty argument! ";
	if(CU.isEmpty(config.url)) throw " the config.url is empty argument! ";
	
	var thiz = this;
	$.extend(thiz, {act:"rest2", searchFieldWidth:"100%", searchName:"searchFieldFuzzy", showSearchBox:false, singleSelect:true,keepSelectedRow:true,cascade:true}, config);
	if(/^[0-9]+$/.test(this.searchFieldWidth=CU.trim(this.searchFieldWidth+""))) this.searchFieldWidth = this.searchFieldWidth + "px";
	this.showSearchBox = this.showSearchBox===true || this.showSearchBox=="true";
	this.bid = CU.clearlyElement(config.bid);
	
	var html = ['<div class="main-box clearfix" style="padding-bottom:12px;',(thiz.showSearchBox?'':'display:none;'),'">',
				'	<div class="form-group pull-left filter-block" style="width:',thiz.searchFieldWidth,';">',
				'		<input type="text" class="form-control"><span class="search-icon"><i class="fa fa-search"></i></span>',
				'	</div>',
				'	<div class="input-group-btn"></div>',
				'</div>',
				'<div class="custom-tree tannux-pretty-tree"></div>'];
	this.bid.append(html.join(''));
	this.el_text_search = $(this.bid.find("input")[0]);
	this.el_tree = $(this.bid.find(".tannux-pretty-tree")[0]);
	this.el_search_btn = $(this.bid.find(".search-icon")[0]);
	
	this.events = {
			"select":[],		//fun(node, selected, e, this) 
			"loaded":[]			//fun(parent, rows, this)
	};
	this.nodeLinks = null;		//节点上的链接事件, 链接上需指定 link-type与key匹配, fun(el, node, selected, e, this)
	
	this.getLoading = function() {
		var loading = [thiz.el_search_btn];
		if(!CU.isEmpty(thiz.searchLoading)) {
			loading.push(thiz.searchLoading);
		}
		if(!CU.isEmpty(thiz.loading)) {
			loading.push(CU.clearlyElement(thiz.loading));
		}
		return loading;
	};
	
	this.getQueryCondition = function() {
		var cdt = {};
		var sv = CU.trim(thiz.el_text_search.val()+"");
		if(!CU.isEmpty(sv)) {
			if(sv.indexOf('%')<0 && sv.indexOf('_')<0) sv = "%"+sv+"%";
			cdt[thiz.searchName] = sv;
		}
		return cdt;
	};
	
	this.ajaxCallback = function(node, callback, ps, rs) {
		var cb = thiz.callback;
		if(CU.isEmpty(cb)) cb = thiz.cb;
		if(CU.isFunction(cb)) {
			var a = cb(node, ps, rs, thiz);
			if(CU.isArray(a)) rs = a;
		}
		
		if(!CU.isEmpty(rs)) {
			var hasrender = CU.isFunction(thiz.render);
			var array = null;
			for(var i=0; i<rs.length; i++) {
				var row = rs[i];
				if(row.leaf!==undefined && row.leaf!==null && row.leaf!=1 && (row.children===undefined || row.children===null)) {
					row.children = true;
				}
				if(hasrender) {
					var o = thiz.render(row, node, thiz);
					if(o===false) {
						if(array==null) array = [];
						continue ;
					}else if(typeof(o)=="string") {
						row.text = o;
					}else if(CU.isObject(o)) {
						row = o;
					}
				}
				if(array != null) array.push(row);
			}
			if(array != null) rs = array;
		}
		callback.call(thiz.el_tree, rs);
		thiz.doEvent("loaded", node, rs, thiz);
	};
	
	this.defaultDataLoader = function(node, callback) {
		var cdt = thiz.getQueryCondition();
		var ps = {addRootNode:thiz.addRootNode, appendAttrs:thiz.appendAttrs, cdt:cdt};
		if(CU.isFunction(thiz.getParams)) {
			var obj = thiz.getParams(node, ps, thiz);
			if(obj === false) {
				callback.call(thiz.el_tree, []);
				return ;
			}
			if(CU.isObject(obj)) ps = obj;
		}
		
		if(thiz.act == "simple") {
			if(!CU.isArray(ps)) ps = [ps];
			RS.simple({addroot:thiz.addroot,url:thiz.url, ps:ps, loading:thiz.getLoading(), cb:function(rs) {
				thiz.ajaxCallback(node, callback, ps, rs);
			},errcb:function(code, message) {
				callback.call(thiz.el_tree, []);
				if(CU.isFunction(thiz.errcb)) {
					thiz.errcb(code, message);
				}else {
					RS.defaultErrorCallback(code, message);
				}
			}});
		}else {
			RS.rest2({addroot:thiz.addroot,url:thiz.url, ps:ps, loading:thiz.getLoading(), cb:function(rs) {
				thiz.ajaxCallback(node, callback, ps, rs);
			},errcb:function(code, message) {
				callback.call(thiz.el_tree, []);
				if(CU.isFunction(thiz.errcb)) {
					thiz.errcb(code, message);
				}else {
					RS.defaultErrorCallback(code, message);
				}
			}});
		}
	};
	
	
	this.setConfig = function(cfg) {
		if(CU.isEmpty(cfg)) cfg = {};
		delete thiz.config;
		thiz.config = CU.getObjectFields(cfg, "core,plugins,checkbox,contextmenu");
		if(CU.isEmpty(thiz.config.core)) thiz.config.core = {};
		if(CU.isEmpty(thiz.config.core.data)) thiz.config.core.data = this.defaultDataLoader;
	};
	
	this.setSingleSelect = function(singleSelect) {
		thiz.singleSelect = !(singleSelect===false || singleSelect=="false");
		if(thiz.singleSelect) {
			thiz.config.core.multiple = false;
			if(!CU.isEmpty(thiz.config.plugins)) {
				var idx = thiz.config.plugins.indexOf("checkbox");
				if(idx >= 0) {
					CU.remove(thiz.config.plugins, idx);
				}
			}
			if(CU.isObject(thiz.config.checkbox)) {
				delete thiz.config.checkbox;
			}
		}else {
			thiz.config.core.multiple = true;
			if(CU.isEmpty(thiz.config.plugins)) thiz.config.plugins = [];
			if(thiz.config.plugins.indexOf("checkbox") < 0) {
				thiz.config.plugins.push("checkbox");
			}
			if(CU.isEmpty(thiz.config.checkbox)) {
				thiz.config.checkbox = {'keep_selected_style':thiz.keepSelectedRow,three_state:thiz.cascade};
			}
		}
	};
	
	this.isSingleSelect = function() {
		return thiz.singleSelect;
	};
	
	this.setConfig(config);
	this.setSingleSelect(this.singleSelect);
	this.el_tree.jstree(thiz.config);
	
	
	this.setUrl = function(url) {
		if(CU.isEmpty(url)) return ;
		thiz.url = CU.trim(url + "");
	};
	
	
	
	
	/**
	 * 指定结点选中
	 * @param node : 可以是节点对象也可以节点ID
	 */
	this.setSelected = function(node, selected) {
		var fn = (selected===true || selected=="true") ? "select_node" : "unselect_node";
		thiz.el_tree.jstree(fn, node);
	};
	
	
	this.setSelectedAll = function(selected) {
		var fn = (selected===true || selected=="true") ? "select_all" : "deselect_all";
		thiz.el_tree.jstree(fn);
	};
	
	
	/**
	 * 根据节点ID获了节点对象
	 */
	this.getNode = function(nodeId) {
		return thiz.el_tree.jstree("get_node", nodeId+"");
	};
	
	
	this.isLeaf = function(node) {
		if(!CU.isObject(node)) node = thiz.getNode(node);
		if(CU.isObject(node)) {
			return thiz.el_tree.jstree("is_leaf", node);
		}
		return false;
	};
	
	
	this.setChecked = function(node, checked) {
		if(CU.isArray(node)) {
			for(var i=0; i<node.length; i++) {
				thiz.setChecked(node[i], checked);
			}
			return ;
		}
		if(!CU.isObject(node)) node = thiz.getNode(node);
		if(CU.isObject(node)) {
			var fn = (checked===true || checked=="true") ? "check_node" : "uncheck_node";
			thiz.el_tree.jstree(fn, node);
		}
	};
	
	this.setCheckedAll = function(checked) {
		var fn = (checked===true || checked=="true") ? "check_all" : "uncheck_all";
		thiz.el_tree.jstree(fn);
	};
	
	
	this.isSelected = function(node) {
		if(!CU.isObject(node)) node = thiz.getNode(node);
		if(CU.isObject(node)) {
			thiz.el_tree.jstree("is_selected", node);
		}
		return false;
	};
	
	this.isChecked = function(node) {
		if(!CU.isObject(node)) node = thiz.getNode(node);
		if(CU.isObject(node)) {
			thiz.el_tree.jstree("is_checked", node);
		}
		return false;
	};
	
	
	this.getSelectedNodes = function() {
		return thiz.el_tree.jstree("get_selected", true);
	};
	
	
	this.fillParentNodes = function(n, nodes, ids) {
		if(CU.isEmpty(n)) return ;
		var pid = n.parent;
		if(CU.isEmpty(pid) || pid==0 || pid=="0" || pid=="#") return ;
		
		var p = thiz.getNode(pid);
		if(CU.isEmpty(p)) return ;
		if(CU.isEmpty(ids[p.id])) {
			nodes.push(p);
			ids[p.id] = p;
			thiz.fillParentNodes(p, nodes. ids);
		}
	};
	
	
	/**
	 * @param cascadeParent : 级联时, 子节点未全选中时, 是否联带父级节点一并返回
	 */
	this.getCheckedNodes = function(cascadeParent) {
		var nodes = thiz.el_tree.jstree("get_checked", true);
		if((cascadeParent===true || cascadeParent=="true")
				&& !CU.isEmpty(nodes) && nodes.length>0) {
			var array = [];
			var ids = {};
			for(var i=0; i<nodes.length; i++) {
				var n = nodes[i];
				array.push(n);
				ids[n.id] = n;
			}
			for(var i=0; i<nodes.length; i++) {
				var n = nodes[i];
				thiz.fillParentNodes(n, array, ids);
			}
			nodes = array;
		}
		return nodes;
	};
	
	
	this.reload = function(node, cb) {
		if(!CU.isObject(node)) node = thiz.getNode(node);
		if(CU.isObject(node)) {
			thiz.el_tree.jstree("load_node", node, cb);
		}
	};
	
	this.search = function() {
		thiz.el_tree.jstree("destroy");
		thiz.el_tree.jstree(thiz.config);
		thiz.afterCreateTree();
	};
	
	
	this.execNodeLinkClick = function(node, selected, e, tree) {
		if(CU.isEmpty(thiz.nodeLinks)) return ;
		var el = $(e.target);
		var ba = true;
		if(el.length > 0) {
			var type = el.attr("link-type");
			var funs = null;
			if(!CU.isEmpty(type) && !CU.isEmpty(funs=thiz.nodeLinks[CU.trim(type+"")])) {
				for(var i=0; i<funs.length; i++) {
					ba = funs[i](el, node, selected, e, tree);
					if(ba === false) break;
				}
			}
		}
		return ba;
	};
	
	/**
	 * 绑定节点上的链接
	 * @param rows : 服务端返回节点数据
	 */
	this.bindNodeLinkClick = function(linkType, fun) {
		if(CU.isEmpty(linkType) || !CU.isFunction(fun)) return ;
		linkType = CU.trim(linkType+"");
		if(CU.isEmpty(thiz.nodeLinks)) thiz.nodeLinks = {};
		var arr = thiz.nodeLinks[linkType];
		if(CU.isEmpty(arr)) {
			arr = [];
			thiz.nodeLinks[linkType] = arr;
		}
		arr.push(fun);
	};
	
	
	/** events -------------------------------------------------  **/
	
	this.el_text_search.bind("keyup", function(e) {
		if(e.keyCode === 13) thiz.search();
	});
	this.el_search_btn.bind("click", function() {
		thiz.search();
	});
	
	this.on = function(name, fun) {
		thiz.bind(name, fun);
	};
	this.bind = function(name, fun) {
		if(CU.isEmpty(name) || !CU.isFunction(fun)) return ;
		name = CU.trim(name+"");
		var arr = thiz.events[name];
		if(CU.isArray(arr)) {
			arr.push(fun);
		}
	};
	this.doEvent = function(name, a,b,c,d,e,f,g) {
		if(CU.isEmpty(name)) return ;
		name = CU.trim(name+"");
		var arr = thiz.events[name];
		var ba = true;
		if(CU.isArray(arr)) {
			for(var i=0; i<arr.length; i++) {
				ba = arr[i](a,b,c,d,e,f,g);
				if(ba === false) break;
			}
		}
		return ba;
	};
	
	
	this.afterCreateTree = function() {
		this.el_tree.bind("select_node.jstree", function (e, data) {
			if(!CU.isEmpty(thiz.nodeLinks)) {
				try {
					var ba = thiz.execNodeLinkClick(data.node, data.selected, data.event, thiz);
					if(ba === false) return ;
				}catch(e) {
					console.error("execNodeLinkClick error : " + e);
				}
			}
			thiz.doEvent("select", data.node, data.selected, data.event, thiz);
		});
	};
	
	this.afterCreateTree();
	if(CU.isFunction(thiz.loaded)) thiz.bind("loaded", thiz.loaded);
}




