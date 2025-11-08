/*!
 * tannux-web v3.1.0 (http://tannux.com)
 * Copyright 2014-2025 Tannux Technology Co., LTD
 * Licensed under the Apache License, Version 2.0.
 */
 
var REGION_PROV_CITY = [{"n":"北京市","cs":["北京市"]},{"n":"天津市","cs":["天津市"]},{"n":"河北省","cs":["石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","沧州市","廊坊市","衡水市"]},{"n":"山西省","cs":["太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁市"]},{"n":"内蒙古自治区","cs":["呼和浩特市","包头市","乌海市","赤峰市","通辽市","鄂尔多斯市","呼伦贝尔市","巴彦淖尔市","乌兰察布市","兴安盟","锡林郭勒盟","阿拉善盟"]},{"n":"辽宁省","cs":["沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","锦州市","营口市","阜新市","辽阳市","盘锦市","铁岭市","朝阳市","葫芦岛市"]},{"n":"吉林省","cs":["长春市","吉林市","四平市","辽源市","通化市","白山市","松原市","白城市","延边朝鲜族自治州"]},{"n":"黑龙江省","cs":["哈尔滨市","齐齐哈尔市","鸡西市","鹤岗市","双鸭山市","大庆市","伊春市","佳木斯市","七台河市","牡丹江市","黑河市","绥化市","大兴安岭地区"]},{"n":"上海市","cs":["上海市"]},{"n":"江苏省","cs":["南京市","无锡市","徐州市","常州市","苏州市","南通市","连云港市","淮安市","盐城市","扬州市","镇江市","泰州市","宿迁市"]},{"n":"浙江省","cs":["杭州市","宁波市","温州市","嘉兴市","湖州市","绍兴市","金华市","衢州市","舟山市","台州市","丽水市"]},{"n":"安徽省","cs":["合肥市","芜湖市","蚌埠市","淮南市","马鞍山市","淮北市","铜陵市","安庆市","黄山市","滁州市","阜阳市","宿州市","六安市","亳州市","池州市","宣城市"]},{"n":"福建省","cs":["福州市","厦门市","莆田市","三明市","泉州市","漳州市","南平市","龙岩市","宁德市"]},{"n":"江西省","cs":["南昌市","景德镇市","萍乡市","九江市","新余市","鹰潭市","赣州市","吉安市","宜春市","抚州市","上饶市"]},{"n":"山东省","cs":["济南市","青岛市","淄博市","枣庄市","东营市","烟台市","潍坊市","济宁市","泰安市","威海市","日照市","莱芜市","临沂市","德州市","聊城市","滨州市","菏泽市"]},{"n":"河南省","cs":["郑州市","开封市","洛阳市","平顶山市","安阳市","鹤壁市","新乡市","焦作市","濮阳市","许昌市","漯河市","三门峡市","南阳市","商丘市","信阳市","周口市","驻马店市","直辖市县级行政区划"]},{"n":"湖北省","cs":["武汉市","黄石市","十堰市","宜昌市","襄阳市","鄂州市","荆门市","孝感市","荆州市","黄冈市","咸宁市","随州市","恩施土家族苗族自治州","直辖市县级行政区划"]},{"n":"湖南省","cs":["长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永州市","怀化市","娄底市","湘西土家族苗族自治州"]},{"n":"广东省","cs":["广州市","韶关市","深圳市","珠海市","汕头市","佛山市","江门市","湛江市","茂名市","肇庆市","惠州市","梅州市","汕尾市","河源市","阳江市","清远市","东莞市","中山市","潮州市","揭阳市","云浮市"]},{"n":"广西壮族自治区","cs":["南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市"]},{"n":"海南省","cs":["海口市","三亚市","三沙市","直辖市县级行政区划"]},{"n":"重庆市","cs":["重庆市"]},{"n":"四川省","cs":["成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","内江市","乐山市","南充市","眉山市","宜宾市","广安市","达州市","雅安市","巴中市","资阳市","阿坝藏族羌族自治州","甘孜藏族自治州","凉山彝族自治州"]},{"n":"贵州省","cs":["贵阳市","六盘水市","遵义市","安顺市","毕节市","铜仁市","黔西南布依族苗族自治州","黔东南苗族侗族自治州","黔南布依族苗族自治州"]},{"n":"云南省","cs":["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","普洱市","临沧市","楚雄彝族自治州","红河哈尼族彝族自治州","文山壮族苗族自治州","西双版纳傣族自治州","大理白族自治州","德宏傣族景颇族自治州","怒江傈僳族自治州","迪庆藏族自治州"]},{"n":"西藏自治区","cs":["拉萨市","昌都地区","山南地区","日喀则地区","那曲地区","阿里地区","林芝地区"]},{"n":"陕西省","cs":["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市"]},{"n":"甘肃省","cs":["兰州市","嘉峪关市","金昌市","白银市","天水市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西市","陇南市","临夏回族自治州","甘南藏族自治州"]},{"n":"青海省","cs":["西宁市","海东地区","海北藏族自治州","黄南藏族自治州","海南藏族自治州","果洛藏族自治州","玉树藏族自治州","海西蒙古族藏族自治州"]},{"n":"宁夏回族自治区","cs":["银川市","石嘴山市","吴忠市","固原市","中卫市"]},{"n":"新疆维吾尔自治区","cs":["乌鲁木齐市","克拉玛依市","吐鲁番地区","哈密地区","昌吉回族自治州","博尔塔拉蒙古自治州","巴音郭楞蒙古自治州","阿克苏地区","克孜勒苏柯尔克孜自治州","喀什地区","和田地区","伊犁哈萨克自治州","塔城地区","阿勒泰地区","直辖市县级行政区划"]},{"n":"台湾省","cs":["直辖市县级行政区划","新北市","台北市","台中市","台南市","高雄市"]},{"n":"香港特别行政区","cs":["香港"]},{"n":"澳门特别行政区","cs":["澳门"]},{"n":"海外","cs":["海外"]}];


/**
 * 图片预览
 * @param config
 * 		width: 弹出窗口宽度, 缺省为1000
 * 		height: 弹出窗口高度, 缺省为700
 * 		previewPageSize : 每页图片个数, 缺省为6
 */
function PrettyImagePreview(config) {
	var thiz = this;
	if(CU.isEmpty(config)) config = {};
	if(CU.isEmpty(config.width)) config.width = 1000;
	if(CU.isEmpty(config.height)) config.height = 700;
	this.navHeight = 100;
	this.imageWidth = config.width - 30;
	this.imageHeight = config.height - this.navHeight;
	
	this.previewPageIdx = 0;
	this.previewPageSize = CU.isEmpty(config.previewPageSize)||config.previewPageSize<1 ? 6 : config.previewPageSize;
	this.previewPages = 0;
	this.previewImages = [];
	
	var html = [];
	html.push('<div style="padding:0px;margin:0px;display:none;top:0px;left:0px;z-index:1050;position:fixed;background:#000000;" >',
				'   <div class="modal-dialog" style="width:'+config.width+'px;margin:0px;background:#000000;">',
				'      <div class="modal-content" style="border-radius:0px;background:#000000;">',
				'         <div class="modal-header" style="border:0px;">',
				'            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="opacity:1;color:#ffffff;">&times;&nbsp;<span style="font-size:14px;">关闭</span></button>',
				'            <h4 class="modal-title" style="color:#ffffff;">图片预览</h4>',
				'         </div>',
				'         <div class="modal-body" style="padding:0px;">',
				'         	<div name="div_img_container" style="width:'+thiz.imageWidth+'px;height:'+thiz.imageHeight+'px;text-align:center;line-height:'+thiz.imageHeight+'px;"></div>',
				'			<div class="BaseImagePreview_singleLeft" style="position: absolute;top:40%;left:20px;width:30px;height:40px;padding:4px;cursor: pointer;"><img src="',ContextPath,'/tannux/frame/imgs/core/hover-prev.png"></div>',
				'			<div class="BaseImagePreview_singleRight" style="position: absolute;top:40%;right:20px;width:30px;height:40px;padding:4px;cursor: pointer;"><img src="',ContextPath,'/tannux/frame/imgs/core/hover-next.png"></div>',
				'         </div>',
				'         <div class="modal-footer" style="border:0px;">',
				'       	<table style="width:100%;height:'+thiz.navHeight+'px;" border=0>',
				'      		<tr>',
				'       		<td style="width:40px;" align="center"><div class="BaseImagePreview_left"></div></td>',
				'      			<td class="BaseImagePreview_center" ></td>',
				'      			<td style="width:40px;" align="center"><div class="BaseImagePreview_right"></div></td>',
				'      		</tr>',
				'      	</table>',
				'        </div>',
				'      </div>',
				'	</div>',
				'</div>');
	this.el_preview = $(html.join(""));
	this.el_title = $(this.el_preview.find(".modal-title")[0]);
	this.el_dialog = $(this.el_preview.find(".modal-dialog")[0]);
	this.el_body = $(this.el_preview.find(".modal-body")[0]);
	this.el_imgContainer = $(this.el_preview.find("div[name='div_img_container']")[0]);
	this.el_imagetpl = $(this.el_preview.find(".modal-body").children()[0]);
	this.el_imageLeft = $(this.el_preview.find(".BaseImagePreview_left")[0]);
	this.el_imageCenter = $(this.el_preview.find(".BaseImagePreview_center")[0]);
	this.el_imageRight = $(this.el_preview.find(".BaseImagePreview_right")[0]);
	this.el_singleLeft = $(this.el_preview.find(".BaseImagePreview_singleLeft")[0]);
	this.el_singleRight = $(this.el_preview.find(".BaseImagePreview_singleRight")[0]);
	
	thiz.previewImages = [];
	$("body").append(thiz.el_preview);
	
	
	this.prevImage = function() {
		var cs = thiz.el_imageCenter.children();
		for(var i=0; i<cs.length; i++) {
			var el = $(cs[i]);
			if(el.hasClass("selected")) {
				if(i == 0) {
					if(thiz.prevPage()) {
						cs = thiz.el_imageCenter.children();
						thiz.selectImage($(cs[cs.length-1]));
					}
				}else {
					thiz.selectImage($(cs[i-1]));
				}
				break;
			}
		}
	};
	this.nextImage = function() {
		var cs = thiz.el_imageCenter.children();
		for(var i=0; i<cs.length; i++) {
			var el = $(cs[i]);
			if(el.hasClass("selected")) {
				if(i == cs.length-1) {
					thiz.nextPage();
				}else {
					thiz.selectImage($(cs[i+1]));
				}
				break;
			}
		}
	}
	
	
	this.prevPage = function() {
		if(thiz.previewPageIdx <= 0) {
			return false;
		}
		thiz.previewPageIdx -- ;
		thiz.refreshImagePreview(thiz.previewPageIdx);
		return true;
	};
	this.nextPage = function() {
		if(thiz.previewPageIdx >= thiz.previewPages-1) {
			return false;
		}
		thiz.previewPageIdx ++ ;
		thiz.refreshImagePreview(thiz.previewPageIdx);
		return true;
	};
	
	
	this.el_preview.find(".close").bind("click", function() {
		thiz.close();
	});
	this.el_imageLeft.bind("click", this.prevPage);
	this.el_imageRight.bind("click", this.nextPage);
	
	this.el_singleLeft.bind("click", this.prevImage);
	this.el_singleRight.bind("click", this.nextImage);
	
	this.setTitle = function(t) {
		thiz.el_title.html("图片预览&nbsp;&nbsp;-&nbsp;&nbsp;"+t);
	};
	
	
	
	
	this.resetPreviewImages = function(images) {
		thiz.previewImages = [];
		if(!CU.isEmpty(images)) {
			for(var i=0; i<images.length; i++) {
				var img = images[i];
				var name = "";
				var path = "";
				var thumb = "";
				if(CU.isObject(img)) {
					name = img.name;
					path = img.path;
					thumb = img.thumb;
				}else {
					name = path = thumb = img;
					if(name.indexOf('/') >= 0) {
						name = name.substring(name.lastIndexOf('/')+1);
					}
				}
				if(CU.isEmpty(thumb)) {
					if(PU.getSourceType(path)==3) {
						thumb = CU.getWebRoot() + "/tannux/frame/imgs/core/video60.svg";
					}else {
						thumb = path;
					}
				}
				thiz.previewImages.push({name:name, path:path, thumb:thumb});
			}
		}
	};
	
	
	/**
	 * @param at : 指定显示位置, int类型则为下标, string则为path
	 * @return array : [0]=pageIndex, [1]=rowIndex
	 */
	this.getShowIndex = function(at) {
		if(typeof(at)=="string") {
			var idx = -1;
			for(var i=0; i<thiz.previewImages.length; i++) {
				if(thiz.previewImages[i].path.endsWith(at)) {
					idx = i;
					break;
				}
			}
			if(idx == -1) idx = 0;
			at = idx;
		}
		at = at<0 ? 0 : (at>=thiz.previewImages.length?thiz.previewImages.length-1:at);
		var pidx = parseInt(at/thiz.previewPageSize, 10);
		var ridx = at%thiz.previewPageSize;
		return [pidx, ridx];
	};
	
	this.setWindowSize = function() {
		var mw = $(window).width();
		thiz.imageWidth = mw - 30;
		thiz.imageHeight = $(window).height() - thiz.navHeight - 88;
		thiz.el_dialog.width(mw);
		thiz.el_imgContainer.width(thiz.imageWidth);
		thiz.el_imgContainer.height(thiz.imageHeight);
		thiz.el_imgContainer.css("line-height", thiz.imageHeight+"px");
		thiz.previewPageSize = parseInt(thiz.imageWidth / 150, 10);
	};
	
	
	/**
	 * images : [string|object], 如果是object : {name:"",path:"",thumb:""}
	 * at : 指定显示位置, int类型则为下标, string则为path
	 */
	this.show = function(images, at) {
		thiz.setWindowSize();
		thiz.previewImages = [];
		thiz.previewPageIdx = 0;
		thiz.previewPages = 0;
		thiz.el_imagetpl.html("");
		thiz.el_imageCenter.html("");
		
		if(!CU.isEmpty(images) && images.length>0) {
			var sz = parseInt(images.length/thiz.previewPageSize,10);
			thiz.previewPages = images.length%thiz.previewPageSize>0 ? sz+1 : sz;
			thiz.resetPreviewImages(images);
			if(CU.isEmpty(at)) at = 0;
			thiz.selectAt(at);
		}
		
		thiz.el_preview.css("top", ($(window).height())+"px");
		thiz.el_preview.css("display", "block");
		thiz.el_preview.animate({top:0},300);
	};
	
	this.close = function() {
		thiz.el_preview.animate({top:$(window).height()},300);
		setTimeout(() => {
			thiz.el_imagetpl.html("");
			thiz.el_preview.css("display", "none");
		}, 300);
	};
	
	
	this.selectAt = function(at) {
		if(CU.isEmpty(at)) return ;
		thiz.previewPageIdx = 0;
		var rowIdx = 0;
		var arr = thiz.getShowIndex(at);
		thiz.previewPageIdx = arr[0];
		rowIdx = arr[1];
		thiz.refreshImagePreview(thiz.previewPageIdx, rowIdx);
	};
	
	this.selectImage = function(el_imgParent) {
		var p = $(el_imgParent);
		var img = $(p.children()[0]);
		var imgpath = img.attr("path");
		var imgtitle = img.attr("title");
		thiz.setTitle(imgtitle);
		thiz.el_imagetpl.html("");
		
		if(PU.getSourceType(imgpath)==3) { 	//1=文档, 2=图片, 3=视频, 4=音乐, 99=其他
			  thiz.el_imagetpl.append($('<video style="max-width:'+thiz.imageWidth+'px;max-height:'+thiz.imageHeight+'px;" src="'+RS.toRsmUrl(imgpath)+'" controls="controls" autoplay="autoplay" crossorigin="anonymous">您的浏览器不支持 video 标签。 </video>'));
		}else {
			thiz.el_imagetpl.append($('<img style="max-width:'+thiz.imageWidth+'px;max-height:'+thiz.imageHeight+'px;" src="'+RS.toRsmImageUrl(imgpath)+'">'));
		}
		
		var el_allss = thiz.el_imageCenter.children();
		el_allss.css("border", "0px");
		el_allss.removeClass("selected");
		p.css("border", "solid 1px #adc0d9");
		p.addClass("selected");
	};
	
	
	this.refreshImagePreview = function(pageIdx, rowIdx) {
		var p = thiz.el_preview;
		if(CU.isEmpty(p)) return ;
		
		thiz.el_imagetpl.html("");
		thiz.el_imageCenter.html("");
		
		var imgs = thiz.previewImages;
		if(CU.isEmpty(imgs)) return ;
		
		var start = pageIdx * thiz.previewPageSize;
		var end = start + thiz.previewPageSize;
		if(CU.isEmpty(rowIdx) || rowIdx>=thiz.previewPageSize || rowIdx>=(imgs.length-start)) rowIdx = 0;
		var el_select = null;
		for(var i=start,idx=0; i<end&&i<imgs.length; i++,idx++) {
			var path = imgs[i].path;
			var name = imgs[i].name;
			var thumb = imgs[i].thumb;
			var url = RS.toRsmUrl(thumb, {"x-oss-process":"image/auto-orient,1/resize,m_lfit,w_145/quality,Q_70"})
			var smallimg = $('<div style="width:145px;height:'+thiz.navHeight+'px;padding:5px;border:solid 0px #adc0d9;float:left;display: flex;align-items: center;text-align:center;justify-content:center;"><img class="BaseImagePreview_smallimg" path="'+path+'" thumb="'+thumb+'" src="'+url+'" title="'+name+'"></div>');
			thiz.el_imageCenter.append(smallimg);
			if(idx == rowIdx) {
				el_select = smallimg;
			}
			smallimg.bind("click", function() {
				thiz.selectImage(this);
			});
		}
		if(!CU.isEmpty(el_select)) thiz.selectImage(el_select);
		
		var el_prev = thiz.el_imageLeft;
		var el_next = thiz.el_imageRight;
		el_prev.css("background-image", "url("+ContextPath+"/tannux/frame/imgs/core/"+(thiz.previewPageIdx<=0?"disabled-prev.png":"hover-prev.png")+")");
		el_prev.css("cursor", thiz.previewPageIdx<=0?"default":"pointer");
		el_next.css("background-image", "url("+ContextPath+"/tannux/frame/imgs/core/"+((thiz.previewPageIdx>=thiz.previewPages-1)?"disabled-next.png":"hover-next.png")+")");
		el_next.css("cursor", (thiz.previewPageIdx>=thiz.previewPages-1)?"default":"pointer");
	};
}




