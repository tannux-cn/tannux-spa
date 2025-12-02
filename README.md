## License
Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.
For the full license text, please visit [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)


tannux-spa为基于jquery的前端框架，其主要特点有：

1.	单页应用。
2.	纯静态页面，直接放入一般的web服务器（如nginx）下即可直接运行，无需二次编译。
3.	组件化，jquery庞大的组件生态就不用多说了。
4.	低门槛，但凡会基础js语法及使用jquery就能上手。
5.	生产型框架，上手即可拿来开发项目。
演示环境访问地址：https://demo.tannux.com/tannux-spa-demo/index.html

tannux-spa的说明文档请访问：https://doc.tannux.com/tannux-doc/route.html?menuCode=CS25113000000001


tannux-spa使用说明如下：
demo/tannux-demo-spa-web为了演示tannux-spa的功能，及在项目开发中如何使用，特的编写的一个项目级演示用例，目录结构：
tannux-demo-spa-web  //工程名
|____tannux		//架构依赖
    |____spa		//架构模板页
        |____tannux-spa-normal.html	//PC端常用模板页
        |____tannux-spa-top.html	//菜单在顶部布局模板页
        |____tannux-spa-mobile.html	//移动端模板页
        |____tannux-spa-jump.html	//与第三方集成跳转页，不是必须
|____layout			//项目扩展框架能力目录
|____spa		//适配tannux-spa固定目录
|____adapter-pc.js		//PC端应用框架集成配置
|____adapter-pc.css	//PC端CSS定义文件
|____adapter-mobile.js	//移动端应用框架集成配置
|____adapter-mobile.css	//移动端CSS定义文件
|____favicon.png		//浏览器tab图标，实际项目可替换
|____logo.png		//主页logo，实际项目可替换
|____pages 		//项目功能存放的页
        |____sys		//PC端功能演示开发
        |____mobile	//移动端功能演示开发

tannux-spa主张一个应用系统的css样式应统一管理，各个页面只是拿里面的样式来用，不主张每个页面单独定义样式，所以框架只预留一个css文件（/layout/spa/ adapter-pc.css或/layout/spa/ adapter-mobile.css）由项目侧自定义样式，如需引用多个样式文件则项目侧自行在模板页中添加样式文件。

tannux-demo-spa-web为了演示前端的开发及权限的控制，特意选择：系统菜单、系统角色、系统用户三个页面的开发。

tannux-demo-spa-web集成了大量的jquery第三方组件、及在此基础上再次封装的组件，最常用的莫过于表格、表单、树、日期、下拉列表等，这些在以上演示页面都有用到，为什么说tannux-spa是一款生产型框架？因为他是针对项目的使用极大的简化开发，比如针对一个表单，表单里面有十多个字段，我们封装有PrettyForm对象组件，直接可以通过调用form.load()加载数据、form.submit()提交数据等，极大的简化开发工作的同时，也就竟味着有很多默认的配置，比如当我们要使用ajax访问后端数据时，使用jquery原生的$.ajax就意味这个函数在每次调用时主要参数都需要写、返回结果要自己处理，为此我们封装了RS(RemoteService的缩写)对象，在$.ajax调用之前及之后做了默认的统一处理，例如：
RS.ajax({
	addroot:DC, //前端应用可能会对应多个后端服务，指明哪个后端服务
	url:"/sys/user/queryById", //请求地址
	ps:{id:thiz.CurrentId}, 	//请求参数
	cb:function(rs) {				//请求结果回调
		console.log(rs);
	}
});

上面这个写法是在tannux-spa中最常用的写法，与后端请求协议的约定：
method： 缺省为post
数据格式：缺省为json
返回结果格式：
{
	success:true|false, 
	code:结果代码, 
	message:异常消息, 
	data:结果数据
}，在上面这次请求中，回调（cb:function(rs)）中的这个rs对应的是结果格式中的data，在success=false时，系统就直接拦截处理了。框架默认是弹出异常信息，调用方如果想自己处理可以增加errcb（异常回调）参数，也可以自己定一个全局统一的异常处理，重写RS. defstatus函数及RS.defaultErrorCallback，上面这个ajax调用如果直接使用jquery原生ajax对应会是这样的：
$.ajax({
	url: http://xxx/sys/user/queryById,
	type: "post",
	url:"/sys/user/queryById",
	dataType: "json",
	headers:{认证信息},
	success:function(resp) {
		if(resp.status == 200) {
			var rs = CU.toObject(resp.responseText);	//转JSON
			if(rs.success) {
				var data = rs.data;
				//请求回调
			}else if(rs.code == xxx) {
				//异常处理
			}
		}else if(resp.status == 401) {
			//跳至登录
		}else {
			//异常处理
		}
	}
});

诸如此类，tannux-spa在引用第三方组件时都有针对项目的隔合做了进一步的封装，如果使用方想使用原生的API或自己也封装有一套自己的组件，都是可以直接用的，jquery的生态就是各种组件拿来即用，兼容性极高。

demo/tannux-demo-spa-server为配合前端的演示使用，不是必须，也是为了能让试用人员方便找到前端与后端交互的感觉。前面有提到后端返回的数据格式：
{
	success : boolean, 	//true=成功 false=失败
	code : int,	//0=成功,非0=异常代码, 如401=认证失败, 项目侧自己定义
	message : string, 	//异常消息
	data : Object		//后端实际返回值
}
如果使用tannux-spa的组件，则后端需遵循以上格式，如果不使用tannux-spa的组件则项目侧不用遵循。

在demo中有tannux-demo-spa-server-deploy.tar，这是已经打包好的服务端运行文件，解压后即可直接运行（需要java-jdk1.8+环境），解压后的目录说明如下：
tannux-demo-spa-server
	|__bin
    	|____start.sh		//Linux或Mac环境下运行文件
    	|____start.bat	//Windows环境下运行文件
    	|____stop.sh		// Linux或Mac环境下停止服务文件
	|____conf			//配置文件存放目录
    	|____jetty.properties		//web服务配置，可配置端口
    	|____project.properties	//前端所需要的一些参数
	|____data		//演示功能（系统菜单、系统角色、系统用户）存放的数据
	|____lib			//工程依赖的jar包

tannux-demo-spa-server目录对应的是服务端源码，仅供参考。
tannux-spa主张前端所有的系统配置参数统一由后端管理，前端只配置一个获取配置参数的地址（如：layout/spa/adapter-pc.js中的AppConfig
.configUrl）。参数如果在前端配置，参数就被固化了，如需修改参数还需要重新发布应用，要知道移动端要让用户重新下载APP代价是巨大的。配置参数如果是在后端，前端能有一个刷新参数的机制，那么不用更新应用也可以更新参数。

通过以上的说明，希望能帮助你对tannux-spa有一定的了解，详细说明请访问：https://doc.tannux.com/tannux-doc/route.html?menuCode=CS25113000000001
要想深入的了解最好的方法就是上手，spa主要能力源码都在tannux/spa目录下，源码也不多，希望能耐心观看，也希望对你的学识及项目有一定的帮助。

版权声明，遵循Apache 2.0协议内容，详情参见LICENSE文件。








