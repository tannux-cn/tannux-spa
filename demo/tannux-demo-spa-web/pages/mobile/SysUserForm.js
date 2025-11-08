

/**
 * 用户表单
 */
function SysUserForm() {
	var thiz = this;
	this.P_form = null;
	this.CurrentId = "";
	
	
	/**
	 * 对象创建后(元素未渲染)执行函数
	 */
	this.init = function(ps) {
		this.CurrentId = ps["id"];
	};
	
	
	/**
	 * 页面元素被渲染后执行函数
	 */
	this.onShow = function() {
		if(CU.isEmpty(thiz.CurrentId)) {
			closeMenu();
			return ;
		}
		thiz.initComponent();
		
		thiz.P_form.setRecordId(thiz.CurrentId);
		thiz.P_form.load({cb:function(rs) {
			
			thiz.P_form.setView(rs);
			
			return false;
		}});
	};
	
	
	/**
	 * 页面被关闭(销毁)时执行函数
	 */
	this.onClose = function() {
	};
	
	
	this.initComponent = function() {
		thiz.P_form = PU.getForm({bid:thiz.dom, addroot:DC,
						loadUrl:"/sys/user/queryById"});
	};
	
	
	
	/**
	 * 此函数拼装当前页面的html并返回
	 */
	this.render = function() {
		var html = ['<div class="m-grid-box m-full">',
					'	<div class="record line-bottom">',
					'		<label class="name">用户编号</label>',
					'		<label class="value" for-name="userCode"></label>',
					'	</div>',
					'	<div class="record line-bottom">',
					'		<label class="name">用户姓名</label>',
					'		<label class="value" for-name="userName"></label>',
					'	</div>',
					'	<div class="record line-bottom">',
					'		<label class="name">登录账号</label>',
					'		<div class="value" for-name="loginCode"></div>',
					'	</div>',
					'	<div class="record line-bottom">',
					'		<label class="name">性别</label>',
					'		<div class="value" for-name="sex" tannux-format="enum" dict="V_SEX" ></div>',
					'	</div>',
					'	<div class="record line-bottom">',
					'		<label class="name">生日</label>',
					'		<div class="value" for-name="birthday" tannux-format="date" ></div>',
					'	</div>',
					'</div>'];
		return html.join('');
	};
	
	

	
	
}