function PrettyTextPreview() {
	var thiz = this;
	var html = ['<div class="modal fade" role="dialog" aria-hidden="true">',
				'   <div class="modal-dialog">',
				'      <div class="modal-content">',
				'         <div class="modal-header">',
				'            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
				'            <h4 class="modal-title"></h4>',
				'         </div>',
				'         <div class="modal-body form-horizontal" style="padding-top:0px;">',
				'         	<div class="form-group" style="margin:0px 0px 15px 0px;padding-top:10px;">',
				'         		<div class="pull-left input-title" style="font-weight: 600;"></div>',
				'         		<div class="pull-right"><div>',
				'					<label class="control-label pull-left" style="padding-top:4px;">字符集</label>',
				'					<div class="pull-left"><select class="form-control input-select-charset" style="width:130px;display: inline-block;height:26px;padding: 2px 12px;">',
				'						<option value="UTF-8">UTF-8</option>',
				'						<option value="GB2312">GB2312</option>',
				'						<option value="BIG5">BIG5</option>',
				'						<option value="ISO-8859-1">ISO-8859-1</option>',
				'					</select></div>&nbsp;&nbsp;',
				'					<button type="button" class="btn btn-default btn-prev-index" style="padding: 2px 12px;">上一篇</button>&nbsp;',
				'					<button type="button" class="btn btn-default btn-next-index" style="padding: 2px 12px;">下一篇</button>',
				'				</div></div>',
				'         	</div>',
				'         	<div class="form-group input-content" style="margin: 0px;">',
				'         	</div>',
				'         </div>',
				'      </div>',
				'	</div>',
				'</div>'];
	this.win = $(html.join(""));
	$("body").append(this.win);
	
	this.el_select_charset = $(this.win.find('.input-select-charset')[0]);
	this.el_btn_prev = $(this.win.find('.btn-prev-index')[0]);
	this.el_btn_next = $(this.win.find('.btn-next-index')[0]);
	this.el_title = $(this.win.find('.input-title')[0]);
	this.el_content = $(this.win.find('.input-content')[0]);
	
	this.data = [];
	this.index = -1;
	
	
	this.refreshIndex = function() {
		if(CU.isEmpty(thiz.data)) {
			thiz.index  = -1;
			
			thiz.el_btn_prev.prop("disabled", true);
			thiz.el_btn_next.prop("disabled", true);
		}else {
			if(thiz.index < 0) {
				thiz.index = 0;
			}else if(thiz.index >= thiz.data.length) {
				thiz.index = thiz.data.length - 1;
			}
			thiz.el_btn_prev.prop("disabled", thiz.index<=0);
			thiz.el_btn_next.prop("disabled", thiz.index>=thiz.data.length-1);
		}
		
		thiz.el_btn_prev.css("display", thiz.data.length>1 ? "inline-block" : "none");
		thiz.el_btn_next.css("display", thiz.data.length>1 ? "inline-block" : "none");
	};
	
	this.prev = function() {
		if(thiz.index <= 0) return ;
		thiz.index -- ;
		thiz.refreshIndex();
		thiz.query();
	};
	this.next = function() {
		if(thiz.index<0 || thiz.index>=thiz.data.length-1) return ;
		thiz.index ++ ;
		thiz.refreshIndex();
		thiz.query();
	};
	
	
	this.query = function() {
		thiz.el_title.html("");
		thiz.el_content.html("");
		if(thiz.index<0 || thiz.index>=thiz.data.length) return ;
		var item = thiz.data[thiz.index];
		var name = item.name;
		var path = item.path;
		if(!CU.isEmpty(name)) thiz.el_title.html(name);
		if(!CU.isEmpty(path)) {
			var charset = thiz.el_select_charset.val();
			RS.ajax({url:"/sysframe/tool/readRosText", ps:{path:path, charset:charset}, cb:function(rs) {
				if(CU.isEmpty(rs)) rs = "";
				if(!(rs.indexOf('<')>=0 && rs.indexOf('>')>=0)) {
					rs = rs.replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
				}
				thiz.el_content.html(rs);
			}});
		}
	};
	
	
	/**
	 * @param cfg
	 * 		title : 预览标题, 缺省为:文本预览
	 * 		width : 预览窗口宽度, 缺省为1000
	 * 		minHeight : 预览窗口最小高度, 缺省为500
	 * 		maxHeight : 预览窗口最大高度
	 * 		data : [string|object], 如果是object : {name:"",path:""}
	 * 		at : 指定当前是第几篇, 缺省为0
	 */
	this.show = function(cfg) {
		var c = $.extend({title:"文本预览", width:1000, minHeight:500, at:0}, cfg);
		delete thiz.data;
		thiz.data = [];
		thiz.index = CU.isInteger(c.at) ? (typeof(c.at)=="string" ? parseInt(CU.trim(c.at)) : c.at) : 0;
		
		if(!CU.isEmpty(c.data)) {
			for(var i=0; i<c.data.length; i++) {
				var item = c.data[i];
				if(typeof(item)=="string") {
					item = {path:item};
				}
				thiz.data.push(item);
			}
		}
		
		thiz.win.find(".modal-title").html(c.title);
		thiz.win.find(".modal-dialog").css("width", CU.isNumber(c.width)?(c.width+"px"):c.width);
		var el_body = thiz.win.find(".modal-body");
		el_body.css("min-height", CU.isNumber(c.minHeight)?(c.minHeight+"px"):c.minHeight);
		if(!CU.isEmpty(c.maxHeight)) {
			el_body.css("max-height", CU.isNumber(c.maxHeight)?(c.maxHeight+"px"):c.maxHeight);
		}
		thiz.win.modal("show");
		thiz.refreshIndex();
		thiz.query();
	};
	
	
	
	/** event ----------------------------------------- **/
	this.el_select_charset.bind("change", thiz.query);
	this.el_btn_prev.bind("click", thiz.prev);
	this.el_btn_next.bind("click", thiz.next);
}


function PrettyRsmChooser() {
	var thiz = this;
	this.histDirId = "";
	
	var html = [];
	html.push('<div class="modal fade" name="div_rsm_chooser" role="dialog" aria-hidden="true">',
				'   <div class="modal-dialog" style="width:900px;">',
				'      <div class="modal-content">',
				'         <div class="modal-header">',
				'            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
				'            <h4 class="modal-title">资源选择</h4>',
				'         </div>',
				'         <div class="modal-body" style="padding:0px;">',
				'         	<iframe name="iframe_rsm_chooser" frameborder="0" width="100%" src="" style="height:550px;overflow: hidden;" scrolling="no"></iframe>',
				'         </div>',
				'         <div class="modal-footer">',
				'         	<button type="button" name="btn_submit" class="btn btn-success"><i class="fa fa-check"></i>确定</button>&nbsp;',
				'         	<button type="button" name="btn_close" class="btn btn-default">关闭</button>',
				'         </div>',
				'      </div>',
				'	</div>',
				'</div>');
	
	this.el_preview = $(html.join(""));
	this.el_iframe = $(this.el_preview.find("iframe")[0]);
	$("body").append(thiz.el_preview);
	
	this.el_preview.find("button[name='btn_submit']").bind("click", function() {
		RS.postMessage({win:thiz.el_iframe[0].contentWindow, cb:function(rs) {
			if(CU.isEmpty(rs) || (CU.isEmpty(rs[0]) && CU.isEmpty(rs[1]))) {
				var msg = "请选择" + (thiz.el_preview[0].onlyDir=="1" ? "目录" : "资源");
				CC.showTip({type:"error",msg:msg});
				return ;
			}
			if(CU.isFunction(thiz.el_preview[0].callback)) {
				var ba = thiz.el_preview[0].callback(rs[0], rs[1]);
				if(ba===false) return ;
			}
			thiz.setHistDirId(rs[2]);
			thiz.close();
		}});
	});
	this.el_preview.find("button[name='btn_close']").bind("click", function() {
		thiz.close();
	});
	
	this.getHistDirId = function() {
		if(CU.isEmpty(thiz.histDirId)) {
			var key = "TANNUX_RSMCHOOSER_HIST_DIRID_" + MENU.id;
			thiz.histDirId = window.localStorage.getItem(key);
		}
		return thiz.histDirId;
	};
	this.setHistDirId = function(dirId) {
		thiz.histDirId = dirId;
		var key = "TANNUX_RSMCHOOSER_HIST_DIRID_" + MENU.id;
		window.localStorage.setItem(key, dirId);
	};


	/**
	 * @param cfg
	 * 			dirId : 指定默认ID, 为空则从根目录开始
	 * 			addDir : 是否可以在选择窗口中创建目录, 缺省为true
	 * 			addSource : 是否可以在选择窗口中上传资源, 缺省为true
	 * 			singleSelect : 是否单选, 缺省为false
	 * 			selectableType : 可选文件类型 1=目录 2=文件  为空表示都可以, 缺省为2
	 * 			sourceTypes : 指定文件类型, 为空则不限制, 多个以逗号分隔
	 * 			sourceSuffixs : 指定文件后缀, 为空则不限制, 多个以逗号分隔
	 * 			onlyDir : 是否只能选目录
	 * 			verifyAuth : 是否验证权限, 缺省为false
	 * 			bgcolor : 背景色, 缺省为#FFFFFF
	 * 			ppad : 外边距, 缺省为0
	 * 			pad : 内边距, 缺省为0
	 * @param cb : 回调, cb(dirs, sources)
	 */
	this.show = function(cfg, cb) {
		var ps = $.extend({ssl:CU.isWebHttps(), dirId:thiz.getHistDirId(), addDir:true, addSource:true, singleSelect:false, selectableType:2, onlyDir:false, verifyAuth:false, bgcolor:"#ffffff", maxHeight:495, ppad:0, pad:0}, cfg);
		
		//为外部扩展, 主要解决测试环境使用正式环境的RSM
		if(CU.isFunction(PU.isToRsmAppendToken)) {
			ps.appendToken = PU.isToRsmAppendToken(cfg, ps);
		}
		
		var url = RS.getRemoteUrl({addroot:cfg.addroot,act:"simple", url:"/ros/client/forward2SelectSource"});
		url += (url.indexOf('?') < 0 ? '?' : '&') + CU.parseParams(ps, true);
		thiz.el_iframe.attr("src", url);
		thiz.el_preview[0].onlyDir = (cfg.onlyDir===true||cfg.onlyDir=="true"||cfg.onlyDir=="1") ? "1" : "0";
		thiz.el_preview[0].callback = cb;
		thiz.el_preview.modal("show");
	};
	
	this.close = function() {
		thiz.el_preview.modal("hide");
	};

}



function PrettyOmstdChooser() {
	var thiz = this;
	this.histDirId = "";
	
	var html = [];
	html.push('<div class="modal fade" name="div_omstd_chooser" role="dialog" aria-hidden="true">',
				'   <div class="modal-dialog" style="width:1000px;">',
				'      <div class="modal-content">',
				'         <div class="modal-header">',
				'            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
				'            <h4 class="modal-title">对象选择</h4>',
				'         </div>',
				'         <div class="modal-body" style="padding:0px;">',
				'         	<iframe name="iframe_omstd_chooser" frameborder="0" width="100%" src="" style="height:550px;overflow: hidden;" scrolling="no"></iframe>',
				'         </div>',
				'         <div class="modal-footer">',
				'         	<button type="button" name="btn_omstd_submit" class="btn btn-success"><i class="fa fa-check"></i>确定</button>&nbsp;',
				'         	<button type="button" name="btn_omstd_close" class="btn btn-default">关闭</button>',
				'         </div>',
				'      </div>',
				'	</div>',
				'</div>');
	
	this.el_preview = $(html.join(""));
	this.el_iframe = $(this.el_preview.find("iframe")[0]);
	$("body").append(thiz.el_preview);
	
	this.el_preview.find("button[name='btn_omstd_submit']").bind("click", function() {
		RS.postMessage({win:thiz.el_iframe[0].contentWindow, cb:function(rs) {
			if(CU.isEmpty(rs) || (CU.isEmpty(rs[0]) && CU.isEmpty(rs[1]))) {
				CC.showTip({type:"error",msg:"请选择对象."});
				return ;
			}
			if(CU.isFunction(thiz.el_preview[0].callback)) {
				var ba = thiz.el_preview[0].callback(rs[0], rs[1]);
				if(ba===false) return ;
			}
			thiz.setHistDirId(rs[2]);
			thiz.close();
		}});
	});
	this.el_preview.find("button[name='btn_omstd_close']").bind("click", function() {
		thiz.close();
	});
	
	this.getHistDirId = function() {
		if(CU.isEmpty(thiz.histDirId)) {
			var key = "TANNUX_OMSTDCHOOSER_HIST_DIRID_" + MENU.id;
			thiz.histDirId = window.localStorage.getItem(key);
		}
		return thiz.histDirId;
	};
	this.setHistDirId = function(dirId) {
		thiz.histDirId = dirId;
		var key = "TANNUX_OMSTDCHOOSER_HIST_DIRID_" + MENU.id;
		window.localStorage.setItem(key, dirId);
	};


	/**
	 * @param cfg
	 * 			url : 目标URL
	 * 			dirId : 指定默认ID, 为空则从根目录开始
	 * 			addDir : 是否可以在选择窗口中创建目录, 缺省为true
	 * 			addRecord : 是否可以在选择窗口中添加记录, 缺省为true
	 * 			singleSelect : 是否单选, 缺省为false
	 * 			selectableType : 可选文件类型 1=目录 2=对象  为空表示都可以, 缺省为2
	 * 			recordTypes : 指定对象类型, 为空则不限制, 多个以逗号分隔
	 * 			bgcolor : 背景色, 缺省为#FFFFFF
	 * 			ppad : 外边距, 缺省为0
	 * 			pad : 内边距, 缺省为0
	 * 			title : 窗口标题
	 * @param cb : 回调, cb(dirs, sources)
	 */
	this.show = function(cfg, cb) {
		var title = cfg.title;
		delete cfg.title;
		var ps = $.extend({dirId:thiz.getHistDirId(), addDir:true, addRecord:true, singleSelect:false, selectableType:2, bgcolor:"#ffffff", maxHeight:495, ppad:0, pad:0}, cfg);
		var url = RS.getRemoteUrl({addroot:cfg.addroot,act:"simple", url:cfg.url}); 
		url += (url.indexOf('?') < 0 ? '?' : '&') + CU.parseParams(ps, true);
		thiz.el_preview.find(".modal-title").html(CU.isEmpty(title)?"对象选择":title);
		thiz.el_iframe.attr("src", url);
		thiz.el_preview[0].callback = cb;
		thiz.el_preview.modal("show");
	};
	
	this.close = function() {
		thiz.el_preview.modal("hide");
	};

}


