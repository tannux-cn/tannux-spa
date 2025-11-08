/*!
 * tannux-web v3.1.0 (http://tannux.com)
 * Copyright 2014-2025 Tannux Technology Co., LTD
 * Licensed under the Apache License, Version 2.0.
 */
 
var CU = {BASEFLAG_COUNTER:0,userAgent:navigator.userAgent.toLowerCase(),activeX:['MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'],
		getId : function(){return CU.BASEFLAG_COUNTER++;},
		isOpera : function() {return /opera/.test(CU.userAgent);},
		isIE : function() {return !CU.isOpera() && /msie/.test(CU.userAgent);},
		isIE6 : function() {return CU.isIE() && /msie 6/.test(CU.userAgent);},
		isEmpty : function(v, allowBlank, trim) {if(v===null || v===undefined) return true; if(trim!==false && typeof(v)=="string") v = CU.trim(v); return ((CU.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false); },
		//isEmpty && 对象没有属性
		isEmptyObject : function(v, allowBlank, trim) {
			return CU.isEmpty(v, allowBlank, trim) || !CU.isObject(v) || Object.keys(v).length<=0;
		},
		isArray : function(v){return Object.prototype.toString.apply(v) === '[object Array]';},
	    clearArray : function(a){while(a.length>0)a.pop();},
	    isObject : function(v){ return v && typeof v == "object";},
	    isPrimitive : function(v){var t=typeof v; return t == 'string' || t == 'number' || t == 'boolean';},
	    isInteger : function(v) {
	    	var ba = false;
	    	if(!CU.isEmpty(v)) {
	    		if(typeof(v)=="number") {
	    			var s = v+"";
	    			ba = s.indexOf('.')<0 && s.length<9;
	    		}else if(typeof(v)=="string") {
	    			ba = /^[-]?[0-9]{1,8}$/.test(CU.trim(v));
	    		}
	    	}
	    	return ba;
	    },
	    isLong : function(v) {
	    	var ba = false;
	    	if(!CU.isEmpty(v)) {
	    		if(typeof(v)=="number") {
	    			ba = (v+"").indexOf('.') < 0;
	    		}else if(typeof(v)=="string") {
	    			ba = /^[-]?[0-9]{1,16}$/.test(CU.trim(v));
	    		}
	    	}
	    	return ba;
	    },
	    isNumber : function(v) {
	    	var ba = false;
	    	if(!CU.isEmpty(v)) {
	    		if(typeof(v)=="number") {
	    			ba = true;
	    		}else if(typeof(v)=="string") {
	    			ba = /^[-]?[0-9]{1,16}(([.][0-9]+)?)$/.test(CU.trim(v));
	    		}
	    	}
	    	return ba;
	    },
	    isFunction : function(v){return typeof v == "function";},
	    undef : function(value) {return value !== undefined ? value : "";},
		toObject : function(v) {
			//return JSON.parse(v);
			return (new Function("return " + v))();
		},
		toString : function(v) {return JSON.stringify(v);},
		parseParams : function(ps, encode) {
			var buff = [];
			for(var key in ps) {
				var value = ps[key];
				if(CU.isEmpty(value, false, false)) {
					continue;
				}
				if(CU.isArray(value)) {
					for(var i=0; i<value.length; i++) {
						var item = value[i];
						if(CU.isEmpty(item, false, false)) {
							continue;
						}
						if(encode) item = encodeURIComponent(item);
						buff.push(key+"="+item);
					}
				} else {
					if(encode) value = encodeURIComponent(value);
					buff.push(key+"="+value);
				}
			}
			return buff.join("&");
		},
		parseUrlParams : function(url) {
			var pm = {};
			var ps = CU.getQueryString(url);
			if(!CU.isEmpty(ps)) {
				var arr = ps.split("&");
				for(var i=0; i<arr.length; i++) {
					idx = arr[i].indexOf('=');
					if(idx > 0) {
						var k = CU.trim(arr[i].substring(0, idx));
						var v = CU.trim(arr[i].substring(idx+1));
						if(CU.isEmpty(k)) continue;
						
						var ov = pm[k];
						if(ov===null || ov===undefined) {
							pm[k] = v;
						}else if(CU.isArray(ov)) {
							ov.push(v);
						}else {
							pm[k] = [ov, v];
						}
					}
				}
			}
			return pm;
		},
		insert : function(array,index,item) {if(CU.isEmpty(index))index=array.length;if(index<0||index>array.length)return;for(var i=array.length; i>index; i--)array[i]=array[i-1];array[index]=item;return item;},
		remove : function(array,index) {if(index<0||index>=array.length)return;var item=array[index];array.splice(index,1);return item;},
		createXmlHttp : function() {try {return new XMLHttpRequest();}catch(e) {for(var i=0; i<CU.activeX.length; i++) {try {return new ActiveXObject(CU.activeX[i]);break;} catch(e1) {}}}alert('No browser XMLHttpRequest (AJAX) support');},
		
		createEl : function(cfg, properties) {var el;if(typeof(cfg)=="string") {el = document.createElement(cfg);}else {if(CU.isEmpty(cfg)) cfg = {};if(CU.isEmpty(cfg.tagName)) cfg.tagName = "DIV";el = document.createElement(cfg.tagName);if(!CU.isEmpty(cfg.id)) el.id = cfg.id;if(!CU.isEmpty(cfg.name)) el.name = cfg.name;if(!CU.isEmpty(cfg.cls)) el.className = cfg.cls;if(!CU.isEmpty(cfg.style)) el.style.cssText = cfg.style;if(!CU.isEmpty(cfg.html)) el.innerHTML = cfg.html;if(CU.isArray(cfg.items)) for(var i=0; i<cfg.items.length; i++) el.appendChild(cfg.items[i]);}if(CU.isObject(properties)) for(var key in properties) el[key] = properties[key];return el;},
		getEl : function(elid){return document.getElementById(elid);},
		getEls : function(elname){return document.getElementsByName(elname);},
		trim : function(str) {if(str==undefined || str==null) return str; return $.trim(str);},
		getDate : function() {return CU.toDateString(new Date());},
		getTime : function() {return CU.toTimeString(new Date());},
		toDate : function(value) {return new Date(Date.parse(value.replace(/-/g,"/")));},
		toDateString : function(date) {var y = date.getFullYear();var m = date.getMonth()+1;if(m < 10) m = "0"+m;var d = date.getDate();if(d < 10) d = "0"+d;return y+"-"+m+"-"+d;},
		toTimeString : function(date) {var y = date.getFullYear();var m = date.getMonth()+1;if(m < 10) m = "0"+m;var d = date.getDate();if(d < 10) d = "0"+d;var h = date.getHours();if(h < 10) h = "0"+h;var mi = date.getMinutes();if(mi < 10) mi = "0"+mi;var s = date.getSeconds();if(s < 10) s = "0"+s;return y+"-"+m+"-"+d+" "+h+":"+mi+":"+s;},
		getDateDiff : function(small, big) {return (big-small)/1000/60/60/24;},
		getBeforeDate : function(day) {return new Date(new Date().getTime()-1000*60*60*24*day);},
		getBeforeDateString : function(day) {var date = CU.getBeforeDate(day);var y = date.getFullYear();var m = date.getMonth()+1;var d = date.getDate();if(m < 10) m = "0"+m;if(d < 10) d = "0"+d;return y+"-"+m+"-"+d;},
		getAfterDate : function(day) {return new Date(new Date().getTime()+1000*60*60*24*day);},
		getAfterDateString : function(day) {var date = CU.getAfterDate(day);var y = date.getFullYear();var m = date.getMonth()+1;var d = date.getDate();if(m < 10) m = "0"+m;if(d < 10) d = "0"+d;return y+"-"+m+"-"+d;},
		getDaysInMonth : function(year, month) {switch (month) {case 1:case 3:case 5:case 7:case 8:case 10:case 12: return 31;case 4:case 6:case 9:case 11: return 30;case 2: return ((year%4==0 && year%100!=0) || (year%400==0)) ? 29 : 28;default: return -1;}},
		clone : function(obj) {if(obj==null || obj==undefined) return obj;var newobj;if(obj.constructor == Object) {newobj = new obj.constructor();}else {newobj = new obj.constructor(obj.valueOf());}for(key in obj) {var value = obj[key];if(newobj[key] != obj[key]) {if(typeof(value) == "object") {newobj[key] = CU.clone(value);}else {newobj[key] = value;}}}newobj.toString = obj.toString;newobj.valueOf = obj.valueOf;return newobj;},
		
		isTrue : function(a) {
			return a===true || a=="true" || a==1 || a=="1" || a=="yes" || a=="on";
		},
		isFalse : function(a) {
			return a===false || a=="false" || a==0 || a=="0" || a=="no" || a=="off";
		},
		leftPad : function(s, size, padChar) {
			if(!CU.isEmpty(size) && !CU.isEmpty(padChar)) {
				s = s + "";
				size = parseInt(size, 10);
				while(s.length < size) {
					s = padChar + s;
				}
			}
			return s;
		},
		rightPad : function(s, size, padChar) {
			if(!CU.isEmpty(size) && !CU.isEmpty(padChar)) {
				s = s + "";
				size = parseInt(size, 10);
				while(s.length < size) {
					s = s + padChar;
				}
			}
			return s;
		},
		leftPadZero : function(s, size) {
			return CU.leftPad(s, size, '0');
		},
		rightPadZero : function(s, size) {
			return CU.rightPad(s, size, '0');
		},
		
		seal : function(backid) {if(CU.isEmpty(backid)) backid = "base_elementid_backid_"+CU.getId();var bw = parseInt(document.documentElement.scrollWidth);var bh = parseInt(document.documentElement.scrollHeight);var backel = CU.createEl({id:backid,style:"top:0px;left:0px;position:absolute;background:#e6e6e6;width:"+bw+"px;height:"+bh+"px;filter:alpha(opacity=40);"+(CU.isIE() ? "filter:alpha(opacity=40);" : "opacity:0.40;")});document.body.appendChild(backel);return backel;},
		createTableHtml : function(cfg){if(CU.isEmpty(cfg.id)) cfg.id = "common_table_html_"+CU.getId();var cm=cfg.cm;var buffer = [];buffer.push("<table id='"+cfg.id+"' border='1' cellspacing='0' class='table_queryList' bordercolorlight='#FFB951' bordercolordark='#ffffff'>");buffer.push("<tr class='tr_queryListHead'>");for(var i=0; i<cm.length; i++) {var width = CU.isEmpty(cm[i].width) ? 100 : cm[i].width;var header = CU.isEmpty(cm[i].header) ? "&nbsp;" : cm[i].header;var align = CU.isEmpty(cm[i].align) ? "left" : cm[i].align;buffer.push("<td style='padding-top:4px;' width='"+width+"' align='"+align+"'>"+header+"</td>");}buffer.push("</tr></table>");return buffer.join("");},
		refreshPage : function() {window.location.reload();},
		
		
		/**
		 * 添加cookie
		 * @param key: 键
		 * @param value: 值
		 * @param cfg: cookie配制对象, 其内部属性包括:
		 * 			expires:
		 * 			path:
		 * 			domain:
		 * 			secure: 
		 */
		setCookie : function(key, value, cfg) {
			if(cfg==undefined || cfg==null) cfg = {};
			if(cfg.expires==undefined || cfg.expires==null) {
				var expdate = new Date(); 
			    expdate.setTime(expdate.getTime()+(1000*60*60*24*14));
			    cfg.expires = expdate;
			}
			if(cfg.path==undefined || cfg.path==null) cfg.path = "/";
			var cookie = key+"="+escape(value)+";expires="+cfg.expires.toGMTString()+";path="+cfg.path;
			if(cfg.domain!=undefined && cfg.domain!=null) cookie += ";domain="+cfg.domain;
			
			//如果是chrome, 则需处理跨域问题
			if(window.navigator.userAgent.indexOf('Chrome')>-1 && (window.location.href+"").startsWith("https://")) {
				cookie += ";SameSite=None";
				cfg.secure = true;
			}
			if(cfg.secure == true) cookie += ";secure";
			document.cookie = cookie;
		},
		
		
		getCookieValue : function(offset) {
			var endstr = document.cookie.indexOf(";", offset);
			if(endstr == -1){
			    endstr = document.cookie.length;
			}
			return unescape(document.cookie.substring(offset, endstr));
		},
		
		/**
		 * 获取cookie
		 */
		getCookie : function(key) {
			var arg = key + "=";
		    var alen = arg.length;
		    var clen = document.cookie.length;
		    var i = 0;
		    var j = 0;
		    while(i < clen){
		        j = i + alen;
		        if (document.cookie.substring(i, j) == arg)
		            return CU.getCookieValue(j);
		        i = document.cookie.indexOf(" ", i) + 1;
		        if(i == 0)
		            break;
		    }
		    return null;
		},
		
		/**
		 * 删除cookie
		 */
		removeCookie : function(key) {
			if(CU.getCookie(key)){
			    var expdate = new Date(); 
			    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1)); 
			    CU.setCookie(key, "", expdate); 
			}
		},
		
		
		/**
		 * 基础请求远程服务
		 * @param {} cfg
		 * 		url: 远程地址
		 * 		method: POST\GET	缺省为POST
		 * 		params: 请求参数 {}类型
		 * 		async: 是否异步: true=异步	false=同步, 缺省为异步
		 * 		success: 请求成功所执行方法 success(xmlhttp)
		 * 		failure: 请求失败所执行方法 failure(xmlhttp)
		 * @return {}
		 */
		request : function(cfg) {
			if (CU.isEmpty(cfg.method)) cfg.method = "POST";
			if (CU.isEmpty(cfg.async)) cfg.async = true;
			var xmlhttp = CU.createXmlHttp();
			if (cfg.async) {
				if (CU.isFunction(cfg.success)
						|| CU.isFunction(cfg.failure)) {
					xmlhttp.onreadystatechange = function() {
						if (xmlhttp.readyState == 4) {
							if (xmlhttp.status == 200) {
								if (CU.isFunction(cfg.success))
									cfg.success(xmlhttp);
							} else {
								if (CU.isFunction(cfg.failure))
									cfg.failure(xmlhttp);
							}
						}
					};
				}
			}
			xmlhttp.open(cfg.method, cfg.url, cfg.async);
			xmlhttp.setRequestHeader("x-requested-with","XMLHttpRequest");
			var sendparams = null;
			if (CU.isObject(cfg.params)) {
				xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
				sendparams = CU.parseParams(cfg.params);
				if (sendparams.length > 0) sendparams = sendparams.substring(1);
			}
			xmlhttp.send(sendparams);
			if (!cfg.async) {
				if (xmlhttp.status == 200) {
					if (CU.isFunction(cfg.success)) {
						cfg.success(xmlhttp);
					} else {
						return xmlhttp;
					}
				} else {
					if (CU.isFunction(cfg.failure)) {
						cfg.failure(xmlhttp);
					} else {
						return new Error(xmlhttp.responseText);
					}
				}
			}
		},
		
		/**
		 * 获取最顶层父窗口
		 * @param {} win
		 * @return {}
		 */
		getTopOpener : function(win){if(CU.isEmpty(win))win=window;return CU.isEmpty(win.opener) ? win : CU.getTopOpener(win.opener);},
		getTopParent : function() {var curr = window; var parent = null; while(!CU.isEmpty(parent=curr.parent)&&curr!=parent)curr=parent; return CU.isEmpty(parent) ? curr : parent;},
		getParent : function() {var p=window.parent;if(CU.isEmpty(p))p=window;return p;},
		
		
		

		/**
		 * 将二进制数按单位转换
		 * @param v
		 * @return
		 */
		toByteUnit : function(v, space) {
			if(CU.isEmpty(v)) return "";
			v = parseFloat(""+v);
			if(space===null || space===undefined || space!==false) space = " ";
			
			if(v >= 1125899906842624) {
				v = parseInt(((v*100)/1125899906842624),10)/100 + space + "P";
			}else if(v >= 1099511627776) {
				v = parseInt(((v*100)/1099511627776),10)/100 + space + "T";
			}else if(v >= 1073741824) {
				v = parseInt(((v*100)/1073741824),10)/100 + space + "G";
			}else if(v >= 1048576) {
				v = parseInt(((v*100)/1048576),10)/100 + space + "M";
			}else if(v >= 1024) {
				v = parseInt(((v*100)/1024),10)/100 + space + "K";
			}else {
				v = v + space;
			}
			return v + "B";
		},
		
		
		/**
		 * 将二进制数按单位转换
		 * @param v 单位为MB
		 * @return
		 */
		toMegaByteUnit : function(v, space) {
			if(CU.isEmpty(v)) return "";
			v = parseFloat(""+v);
			if(space===null || space===undefined || space!==false) space = " ";
			
			if(v >= 1125899906842624) {
				v = parseInt(((v*100)/1125899906842624),10)/100 + space + "Z";
			}else if(v >= 1099511627776) {
				v = parseInt(((v*100)/1099511627776),10)/100 + space + "E";
			}else if(v >= 1073741824) {
				v = parseInt(((v*100)/1073741824),10)/100 + space + "P";
			}else if(v >= 1048576) {
				v = parseInt(((v*100)/1048576),10)/100 + space + "T";
			}else if(v >= 1024) {
				v = parseInt(((v*100)/1024),10)/100 + space + "G";
			}else {
				v = v + space + "M";
			}
			return v;
		},
		
		/**
		 * 获取number日期, date为日期对象, 为空则为当前日期
		 */
		getNumberDate : function(date) {
			if(CU.isEmpty(date)) date = new Date();
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y*10000 + m*100 + d;
		},
		/**
		 * 获取number日期时间, date为日期对象, 为空则为当前日期
		 */
		getNumberDateTime : function(date) {
			if(CU.isEmpty(date)) date = new Date();
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			var h = date.getHours();
			var mi = date.getMinutes();
			var s = date.getSeconds();
			return y*10000000000 + m*100000000 + d*1000000 + h*10000 + mi*100 + s;
		},
		
		/**
		 * 将日期格式的数值转换成String日期格式, 由yyyyMMdd  -> yyyy-MM-dd
		 * @param dateNum
		 * @return
		 */
		toStringDate : function(dateNum) {
			if(CU.isEmpty(dateNum)) return "";
			var s = dateNum + "";
			if(s.length != 8) return "";
			return s.substring(0,4)+"-"+s.substring(4,6)+"-"+s.substring(6,8);
		},
		
		
		toStringTime : function(dateNum) {
			if(CU.isEmpty(dateNum)) return "";
			var s = dateNum + "";
			if(s.length < 6) {
				for(var i=0; i<6-s.length; i++) {
					s = "0" + s;
				}
			}
			return s.substring(0,2)+":"+s.substring(2,4)+":"+s.substring(4,6);
		},
		
		
		
		/**
		 * 将日期时间格式的数值转换成String日期格式, 由yyyyMMddHHmmss  -> yyyy-MM-dd HH:mm:ss
		 * @param dateTimeNum
		 * @return
		 */
		toStringDateTime : function(dateTimeNum) {
			if(CU.isEmpty(dateTimeNum)) return "";
			var s = dateTimeNum + "";
			if(s.length != 14) return "";
			return s.substring(0,4)+"-"+s.substring(4,6)+"-"+s.substring(6,8)+" "+s.substring(8,10)+":"+s.substring(10,12)+":"+s.substring(12,14);
		},
		
		
		/**
		 * 将日期时间格式的数值转换成String短日期格式, 由yyyyMMddHHmmss  -> MM-dd HH:mm
		 * @param dateTimeNum
		 * @return
		 */
		toShortDateTime : function(dateTimeNum) {
			if(CU.isEmpty(dateTimeNum)) return "";
			var s = dateTimeNum + "";
			if(s.length != 14) return "";
			return s.substring(4,6)+"-"+s.substring(6,8)+" "+s.substring(8,10)+":"+s.substring(10,12);
		},
		
		/**
		 * 将yyyy-MM-dd HH:mm:ss －> yyyyMMddHHmmss格式
		 */
		toNumberDateTime : function(dateTime){
			if(CU.isEmpty(dateTime)) return "";
			var s = dateTime + "";
			return parseInt(s.replace(/[-:\s]/g, ""),10);
		},
		
		/**
		 * 将yyyy-MM-dd －>yyyyMMdd
		 */
		toNumberDate : function(dateTime){
			if(CU.isEmpty(dateTime)) return "";
			var s = dateTime + "";
			return parseInt(s.replace(/[-]/g, ""),10);
		},
		
		toNumberTime : function(time) {
			if(!(/^(\d{1,2}):(\d{1,2})(:(\d{1,2}))?$/.test(time))) return "";
			var arr = (time + "").split(':');
			var s = "";
			for(var i=0; i<arr.length; i++) {
				if((i===0&&parseInt(arr[i],10)>23) || (i!==0&&parseInt(arr[i],10)>59)) {
					return "";
				}
				s += (arr[i].length==1?"0":"")+arr[i];
			}
			if(s.length==4) s += "00";
			return s;
		},
		
		
		/**
		 * yyyyMMdd -> 秒数
		 */
		numberDate2Seconds : function(numberDate) {
			if(CU.isEmpty(numberDate) || !(/^[0-9]{8}$/.test(numberDate=numberDate+""))) return "";
			var s = new Date(CU.toStringDate(numberDate)+" 00:00:00").getTime()/1000;
			return parseInt(s, 10);
		},
		
		/**
		 * yyyyMMddHHmmss -> 秒数
		 */
		numberDateTime2Seconds : function(numberDateTime) {
			if(CU.isEmpty(numberDateTime) || !(/^[0-9]{14}$/.test(numberDateTime=numberDateTime+""))) return "";
			var s = new Date(CU.toStringDateTime(numberDateTime)).getTime()/1000;
			return parseInt(s, 10);
		},
		
		/**
		 * 按时间单位显示时间, time:为秒
		 */
		toTimeUnit : function(time) {
			if(CU.isEmpty(time)) return "";
			var s = "";
			if(time >= 86400) {
				s += parseInt(time/86400, 10)+"天";
				time = time % 86400;
				
				if(time < 3600) {
					s += 0+"小时";
				}
				if(time < 60) {
					s += 0+"分";
				}
			}
			if(time >= 3600) {
				s += parseInt(time/3600, 10)+"小时";
				time = time % 3600;
				
				if(time < 60) {
					s += 0+"分";
				}
			}
			if(time >= 60) {
				s += parseInt(time/60, 10)+"分";
				time = time % 60;
			}
			
			s += time + "秒";
			
			return s;
		},
		
		/**
		 * 记算t1-t2, 结果返回秒数, t1、t2为格式为yyyyMMddHHmmss数值
		 */
		timeDifference : function(t1, t2) {
			var td1 = CU.toDate(CU.toStringDateTime(t1));
			var td2 = CU.toDate(CU.toStringDateTime(t2));
			return parseInt((td1.getTime()-td2.getTime())/1000, 10);
		},
		
		getDropItemRecord : function(def, value) {
			var ls = DROP[def];
			if(!CU.isEmpty(ls)) {
				value = value + "";
				for(var i=0; i<ls.length; i++) {
					if(ls[i].code == value) {
						return ls[i];
					}
				}
			}
			return null;
		},
		
		getDropItemRecordByName : function(def, name) {
			var ls = DROP[def];
			if(!CU.isEmpty(ls)) {
				for(var i=0; i<ls.length; i++) {
					if(ls[i].name == name) {
						return ls[i];
					}
				}
			}
			return null;
		},
		
		
		getDropItemRecordByAlias : function(def, alias) {
			var ls = DROP[def];
			if(!CU.isEmpty(ls)) {
				for(var i=0; i<ls.length; i++) {
					if(ls[i].alias == alias) {
						return ls[i];
					}
				}
			}
			return null;
		},
		
		
		getDropChildItems : function(def, parentCode) {
			var ls = DROP[def];
			if(!CU.isEmpty(ls) && !CU.isEmpty(parentCode)) {
				parentCode = parentCode + "";
				var arr = [];
				for(var i=0; i<ls.length; i++) {
					var item = ls[i];
					if(item.parentCode == parentCode) {
						arr.push(item);
					}
				}
				return arr;
			}
			return null;
		},
		
		
		addArrayDropList : function(dropName, array) {
			if(CU.isEmpty(dropName) || CU.isEmpty(array)) return ;
			if(typeof(array)=="string") array = array.split(",");
			if(!CU.isArray(array)) return ;
			var items = [];
			for(var i=0; i<array.length; i++) {
				var v = CU.trim(array[i] + "");
				if(v.length == 0) continue;
				items.push({code:v, name:v});
			}
			DROP[CU.trim(dropName+"")] = items;
		},
		
		addNumberDropList : function(dropName, start, end) {
			if(CU.isEmpty(dropName) || CU.isEmpty(start) || CU.isEmpty(end)) return ;
			start = parseInt(start, 10);
			end = parseInt(end, 10);
			var items = [];
			for(var i=start; i<=end; i++) {
				items.push({code:i, name:i});
			}
			DROP[CU.trim(dropName+"")] = items;
		},
		
		
		clearlyElement : function(el) {
			if(CU.isEmpty(el)) return null;
			if(typeof(el)=="string") {
				el = $("#"+el);
			}else {
				el = $(el);
			}
			return el;
		},

		ip2String : function(ip) {
			ip = parseInt(ip, 10);
			if(ip > 300000000000) ip -= 300000000000;
			var ips = ""+ip;
			var s = "";
			
			for(var i=0; ips.length>0; i++) {
				if(i > 0) s = "." + s;
				
				var a = "";
				if(ips.length > 3) {
					a = ips.substring(ips.length-3, ips.length);
					ips = ips.substring(0, ips.length-3);
				}else {
					a = ips;
					ips = "";
				}
				var b = parseInt(a, 10);
				
				s = b + s;
			}
			return s;
		},
		
		toStoreObject : function(obj, robj, prix) {
			if(!CU.isObject(obj) || !CU.isObject(robj)) return ;
			for(var key in obj) {
				var value = obj[key];
				if(!CU.isEmpty(prix)) key = prix+"."+key;
				if(CU.isObject(value)) {
					CU.toStoreObject(value, robj, key);
				}else {
					robj[key] = value;
				}
			}
		},
		
		toStoreData : function(data) {
			var rdata = [];
			if(!CU.isEmpty(data) && CU.isArray(data)) {
				for(var i=0; i<data.length; i++) {
					var robj = {};
					CU.toStoreObject(data[i], robj, "");
					rdata.push(robj);
				}
			}
			return rdata;
		},
		
		
		upfirstChar : function(s) {
			return CU.upperFirstChar(s);
		},
		
		onlyInteger : function(el) {
			var el = $(el);
			if(el.length <= 0) return ;
			el.keypress(function (event) {
		        var eventObj = event || e;
		        var keyCode = eventObj.keyCode || eventObj.which;
		        return keyCode >= 48 && keyCode <= 57;
		    });
			el.keyup(function (event) {
				if(!(/^\d+$/.test($(this).val()))) {
					$(this).val("");
				}
		    });
		},
		
		/**
		 * 将数据格式化
		 * @param val : 需要转化的值
		 * 		  format : byte|time|date|datetime|f2|f4|3num|dict|enum
		 * 												byte : 转换为字节单位
		 * 												time : 转换为时间单位
		 * 												date : 转换为日期格式
		 * 												datetime : 转换为日期时间格式
		 * 												f2 : 转换为2位小数, 如果小数位不够2位则被省略
		 * 												f4 : 转换为4位小数, 如果小数位不够4位则被省略
		 * 												fee2 : 转换为2位小数, 强制2位小数
		 * 												fee4 : 转换为4位小数, 强制4位小数
		 * 												3num : 3位逗号数字格式
		 * 												dict|enum: 字典
		 * 					format也可以是一个函数, format(val, dict, addcolor)
		 * 			dict : 如果format=dict|enum, 指定字典名
		 * 			addcolor : 如果format=dict|enum, 指定是否带颜色, 缺省为false (注意:如果带颜色则是<font>标签)
		 */
		format : function(val, format, dict, addcolor){
			if(CU.isEmpty(val) || CU.isEmpty(format)) {
				return val;
			}
			if(CU.isFunction(format)) {
				return format(val, dict, addcolor);
			}
			
			format = CU.trim(format+"").toLowerCase();
			val = CU.trim(val+"");
			if(format=="byte") {
				val = CU.toByteUnit(val);
			}else if(format=="time") {
				val = CU.toStringTime(val);
			}else if(format=="date") {
				val = CU.toStringDate(val);
			}else if(format=="datetime") {
				val = CU.toStringDateTime(val);
			}else if(format=="f2") {
				val = parseFloat(val)/100;
			}else if(format=="f4") {
				val = parseFloat(val)/10000;
			}else if(format=="fee2") {
				val = (parseFloat(val)/100).toFixed(2);
			}else if(format=="fee4") {
				val = (parseFloat(val)/10000).toFixed(4);
			}else if(format=="3num") {
				val = CU.to3BitNumberFormat(val);
			}else if(format=="dict" || format=="enum") {
				if(!CU.isEmpty(dict)) {
					addcolor = CU.isTrue(addcolor);
					val = PU.getDropValue(dict,  val, addcolor);
				}
			}else {
				throw "The format is wrong : "+format+".";
			}
			return val;
		},
		
		format3BitNumberField : function(el) {
			var el = $(el);
			if(el.length <= 0) return ;
			if(el.length > 1) {
				for(var i=0; i<el.length; i++) {
					CU.format3BitNumberField(el[i]);
				}
			}else {
				var el_this = el[0];
				var pos = el_this.selectionStart;
				var v = el.val();
				var s = CU.to3BitNumberFormat(v);
				el.val(s);
				pos += (s.length-v.length);
				CU.setInputCursorPosition(el, pos);
			}
		},
		
		
		
		to3BitNumberFormat : function(num) {
			if(CU.isEmpty(num)) return num;
			var s = CU.trim(num + "");
			var cs = [];
			for(var i=0; i<s.length; i++) {
				var c = s.charAt(i);
				if(/\d+/.test(c)) {
					cs.push(c);
				}
			}
			var rs = [];
			for(var i=cs.length-1,j=0; i>=0; i--,j++) {
				rs.push(cs[i]);
				if(j!=0 && j%3==2 && j<cs.length-1) {
					rs.push(',');
				}
			}
			cs = [];
			for(var i=rs.length-1; i>=0; i--) {
				cs.push(rs[i]);
			}
			s = cs.join("");
			return s;
		},
		
		
		
		encodeBase64 : function(s) {
			if(CU.isEmpty(s)) return s;
			s = encodeURIComponent(s);
			return btoa(s);
		},
		decodeBase64 : function(s) {
			if(CU.isEmpty(s)) return s;
			var rs = atob(s);
			if(rs.indexOf('%') >= 0) {
				rs = decodeURIComponent(rs);
			}
			return rs;
		},
		
		confuse : function(s) {
			if(CU.isEmpty(s)) return s;
			s = encodeURIComponent(s);
			
			var a = CU.getUUID().substring(0,5);
			s = a.substring(0,1) + s.substring(0,1)
			  + a.substring(1,2) + s.substring(1,2)
			  + a.substring(2,3) + s.substring(2,3)
			  + a.substring(3,4) + s.substring(3,4)
			  + a.substring(4,5) + s.substring(4,5)
			  + s.substring(5);
			s = btoa(s);
			
			s = a.substring(0,1) + s.substring(0,1)
			  + a.substring(1,2) + s.substring(1,2)
			  + a.substring(2,3) + s.substring(2,3)
			  + a.substring(3,4) + s.substring(3,4)
			  + a.substring(4,5) + s.substring(4,5)
			  + s.substring(5);
			return s;
		},
		
		getDefaultIconStyle : function() {
			return "max-width:20px;max-height:20px;";
		},
		
		/**
		 * onlyImg : css是否只作用户img标签, 缺省为false
		 */
		getIconHtml : function(icon, style, onlyImg) {
			if(CU.isEmpty(icon)) return "";
			icon = $.trim(icon);
			if(icon.startsWith("http://") || icon.startsWith("https://") || icon.startsWith("/") || icon.startsWith("./") || icon.startsWith("../")) {
				if(icon.startsWith("/") && !icon.startsWith(ContextPath)) {
					icon = ContextPath + icon;
				}
				return '<img src="'+icon+'" style="'+CU.getDefaultIconStyle()+(CU.isEmpty(style)?'':style)+'"></img>';
			}else {
				return '<i class="'+icon+'" '+(CU.isEmpty(style)||onlyImg===true?'':('style="'+style+'"'))+'></i>';
			}
		},
		text2Html : function(text) {
			if(CU.isEmpty(text)) return "";
			return text.replace(/</g,"&lt;").replace(/>/g,"&gt;")
						.replace(/\n/g,"<br>").replace(/ /g,"&nbsp;").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
		},
		correctUrl : function(url) {
			if(CU.isEmpty(url)) return "/";
			url = CU.trim(url);
			if(url.startsWith("http://") || url.startsWith("https://")) {
				return url;
			}
			if(!url.startsWith('/')) {
				url = "/" + url;
			}
			if(!url.startsWith(ContextPath)) {
				url = ContextPath + url;
			}
			return url;
		},
		
		
		setInputCursorRange : function(el, start, end) {
			el = $(el)[0];
			if('selectionStart' in el) {
				el.selectionStart = start;
				el.selectionEnd = end;
			} else if(el.setSelectionRange) {
				el.setSelectionRange(start, end);
			} else if(el.createTextRange) {
				var range = el.createTextRange();
				range.collapse(true);
				range.moveStart('character', start);
				range.moveEnd('character', end);
				range.select();
			}
		},
		
		setInputCursorPosition : function(el, position) {
			CU.setInputCursorRange(el, position, position);
		},
		
		getUUID : function() {
		    var d = new Date().getTime();
		    if (window.performance && typeof window.performance.now === "function") {
		        d += performance.now(); //use high-precision timer if available
		    }
		    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		        var r = (d + Math.random() * 16) % 16 | 0;
		        d = Math.floor(d / 16);
		        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		    });
		    return uuid;
		},
		
		toHtmlAttrs : function(data, fields) {
			if(CU.isEmpty(data)) return "";
			if(CU.isEmpty(fields)) {
				fields = [];
				for(var key in data) {
					if(!CU.isEmpty(key) && !CU.isFunction(data[key])) {
						fields.push(key);
					}
				}
			}
			var html = [];
			for(var i=0; i<fields.length; i++) {
				var value = data[fields[i]];
				if(CU.isEmpty(value)) continue;
				html.push("data-"+fields[i]+"=\""+value+"\"");
			}
			return html.join(" ");
		},
		
		getHtmlAttrs : function(el, fields) {
			if(CU.isEmpty(el) || CU.isEmpty(fields)) return ;
			el = $(el);
			var data = {};
			for(var i=0; i<fields.length; i++) {
				var v = el.attr("data-"+fields[i]);
				if(!CU.isEmpty(v)) {
					data[fields[i]] = v;
				}
			}
			return data;
		},
		
		/**
		 * 获取指定日期start至end之间的时间序列, 格式yyyyMMdd, 返回数组第一个元素为start
		 */
		getDateSeries : function(start, end) {
			var array = [start];
			if(start < end) {
				var t = new Date(CU.toStringDate(start)+" 00:00:00").getTime()/1000*1000;
				var dt = 24*60*60*1000;
				for(var i=0; ; i++) {
					var d = CU.getNumberDate(new Date(t+dt*(i+1)));
					array.push(d);
					if(d >= end) {
						break ;
					}
				}
			}
			return array;
		},
		
		/**
		 * 获取指定日期向前推days天的时间序列, 格式yyyyMMdd, date如果为空则则当天日期, 返回数组第一个元素为最小日期
		 */
		getBeforeDateSeries : function(days, date) {
			if(CU.isEmpty(date) || date<=0) date = CU.getNumberDate();
			var array = [date];
			var t = new Date().getTime()/1000*1000;
			var dt = 24*60*60*1000;
			for(var i=0; i<days; i++) {
				var d = new Date(t-dt*(i+1));
				array.push(CU.getNumberDate(d));
			}
			var rs = [];
			for(var i=array.length-1; i>=0; i--) {
				rs.push(array[i]);
			}
			return rs;
		},
		
		/**
		 * 获取指定日期向前推days天的时间序列, 格式yyyyMMdd, date如果为空则则当天日期, 返回数组第一个元素为最小日期
		 */
		getAfterDateSeries : function(days, date) {
			if(CU.isEmpty(date) || date<=0) date = CU.getNumberDate();
			var array = [date];
			var t = new Date().getTime()/1000*1000;
			var dt = 24*60*60*1000;
			for(var i=0; i<days; i++) {
				var d = new Date(t+dt*(i+1));
				array.push(CU.getNumberDate(d));
			}
			return array;
		},
		
		parseStyle2Object : function(style) {
			var o = {};
			if(!CU.isEmpty(style)) {
				var arr = style.split(";");
				for(var i=0; i<arr.length; i++) {
					var s = CU.trim(arr[i]);
					var idx = s.indexOf(':');
					if(idx <= 0) continue;
					var k = CU.trim(s.substring(0, idx));
					var v = CU.trim(s.substring(idx+1));
					if(k.length>0 && v.length>0) {
						o[k] = v;
					}
				}
			}
			return o;
		},
		
		parseObject2Style : function(obj) {
			if(!CU.isObject(obj)) return "";
			var arr = [];
			for(var k in obj) {
				if(CU.isEmpty(k)) continue;
				var v = obj[k];
				if(CU.isEmpty(v)) continue;
				k = CU.trim(k+"");
				v = CU.trim(v+"");
				if(k.length>0 && v.length>0) {
					arr.push(k,":",v,";");
				}
			}
			return arr.join("");
		},
		
		getContextPath : function() {
			var url = window.location.href + "";
			var path = "";
			if(url.startsWith("http://") || url.startsWith("https://")) {
				url = url.substring(8);
				var idx = url.indexOf("/");
				if(idx >= 0) {
					url = url.substring(idx+1);
					idx = url.indexOf("/");
					if(idx >= 0) {
						path = "/" + url.substring(0, idx);
					}
				}
			}
			return path;
		},
		
		getWebRoot : function() {
			var url = CU.trim(window.location.href + "");
			var idx = url.startsWith("https://") ? 8 : 7;
			var prefix = url.substring(0, idx);
			var path = url.substring(idx);
			
			idx = path.indexOf('/');
			if(idx <= 0) {
				return url;
			}
			var domain = path.substring(0, idx);
			path = path.substring(idx);
			var root = prefix + domain;
			if(!CU.isEmpty(window.ContextPath) && window.ContextPath.length>1 && path.startsWith(window.ContextPath)) {
				root += window.ContextPath;
			}
			return root;
		},
		
		/**
		 * 除掉参数等信息, 只保留路径
		 * @param {} url
		 */
		getUri : function(url) {
			if(!CU.isEmpty(url)) {
				url = CU.trim(url+"");
				idx = url.indexOf('?');
				if(idx >= 0) url = url.substring(0, idx);
				
				idx = url.indexOf('#');
				if(idx >= 0) url = url.substring(0, idx);
			}
			return url;
		},
		
		/**
		 * 获取参数
		 */
		getQueryString : function(url) {
			var s = "";
			if(!CU.isEmpty(url)) {
				url = CU.trim(url+"");
				idx = url.indexOf('?');
				if(idx >= 0) {
					s = url.substring(idx+1);
					
					idx = s.indexOf('#');
					if(idx >= 0) s = s.substring(0, idx);
				}
			}
			return s;
		},
		
		/**
		 * 获取URL访问域
		 */
		getDomain : function(url) {
			if(CU.isEmpty(url) || (url=CU.trim(url+"")).length==0 || (!url.startsWith("http://")&&!url.startsWith("https://"))) {
				return "";
			}
			var domain = url.substring(url.indexOf("//")+2);
			var idx = domain.indexOf('/');
			if(idx >= 0) {
				return domain.substring(0, idx);
			}else {
				return domain;
			}
		},
		
		/**
		 * 获取当前页访问域
		 * @return {}
		 */
		getMyDomain : function() {
			return CU.getDomain(window.location.href + "");
		},
		
		
		/**
		 * 替换domain
		 * @param {} url
		 * @param {} domain
		 */
		replaceDomain : function(url, domain) {
			if(CU.isEmpty(url) || (url=CU.trim(url+"")).length==0 || (!url.startsWith("http://")&&!url.startsWith("https://"))) {
				return url;
			}
			if(CU.isEmpty(domain)) domain = "";
			
			var idx = url.indexOf('//');
			var p = url.substring(0, idx+2);
			var s = url.substring(idx+2);
			idx = s.indexOf('/');
			
			var rurl = p + domain;
			if(idx >= 0) {
				rurl += s.substring(idx);
			}
			return rurl;
		},
		
		/**
		 * 判断URL是否跨域
		 */
		isCrossDomain : function(url) {
			var domain = CU.getDomain(url);
			if(CU.isEmpty(domain)) {
				return false;
			}
			var mydomain = CU.getDomain(window.location.href + "");
			return domain != mydomain;
		},
		
		/**
		 * depth : name中如果带[.]是否按层级获取数据, 缺省为true
		 */
		getObjectValue : function(obj, name, defVal, depth) {
			var v = null;
			if(CU.isObject(obj) && !CU.isEmpty(name)) {
				name = CU.trim(name+"");
				if(depth!==false && name.indexOf('.')>=0) {
					var array = name.split('.');
					for(var i=0; i<array.length; i++) {
						if(i == 0) v = obj;
						var n = array[i];
						v = CU.getObjectValue(v, n, null, false);
						if(CU.isEmpty(v)) break;
					}
				}else {
					v = obj[name];
				}
			}
			if(v===undefined || v===null) {
				v = defVal;
			}
			return v;
		},
		
		getObjectFields : function(obj, fields) {
			var bean = {};
			if(!CU.isObject(obj) || CU.isEmpty(fields)) return bean;
			if(!CU.isArray(fields)) fields = (fields+"").split(',');
			for(var i=0; i<fields.length; i++) {
				var k = CU.trim(fields[i]);
				if(k.length == 0) continue;
				var v = CU.getObjectValue(obj, k);
				if(v===undefined || v===null) continue ;
				bean[k] = v;
			}
			return bean;
		},
		
		getObjectArrayValues : function(array, name, defVal, depth) {
			var vals = [];
			if(!CU.isEmpty(array) && array.length>0) {
				for(var i=0; i<array.length; i++) {
					var o = array[i];
					vals.push(CU.getObjectValue(o, name, defVal, depth));
				}
			}
			return vals;
		},
		
		
		getWindowCosyHeight : function() {
			var h = $(window).height();
			if(h < 200) return 200;
			if(h <= 700) return h - 50;
			if(h <= 800) return h - 100;
			if(h <= 900) return h - 150;
			h = h - 200;
			if(h > 800) h = 800;
			return h;
		},
		
		
		isWebHttps : function() {
			var url = CU.trim(window.location.href + "");
			return CU.isHttps(url);
		},
		
		isHttps : function(url) {
			return CU.trim(url+"").startsWith("https://");
		},
		
		toHttps : function(url) {
			if(CU.isEmpty(url)) return url;
			url = CU.trim(url);
			if(url.startsWith("http://")) url = "https://" + url.substring(7);
			return url;
		},
		
		
		/**
		 * 将参数url的协议与当前页面保持一至
		 * @param {} url
		 */
		standardizingProtocol : function(url) {
			if(!CU.isEmpty(url)) {
				url = CU.trim(url+"");
				
				var urltype = 0;		//1=http	2=https
				if(url.startsWith("http://")) urltype = 1;
				if(urltype==0 && url.startsWith("https://")) urltype = 2;
				
				var root = CU.trim(window.location.href + "");
				var roottype = 0;
				if(root.startsWith("http://")) roottype = 1;
				if(roottype==0 && root.startsWith("https://")) roottype = 2;
				
				if(urltype>0 && roottype>0 && urltype!=roottype) {
					if(urltype == 1) {
						url = "https://" + url.substring(7);
					}else {
						url = "http://" + url.substring(8);
					}
				}
			}
			return url;
		},
		
		
		
		/**
		 * 将参数url的协议和domain与当前页面保持一至
		 * @param {} url
		 */
		standardizingProtocolAndDomain : function(url) {
			if(!CU.isEmpty(url)) {
				//先统一协议
				url = CU.standardizingProtocol(url);
				
				//获取当前域
				var domain = CU.getMyDomain();
				//替换域
				url = CU.replaceDomain(url, domain);
			}
			return url;
		},
		
		
		standardizingProtocolGlobalUrls : function(urlNames) {
			if(!CU.isEmpty(urlNames)) {
				if(!CU.isArray(urlNames)) urlNames = (urlNames+"").split(",");
				for(var i=0; i<urlNames.length; i++) {
					var name = urlNames[i];
					var url = window[name];
					if(!CU.isEmpty(url)) {
						window[name] = CU.standardizingProtocol(url);
					}
				}
			}
		},
		
		standardizingProtocolDomainGlobalUrls : function(urlNames) {
			if(!CU.isEmpty(urlNames)) {
				if(!CU.isArray(urlNames)) urlNames = (urlNames+"").split(",");
				for(var i=0; i<urlNames.length; i++) {
					var name = urlNames[i];
					var url = window[name];
					if(!CU.isEmpty(url)) {
						window[name] = CU.standardizingProtocolAndDomain(url);
					}
				}
			}
		},
		
		upperFirstChar : function(s) {
			if(CU.isEmpty(s)) return s;
			return s.substring(0,1).toUpperCase()+s.substring(1);
		},
		lowerFirstChar : function(s) {
			if(CU.isEmpty(s)) return s;
			return s.substring(0,1).toLowerCase()+s.substring(1);
		},
		
		
		parseVariable : function(s, ps) {
			if(CU.isEmpty(s)) return s;
			var idx = s.indexOf("${");
			var s1 = "";
			var s2 = s;
			var hasps = CU.isObject(ps);
			while(idx >= 0) {
				s1 += s2.substring(0, idx);
				s2 = s2.substring(idx+2);
				
				var ridx = s2.indexOf("}");
				if(ridx >= 0) {
					var k = CU.trim(s2.substring(0, ridx));
					s2 = s2.substring(ridx+1);
					if(k.length>0 && hasps) {
						var v = ps[k];
						if(!CU.isEmpty(v)) {
							s1 += v;
						}
					}
				}
				idx = s2.indexOf("${");
			}
			if(s2.length > 0) s1 += s2;
			return s1;
		},
		
		
		getDefaultLangName : function() {
			if(!CU.isEmpty(window.LANGS)) {
				return window.LANGS["DEFAULT_LANG"];
			}
			return null;
		},
		
		getCurrentLangName : function() {
			var name = "";
			if(!CU.isEmpty(window.LANGS)) {
				name = window.LANGS["CURRENT_LANG"];
			}
			if(CU.isEmpty(name) && CU.isObject(window.SU)) {
				name = window.SU.language;
			}
			return name;
		},
		
		getLang : function(code, def, ps) {
			if(CU.isEmpty(code)) return "";
			code = CU.trim(code);
			var v = null;
			if(!CU.isEmpty(window.LANGS)) {
				var cn = CU.getCurrentLangName();
				var dn = CU.getDefaultLangName();
				
				var ct = null;
				var dt = null;
				if(!CU.isEmpty(cn)) ct = window.LANGS[cn];
				if(!CU.isEmpty(dn)) dt = window.LANGS[dn];
				if(!CU.isEmpty(ct)) v = ct[code];
				if(CU.isEmpty(v) && !CU.isEmpty(dt)) v = dt[code];
			}
			if(CU.isEmpty(v)) v = def;
			if(!CU.isEmpty(v)) v = CU.parseVariable(v, ps);
			if(CU.isEmpty(v)) v = "";
			return v;
		},
		
		
		getLangByDval : function(v) {
			if(CU.isEmpty(v)) return "";
			v = CU.trim(v);
			if(!CU.isEmpty(window.LANGS)) {
				var cn = CU.getCurrentLangName();
				var dn = CU.getDefaultLangName();
				if(!CU.isEmpty(dn) && cn!=dn) {
					var rdt = window.LANGS["R_DEFAULT"];
					if(CU.isEmpty(rdt)) {
						rdt = {};
						var dt = window.LANGS[dn];
						if(!CU.isEmpty(dt)) {
							for(var key in dt) {
								var lv = dt[key];
								if(!CU.isEmpty(key) && !CU.isEmpty(lv)) {
									rdt[CU.trim(lv)] = key;
								}
							}
						}
						window.LANGS["R_DEFAULT_LANG"] = rdt;
					}
					var dv = rdt[v];
					if(!CU.isEmpty(dv)) {
						v = CU.getLang(dv, v);
					}
				}
			}
			if(CU.isEmpty(v)) v = "";
			return v;
		},
		
		translatePageLang : function(el_parent) {
			var els = null;
			if(CU.isEmpty(el_parent)) {
				els = $(".tannux-language");
			}else {
				els = CU.clearlyElement(el_parent).find(".tannux-language");
			}
			
			if(!CU.isEmpty(els) && els.length>0) {
				for(var i=0; i<els.length; i++) {
					var el = $(els[i]);
					var code = el.attr("tannux-lang-code");
					if(!CU.isEmpty(code)) {
						var def = el.attr("tannux-lang-default");
						var params = el.attr("tannux-lang-params");
						var ps = null;
						var assign = el.attr("tannux-lang-assign");	//赋值类型, html, value, 缺省为html
						if(!CU.isEmpty(params) && (params=CU.trim(params)).length>0 && params.substring(0)=='{' && params.substring(params.length-1)=='}') {
							try {
								ps = CU.toObject(params);
							}catch(e) {
								console.error("parse tannux-lang-params '"+params+"' error : " + e);
							}
						}
						if(CU.isEmpty(assign)) assign = "html";
						
						var v = CU.getLang(code, def, ps);
						if(assign.indexOf("html")>=0) el.html(v);
						if(assign.indexOf("value")>=0) el.val(v);
						if(assign.indexOf("title")>=0) el.attr("title", v);
					}
				}
			}
		},
		
		
		getClientId : function() {
			var n = "TANNUX_CLIENT_ID";
			var id = window.localStorage.getItem(n);
			if(CU.isEmpty(id) || id.length!=64) {
				var uuid = CU.getUUID().replace(/-/g, "");
				var m5 = $.md5(uuid);
				if(uuid.length!=32 || m5.length!=32) {
					throw "get client id error.";
				}
				var arr = [];
				for(var i=0; i<32; i++) {
					arr.push(uuid.charAt(i));
					arr.push(m5.charAt(i));
				}
				
				id = arr.join("");
				window.localStorage.setItem(n, id);
			}
			return id;
		},
		
		/**
		 * 将后台数据转换为时间序列数据
		 * @param {} param
		 * 			data : 数据, [{x:"", y:"", z:""} ... ]
		 * 			x:function(x, row){}, x值处理事件
		 * 			y:function(y, row){}, y值处理事件
		 * 			z:function(z, row){}, z值处理事件
		 * 			yempty:function(x,z){}, y值为空事件, 缺省时y为0
		 * 			summary : 是否统计
		 * 			sumzn : 统计的z名称, 缺省为:"合计"
		 * @return {
		 * 		xs:[], 所有x轴值
		 * 		zs:[], 所有z轴值
		 * 		series:[{name:zn, type:"line", data:[y,...]} ...], n为z值, data为y值对应x的每个值, 数组长度与xs长度一值
		 * }
		 */
		parseChartLineData : function(param) {
			var data = param.data;
			var xfun = param.x;
			var yfun = param.y;
			var zfun = param.z;
			var yempty = param.yempty;
			var hasx = CU.isFunction(xfun);
			var hasy = CU.isFunction(yfun);
			var hasz = CU.isFunction(zfun);
			var hasyempty = CU.isFunction(yempty);
			
			var xs = [];
			var zs = [];
			var ym = {};	//key=x$z, value=y
			for(var i=0; i<data.length; i++) {
				var row = data[i];
				var x = row.x;
				var y = row.y;
				var z = row.z;
				if(hasx) x = xfun(x, row);
				if(hasy) y = yfun(y, row);
				if(hasz) z = zfun(z, row);
				if(CU.isEmpty(x) || CU.isEmpty(z)) continue;
				if(xs.indexOf(x) < 0) xs.push(x);
				if(zs.indexOf(z) < 0) zs.push(z);
				ym[x+"$"+z] = y;
			}
			
			var series = [];
			for(var i=0; i<zs.length; i++) {
				var z = zs[i];
				var ys = [];
				for(var j=0; j<xs.length; j++) {
					var x = xs[j];
					var y = ym[x+"$"+z];
					if(CU.isEmpty(y)) {
						if(hasyempty) y = yempty(x,z);
					}
					if(CU.isEmpty(y))y = 0;
					ys.push(y);
				}
				series.push({name:z, type:"line", data:ys});
			}
			
			if(param.summary===true || param.summary=="true" || param.summary==1 || param.summary=="1") {
				var sumzn = param.sumzn;
				if(CU.isEmpty(sumzn)) sumzn = "合计";
				
				var sumys = new Array(xs.length);
				for(var i=0; i<series.length; i++) {
					var serie = series[i];
					var ys = serie.data;
				
					for(var j=0; j<ys.length; j++) {
						var y = ys[j];
						
						var sumy = sumys[j];
						if(CU.isEmpty(sumy)) {
							sumy = y;
						}else {
							sumy += y;
						}
						sumys[j] = sumy;;
					}
				}
				zs.push(sumzn);
				series.push({name:sumzn, type:"line", data:sumys});
			}
			return {xs:xs, zs:zs, series:series};
		},
		
		
		/**
		 * 获取图标排列宽度
		 * @param {} containerWidth : 存放图标的容器宽度, 缺省为屏幕宽度
		 * @param {} minWidth : 图标的最小宽度, 缺省为100
		 * @return {width:xxx, cols:xxx}
		 */
		getThumbWidth : function(containerWidth, minWidth) {
			if(CU.isEmpty(containerWidth)) containerWidth = $(window).width();
			if(CU.isEmpty(minWidth)) minWidth = 100;
			
			var count = parseInt(containerWidth/minWidth, 10);
			var width = parseInt(containerWidth/count);
			return {width:width, cols:count};
		}
};


