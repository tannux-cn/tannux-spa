

/**
 * 移动端主页
 */
function Home() {
	var thiz = this;
	
	
	/**
	 * 对象创建后(元素未渲染)执行函数
	 */
	this.init = function(ps) {
		console.log("----------Home.init("+CU.toString(ps)+")---------");
	};
	
	
	/**
	 * 页面元素被渲染后执行函数
	 */
	this.onShow = function() {
		console.log("----------Home.onShow()---------");
		
		//如果用户没有登录则去登录
		if(CU.isEmpty(window.SU)) {
			CC.logout();
		}
	};
	
	
	/**
	 * 页面被关闭(销毁)时执行函数
	 */
	this.onClose = function() {
		console.log("----------Home.onClose()---------");
	};
	
	/**
	 * 页面已到顶部用户再向下拉事件
	 */
	this.onTouchTop = function() {
		console.log("----------Home.onTouchTop()---------");
	};
	/**
	 * 页面已到底部用户再向上拉事件
	 */
	this.onTouchBottom = function() {
		console.log("----------Home.onTouchBottom()---------");
	};
	/**
	 * 手滑屏幕向左事件
	 */
	this.onSwipeLeft = function() {
		console.log("----------Home.onSwipeLeft()---------");
	};
	/**
	 * 手滑屏幕向右事件
	 */
	this.onSwipeRight = function() {
		console.log("----------Home.onSwipeRight()---------");
	};
	
	
	/**
	 * 此函数拼装当前页面的html并返回
	 */
	this.render = function() {
		console.log("----------Home.render()---------");
		return "<div>-----home----</div>";
	};
	
	
	
	
}