/**
 * 上传组件
 * @param config
 * 		bid : 绑定页面指定的元素ID, 也可以直接是一个el对象
 * 		addroot : RS-addroot
 * 		single : true|false, 缺省为true
 * 		editable : true|false, 缺省为true
 * 		suffix : 指定文件格式, 多个以逗号,分隔, 为空则表示不限制
 * 		maxSize : 指定文件限制最大数, 缺省为10M
 * 		uploadType : 1=纯上传文件方式  2=集成RSM方式  缺省为2
 * 		showType : 1=小图, 2=大图, 缺省为1
 * 
 * 		#纯上传文件方式
 * 		format : 指定文件格式, 多个以竖线|分隔, 也可以是一个函数, 自定义验证格式 format(file), return true|false
 * 		formatText : 文件格式不匹配时提示信息, 缺省为format
 * 		uploadUrl : 上传请求路径, 缺省为: /omdb/upload/uploadFiles
 * 		uploadName : 上传表单字段名, 缺省为: files
 * 
 * 		#集成RSM方式
 * 		dirId : 默认进入的dirId
 * 		addDir : 是否可添加目录, 缺省为true
 * 		addSource : 是否可添加文件, 缺省为true
 * 		selectableType : 可选文件类型 1=目录 2=文件  为空表示都可以, 缺省为2
 * 		sourceTypes : 指定查询文件类型
 * 		onlyDir : 是否只能选目录
 * 		verifyAuth : 是否验证权限, 缺省为false
 * 		
 * 		onUpload : 上传之后事件, onUpload(array)	[{name:"", path:"", thumb:""}]
 */
function PrettyUploadField(config) {
	if(CU.isEmpty(config)) throw " the config is empty argument! ";
	if(CU.isEmpty(config.bid)) throw " the config.bid is empty argument! ";
	var thiz = this;
	$.extend(thiz, {single:true, editable:true, maxSize:10*1024*1024, uploadName:"files", addDir:true, addSource:true, onlyDir:false, verifyAuth:false, selectableType:"2", uploadType:2, showType:1}, config);

	this.formatFunction = null;
	this.formatSuffixs = null;
	this.formatText = null;
	if(!CU.isEmpty(config.format)) {
		if(CU.isFunction(config.format)) {
			thiz.formatFunction = config.format;
		}else {
			thiz.formatSuffixs = [];
			var arr = config.format.split("|");
			for(var i=0; i<arr.length; i++) {
				thiz.formatSuffixs.push($.trim(arr[i].toUpperCase()));
			}
			thiz.formatText = CU.isEmpty(config.formatText) ? config.format : config.formatText;
		}
	}
	
	if(typeof(this.bid)=="string") {
		this.el_base = $("#"+this.bid);
	}else {
		this.el_base = $(this.bid);
		this.bid = this.el_base.attr("id");
		if(CU.isEmpty(this.bid)) this.bid = "PrettyUploadField_"+CU.getId();
	}
	var accept = CU.isEmpty(thiz.suffix) ? "" : ("."+thiz.suffix.replace(/,/g, ",."));
	this.el_icon = $('<label style="color:#4A73F7;cursor:pointer;display:'+(thiz.editable?'block':'none')+';"><i class="fa fa-upload fa-lg"></i></label>');
	this.el_file = $('<input type="file" '+(thiz.single?'':'multiple="multiple"')+' style="opacity: 0; display: none;" accept="'+accept+'">');
	this.el_button = $('<div class="pull-left" style="margin-right:15px;margin-top:4px;"></div>');
	this.el_button.append(this.el_icon);
	this.el_button.append(this.el_file);
	this.el_prefiles = $('<div></div>');
	
	this.el_parent = CU.isObject(thiz.bid) ? $(thiz.bid) : $("#"+thiz.bid);
		
	this.el_parent.append(this.el_button);
	this.el_parent.append(this.el_prefiles);
	
	this.el_icon.bind("click", function() {
		var dis = thiz.el_icon.attr("disabled");
		if(dis===true || dis=="disabled") {
			return ;
		}
		if(thiz.uploadType == 1) {
			thiz.el_file.click();
		}else {
			var ps = {addroot:thiz.addroot,dirId:thiz.dirId, addDir:thiz.addDir, addSource:thiz.addSource, onlyDir:thiz.onlyDir, verifyAuth:thiz.verifyAuth, singleSelect:thiz.single, selectableType:thiz.selectableType, sourceTypes:thiz.sourceTypes, sourceSuffixs:thiz.suffix};
			PU.showRsmChooser(ps, function(dirs, sources) {
				if(CU.isEmpty(sources)) return ;
				var array = [];
				for(var i=0; i<sources.length; i++) {
					var s = sources[i];
					if(CU.isEmpty(s.sourceSize) || s.sourceSize>thiz.maxSize) {
						CC.showTip({type:"error",msg:"文件["+s.sourceName+"]大小超过限制"+CU.toByteUnit(thiz.maxSize)+"."});
						continue;
					}
					
					var path = s.sourcePath;
					var thumb = s.thumbImagePath;
					if(CU.isEmpty(thumb) && s.sourceType==2) thumb = path;
//					if(s.sourceType==2 && !CU.isEmpty(s.thumbImagePath)) path = s.thumbImagePath;
//					if(s.sourceType==3 && !CU.isEmpty(s.thumbVideoPath)) path = s.thumbVideoPath;
					array.push({name:s.sourceName, path:path, thumb:thumb, sourceType:s.sourceType, playTime:s.playTime, width:s.width, height:s.height, sourceSize:s.sourceSize});
					if(thiz.single) break;
				}
				if(thiz.single) thiz.clearValue();
				thiz.addPreviewFiles(array);
			});
		}
	});
	this.el_file.bind("change", function() {
		var files = this.files;
		if(CU.isEmpty(files) || files.length==0) return ;
		var form = new FormData();
		var names = [];
		for(var i=0; i<files.length; i++) {
			var file = files[i];
			if(!thiz.validateFormat(file)) {
				return ;
			}
			if(file.size > thiz.maxSize) {
				CC.showTip({type:"error",msg:"文件["+file.name+"]大小不得超过"+CU.toByteUnit(thiz.maxSize)+"."});
				return ;
			}
			form.append(thiz.uploadName, file);
			names.push(file.name);
		}
		
		thiz.upload(names, form, function(array) {
			if(thiz.single) {
				thiz.setValue(array);
			}else {
				thiz.addPreviewFiles(array);
			}
			if(CU.isFunction(thiz.onUpload)) thiz.onUpload(array);
		});
		thiz.el_file.val("");
    });
	
	this.upload = function(names, form, cb) {
		RS.ajax({addroot:thiz.addroot,url:thiz.uploadUrl,act:"form",ps:form,bscfg:{processData:false,contentType:false},upload:true,loading:thiz.el_icon,cb:function(rs) {
			if(!CU.isEmpty(rs) && !CU.isArray(rs)) {
				rs = [rs];
			}
			if(CU.isFunction(cb)) {
				var array = [];
				if(!CU.isEmpty(names) && !CU.isEmpty(rs)) {
					var len = names.length>rs.length ? rs.length : names.length;
					for(var i=0; i<len; i++) {
						array.push({name:names[i], path:rs[i]});
					}
				}
				cb(array);
			}
		},errcb:function(code, message){
			if(RS.onShowErrMsg(code, message)!==false) alert("访问远程服务器失败!");
		}});
	};
	
	this.validateFormat = function(file) {
		if(!CU.isEmpty(thiz.formatFunction)) {
			return thiz.formatFunction(file);
		}else if(!CU.isEmpty(thiz.formatSuffixs)) {
			var name = file.name;
			if(CU.isEmpty(name) || name.indexOf('.')<0 || thiz.formatSuffixs.indexOf($.trim(name.substring(name.lastIndexOf('.')+1).toUpperCase()))<0) {
				CC.showTip({type:"error",msg:"文件["+name+"]格式不符合要求："+thiz.formatText+"!"});
				return false;
			}
		}
		return true;
	};
	
	/**
	 * @param record
	 * 			name, path, thumb, sourceType, playTime, width, height, sourceSize
	 */
	this.createPreviewFile = function(record) {
		var name = record.name;
		var path = record.path;
		var thumb = record.thumb;
		if(CU.isEmpty(record.sourceType)) record.sourceType = PU.getSourceType(path);
		if(CU.isEmpty(thumb)) thumb = record.sourceType==2||record.sourceType=="2" ? path : "";
		var style = thiz.editable?'style="padding-right:6px;"':'';
		var type = PU.getSourceType(path);
		var imgsrc = thumb;
		if(CU.isEmpty(imgsrc)) {
			switch (type) {
				case 1: imgsrc = thiz.showType==2 ? "doc60.svg" : "doc16.svg"; break;
				case 2: imgsrc = thiz.showType==2 ? "image60.svg" : "image16.svg"; break;
				case 3: imgsrc = thiz.showType==2 ? "video60.svg" : "video16.svg"; break;
				case 4: imgsrc = thiz.showType==2 ? "audio60.svg" : "audio16.svg"; break;
				case 5: imgsrc = thiz.showType==2 ? "file60.svg" : "file16.svg"; break;
				default: imgsrc = thiz.showType==2 ? "file60.svg" : "file16.svg"; break;
			}
			imgsrc = ContextPath + "/tannux/frame/imgs/core/" + imgsrc;
		}else {
			imgsrc = PU.toRsmUrl(imgsrc, {"x-oss-process":"image/auto-orient,1/resize,m_lfit,w_60/quality,Q_70"});
		}
		var attrs = CU.toHtmlAttrs(record);
		var el_img = $('<a href="'+(type!=2?PU.toRsmUrl(path):'###')+'" '+(type!=2?'target="_blank"':'')+' '+style+' title="'+name+'" '+attrs+'><img src="'+imgsrc+'" style="'+(thiz.showType==2?"max-width:60px;max-height:60px;":"width:24px;height:24px;")+'"></a>');
		var el_del = $('<a href="###" style="color:#FF0000;padding-right:6px;'+(thiz.editable?'':'display:none;')+'"><i class="fa fa-times"></i></a>');
		var el_con = $('<div class="form-control" style="padding:0px;height:auto;background-color: #fefefe;"></div>');
		var el_parent = $('<div class="pull-left" style="padding:3px 5px 3px 5px;">');
		el_con.append(el_img);
		el_con.append(el_del);
		el_parent.append(el_con);
		
		if(type == 2) {
			el_img.bind("click", function() {
				var array = thiz.getValue();
				var imgs = [];
				for(var i=0; i<array.length; i++) {
					var p = array[i].path;
					if(PU.getSourceType(p) == 2) {
						imgs.push(array[i]);
					}
				}
				PU.getImagePreview().show(imgs, $(this).attr("path"));
			});
		}
		el_del.bind("click",function(){
			$(this).parent().parent().remove();
			thiz.refreshElementValue();
		});
		return el_parent;
	};
	
	//[{path:"",name:"",thumb:"",sourceType:"", playTime:"", width:"", height:"", sourceSize:""}]
	this.addPreviewFiles = function(files) {
		for(var i=0; i<files.length; i++) {
			var f = files[i];
			var el = thiz.createPreviewFile(f);
			thiz.el_prefiles.append(el);
		}
		thiz.refreshElementValue();
	};
	
	
	this.setEditable = function(editable) {
		thiz.editable = editable===true || editable=="true" || editable===1 || editable=="1";
		thiz.el_icon.css("display", thiz.editable?'block':'none');
		var array = thiz.getValue();
		if(!CU.isEmpty(array)) {
			thiz.setValue(array);
		}
	};
		
	
	/**
	 * return [{path:"",name:"",thumb:"",sourceType:"", playTime:"", width:"", height:"", sourceSize:""}]
	 */
	this.getValue = function() {
		var el_arr = thiz.el_prefiles.find("a");
		var array = [];
		if(!CU.isEmpty(el_arr) && el_arr.length>0) {
			var fields = ["path", "name", "thumb", "sourceType", "playTime", "width", "height", "sourceSize"];
			for(var i=0; i<el_arr.length; i++) {
				var el = $(el_arr[i]);
				var record = CU.getHtmlAttrs(el, fields);
				if(!CU.isEmpty(record.path)) {
					array.push(record);
					if(thiz.single) break;
				}
			}
		}
		return array;
	};
	
	
	/**
	 * array : [{path:"",name:"",thumb:""}, {path:"",name:"",thumb:""}, {...}]
	 */
	this.setValue = function(array) {
		thiz.el_prefiles.html("");
		if(!CU.isEmpty(array)) {
			if(thiz.single && array.length>1) {
				array = [array[0]];
			}
			thiz.addPreviewFiles(array);
		}
		thiz.refreshElementValue();
	};
	
	
	this.getPaths = function() {
		var array = thiz.getValue();
		var paths = [];
		for(var i=0; i<array.length; i++) {
			paths.push(array[i].path);
		}
		return paths;
	};
	this.getPathsAsString = function() {
		return thiz.getPaths().join(",");
	};
	
	this.setPaths = function(paths) {
		var array = [];
		if(!CU.isEmpty(paths)) {
			if(typeof(paths)=="string") {
				paths = paths.split(",");
			}
			for(var i=0; i<paths.length; i++) {
				var p = paths[i];
				var n = p;
				var idx = p.lastIndexOf('/');
				if(idx > -1) n = n.substring(idx+1);
				array.push({path:p, name:n});
			}
		}
		thiz.setValue(array);
	};
	
	this.clearValue = function() {
		thiz.el_prefiles.html("");
		thiz.refreshElementValue();
	};
	
	this.refreshElementValue = function() {
		var array = thiz.getValue();
		thiz.el_parent.attr("value", CU.toString(array));
	};
	
	this.attr = function(k, v) {
		if(v===null || v===undefined) {
			return thiz.el_parent.attr(k);
		}else {
			thiz.el_parent.attr(k, v);
		}
	};
}





