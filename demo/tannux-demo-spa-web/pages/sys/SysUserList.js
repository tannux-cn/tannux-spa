

/**
 * 系统用户
 */
function SysUserList() {
	var thiz = this;
	this.CurrentId = "";
	this.P_grid = null;
	
	
	/**
	 * 对象创建后(元素未渲染)执行函数
	 */
	this.init = function(ps) {
	};
	
	/**
	 * 页面元素被渲染后执行函数
	 */
	this.onShow = function() {
		thiz.initComponent();
		thiz.initListener();
	};
	/**
	 * 页面被关闭(销毁)时执行函数
	 */
	this.onClose = function() {
		delete thiz.P_grid;
	};
	
	
	this.initComponent = function() {
		var el = thiz.$(".panel-body");
		this.P_grid = PU.getDataTable({
			bid : el,
			addroot:DC, 
			url: "/sys/user/queryList",
			opbtns : ['<button class="btn btn-primary btn_add"> <i class="fa fa-plus-circle"></i>添加</button>'],
			paging:false,
			scrollY:(PU.getDefaultGridHeight())+"px",
			columns:[
			          {title:"用户编码", data:"userCode", align:"center", width:100, cdtable:true},
			          {title:"用户姓名", data:"userName", align:"center", width:100},
			          {title:"性别", data:"sex", align:"center", width:100, cdtable:true, ctype:"enum", view:"V_SEX"},
			          {title:"生日", data:"birthday", align:"center", width:200, format:"date"},
			          {title:"登录账号", data:"loginCode", align:"center", width:100},
			          {title:"操作", width:100, data:"id", align:"center", width:200, render:function(value, type, row, meta) {
			          		var btns = [{name:"a_edit", title:"编辑"},
										  {name:"a_remove", title:"删除", color:"red"}];
							var html = CC.fillOperateBtns(btns, {dataId:row.id, dataName:row.userName});
							return html.join('');
			          }}
			          
			          
			  ],
			  getParams : function(pageNum, pageSize, cdt, orders) {
				  if(CU.isEmpty(cdt))cdt = {};
				  return [pageNum, pageSize, cdt, orders];
			  },
			  drawCallback : function(settings) {
				  thiz.$("a[name='a_edit']").bind("click", function() {
					  thiz.CurrentId = $(this).attr("dataId");
					  thiz.showFormWin();
				  });
				  thiz.$("a[name='a_remove']").bind("click", function() {
				  	  var el = $(this);
					  thiz.CurrentId = el.attr("dataId");
					  var roleName = el.attr("dataName");
					  thiz.removeById(roleName);
				  });
			  }
		});
	};
	this.initListener = function() {
		thiz.$(".btn_add").bind("click", function() {
			thiz.CurrentId = "";
			thiz.showFormWin();
		});
	};
	
	
	this.removeById = function(name) {
		if(CU.isEmpty(thiz.CurrentId)) return ;
		CC.showMsg({hmsg:"您确定要删除用户"+name+"吗?", option:2, callback:function() {
			RS.ajax({addroot:DC, url:"/sys/user/removeById",ps:{id:thiz.CurrentId},cb:function(r) {
				thiz.CurrentId = "";
				CC.showTip({type:"success",msg:"删除成功."});
				thiz.P_grid.refresh();
			}});
		}});
	};
	
	
	this.showFormWin = function() {
		var ps = {id:thiz.CurrentId};
		openPopMenu({mc:"10862401", title:"用户编辑", ps:ps, cb:function(rs) {
			console.log("--------------------- pop callback----- : " + rs);
			thiz.P_grid.refresh();
		}});
	};
	
	
	
	
	/**
	 * 返回当前页面html
	 */
	this.render = function() {
		var html = ['<div class="row">',
					'	<div class="panel" style="margin-bottom:0;">',
					'			<div class="panel-body" style="padding-top:10px;">',
					'			</div>',
					'	</div>',
					'</div>'];
		return html.join('');
	};
	
	
	
}

