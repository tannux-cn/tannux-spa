/*!
 * tannux-web v3.1.0 (http://tannux.com)
 * Copyright 2014-2025 Tannux Technology Co., LTD
 * Licensed under the Apache License, Version 2.0.
 */
 
/**
 * 远程服务
 */
var RS = {jx:null, PSK:"tx_ps", APSK:"tx_aps", RTK:"tx_rt", RT_FWR:"fwr", RT_FWR_RQ:"fwr-rq", RT_FWR_RP:"fwr-rp", RT_NAT:"naive", RT_DOWN:"down-g",
		headers : {},
	
		/**
		 * 显示消息事件, 供外部重写
		 * @return false=终止缺省消息显示
		 */
		onShowMsg : function(msg, loading) { return msg; },
		onHideMsg : function(msg, loading) {},
		onShowErrMsg : function(errcode, errmsg) {},
		
		/**
		 * 服务器访问失败事件
		 * @return false=终止缺省失败事件处理
		 */
		onFailure : function(response, options) {},
		
		onBeforeHeaders : function(headers, cfg) {
			if(!CU.isEmpty(RS.headers)) {
				if(CU.isEmpty(headers))headers = {};
				for(var k in RS.headers) {
					headers[k] = RS.headers[k];
				}
			}
			return headers;
		},
		
		/**
		 * 最近一次错误信息, 缓存一下
		 */
		error : {code:null, message:null},
		
		
		/**
		 * 异样状态码, >200&&<300
		 */
		defstatus : function(status) { return true;},
		
		
		/**
		 * 在url中补充token, 只有localStorage中有才会补充
		 */
		autoFillToken : function(url) {
			var token = RS.getToken();
			if(!CU.isEmpty(token)) {
				url += (url.indexOf('?')<0?'?':'&') + "token=" + token;
			}
			return url;
		},
		
		
		/**
		 * 获取远程请求前缀
		 */
		getRemotePrefix : function() {
			return "/api"
		},
		
		
		/**
		 * 供外部覆盖
		 */
		getDefaultAddRoot : function() {
		},
		
		
		/**
		 * 获取远程缺省事件类型
		 */
		getDefaultActionType : function() {
			return "rest2";
		},
		
		
		/**
		 * 获取远程地址
		 * @param {} cfg
		 * 		addroot: 是否添加ContextPath, 缺省为添加, 类型为string并且是http://||https://开头则认为他就是root
		 * 		act: ActionType - [simple, form, rest2], 缺省为rest2
		 * 		url: 服务+方法
		 * 		svc: 服务
		 * 		mod: 远程方法
		 * 		ps: 参数列表, 类型为[], 数组中每一项对应服务方法参数列表
		 * 		rt: 指定返回如果 [RTK, AT_FWR, AT_NAT, AT_DOWN]
		 * @return {}
		 */
		getRemoteUrl : function(cfg) {
			var addroot = cfg.addroot;
			if(CU.isEmpty(addroot)) addroot = RS.getDefaultAddRoot();
			
			var url = [];
			if(typeof(addroot)=="string" && (addroot.startsWith("/")||addroot.startsWith("http://")||addroot.startsWith("https://"))) {
				url.push(addroot);
			}else {
				if(addroot !== false) {
					if(!CU.isEmpty(window.RSForceContextPath)) {
						url.push(window.RSForceContextPath);
					}else {
						url.push(ContextPath);
					}
				}
			}
			
			if(!CU.isEmpty(cfg.url) && (cfg.url.startsWith("http://")||cfg.url.startsWith("https://"))) {
				url.push(cfg.url);
			}else {
				if(CU.isEmpty(cfg.act)) cfg.act = RS.getDefaultActionType();
				url.push(RS.getRemotePrefix(), "/", cfg.act);
				if(CU.isEmpty(cfg.url)) {
					url.push((cfg.svc.substring(0,1)!='/'?"/":""), cfg.svc, (cfg.mod.substring(0,1)!='/'?"/":""), cfg.mod);
				}else {
					url.push((cfg.url.substring(0,1)!='/'?"/":""), cfg.url);
				}
			}
			var has = false;
			if (CU.isObject(cfg.ps)) {
				var sps = encodeURIComponent(CU.toString(cfg.ps));
				switch(cfg.act) {
					case "simple": url.push("?",RS.PSK,"=", sps); has=true; break;
					case "form": url.push("?",RS.APSK,"=", sps); has=true; break;
				}
			}
			if(!CU.isEmpty(cfg.rt)) url.push((has?"&":"?"),RS.RTK,"=", cfg.rt);
			url = url.join("");
			if(cfg.token===true || cfg.token=="true" || ((cfg.act=="simple" || cfg.act=="form") && cfg.token!==false && cfg.token!="false")) {
				url = RS.autoFillToken(url);
			}
			return url;
		},
		
		
		
		/**
		 * 获取跟据模块ID打开模块URL
		 *  code: 模块代码
		 */
		getModuleUrl : function(code, ps, encode, appendToken) {
			var url = RS.getRemoteUrl({act:"simple", url:"/sysframe/dispatch/mc/"+code});
			if(appendToken===true) url = RS.autoFillToken(url);
			if(CU.isObject(ps)) {
				var param = CU.parseParams(ps, encode);
				if(!CU.isEmpty(param)) {
					url += (url.indexOf('?')<0?'?':'&') + param;
				}
			}
			return url;
		},
		
		toRsmUrl : function(path, ps) {
			if(CU.isEmpty(path)) return path;
			path = CU.trim(path);
			if(path.startsWith("data:image")) {
				return path;
			}
			if(!path.startsWith("http://") && !path.startsWith("https://")
					&& !CU.isEmpty(window.RsmAccessRoot)) {
				path = RsmAccessRoot + path;
			}
			if(CU.isObject(ps)) {
				var ba = false;
				for(var k in ps) {
					if(CU.isEmpty(k)) continue ;
					var v = ps[k];
					if(CU.isEmpty(v)) continue ;
					if(!ba) {
						ba = path.indexOf('?') >= 0;
					}
					path += (ba?'&':'?') + k + '=' + v;
					ba = true;
				}
			}
			return path;
		},
		
		toRsmImageUrl : function(path, ps) {
			var as = {"x-oss-process":"image/auto-orient,1/resize,m_lfit,w_900/quality,Q_70"};
			if(ps == "small") {
				as["x-oss-process"] = "image/auto-orient,1/resize,m_lfit,w_60/quality,Q_70";
			}else if(ps == "big") {
				as["x-oss-process"] = "image/auto-orient,1/resize,m_lfit,w_300/quality,Q_70";
			}else if(CU.isObject(ps)) {
				$.extend(as, ps);
			}
			return RS.toRsmUrl(path, as);
		},
		
		defaultErrorCallback : function(code, message) {
			if(RS.onShowErrMsg(code, message)!==false) alert("访问远程服务器失败!");
		},
		
		setBaseConfig : function(config, bscfg) {
			if(CU.isObject(bscfg)) {
				for(var key in bscfg) {
					config[key]=bscfg[key];
				}
			}
		},
		
		AjaxBS : function() {
			this.ajax = function(url, ps, msg, cb, errcb, headers, bscfg, loading) {
				var config = {url:url, params:ps,
						success:function(xmlhttp) {
							RS.onHideMsg(msg, loading);
							
							if((xmlhttp.status>200 && xmlhttp.status<300) || xmlhttp.status==401) {
								if(CU.isFunction(RS.defstatus)) {
									var ba = RS.defstatus(xmlhttp.status);
									if(!ba) return ;
								}
							}
							
							var rs = null;
							try {
								rs = CU.toObject(xmlhttp.responseText);
							} catch (e) {
								rs = {success:false, message:"CU.toObject error!"};
							}
							if((rs.code>200 && rs.code<300) || rs.code==401) {
								if(CU.isFunction(RS.defstatus)) {
									var ba = RS.defstatus(rs.code);
									if(!ba) return ;
								}
							}
							
							if(rs.success===true || rs.success==="true") {
								if(CU.isFunction(cb))cb(rs.data);
							}else {
								if(CU.isFunction(errcb)) {
									errcb(rs.code, rs.message);
								}else {
									RS.defaultErrorCallback(rs.code, rs.message);
								}
							}
						}, failure:function(xmlhttp) {
							RS.onHideMsg(msg, loading);
							if(RS.onFailure(xmlhttp) === false) return ;
//							if(RS.onShowErrMsg(xmlhttp)!==false) alert("访问远程服务器失败!");
						}
					};
				RS.setBaseConfig(config, bscfg);
				CU.request(config);
			};
		},
		
		
		AjaxJQ : function() {
			this.ajax = function(url, ps, msg, cb, errcb, headers, bscfg, loading) {
				var config = {url:url, type:"post", dataType:"json", 
						success:function(rs, success, xmlhttp) {
							RS.onHideMsg(msg, loading);
							
							if((xmlhttp.status>200 && xmlhttp.status<300) || xmlhttp.status==401) {
								if(CU.isFunction(RS.defstatus)) {
									var ba = RS.defstatus(xmlhttp.status);
									if(!ba) return ;
								}
							}
							if((rs.code>200 && rs.code<300) || rs.code==401) {
								if(CU.isFunction(RS.defstatus)) {
									var ba = RS.defstatus(rs.code);
									if(!ba) return ;
								}
							}
							
							if(rs.success===true || rs.success==="true") {
								if(CU.isFunction(cb))cb(rs.data);
							}else {
								if(CU.isFunction(errcb)) {
									errcb(rs.code, rs.message);
								}else {
									RS.defaultErrorCallback(rs.code, rs.message);
								}
							}
						}, error:function(xmlhttp) {
							RS.onHideMsg(msg, loading);
							if(RS.onFailure(xmlhttp) === false) return ;
//							if(RS.onShowErrMsg(xmlhttp)!==false) alert("访问远程服务器失败!");
						}
					};
				RS.setBaseConfig(config, bscfg);
				if(config.type=="post" || config.type=="POST") {
					config.data = ps;
					config.headers = headers;
				}
				$.ajax(config);
			};
		},
		
		
		
		
		/**
		 * ajax调用
		 * @param cfg: 配置对象, 其属性值如下
		 *		addroot: 是否添加ContextPath, 缺省为添加
		 * 		act: ActionType - [simple, form, rest2], 缺省为rest2
		 * 		url: 服务+方法
		 * 		svc: 服务名
		 * 		mod: 方法名
		 * 		ps: 参数列表, 类型为[], 数组中每一项对应服务方法参数列表
		 * 		msg: 显示消息, 可以是string类型, 为string类型表示消息内容, 可以为boolean, 表示是否显示消息信息
		 * 		cb: 回调方法
		 * 		errcb: 错误回调方法	errcb(code, message);
		 * 		headers : 头
		 * 		bscfg : 底层调用扩展配置
		 * 		upload : 是否是上传, 缺省为false
		 * 		 : 消息携带参数
		 */
		ajax : function(cfg) {
			if(CU.isEmpty(cfg.act)) cfg.act = RS.getDefaultActionType();
			if(cfg.act=="rest2") {
				RS.rest2(cfg);
			}else if(cfg.act=="simple") {
				RS.simple(cfg);
			}else if(cfg.act=="form") {
				RS.form(cfg);
			}else {
				throw "unknown act '"+cfg.act+"'.";
			}
		},
		
		
		getUrlDomain : function(url) {
			if(CU.isEmpty(url)) return "";
			url = CU.trim(url+"");
			var domain = "";
			if(url.startsWith("http://") || url.startsWith("https://")) {
				domain = url.substring(url.indexOf("//")+2);
				var idx = domain.indexOf("/");
				if(idx >= 0) {
					domain = domain.substring(0, idx);
				}
			}
			return domain;
		},
		
		
		getToken : function() {
			token = window.localStorage.getItem("token");
//			if(CU.isEmpty(token)) {
//				token = CU.getCookie("token");
//			}
			return token;
		},
		
		appendToken : function(url, headers) {
			if(CU.isEmpty(url) || !CU.isObject(headers)) return ;
			var token = RS.getToken();
			if(!CU.isEmpty(token)) {
				headers["token"] = token;
			}
		},
		
		
		/**
		 * ps为[]对象类型, 其他同ajax一样
		 */
		simple : function(cfg) {
			var url = RS.getRemoteUrl({url:cfg.url,svc:cfg.svc,mod:cfg.mod,act:"simple",addroot:cfg.addroot});
			var ps = {};
			if(cfg.upload===true || cfg.upload=="true") {
				ps = cfg.ps;
			}else {
				if(!CU.isEmpty(cfg.ps)) ps[RS.PSK]=CU.toString(cfg.ps);
			}
			RS.error.code = null;
			RS.error.message = null;
			var msg = RS.onShowMsg(cfg.msg, cfg.loading);
			if(CU.isEmpty(cfg.headers)) cfg.headers = {};
			cfg.headers["REQUEST_HEADER"] = "tannux-http-client-header";
			RS.onBeforeHeaders(cfg.headers, cfg);
			RS.appendToken(url, cfg.headers);
			RS.jx.ajax(url, ps, msg, cfg.cb, cfg.errcb, cfg.headers, cfg.bscfg, cfg.loading);
		},
		
		
		/**
		 * ps为{}对象类型, 其他同ajax一样
		 */
		rest2 : function(cfg) {
			var url = RS.getRemoteUrl({url:cfg.url,svc:cfg.svc,mod:cfg.mod,act:"rest2",addroot:cfg.addroot});
			var ps = cfg.ps;
			if(!CU.isEmpty(ps)) ps = CU.toString(ps);
			RS.error.code = null;
			RS.error.message = null;
			var msg = RS.onShowMsg(cfg.msg, cfg.loading);
			if(CU.isEmpty(cfg.headers)) cfg.headers = {};
			cfg.headers["REQUEST_HEADER"] = "tannux-http-client-header";
			cfg.headers["Content-Type"] = "application/json";
			RS.onBeforeHeaders(cfg.headers, cfg);
			RS.appendToken(url, cfg.headers);
			RS.jx.ajax(url, ps, msg, cfg.cb, cfg.errcb, cfg.headers, cfg.bscfg, cfg.loading);
		},
		
		
		/**
		 * ps为[]对象类型, 其他同ajax一样
		 */
		form : function(cfg) {
			var url = RS.getRemoteUrl({url:cfg.url,svc:cfg.svc,mod:cfg.mod,act:"form",addroot:cfg.addroot});
			RS.error.code = null;
			RS.error.message = null;
			var msg = RS.onShowMsg(cfg.msg, cfg.loading);
			if(CU.isEmpty(cfg.headers)) cfg.headers = {};
			cfg.headers["REQUEST_HEADER"] = "tannux-http-client-header";
			RS.onBeforeHeaders(cfg.headers, cfg);
			RS.appendToken(url, cfg.headers);
			RS.jx.ajax(url, cfg.ps, msg, cfg.cb, cfg.errcb, cfg.headers, cfg.bscfg, cfg.loading);
		},
		
		
		/**
		 * Web - forward
		 * @param {} cfg 配置参数如下
		 * 		url: 服务+方法
		 * 		svc: 服务名
		 * 		mod: 方法名
		 * 		ps: 参数列表, 类型为[], 数组中每一项对应服务方法参数列表
		 * 		ops: 携带参数, 类型为Object, 为了页面跳转时在目标页面能得到此参数
		 * 		msg: 显示消息, 可以是string类型, 为string类型表示消息内容, 可以为boolean, 表示是否显示消息信息
		 * 		rrt: 是否重定向, boolean类型
		 * 		url: 跳转的页面, 由服务器跳转则可以不指定, 如果为空则rrt不起作用
		 * 		loading : 绑定消息
		 */
		forward : function(cfg) {
			if(!CU.isEmpty(cfg.url))cfg.rt=(CU.isEmpty(cfg.rrt)?RT_FWR:(cfg.rrt!==false?RT_FWR_RP:RT_FWR_RQ)) + ":" + cfg.url;
			var url = RS.getRemoteUrl({url:cfg.url,svc:cfg.svc,mod:cfg.mod,ps:cfg.ps,rt:cfg.rt});
			if(!CU.isEmpty(cfg.ops)) url += CU.parseParams(cfg.ops);
			RS.onShowMsg(cfg.msg, cfg.loading);
			window.location = url;
		},
		
		
		/**
		 * Web - submit
		 * @param {} cfg 配置参数如下
		 * 		form: 页面中的form元素, 可以是ID, 如果为空则自动创建一个临时的form表单元素
		 * 		url: 服务+方法
		 * 		svc: 服务名
		 * 		mod: 方法名
		 * 		fm: 表单对象数据, 以form表单提交
		 * 		ps: 参数列表, 类型为[], 数组中每一项对应服务方法参数列表
		 * 		msg: 显示消息, 可以是string类型, 为string类型表示消息内容, 可以为boolean, 表示是否显示消息信息
		 * 		loading : 消息携带参数
		 */
		submit : function(cfg) {
			var url = RS.getRemoteUrl({url:cfg.url,act:"form",svc:cfg.svc,mod:cfg.mod});
			var aps = CU.isEmpty(cfg.ps) ? null : CU.toString(cfg.ps);
			var isnew = false;
			var form = cfg.form;
			if(CU.isEmpty(form)) {
				form = CU.createEl("form");
				form.style.display = "none";
				isnew = true;
			}else if(typeof(form)=="string") {
				form = CU.getEl(form);
			}
			
			form.action = url;
			form.method = "POST";
			if(CU.isObject(cfg.fm)) {
				for(var k in cfg.fm) {
					var v = cfg.fm[k];
					if(CU.isEmpty(v, true)) continue;
					if(CU.isArray(v)) {
						for(var i=0; i<v.length; i++){form.appendChild(CU.createEl("input",{type:"hidden",name:k,value:v[i]}));}
					}else {
						form.appendChild(CU.createEl("input",{type:"hidden",name:k,value:v}));
					}
				}
			}
			if(aps != null) form.appendChild(CU.createEl("input",{type:"hidden",name:RS.APSK,value:aps}));
			
			document.body.appendChild(form);
			RS.onShowMsg(cfg.msg, cfg.loading);
			form.submit();
			if(isnew){document.body.removeChild(form);}
		},
		
		
		/**
		 * 下载
		 * @param {} cfg
		 * 		url: 服务+方法
		 * 		svc: 服务名
		 * 		mod: 方法名
		 * 		ps: 参数列表, 类型为[], 数组中每一项对应服务方法参数列表
		 */
		download : function(cfg){
			var win=CU.isEmpty(PRQ)?window:PRQ.getParentWindow();
			if(CU.isEmpty(cfg.rt)) cfg.rt = RS.RT_DOWN;
			var url = RS.getRemoteUrl(cfg);
			var opwin = win.open(url, "_blank", 'fullscreen=0,menubar=0,toolbar=0,location=0,scrollbars=0,status=1,left=300,top=100,width=200,height=200');
			setTimeout(function(){if(CU.isObject(opwin)&&!opwin.closed)opwin.close();},5000);
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
			var url = RS.getModuleUrl(cfg.mc);
			var winwidth = CU.isEmpty(cfg.width) ? 800 : cfg.width;
			var winheight = CU.isEmpty(cfg.height) ? 600 : cfg.height;
			var winresizable = cfg.resizable==false ? "no" : "yes";
			
			cfg.modal = false;
			
			if(cfg.modal === false) {
				if(CU.isObject(cfg.ops)) url += CU.parseParams(cfg.ops);
				return window.open(url,"BaseFlag_OpenModule_"+cfg.mc+"_"+CU.getId(),"fullscreen=0,menubar=0,toolbar=0,location=0,scrollbars=0,status=1,left=300,top=100,width="+winwidth+",height="+winheight);
			}else {
				if(CU.isIE6()) {winwidth+=6;winheight+=45;}
				var parentwindow = typeof(PRQ)=="undefined"||PRQ===null ? window : PRQ.getParentWindow();
				if(cfg.modal == "less") {
					return window.showModelessDialog(url,{ParentWindow:parentwindow,OpenParams:cfg.ops},"dialogWidth:"+winwidth+"px;dialogHeight:"+winheight+"px;center:yes;help:no;resizable:"+winresizable+";status:no;");
				}else {
					var rv = window.showModalDialog(url,{ParentWindow:parentwindow,OpenParams:cfg.ops},"dialogWidth:"+winwidth+"px;dialogHeight:"+winheight+"px;center:yes;help:no;resizable:"+winresizable+";status:no;");
					if(CU.isFunction(cfg.cb)) cfg.cb(rv);
				}
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
			if(cfg.rmod == "GET") {
				RS.forward({svc:"SysResMVC",mod:"openModule",ps:[cfg.mc],ops:cfg.ops});
			}else {
				RS.submit({svc:"SysResMVC",mod:"openModule",ps:[cfg.mc],fm:cfg.ops});
			}
		},
		
		
		messageHandlers : null,	//key=code
		handleMessage : function(post, code, cb, errcb) {	//post:true=发送方, false=接收方
			if(CU.isEmpty(RS.messageHandlers)) {
				window.addEventListener('message', function(e) {
					if(CU.isEmpty(e.data) || typeof(e.data)!="string") {
						return ;
					}
					var data = CU.toObject(e.data);
					if(CU.isEmpty(data.post) || CU.isEmpty(data.code) || CU.isEmpty(data.success)) {
						return ;
					}
//					if(data.post && e.source!=window.parent) {	//data.post=true表示被动接收, 为false表示回调接收, 角度不一样发送和接收是反的
//						return ;
//					}
					var d = data.success ? data.data : data.message;
					
					if(data.post) {		//如果发送方post为true, 则接收方应为回调接收
						for(var k in RS.messageHandlers) {
							var h = RS.messageHandlers[k];
							if(!h.post) {		//h.post=false表示回调接收
								var r = null;
								var msg = null;
								var ba = true;
								try {
									r = h.cb(d, e);
								}catch(e) {
									msg = e + "";
									ba = false;
								}
								//post=false表示回调时向主动方发消息
								RS.postMessage({win:e.source, code:data.code, success:ba, data:r, message:msg, post:false});
							}
						}
					}else {		//post=false表示主动发消息后的回调
						var h = RS.messageHandlers[data.code];
						if(CU.isObject(h)) {
							if(data.success) {
								if(CU.isFunction(h.cb))h.cb(d, e);
							}else {
								if(CU.isFunction(h.errcb)) {
									h.errcb(d, e);
								}else {
									if(RS.onShowErrMsg(500, d)!==false) alert("访问远程服务器失败!");
								}
							}
							delete RS.messageHandlers[data.code];
						}
					}
			    },false);
				RS.messageHandlers = {};
			}
			if(CU.isFunction(cb) || CU.isFunction(errcb)) {
				RS.messageHandlers[code] = {post:post, code:code, cb:cb, errcb:errcb};
			}
		},
		
		
		waitMessage : function(cb) {
			RS.handleMessage(false, CU.getUUID(), cb, null);
		},
		
		
		/**
		 * win : 窗口对象, 如果为string则认为是iframe的名称
		 * origin : 指定域, 格式为:协议+主机+端口号, 缺省为*, 即为所有
		 * code : 代码, 主动请求可以为空, 接收消息回调时传入调用方给的code
		 * success : 成功还是失败, 缺省为true
		 * data : 传输数据
		 * message : 错误消息
		 * post : 是主动发送还是被动接收回调
		 * cb: 回调方法
		 * errcb: 错误回调方法	errcb(code, message);
		 */
		postMessage : function(cfg) {
			if(CU.isEmpty(cfg)) throw " the config is empty argument! ";
			if(CU.isEmpty(cfg.win)) throw " the config.win is empty argument! ";
			var a = $.extend({origin:"*", success:true}, cfg);
			if(CU.isEmpty(a.code)) a.code = CU.getUUID();
			if(CU.isEmpty(a.post)) a.post = true;
			var data = CU.toString({post:a.post, code:a.code, success:a.success, data:a.data, message:a.message});
			RS.handleMessage(a.post, a.code, cfg.cb, cfg.errcb);
			if(typeof(cfg.win)=="string") cfg.win = window.frames[cfg.win];
			cfg.win.postMessage(data, a.origin);
		}
};
if(typeof(window.$)!="undefined") {
	RS.jx = new RS.AjaxJQ();
}else {
	RS.jx = new RS.AjaxBS();
}

