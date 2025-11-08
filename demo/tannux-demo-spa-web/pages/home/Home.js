

/**
 * 钩子方法执行顺序： init(ps) > render() > onShow() > onClose(), 当执行refreshMenu()时, 这些函数都会执行, 并传入参数true, 表示是刷新操作
 * 菜单对象创建后默认属性：
 * 		dom : 当前菜单元素的顶层dom, 在执行render()之前赋值
 * 		menu : 当前菜单记录数据， 在执行init之前赋值
 * 		returnValue : 弹出窗口时, 关闭窗口回调时获取的参数, 由客户端自己赋值, 如果手工调用关闭窗口函数closeMenu(result, error), 此传递的result会自动赋值到returnValue上
 */
function Home() {
	var thiz = this;
	
	
	/**
	 * 对象创建后(元素未渲染)执行函数
	 * @param ps : 在AppConfig中配置菜单页面时, 指定menuUrl时可以携带参数, 列如：../home.js?a=1&b=2&c=3, 这些参数以对象形式传入
	 */
	this.init = function(ps) {
		console.log("----------Home.init("+CU.toString(ps)+")---------");
	};
	
	
	/**
	 * 页面元素被渲染后执行函数
	 */
	this.onShow = function() {
		console.log("----------Home.onShow()---------");
	};
	
	
	/**
	 * 页面被关闭(销毁)时执行函数
	 */
	this.onClose = function() {
		console.log("----------Home.onClose()---------");
	};
	
	
	
	/**
	 * 此函数拼装当前页面的html并返回
	 */
	this.render = function() {
		console.log("----------Home.render()---------");
		return "<div>-----home----</div>";
	};
	
	
	
	
}