/**
 * @param config
 * 		bid : 绑定页面指定的元素ID
 * 		lazyBuild : 是否延迟构建表单, 为true则表示客户自己手工调用buildForm来构建form, 缺省为false
 * 		uploadUrl : 上传请求路径, 缺省为: /omdb/upload/uploadFiles
 * 		uploadName : 上传表单字段名, 缺省为: files
 * 		addroot : RS-addroot
 * 		editable : 是否可编辑, 缺省为true
 * 		formName : 表单名称
 * 		formDesc ：表单描述
 * 		colCount : 列数, 缺省取最大列号
 * 		widthType : 宽度类型, 1=固定宽度 2=比例
 * 		labelWidth : 标签宽度, 缺省:120
 * 		compWidth : 组件长度, 缺省:250
 * 		dictDropPrefix : 字典数据在DROP中的名称前缀, 缺省为：FV_DICT_DROP_
 * 		searchFieldSize : 搜索框查询记录数, 缺省为20
 * 		items : [{}]	每项配置
 * 			attrId : 对应模型属性ID
 * 			compType : 1=文本框 2=数值框 3=下拉列表 4=单选框 5=复选框 11=搜索单选 12=搜索多选 13=多选复选框 21=日期 22=时间 23=日期时间 24=颜色选择 31=文本域 32=富文本 41=文件 42=文件组 43=图片 44=图片组
 * 			width : 列宽, 1=1列 2=2列 3=3列
 * 			height : 高度, 适用组件: 文本域(缺省:100)、富文本(缺省:300)
 * 			label : 标签名, 缺省为属性名
 * 			isRequ : 是否必填, 缺省为否
 * 			placehold : 占位信息
 * 			pattern : 数据验证
 * 			title : 提示信息
 * 			style : 扩展样式
 * 			selVal : 选中值, 适用组件: 复选框, 缺省为1
 * 			notSelVal : 非选中值, 适用组件: 复选框, 缺省为0
 * 			dictId : 数据字典ID, 适用组件: 单选框、搜索单选、搜索多选、多选复选框
 * 			fileTypeRegex : 文件格式正则, 适用组件: 文件、文件组、图片、图片组
 * 			fileMaxSize : 文件最大数量, 适用组件: 文件组、图片组
 * 			rowNum : 行号
 * 			colNum : 列号
 * 		attrs : [{}]所属模型属性
 * 			id : 属性ID
 * 			attrCode : 属性代码
 * 			attrName : 属性名称
 * 			attrStdCode : 标准代码, 全部大写
 * 			attrType : 属性类型, 1=整数 2=小数 3=短文本(<=200) 4=长文本(<=1000) 5=文章
 * 			attrDesc : 属性描述
 * 		dictDropMap : {key:dictId}
 */
