

/**
 * 系统角色
 */
function SysRoleList() {
	var thiz = this;
	this.CurrentId = "";
	this.P_grid = null;
	
	this.menuMap = null;
	this.userMap = null;
	
	
	/**
	 * 对象创建后(元素未渲染)执行函数
	 */
	this.init = function(ps) {
	};
	
	/**
	 * 页面元素被渲染后执行函数
	 */
	this.onShow = function() {
		thiz.initData(function() {
			thiz.initComponent();
			thiz.initListener();
		});
	};
	/**
	 * 页面被关闭(销毁)时执行函数
	 */
	this.onClose = function() {
		delete thiz.P_grid;
		delete thiz.menuMap;
		delete thiz.userMap;
	};
	
	
	this.initData = function(cb) {
		RS.ajax({addroot:DC, url:"/sys/menu/queryList", cb:function(menus) {
			thiz.menuMap = thiz.toMap(menus);
			
			RS.ajax({addroot:DC, url:"/sys/user/queryList", cb:function(users) {
				thiz.userMap = thiz.toMap(users);
				
				if(CU.isFunction(cb)) cb();
			}});
		}});
	};
	
	this.toMap = function(data) {
		var map = {};
		if(!CU.isEmpty(data)) {
			for(var i=0; i<data.length; i++) {
				var row = data[i];
				map[row.id] = row;
			}
		}
		return map;
	};
	
	
	this.initComponent = function() {
		var el = thiz.$(".panel-body");
		this.P_grid = PU.getDataTable({
			bid : el,
			addroot:DC, 
			url: "/sys/role/queryList",
			opbtns : ['<button class="btn btn-primary btn_add"> <i class="fa fa-plus-circle"></i>添加</button>&nbsp;'
					+ '<button class="btn btn-primary btn_refresh"> <i class="fa fa-refresh"></i>刷新工作区</button>'],
			paging:false,
			scrollY:(PU.getDefaultGridHeight())+"px",
			columns:[
			          {title:"岗位名称", data:"roleName", align:"center", width:200},
			          {title:"岗位描述", data:"roleDesc", align:"left", width:400},
			          {title:"岗位用户", data:"id", align:"center", width:100, render:function(value, type, row, meta) {
			          		var title = "选择用户";
			          		var s = thiz.linkSelectData(thiz.userMap, row.userIds, "userName");
			          		if(!CU.isEmpty(s)) title = s;
			          	
			          		var btns = [{name:"a_selectOps", title:title}];
							var html = CC.fillOperateBtns(btns, {dataId:row.id, dataName:row.roleName});
							return html.join('');
			          }},
			          {title:"岗位权限", data:"id", align:"center", width:100, render:function(value, type, row, meta) {
			          		var title = "选择菜单";
			          		var s = thiz.linkSelectData(thiz.menuMap, row.menuIds, "menuName");
			          		if(!CU.isEmpty(s)) title = s;
			          		
			          		var btns = [{name:"a_selectMenus", title:title}];
							var html = CC.fillOperateBtns(btns, {dataId:row.id, dataName:row.roleName});
							return html.join('');
			          }},
			          {title:"操作", width:100, data:"id", align:"center", width:200, render:function(value, type, row, meta) {
			          		var btns = [{name:"a_edit", title:"编辑"},
										  {name:"a_remove", title:"删除", color:"red"}];
							var html = CC.fillOperateBtns(btns, {dataId:row.id, dataName:row.roleName});
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
				  thiz.$("a[name='a_selectOps']").bind("click", function() {
					  var el = $(this);
					  thiz.CurrentId = el.attr("dataId");
					  var roleName = el.attr("dataName");
					  thiz.showSelectOpWin(roleName, el);
				  });
				  thiz.$("a[name='a_selectMenus']").bind("click", function() {
				  	  var el = $(this);
					  thiz.CurrentId = el.attr("dataId");
					  var roleName = el.attr("dataName");
					  thiz.showSelectMenuWin(roleName, el);
				  });
			  }
		});
	};
	this.initListener = function() {
		thiz.$(".btn_add").bind("click", function() {
			thiz.CurrentId = "";
			thiz.showFormWin();
		});
		thiz.$(".btn_refresh").bind("click", function() {
			refreshMenu();
		});
	};
	
	this.linkSelectData = function(map, ids, name) {
		if(!CU.isEmpty(ids)) {
  			var arr = [];
  			for(var i=0; i<ids.length; i++) {
  				var u = map[ids[i]];
  				if(!CU.isEmpty(u)) {
  					arr.push(u[name]);
  				}
  			}
  			if(arr.length>0) return arr.join(", ");
  		}
	};
	
	
	this.showSelectOpWin = function(name, loading) {
		if(CU.isEmpty(thiz.CurrentId)) return ;
		CC.showUserSelectWin({single:false, cb:function(rs) {
			var ids = [];
			if(!CU.isEmpty(rs)) {
				for(var i=0; i<rs.length; i++) ids.push(rs[i].code);
			}
			RS.ajax({addroot:DC, url:"/sys/role/setRoleUserIds",ps:{roleId:thiz.CurrentId, userIds:ids}, loading:loading, cb:function(r) {
				thiz.P_grid.refresh();
			}});
		}});
	};
		
	this.showSelectMenuWin = function(name, loading) {
		if(CU.isEmpty(thiz.CurrentId)) return ;
		CC.showMenuSelectWin({single:false, cascadeParent:true, cb:function(rs) {
			var ids = [];
			if(!CU.isEmpty(rs)) {
				for(var i=0; i<rs.length; i++) ids.push(rs[i].code);
			}
			RS.ajax({addroot:DC, url:"/sys/role/setRoleMenuIds",ps:{roleId:thiz.CurrentId, menuIds:ids},loading:loading, cb:function(r) {
				thiz.P_grid.refresh();
			}});
		}});
	};
	
	
	this.removeById = function(roleName) {
		if(CU.isEmpty(thiz.CurrentId)) return ;
		CC.showMsg({hmsg:"您确定要删除岗位"+roleName+"吗?", option:2, callback:function() {
			RS.ajax({addroot:DC, url:"/sys/role/removeById",ps:{id:thiz.CurrentId},cb:function(r) {
				thiz.CurrentId = "";
				CC.showTip({type:"success",msg:"删除成功."});
				thiz.P_grid.refresh();
			}});
		}});
	};
	
	
	this.showFormWin = function() {
		var ps = {id:thiz.CurrentId};
		openPopMenu({mc:"10860301", title:"角色编辑", ps:ps, cb:function(rs) {
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

