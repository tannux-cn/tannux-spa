/*!
 * tannux-web v3.1.0 (http://tannux.com)
 * Copyright 2014-2025 Tannux Technology Co., LTD
 * Licensed under the Apache License, Version 2.0.
 */

/**
 * 处理项目当中基础方法
 */
var PU = {
		/**
		 * 出错时或验证用户没有登录时进入首页地址
		 */
		getDefaultIndexPage : function() { return ""; },
		
		getSuffix : function(name) {
			if(name.indexOf('.')>0) return $.trim(name.substring(name.lastIndexOf('.')+1).toLowerCase());
			return "";
		},
		
		/**
		 * 获取资源类型
		 * 1=文档, 2=图片, 3=视频, 4=音乐, 99=其他
		 */
		getSourceType : function(name) {
			var fix = ","+PU.getSuffix(name)+",";
			if(",doc,docx,xls,xlsx,ppt,pptx,pdf,".indexOf(fix)>=0) return 1;
			if(",bmp,tif,tiff,gif,jpg,jpeg,png,svg,ico,icon,".indexOf(fix)>=0) return 2;
			if(",mp4,m4v,mov,qt,avi,flv,wmv,asf,mpeg,mpg,vob,mkv,rm,rmvb,vob,ts,mxf,".indexOf(fix)>=0) return 3;
			if(",mp3,wma,wav,midi,aiff,".indexOf(fix)>=0) return 4;
			if(name.startsWith("data:image")) return 2;
			return 99;
		},
		
		/**
		 * 在tab选项卡中打开模块
		 * @param cfg: 配制对象, 其内部所含属性如下:
		 * 	mid: 指定打开的模块ID
		 * 	mcode: 指定打开的模块代码 (如果mid不为空以mid为准)
		 * 	id: tab的id
		 *  title: tab标题
		 *  tabTip: tab小提示  缺省为title
		 *  closable: 是否带关闭按钮  缺省为true
		 *	params: 携带参数
		 * return : tab
		 */
		openTabModule : function(cfg) {
			return window.top.THS.openTabModule(cfg);
		},
		
		/**
		 * 以弹出窗口方式打开模块
		 * @param {} cfg
		 *  mc: 模块代码
		 *  ops: 携带参数, 对象类型, {key,value}
		 *  width: 窗口宽度   缺省为800
		 *  height: 窗口高度   缺省为600
		 *  resizable: 是否可变大小, boolean类型,   缺省为false
		 *  cb: 窗口关闭时回调方法(只对模态窗口起作用)
		 *  modal: 是否为模态窗口   缺省为true
		 */
		openModule : function(cfg) {
			return RS.openModule(cfg);
		},
		
		
		
		/**
		 * 以弹出窗口方式打开模块
		 * @param {} cfg
		 * 	addroot : 前缀
		 * 	url : 链接, 如果url与mc同时传入, 则优先url
		 *  mc: 模块代码
		 *  ps: 携带参数, 对象类型, {key,value}
		 *  autoDefaultParams : 是否自动带上缺省参数
		 *  title : 窗口标题
		 *  width: 窗口宽度   缺省为800
		 *  height: 窗口高度   缺省为600
		 *  cb: 窗口关闭时回调方法, cb(win, cfg)
		 */
		openModal : function(cfg) {
			if(CU.isEmpty(cfg) || (CU.isEmpty(cfg.url) && CU.isEmpty(cfg.mc))) {
				CC.showTip({type:"error",msg:"参数无效."});
				return ;
			}
			if(CU.isEmpty(PU.GLOBAL_WIN)) {
				var html = ['<div class="modal fade" role="dialog" aria-hidden="true">',
							'   <div class="modal-dialog" style="width:800px;">',
							'      <div class="modal-content">',
							'         <div class="modal-header">',
							'            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
							'            <h4 class="modal-title"></h4>',
							'         </div>',
							'         <div class="modal-body">',
							'         	<iframe frameborder="0" width="100%" src="" style="height:600px;overflow:hidden;" scrolling="yes"></iframe>',
							'         </div>',
							'      </div>',
							'	</div>',
							'</div>'];
				PU.GLOBAL_WIN = $(html.join(""));
				$("body").append(PU.GLOBAL_WIN);
				
				PU.GLOBAL_WIN.bind("hide.bs.modal", function() {
					$(PU.GLOBAL_WIN.find("iframe")[0]).attr("src", "");
					var config = PU.GLOBAL_WIN[0].config;
					var callback = PU.GLOBAL_WIN[0].callback;
					PU.GLOBAL_WIN[0].config = null;
					PU.GLOBAL_WIN[0].callback = null;
					if(CU.isFunction(callback)) {
						callback(PU.GLOBAL_WIN, PU.GLOBAL_WIN);
					}
				});
			}
			
			var url = cfg.url;
			if(CU.isEmpty(url)) url = "/sysframe/dispatch/mc/"+cfg.mc;
			url = RS.getRemoteUrl({addroot:cfg.addroot, act:"simple", url:url});
			if(CU.isObject(cfg.ps)) {
				var param = CU.parseParams(cfg.ps);
				if(!CU.isEmpty(param)) {
					url += (url.indexOf('?')<0?'?':'&') + param;
				}
			}
			if(cfg.autoDefaultParams!==false && cfg.autoDefaultParams!="false") {
				url += (url.indexOf('?')<0?'?':'&') + "hl=true&ht=true&hb=true&bgcolor=%23ffffff%3b&ppad=0&pad=0";
			}
			
			//如果跨域, 则需带上token
			if(CU.isCrossDomain(url)) {
				url = RS.autoFillToken(url);
			}
			var width = CU.isEmpty(cfg.width) ? 800 : cfg.width;
			var height = CU.isEmpty(cfg.height) ? 600 : cfg.height;
			var title = cfg.title;
			if(CU.isEmpty(title)) title = "";
			
			PU.GLOBAL_WIN.find(".modal-dialog").css("width", width+"px");
			var iframe = $(PU.GLOBAL_WIN.find("iframe")[0]);
			iframe.css("height", height+"px");
			iframe.attr("src", url);
			PU.GLOBAL_WIN.find(".modal-title").html(title);
			PU.GLOBAL_WIN[0].config = cfg;
			PU.GLOBAL_WIN[0].callback = cfg.cb;
			PU.GLOBAL_WIN.modal("show");
		},
		
		/**
		 * 关闭通用弹出窗口
		 */
		closeModal : function() {
			if(!CU.isEmpty(PU.GLOBAL_WIN)) {
				PU.GLOBAL_WIN.modal("hide");
			}
		},
		
		
		/**
		 * 页面跳转
		 * @param {} cfg
		 * 	mc: 模块代码
		 *  ops: 携带参数, 对象类型, {key,value}
		 *  rmod: POST/GET, 缺省为POST
		 */
		forwardModule : function(cfg) {
			RS.forwardModule(cfg);
		},
		
		
		getCodeRegex : function() {
			return /^(([a-zA-Z])([a-zA-Z0-9]|[_]){0,39})$/;
		},
		
		getCodeRegexText : function() {
			return "1-40位字母、数字或下划线组合,并且必须以字母开头!";
		},
		
		/**
		 * 跟据代码定义名、值获取值所对应的名称
		 */
		getDropName : function(def, code) {
			var ls = DROP[def];
			if(CU.isEmpty(ls)) return "";
			for(var i=0; i<ls.length; i++) {
				if(ls[i].code==code) return ls[i].name;
			}
			return "";
		},
		
		
		setRadioGroupValue : function(name, val) {
			var els = $("input[name="+name+"]");
			els.attr("checked", false);
			
			if(!CU.isEmpty(val)) {
				val = val + "";
				for(var i=0; i<els.length; i++) {
					if($(els[i]).val() == val) {
						els[i].checked = true;
						break;
					}
				}
			}
		},
		
		
		getRadioGroupValue : function(name) {
			return $("input[name="+name+"]:checked").val();
		},
		
		
		extractDropValue : function(item, addcolor) {
			if(CU.isEmpty(item)) return "";
			if(addcolor && !CU.isEmpty(item.color)) {
				return "<font color='"+item.color+"'>"+item.name+"</font>";
			}else {
				return item.name;
			}
		},
		
		/**
		 * 获取下拉列表数据
		 * @param def 代码定义
		 * @param v 值
		 * @param addcolor 是否添加颜色
		 */
		getDropValue : function(def, v, addcolor) {
			var item = CU.getDropItemRecord(def, v);
			return PU.extractDropValue(item, addcolor);
		},
		
		getDropValueByName : function(def, v, addcolor) {
			var item = CU.getDropItemRecordByName(def, v);
			return PU.extractDropValue(item, addcolor);
		},
		
		getDropValueByAlias : function(def, v, addcolor) {
			var item = CU.getDropItemRecordByAlias(def, v);
			return PU.extractDropValue(item, addcolor);
		},
		
		getDropColor : function(def, v) {
			var item = CU.getDropItemRecord(def, v);
			if(CU.isEmpty(item)) return "";
			return item.color;
		},
		
		
		getSelectOptionsHtml : function(def, v, addEmpty, emptyName) {
			var html = [];
			var ls = null;
			if(CU.isArray(def)) ls = def;
			if(typeof(def)=="string") ls = DROP[def];
			if(!CU.isEmpty(ls)) {
				if(addEmpty !== false) {
					if(CU.isEmpty(emptyName)) emptyName = "&nbsp;";
					html.push("<option value=\"\" "+sel+">"+emptyName+"</option>");
				}
				var hasv = !CU.isEmpty(v);
				for(var i=0; i<ls.length; i++) {
					var row = ls[i];
					if(CU.isEmpty(row) || (!CU.isEmpty(row.status)&&row.status!=1) || (!CU.isEmpty(row.isDisp)&&row.isDisp!=1)) {
						continue ;
					}
					var sel = hasv && v==row.code ? "selected" : "";
					html.push("<option value=\""+row.code+"\" "+sel+">"+row.name+"</option>");
				}
			}
			return html.join("");
		},
		
		
		filterPrefix : function(name, prefix) {
			if(!CU.isEmpty(name) && !CU.isEmpty(prefix)) {
				if(name.startsWith(prefix)) {
					name = name.substring(prefix.length);
				}else {
					name = "";
				}
			}
			return name;
		},
		
		addPrefix : function(name, prefix) {
			if(!CU.isEmpty(name) && !CU.isEmpty(prefix)) {
				name = prefix + name;
			}
			return name;
		},
		
		
		
		/**
		 * tannux-format : time|date|datetime|f2|f4|dict
		 */
		formatValue : function(el, val) {
			el = CU.clearlyElement(el);
			var format = el.attr("tannux-format");
			if(CU.isEmpty(val)) {
				val = el.attr("default-value");
			}
			if(!CU.isEmpty(val) && !CU.isEmpty(format)) {
				var dict = null;
				var addcolor = null;
				
				if(format=="dict" || format=="enum") {
					dict = el.attr("dict");
					if(CU.isEmpty(dict)) dict = el.attr("view");
					addcolor = el.attr("addcolor");
				}else if(format=="fun") {
					var fun = el.attr("fun");
					if(!CU.isEmpty(fun)) {
						fun = CU.getObjectValue(window, fun);
						if(CU.isFunction(fun)) {
							format = fun;
						}
					}
					if(!CU.isFunction(format)) {
						throw new "Not setting fun.";
					}
				}
				val = CU.format(val, format, dict, addcolor);
			}
			return val;
		},
		
		
		/**
		 * tannux-format : time|date|datetime|f2|f4
		 */
		getValue4Format : function(el) {
			el = CU.clearlyElement(el);
			var val = el.val();
			var format = el.attr("tannux-format");
			if(!CU.isEmpty(val) && !CU.isEmpty(format)) {
				format = CU.trim(format+"").toLowerCase();
				val = CU.trim(val+"")
				if(format=="time") {
					val = CU.toNumberTime(val);
				}else if(format=="date") {
					val = CU.toNumberDate(val);
				}else if(format=="datetime") {
					val = CU.toNumberDateTime(val);
				}else if(format=="f2" || format=="fee2") {
					val = parseInt(parseFloat(val)*100, 10);
				}else if(format=="f4" || format=="fee4") {
					val = parseInt(parseFloat(val)*10000, 10);
				}
			}
			return val;
		},
		
		setValue4Format : function(el, val) {
			el = CU.clearlyElement(el);
			val = PU.formatValue(el, val);
			el.val(val);
		},
		
		
		
		/**
		 * 获取表单所有数据
		 * @param formId : 表单元素ID (可以是form,也可以是div等)
		 * @param tags : 指定需获取元素标签, 多个以逗号(,)分隔, 缺省为 input,select,textarea,.summernote
		 * @param ignoreNull : 是否忽略null值, 缺省为true
		 * @param prefix : 指定字段前缀
		 * @param batchFields : 指定批量获取值的字段
		 * tannux-format : time|date|datetime|f2|f4
		 */
		getFormData : function(formId, tags, ignoreNull, prefix, batchFields) {
			ignoreNull = ignoreNull !== false;
			var ts = null;
			if(CU.isEmpty(tags)) {
				ts = ["input","select","textarea"];
			}else if(CU.isArray(tags)) {
				ts = tags;
			}else {
				ts = (tags+"").split(",");
			}
			var bfs = null;
			if(!CU.isEmpty(batchFields)) {
				if(CU.isArray(batchFields)) {
					bfs = batchFields;
				}else {
					bfs = (batchFields+"").split(",");
				}
			}
			var hasbfs = !CU.isEmpty(bfs);
			
			var data = {};
			
			var form = CU.clearlyElement(formId);
			if(CU.isEmpty(form)) return data;
			
			for(var i=0; i<ts.length; i++) {
				var els = form.find(ts[i]);
				
				for(var j=0; j<els.length; j++) {
					if(CU.isEmpty(els[j].name)) continue ;
					var type = "";
					if(!CU.isEmpty(els[j].type)) type = els[j].type.toLowerCase();
					var ed = $(els[j]);
					var v = null;
					var n = PU.filterPrefix(els[j].name, prefix);
					if(CU.isEmpty(n)) continue ;
					
					if(type == "checkbox") {
						v = ed.is(":checked") ? 1 : 0;
					}else if(type == "radio") {
						if(ed.is(":checked")) {
							v = ed.val();
						}else {
							v = data[n];
						}
					}else if(ed.hasClass("bootstrap-slider")) {
						v = ed.data('slider').getValue();
					}else {
						v = PU.getValue4Format(ed);
					}
					if(v===null || v===undefined) {
						if(!ignoreNull)	continue ;
						v = null;
					}
					
					var dn = ed.attr("displayName");
					var dv = null;
					if(!CU.isEmpty(v) && !CU.isEmpty(dn) && CU.trim(ts[i]).toLowerCase()=="select") {
						dv = ed.find('option:selected').text();
					}
					
					if(hasbfs && bfs.indexOf(n)>=0) {
						var arr = data[n];
						if(CU.isEmpty(arr)) {
							arr = [];
							data[n] = arr;
						}
						arr.push(v);
						
						if(!CU.isEmpty(dn) && bfs.indexOf(dn)>=0) {
							var arr1 = data[dn];
							if(CU.isEmpty(arr1)) {
								arr1 = [];
								data[dn] = arr1;
							}
							arr1.push(dv);
						}
					}else {
						data[n] = v;
						if(!CU.isEmpty(dv)) {
							data[dn] = dv;
						}
					}
				}
			}
			if(CU.isFunction(PU.externalGetFormData)) {
				var obj = PU.externalGetFormData(data, formId, tags, ignoreNull, prefix);
				if(CU.isObject(obj)) data = obj;
			}
			return data;
		},
		
		/**
		 * 对表单批量赋值
		 * @param data 表单数据
		 * @param formId 表单元素ID (可以是form,也可以是div等)
		 * @param tags 指定需获取元素标签, 多个以逗号(,)分隔, 缺省为 input,select,textarea,.summernote
		 * @param ignoreNull 是否忽略null值, 缺省为false
		 */
		setFormData : function(data, formId, tags, ignoreNull, prefix) {
			if(!CU.isObject(data)) return ;
			var ts = null;
			if(CU.isEmpty(tags)) {
				ts = ["input","select","textarea"];
			}else if(CU.isArray(tags)) {
				ts = tags;
			}else {
				ts = (tags+"").split(",");
			}
			
			var form = CU.clearlyElement(formId);
			if(CU.isEmpty(form)) return ;
			ignoreNull = ignoreNull === true;
			
			for(var i=0; i<ts.length; i++) {
				var els = form.find(ts[i]);
				
				for(var j=0; j<els.length; j++) {
					var n = els[j].name;
					if(CU.isEmpty(n)) continue ;
					var dn = PU.filterPrefix(n, prefix);
					if(CU.isEmpty(dn)) continue;
					var v = data[dn];
					if(v===null || v===undefined) {
						if(ignoreNull)	continue ;
						v = "";
					}
					
					var type = "";
					if(!CU.isEmpty(els[j].type)) type = els[j].type.toLowerCase();
					var el = $(els[j]);
					
					if(type == "checkbox") {
						el.prop("checked", v==1||v=="1"||v=="true"||v==true);
					}else if(type == "radio") {
						var ev = el.val() + "";
						el.prop("checked", ev==v+"");
					}else if(el.hasClass("bootstrap-slider")) {
						el.data("slider").setValue(v);
					}else if(el.hasClass("item-form-colorpicker")) {
						el.colorpicker("setValue", v);
					}else {
						PU.setValue4Format(el, v);
					}
				}
			}
			if(CU.isFunction(PU.externalSetFormData)) {
				PU.externalSetFormData(data, formId, tags, ignoreNull, prefix);
			}
		},
		
		
		
		/**
		 * @param formId 表单元素ID (可以是form,也可以是div等)
		 * @param tags 指定元素标签, 多个以逗号(,)分隔, 缺省为 input,select,textarea,.summernote
		 */
		clearFormData : function(formId, tags, prefix) {
			var ts = null;
			if(CU.isEmpty(tags)) {
				ts = ["input","select","textarea"];
			}else if(CU.isArray(tags)) {
				ts = tags;
			}else {
				ts = (tags+"").split(",");
			}
			
			var form = CU.clearlyElement(formId);
			if(CU.isEmpty(form) || form.length==0) return ;
			
			for(var i=0; i<ts.length; i++) {
				var els = form.find(ts[i]);
				for(var j=0; j<els.length; j++) {
					var name = els[j].name;
					if(CU.isEmpty(name) || (!CU.isEmpty(prefix) && !name.startsWith(prefix))) continue ;
					var type = "";
					if(!CU.isEmpty(els[j].type)) type = els[j].type.toLowerCase();
					
					if(type=="checkbox" || type=="radio") {
						$(els[j]).prop("checked", false);
					}else {
						$(els[j]).val("");
					}
				}
			}
			if(CU.isFunction(PU.externalClearFormData)) {
				PU.externalClearFormData(formId, tags, prefix);
			}
		},
		
		
		/**
		 * @param formId 表单元素ID (可以是form,也可以是div等)
		 * @param disabled 是否可被编辑
		 * @param tags 指定元素标签, 多个以逗号(,)分隔, 缺省为 input,select,textarea,.summernote
		 */
		setFormDisabled : function(formId, disabled, tags) {
			var ts = null;
			if(CU.isEmpty(tags)) {
				ts = ["input","select","textarea"];
			}else if(CU.isArray(tags)) {
				ts = tags;
			}else {
				ts = (tags+"").split(",");
			}
			
			var form = CU.clearlyElement(formId);
			if(CU.isEmpty(form)) return ;
			disabled = CU.isTrue(disabled);
			
			for(var i=0; i<ts.length; i++) {
				var els = form.find(ts[i]);
				for(var j=0; j<els.length; j++) {
					if(CU.isEmpty(els[j].name)) continue ;
					var type = "";
					if(!CU.isEmpty(els[j].type)) type = els[j].type.toLowerCase();
					var el = $(els[j]);
					
					if(ts[i]=="textarea" || (ts[i]=="input" && type!="checkbox" && type!="radio" && CU.isEmpty(el.attr("data-provide")) 
						&& !el.hasClass("item-form-datepicker") && !el.hasClass("item-form-datetimepicker") && !el.hasClass("item-form-timepicker")
						&& !el.hasClass("item-form-colorpicker"))) {
						
						if(el.hasClass("bootstrap-slider")) {
							if(disabled) {
								el.slider("disable");
							}else {
								el.slider("enable");
							}
						}else {
							el.prop("readOnly", disabled);
						}
					}else {
						el.prop("disabled", disabled);
					}
				}
			}
			form.find(".tannux-classify-upload-field").attr("data-editable", !disabled);
			if(CU.isFunction(PU.externalSetFormDisabled)) {
				PU.externalSetFormDisabled(formId, disabled, tags);
			}
		},
		
		
		/**
		 * 将data中的{a:[1,2,3], b:[1,2,3]}提取出[{a:1,b:1}, {a:2,b:2} ...]格式
		 * @param {} fields
		 * 		delField4Data : 是否删除字段在data中的数据
		 * 		idField : 指定fields中哪个是ID, 会自动将名字转为id
		 */
		getFormDataBatchRecords : function(data, fields, prefix, delField4Data, idField) {
			if(CU.isEmpty(fields)) return ;
			var bfs = null;
			if(CU.isArray(fields)) {
				bfs = fields;
			}else {
				bfs = (fields+"").split(",");
			}
			var del = CU.isTrue(delField4Data);
			var attrs = [];
			
			for(var i=0; i<bfs.length; i++) {
				var n = bfs[i];
				var vs = data[n];
				var an = "";
				if(n == idField) {
					an = "id";
				}else {
					an = PU.filterPrefix(n, prefix);
				}
				
				if(!CU.isEmpty(vs)) {
					for(var j=0; j<vs.length; j++) {
						var v = vs[j];
						var row = null;
						if(attrs.length <= j) {
							row = {};
							attrs.push(row);
						}else {
							row = attrs[j];
						}
						row[an] = v;
					}
				}
				if(del) {
					delete data[n];
				}
			}
			return attrs;
		},
		
		
		/**
		 * t: -1=左%		1=右%	0||空=两边%%
		 */
		getCdtVal : function(el_id, t) {
			var el = $("#"+el_id);
			var v = el.val();
			if(!CU.isEmpty(v) && el.is("input")) {
				if(CU.isEmpty(t)||t==0) {
					v = "%"+v+"%";
				}else if(t > 0) {
					v = v+"%";
				}else {
					v = "%"+v;
				}
			}
			return v;
		},
		
		getCdtVals : function(el_ids, t) {
			var cdt = {};
			if(!CU.isEmpty(el_ids)) {
				for(var i=0; i<el_ids.length; i++) {
					var v = PU.getCdtVal(el_ids[i], t);
					if(!CU.isEmpty(v)) {
						var id = el_ids[i];
						if(id.indexOf("cdt_")==0) {
							id = id.substring(4);
						}
						cdt[id] = v;
					}
				}
			}
			return cdt;
		},
		
		
		getCustomPrefixVals : function(el_ids, prefix, filterEmpty) {
			var bean = {};
			if(!CU.isEmpty(el_ids)) {
				var len = prefix.length;
				for(var i=0; i<el_ids.length; i++) {
					var v = $("#"+el_ids[i]).val();
					if(filterEmpty===true || !CU.isEmpty(v)) {
						var id = el_ids[i];
						if(id.indexOf(prefix)==0) {
							id = id.substring(len);
						}
						bean[id] = v;
					}
				}
			}
			return bean;
		},
		
		
		setCustomPrefixVals : function(el_ids, prefix, bean) {
			if(!CU.isEmpty(el_ids)) {
				var len = prefix.length;
				for(var i=0; i<el_ids.length; i++) {
					var id = el_ids[i];
					if(id.indexOf(prefix)==0) {
						id = id.substring(len);
					}
					var v = bean[id];
					if(v==null || v==undefined) {
						v = "";
					}
					$("#"+el_ids[i]).val(v);
				}
			}
		},
		
		
		clearCustomPrefixVals : function(el_ids, prefix) {
			if(!CU.isEmpty(el_ids)) {
				var len = prefix.length;
				for(var i=0; i<el_ids.length; i++) {
					var id = el_ids[i];
					if(id.indexOf(prefix)==0) {
						id = id.substring(len);
					}
					$("#"+el_ids[i]).val("");
				}
			}
		},
		
		
		getShortString : function(v, len) {
			if(CU.isEmpty(v)) return "";
			if(CU.isEmpty(len)) len = 6;
			if(v.length > len) {
				v = v.substring(0, len) + "...";
			}
			return v;
		},
		
		
		/**
		 * ajax调用
		 * @param cfg: 配置对象, 其属性值如下
		 * 		url: 地址
		 * 		ps: 参数对象{}
		 * 		msg: 显示消息, 可以是string类型, 为string类型表示消息内容, 可以为boolean, 表示是否显示消息信息
		 * 		cb: 回调方法
		 * 		errcb: 错误回调方法	errcb(code, message);
		 */
		submitEditable : function(cfg) {
			var d = new $.Deferred;
			RS.ajax({url:cfg.url,ps:cfg.ps,msg:cfg.msg,cb:function(cbrs) {
				d.resolve();
				if(CU.isFunction(cfg.cb)) cfg.cb(cbrs);
			},errcb:function(code, message) {
				if(CU.isFunction(cfg.errcb)) {
					if(cfg.errcb(code, message, d)===false) return;
				}
				d.reject(message);
			}});
			return d.promise();
		},
		
		
		getElementObject : function(el) {
			return CU.clearlyElement(el);
		},
		getElementAttrs : function(el, names) {
			if(typeof(names)=="string") names = names.split(",");
			if(!CU.isArray(names)) return null;
			el = PU.getElementObject(el);
			var data = {};
			for(var i=0; i<names.length; i++) {
				var n = names[i];
				var v = el.attr(n);
				if(!CU.isEmpty(v, true, false)) {
					data[n] = v;
				}
			}
			return data;
		},
		setElementAttrs : function(el, data) {
			if(!CU.isObject(data)) return ;
			el = PU.getElementObject(el);
			for(var key in data) {
				var v = data[key];
				if(!CU.isEmpty(v, true, false)) {
					el.attr(key, v);
				}
			}
		},
		
		
		setPageData : function(obj, parent, tags, attrName, filterEmpty) {
			if(CU.isEmpty(obj) || CU.isEmptyObject(obj)) return ;
			parent = CU.clearlyElement(parent);
			if(CU.isEmpty(attrName)) attrName = "for-name";
			attrName = CU.trim(attrName);
			if(CU.isEmpty(tags)) {
				var els = null;
				if(CU.isEmpty(parent)) {
					els = $("["+attrName+"]");
				}else {
					els = parent.find("["+attrName+"]");
				}
				PU.setPageItemData(els, obj, attrName, filterEmpty);
			}else {
				if(!CU.isArray(tags)) tags = (tags+"").split(",");
				for(var i=0; i<tags.length; i++) {
					var tag = tags[i];
					if(CU.isEmpty(tag)) continue;
					var fuzzy = CU.trim(tag)+"["+attrName+"]";
					var els = null;
					if(CU.isEmpty(parent)) {
						els = $(fuzzy);
					}else {
						els = parent.find(fuzzy);
					}
					PU.setPageItemData(els, obj, attrName, filterEmpty);
				}
			}
		},
		
		setPageItemData : function(els, obj, attrName, filterEmpty) {
			if(CU.isEmpty(els) || els.length<=0 || CU.isEmpty(obj) || CU.isEmptyObject(obj)) return ;
			if(CU.isEmpty(attrName)) attrName = "for-name";
			attrName = CU.trim(attrName);
			for(var i=0; i<els.length; i++) {
				var el = $(els[i]);
				var name = el.attr(attrName);
				if(CU.isEmpty(name)) continue;
				name = CU.trim(name);
				var val = CU.getObjectValue(obj, name);
				
				val = PU.formatValue(el, val);
				if(CU.isEmpty(val)) {
					if(filterEmpty===true || filterEmpty=="true") continue ;
					val = "";
				}
				
				var tag = el[0].tagName.toLowerCase();
				if(tag=='input' || tag=='select' || tag=='textarea') {
					el.val(val);
				}if(tag=='img' || tag=='image') {
					if(!CU.isEmpty(val) && !CU.isEmpty(window.ContextPath) && !val.startsWith(window.ContextPath) && !val.startsWith("http://") && !val.startsWith("https://")) {
						var ps = el.attr("data-ps");
						if(!CU.isEmpty(ps) && (ps=CU.trim(ps+"")).length>2 && ps.charAt(0)=='{' && ps.charAt(ps.length-1)=='}') {
							try {
								ps = CU.toObject(ps);
							}catch(e) {
								console.error("image-ps toObject error: ["+ps+"] " + e);
							}
						}
						val = PU.toRsmImageUrl(val, ps);
					}
					el.attr("src", val);
				}else {
					el.html(val);
				}
			}
		},
		
		/**
		 * 验证token
		 */
		verifyToken : function(token) {
			var oldtoken = window.localStorage.getItem("token");
			if(CU.isEmpty(token)) {
				/**
				 * @author wanwb
				 * 20220626 token不再在cookie中存放
				 */
				/**
				//cookie-token与localStorage保待一致
				var cookietoken = CU.getCookie("token");
				if(CU.isEmpty(cookietoken)) {
					if(!CU.isEmpty(oldtoken)) {
						CU.setCookie("token", oldtoken);
					}
				}else {
					if(CU.isEmpty(oldtoken)) {
						CU.removeCookie("token");
					}else if(oldtoken != cookietoken) {
						CU.setCookie("token", oldtoken);
					}
				}
				*/
				
				if(CU.isEmpty(token)) {
					token = oldtoken;
				}
				if(CU.isEmpty(token) && CU.isEmpty(window.SU)) {
//					if(CU.isEmpty(indexUrl)) indexUrl = PU.getDefaultIndexPage();
//					window.location = indexUrl;
					PU.getCC().logout();
					return false;
				}
			}else {
//				window.localStorage.setItem("token", token);
//				CU.setCookie("token", token);
				PU.setToken(token);
			}
			if(oldtoken != token) {
				PU.removeMenuTreeData();
			}
			return true;
		},
		
		
		/**
		 * 设置定时刷新token
		 * @param time : 刷新token间隔时间, 单位:小时
		 */
		setRefreshTokenTimer : function(time) {
			if(CU.isEmpty(time) || parseInt(CU.trim(time+""), 10)<=0) return ;
			setTimeout(function() {
				PU.refreshToken(function(t) {
					PU.setRefreshTokenTimer(time);
				}, function(e) {
					PU.setRefreshTokenTimer(time);
					throw " refresh-token failure! " + e;
				});
			}, time*3600000);
		},
		
		
		
		/**
		 * 刷新token
		 */
		refreshToken : function(cb, errcb, upsu) {
			var ps = {};
			if(!CU.isEmpty(upsu)) ps.upsu = upsu;
			RS.ajax({url:"/sso/client/oauth/refreshToken", ps:ps, cb:function(t) {
				PU.setToken(t);
				PU.removeMenuTreeData();
				if(CU.isFunction(cb)) cb(t);
			},errcb:function(e) {
				if(CU.isFunction(errcb)) {
					errcb(e);
				}else {
					throw " refresh-token failure! " + e;
				}
			}});
		},
		
		
		
		/**
		 * 获取token的有效时长, 单位：小时, 由客户端系统覆盖
		 * 如果返回空或<=0, 则系统不自动判定是否需要refreshToken
		 */
		getTokenTimeoutHour : function() {
		},
		
		/**
		 * 判断是否需要refreshToken
		 * @return true|false, 是否执行了refreshToken
		 */
		verifyRefreshToken : function() {
			var timeout = PU.getTokenTimeoutHour();
			if(CU.isEmpty(timeout) || timeout<=0) return false;
			
			var token = PU.getToken();
			if(CU.isEmpty(token)) return false;
			
			var lastTime = window.localStorage.getItem("TANNUX_SET_TOKEN_TIME");
			if(!CU.isEmpty(lastTime)) {
				lastTime = parseInt(lastTime, 10);
				var time = new Date().getTime();
				var hour = (time-lastTime)/1000/60/60;
				if(hour < timeout) {
					return false;
				}
			}
			
			PU.refreshToken();
			return true;
		},
		
		
		getToken : function() {
			token = window.localStorage.getItem("token");
//			if(CU.isEmpty(token)) {
//				token = CU.getCookie("token");
//			}
			return token;
		},
		
		setToken : function(token) {
			if(CU.isEmpty(token)) token = "";
			window.localStorage.setItem("token", token);
			window.localStorage.setItem("TANNUX_SET_TOKEN_TIME", new Date().getTime()+"");
		},
		
		removeToken : function() {
			window.localStorage.removeItem("token");
			window.localStorage.removeItem("TANNUX_SET_TOKEN_TIME");
			CU.removeCookie("token");
		},
		
		removeUrlToken : function() {
			var url = window.location.href + "";
			var reurl = null;
			
			while(true) {
				var idx = url.indexOf("token");
				if(idx < 1) break;
				
				var s1 = CU.trim(url.substring(0, idx));
				var s2 = CU.trim(url.substring(idx+5));
				var hasre = false;
				
				if(s1.length > 1) {
					var e = s1.charAt(s1.length-1);
					if(e=='?' || e=='&') {
						var p = s2.charAt(0);
						if(p == '=') {
							s2 = CU.trim(s2.substring(1));
							idx = s2.indexOf('&');
							
							if(idx >= 0) {
								s2 = CU.trim(s2.substring(idx+1));
								reurl = s1 + s2;
							}else {
								reurl = s1.substring(0, s1.length-1);
							}
							hasre = true;
						}
					}
				}
				
				if(hasre) {
					url = reurl;
				}else {
					break ;
				}
			}
			
			if(!CU.isEmpty(reurl)) {
				try {
					window.history.pushState({}, '', reurl);
				}catch(e) {
					console.error("window.history.pushState error : " + reurl);
				}
			}
		},
		
		
		/**
		 * 获取dataTable组件
		 * @param config : 配置参数, 参见：PrettyDataTable
		 */
		getThumbTable : function(config) {
			return new PrettyThumbTable(config);
		},
		
		/**
		 * 获取dataTable组件
		 * @param config : 配置参数, 参见：PrettyDataTable
		 */
		getDataTable : function(config) {
			return new PrettyDataTable(config);
		},
		
		
		/**
		 * 获取DataTableChildExpander组件
		 * @param config : 配置参数, 参见：PrettyDataTableChildExpander
		 */
		getDataTableChildExpander : function(config) {
			return new PrettyDataTableChildExpander(config);
		},
		
		/**
		 * 获取jstree组件
		 * @param config : 配置参数, 参见：PrettyTree
		 */
		getTree : function(config) {
			return new PrettyTree(config);
		},
		
		
		/**
		 * 获取表单组件
		 * @param config : 配置参数, 参见：PrettyForm
		 */
		getForm : function(config) {
			return new PrettyForm(config);
		},
		
		/**
		 * bid : 绑定元素
		 */
		getSelect2 : function(cfg) {
			var config = $.extend({placeholder:"",minimumInputLength:0,maximumInputLength:20,language:'zh-CN'}, cfg);
			if(cfg.remote !== false) {
				var ajax = config.ajax;
				if(CU.isEmpty(ajax)) ajax = $.extend({}, config);
				ajax = $.extend({dataType:'json',type:"post",delay:500, cache:true,act:"rest2"}, ajax);
				ajax.url = RS.getRemoteUrl(ajax);
				
				if(CU.isEmpty(ajax.headers)) ajax.headers = {};
				ajax.headers["REQUEST_HEADER"] = "tannux-http-client-header";
				ajax.headers["Content-Type"] = "application/json";
				RS.onBeforeHeaders(ajax.headers, cfg);
				RS.appendToken(ajax.url, ajax.headers);
				config.ajax = ajax;
			}
			var bid = CU.clearlyElement(cfg.bid);
			return bid.select2(config);
		},
		
		/**
		 * 获取dataTable组件
		 * @param config : 配置参数, 参见：PrettyDataTable
		 */
		getColumnTable : function(config) {
			return new PrettyColumnTable(config);
		},
		
		
		getImagePreview : function () {
			if(CU.isEmpty(PU.IMAGE_PREVIEW)) {
				PU.IMAGE_PREVIEW = new PrettyImagePreview();
			}
			return PU.IMAGE_PREVIEW;
		},
		
		getTextPreview : function() {
			if(CU.isEmpty(PU.TEXT_PREVIEW)) {
				PU.TEXT_PREVIEW = new PrettyTextPreview();
			}
			return PU.TEXT_PREVIEW;
		},
		
		showImagePreview : function(images, at) {
			PU.getImagePreview().show(images, at);
		},
		
		showTextPreview : function(cfg) {
			PU.getTextPreview().show(cfg);
		},
		
		
		refreshImagePreview : function(pageIdx, rowIdx) {
			PU.refreshImagePreview(pageIdx, rowIdx);
		},
		
		getRsmChooser : function() {
			if(CU.isEmpty(PU.RSM_CHOOSER)) {
				PU.RSM_CHOOSER = new PrettyRsmChooser();
			}
			return PU.RSM_CHOOSER;
		},
		
		showRsmChooser : function(cfg, cb) {
			PU.getRsmChooser().show(cfg, cb);
		},
		
		getOmstdChooser : function() {
			if(CU.isEmpty(PU.OMSTD_CHOOSER)) {
				PU.OMSTD_CHOOSER = new PrettyOmstdChooser();
			}
			return PU.OMSTD_CHOOSER;
		},
		
		showOmstdChooser : function(cfg, cb) {
			PU.getOmstdChooser().show(cfg, cb);
		},
		
		getUploadField : function (config) {
			return new PrettyUploadField(config);
		},
		
		/**
		 * 获取分类上传系统缺省根目录, 由外部扩展
		 */
		getClassifyUploadDirRoot : function() {
		},
		
		/**
		 * 按分类上传时, 获取更新附件数量服务入口, 由外部扩展
		 */
		getUpdateClassifyAttachNumRoot : function(classify, editable, config) {
		},
		
		/**
		 * 分类上传后更新附件数量
		 */
		classifyUploadCallback : function(classify, editable, config) {
			if(editable===true || editable=="true") {
				var root = PU.getUpdateClassifyAttachNumRoot(classify, editable, config);
				RS.ajax({addroot:root,url:"/tannux/common/tool/updateClassifyAttachNum", ps:{classify:classify}, cb:function(num) {
					console.log("--------------------- classify:" + classify + ", count:" + num + " -----------------------");
					var field = config.field;
					if(!CU.isEmpty(field) && !CU.isEmpty(num)) {
						PU.setClassifyUploadFieldValue(field, num);
					}
				}});
			}
		},

		
		/**
		 * 显示分类上传窗口
		 * * @param cfg
		 * 		dirRoot : 附件所存放的入口目录, 缺省为根目录
		 * 		title : 窗口显示标题, 缺省为表名+字段名
		 * 		tableCode : 表名
		 * 		tableName : 表中文名
		 * 		attachCode : 附件对应的字段名
		 * 		attachName : 附件对应的中文名
		 * 		key : 主键值
		 * 		editable : 是否编辑(上传), 缺省为view
		 * 		field : 上传field, 回调时同时附上值
		 * 		cb : 窗口关闭时触发, cb(classify, editable, config)
		 */
		showClassifyUploadWin : function(cfg) {
			if(CU.isEmpty(cfg) || CU.isEmpty(cfg.tableCode) || CU.isEmpty(cfg.tableName) 
					|| CU.isEmpty(cfg.attachCode) || CU.isEmpty(cfg.attachName) 
					|| CU.isEmpty(cfg.key)) {
				PU.getCC().showTip({type:"error",msg:"参数无效."});
				return ;
			}
			var edit = cfg.editable===true || cfg.editable=="true";
			
			if(CU.isEmpty(PU.CLASSIFY_UPLOAD_WIN)) {
				var html = ['<div class="modal fade" role="dialog" aria-hidden="true">',
							'   <div class="modal-dialog" style="width:',(edit?'1100':'800'),'px;">',
							'      <div class="modal-content">',
							'         <div class="modal-header">',
							'            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
							'            <h4 class="modal-title">资源文件上传</h4>',
							'         </div>',
							'         <div class="modal-body">',
							'         	<iframe frameborder="0" width="100%" src="" style="height:650px;overflow:hidden;" scrolling="yes"></iframe>',
							'         </div>',
							'      </div>',
							'	</div>',
							'</div>'];
				PU.CLASSIFY_UPLOAD_WIN = $(html.join(""));
				$("body").append(PU.CLASSIFY_UPLOAD_WIN);
				PU.CLASSIFY_UPLOAD_WIN.bind("hide.bs.modal", function() {
					PU.CLASSIFY_UPLOAD_WIN.find("iframe").attr("src", "");
					var cus = PU.CLASSIFY_UPLOAD_WIN.attr("classify");
					var ed = PU.CLASSIFY_UPLOAD_WIN.attr("editable");
					ed = ed===true || ed=="true";
					
					var cb = PU.CLASSIFY_UPLOAD_WIN[0].callback;
					if(!CU.isFunction(cb)) cb = PU.CLASSIFY_UPLOAD_CALLBACK;
					if(!CU.isFunction(cb)) cb = PU.classifyUploadCallback;
					if(CU.isFunction(cb)) {
						cb(cus, ed, PU.CLASSIFY_UPLOAD_WIN[0].config);
					}
					PU.CLASSIFY_UPLOAD_WIN[0].config = null;
					PU.CLASSIFY_UPLOAD_WIN[0].callback = null;
					PU.CURRENT_CLASSIFY_UPLOAD = null;
				});
			}
			
			var classify = (CU.trim(cfg.tableCode+"") + "-" + CU.trim(cfg.attachCode+"") + "-" + CU.trim(cfg.key+"")).toUpperCase();
			var dirRoot = CU.isEmpty(cfg.dirRoot) ? PU.getClassifyUploadDirRoot() : CU.trim(cfg.dirRoot+"");
			if(CU.isEmpty(dirRoot)) dirRoot = "";
			var dirPath = encodeURIComponent(dirRoot+"/"+CU.trim(cfg.tableName+"")+"/"+CU.trim(cfg.attachName+""));
			
			//RsmServerRoot已过期, 拆成RsmApiRoot、RsmWebRoot, 以下判断为兼容以前版本
			var rsmroot = CU.isEmpty(window.RsmWebRoot) ? window.RsmServerRoot : window.RsmWebRoot;
			var url = rsmroot + "/api/simple/sysframe/dispatch/mc/06810202?hl=true&ht=true&hb=true&ppad=0&pad=0&bgcolor=%23ffffff%3b&dirPath="+dirPath+"&oup="+edit+"&orm="+edit+"&classify="+classify+"&token="+PU.getToken();
			if(CU.isEmpty(cfg.title)) cfg.title = "资源文件上传&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;"+cfg.tableName+"&nbsp;/&nbsp;"+cfg.attachName;
			PU.CLASSIFY_UPLOAD_WIN.find("iframe").attr("src", url);
			PU.CLASSIFY_UPLOAD_WIN.find(".modal-title").html(cfg.title);
			PU.CLASSIFY_UPLOAD_WIN.attr("classify", classify);
			PU.CLASSIFY_UPLOAD_WIN.attr("editable", edit+"");
			PU.CLASSIFY_UPLOAD_WIN[0].config = cfg;
			PU.CLASSIFY_UPLOAD_WIN[0].callback = cfg.cb;
			PU.CLASSIFY_UPLOAD_WIN.modal("show");
		},
		
		onClassifyUploadClick : function(e) {
			var el = $(this);
			var tableCode = el.attr("data-table-code");
			var tableName = el.attr("data-table-name");
			var attachCode = el.attr("data-attach-code");
			var attachName = el.attr("data-attach-name");
			var key = el.attr("data-key");
			var editable = el.attr("data-editable");
			var cfg = {tableCode:tableCode, tableName:tableName, attachCode:attachCode, attachName:attachName, key:key, editable:editable, field:el};
			if(CU.isEmpty(cfg.key)) {
				CC.showTip({type:"error",msg:"请先保存数据后再上传附件."});
				return ;
			}
			PU.showClassifyUploadWin(cfg);
		},
		setClassifyUploadFieldValue : function(field, value, key) {
			if(CU.isEmpty(field)) return ;
			if(CU.isEmpty(value)) value = "0";
			field = CU.clearlyElement(field);
			field.attr("data-value", value);
			if(!(key===undefined || key===null)) field.attr("data-key", key);
			field.trigger('value-change');
		},
		clearClassifyUploadFieldValue : function(field) {
			PU.setClassifyUploadFieldValue(field, "0", "");
		},
		
		onClassifyUploadChange : function(e) {
			var t = $(this);
			var v = t.attr("data-value");
			if(CU.isEmpty(v)) v = 0;
			t.find(".tannux-classify-upload-field-value").html(v);
		},
		bindClassifyUploadClick : function(el_parent) {
			var el_fs = null;
			if(CU.isEmpty(el_parent)) {
				el_fs = $(".tannux-classify-upload-field");
			}else {
				el_parent = CU.clearlyElement(el_parent);
				el_fs = el_parent.find(".tannux-classify-upload-field");
			}
			if(!CU.isEmpty(el_fs) && el_fs.length>0) {
				for(var i=0; i<el_fs.length; i++) {
					var el = $(el_fs[i]);
					el.css("cursor", "pointer");
					var v = el.attr("data-value");
					if(CU.isEmpty(v)) v = "0";
					if(CU.isEmpty(el.html())) {
						var padding =  el.css("padding");
						if(CU.isEmpty(padding)||padding==0||padding=="0"||padding=="0px") {
							el.css("padding-top", "5px");
						}
						el.html('<i class="fa fa-upload fa-lg"></i>&nbsp;&nbsp;(<span class="tannux-classify-upload-field-value">'+v+'</span>)');
					}
					el.bind("click", PU.onClassifyUploadClick);
					el.bind("value-change", PU.onClassifyUploadChange);
				}
			}
		},
		
		/**
		 * 构建下拉列表
		 */
		buildSelectFields : function(el_parent) {
			var el_fs = null;
			if(CU.isEmpty(el_parent)) {
				el_fs = $(".tannux-input-select");
			}else {
				el_parent = CU.clearlyElement(el_parent);
				el_fs = el_parent.find(".tannux-input-select");
			}
			if(!CU.isEmpty(el_fs) && el_fs.length>0) {
				for(var i=0; i<el_fs.length; i++) {
					var el = $(el_fs[i]);
					var dict = el.attr("dict");
					
					if(CU.isEmpty(dict)) {
						dict = el.attr("view");
					}
					if(!CU.isEmpty(dict)) {
						var selectValue = el.attr("selectValue");
						var addEmpty = el.attr("addEmpty");
						var emptyName = el.attr("emptyName");
						addEmpty = CU.isEmpty(addEmpty) || (addEmpty==1 || addEmpty=="1" || addEmpty===true || addEmpty=="true");
						el.html(PU.getSelectOptionsHtml(dict, selectValue, addEmpty, emptyName));
					}
				}
			}
		},
		
		toRsmUrl : function(path, ps) {
			return RS.toRsmUrl(path, ps);
		},
		
		toRsmImageUrl : function(path, ps) {
			return RS.toRsmImageUrl(path, ps);
		},
		
		appendBreadLineParams : function(code, ps) {
			if(CU.isEmpty(code) || !CU.isObject(ps)) return ;
			var app = CU.parseParams(ps);
			if(CU.isEmpty(app)) return ;
			var els = $(".breadcrumb a[menuCode='"+code+"']");
			if(!CU.isEmpty(els) && els.length>0) {
				var el = $(els[0]);
				var href = el.attr("href");
				if(!CU.isEmpty(href)) {
					href += (href.indexOf('?')<0?'?':'&') + app;
					el.attr("href", href);
				}
			}
		},
		
		
		onSummernoteUploadFiles : function(field, files, uploadUrl, fileName) {
			if(CU.isEmpty(files) || files.length==0) return ;
			if(CU.isEmpty(fileName)) fileName = "files";
			
			var form = new FormData();
			for(var i=0; i<files.length; i++) {
				var file = files[i];
				form.append(fileName, file);
			}
			
			RS.ajax({url:uploadUrl,act:"form",ps:form,bscfg:{processData:false,contentType:false},upload:true,cb:function(rs) {
				if(CU.isEmpty(rs)) return ;
				for(var i=0; i<rs.length; i++) {
					field.summernote('insertImage', RsmAccessRoot+rs[i]);
				}
			}});
		},
		
		
		getSummernote : function(selector, config) {
			if(CU.isEmpty(selector)) throw "'selector' is empty!";
			if(CU.isEmpty(config)) config = {};
			if(CU.isEmpty(config.height)) config.height = 600;
			if(CU.isEmpty(config.focus)) config.focus = false;
			if(CU.isEmpty(config.toolbar)) config.toolbar = [
			                        				         ['undo',['undo','redo','clear']], //撤销、重做、清楚格式
			                        				         ['fontname', ['fontname','fontsize']], //字体工具：字体系列   、字体大小    
			                        				         ['style', ['bold', 'italic', 'underline','strikethrough']], //字体工具： 字体粗体、字体斜体、字体下划线、中划线                
			                        				         ['color', ['color']], //字体颜色
			                        				         ['para', ['ol','ul', '增加缩进','减少缩进']], //无序列表、有序列表、增加缩进、减少缩进、
			                        				         ['style', ['paragraph','height','style']],//段落工具 ：段落对齐方式、行高 、样式
			                        				         ['table',['table','hr','link']], //插入工具    ：表格  、水平线 、  链接 
			                        				         ['insert',['picture']], //图片 、视频、音频、文档      
			                        				         ['fullscreen',['fullscreen','codeview']], //全屏
			                        				        ];
			if(CU.isEmpty(config.fontSizes)) config.fontSizes = ['5','6','7','8','9','10','11','12','13','14','15','16','18','20','22','24','26','28','30','32','34','36','38','40','42','44','46','48'];
			
			if(!CU.isEmpty(config.insertButtons)) {
				var finded = false;
				for(var i=0; i<config.toolbar.length; i++) {
					var arr = config.toolbar[i];
					if(arr[0] == "insert") {
						arr[1] = config.insertButtons;
						finded = true;
						break;
					}
				}
				if(!finded) {
					config.toolbar.push(['insert',config.insertButtons]);
				}
			}
			
			if(CU.isEmpty(config.fontNames)) config.fontNames = ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New','仿宋','宋体','微软雅黑','新宋体','楷体','黑体','等线','等线 Light'];
			if(CU.isEmpty(config.callbacks)) config.callbacks = {onImageUpload:function(files){PU.onSummernoteUploadFiles($(this), files, "/sys/upload/uploadFiles");},
					onPaste: function (ne) {
	                    var bufferText = ((ne.originalEvent || ne).clipboardData || window.clipboardData).getData('text/plain');
	                    ne.preventDefault ? ne.preventDefault() : (ne.returnValue = false);
	                    setTimeout(function () {
	                        document.execCommand("insertText", false, bufferText);
	                    }, 10);
					}
			};
			if(CU.isEmpty(config.lang)) config.lang = 'zh-CN';
			
			return $(selector).summernote(config);
		},
		
		
		/**
		 
		proType : 
			1: 整数-[Integer]：数值框, 如果有小数点提交时自动截取
			2: 小数-[Double] : 数值框
			3: 短文本-[Varchar] : 文本框、日期、时间
			4: 长文本-[Long Varchar] : 文本框、文本域、富文本
			5: 文章-[Clob] :　文本域、富文本
			6: 枚举-[ENUM] : 下拉列表, 单选框

		input :
			1 : 文本
			2 : 数值
			3 : 日期
//			4 : 时间
			5 : 文本域
			6 : 富文本
			7 : 下拉列表
			8 : 单选框
			
			
		配置
		[
			[{f:"属性ID", c:"组件类型", w:"占用列数"}, {}, {}],
			[{f:"属性ID", c:"组件类型", w:"占用列数"}, {}, {}]
		]

		*/
		getDynamicFormSelectOptionsHtml : function(proType) {
			var html = [];
			switch(proType) {
				case 1: {		//整数-[Integer]：数值框, 如果有小数点提交时自动截取
					html.push('<option value="2">数值框</option>');
					break;		
				}
				case 2: {		//小数-[Double] : 数值框
					html.push('<option value="2">数值框</option>');
					break;
				}
				case 3:	{		//短文本-[Varchar] : 文本框
					html.push('<option value="1">文本框</option>');
					html.push('<option value="3">日期框</option>');
//					html.push('<option value="4">时间框</option>');
					break;
				}
				case 4: {		//长文本-[Long Varchar] : 文本框、文本域、富文本
					html.push('<option value="1">文本框</option>');
					html.push('<option value="5">文本域</option>');
					html.push('<option value="6">富文本</option>');
					break;
				}
				case 5: {		//文章-[Clob] :　文本域、富文本
					html.push('<option value="5">文本域</option>');
					html.push('<option value="6">富文本</option>');
					break;
				}
				case 6:	{		//枚举-[ENUM] : 下拉列表, 单选框
					html.push('<option value="7">下拉列表</option>');
					html.push('<option value="8">单选框</option>');
					break;
				}
			}
			return html.join("");
		},
		
		
		getDynamicFormWidth : function(cols, labelWidth, fieldWidth) {
			if(CU.isEmpty(labelWidth)) labelWidth = 120;
			if(CU.isEmpty(fieldWidth)) fieldWidth = 250;
			return (labelWidth+fieldWidth) * cols + 35;
		},
		
		/**
		 * config
		 * 		attrs : 属性数组
		 * 		conf : 属性配置
		 * 		labelWidth : 字段标签宽度, 缺省:120
		 * 		fieldWidth : 字段组件长度, 缺省:250
		 * 		textAreaHeight : 文本域高度, 缺省:100
		 * 		richTextHeight : 富文本高度, 缺省:300
		 * 		uploadUrl : 上传地址
		 * 		uploadFileName : 上传是文件提交表单名, 缺省为file
		 * @returns
		 */
		getDynamicFormDom : function(cfg) {
			if(CU.isEmpty(cfg)) throw "the config is empty!";
			var html = [];
			
			var attrs = cfg.attrs;
			var conf = cfg.conf;
			
			if(!CU.isEmpty(attrs) && !CU.isEmpty(conf)) {
				var labelWidth = cfg.labelWidth;
				var fieldWidth = cfg.fieldWidth;
				var textAreaHeight = cfg.textAreaHeight;
				var richTextHeight = cfg.richTextHeight;
				
				if(CU.isEmpty(labelWidth)) labelWidth = 120;
				if(CU.isEmpty(fieldWidth)) fieldWidth = 250;
				var itemWidth = labelWidth + fieldWidth;
				
				if(CU.isEmpty(textAreaHeight)) textAreaHeight = 100;
				if(CU.isEmpty(richTextHeight)) richTextHeight = 300;
				
				var attrmap = {};
				for(var i=0; i<attrs.length; i++) {
					var a = attrs[i];
					attrmap["attr_"+a.id] = a;
				}
				
				for(var i=0; i<conf.length; i++) {
					var arr = conf[i];
					html.push('<div class="form-group">');
					if(!CU.isEmpty(arr) && (!CU.isEmpty(arr[0]) || !CU.isEmpty(arr[1]) || !CU.isEmpty(arr[2]))) {
						for(var j=0; j<arr.length; j++) {
							var a = arr[j];
							if(CU.isEmpty(a) || CU.isEmpty(a.f) || CU.isEmpty(attrmap["attr_"+a.f])) {
								html.push('<div class="pull-left" style="width:',itemWidth,'px;"></div>');
							}else {
								var attr = attrmap["attr_"+a.f];
								var type = parseInt(a.c, 10);
								var cols = parseInt(a.w, 10);
								var tw = cols * itemWidth;
								var iw = tw - labelWidth;
								html.push('<div class="pull-left" style="width:'+tw+'px;">',
											'<label for="',attr.proStdCode,'" class="control-label pull-left" style="width:',labelWidth,'px;">',attr.proName);
								if(attr.isRequired == 1) {
									html.push('<font color="red">*</font>');
								}
								html.push('：</label>');
								
								html.push('<div class="pull-left" style="width:',iw,'px;">');
								switch(type) {
									case 1 : html.push('<input type="text" id="',attr.proStdCode,'" name="',attr.proStdCode,'" ',(attr.isRequired==1?'required':''),' class="form-control" maxLength=65 style="width:',iw,'px;">'); break; 	//文本
									case 2 : html.push('<input type="number" id="',attr.proStdCode,'" name="',attr.proStdCode,'" ',(attr.isRequired==1?'required':''),' class="form-control" maxLength=20 style="width:',iw,'px;">'); break; 	//数值
									case 3 : html.push('<input id="',attr.proStdCode,'" name="',attr.proStdCode,'" ',(attr.isRequired==1?'required':''),' class="form-control" maxLength=20 style="width:',iw,'px;" data-provide="datepicker" data-date-autoclose="true" data-date-format="yyyy-mm-dd">'); break; 	//日期
//									case 4 : html.push(''); break; 	//时间
									case 5 : html.push('<textarea id="',attr.proStdCode,'" name="',attr.proStdCode,'" ',(attr.isRequired==1?'required':''),' class="form-control" maxLength=333 style="width:',iw,'px;height:',textAreaHeight,'px;"></textarea>'); break; 	//文本域
									case 6 : html.push('<div id="',attr.proStdCode,'" name="',attr.proStdCode,'" ',(attr.isRequired==1?'required':''),' class="summernote" style="width:',iw,'px;"></div>'); break; 	//富文本
									case 7 : {		//下拉列表
										html.push('<select id="',attr.proStdCode,'" name="',attr.proStdCode,'" ',(attr.isRequired==1?'required':''),' class="form-control" style="width:',iw,'px;">');
										html.push('<option value="">&nbsp;</option>');
										var es = attr.enumVals;
										if(!CU.isEmpty(es)) {
											var esarr = es.split('|');
											for(var k=0; k<esarr.length; k++) {
												html.push('<option value="',esarr[k],'">',esarr[k],'</option>');
											}
										}
										html.push('</select>');
										break; 	
									}
									case 8 : {		//单选框
										var es = attr.enumVals;
										if(!CU.isEmpty(es)) {
											var esarr = es.split('|');
											for(var k=0; k<esarr.length; k++) {
												html.push('<label class="fancy-radio custom-color-blue" style="margin-top:7px;"><input name="',attr.proStdCode,'" value="',esarr[k],'" type="radio" '+(k==0?'checked':'')+'><span><i></i>',esarr[k],'</span></label>');
											}
										}
										break; 
									}
								}
								html.push('</div>');
								html.push('</div>');
							}
						}
					}
					html.push('</div>');
				}
				
				
				var dom = $(html.join(""));
				var el_notes = dom.find(".summernote");
				if(!CU.isEmpty(el_notes) && el_notes.length>0) {
					for(var i=0; i<el_notes.length; i++) {
						$(el_notes[i]).summernote({
							height: richTextHeight,
							lang : 'zh-CN',
							focus: true,
							callbacks: { onImageUpload:function(files){PU.onSummernoteUploadFiles($(this), files, cfg.uploadUrl, cfg.uploadFileName);} }
						});
					}
				}
				return dom;
			}
			return $("");
		},
		
		
		
		
		getDataTableByConfig : function(bid, info, extconfg, timeFieldRender, instfields) {
			if(CU.isEmpty(bid)) {
				PU.getCC().showTip({"type":"error","msg":"绑定页面元素ID为空!"});
				return ;
			}
			if(CU.isEmpty(info) || CU.isEmpty(info.grid)) {
				PU.getCC().showTip({"type":"error","msg":"列表配置为空!"});
				return ;
			}
			if(CU.isEmpty(info.cols)) {
				PU.getCC().showTip({"type":"error","msg":"查询列表没有配置列!"});
				return ;
			}
			if(CU.isEmpty(info.attrs)) {
				PU.getCC().showTip({"type":"error","msg":"查询列表配置模型没有属性!"});
				return ;
			}
			
			var config = $.extend({showSearchFilter:true}, info.grid);
			if(!CU.isEmpty(info.grid.gridConfig)) config = $.extend(config, CU.toObject(info.grid.gridConfig));
			config.bid = bid;
			if(info.grid.modelType===1 || info.grid.modelType=="1") {
				config.url = "/omdb/ominst/queryInfoPage";
			}
			
			var cols = info.cols;
			var attrs = info.attrs;
			var dictDropMap = info.dictMap;
			if(!CU.isEmpty(dictDropMap)) {
				for(var key in dictDropMap) {
					var drop = dictDropMap[key];
					DROP["FV_DICT_DROP_"+key] = drop;
				}
			}
			
			var attrMap = {};
			for(var i=0; i<attrs.length; i++) {
				var attr = attrs[i];
				attrMap[attr.id] = attr;
			}
			var columns = [];
			if(!CU.isEmpty(instfields)) {
				if(!CU.isArray(instfields)) instfields = (instfields + "").split(",");
				for(var i=0; i<instfields.length; i++) {
					var name = CU.trim(instfields[i]);
					var title = "";
					switch(name) {
						case "code": title = "数据代码"; break;
						case "dispShort": title = "简称"; break;
						case "dispFull": title = "全称"; break;
						case "ownerCode": title = "用户编码"; break;
						case "ownerName": title = "用户名称"; break;
						default : break;
					}
					if(CU.isEmpty(title)) {
						continue ;
					}
					columns.push({title:title, data:"inst."+name, align:"center"});
				}
			}
			for(var i=0; i<cols.length; i++) {
				var col = cols[i];
				var attr = attrMap[col.attrId];
				if(CU.isEmpty(attr)) continue;
				var name = "data."+attr.attrStdCode;
				var align = col.align===1?"left":(col.align==3?"right":"center");	//1=居左、2=居中、3=居右
				var visible = col.visible===1 || col.visible===true || col.visible=="1" || col.visible=="true";
				var cdtable = col.cdtable===1 || col.cdtable===true || col.cdtable=="1" || col.cdtable=="true";
				var dtime = col.dtime===1 || col.dtime===true || col.dtime=="1" || col.dtime=="true";
				var colorable = col.colorable===1 || col.colorable===true || col.colorable=="1" || col.colorable=="true";
				var view = CU.isEmpty(col.dictId) ? "" : ("FV_DICT_DROP_"+col.dictId);
				var ctype = "";
				if(!CU.isEmpty(col.ctype)) {
					var c = col.ctype = parseInt(col.ctype, 10);
					switch(c) {		//1=string  2=number  3=enum  4=date  5=dateinval  6=numinval
						case 1: ctype = "string"; break;
						case 2: ctype = "number"; break;
						case 3: ctype = "enum"; break;
						case 4: ctype = "date"; break;
						case 5: ctype = "dateinval"; break;
						case 6: ctype = "numinval"; break;
					}
				}
				
				var column = {title:col.title, data:name, align:align, visible:visible, cdtable:cdtable, orderable:false, ctype:ctype, decbit:col.decbit, dtime:dtime, colorable:colorable, view:view, cdtMaxLength:col.cdtMaxLength, render:col.render};
				if(col.fieldType==6 && !CU.isEmpty(view) && CU.isEmpty(column.render)) {	//enum
					column.render = PrettyDataTable_DefaultRenderer;
				}
				columns.push(column);
			}
			columns.push({title:"创建时间", data:"inst.createTime", align:"center", visible:true, cdtable:true,ctype:"dateinval",dtime:true, orderable:false, render:function(value, type, row, meta) {
	        	if(CU.isFunction(timeFieldRender)) {
	        		return timeFieldRender(value, type, row, meta);
	        	} else {
	        		return CU.toStringDateTime(value);
	        	}
		    }});
			config.columns = columns;
			if(CU.isEmpty(config.getParams)) {
				config.getParams = PrettyDataTable_Omdb_getParams;
			}
			if(CU.isObject(extconfg)) {
				if(!CU.isEmpty(extconfg.columns)) {
					for(var i=0; i<extconfg.columns.length; i++) {
						config.columns.push(extconfg.columns[i]);
					}
				}
				delete extconfg.columns;
				$.extend(config, extconfg);
			}
			for(var i=0; i<config.columns.length; i++) {
				var col = config.columns[i];
				if(CU.isEmpty(col.width)) col.width = 160;
			}
			return new PrettyDataTable(config);
		},
		
		
		getDataFormByConfig : function(bid, info) {
			if(CU.isEmpty(bid)) {
				PU.getCC().showTip({"type":"error","msg":"绑定页面元素ID为空!"});
				return ;
			}
			if(CU.isEmpty(info) || CU.isEmpty(info.form)) {
				PU.getCC().showTip({"type":"error","msg":"表单配置为空!"});
				return ;
			}
			if(CU.isEmpty(info.items)) {
				PU.getCC().showTip({"type":"error","msg":"表单配置字段为空!"});
				return ;
			}
			if(CU.isEmpty(info.attrs)) {
				PU.getCC().showTip({"type":"error","msg":"表单配置模型属性为空!"});
				return ;
			}
			var config = info.form;
			config.bid = bid;
			config.items = info.items;
			config.attrs = info.attrs;
			config.dictDropMap = info.dictDropMap;
			return new PrettyDataForm(config);
		},
		
		
		setTableSelectRow : function(tab, trid) {
			tab = CU.clearlyElement(tab);
			var els = tab.find("tr");
			if(!CU.isEmpty(els) && els.length>0) {
				for(var i=0; i<els.length; i++) {
					var el = $(els[i]);
					var id = el.attr("id");
					el.css("background-color", (trid==id?"#E8F4F8":"#ffffff"));
				}
			}
		},
		
		getPagePathKey : function(prefix) {
			var url = window.location.pathname + "";
			if(CU.isEmpty(prefix, true)) prefix = "/api/simple";
			if(!CU.isEmpty(prefix)) {
				var idx = url.indexOf(prefix);
				if(idx >= 0) {
					url = url.substring(idx+prefix.length);
				}
			}
			return url;
		},
		
		parseSearchCondition : function(cdt) {
			if(CU.isEmpty(cdt)) cdt = {};
			var fuzzy = CU.trim(cdt.searchFieldFuzzy);
			if(!CU.isEmpty(fuzzy) && /^[/][0-9]+([,][0-9]+)*[.].+$/.test(fuzzy)) {
				cdt.searchFieldFuzzy = "";
				fuzzy = fuzzy.substring(1, fuzzy.indexOf('.'));
				if(fuzzy.indexOf(',') > 0) {
					cdt.ids = fuzzy.split(",");
				}else {
					cdt.id = fuzzy;
				}
			}
			return cdt;
		},
		
		getNewsRich : function(config) {
			return new PrettyRichEditor(config);
		},
		getCC : function() {
			var curr = window; 
			var parent = null;
			var cc = CC;
			while(!CU.isEmpty(parent=curr.parent)&&curr!=parent){
				try {
					curr = parent;
					if(!CU.isEmpty(curr.CC)) cc = curr.CC;
				}catch(e) {
					break;
				}
			}
			return cc;
		},
		
		getParentMethod : function(name) {
			var curr = window; 
			var parent = null;
			var fun = window[name];
			while(!CU.isEmpty(parent=curr.parent)&&curr!=parent){
				try {
					curr = parent;
					var f = curr[name];
					if(CU.isFunction(f)) fun = f;
				}catch(e) {
					break;
				}
			}
			return fun;
		},
		
		showLoading : function(msg, loading) {
			if(CU.isEmpty(loading)) return ;
			if(CU.isArray(loading)) {
				for(var i=0; i<loading.length; i++) {
					PU.showLoading(msg, loading[i]);
				}
				return ;
			}
			if(CU.isFunction(loading)) {
				loading(msg, true);
			}else if(CU.isObject(loading)) {
				$(loading).button("loading");
			}else if(!CU.isEmpty(loading)) {
				var array = loading.split(",");
				for(var i=0; i<array.length; i++) {
					var btn = $("#"+array[i]);
					if(CU.isFunction(btn.button)) {
						btn.button("loading");
					}
				}
			}
		},
		hideLoading : function(msg, loading) {
			if(CU.isEmpty(loading)) return ;
			if(CU.isArray(loading)) {
				for(var i=0; i<loading.length; i++) {
					PU.hideLoading(msg, loading[i]);
				}
				return ;
			}
			
			if(CU.isFunction(loading)) {
				loading(msg, false);
			}else if(CU.isObject(loading)) {
				$(loading).button("reset");
			}else if(!CU.isEmpty(loading)) {
				var array = loading.split(",");
				for(var i=0; i<array.length; i++) {
					var btn = $("#"+array[i]);
					if(CU.isFunction(btn.button)) {
						btn.button("reset");
					}
				}
			}
		},
		
		initLayout : function(callback) {
			RS.onShowErrMsg = function(errcode, errmsg) {
				if(errcode == 401) {
					PU.getCC().logout();
				}else if(CU.isEmpty(errmsg)) {
					PU.getCC().showTip({type:"error", msg:"服务器访问失败!"});
				}else {
					PU.getCC().showTip({type:"error", msg:(errmsg.replace(/\n/g, "<br>").replace(/ /g, "&nbsp;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"))});
				}
				return false;
			};
			RS.onFailure = function(xmlhttp) {
				if(xmlhttp.status==401 || xmlhttp.status==501) {
//					window.location = PU.getDefaultIndexPage();
					PU.getCC().logout();
				}else {
					PU.getCC().showTip({type:"error", msg:"服务器访问失败!"});
				}
				return false;
			};
			RS.onShowMsg = function(msg, loading) { PU.showLoading(msg, loading); };
			RS.onHideMsg = function(msg, loading) { PU.hideLoading(msg, loading); };
			RS.defstatus = function(status) {
				if(PU.REFRESH_TOKEN===true) return true;
				PU.REFRESH_TOKEN = true;
				if(status == 210) {
					PU.refreshToken(function(t) {
						PU.REFRESH_TOKEN = false;
					}, function(e) {
						PU.REFRESH_TOKEN = false;
						throw " refresh-token failure! " + e;
					});
				}else if(status == 401) {
//					window.location = PU.getDefaultIndexPage();
					PU.getCC().logout();
					return false;
				}
				return true;
			};
			
			if($.fn.datepicker) {
				$.fn.datepicker.dates.zhc = $.fn.datetimepicker.dates.zhc = {
						days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
						daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
						daysMin: ["日", "一", "二", "三", "四", "五", "六"],
						months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
						monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
						meridiem : [ "上午", "下午" ],
						suffix: [],
						today: "今天",
						clear: "清空",
						titleFormat: "MM yyyy"
				};
				$.fn.datepicker.defaults.language = $.fn.datetimepicker.defaults.language = "zhc";
				var datepickerOps = {autoclose:true, todayBtn:"linked", todayHighlight:true};
				$.extend($.fn.datepicker.defaults, datepickerOps);
				$.extend($.fn.datetimepicker.defaults, datepickerOps);
				$.fn.datepicker.defaults.format = "yyyy-mm-dd";
				$.fn.datetimepicker.defaults.format = "yyyy-mm-dd hh:ii:00";
				$.fn.datetimepicker.defaults.minView = 0;
				$.fn.datetimepicker.defaults.minuteStep = 1;
			}
			if($.fn.modal) {
				$.fn.modal.Constructor.prototype.enforceFocus = function () {};
			}
			
			$("#a_logout").bind("click", function() {PU.getCC().logout();});
			PU.refreshLayoutObject(callback);
		},
		
		
		/**
		 * 刷新当前用户
		 * @param cb
		 * @param upsu : 是否更新最新用户数据, 缺省为false
		 */
		refreshLoginUser : function(upsu, cb) {
			var ps = {};
			if(!CU.isEmpty(upsu)) ps.upsu = upsu;
			RS.ajax({url:"/sso/client/oauth/getLoginUser", ps:ps, cb:function(u) {
				SU = u;
				
				//如果需要强制更新用户, 则更新token
				if(upsu===true || upsu=="true" || upsu=="1" || upsu==1) {
					var token = u.authCode;
					PU.setToken(token);
					PU.removeMenuTreeData();
				}
				if(CU.isFunction(cb)) cb(u);
			}});
		},
		
		
		refreshLayoutObject : function(cb) {
//			window.RsmAccessRoot = "";
			window.SU = null;
			window.OPT_CODES = "";
			
			var ps = {};
			if(!CU.isEmpty(window.MENU)) ps.menuCode = MENU.menuCode;
			RS.ajax({addroot:window.SYS_LOADMENUS_ROOT, url:"/sysframe/auth/getLayoutObject.nlo", ps:ps,cb:function(rs) {
				if(!CU.isEmpty(rs)) {
					SU = rs.user;
					if(!CU.isEmpty(rs.rsmAccessRoot)) RsmAccessRoot = rs.rsmAccessRoot;
					if(!CU.isEmpty(rs.optCodes)) OPT_CODES = ","+rs.optCodes+",";
				}
				if(!CU.isEmpty(SU)) {
					$("#a_navbar_menu_user").find("span").html(SU.userName);
				}
				if(CU.isFunction(cb))cb();
			}});
		},
		
		loadMenuTreeData : function(cb) {
			RS.ajax({addroot:window.SYS_LOADMENUS_ROOT, url:"/sysframe/auth/getMenuTree",cb:function(rs) {
				if(CU.isFunction(cb))cb(rs);
			}});
		},
		
		loadLoginUser : function(cb) {
			RS.ajax({addroot:window.SYS_LOADMENUS_ROOT, url:"/sysframe/auth/getLoginUser",cb:function(rs) {
				window.SU = rs;
				if(CU.isFunction(cb))cb(rs);
			}});
		},
		
		getLoginUser : function(cb) {
			if(CU.isObject(window.SU)) {
				if(CU.isFunction(cb)) cb(window.SU);
			}else {
				PU.loadLoginUser(cb);
			}
		},
		
		/**
		 * @param config, 同ajax, url缺省为/tannux/common/tool/getDynamicDictBatch
		 * 			ps需多指定参数names, 表示动态字典名称
		 */
		loadDynamicDicts : function(config) {
			var callback = config.cb;
			if(!CU.isEmpty(config.callback)) callback = config.callback;
			var cfg = $.extend({}, config);
			if(CU.isEmpty(cfg.url)) cfg.url = "/tannux/common/tool/getDynamicDictBatch";
			cfg.callback = null;
			cfg.cb = function(rs) {
				if(!CU.isEmpty(rs)) {
					if(CU.isEmpty(window.DROP)) window.DROP = {};
					$.extend(DROP, rs);
				}
				PU.buildSelectFields();
				if(CU.isFunction(callback)) callback(rs);
			}
			RS.ajax(cfg);
		},
		
		
		/**
		 * 创建树选择窗口
		 * 		addroot : 入口
		 * 		url : 请求地址
		 * 		name : 窗口命名, 不同的命名会创建不同的实例，相同的命名使用同一个窗口，再次弹窗不用重新加载数据
		 * 				面对相同的数据源, 但参数或单选多选不同, 不用纠结, 果断起不同的name
		 * 		single : 是否单选
		 * 		appendAttrs : 是否添加属性
		 * 		getParams : 获取params, 缺省为PU.defaultTreeSelectGetParams, 初始化才调用
		 * 		beforeParams : getParams设置了不起作用, 系统缺省getParams会调用此函数, beforeParams(node, ps, tree), 返回false则中断操作
		 * 		ps : 参数, 每次查询都会调用
		 * 		cdt : 参数, 每次查询都会调用, 实际传向后台的参数格式是:ps:{cdt:{}}, 把cdt单独提出来是访问调用方的写法, 因为ps中的其他参数很少用到, 只定义cdt是比较常用, 如果直接定义ps并在ps中也定义了cdt, 则cdt也没有必要定义, 如果也定义了则取并集
		 * 		title : 标题
		 * 		width : 宽度, 缺省为500
		 * 		height: 高度, 缺省为400
		 * 		cascadeParent : 多选时, 子节点未全选中时, 是否联带父级节点一并返回
		 * 		reload : true|false, 窗口被再次打开时, 是否需要重新加载数据, 缺省为false
		 * 		before : 点击确定之前事件, before(array, nodes, tree), 返回false则中断操作
		 * 		cb : 点击确定之后事件, callback(array, nodes, tree);
		 */
		showTreeSelectWin : function(cfg) {
			if(CU.isEmpty(cfg) || CU.isEmpty(cfg.name)) {
				CC.showTip({type:"error", msg:"参数无效."});
				return ;
			}
			var name = CU.trim(cfg.name + "");
			var twmap = PU.SELECT_TREE_WIN_MAP;
			if(CU.isEmpty(twmap)) PU.SELECT_TREE_WIN_MAP = twmap = {};
			
			var win = twmap[name];
			if(CU.isEmpty(win)) {
				cfg = $.extend({title:"", width:500, height:400}, cfg);
				var html = ['<div class="modal fade" role="dialog" aria-hidden="true">',
							'   <div class="modal-dialog" style="width:',cfg.width,'px;">',
							'      <div class="modal-content">',
							'         <div class="modal-header">',
							'            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
							'            <h4 class="modal-title">',cfg.title,'</h4>',
							'         </div>',
							'         <div class="modal-body" style="min-height:',cfg.height,'px;max-height:600px;overflow:auto;">',
							'         </div>',
							'         <div class="modal-footer" style="text-align:center;">',
							'				<button class="btn btn-success btn-select-submit" win="',name,'"> <i class="fa fa-check"></i>确定</button>',
							'				<button class="btn btn-default btn-select-cancel" win="',name,'"> 取消</button>',
							'         </div>',
							'      </div>',
							'	</div>',
							'</div>'];
				win = $(html.join(""));
				$("body").append(win);
				twmap[name] = win;
	
				var el_tree = win.find(".modal-body");
				var btn_submit = win.find(".btn-select-submit");
				var btn_cancel = win.find(".btn-select-cancel");
				var getParams = cfg.getParams;
				if(CU.isEmpty(getParams)) getParams = PU.defaultTreeSelectGetParams;
	
				var tree = PU.getTree({
					bid : el_tree,
					addroot : cfg.addroot,
					url : cfg.url,
					appendAttrs : cfg.appendAttrs,
					singleSelect:cfg.single,
					loading : btn_submit,
					getParams : getParams,
					render : cfg.render,
					
					ps : cfg.ps,
					cdt : cfg.cdt,
					beforeParams:cfg.beforeParams,
					loaded:cfg.loaded
				});
				win[0].tree = tree;
	
				btn_submit.bind("click", function() {
					var n = $(this).attr("win");
					var el_win = PU.SELECT_TREE_WIN_MAP[n];
					if(!CU.isEmpty(el_win)) {
						var tree = el_win[0].tree;
						var sing = tree.isSingleSelect();
						
						var nodes = null;
						if(!sing && CU.isTrue(el_win[0].cascadeParent)) {
							nodes = tree.getCheckedNodes(true)
						}else {
							nodes = tree.getSelectedNodes();
						}
						
						if(CU.isEmpty(nodes) || nodes.length<=0) {
							CC.showTip({type:"error", msg:"请选择树上节点."});
							return ;
						}
						
	
						var array = [];
						for(var i=0; i<nodes.length; i++) {
							var n = nodes[i];
							array.push({code:n.id, name:n.text, data:n.data});
							if(sing) break;
						}
	
						if(CU.isFunction(el_win[0].beforeFun)) {
							var ba = el_win[0].beforeFun(array, nodes, tree);
							if(ba===false || ba=="false") return ;
						}
						el_win.modal("hide");
						if(CU.isFunction(el_win[0].callback)) {
							el_win[0].callback(array, nodes, tree);
						}
					}
				});
				btn_cancel.bind("click", function() {
					var n = $(this).attr("win");
					var el_win = PU.SELECT_TREE_WIN_MAP[n];
					if(!CU.isEmpty(el_win)) el_win.modal("hide");
				});
			}
			
			if(!CU.isEmpty(cfg.title)) win.find(".modal-title").html(cfg.title);
			if(!CU.isEmpty(cfg.width)) win.find("modal-dialog").css("width", cfg.width+"px");
			if(!CU.isEmpty(cfg.height)) win.find("modal-body").css("min-height", cfg.height+"px");
			
			var el_win = win[0];
			el_win.render = cfg.render;
			el_win.beforeFun = cfg.before;
			el_win.callback = cfg.cb;
			el_win.cascadeParent = cfg.cascadeParent;
			el_win.tree.ps = cfg.ps;
			el_win.tree.cdt = cfg.cdt;
			el_win.tree.beforeParams = cfg.beforeParams;
			win.modal("show");
	
			if(cfg.reload===true || cfg.reload=="true") {
				el_win.tree.search();
			}
			return win;
		},
		
		
		
		/**
		 * 创建树选择窗口
		 * 		addroot : 入口
		 * 		url : 请求地址
		 * 		name : 窗口命名, 不同的命名会创建不同的实例，相同的命名使用同一个窗口，再次弹窗不用重新加载数据
		 * 				面对相同的数据源, 但参数或单选多选不同, 不用纠结, 果断起不同的name
		 * 		single : 是否单选
		 * 		columns : grid.columns
		 * 		dataIdField : grid.dataIdField
		 * 		dataCode : 指定返回值code对应的column中的列名, 可以是函数dataCode(row, grid)
		 * 		dataName : 指定返回值name对应的column中的列名, 可以是函数dataName(row, grid)
		 * 		getParams : 获取params, 缺省为PU.defaultGridSelectGetParams, 初始化才调用
		 * 		beforeParams : getParams设置了不起作用, 系统缺省getParams会调用此函数, beforeParams(ps, grid), 返回false则中断操作
		 * 		ps : 参数, 每次查询都会调用
		 * 		cdt : 参数, 每次查询都会调用, 实际传向后台的参数格式是:ps:{cdt:{}}, 把cdt单独提出来是访问调用方的写法, 因为ps中的其他参数很少用到, 只定义cdt是比较常用, 如果直接定义ps并在ps中也定义了cdt, 则cdt也没有必要定义, 如果也定义了则取并集
		 * 		title : 标题
		 * 		width : 宽度, 缺省为500
		 * 		height: 高度, 缺省为400
		 * 		reload : true|false, 窗口被再次打开时, 是否需要重新加载数据, 缺省为false
		 * 		before : 点击确定之前事件, before(array, grid), 返回false则中断操作
		 * 		cb : 点击确定之后事件, callback(array, grid);
		 */
		showGridSelectWin : function(cfg) {
			if(CU.isEmpty(cfg) || CU.isEmpty(cfg.name) || CU.isEmpty(cfg.columns) || CU.isEmpty(cfg.dataCode) || CU.isEmpty(cfg.dataName)) {
				CC.showTip({type:"error", msg:"参数无效."});
				return ;
			}
			var name = CU.trim(cfg.name + "");
			var gwmap = PU.SELECT_GRID_WIN_MAP;
			if(CU.isEmpty(gwmap)) PU.SELECT_GRID_WIN_MAP = gwmap = {};
			
			var win = gwmap[name];
			if(CU.isEmpty(win)) {
				cfg = $.extend({title:"", width:900, height:600}, cfg);
				var html = ['<div class="modal fade" role="dialog" aria-hidden="true">',
							'   <div class="modal-dialog" style="width:',cfg.width,'px;">',
							'      <div class="modal-content">',
							'         <div class="modal-header">',
							'            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
							'            <h4 class="modal-title">',cfg.title,'</h4>',
							'         </div>',
							'         <div class="modal-body" style="min-height:',cfg.height,'px;">',
							'         </div>',
							'      </div>',
							'	</div>',
							'</div>'];
				win = $(html.join(""));
				$("body").append(win);
				gwmap[name] = win;
	
				var el_tab = win.find(".modal-body");
				setTimeout(function() {
					var getParams = cfg.getParams;
					if(CU.isEmpty(getParams)) getParams = PU.defaultGridSelectGetParams;
				
					var grid = PU.getDataTable({
							bid : el_tab,
							addroot:cfg.addroot,
							url: cfg.url,
							showCheckbox: true,
							keepCheckbox: true,
							singleSelect: cfg.single,
							dataIdField : cfg.dataIdField,
							autoScrollX:cfg.autoScrollX,
							opbtns : ['<button class="btn btn-success btn-select-submit" win="'+name+'" selectPropertyName="'+cfg.selectPropertyName+'"> <i class="fa fa-check"></i>确定选择</button>'],
							columns:cfg.columns,
							getParams : getParams,
							
							dataCode:cfg.dataCode,
							dataName:cfg.dataName,
							ps : cfg.ps,
							cdt : cfg.cdt,
							beforeParams:cfg.beforeParams
					});
	
					grid.el_base.find(".btn-select-submit").bind("click", function() {
	//					debugger
						var el = $(this);
						var n = el.attr("win");
						var el_win = PU.SELECT_GRID_WIN_MAP[n];
						if(!CU.isEmpty(el_win)) {
							var g = el_win[0].grid;
							var rs = g.getSelectRecords();
							if(CU.isEmpty(rs)) {
								CC.showTip({type:"error",msg:"请在列表中选择记录."});
								return ;
							}
							
							var array = [];
							var dc = g.dataCode;
							var dn = g.dataName;
							var dcfun = null;
							var dnfun = null;
							if(CU.isFunction(dc)) dcfun = dc;
							if(CU.isFunction(dn)) dnfun = dn;
							for(var i=0; i<rs.length; i++) {
								var row = rs[i];
								var code = null;
								var name = null;
								if(dcfun != null) {
									code = dcfun(row, g);
								}else {
									code = CU.getObjectValue(row, dc);
								}
								if(dnfun != null) {
									name = dnfun(row, g);
								}else {
									name = CU.getObjectValue(row, dn);
								}
								array.push({code:code, name:name, data:row});
							}
							
							if(CU.isFunction(el_win[0].beforeFun)) {
								var ba = el_win[0].beforeFun(array, g);
								if(ba===false || ba=="false") return ;
							}
							el_win.modal("hide");
							if(CU.isFunction(el_win[0].callback)) {
								el_win[0].callback(array, g);
							}
						}
					});
					win[0].grid = grid;
				}, 500);
			}
			
			if(!CU.isEmpty(cfg.title)) win.find(".modal-title").html(cfg.title);
			if(!CU.isEmpty(cfg.width)) win.find("modal-dialog").css("width", cfg.width+"px");
			if(!CU.isEmpty(cfg.height)) win.find("modal-body").css("min-height", cfg.height+"px");
			
			var el_win = win[0];
			el_win.render = cfg.render;
			el_win.beforeFun = cfg.before;
			el_win.callback = cfg.cb;
			if(!CU.isEmpty(el_win.grid)) {
				el_win.grid.ps = cfg.ps;
				el_win.grid.cdt = cfg.cdt;
				el_win.grid.beforeParams = cfg.beforeParams;
			}
			win.modal("show");
	
			if(cfg.reload!==false && cfg.reload!="false") {
				if(!CU.isEmpty(el_win.grid)) el_win.grid.search();
			}
			return win;
		},
		
		
		defaultTreeSelectGetParams : function(node, ps, tree) {
			var parentId = node.id;
	    	if(CU.isEmpty(parentId) || parentId=='#') parentId = 0;
	    	if(CU.isEmpty(ps.cdt)) ps.cdt = {};
	    	ps.cdt.parentId = parentId;
	    	
	    	var cfgps = tree.ps;
	    	var cfgcdt = tree.cdt;
	    	var beforeParams = tree.beforeParams;
	    	if(CU.isObject(cfgps)) $.extend(ps, cfgps);
	    	if(CU.isObject(cfgcdt)) {
	    		if(CU.isEmpty(ps.cdt)) ps.cdt = {};
	    		$.extend(ps.cdt, cfgcdt);
	    	}
	    	
	    	if(CU.isFunction(beforeParams)) {
	    		var ba = beforeParams(node, ps, tree);
	    		if(ba===false || ba=="false") return false;
	    	}
	    	return ps;
		},
		
		defaultGridSelectGetParams : function(pageNum, pageSize, cdt, orders, qs, grid) {
			var ps = {pageNum:pageNum, pageSize:pageSize, orders:orders, qs:qs};
			var cfgps = grid.ps;
	    	var cfgcdt = grid.cdt;
	    	var beforeParams = grid.beforeParams;
	    	if(CU.isObject(cfgps)) $.extend(ps, cfgps);
	    	
	    	ps.cdt = {};
	    	if(CU.isObject(cfgcdt)) $.extend(ps.cdt, cfgcdt);
	    	if(CU.isObject(cdt)) $.extend(ps.cdt, cdt);
	    	
	    	if(CU.isFunction(beforeParams)) {
	    		var ba = beforeParams(ps, grid);
	    		if(ba===false || ba=="false") return false;
	    	}
	    	return ps;
		},
		
		setOpenSelectFieldValue : function(el_input, arr) {
			if(CU.isEmpty(el_input)) return ;
			el_input = CU.clearlyElement(el_input);
			var codes = [];
			var names = [];
			if(!CU.isEmpty(arr)) {
				if(!CU.isArray(arr)) arr = [arr];
				
				for(var i=0; i<arr.length; i++) {
					var code = arr[i].code;
					var name = arr[i].name;
					if(CU.isEmpty(code)) continue;
					codes.push(code);
					names.push(name);
				}
			}
			el_input.attr("select-value", codes.join(","));
			el_input.val(names.join("，"));
		},
		
		onOpenSelectFieldClick : function(e) {
			var el_btn = $(this);
			var el_input = $(el_btn.parent().prev());
			
			var custom = el_input.attr("select-custom");
			if(!CU.isEmpty(custom)) {
				custom = CU.getObjectValue(window, custom);
				if(CU.isFunction(custom)) custom({bindField:el_input});
				return ;
			}
			
			var type = el_input.attr("select-type");		//tree|grid
			var name = el_input.attr("select-name");
			if(CU.isEmpty(name)) {
				throw new "select-name is not set.";
			}
			var addroot = el_input.attr("select-addroot");
			if(!CU.isEmpty(addroot) && !(addroot=CU.trim(addroot)).startsWith("/") && !addroot.startsWith("http://") && !addroot.startsWith("https://")) {
				addroot = window[addroot];
			}
			var url = el_input.attr("select-url");
			var single = el_input.attr("select-single");
			var getParams = el_input.attr("select-getParams");
			var beforeParams = el_input.attr("select-beforeParams");
			var ps = el_input.attr("select-ps");
			var cdt = el_input.attr("select-cdt");
			var title = el_input.attr("select-title");
			var width = el_input.attr("select-width");
			var height = el_input.attr("select-height");
			var before = el_input.attr("select-before");
			var callback = el_input.attr("select-cb");
			if(!CU.isEmpty(callback) && typeof(callback)=="string") callback = window[callback];
			
			//树独有参数
			var appendAttrs = el_input.attr("select-appendAttrs");
			
			//表独有参数
			var columns = el_input.attr("select-columns");
			var dataIdField = el_input.attr("select-dataIdField");
			var dataCode = el_input.attr("select-dataCode");
			var dataName = el_input.attr("select-dataName");
			
			//约定规则, 如果dataCode、dataName是函数, 函数名需以下划线开头
			if(!CU.isEmpty(dataCode) && dataCode.startsWith('_') && CU.isFunction(window[dataCode])) dataCode = window[dataCode];
			if(!CU.isEmpty(dataName) && dataName.startsWith('_') && CU.isFunction(window[dataName])) dataName = window[dataName];
			
			if(!CU.isEmpty(single)) single = single=="true" || single===true || single=="1" || single==1;
			if(!CU.isEmpty(appendAttrs)) appendAttrs = appendAttrs=="true" || appendAttrs===true || appendAttrs=="1" || appendAttrs==1;
			getParams = !CU.isEmpty(getParams) && (getParams=CU.trim(getParams+"")).length>0 && CU.isFunction(window[getParams]) ? window[getParams] : null;
			beforeParams = !CU.isEmpty(beforeParams) && (beforeParams=CU.trim(beforeParams+"")).length>0 && CU.isFunction(window[beforeParams]) ? window[beforeParams] : null;
			before = !CU.isEmpty(before) && (before=CU.trim(before+"")).length>0 && CU.isFunction(window[before]) ? window[before] : null;
			
			if(!CU.isEmpty(columns)) columns = window[columns];
			if(!CU.isEmpty(dataIdField)) dataIdField = window[dataIdField];
			if(CU.isFunction(columns)) columns = columns(el_input);
			
			if(!CU.isEmpty(ps) && (ps=CU.trim(ps+"")).length>0 && ps.substring(0,1)=='{' && ps.substring(ps.length-1)=='}') {
				try {
					ps = CU.toObject(ps);
				}catch(e) {
					console.error(e);
					ps = null;
				}
			}else {
				ps = null;
			}
			if(!CU.isEmpty(cdt) && (cdt=CU.trim(cdt+"")).length>0 && cdt.substring(0,1)=='{' && cdt.substring(cdt.length-1)=='}') {
				try {
					cdt = CU.toObject(cdt);
				}catch(e) {
					console.error(e);
					cdt = null;
				}
			}else {
				cdt = null;
			}
			
			if(CU.isEmpty(type)) {
				CC.showTip({type:"error", msg:"没有指定选择组件类型."});
				return ;
			}
			
			if(type == "tree") {
				PU.showTreeSelectWin({addroot:addroot, url:url, name:name, single:single, appendAttrs:appendAttrs, getParams:getParams, beforeParams:beforeParams, ps:ps, cdt:cdt, title:title, width:width, height:height, before:before, cb:function(array, nodes, tree) {
					PU.setOpenSelectFieldValue(el_input, array);
					if(CU.isFunction(callback)) callback(array, nodes, tree, el_input);
				}});
			}else if(type == "grid") {
				PU.showGridSelectWin({addroot:addroot, url:url, name:name, single:single, columns:columns, dataIdField:dataIdField, dataCode:dataCode, dataName:dataName, getParams:getParams, beforeParams:beforeParams, ps:ps, cdt:cdt, title:title, width:width, height:height, before:before, cb:function(array, grid) {
					PU.setOpenSelectFieldValue(el_input, array);
					if(CU.isFunction(callback)) callback(array, grid, el_input);
				}});
			}else {
				throw "is wrong select-type:'"+type+"'.";
			}
		},
		onOpenSelectFieldInputDblClick : function(e) {
			var el_input = $(this);
			var dis = el_input.attr("select-disabled");
			if(dis===true || dis=="true") return ;
			PU.setOpenSelectFieldValue(el_input);
		},
		
		renderOpenSelectFields : function(el_parent) {
			var el_fs = null;
			if(CU.isEmpty(el_parent)) {
				el_fs = $(".tannux-open-select-field");
			}else {
				el_parent = CU.clearlyElement(el_parent);
				el_fs = el_parent.find(".tannux-open-select-field");
			}
			if(!CU.isEmpty(el_fs) && el_fs.length>0) {
				for(var i=0; i<el_fs.length; i++) {
					var el = $(el_fs[i]);
					var el_p = el.parent();
					var el_new = $('<div class="input-group"></div>');
					el_new.append(el);
					el_new.append('<span class="input-group-btn"><button class="btn btn-primary" type="button"><i class="fa fa-search"></i></button></span>');
					el_p.append(el_new);
		
					el.prop("readOnly", true);
					el_new.find("button").bind("click", PU.onOpenSelectFieldClick);
					el.bind("dblclick", PU.onOpenSelectFieldInputDblClick);
				}
			}
		},
		
		
		externalGetFormData : function(data, formId, tags, ignoreNull, prefix) {
			var form = CU.clearlyElement(formId);
			var els = form.find(".tannux-open-select-field");
			if(!CU.isEmpty(els) && els.length>0) {
				for(var i=0; i<els.length; i++) {
					var el = $(els[i]);
					var n = el.attr("name");
					var v = el.attr("select-value");
	
					var n = PU.filterPrefix(n, prefix);
					if(CU.isEmpty(n)) continue ;
					if(v===null || v===undefined) {
						if(!ignoreNull)	continue ;
						v = null;
					}
					data[n] = v;
				}
			}
		},
	
		externalSetFormData : function(data, formId, tags, ignoreNull, prefix) {
			var form = CU.clearlyElement(formId);
			var els = form.find(".tannux-open-select-field");
			if(!CU.isEmpty(els) && els.length>0) {
				for(var i=0; i<els.length; i++) {
					var el = $(els[i]);
					var n = el.attr("name");
					if(CU.isEmpty(n)) continue ;
					var dn = PU.filterPrefix(n, prefix);
					if(CU.isEmpty(dn)) continue;
					var v = data[dn];
					if(v===null || v===undefined) {
						if(ignoreNull)	continue ;
						v = "";
					}
					var array = [];
					if(CU.isArray(v)) {
						for(var k=0; k<v.length; k++) {
							array.push({code:v[k], name:""});
						}
					}else {
						array.push({code:v, name:""});
					}
					PU.setOpenSelectFieldValue(el, array);
				}
			}
		},
	
		externalClearFormData : function(formId, tags, prefix) {
			var form = CU.clearlyElement(formId);
			var els = form.find(".tannux-open-select-field");
			if(!CU.isEmpty(els) && els.length>0) {
				for(var i=0; i<els.length; i++) {
					var el = $(els[i]);
					PU.setOpenSelectFieldValue(el);
				}
			}
		},
	
		externalSetFormDisabled : function(formId, disabled, tags) {
			var form = CU.clearlyElement(formId);
			var els = form.find(".tannux-open-select-field");
			if(!CU.isEmpty(els) && els.length>0) {
				for(var i=0; i<els.length; i++) {
					var el = $(els[i]);
					el.prop("readOnly", true);
					el.attr("select-disabled", disabled);
					var el_btn = $(el.next().children()[0]);
					el_btn.prop("disabled", disabled===true || disabled=="true");
				}
			}
		},
		
		
		menuTreeInterceptor : function(nodes, flag) {
			return nodes;
		},
		
		getMenuTree : function(cb, flag) {
			var token = PU.getToken();
			if(CU.isEmpty(token)) {
				var nodes = PU.menuTreeInterceptor([], flag);
				if(CU.isFunction(cb)) cb(nodes);
				return ;
			}
			
			PU.getLoginUser(function() {
				var key = "TANNUX_AUTHORITY_MENU_TREE"+window.ContextPath;
				var treeList = null;
				
				//先从本地取
				var s = window.localStorage.getItem(key);
				var ct = new Date().getTime();
				if(!CU.isEmpty(s)) {
					try {
						var obj = CU.toObject(s);
						var time = parseInt(obj.time, 10);
						
						//两小时超时更新服务端菜单
						if(ct-time<2*3600000 && (obj.userId+"")==(window.SU.id+"")) {
							treeList = obj.data;
						}
					}catch(e) {
						console.error(" Parse local menu-tree object error : " + e);
					}
				}
				if(treeList != null) {
					var nodes = PU.menuTreeInterceptor(treeList, flag);
					if(CU.isFunction(cb)) cb(nodes);
				}else {
					PU.loadMenuTreeData(function(rs) {
						//与入本地缓存
						var obj = {userId:window.SU.id, time:ct, data:rs};
						window.localStorage.setItem(key, CU.toString(obj));
						var nodes = PU.menuTreeInterceptor(rs, flag);
						if(CU.isFunction(cb)) cb(nodes);
					});
				}
			});
		},
		
		
		removeMenuTreeData : function() {
			window.localStorage.removeItem("TANNUX_AUTHORITY_MENU_TREE");
			if(!CU.isEmpty(window.ContextPath)) {
				window.localStorage.removeItem("TANNUX_AUTHORITY_MENU_TREE"+window.ContextPath);
			}
		},
		
		getHomeMenuUrl : function() {
			var homeCode = window.HOME_MENU_CODE;
			if(!CU.isEmpty(homeCode)) {
				return ContextPath + "/api/simple/sysframe/dispatch/mc/" + homeCode;
			}
		},
		getMenuTreeUrl : function(menu) {
			return ContextPath + "/api/simple/sysframe/dispatch/mi/" + menu.id;
		},
		getBreadLineUrl : function(menu) {
			return ContextPath + "/api/simple/sysframe/dispatch/mi/" + menu.id;
		},
		getCurrentMenuLevelPath : function() {
			var currMenuPath = "";
			if(!CU.isEmpty(window.MENU)) {
				currMenuPath = window.MENU.menuLvlPath;
				if(CU.isEmpty(currMenuPath)) currMenuPath = "";
			}
			return currMenuPath;
		},
		
		//返回 map : key=menuId(String), value=node
		getMenuNodesByIds : function(ids, nodes) {
			if(CU.isEmpty(ids)) return ;
			if(typeof(ids)=="string") {
				ids = ids.split(',');
			}
			var map = {};
			for(var i=0; i<ids.length; i++) {
				var id = CU.trim(ids[i] + "");
				if(id.length == 0) continue ;
				var node = PU.findMenuNodeById(nodes, id);
				if(!CU.isEmpty(node)) {
					map[id] = node;
				}
			}
			return map;
		},
		
		findMenuNodeById : function(nodes, id) {
			if(CU.isEmpty(nodes)) return ;
			for(var i=0; i<nodes.length; i++) {
				var n = nodes[i];
				if(n.id == id) {
					return n;
				}
				
				var cs = n.children;
				if(!CU.isEmpty(cs)) {
					var c = PU.findMenuNodeById(cs, id);
					if(!CU.isEmpty(c)) return c;
				}
			}
		},
		
		buildLayoutMenuHtml : function(html, nodes, activeMenuPath, level) {
			if(CU.isEmpty(nodes)) return ;
			var iconstyle = "margin: -6px 6px 0px -2px;";
			for(var i=0; i<nodes.length; i++) {
				var node = nodes[i];
				var menu = node.data;
				var childs = node.children;
				var dir = CU.isTrue(menu.isDir);
				var hide = CU.isFalse(menu.isDisp);
				if(hide) continue;
				
				var active = activeMenuPath.indexOf("#"+node.id+"#") >= 0;
				html.push('<li class="panel">');
				
				if(dir) {
					if(CU.isEmpty(childs)) {
						continue ;
					}
					
					var aname = "menu_parent_"+menu.id;
					html.push('<a menuCode="',menu.menuCode,'" href="#',aname,'" data-toggle="collapse" ',(level==1?'data-parent="#sidebar-nav-menu"':''),' class="menu-dir ',(active?"active":"collapsed"),'">',
							  CU.getIconHtml(menu.menuImg, iconstyle,true),' <span class="title">',menu.menuName,'</span> <i class="icon-submenu ti-angle-left"></i></a>',
							  '<div id="',aname,'" class="collapse ',(active?'in':''),'"><ul class="submenu">');
					if(!CU.isEmpty(childs)) {
						PU.buildLayoutMenuHtml(html, childs, activeMenuPath, level+1);
					}
					html.push('</ul></div>');
				}else {
					var url = PU.getMenuTreeUrl(menu);
					html.push('<li><a menuCode="',menu.menuCode,'" href="',url,'" class="menu-leaf',(active?' active active-leaf':''),'" ',(level>3?' style="margin-left:10px;" ':''),'>',
							  CU.getIconHtml(menu.menuImg, iconstyle,true),' <span class="title">',menu.menuName,'</span>',
							  '</a></li>');
				}
				html.push('</li>');
			}
		},
		
		buildTopLayoutMenuHtml : function(html, nodes, activeMenuPath, level) {
			if(CU.isEmpty(nodes)) return ;
			var iconstyle = "margin: -6px 6px 0px -2px;";
			for(var i=0; i<nodes.length; i++) {
				var node = nodes[i];
				var menu = node.data;
				var childs = node.children;
				var dir = menu.isDir == 1;
				var hide = CU.isFalse(menu.isDisp);
				if(hide) continue;
				var active = activeMenuPath.indexOf("#"+node.id+"#") >= 0;
				
				if(dir) {
					if(CU.isEmpty(childs)) {
						continue ;
					}
					
					html.push('<li class="dropdown">',
								'<a menuCode="',menu.menuCode,'" href="###" class="',(active?'active':'collapsed'),'" data-toggle="dropdown">',
								CU.getIconHtml(menu.menuImg, iconstyle,true),' <span>',menu.menuName,'</span> <i class="ti-angle-down icon-submenu"></i></a>',
								'<ul class="dropdown-menu">');
					if(!CU.isEmpty(childs)) {
						PU.buildTopLayoutMenuHtml(html, childs, activeMenuPath, level+1);
					}
					html.push('</ul></li>');
				}else {
					var url = PU.getMenuTreeUrl(menu);
					html.push('<li><a menuCode="',menu.menuCode,'" href="',url,'" class="menu-leaf',(active?' active active-leaf':''),'">',
								CU.getIconHtml(menu.menuImg, iconstyle,true),' <span>',menu.menuName,'</span>',
								'</a></li>');
				}
			}
		},
		
		buildLayoutMenuTree : function(cb) {
			PU.getMenuTree(function(nodes) {
				var html = [];
				if(!CU.isEmpty(nodes)) {
					var currMenuPath = PU.getCurrentMenuLevelPath();
					PU.buildLayoutMenuHtml(html, nodes, currMenuPath, 1);
				}
				$("#sidebar-nav-menu").append(html.join(""));
				if(CU.isFunction(cb))cb();
			}, 'menu');
		},
		buildTopLayoutMenuTree : function(cb) {
			PU.getMenuTree(function(nodes) {
				var html = [];
				if(!CU.isEmpty(nodes)) {
					var currMenuPath = PU.getCurrentMenuLevelPath();
					PU.buildTopLayoutMenuHtml(html, nodes, currMenuPath, 1);
				}
				$("#navbar-menu-container-left").append(html.join(""));
				if(CU.isFunction(cb))cb();
			}, "menu");
		},
		
		buildLayoutBreadLine : function(cb) {
			var currm = window.MENU;
			if(CU.isEmpty(currm)) return ;
			
			PU.getMenuTree(function(nodes) {
				var html = [];
				
				var homeUrl = PU.getHomeMenuUrl();
				html.push('<div class="heading-left"><span class="menu-symbol">&nbsp;</span><span class="page-title">',currm.menuName,'</span></div>');
				
				//主页不需要面包线
				if(window.HOME_MENU_CODE != currm.menuCode) {
					html.push('<ul class="breadcrumb">');
					if(!CU.isEmpty(homeUrl)) {
						html.push('<li><a menuCode="',window.HOME_MENU_CODE,'" href="',homeUrl,'"><i class="fa fa-home"></i>  主页</a></li>');
					}
					
					if(!CU.isEmpty(nodes)) {
						var currMenuPath = PU.getCurrentMenuLevelPath();
						if(!CU.isEmpty(currMenuPath)) {
							var ids = currMenuPath.split('#');
							var menus = PU.getMenuNodesByIds(ids, nodes);
							if(Object.keys(menus).length > 0) {
								var currmid = window.MENU.id + "";
								for(var i=0; i<ids.length; i++) {
									var id = CU.trim(ids[i]+"");
									if(id.length == 0) continue ;
									var node = menus[id];
									if(CU.isEmpty(node)) continue ;
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
							}
						}
					}
					html.push('</ul>');
				}
				$("#div-base-main-content-breadlink").html(html.join(""));
				if(CU.isFunction(cb))cb();
			}, "breadLine");
		},
		
		
		getBodyScrollTop : function() {
			var scroll = $("body").scrollTop();
			if(scroll == 0) scroll = Math.round(document.documentElement.scrollTop);
			return scroll;
		},
		
		getElementScrollTop : function(el) {
			return CU.clearlyElement(el).scrollTop();
		},
		
		
		/**
		 * 绑定页面手抛事件
		 * bind: 指定的element, 缺省为window.document
		 * up: 上滑事件
		 * down: 下滑事件
		 * left: 左滑事件
		 * right: 右滑事件
		 * top : 顶部刷新事件
		 * bottom : 底部刷新事件
		 * 
		 * mvup: 上滑事件
		 * mvdown: 下滑事件
		 * mvleft: 左滑事件
		 * mvright: 右滑事件
		 * 
		 * sensitiveValue : top、bottom、left、right滑动敏感值, 缺省为100
		 */
		bindPageTouch : function(cfg) {
			if(CU.isEmpty(cfg)) cfg = {};
			var touchevt = cfg;
			var sensitiveValue = cfg.sensitiveValue;
			if(CU.isEmpty(sensitiveValue)) sensitiveValue = 100;
			sensitiveValue = parseInt(sensitiveValue, 10);
			
			var doc = null;
			if(CU.isEmpty(cfg.bind)) {
				doc = $(window.document);
			}else {
				doc = CU.clearlyElement(cfg.bind);
			}
			doc.bind('touchstart', function(e) {
				var evt = e.originalEvent || e;
				if(!CU.isEmpty(evt.touches) && evt.touches.length>0) {
					var x = evt.touches[0].pageX + "";
					var y = evt.touches[0].pageY + "";
					if(CU.isNumber(x)) touchevt.startX = parseInt(x, 10);
					if(CU.isNumber(y)) touchevt.startY = parseInt(y, 10);
					touchevt.scroll = PU.getBodyScrollTop();
				}
			});
			doc.bind('touchmove', function(e) {
				var evt = e.originalEvent || e;
		    	if(!CU.isEmpty(evt.changedTouches) && evt.changedTouches.length>0) {
		    		var x = evt.changedTouches[0].pageX + "";
					var y = evt.changedTouches[0].pageY + "";
					var point = null;
					if(CU.isNumber(x) && !CU.isEmpty(touchevt.startX)) {
						var x2 = parseInt(x, 10);
						point = {x1:touchevt.startX, x2:x2};
						if(x2 < touchevt.startX) {	//向左
							if(CU.isFunction(touchevt.mvleft)) touchevt.mvleft(evt, touchevt, point);
						}else if(x2 > touchevt.startX) {	//向右
							if(CU.isFunction(touchevt.mvright)) touchevt.mvright(evt, touchevt, point);
						}
					}
					if(CU.isNumber(y) && !CU.isEmpty(touchevt.startY)) {
						var y2 = parseInt(y, 10);
						point = {y1:touchevt.startY, y2:y2};
						var scroll = PU.getBodyScrollTop();
						var maxHeight = $(document).height();
						var winHeight = $(window).height();
						
						if(y2 > touchevt.startY) {
							if(CU.isFunction(touchevt.mvdown)) touchevt.mvdown(evt, touchevt, point);
						 }else if(y2 < touchevt.startY) {
							 if(CU.isFunction(touchevt.mvup)) touchevt.mvup(evt, touchevt, point);
						 }
					}
				}
		    });
			doc.bind('touchend', function(e) {
				var evt = e.originalEvent || e;
		    	if(!CU.isEmpty(evt.changedTouches) && evt.changedTouches.length>0) {
		    		var x = evt.changedTouches[0].pageX + "";
					var y = evt.changedTouches[0].pageY + "";
					var point = null;
					if(CU.isNumber(x) && !CU.isEmpty(touchevt.startX)) {
						var x2 = parseInt(x, 10);
						point = {x1:touchevt.startX, x2:x2};
						if(x2 < touchevt.startX) {	//向左
							if(CU.isFunction(touchevt.left) && (touchevt.startX-x2)>=sensitiveValue) touchevt.left(evt, touchevt, point);
						}else if(x2 > touchevt.startX) {	//向右
							if(CU.isFunction(touchevt.right) && (x2-touchevt.startX)>=sensitiveValue) touchevt.right(evt, touchevt, point);
						}
					}
					if(CU.isNumber(y) && !CU.isEmpty(touchevt.startY)) {
						var y2 = parseInt(y, 10);
						point = {y1:touchevt.startY, y2:y2};
						var scroll = PU.getBodyScrollTop();
						var maxHeight = $(document).height();
						var winHeight = $(window).height();
						
						if(y2 > touchevt.startY) {
							if(CU.isFunction(touchevt.down)) touchevt.down(evt, touchevt, point);
							if(scroll<0 || (scroll==0 && touchevt.scroll==0)) {
								if(CU.isFunction(touchevt.top) && Math.abs(y2-touchevt.startY)>sensitiveValue) touchevt.top(evt, touchevt, point);
							}
						 }else if(y2 < touchevt.startY) {
							 if(CU.isFunction(touchevt.up)) touchevt.up(evt, touchevt, point);
							 
							 var realHeight = scroll + winHeight;
							 if(maxHeight<realHeight || (maxHeight==realHeight && touchevt.scroll==scroll)) {
								 if(CU.isFunction(touchevt.bottom) && Math.abs(y2-touchevt.startY)>sensitiveValue) touchevt.bottom(evt, touchevt, point);
							 }
						 }
					}
				}
		    });
		},
		
		initPage : function() {
			//国际化转换
			CU.translatePageLang();
			
			//处理数值框组件
			CU.onlyInteger($(".tannux-input-number"));
			
			//处理分类数值框组件
			CU.format3BitNumberField($(".form-number-3bit"));
			
			//处理下拉列表
			PU.buildSelectFields();
			
			//处理分类上传组件
			PU.bindClassifyUploadClick();
			
			if($.fn.datetimepicker) {
				$(".item-form-datetimepicker").datetimepicker($.fn.datetimepicker.defaults);
				$(".item-form-datetimepicker-addon").bind("click", function(){$($($(this).parent()[0]).children()[0]).focus();});
			}
			
			//外部扩展
			if(CU.isFunction(PU.externalInitPage)) {
				PU.externalInitPage();
			}
		}
};


var CC = {
	BSMODEL_SHOWMSG_CALLBACK : null,
	
	/**
	 * @param cfg
	 * 		title 标题, 缺省为消息
	 * 		msg : 信息内容
	 *		hmsg : html形式msg
	 *		type success|error|warning|info, input为空时缺省为info
	 * 		option 1只有确定按钮	2=确定 取消, 缺省为1
	 *		okcolor : 指确定按钮颜色
	 *		oktext : 指确定按钮内容
	 *		cancelcolor : 指取消按钮颜色
	 *		canceltext : 指取消按钮内容
	 *		input : text|email|url|password|textarea|select|radio|checkbox|file|range
	 *		inputValidator : input验证器
	 *		inputValue : 初始值
	 * 		callback(r) 点击ok回调方法
	 */
	showMsg : function(cfg, basecfg) {
		var msgcfg = {};
		if(CU.isEmpty(cfg)) cfg = {};
		msgcfg.title = CU.isEmpty(cfg.title) ? "" : cfg.title;
		if(!CU.isEmpty(cfg.msg)) msgcfg.text = cfg.msg;
		if(!CU.isEmpty(cfg.hmsg)) msgcfg.html = cfg.hmsg;
		msgcfg.type = CU.isEmpty(cfg.type)&&CU.isEmpty(cfg.input) ? "none" : cfg.type;
		if(msgcfg.type == "none") msgcfg.type = null;
		msgcfg.showCancelButton = cfg.option===2 || cfg.option=="2";
		msgcfg.confirmButtonText = CU.isEmpty(cfg.oktext) ? "确定" : cfg.oktext;
		msgcfg.cancelButtonText = CU.isEmpty(cfg.canceltext) ? "取消" : cfg.canceltext;
		if(!CU.isEmpty(cfg.okcolor)) msgcfg.confirmButtonColor = cfg.okcolor;
		if(!CU.isEmpty(cfg.cancelcolor)) msgcfg.cancelButtonColor = cfg.cancelcolor;
		if(!CU.isEmpty(cfg.input)) msgcfg.input = cfg.input;
		if(!CU.isEmpty(cfg.inputValidator)) msgcfg.inputValidator = cfg.inputValidator;
		if(!CU.isEmpty(cfg.inputValue)) msgcfg.inputValue = cfg.inputValue;
		if(CU.isObject(basecfg)) $.extend(msgcfg, basecfg);
		
		if(CU.isEmpty(msgcfg.allowEscapeKey)) msgcfg.allowEscapeKey = false;
		if(CU.isEmpty(msgcfg.allowOutsideClick)) msgcfg.allowOutsideClick = false;
		
		var cb = CU.isFunction(cfg.callback) ? cfg.callback : cfg.cb;
		var ccb = CU.isFunction(cfg.cacnelCallback) ? cfg.cacnelCallback : cfg.ccb;
		swal(msgcfg).then(cb, ccb).catch(swal.noop);
	},
	
	
	/**
	 * @param cfg
	 * 		msg : 信息内容
	 *		type success|error|warning|info, input为空时缺省为info
	 */
	showTip : function(cfg) {
		if(CU.isEmpty(cfg)) cfg = {};
		if(CU.isEmpty(cfg.msg)) cfg.msg = "";
		if(CU.isEmpty(cfg.type)) cfg.type = "info";
		toastr[cfg.type](cfg.msg);
	},
	
	logout : function() {
		PU.removeToken();
		PU.removeMenuTreeData();
		var url = PU.getDefaultIndexPage();
		if(CU.isEmpty(url)) {
			url = window.LogoutUrl;;
		}
		if(CU.isEmpty(url)) {
			url = ContextPath + "/index.jsp";
		}
		if(!CU.isEmpty(url)) {
			window.location = CU.correctUrl(url);
		}
	},
	
	getRegionData : function(addEmpty, addAttr, cb) {
		if(CU.isEmpty(addEmpty)) addEmpty = false;
		if(CU.isEmpty(addAttr)) addAttr = true;
		var rd = window.localStorage.getItem("BASE_REGION_DATA");
		if(CU.isEmpty(rd)) {
			RS.ajax({url:"/sysframe/adapter/queryRegionDropList",ps:[{},addEmpty,addAttr],cb:function(r) {
				window.localStorage.setItem("BASE_REGION_DATA", CU.toString(r));
				if(CU.isFunction(cb))cb(r);
			}});
		}else {
			if(CU.isFunction(cb))cb(CU.toObject(rd));
		}
	},
	
	
	/**
	 * array[n] : {name:"", title:"", color:"", ishtml:true|false}
	 */
	fillOperateBtns : function(array, exts, html) {
		if(CU.isEmpty(html)) html = [];
		if(!CU.isEmpty(array)) {
			if(!CU.isArray(array) && CU.isObject(array)) {
				array = [array];
			}
			
			for(var i=0; i<array.length; i++) {
				var item = array[i];
				if(CU.isEmpty(item) || CU.isEmpty(item.title) || CU.isEmpty(item.name)) {
					continue ;
				}
				
				if(html.length > 0) html.push('<span class="operate-btn-verline">|</span>');
				html.push('<a href="###" class="table-link" ');
				
				var ishtml = CU.isTrue(item.ishtml) || CU.isTrue(item.isHtml);
				for(var k in item) {
					var v = item[k];
					if(CU.isEmpty(k) || CU.isEmpty(v) || (ishtml && k=="title")) {
						continue ;
					}
					html.push(k, '="', v, '" ');
				}
				
				if(CU.isObject(exts)) {
					for(var k in exts) {
						var v = exts[k];
						if(CU.isEmpty(k) || CU.isEmpty(v)) {
							continue ;
						}
						html.push(k, '="', v, '" ');
					}
				}
				if(!CU.isEmpty(item.color)) {
					html.push('style="color:',item.color,';" ');
				}
				html.push('>', item.title, '</a>');
			}
		}
		return html;
	},
	
	getGridRowImageTitle : function(name, icon) {
		if(CU.isEmpty(icon)) {
			return name;
		}else {
			var html = '<div class="grid-row-img-title">'
					 + '<div class="img-container"><img src="'+PU.toRsmImageUrl(icon, "small")+'"></img></div>'
					 + '<div class="text">' + name + '</div>'
					 + '</div>';
			return html;
		}
	},
	
	loadDynamicDropList : function(names, appAttrs, cb) {
		if(CU.isEmpty(names)) {
			if(CU.isFunction(cb)) cb();
			return ;
		}
		if(typeof(names)=="string") {
			names = names.split(",");
		}
		appAttrs = appAttrs===true || appAttrs=="true";
		var addroot = PU.getDynamicDropRoot();
		var url = PU.getDynamicDropUrl();
		var ps = {names:names, appAttrs:appAttrs};
		PU.loadDynamicDicts({addroot:addroot, url:url, ps:ps, cb:cb});
	},
	
	getBodyScrollTop : function() {
		return PU.getBodyScrollTop();
	},
	
	getElementScrollTop : function(el) {
		return PU.getElementScrollTop(el);
	},
	
	bindPageTouch : function(cfg) {
		PU.bindPageTouch(cfg);
	}
	
};