function PrettyDataForm(config) {
	if(CU.isEmpty(config)) throw " the config is empty argument! ";
	if(CU.isEmpty(config.bid)) throw " the config.bid is empty argument! ";
	if(CU.isEmpty(config.items)) throw " the config.items is empty argument! ";
	if(CU.isEmpty(config.attrs)) throw " the config.attrs is empty argument! ";
	
	var thiz = this;
	this.bid = config.bid;
	this.lazyBuild = config.lazyBuild === true;
	this.fieldIdPrefix = "PRETTY_FORM_FIELD_"+CU.getId()+"_";
	this.editable = config.editable !== false;
	this.formName = config.formName;
	this.formDesc = config.formDesc;
	this.colCount = config.colCount;
	this.widthType = config.widthType;
	this.labelWidth = config.labelWidth;
	this.compWidth = config.compWidth;
	this.dictDropPrefix = config.dictDropPrefix;
	this.searchFieldSize = config.searchFieldSize;
	this.items = config.items;
	this.attrs = config.attrs;
	this.attrMap = {};
	this.attrCodeMap = {};
	this.maxRowNum = 0;
	this.maxColNum = 0;
	this.uploadUrl = config.uploadUrl;
	this.uploadName = config.uploadName;
	this.colorSelectors = {'#000000':'#000000', '#00AAFF':'#00AAFF', '#41B314':'#41B314', '#e4cb10':'#e4cb10', '#F9354C':'#F9354C', '#5bc0de':'#5bc0de', '#777777':'#777777'};
	
	if(CU.isEmpty(this.widthType)) this.widthType = 1;
	if(CU.isEmpty(this.labelWidth)) this.labelWidth = 120;
	if(CU.isEmpty(this.compWidth)) this.compWidth = 250;
	if(CU.isEmpty(this.dictDropPrefix)) this.dictDropPrefix = "FV_DICT_DROP_";
	if(CU.isEmpty(this.searchFieldSize)) this.searchFieldSize = 20;
	if(CU.isEmpty(this.uploadUrl)) this.uploadUrl = "/omdb/upload/uploadFiles";
	if(CU.isEmpty(this.uploadName)) this.uploadName = "files";
	for(var i=0; i<this.items.length; i++) {
		var item = this.items[i];
		if(item.rowNum > this.maxRowNum) this.maxRowNum = item.rowNum;
		if(item.colNum > this.maxColNum) this.maxColNum = item.colNum;
	}
	if(CU.isEmpty(this.colCount)) this.colCount = this.maxColNum;
	
	this.formWidth = thiz.compWidth<=0 ? null : ((thiz.labelWidth+thiz.compWidth) * thiz.colCount + 35);
	if(this.widthType == 2) {	//比例
		var mx = this.labelWidth + this.compWidth;
		this.labelWidth = parseInt(Math.round((this.labelWidth*100/mx)/this.colCount), 10)-1;
		this.compWidth = parseInt((Math.round(this.compWidth*100/mx)/this.colCount), 10)-1;
	}
	this.widthUnit = this.widthType==2 ? "%" : "px";
	
	for(var i=0; i<this.attrs.length; i++) {
		var a = this.attrs[i];
		this.attrMap[a.id] = a;
		if(!CU.isEmpty(a.attrCode)) {
			this.attrCodeMap[$.trim(a.attrCode.toUpperCase())] = a;
		}
	}
	
	if(!CU.isEmpty(config.dictDropMap)) {
		for(var key in config.dictDropMap) {
			DROP[thiz.dictDropPrefix+key] = config.dictDropMap[key];
		}
	}
	
	this.el_form = CU.isObject(thiz.bid) ? $(thiz.bid) : $("#"+thiz.bid);
	this.el_fieldsMap = {};		//key=attrId
	
	
	this.getFieldId = function(attrId) {
		return thiz.fieldIdPrefix + attrId;
	};
	
	
	this.getDictDropName = function(dictId) {
		return thiz.dictDropPrefix + dictId;
	};
	
	
	this.getFieldFixProperty = function(item, maxLength) {
		var html = ['id="'+item.fieldId+'" componentType="'+item.compType+'"'];
		if(item.isRequ) html.push("required");
		if(!CU.isEmpty(item.placehold)) html.push('placeholder="'+item.placehold+'"');
		if(!CU.isEmpty(item.pattern)) html.push('pattern="'+item.pattern+'"');
		if(!CU.isEmpty(item.title)) html.push('title="'+item.title+'"');
		if(!CU.isEmpty(maxLength)) html.push('maxLength="'+maxLength+'"');
//		if(!CU.isEmpty(item.label)) html.push('label="'+item.label+'"');
		return html.join(' ');
	};
	
	
	this.getSelectOptionHtml = function(dictId) {
		if(CU.isEmpty(dictId)) return "";
		return PU.getSelectOptionsHtml(thiz.getDictDropName(dictId));
	};
	this.getSelectOptionValue = function(dictId, v) {
		if(CU.isEmpty(dictId)) return "";
		return PU.getDropValue(thiz.getDictDropName(dictId), v);
	};
	
	this.getRedioOptionHtml = function(item, attr, disable, boxDispType) {
		if(CU.isEmpty(item.dictId)) return "";
		var drops = DROP[thiz.getDictDropName(item.dictId)];
		if(CU.isEmpty(drops)) return "";
		if(CU.isEmpty(boxDispType)) boxDispType = 1;
		boxDispType = parseInt(boxDispType, 10);
		var attrCode = CU.getObjectValue(attr, "attrStdCode", "");
		
		var html = [];
		for(var i=0,ck=true; i<drops.length; i++) {
			var d = drops[i];
			if(CU.isEmpty(d.code)) {
				continue ;
			}
			html.push('<label class="fancy-radio custom-color-blue '+(boxDispType!=2?'box-auto-margin':'')+'"><input name="'+item.fieldId+'" form-code="'+attrCode+'" value="'+d.code+'" type="radio" '+(ck?'checked':'')+' '+(disable===true?'disabled':'')+'><span><i></i>'+d.name+'</span></label>');
			if(boxDispType == 2) html.push('<br>');
			if(ck) ck = false;
		}
		return html.join('');
	};
	
	this.getCheckboxOptionHtml = function(item, attr, disable, boxDispType) {
		if(CU.isEmpty(item.dictId)) return "";
		var drops = DROP[thiz.getDictDropName(item.dictId)];
		if(CU.isEmpty(drops)) return "";
		if(CU.isEmpty(boxDispType)) boxDispType = 1;
		boxDispType = parseInt(boxDispType, 10);
		var attrCode = CU.getObjectValue(attr, "attrStdCode", "");
		
		var html = [];
		for(var i=0; i<drops.length; i++) {
			var d = drops[i];
			if(CU.isEmpty(d.code)) {
				continue ;
			}
			html.push('<label class="fancy-checkbox custom-bgcolor-blue '+(boxDispType!=2?'box-auto-margin':'')+'"><input type="checkbox" form-code="'+attrCode+'" value="'+d.code+'" '+(disable===true?'disabled':'')+'><span>'+d.name+'</span></label>');
			if(boxDispType == 2) html.push('<br>');
		}
		return html.join('');
	};
	
	
	this.onSummernoteImageUpload = function(files) {
		PU.onSummernoteUploadFiles($(this), files, thiz.uploadUrl, thiz.uploadName);
	};
	
	this.onSearchFieldSetParams = function(params) {
		var rqs = {};
    	var dictId = $(this).attr("dictId");
    	rqs[RS.PSK] = CU.toString([1, thiz.searchFieldSize, dictId, params.term]);
    	return rqs;
	};
	
	this.onSearchFieldQueryResult = function(rs) {
		var array = [];
		if(CU.isEmpty(this.$element.attr("multiple"))) {
			array.push({id:0, text:"清空"});
		}
    	if(!CU.isEmpty(rs) && !CU.isEmpty(rs.data)) {
    		var data = rs.data;
    		for(var i=0; i<data.length; i++) {
    			array.push({id:data[i].code, text:data[i].name});
	    	}
    	}
    	return {results: array};
	};
	
	
	this.appendEditableField = function(el_parent, item) {
		var attr = thiz.attrMap[item.attrId];
		if(CU.isEmpty(attr)) {
			return "";
		}
		
		item.fieldId = thiz.getFieldId(item.attrId);
		if(CU.isEmpty(item.compType)) item.compType = 1;
		item.isRequ = item.isRequ===1 || item.isRequ=="1" || item.isRequ=="true" || item.isRequ===true;
		if(CU.isEmpty(item.width)) item.width = 1;
		if(CU.isEmpty(item.label)) item.label = attr.attrName;
		if(CU.isEmpty(item.style)) item.style = "";
		if(CU.isEmpty(item.fileTypeRegex)) item.fileTypeRegex = "";
		item.compType = parseInt(item.compType, 10);
		
		var lw = thiz.labelWidth + thiz.widthUnit;
		var cw =  ((thiz.labelWidth+thiz.compWidth)*item.width - thiz.labelWidth) + thiz.widthUnit;
		if(thiz.compWidth < 0) cw = "calc(100% - "+(-thiz.compWidth)+"px)";
		var maxlen = attr.attrType==1 ? "16" : (attr.attrType==3 ? "60" : (attr.attrType==4 ? "330" : ""));		//1=整数  2=小数  3=短文本(<=200)  4=长文本(<=1000)  5=文章
		
		el_parent.append($('<label for="'+item.fieldId+'" class="control-label pull-left form-label" style="width:'+lw+';">'+item.label+(item.isRequ?'<font color="red">*</font>':'')+' </label>'));
		
		var el_cont = $('<div class="pull-left" style="width:'+cw+';"></div>');
		el_parent.append(el_cont);
		var el_field = null;
		
		//1=文本框 2=数值框 3=下拉列表 4=单选框 5=复选框 11=搜索单选 12=搜索多选 13=多选复选框 21=日期 22=时间 23=日期时间 24=颜色选择 31=文本域 32=富文本 41=文件 42=文件组 43=图片 44=图片组
		if(item.compType === 1) {
			el_field = $('<input class="form-control pretty-form-field" style="width:100%;'+item.style+'"  '+thiz.getFieldFixProperty(item, maxlen)+'>');
			el_cont.append(el_field);
		}else if(item.compType == 2) {	//数值框
			if(attr.attrType==2 || attr.attrType=="2") {
				if(CU.isEmpty(item.pattern)) item.pattern = "[0-9]{0,16}(([.]([0-9]{1,8}))?)";
				el_field = $('<input class="form-control pretty-form-field" style="width:100%;'+item.style+'"  '+thiz.getFieldFixProperty(item)+'>');
			}else {
				el_field = $('<input class="form-control pretty-form-field" style="width:100%;'+item.style+'"  '+thiz.getFieldFixProperty(item, maxlen)+'>');
				CU.onlyInteger(el_field);
			}
			el_cont.append(el_field);
		}else if(item.compType == 3) {	//下拉列表
			el_field = $('<select class="select-basic form-control pretty-form-field" style="width:100%;'+item.style+'" '+thiz.getFieldFixProperty(item)+'>'+thiz.getSelectOptionHtml(item.dictId)+'</select>');
			el_cont.append(el_field);
		}else if(item.compType == 4) {	//单选框
			el_field = $('<div id="'+item.fieldId+'" class="pretty-form-field" style="width:100%;line-height:34px;'+item.style+'" componentType="4" >'+thiz.getRedioOptionHtml(item, attr, false, item.boxDispType)+'&nbsp;</div>');
			el_cont.append(el_field);
		}else if(item.compType == 5) {	//复选框
			if(CU.isEmpty(item.selVal)) item.selVal = 1;
			if(CU.isEmpty(item.notSelVal)) item.notSelVal = 0;
			el_field = $('<div id="'+item.fieldId+'" class="fancy-checkbox custom-bgcolor-blue pretty-form-field" style="line-height:34px;'+item.style+'" componentType="5" selectValue="'+item.selVal+'" noselectValue="'+item.notSelVal+'" ><label><input type="checkbox"><span></span></label></div>');
			el_cont.append(el_field);
		}else if(item.compType==11 || item.compType==12) {	//搜索单选、搜索多选
			el_field = $('<select id="'+item.fieldId+'" class="select-basic pretty-form-field" dictId="'+item.dictId+'" '+(item.compType==12?'multiple="multiple"':'')+' style="width:100%;'+item.style+'" componentType="'+item.compType+'" '+(item.isRequ?'required':'')+' '+(CU.isEmpty(item.title)?'':('title="'+item.title+'"'))+'></select>');
			el_cont.append(el_field);
			
			el_field.select2({placeholder:item.placehold,minimumInputLength:0,maximumInputLength:20,language:'zh-CN',ajax: {
			    url: RS.getRemoteUrl({addroot:thiz.addroot,url:"/omdb/dict/queryDynamicDataPageList"}),
			    dataType: 'json',
			    delay: 500,
			    data: thiz.onSearchFieldSetParams,
			    processResults: thiz.onSearchFieldQueryResult,
			    cache: true,
			    allowClear: true
			}});
		}else if(item.compType == 13) {	//多选复选框
			el_field = $('<div id="'+item.fieldId+'" class="pretty-form-field" style="width:100%;line-height:34px;'+item.style+'" componentType="13" >'+thiz.getCheckboxOptionHtml(item, attr, false, item.boxDispType)+'&nbsp;</div>');
			el_cont.append(el_field);
		}else if(item.compType == 21) {	//日期
			el_field = $('<div id="'+item.fieldId+'" class="input-group date pretty-form-field" data-provide="datepicker" style="width:100%;'+item.style+'" componentType="21" ><input type="text" class="form-control" '+(item.isRequ?'required':'')+' '+(CU.isEmpty(item.title)?'':('title="'+item.title+'"'))+'><span class="input-group-addon"><i class="fa fa-calendar"></i></span></div>');
			el_cont.append(el_field);
		}else if(item.compType == 22) {	//时间
			el_field = $('<div id="'+item.fieldId+'" class="input-group basic-clockpicker pretty-form-field" style="width:100%;'+item.style+'" componentType="22" ></div>');
			var el_clock = $('<input type="text" class="form-control clockpicker" '+(item.isRequ?'required':'')+'>');
			el_field.append(el_clock);
			el_field.append($('<span class="input-group-addon" style="cursor:pointer;"><span class="fa fa-clock-o"></span></span>'));
			el_field.clockpicker({donetext:'确定', autoclose:true, 'default': 'now'});
			el_clock.bind("blur", function() {
				var v = $(this).val();
				if(!(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9]))?$/.test(v))) {
					$(this).val("");
				}
			});
			el_cont.append(el_field);
		}else if(item.compType == 23) {	//日期时间
			el_field = $('<div id="'+item.fieldId+'" class="input-group pretty-form-field" style="width:100%;'+item.style+'" componentType="23" ></div>');
			var el_dt = $('<input type="text" class="form-control" '+(item.isRequ?'required':'')+'>');
			var el_ico = $('<span class="input-group-addon" style="cursor:pointer;"><i class="fa fa-calendar"></i></span>');
			el_field.append(el_dt);
			el_field.append(el_ico);
			el_dt.datetimepicker($.fn.datetimepicker.defaults);
			el_ico.bind("click", function(){$($($(this).parent()[0]).children()[0]).focus();});
			el_cont.append(el_field);
		}else if(item.compType == 24) {	//颜色选择
			el_field = $('<div id="'+item.fieldId+'" class="input-group colorpicker-component pretty-form-field" style="width:100%;'+item.style+'" componentType="24" ><input type="text" class="form-control" '+(item.isRequ?'required':'')+'><span class="input-group-addon"><i></i></span></div>');
			el_field.colorpicker({colorSelectors:thiz.colorSelectors,width:500,height:500});
			el_cont.append(el_field);
		}else if(item.compType == 31) {	//文本域
			if(CU.isEmpty(item.height)) item.height = 100;
			el_field = $('<textarea class="form-control pretty-form-field" style="width:100%;overflow:auto;height:'+item.height+'px;'+item.style+'" '+thiz.getFieldFixProperty(item, maxlen)+' componentType="31"></textarea>');
			el_cont.append(el_field);
		}else if(item.compType == 32) {	//富文本
			if(CU.isEmpty(item.height)) item.height = 300;
			el_field = $('<div id="'+item.fieldId+'" class="summernote pretty-form-field" style="width:100%;'+item.style+'" componentType="32" ></div>');
			el_cont.append(el_field);
		}else if(item.compType==41 || item.compType==42 || item.compType==43 || item.compType==44) {	//41=文件 42=文件组 43=图片 44=图片组
			var type = (item.compType==43 || item.compType==44) ? "image" : "file";
			var single = item.compType==41 || item.compType==43;
			var format = item.fileTypeRegex;
			if(CU.isEmpty(format)&&type=="image") format = "bmp|tif|tiff|gif|jpeg|jpg|svg|png|ico";
			el_field = new PrettyUploadField({bid:el_cont, type:type, single:single, format:format, maxSize:item.fileMaxSize, uploadUrl:thiz.uploadUrl, uploadName:thiz.uploadName});
			el_field.attr("id", item.fieldId);
			el_field.attr("componentType", item.compType);
		}else if(item.compType==51) {
			var html = ["<option value=''>&nbsp;</option>"];
			var ipid = "";
			if(!CU.isEmpty(item.style) && item.style.indexOf("ipid")>0) {
				ipid = item.style.substring(item.style.indexOf("ipid"));
				ipid = ipid.substring(ipid.indexOf("\"")+1);
				if(ipid.indexOf("\"") > 0) ipid = ipid.substring(0, ipid.indexOf("\""));
				ipid = ","+$.trim(ipid)+",";
			}
			for(var i=0; i<REGION_PROV_CITY.length; i++) {
				if(ipid.indexOf(","+REGION_PROV_CITY[i].id+",")>=0) continue;
				html.push("<option value='"+REGION_PROV_CITY[i].text+"'>"+REGION_PROV_CITY[i].text+"</option>");
			}
			
			el_field = $('<select class="select-basic form-control pull-left pretty-form-field" style="width:50%;'+item.style+'" '+thiz.getFieldFixProperty(item)+'>'+html.join("")+'</select>');
			el_cont.append(el_field);
			el_cont.append($('<select class="select-basic form-control pull-left pretty-form-field" style="width:50%;'+item.style+'" '+thiz.getFieldFixProperty(item)+'></select>'));
			el_field.bind("change", function() {
				var el = $(this);
				var el_next = $(el.next());
				var v = el.val();
				var h = ["<option value=''>&nbsp;</option>"];
				if(!CU.isEmpty(v)) {
					for(var i=0; i<REGION_PROV_CITY.length; i++) {
						if(REGION_PROV_CITY[i].text == v) {
							var cs = REGION_PROV_CITY[i].children;
							if(!CU.isEmpty(cs)) {
								var cicd = el_next.attr("cicd");
								if(CU.isEmpty(cicd)) cicd = "";
								cicd = ","+$.trim(cicd)+",";
								for(var j=0; j<cs.length; j++) {
									if(cicd.indexOf(","+cs[j].id+",")>=0) continue;
									h.push("<option value='"+cs[j].text+"'>"+cs[j].text+"</option>");
								}
							}
							break;
						}
					}
				}
				el_next.html(h.join(""));
			});
		}else {
			console.error(" is wrong component-type '"+item.compType+"' ");
		}
		thiz.el_fieldsMap[item.attrId] = el_field;
	};
	
	
	this.appendReadonlyField = function(el_parent, item) {
		var attr = thiz.attrMap[item.attrId];
		if(CU.isEmpty(attr)) {
			return "";
		}
		
		item.fieldId = thiz.getFieldId(item.attrId);
		if(CU.isEmpty(item.compType)) item.compType = 1;
		item.isRequ = item.isRequ===1 || item.isRequ=="1" || item.isRequ=="true" || item.isRequ===true;
		if(CU.isEmpty(item.width)) item.width = 1;
		if(CU.isEmpty(item.label)) item.label = attr.attrName;
		if(CU.isEmpty(item.style)) item.style = "";
		item.compType = parseInt(item.compType, 10);
		
		var lw = thiz.labelWidth + thiz.widthUnit;
		var cw =  ((thiz.labelWidth+thiz.compWidth)*item.width - thiz.labelWidth) + thiz.widthUnit;
		if(thiz.compWidth < 0) cw = "calc(100% - "+(-thiz.compWidth)+"px)";
		var maxlen = attr.attrType==1 ? "16" : (attr.attrType==3 ? "60" : (attr.attrType==4 ? "330" : ""));		//1=整数  2=小数  3=短文本(<=200)  4=长文本(<=1000)  5=文章
		
		el_parent.append($('<label for="'+item.fieldId+'" class="control-label pull-left form-label" style="width:'+lw+';">'+item.label+(item.isRequ?'<font color="red">*</font>':'')+' </label>'));
		
		var el_cont = $('<div class="pull-left" style="width:'+cw+';"></div>');
		el_parent.append(el_cont);
		var el_field = null;
		
		//1=文本框 2=数值框 3=下拉列表 4=单选框 5=复选框 11=搜索单选 12=搜索多选 13=多选复选框 21=日期 22=时间 23=日期时间 24=颜色选择 31=文本域 32=富文本 41=文件 42=文件组 43=图片 44=图片组
		if(item.compType===1 || item.compType==2 || item.compType==3 || item.compType==11 || item.compType==12
				|| item.compType==21 || item.compType==22 || item.compType==23 || item.compType==24 || item.compType==51) {		//文本框、数值框、下拉列表、搜索单选、搜索多选、日期、时间、日期时间、颜色选择
			if(CU.isEmpty(item.dictId)) item.dictId = "";
			el_field = $('<input class="form-control pretty-form-field" dictId="'+item.dictId+'" style="width:100%;'+item.style+'"  '+thiz.getFieldFixProperty(item, maxlen)+' readOnly>');
			el_cont.append(el_field);
		}else if(item.compType == 4) {	//单选框
			el_field = $('<div id="'+item.fieldId+'" class="pretty-form-field" style="width:100%;line-height:34px;'+item.style+'" componentType="4" >'+thiz.getRedioOptionHtml(item, attr, true, item.boxDispType)+'&nbsp;</div>');
			el_cont.append(el_field);
		}else if(item.compType == 5) {	//复选框
			if(CU.isEmpty(item.selVal)) item.selVal = 1;
			if(CU.isEmpty(item.notSelVal)) item.notSelVal = 0;
			el_field = $('<div id="'+item.fieldId+'" class="fancy-checkbox custom-bgcolor-blue pretty-form-field" style="line-height:34px;'+item.style+'" componentType="5" selectValue="'+item.selVal+'" noselectValue="'+item.notSelVal+'" ><label><input type="checkbox" '+(thiz.editable?'':'disabled')+'><span></span></label></div>');
			el_cont.append(el_field);
		}else if(item.compType == 13) {	//多选复选框
			el_field = $('<div id="'+item.fieldId+'" class="pretty-form-field" style="width:100%;line-height:34px;'+item.style+'" componentType="13" >'+thiz.getCheckboxOptionHtml(item, attr, true, item.boxDispType)+'&nbsp;</div>');
			el_cont.append(el_field);
		}else if(item.compType == 31) {	//文本域
			if(CU.isEmpty(item.height)) item.height = 100;
			el_field = $('<textarea class="form-control pretty-form-field" style="width:100%;overflow:auto;height:'+item.height+'px;'+item.style+'" '+thiz.getFieldFixProperty(item, maxlen)+' componentType="31" readOnly></textarea>');
			el_cont.append(el_field);
		}else if(item.compType == 32) {	//富文本
			if(CU.isEmpty(item.height)) item.height = 300;
			el_field = $('<div id="'+item.fieldId+'" class="form-control pretty-form-field" style="width:'+cw+';overflow:auto;height:'+item.height+'px;'+item.style+'" componentType="32" ></div>');
			el_cont.append(el_field);
		}else if(item.compType==41 || item.compType==42 || item.compType==43 || item.compType==44) {	//41=文件 42=文件组 43=图片 44=图片组
			var type = (item.compType==43 || item.compType==44) ? "image" : "file";
			var single = item.compType==41 || item.compType==43;
			el_field = new PrettyUploadField({bid:el_cont, type:type, single:single, uploadUrl:thiz.uploadUrl, uploadName:thiz.uploadName, editable:false});
			el_field.attr("id", item.fieldId);
			el_field.attr("componentType", item.compType);
		}else {
			console.error(" is wrong component-type '"+item.compType+"' ");
		}
		thiz.el_fieldsMap[item.attrId] = el_field;
	};
	
	
	this.buildForm = function() {
		delete thiz.el_fieldsMap;
		thiz.el_fieldsMap = {};
		thiz.el_form.html("");
		var fw = (thiz.labelWidth+thiz.compWidth) + thiz.widthUnit;
		var itemMap = {};	//key=rowNum, value=array
		for(var i=0; i<thiz.items.length; i++) {
			var item = thiz.items[i];
			var rowNum = item.rowNum;
			var cols = itemMap[rowNum];
			if(CU.isEmpty(cols)) {
				itemMap[rowNum] = cols = {};
			}
			cols[item.colNum] = item;
		}
		
		for(var rn=1; rn<=thiz.maxRowNum; rn++) {
			var cols = itemMap[rn];
			var el_group = $('<div class="form-group"></div>');
			if(CU.isEmpty(cols)) {
				el_group.html("&nbsp;");
				el_group.height(10);
			}else {
				var max = 1;
				for(var k in cols) {
					if(k > max) max = k;
				}
				
				for(var cn=1; cn<=max; cn++) {
					var item = cols[cn];
					if(CU.isEmpty(item)) {
						el_group.append($('<div class="pull-left" style="width:'+fw+';">&nbsp;</div>'));
					}else {
						if(thiz.editable) {
							thiz.appendEditableField(el_group, item)
						}else {
							thiz.appendReadonlyField(el_group, item)
						}
					}
				}
			}
			thiz.el_form.append(el_group);
		}
		
		var summels = thiz.el_form.find(".summernote");
		if(!CU.isEmpty(summels) && summels.length>0) {
			summels.summernote({height:item.height, focus:false, lang:'zh-CN', callbacks:{onImageUpload:thiz.onSummernoteImageUpload}});
		}
	};
	
	if(!this.lazyBuild) this.buildForm();
	
	this.getFormWidth = function() {
		return thiz.formWidth;
	};
	
	
	this.getFieldValue = function(el_field) {
		var value = "";
		var compType = parseInt(el_field.attr("componentType"), 10);
		//1=文本框 2=数值框 3=下拉列表 4=单选框 5=复选框 11=搜索单选 12=搜索多选 13=多选复选框 21=日期 22=时间 23=日期时间 24=颜色选择 31=文本域 32=富文本 41=文件 42=文件组 43=图片 44=图片组
		if(compType===1 || compType==2 || compType==3 || compType==31) {	//文本框、数值框、下拉列表、文本域
			value = el_field.val();
		}else if(compType==4 || compType==13) {	//单选框、多选复选框
			var inputs = el_field.find("input");
			var array = [];
			for(var i=0; i<inputs.length; i++) {
				var input = $(inputs[i]);
				if(input.is(':checked')) {
					array.push(input.attr("value"));
				}
			}
			value = array.join(",");
		}else if(compType == 5) {	//复选框
			var input = $(el_field.find("input")[0]);
			value = input.is(':checked') ? el_field.attr("selectValue") : el_field.attr("noselectValue");
		}else if(compType==11 || compType==12) {	//搜索单选、搜索多选
			value = el_field.val();
			if(CU.isArray(value)) value = value.join(",");
		}else if(compType==21 || compType==22 || compType==23 || compType==24) {	//日期、时间、日期时间、颜色选择
			value = $(el_field.find("input")[0]).val();
			if(!CU.isEmpty(value) && compType==22) {	//时间
				value = CU.toNumberTime(value);
				value = value.substring(0,2)+":"+value.substring(2,4)+":"+value.substring(4,6);
			}
		}else if(compType == 32) {	//富文本
			value = el_field.summernote('code');
		}else if(compType==41 || compType==42 || compType==43 || compType==44) {	//41=文件 42=文件组 43=图片 44=图片组
			value = CU.toString(el_field.getValue());
		}else if(compType==51) {
			value = el_field.val();
			if(!CU.isEmpty(value)) {
				var n = $(el_field.next()).val();
				if(!CU.isEmpty(n)) {
					value += ","+n;
				}
			}
		}
		return value;
	};
	
	
	
	//searchData : {dictId:{code:value}}	code为string类型
	this.setFieldValue = function(el_field, value, searchData) {
		if(CU.isEmpty(value)) value = "";
		var compType = parseInt(el_field.attr("componentType"), 10);
		//1=文本框 2=数值框 3=下拉列表 4=单选框 5=复选框 11=搜索单选 12=搜索多选 13=多选复选框 21=日期 22=时间 23=日期时间 24=颜色选择 31=文本域 32=富文本 41=文件 42=文件组 43=图片 44=图片组
		if(compType===1 || compType==2 || compType==31) {	//文本框、数值框、文本域
			el_field.val(value);
		}else if(compType==3) {		//下拉列表
			if(thiz.editable) {
				el_field.val(value);
			}else {
				var text = thiz.getSelectOptionValue(el_field.attr("dictId"), value);
				el_field.val(text);
			}
		}else if(compType==4 || compType==13) {	//单选框、多选复选框
			if(!CU.isEmpty(value)) {
				value = ","+value+",";
				var inputs = el_field.find("input");
				for(var i=0; i<inputs.length; i++) {
					var input = $(inputs[i]);
					var v = ","+input.attr("value")+",";
					input.prop("checked", value.indexOf(v)>=0);
				}
			}
		}else if(compType == 5) {	//复选框
			var input = $(el_field.find("input")[0]);
			input.prop("checked", (value+"")==(el_field.attr("selectValue")+""));
		}else if(compType==11 || compType==12) {	//搜索单选、搜索多选
			var dictId = el_field.attr("dictId");
			var m = searchData[parseInt(dictId, 10)];
			if(!CU.isEmpty(value) && !CU.isEmpty(searchData) && !CU.isEmpty(dictId) && !CU.isEmpty(m)) {
				var ops = [];
				var codes = value.split(",");
				for(var i=0; i<codes.length; i++) {
					var op = m[codes[i]];
					if(!CU.isEmpty(op)) {
						if(thiz.editable) {
							ops.push("<option selected value='"+op.code+"'>"+op.name+"</option>");
						}else {
							ops.push(op.name);
						}
					}
				}
				if(thiz.editable) {
					el_field.html(ops.join(""));
				}else {
					el_field.val(ops.join(","));
				}
			}
		}else if(compType==21 || compType==22 || compType==23 || compType==24) {	//日期、时间、日期时间、颜色选择
			if(thiz.editable) {
				$(el_field.find("input")[0]).val(value);
			}else {
				el_field.val(value);
			}
		}else if(compType == 32) {	//富文本
			if(thiz.editable) {
				el_field.summernote('code', value);
			}else {
				el_field.html(value);
			}
		}else if(compType==41 || compType==42 || compType==43 || compType==44) {	//41=文件 42=文件组 43=图片 44=图片组
			if(!CU.isEmpty(value) && value.length>=2 && value.substring(0,1)=='[' && value.substring(value.length-1)==']') {
				var array = CU.toObject(value);
				el_field.setValue(array)
			}
		}else if(compType==51) {
			if(thiz.editable) {
				var el_next = $(el_field.next());
				el_field.val("");
				el_next.val("");
				if(!CU.isEmpty(value)) {
					var idx = value.indexOf(',');
					var p = idx>=0 ? value.substring(0, idx) : value;
					var c = idx>=0 ? value.substring(idx+1) : "";
					el_field.val(p);
					el_field.change();
					el_next.val(c);
				}
			}else {
				el_field.val(value);
			}
		}
	};
	
	
	
	this.clearFieldValue = function(el_field) {
		var compType = parseInt(el_field.attr("componentType"), 10);
		//1=文本框 2=数值框 3=下拉列表 4=单选框 5=复选框 11=搜索单选 12=搜索多选 13=多选复选框 21=日期 22=时间 23=日期时间 24=颜色选择 31=文本域 32=富文本 41=文件 42=文件组 43=图片 44=图片组
		if(compType===1 || compType==2 || compType==3 || compType==31) {	//文本框、数值框、下拉列表、文本域
			el_field.val("");
		}else if(compType==4 || compType==13) {	//单选框、多选复选框
			var inputs = el_field.find("input");
			for(var i=0; i<inputs.length; i++) {
				var input = $(inputs[i]);
				input.prop("checked", i===0&&compType==4);
			}
		}else if(compType == 5) {	//复选框
			var input = $(el_field.find("input")[0]);
			input.prop("checked", false);
		}else if(compType==11 || compType==12) {	//搜索单选、搜索多选
			if(thiz.editable) {
				el_field.html("");
			}else {
				el_field.val("");
			}
		}else if(compType==21 || compType==22 || compType==23 || compType==24) {	//日期、时间、日期时间、颜色选择
			if(thiz.editable) {
				$(el_field.find("input")[0]).val("");
			}else {
				el_field.val("");
			}
		}else if(compType == 32) {	//富文本
			if(thiz.editable) {
				el_field.summernote('code', "");
			}else {
				el_field.html("");
			}
		}else if(compType==41 || compType==42 || compType==43 || compType==44) {	//41=文件 42=文件组 43=图片 44=图片组
			el_field.clearValue();
		}else if(compType==51) {
			var el_next = $(el_field.next());
			el_field.val("");
			el_next.val("");
		}
	};
	
	
	
	/**
	 * 获取表单数据
	 * @param keyType : 1=属性代码为key, 2=属性id为key, 缺省为1
	 */
	this.getFormData = function(keyType) {
		if(CU.isEmpty(keyType)) keyType = 1;
		var data = {};
		for(var attrId in thiz.el_fieldsMap) {
			var attr = thiz.attrMap[attrId];
			var el_field = thiz.el_fieldsMap[attrId];
			if(CU.isEmpty(attr) || CU.isEmpty(el_field)) {
				continue ;
			}
			var key = keyType===1||keyType=="1" ? attr.attrCode : attr.id;
			var value = thiz.getFieldValue(el_field);
			if(value===null || value===undefined) continue;
			data[key] = value;
		}
		return data;
	};
	
	
	
	/**
	 * 设置表单数据
	 * @param keyType : 1=属性代码为key, 2=属性id为key, 缺省为1
	 */
	this.setFormData = function(data, keyType, cb) {
		if(CU.isEmpty(data)) return ;
		if(CU.isEmpty(keyType)) keyType = 1;
		
		var searchs = [];
		for(var key in data) {
			if(CU.isEmpty(key)) continue;
			var value = data[key];
			
			var attr = null;
			if(keyType===1||keyType=="1") {
				attr = thiz.attrCodeMap[$.trim(key).toUpperCase()];
			}else {
				attr = thiz.attrMap[parseInt(key,10)];
			}
			if(CU.isEmpty(attr)) continue ;
			
			var el_field = thiz.el_fieldsMap[attr.id];
			if(CU.isEmpty(el_field)) continue ;
			
			var compType = parseInt(el_field.attr("componentType"), 10);
			if(compType==11 || compType==12) {
				if(!CU.isEmpty(value) && !CU.isEmpty(el_field.attr("dictId"))) {
					searchs.push({a:attr, f:el_field, v:value});
				}
			}else {
				thiz.setFieldValue(el_field, value);
			}
		}
		
		if(searchs.length > 0) {
			var dicts = {};		//key=dictId, value=codes
			for(var i=0; i<searchs.length; i++) {
				var dictId = searchs[i].f.attr("dictId");
				var value = searchs[i].v;
				var array = dicts[dictId];
				if(CU.isEmpty(array)) {
					array = value;
				}else {
					array += ","+value;
				}
				dicts[dictId] = array;
			}
			
			RS.ajax({addroot:thiz.addroot, url:"/omdb/dict/queryDynamicDataByCodeBatch", ps:[dicts], cb:function(rs) {
				if(!CU.isEmpty(rs)) {
					for(var i=0; i<searchs.length; i++) {
						thiz.setFieldValue(searchs[i].f, searchs[i].v, rs)
					}
				}
				if(CU.isFunction(cb)) cb();
			}});
		}else {
			if(CU.isFunction(cb)) cb();
		}
	};
	
	
	
	/**
	 * 清空表单内容
	 */
	this.clearFormData = function() {
		for(var attrId in thiz.el_fieldsMap) {
			var el_field = thiz.el_fieldsMap[attrId];
			if(CU.isEmpty(el_field)) {
				continue ;
			}
			thiz.clearFieldValue(el_field);
		}
	};
	
	
	
	
	
}





