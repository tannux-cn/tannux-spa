

/**
 * 用户列表
 */
function SysUserList() {
	var thiz = this;
	
	
	/**
	 * 对象创建后(元素未渲染)执行函数
	 */
	this.init = function(ps) {
	};
	
	
	/**
	 * 页面元素被渲染后执行函数
	 */
	this.onShow = function() {
		thiz.query();
	};
	
	/**
	 * 页面被关闭(销毁)时执行函数
	 */
	this.onClose = function() {
	};
	
	
	/**
	 * 页面已到顶部用户再向下拉事件
	 */
	this.onTouchTop = function() {
		thiz.query();
	};
	/**
	 * 页面已到底部用户再向上拉事件
	 */
	this.onTouchBottom = function() {
		thiz.query();
	};
	
	
	
	this.query = function() {
		var el_cont = thiz.dom.find(".tab-user-list");
		var el_nomore = thiz.dom.find(".nomore");
		el_cont.html("");
		el_nomore.addClass("none");
			
		RS.ajax({addroot:DC, url:"/sys/user/queryList", ps:{}, cb:function(rs) {
			var el = $.tmpl(thiz.getUserListTmpl(), {data:rs});
			el.appendTo(el_cont);
			el_nomore.removeClass("none");
			
			el.bind("click", function() {
				var el = $(this);
				var id = el.attr("dataId");
				var name = el.attr("dataName");
				openPopMenu({mc:"100201", title:"用户详情-"+name, ps:{id:id}, cb:function(rs) {
					
					console.log("------------------ menu-close-callback : " + rs);
					
				}});
			});
		}});
	};
	
	
	
	
	/**
	 * 获取列表模板
	 * @return {}
	 */
	this.getUserListTmpl = function() {
		var html = ['{{each(i,row) data}}',
					'			<div class="m-record-box" dataId="{{= row.id}}" dataCode="{{= row.userCode}}"  dataName="{{= row.userName}}" >',
					'				<div class="record-title line-bottom bold">',
					'					<label class="name">{{= row.userName}}</label>',
					'					<label class="value">{{= row.userCode}}</label>',
					'				</div>',
					'				<div class="record-data top8">',
					'					<label class="name">登录账号</label>',
					'					<div class="value">{{= row.loginCode}}</div>',
					'				</div>',
					'				<div class="record-data">',
					'					<label class="name">性别</label>',
					'					<div class="value">{{= PU.getDropValue("V_SEX", row.sex)}}</div>',
					'				</div>',
					'				<div class="record-data">',
					'					<label class="name">生日</label>',
					'					<div class="value" tannux-format="date">{{= CU.toStringDate(row.birthday)}}</div>',
					'				</div>',
					'			</div>',
					'{{/each}}'];
		return html.join('');
	};
	
	
	/**
	 * 此函数拼装当前页面的html并返回
	 */
	this.render = function() {
		return '<div class="form-horizontal">'
				+ '<div class="form-horizontal tab-user-list"></div>'
				+ '<div class="nomore none">已经到底啦</div>'
				+ '</div>';
	};
	
			
	
	
	
}

