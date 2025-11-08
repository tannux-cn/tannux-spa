

/**
 * 系统角色
 */
function SysRoleList() {
	var thiz = this;
	
	
	/**
	 * 对象创建后(元素未渲染)执行函数
	 */
	this.init = function(ps) {
		console.log("----------SysRoleList.init("+CU.toString(ps)+")---------");
	};
	
	
	/**
	 * 页面元素被渲染后执行函数
	 */
	this.onShow = function() {
		console.log("----------SysRoleList.onShow()---------");
	};
	
	
	/**
	 * 页面被关闭(销毁)时执行函数
	 */
	this.onClose = function() {
		console.log("----------SysRoleList.onClose()---------");
	};
	
	
	
	/**
	 * 此函数拼装当前页面的html并返回
	 */
	this.render = function() {
		console.log("----------SysRoleList.render()---------");
		return "<div>-----SysRoleList----</div>";
	};
	
	
	
	
}