/**
 * @param config
 * 		bid : 绑定页面指定的元素ID
 * 		uploadUrl : 上传请求路径, 缺省为: /omdb/upload/uploadFiles
 * 		uploadName : 上传表单字段名, 缺省为: files
 * 		editable : 是否可编辑, 缺省为true
 * 		record: 对应OM中record对象
 * 		form : 对应OM中form对象
 * 		items : 对应OM中form元素
 * 		attrs : 对应OM中模型属性
 * 		dictMap : {key:dictId}, 表单中所需要的字典数据集
 * 		disableFields : [attrStdCode] 指定不可编辑字段
 */
function PrettyOmForm(config) {
	if(CU.isEmpty(config)) throw " the config is empty argument! ";
	if(CU.isEmpty(config.bid)) throw " the config.bid is empty argument! ";
	if(CU.isEmpty(config.record)) throw " the config.record is empty argument! ";
	if(CU.isEmpty(config.form)) throw " the config.form is empty argument! ";
	
	var thiz = this;
	$.extend(thiz, {editable:true, items:[], attrs:[], dictMap:{}, dictDropPrefix:"OMV_DICT_DROP_"}, config);
	this.attrMap = {};
	this.inputFixAttrNamed = {"maxLength":"inputMaxlength", "required":"isRequ", "placeholder":"placehold", "pattern":"pattern", "title":"inputTitle", "selectValue":"selVal", "noselectValue":"notSelVal"};
	
	if(typeof(this.bid)=="string") {
		this.el_base = $("#"+this.bid);
	}else {
		this.el_base = $(this.bid);
		this.bid = this.el_base.attr("id");
		if(CU.isEmpty(this.bid)) this.bid = "PrettyOmForm_"+CU.getId();
	}
	
	
	this.filterNull = function(v, enter) {
		if(CU.isEmpty(v)) {
			v = "";
		}else {
			if(enter===true) v = v.replace(/\n/g,"<br>").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
		}
		return v;
	};
	
	
	this.getDictDropName = function(dictId) {
		return thiz.dictDropPrefix + dictId;
	};
	
	this.getSelectOptionHtml = function(dictId) {
		if(CU.isEmpty(dictId)) return "";
		return PU.getSelectOptionsHtml(thiz.getDictDropName(dictId));
	};
	this.getSelectOptionValue = function(dictId, v) {
		if(CU.isEmpty(dictId)) return "";
		return PU.getDropValue(thiz.getDictDropName(dictId), v);
	};
	
	this.getRedioOptionHtml = function(item, attr, disable, boxDispType, style) {
		if(CU.isEmpty(item.dictId)) return "";
		var drops = DROP[thiz.getDictDropName(item.dictId)];
		if(CU.isEmpty(drops)) return "";
		if(CU.isEmpty(boxDispType)) boxDispType = 1;
		boxDispType = parseInt(boxDispType, 10);
		var attrCode = CU.getObjectValue(attr, "attrStdCode", "");
		
		var html = [];
		var name = "formField_" + item.attrId;
		if(CU.isEmpty(style)) style = "";
		for(var i=0,ck=true; i<drops.length; i++) {
			var d = drops[i];
			if(CU.isEmpty(d.code) || d.status!=1 || d.isDisp!=1) {
				continue ;
			}
			html.push('<label class="fancy-radio custom-color-blue '+(boxDispType==1?'box-auto-margin':'')+'" style="margin-bottom:10px;"><input name="',name,'" form-code="',attrCode,'" value="',d.code,'" type="radio" class="form-input" form-input-type="4" '+(ck?'checked':'')+' '+(disable===true?'disabled':'')+' style="',style,'"><span><i></i>'+d.name+'</span></label>');
			if(boxDispType == 2) html.push('<br>');
			if(ck) ck = false;
		}
		return html.join('');
	};
	
	this.getCheckboxOptionHtml = function(item, attr, disable, boxDispType, style) {
		if(CU.isEmpty(item.dictId)) return "";
		var drops = DROP[thiz.getDictDropName(item.dictId)];
		if(CU.isEmpty(drops)) return "";
		if(CU.isEmpty(boxDispType)) boxDispType = 1;
		boxDispType = parseInt(boxDispType, 10);
		var attrCode = CU.getObjectValue(attr, "attrStdCode", "");
		
		var html = [];
		var name = "formField_" + item.attrId;
		if(CU.isEmpty(style)) style = "";
		for(var i=0; i<drops.length; i++) {
			var d = drops[i];
			if(CU.isEmpty(d.code) || d.status!=1 || d.isDisp!=1) {
				continue ;
			}
			html.push('<label class="fancy-checkbox custom-bgcolor-blue '+(boxDispType==1?'box-auto-margin':'')+'" style="margin-bottom:10px;"><input name="',name,'" form-code="',attrCode,'" value="',d.code,'" type="checkbox" class="form-input" form-input-type="13" '+(disable===true?'disabled':'')+' style="',style,'"><span>'+d.name+'</span></label>');
			if(boxDispType == 2) html.push('<br>');
		}
		return html.join('');
	};
	
	this.getProvinceOptionHtml = function() {
		var html = ['<option value="">&nbsp;</option>'];
		for(var i=0; i<REGION_PROV_CITY.length; i++) {
			var n = REGION_PROV_CITY[i].n;
			html.push('<option value="',n,'">',n,'</option>');
		}
		return html.join('');
	};
	this.getCityOptionHtml = function(pn) {
		var html = ['<option value="">&nbsp;</option>'];
		for(var i=0; i<REGION_PROV_CITY.length; i++) {
			if(REGION_PROV_CITY[i].n == pn) {
				var cs = REGION_PROV_CITY[i].cs;
				if(!CU.isEmpty(cs)) {
					for(var j=0; j<cs.length; j++) {
						html.push('<option value="',cs[j],'">',cs[j],'</option>');
					}
				}
				break;
			}
		}
		return html.join('');
	};
	
	this.getInputAttrs = function(item) {
		var html = [];
		for(var k in thiz.inputFixAttrNamed) {
			var n = thiz.inputFixAttrNamed[k];
			var v = item[n];
			if(CU.isEmpty(v)) {
				continue ;
			}
			if(k == "required") {
				if(v==1 || v=="1") {
					html.push(k);
				}
			}else {
				html.push(k+"=\""+v+"\"");
			}
		}
		return html.join(" ");
	};
	
	this.getInputEditHtml = function(item, form, attr) {
		var html = [];
		var name = "formField_" + item.attrId;
		var style = thiz.mergeStyle(item.inputStyle, form.inputStyle);
		var fas = thiz.getInputAttrs(item);
		var it = item.inputType + "";
		var bdt = item.boxDispType;
		if(CU.isEmpty(bdt) || bdt==0 || bdt=="0") bdt = form.boxDispType;
		if(CU.isEmpty(item.selVal)) item.selVal = "";
		if(CU.isEmpty(item.notSelVal)) item.notSelVal = "";
		var attrCode = CU.getObjectValue(attr, "attrStdCode", "");
		
		switch(it) {
			//文本框
			case "1": html.push('<input type="text" name="',name,'" form-code="',attrCode,'" class="form-control form-input" form-input-type="1" style="',style,'" ',fas,'>'); break;
			//数值框
			case "2": html.push('<input type="number" name="',name,'" form-code="',attrCode,'" class="form-control form-input" form-input-type="2" style="',style,'" ',fas,'>'); break;
			//下拉列表
			case "3": html.push('<select name="',name,'" form-code="',attrCode,'" class="select-basic form-control form-input" form-input-type="3" style="',style,'" ',fas,'>',thiz.getSelectOptionHtml(item.dictId),'</select>'); break;
			//单选框
			case "4": html.push(thiz.getRedioOptionHtml(item, attr, false, bdt, style)); break;
			//复选框
			case "5": html.push('<div class="fancy-checkbox custom-bgcolor-blue"><label><input type="checkbox" class="form-input" form-input-type="5" name="',name,'" form-code="',attrCode,'" style="',style,'" selectValue="'+item.selVal+'" noselectValue="'+item.notSelVal+'"><span></span></label></div>'); break;
			//多选复选框
			case "13": html.push(thiz.getCheckboxOptionHtml(item, attr, false, bdt, style)); break;
			//日期
			case "21": 
				html.push('<div class="input-group date" data-provide="datepicker">',
						 '<input type="text" class="form-control form-input" form-input-type="21" name="',name,'" form-code="',attrCode,'" style="',style,'" ',fas,'>',
						 '<span class="input-group-addon"><i class="fa fa-calendar"></i></span>',
						 '</div>'); break;
			//时间
			case "22": 
				html.push('<div class="input-group basic-clockpicker form-provider-clockpicker">',
						 '<input type="text" class="form-control clockpicker form-input" form-input-type="22" name="',name,'" form-code="',attrCode,'" style="',style,'" ',fas,'>',
						 '<span class="input-group-addon" style="cursor:pointer;"><i class="fa fa-clock-o"></i></span>',
						 '</div>'); break;
			//日期时间
			case "23": html.push('<div class="input-group datetime form-provider-datetimepicker" >',
								 '<input type="text" class="form-control form-input" form-input-type="23" name="',name,'" form-code="',attrCode,'" style="',style,'" ',fas,'>',
								 '<span class="input-group-addon form-provider-datetimepicker-icon" style="cursor:pointer;"><i class="fa fa-calendar"></i></span>',
								 '</div>'); break;
			//文本域
			case "31": html.push('<textarea class="form-control form-input" form-input-type="31" maxLength="300" name="',name,'" form-code="',attrCode,'" style="',style,'" ',fas,'></textarea>'); break;
			//省市
			case "51": html.push('<select type="text" name="',name,'" form-code="',attrCode,'" class="form-control pull-left form-input form-provider-province" form-input-type="51" style="',style,';width:50%;" ',fas,'>',thiz.getProvinceOptionHtml(),'</select><select type="text" name="',name,'" form-code="',attrCode,'" class="form-control  pull-left form-input" form-input-type="51" style="',style,';width:50%;" ',fas,'></select>'); break;
			//3位数值框
			case "61": html.push('<input type="text" name="',name,'" form-code="',attrCode,'" class="form-control form-input form-number-3bit" form-input-type="61" style="',style,'" ',fas,'>'); break;
		}
		return html.join("");
	};
	
	
	this.getDisabledEditHtml = function(item, form, attr) {
		var html = [];
		var name = "formField_" + item.attrId;
		var style = thiz.mergeStyle(item.inputStyle, form.inputStyle);
		var fas = thiz.getInputAttrs(item);
		var it = item.inputType + "";
		var bdt = item.boxDispType;
		if(CU.isEmpty(bdt) || bdt==0 || bdt=="0") bdt = form.boxDispType;
		if(CU.isEmpty(item.selVal)) item.selVal = "";
		if(CU.isEmpty(item.notSelVal)) item.notSelVal = "";
		
		switch(it) {
			//文本框
			case "1": html.push('<input type="text" name="',name,'" class="form-control form-input" form-input-type="1" style="',style,'" ',fas,' readOnly>'); break;
			//数值框
			case "2": html.push('<input type="number" name="',name,'" class="form-control form-input" form-input-type="2" style="',style,'" ',fas,' readOnly>'); break;
			//下拉列表
			case "3": html.push('<input type="text" name="',name,'" class="form-control form-input" form-input-type="3" dictId="',item.dictId,'" style="',style,'" ',fas,' readOnly>'); break;
			//单选框
			case "4": html.push(thiz.getRedioOptionHtml(item, attr, true, bdt, style)); break;
			//复选框
			case "5": html.push('<div class="fancy-checkbox custom-bgcolor-blue"><label><input type="checkbox" class="form-input" form-input-type="5" name="',name,'" style="',style,'" selectValue="'+item.selVal+'" noselectValue="'+item.notSelVal+'" disabled><span></span></label></div>'); break;
			//多选复选框
			case "13": html.push(thiz.getCheckboxOptionHtml(item, attr, true, bdt, style)); break;
			//日期
			case "21": html.push('<input type="text" name="',name,'" class="form-control form-input" form-input-type="21" style="',style,'" ',fas,' readOnly>'); break;
			//时间
			case "22": html.push('<input type="text" name="',name,'" class="form-control form-input" form-input-type="22" style="',style,'" ',fas,' readOnly>'); break;
			//日期时间
			case "23": html.push('<input type="text" name="',name,'" class="form-control form-input" form-input-type="23" style="',style,'" ',fas,' readOnly>'); break;
			//文本域
			case "31": html.push('<textarea class="form-control form-input" form-input-type="31" maxLength="300" name="',name,'" style="',style,'" ',fas,' readOnly></textarea>'); break;
			//省市
			case "51": html.push('<input type="text" name="',name,'" class="form-control form-input" form-input-type="51" style="',style,'" ',fas,' readOnly>'); break;
			//3位数值框
			case "61": html.push('<input type="text" name="',name,'" class="form-control form-input form-number-3bit" form-input-type="61" style="',style,'" ',fas,' readOnly>'); break;
		}
		return html.join("");
	};
	
	this.render = function() {
		if(CU.isEmpty(thiz.items) || CU.isEmpty(thiz.attrs)) {
			return ;
		}
		
		var html = [];
		for(var i=0; i<thiz.items.length; i++) {
			var item = thiz.items[i];
			var attr = thiz.attrMap[item.attrId+""];
			var labelStyle = thiz.mergeStyle(item.labelStyle, thiz.form.labelStyle);
			var remarkStyle = thiz.mergeStyle(item.remarkStyle, thiz.form.remarkStyle);
			var containerStyle = thiz.mergeStyle(item.inputParentStyle, thiz.form.inputParentStyle);
			var groupStyle = thiz.mergeStyle(item.formItemStyle, thiz.form.formItemStyle);
			var labelPost = thiz.getLabelPost(item, thiz.form);
			var attrCode = CU.getObjectValue(attr, "attrStdCode");
			
			html.push('<div class="form-group om-form-group" itemType="',item.itemType,'" style="',groupStyle,'">');
			if(item.itemType == 1) {
				var it = item.inputType;
				html.push('<label class="control-label om-form-label-name',(labelPost==2?' pull-left lw120':''),'" style="',labelStyle,'">',(item.isRequ==1?'<font color="red">*</font>':''),thiz.filterNull(item.labelName, true),'</label>');
				if(labelPost==1 && !CU.isEmpty(item.remarkName)) {
					html.push('<label class="control-label om-form-label-remark" style="',remarkStyle,'">',thiz.filterNull(item.remarkName),'</label>');
				}
				html.push('<div class="om-form-input-container',(labelPost==2?' pull-left':''),'" style="',((it==4||it==5||it==13)?'padding-top:5px;min-height:32px;':''),containerStyle,'">');
				if(thiz.editable && item.isReadonly!=1 && (CU.isEmpty(thiz.disableFields) || CU.isEmpty(attrCode) || thiz.disableFields.indexOf(attrCode)<0)) {
					html.push(thiz.getInputEditHtml(item, thiz.form, attr));
				}else {
					html.push(thiz.getDisabledEditHtml(item, thiz.form, attr));
				}
				html.push("</div>");
				if(labelPost==2 && !CU.isEmpty(item.remarkName)) {
					html.push('<label class="control-label om-form-label-remark" style="',remarkStyle,'">',thiz.filterNull(item.remarkName),'</label>');
				}
			}else if(item.itemType == 2) {
				html.push(item.textCont);
			}
			html.push("</div>");
		}
		thiz.el_base.html(html.join(""));
		
		if(thiz.editable) {
			thiz.el_base.find(".form-provider-clockpicker").clockpicker({donetext:'确定', autoclose:true, 'default': 'now'});
			thiz.el_base.find("input[form-input-type='22']").bind("blur", function() {
				var v = $(this).val();
				if(!(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9]))?$/.test(v))) {
					$(this).val("");
				}
			});
			var el_dts = thiz.el_base.find("input[form-input-type='23']");
			if(!CU.isEmpty(el_dts) && el_dts.length>0) {
				for(var i=0; i<el_dts.length; i++) {
					var el_dt = $(el_dts[i]);
					if(!el_dt.prop("readOnly") && !el_dt.prop("disabled")) {
						el_dt.datetimepicker($.fn.datetimepicker.defaults);
					}
				}
			}
			
			thiz.el_base.find(".form-provider-datetimepicker-icon").bind("click", function(){$($($(this).parent()[0]).children()[0]).focus();});
			thiz.el_base.find(".form-provider-province").bind("change", function() {
				var el = $(this);
				var p = el.val();
				var ops = "";
				if(!CU.isEmpty(p)) {
					ops = thiz.getCityOptionHtml(p);
				}
				$(el.next()).html(ops);
			});
			thiz.el_base.find("input[form-input-type='61']").bind("keyup", function(e) {
				thiz.format3BitNumberField(this);
			});
			thiz.el_base.find("input[form-input-type='61']").bind("keypress", function(e) {
				var keyCode = e.keyCode || e.which;
		        return keyCode >= 48 && keyCode <= 57;
			});
			thiz.el_base.find("input[form-input-type='61']").bind("input", function(e) {
				thiz.format3BitNumberField(this);
			});
			thiz.el_base.find("input[form-input-type='61']").bind("paste", function(e) {
				var el_input = this;
				setTimeout(function(){
					thiz.format3BitNumberField(el_input);
				}, 100);
			});
		}
	};
	
	this.setFormItems = function(items) {
		thiz.items = items;
	};
	this.setClassAttrs = function(attrs) {
		thiz.attrs = attrs;
		thiz.attrMap = {};
		if(!CU.isEmpty(attrs)) {
			for(var i=0; i<attrs.length; i++) {
				thiz.attrMap[attrs[i].id+""] = attrs[i];
			}
		}
	};
	this.setDictMap = function(dictMap) {
		thiz.dictMap = dictMap;
		if(!CU.isEmpty(thiz.dictMap)) {
			for(var key in thiz.dictMap) {
				DROP[thiz.dictDropPrefix+key] = thiz.dictMap[key];
			}
		}
	};
	
	this.format3BitNumberField = function(el) {
		CU.format3BitNumberField(el);
	};
	
	this.to3BitNumberFormat = function(num) {
		return CU.to3BitNumberFormat(num);
	};
	
	this.getLabelPost = function(item, form) {
		var post = 1;
		if(CU.isEmpty(item) || CU.isEmpty(post=item.labelPost) || post==0) {
			if(!CU.isEmpty(form) && !CU.isEmpty(form.labelPost) && form.labelPost>0) {
				post = form.labelPost;
			}
			if(CU.isEmpty(post) || post==0) {
				post = 1;
			}
		}
		return post;
	};
	
	this.mergeStyle = function(style, defaultStyle) {
		var so = CU.parseStyle2Object(defaultStyle);
		var co = CU.parseStyle2Object(style);
		$.extend(so, co);
		return CU.parseObject2Style(so);
	};
	
	
	this.getInputDemoHtml = function(item, form) {
		var html = [];
		var name = "formField_" + item.attrId;
		var style = thiz.mergeStyle(item.inputStyle, form.inputStyle);
		var csty = thiz.mergeStyle(item.inputParentStyle, form.inputParentStyle);
		var left = thiz.getLabelPost(item, form)==1 ? "" : "pull-left";
		switch(item.inputType+"") {
			//文本框、数值框、3位数值框
			case "1":
			case "2": 
			case "61": html.push('<div class="',left,'" style="',csty,'"><input type="text" name="',name,'" class="form-control" style="',style,'" ></div>'); break;
			//下拉列表
			case "3": html.push('<div class="',left,'" style="',csty,'"><select name="',name,'" class="select-basic form-control" style="',style,'" ></select></div>'); break;
			//单选框
			case "4": html.push('<div class="',left,'" style="padding-top:5px;',csty,'"><label class="fancy-radio custom-color-blue" style="margin-bottom:10px;"><input type="radio" name="',name,'" style="',style,'"><span><i></i></span></label></div>'); break;
			//复选框、多选复选框
			case "5": 
			case "13": html.push('<div class="',left,'" style="padding-top:5px;',csty,'"><div class="fancy-checkbox custom-bgcolor-blue" style="margin-bottom:10px;"><label><input type="checkbox" name="',name,'" style="',style,'"><span></span></label></div></div>'); break;
			//日期、时间、日期时间
			case "21": 
			case "22": 
			case "23": html.push('<div class="',left,'" style="',csty,'"><div class="input-group date" data-provide="datepicker"><input type="text" class="form-control" name="',name,'" style="z-index:0;',style,'"><span class="input-group-addon"><i class="fa fa-calendar"></i></span></div></div>'); break;
			//文本域
			case "31": html.push('<div class="',left,'" style="',csty,'"><textarea class="form-control" maxLength="300" name="',name,'" style="',style,'"></textarea></div>'); break;
			//省市
			case "51": html.push('<div class="',left,'" style="',csty,'"><select type="text" name="',name,'" class="form-control pull-left" style="',style,';width:50%;" ></select><select type="text" name="',name,'" class="form-control  pull-left" style="',style,';width:50%;" ></select></div>'); break;
		}
		return html.join("");
	};
	
	this.getRadioValue = function(els) {
		for(var i=0; i<els.length; i++) {
			var el = els[i];
			if(el.is(":checked")) {
				return el.val();
			}
		}
		return "";
	};
	
	this.setRadioValue = function(els, value) {
		var has = false;
		for(var i=0; i<els.length; i++) {
			var el = els[i];
			if(!has && el.val()==value) {
				el.prop("checked", true);
				has = true;
			}else {
				el.prop("checked", false);
			}
		}
		if(!has && !CU.isEmpty(els) && els.length>0) {
			els[0].prop("checked", true);
		}
		return "";
	};
	
	this.getCheckboxValue = function(el) {
		var value = "";
		if(el.is(":checked")) {
			value = el.attr("selectValue");
			if(CU.isEmpty(value)) value = "1";
		}else {
			value = el.attr("noselectValue");
			if(CU.isEmpty(value)) value = "0";
		}
		return value;
	};
	
	this.setCheckboxValue = function(el, value) {
		if(CU.isEmpty(value)) value = "";
		var v = el.attr("selectValue");
		if((!CU.isEmpty(v)&&v==value) || (CU.isEmpty(v)&&(value=="1"||value==1))) {
			el.prop("checked", true);
		}else {
			el.prop("checked", false);
		}
	};
	
	this.getCheckboxGroupValue = function(els) {
		var array = [];
		for(var i=0; i<els.length; i++) {
			var el = els[i];
			if(el.is(":checked")) {
				var v = el.val();
				if(!CU.isEmpty(v)) {
					array.push(v);
				}
			}
		}
		return array.join(",");
	};
	
	this.setCheckboxGroupValue = function(els, value) {
		value = ","+value+","
		for(var i=0; i<els.length; i++) {
			var el = els[i];
			var v = el.val();
			if(!CU.isEmpty(v) && value.indexOf(","+v+",")>=0) {
				el.prop("checked", true);
			}else {
				el.prop("checked", false);
			}
		}
	};
	
	this.getRegionValue = function(els) {
		var value = els[0].val();
		if(els.length > 1) {
			var c = els[1].val();
			if(!CU.isEmpty(c)) {
				value += "," + c;
			}
		}
		return value;
	};
	this.setRegionValue = function(els, value) {
		var p = "";
		var c = "";
		if(!CU.isEmpty(value)) {
			p = value;
			var idx = p.indexOf(',');
			if(idx > 0) {
				c = p.substring(idx+1);
				p = p.substring(0, idx);
			}
		}
		els[0].val(p);
		els[0].change();
		els[1].val(c);
	};
	
	
	this.getFieldValue = function(inputType, els) {
		var value = "";
		var it = inputType + "";
		if(thiz.editable) {
			if(it=="1"||it=="2"||it=="3"||it=="21"||it=="22"||it=="23"||it=="24"||it=="31") {		//文本框、数值框、下拉列表、 日期、时间、日期时间、文本域
				value = els[0].val();
			}else if(it=="4") {		//单选框
				value = thiz.getRadioValue(els);
			}else if(it=="5") {		//复选框
				value = thiz.getCheckboxValue(els[0]);
			}else if(it=="13") {		//多选复选框
				value = thiz.getCheckboxGroupValue(els);
			}else if(it=="51") {		//省市
				value = thiz.getRegionValue(els);
			}else if(it=="61") {		//3位数值框
				value = els[0].val().replace(/,/g, "");
			}
		}else {
			if(it=="1"||it=="2"||it=="21"||it=="22"||it=="23"||it=="24"||it=="31"||it=="51") {		//文本框、数值框、 日期、时间、日期时间、文本域、省市
				value = els[0].val();
			}else if(it=="3") {		//下拉列表
				value = els[0].attr("data-value");
			}else if(it=="4") {		//单选框
				value = thiz.getRadioValue(els);
			}else if(it=="5") {		//复选框
				value = thiz.getCheckboxValue(els[0]);
			}else if(it=="13") {	//多选复选框
				value = thiz.getCheckboxGroupValue(els);
			}else if(it=="61") {	//3位数值框
				value = els[0].val().replace(/,/g, "");
			}
		}
		return value;
	};
	
	
	this.setFieldValue = function(inputType, els, value) {
		if(CU.isEmpty(value)) value = "";
		var it = inputType + "";
		if(thiz.editable) {
			if(it=="1"||it=="2"||it=="3"||it=="21"||it=="22"||it=="23"||it=="24"||it=="31") {		//文本框、数值框、下拉列表、 日期、时间、日期时间、文本域
				els[0].val(value);
			}else if(it=="4") {		//单选框
				thiz.setRadioValue(els, value);
			}else if(it=="5") {		//复选框
				thiz.setCheckboxValue(els[0], value);
			}else if(it=="13") {		//多选复选框
				thiz.setCheckboxGroupValue(els, value);
			}else if(it=="51") {		//省市
				thiz.setRegionValue(els, value);
			}else if(it=="61") {		//3位数值框
				var v = thiz.to3BitNumberFormat(value);
				els[0].val(v);
			}
		}else {
			if(it=="1"||it=="2"||it=="21"||it=="22"||it=="23"||it=="24"||it=="31"||it=="51") {		//文本框、数值框、 日期、时间、日期时间、文本域、省市
				els[0].val(value);
			}else if(it=="3") {		//下拉列表
				els[0].attr("data-value", "");
				els[0].val("");
				if(!CU.isEmpty(value)) {
					var dictId = els[0].attr("dictId");
					var name = thiz.getSelectOptionValue(dictId, value);
					if(!CU.isEmpty(name)) {
						els[0].attr("data-value", value);
						els[0].val(name);
					}
				}
			}else if(it=="4") {		//单选框
				thiz.setRadioValue(els, value);
			}else if(it=="5") {		//复选框
				thiz.setCheckboxValue(els[0], value);
			}else if(it=="13") {	//多选复选框
				thiz.setCheckboxGroupValue(els, value);
			}else if(it=="61") {		//3位数值框
				var v = thiz.to3BitNumberFormat(value);
				els[0].val(v);
			}
		}
		return value;
	};
	
	
	//return map, key=form-input-type,name, value=[field]
	this.getFormFields = function() {
		var els = thiz.el_base.find(".form-input");
		var map = {};
		if(!CU.isEmpty(els) && els.length>0) {
			for(var i=0; i<els.length; i++) {
				var el = $(els[i]);
				var name = el.attr("name");
				var type = el.attr("form-input-type");
				var k = type + "," + name;
				var fs = map[k];
				if(CU.isEmpty(fs)) {
					fs = [];
					map[k] = fs;
				}
				fs.push($(el));
			}
		}
		return map;
	};
	
	
	/**
	 * 获取表单数据
	 * @param keyType : 1=属性代码为key, 2=属性id为key, 缺省为1
	 */
	this.getFormData = function(keyType) {
		if(CU.isEmpty(keyType)) keyType = 1;
		var data = {};
		var fs = thiz.getFormFields();
		for(var k in fs) {
			var els = fs[k];
			var idx = k.indexOf(',');
			var it = k.substring(0, idx);
			var name = k.substring(idx+1);
			var attrId = name.substring(name.lastIndexOf('_')+1);
			var attr = thiz.attrMap[attrId];
			if(CU.isEmpty(attr)) {
				continue ;
			}
			var key = keyType===1||keyType=="1" ? attr.attrStdCode : attr.id;
			var value = thiz.getFieldValue(it, els);
			if(value===null || value===undefined) {
				continue ;
			}
			data[key] = value;
		}
		return data;
	};
	
	
	this.setFormData = function(data, keyType) {
		if(CU.isEmpty(keyType)) keyType = 1;
		if(CU.isEmpty(data)) data = {};
		var fs = thiz.getFormFields();
		for(var k in fs) {
			var els = fs[k];
			var idx = k.indexOf(',');
			var it = k.substring(0, idx);
			var name = k.substring(idx+1);
			var attrId = name.substring(name.lastIndexOf('_')+1);
			var attr = thiz.attrMap[attrId];
			if(CU.isEmpty(attr)) {
				continue ;
			}
			var key = keyType===1||keyType=="1" ? attr.attrStdCode : attr.id;
			var value = data[key];
			thiz.setFieldValue(it, els, value);
		}
	};
	
	this.clearFormData = function() {
		thiz.setFormData(1, null);
	};
	
	
	thiz.setClassAttrs(thiz.attrs);
	thiz.setDictMap(thiz.dictMap);
	thiz.render();
}



