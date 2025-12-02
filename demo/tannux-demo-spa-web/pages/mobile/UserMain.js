

/**
 * 我的
 */
function UserMain() {
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
		thiz.initListener();
		thiz.verifyLogin(function() {
			thiz.setLoginUserInfo();
		});
	};
	
	
	/**
	 * 页面被关闭(销毁)时执行函数
	 */
	this.onClose = function() {
	};
	
	
	this.initListener = function() {
		thiz.$(".btn-logout").bind("click", thiz.logout);
		thiz.$(".btn-refresh").bind("click", refreshMenu);
	};
	
	this.verifyLogin = function(cb) {
		if(CU.isEmpty(window.SU) || CU.isEmpty(window.SU.id)) {
			CC.logout(function() {
//				-----
			});
		}else {
			if(CU.isFunction(cb)) cb();
		}
	};
	
	
	this.setLoginUserInfo = function() {
		PU.setPageData(window.SU, thiz.$(".m-grid-box"));
	};
	
	
	this.logout = function() {
		CC.showMsg({hmsg:"您确定要退出登录?", option:2, callback:function() {
			//删除登录信息
			PU.removeToken();
			delete window.SU;
			
			//进入首页
			goHomePage();
		}});
	};
	
	
	/**
	 * 此函数拼装当前页面的html并返回
	 */
	this.render = function() {
		var html = ['<div class="m-grid-box m-full">',
					'	<div class="record line-bottom">',
					'		<label class="name">登录账号</label>',
					'		<div class="value" for-name="loginCode"></div>',
					'	</div>',
					'	<div class="record line-bottom">',
					'		<label class="name">用户姓名</label>',
					'		<label class="value" for-name="userName"></label>',
					'	</div>',
					'</div>',
					'<div class="tx-m-bottom-tools" >',
					'	<button type="button" class="btn btn-primary btn-refresh" style="padding: 0.06rem 0.28rem;">刷新页面</button>&nbsp;&nbsp;',
					'	<button type="button" class="btn btn-primary btn-logout" style="padding: 0.06rem 0.28rem;">退出登录</button>',
					'</div>'];
		return html.join('');
	};
	
	
	
}