/**
 * 线程不安全
 * @returns
 */
function Queue() {
	var thiz = this;
	this.queue = {};
	this.popIndex = 1;
	this.pushIndex = 0;
	this.size = 0;
	
	this.add = function(value) {
		if(value===null || value===undefined) return false;
		thiz.pushIndex ++;
		var key = thiz.pushIndex;
		thiz.queue[key] = value;
		thiz.size ++ ;
		return true;
	};
	
	this.del = function(value) {
		if(value===null || value===undefined) return false;
		var ks = [];
		for(var k in thiz.queue) {
			var v = thiz.queue[k];
			if(v == value) {
				ks.push(k);
			}
		}
		if(ks.length > 0) {
			for(var i=0; i<ks.length; i++) {
				delete thiz.queue[ks[i]];
				thiz.size -- ;
			}
		}
		return ks.length;
	};
	
	this.delByKey = function(keyName, keyValue) {
		if(keyName===null || keyName===undefined || keyValue===null || keyValue===undefined) return false;
		var ks = [];
		for(var k in thiz.queue) {
			var v = thiz.queue[k];
			if(CU.isObject(v) && v[keyName]==keyValue) {
				ks.push(k);
			}
		}
		if(ks.length > 0) {
			for(var i=0; i<ks.length; i++) {
				delete thiz.queue[ks[i]];
				thiz.size -- ;
			}
		}
		return ks.length;
	};
	
	
	this.push = function(array) {
		if(array === null || array === undefined) return ;
		if(CU.isArray(array)) {
			for(var i=0; i<array.length; i++) {
				thiz.add(array[i]);
			}
		}else {
			thiz.add(array);
		}
	};
	
	this.pop = function() {
		var v = null;
		while(thiz.size>0 && thiz.popIndex<=thiz.pushIndex) {
			var key = thiz.popIndex;
			v = thiz.queue[key];
			if(v!==null && v!==undefined) {
				thiz.popIndex ++ ;
				thiz.size -- ;
				delete thiz.queue[key];
				break ;
			}else {
				thiz.popIndex ++ ;
			}
		}
		return v;
	};
	
	
	this.remove = function(array) {
		if(array===null || array===undefined) return 0;
		var count = 0;
		if(CU.isArray(array)) {
			for(var i=0; i<array.length; i++) {
				var c = thiz.del(array[i]);
				count += c;
			}
		}else {
			var c = thiz.del(array);
			count += c;
		}
		return count;
	};
	
	this.removeByKey = function(keyName, keyValues) {
		if(keyName===null || keyName===undefined || keyValues===null || keyValues===undefined) return false;
		var count = 0;
		if(CU.isArray(keyValues)) {
			for(var i=0; i<keyValues.length; i++) {
				var c = thiz.delByKey(keyName, keyValues[i]);
				count += c;
			}
		}else {
			var c = thiz.delByKey(keyName, keyValues);
			count += c;
		}
		return count;
	};
	
	
	this.clear = function() {
		delete thiz.queue;
		thiz.queue = {};
		thiz.popIndex = 1;
		thiz.pushIndex = 0;
		thiz.size = 0;
	};
	
	
	/**
	 * direction : 遍历方向, true=正向(从头遍历), false=逆向(从尾遍历)
	 */
	this.each = function(direction, cb) {
		if(!CU.isFunction(cb)) return ;
		if(direction !== false) {
			var key = thiz.popIndex;
			var idx = 0;
			while(thiz.size>0 && key<=thiz.pushIndex) {
				var v = thiz.queue[key];
				if(v!==null && v!==undefined) {
					var ba = cb(v, idx);
					if(ba === false) break;
					idx ++ ;
				}
				key ++ ;
			}
		}else {
			var key = thiz.pushIndex;
			var idx = 0;
			while(thiz.size>0 && key>=thiz.popIndex) {
				var v = thiz.queue[key];
				if(v!==null && v!==undefined) {
					var ba = cb(v, idx);
					if(ba === false) break;
					idx ++ ;
				}
				key -- ;
			}
		}
	};
	
	
	this.start = function(size) {
		if(CU.isEmpty(size) || typeof(size)!="number" || size<=0) return ;
		var array = [];
		thiz.each(true, function(v, idx) {
			array.push(v);
			if(array.length == size) {
				return false;
			}
		});
		return array;
	};
	
	
	this.end = function(size) {
		if(CU.isEmpty(size) || typeof(size)!="number" || size<=0) return ;
		var array = [];
		thiz.each(false, function(v, idx) {
			array.push(v);
			if(array.length == size) {
				return false;
			}
		});
		return array;
	};
	
	
	/**
	 * 按对象记录中的id定位, 获取之后的元素
	 * @param inclusiveKey : 是否包含参数id, 缺省为false
	 */
	this.find = function(keyName, keyValue, inclusiveKey, size, direction) {
		if(CU.isEmpty(keyName) || CU.isEmpty(keyValue) || size<=0) return ;
		var array = [];
		var finded = false;
		thiz.each(direction, function(v, idx) {
			if(v[keyName] == keyValue) {
				finded = true;
				if(inclusiveKey) {
					array.push(v);
					if(array.length == size) {
						return false;
					}
				}
			}else {
				if(finded) {
					array.push(v);
					if(array.length == size) {
						return false;
					}
				}
			}
		});
		return array;
	};
	
	
	this.page = function(pageNum, pageSize, direction) {
		if(CU.isEmpty(pageNum) || typeof(pageNum)!="number" || pageNum<=0) return ;
		if(CU.isEmpty(pageSize) || typeof(pageSize)!="number" || pageSize<=0) return ;
		var skipCount = (pageNum-1) * pageSize;
		var array = [];
		thiz.each(direction, function(v, idx) {
			if(idx >= skipCount) {
				array.push(v);
			}
			if(array.length == pageSize) {
				return false;
			}
		});
		return array;
	};
	
	
}





/**
 * 线程不安全
 * @returns
 */
function Stack() {
	var thiz = this;
	this.stack = {};
	this.pushIndex = 0;
	this.size = 0;
	
	this.add = function(value) {
		if(value===null || value===undefined) return false;
		thiz.pushIndex ++;
		var key = thiz.pushIndex;
		thiz.stack[key] = value;
		thiz.size ++ ;
		return true;
	};
	
	
	this.push = function(array) {
		if(array === null || array === undefined) return ;
		if(CU.isArray(array)) {
			for(var i=0; i<array.length; i++) {
				thiz.add(array[i]);
			}
		}else {
			thiz.add(array);
		}
	};
	
	this.pop = function() {
		var v = null;
		if(thiz.size>0 && thiz.pushIndex>0) {
			var key = thiz.pushIndex;
			v = thiz.stack[key];
			
			thiz.pushIndex -- ;
			thiz.size -- ;
			delete thiz.stack[key];
		}
		return v;
	};
	
	
	this.clear = function() {
		delete thiz.stack;
		thiz.stack = {};
		thiz.pushIndex = 0;
		thiz.size = 0;
	};
	
	
}