/**
 * 基础表单
 * @param {} config
 * 		bid : 绑定页面指定的div id
 * 		tags : 指定需获取元素标签, 多个以逗号(,)分隔, 为空表示所有
 * 		ignoreNull : 是否忽略null值, 缺省为表单取值true, 赋值为false
 * 		prefix : 指定字段前缀, 例如表单元素name为user_id, 指定prefix="user_"时, 返回的数据属性是id, 会把前缀去除
 * 		batchFields : 指定批量获取值的字段, 针对二维编辑表格, 返回对象数组(表单赋值无效)
 * 		addroot : 远程请求入口
 * 		act : ajax指定的act
 * 		loadUrl : 加载远程数据地址
 * 		submitUrl : 提交远程数据地址
 * 		submitDataLevel : 表单提交的data对应后端参数层级, false=直接对应后端参数对象, true={record:data}, string={string:data}, 缺省为false
 * 		submitSuccessMsg : 提交成功弹框消息, true=正常弹框(保存成功.), false=不弹, string=弹框并且为指定字符串消息, 缺省为true
 * 		loading : 远程请求时指定loading, 缺省为表单中所有按钮
 * 		key : 表单绑定数据的主键名, 缺省为id
 * 		recordId : 指定当前记录ID
 * 		autoSubmit : true|false,如果此参数为true, 则表单中如果有submit按钮时, 则自动提交, 缺省为true
 * 		beforeSubmit : 远程提交之前事件beforeSubmit(data, this), 返回false则中断, 返回对象则替换提交的data
 * 		afterSubmit : 提交之后事件afterSubmit(data, this)
 */
function PrettyForm(config) {
	if(CU.isEmpty(config)) throw " the config is empty argument! ";
	if(CU.isEmpty(config.bid)) throw " the config.bid is empty argument! ";
	
	var thiz = this;
	$.extend(thiz, {key:"id", autoSubmit:true, submitDataLevel:false, submitSuccessMsg:true}, config);
	this.dom = CU.clearlyElement(config.bid);
	this.form = null;
	this.recordId = "";		//当前数据值
	
	if(this.dom[0].tagName.toLowerCase() == 'form') {
		this.form = this.dom;
	}else {
		var els = this.dom.find("form");
		if(!CU.isEmpty(els) && els.length>0) {
			this.form = $(els[0]);
		}
	}
	
	this.setRecordId = function(id) {
		thiz.recordId = id;
	};
	this.getRecordId = function() {
		return thiz.recordId;
	};
	
	
	this.getLoading = function() {
		if(CU.isEmpty(thiz.loading)) {
			thiz.loading = thiz.dom.find("button");
		}
		return thiz.loading;
	};
	
	
	/**
	 * 获取表单中所有数据
	 * @param tags : 指定需获取元素标签, 多个以逗号(,)分隔, 为空表示所有, 缺省为类参数
	 * @param ignoreNull : 是否忽略null值, 缺省为类参数
	 * @param prefix : 指定字段前缀, 例如表单元素name为user_id, 指定prefix="user_"时, 返回的数据属性是id, 会把前缀去除, 缺省为类参数
	 * @param batchFields : 指定批量获取值的字段, 针对二维编辑表格, 返回对象数组, 缺省为类参数
	 */
	this.getData = function(ignoreNull, prefix, batchFields, tags) {
		if(CU.isEmpty(tags)) tags = thiz.tags;
		if(CU.isEmpty(ignoreNull)) ignoreNull = thiz.ignoreNull;
		if(CU.isEmpty(prefix)) prefix = thiz.prefix;
		if(CU.isEmpty(batchFields)) batchFields = thiz.batchFields;
		return PU.getFormData(thiz.dom, tags, ignoreNull, prefix, batchFields)
	};
	
	
	
	
	/**
	 * 更新表单字段, data中有什么值就更新哪些字段, 没有值的表单不变
	 * 等同this.setData(data, true, prefix, tags);
	 */
	this.setFixData = function(data, prefix, tags) {
		thiz.setData(data, true, prefix, tags);
	};
	
	
	/**
	 * 对表单赋值
	 * @param data : 数据
	 * @param ignoreNull : 是否忽略null值, 缺省为true
	 * @param prefix : 指定字段前缀, 例如表单元素name为user_id, 指定prefix="user_"时, 返回的数据属性是id, 会把前缀去除
	 * @param tags : 指定需获取元素标签, 多个以逗号(,)分隔, 为空表示所有
	 */
	this.setData = function(data, ignoreNull, prefix, tags) {
		if(CU.isEmpty(tags)) tags = thiz.tags;
		if(CU.isEmpty(ignoreNull)) ignoreNull = thiz.ignoreNull;
		if(CU.isEmpty(prefix)) prefix = thiz.prefix;
		PU.setFormData(data, thiz.dom, tags, ignoreNull, prefix)
	};
	
	
	/**
	 * 清空表单
	 * @param prefix : 指定字段前缀, 例如表单元素name为user_id, 指定prefix="user_"时, 返回的数据属性是id, 会把前缀去除
	 * @param tags : 指定需获取元素标签, 多个以逗号(,)分隔, 为空表示所有
	 */
	this.clearData = function(prefix, tags) {
		if(CU.isEmpty(tags)) tags = thiz.tags;
		if(CU.isEmpty(prefix)) prefix = thiz.prefix;
		PU.clearFormData(thiz.dom, tags, prefix);
		thiz.recordId = "";
	};
	
	
	
	/**
	 * 更新元素字段, data中有什么值就更新哪些字段, 没有值的元素值不变
	 * 等同this.setView(data, true, tags, attrName);
	 */
	this.setFixView = function(data, tags, attrName) {
		thiz.setView(data, true, tags, attrName);
	};
	
	
	/**
	 * 对页面元素赋值
	 * @param data : 数据
	 * @param ignoreNull : 是否忽略null值, 缺省为true
	 * @param tags : 指定需获取元素标签, 多个以逗号(,)分隔, 为空表示所有
	 * @param attrName : 指定赋值元素属性名, 缺省为for-name
	 */
	this.setView = function(data, ignoreNull, tags, attrName) {
		PU.setPageData(data, thiz.dom, tags, attrName, ignoreNull);
	};
	
	
	/**
	 * 加载数据
	 * @param cfg : 参数
	 * 		addroot : 远程请求入口, 缺省为类参数
	 * 		act : ajax指定的act, 缺省为类参数
	 * 		url : 远程请求地址, 缺省为类参数loadUrl
	 * 		ps : 自定义参数, 缺省为{类参数key值:thiz.recordId}, 缺省情况thiz.recordId为空则中断请求
	 * 		loading: 指定loading元素, 缺省为类参数
	 * 		tags : 指定需获取元素标签, 多个以逗号(,)分隔, 为空表示所有, 缺省为类参数
	 * 		ignoreNull : 是否忽略null值, 缺省为类参数
	 * 		prefix : 指定字段前缀, 例如表单元素name为user_id, 指定prefix="user_"时, 返回的数据属性是id, 会把前缀去除, 缺省为类参数
	 * 		cb : 请求后回调, 客户端可以做二次加工, 此方法之后系统会自动执行setData()函数, 如果cb(data, this)返回false则中断, 返回对象则替换请求来的data
	 * 		errcb : 异常处理
	 */
	this.load = function(cfg) {
		if(CU.isEmpty(cfg)) cfg = {};
		var ac = $.extend({addroot:thiz.addroot, act:thiz.act, url:thiz.loadUrl, loading:thiz.getLoading(), tags:thiz.tags, ignoreNull:thiz.ignoreNull, prefix:thiz.prefix}, cfg);
		if(CU.isEmpty(ac.ps)) {
			if(CU.isEmpty(thiz.recordId)) return ;
			var ps = {};
			ps[thiz.key] = thiz.recordId;
			ac.ps = ps;
		}
		RS.ajax({addroot:ac.addroot, act:ac.act, url:ac.url, ps:ac.ps, loading:ac.loading, cb:function(rs) {
			if(CU.isFunction(cfg.cb)) {
				var ba = cfg.cb(rs, thiz);
				if(ba === false) return ;
				if(CU.isObject(ba)) rs = ba;
			}
			thiz.setData(rs, ac.ignoreNull, ac.prefix, ac.tags);
		}, errcb:cfg.errcb});
	};
	
	
	/**
	 * 提交表单(此函数指定autoSubmit时, 点击提交按钮会自动调用, 如果是外部手工调用则会忽略表单自带的验证)
	 * 		addroot : 远程请求入口, 缺省为类参数
	 * 		act : ajax指定的act, 缺省为类参数
	 * 		url : 远程请求地址, 缺省为类参数submitUrl
	 * 		loading: 指定loading元素, 缺省为类参数
	 * 		submitDataLevel : 表单提交的data对应后端参数层级, false=直接对应后端参数对象, true={record:data}, string={string:data}, 缺省为类参数
	 * 		submitSuccessMsg : 提交成功弹框消息, true=正常弹框(保存成功.), false=不弹, string=弹框并且为指定字符串消息, 缺省为类参数,环境复杂可重写this.getSubmitSuccessMsg()函数
	 * 	 	tags : 指定需获取元素标签, 多个以逗号(,)分隔, 为空表示所有, 缺省为类参数
	 * 		ignoreNull : 是否忽略null值, 缺省为类参数
	 * 		prefix : 指定字段前缀, 例如表单元素name为user_id, 指定prefix="user_"时, 返回的数据属性是id, 会把前缀去除, 缺省为类参数
	 * 		batchFields : 指定批量获取值的字段, 针对二维编辑表格, 返回对象数组, 缺省为类参数
	 * 		before : 请求之前事件, 缺省为类参数beforeSubmit, before(data, this), 返回false则中断, 返回对象则替换提交的data
	 * 		cb : 请求后回调, 提交表单服务器默认返回id, 如果不是id则需要定义回调函数, 返回有效id, 此id会赋值给this.recordId, 返回false则中断, 缺省为类定义afterSubmit
	 * 		errcb : 异常处理
	 */
	this.submit = function(cfg) {
		if(CU.isEmpty(cfg)) cfg = {};
		var ac = $.extend({addroot:thiz.addroot, act:thiz.act, url:thiz.submitUrl, loading:thiz.getLoading(), submitDataLevel:thiz.submitDataLevel, submitSuccessMsg:thiz.submitSuccessMsg, tags:thiz.tags, ignoreNull:thiz.ignoreNull, prefix:thiz.prefix, batchFields:thiz.batchFields, before:thiz.beforeSubmit}, cfg);
		var data = thiz.getData(ac.ignoreNull, ac.prefix, ac.batchFields, ac.tags);
		var id = thiz.getRecordId();
		if(!CU.isEmpty(id)) data[thiz.key] = id;
		data = thiz.resetSubmitDataLevel(data, ac.submitDataLevel);
		
		if(CU.isFunction(ac.before)) {
			var ba = ac.before(data, thiz);
			if(ba === false) return ;
			if(CU.isObject(ba)) data = ba;
		}
		
		RS.ajax({addroot:ac.addroot, act:ac.act, url:ac.url, ps:data, loading:ac.loading, cb:function(rs) {
			var after = cfg.cb;
			if(CU.isEmpty(after)) after = thiz.afterSubmit;
			
			if(CU.isFunction(after)) {
				var ba = after(rs, thiz);
				if(ba === false) return ;
				if(ba!==true && !CU.isEmpty(ba)) rs = ba;
			}
			thiz.setRecordId(rs);
			
			var msg = thiz.getSubmitSuccessMsg(ac.submitSuccessMsg, data);
			if(msg !== false) {
				if(msg===true) msg = "保存成功.";
				CC.showTip({type:"success", msg:msg});
			}
		}, errcb:cfg.errcb});
	};
	
	
	
	/**
	 * 由外部扩展
	 */
	this.getSubmitSuccessMsg = function(submitSuccessMsg, data) {
		return submitSuccessMsg;
	};
	
	
	
	/**
	 * 重定义表单数据层级
	 * @return {}
	 */
	this.resetSubmitDataLevel = function(data, level) {
		var dataName = null;
		if(typeof(level) == 'string') {
			dataName = CU.trim(level);
		}else if(CU.isTrue(level)) {
			dataName = "record";
		}
		if(!CU.isEmpty(dataName)) {
			var re = {};
			re[dataName] = data;
			data = re;
		}
		return data;
	};
	
	
	/*** -- 事件 ------------------------------------------------------ ***/
	
	if(this.autoSubmit && !CU.isEmpty(this.form)) {
		this.form.submit(function(e){
		    e.preventDefault();
		    thiz.submit();
		});
	}
	
}




