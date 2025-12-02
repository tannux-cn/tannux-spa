

/**
 * 系统菜单
 */
function SysMenu() {
	var thiz = this;
	this.P_tree = null;
	this.P_form = null;
	this.ParentId = "";
	
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
	};
	
	
	this.initComponent = function() {
		thiz.P_tree = PU.getTree({
			bid : thiz.$(".tree_menu"), 
			addroot : DC, 
			url : "/sys/menu/queryTree",
			appendAttrs : true,
			getParams : function(node, ps, tree) {
				var parentId = node.id;
	        	if(CU.isEmpty(parentId) || parentId=='#') parentId = 0;
	        	$.extend(ps.cdt, {parentId:parentId});
	        	return ps;
			},
			render : function(row, parent, tree) {
				var text = "[" + row.data.menuCode + "] " + row.data.menuName;
				row.text = text + "<span class='tx-node-tools' ><i link-type='node-op' name='a_node_add' class='fa fa-plus-circle' style='margin-right:6px;'></i></span>";
			}
		});
		thiz.P_form = PU.getForm({bid:thiz.dom, addroot:DC,
									loadUrl:"/sys/menu/queryById",
									submitUrl:"/sys/menu/saveOrUpdate",
									beforeSubmit:thiz.fillSaveData,
									afterSubmit:thiz.saveCallback});
	};
	this.initListener = function() {
		thiz.$(".a_menu_addFirst").bind("click", thiz.addFirstMenu);
		thiz.$(".btn_removeMenu").bind("click", thiz.removeMenu);
		
		thiz.P_tree.bind("select", function(node, selected, e, tree) {
			thiz.ParentId = node.parent;
			if(thiz.ParentId == "#") thiz.ParentId = "0"; 
			thiz.P_form.setRecordId(node.id);
			thiz.P_form.load();
		});
		thiz.P_tree.bindNodeLinkClick("node-op", function(el, node, selected, e, tree) {
			var name = el.attr("name");
			if(name == "a_node_add") {
				thiz.addSubMenu(node);
			}
			return false;
		});
	};
	
	
	
	this.reloadParentNode = function () {
		if(CU.isEmpty(thiz.ParentId) || thiz.ParentId=="#" || thiz.ParentId=="0" || thiz.ParentId==0) {
			thiz.P_tree.search();
		}else {
			thiz.P_tree.reload(thiz.ParentId);
		}
	};
	
	this.addFirstMenu = function() {
		thiz.ParentId = "0";
		thiz.P_tree.setSelectedAll(false);
		thiz.P_form.clearData();
	};
	
	this.addSubMenu = function(node) {
		thiz.ParentId = node.data.id;
		thiz.P_form.clearData();
	}
	
	
	this.fillSaveData = function(data) {
		data.parentId = thiz.ParentId;
	};
	
	this.saveCallback = function(id) {
		thiz.reloadParentNode();
	};
	
	this.removeMenu = function() {
		var nodes = thiz.P_tree.getSelectedNodes();
		if(CU.isEmpty(nodes)) {
			CC.showTip({type:"error", msg:"请先选择菜单节点."});
			return ;
		}
		var menu = nodes[0].data;
		CC.showMsg({hmsg:"您确定要删除菜单"+menu.menuName+"吗?", option:2, callback:function() {
			RS.ajax({addroot:DC, url:"/sys/menu/removeById",ps:{id:menu.id},cb:function(r) {
				CC.showTip({type:"success",msg:"删除成功."});
				thiz.reloadParentNode();
				thiz.P_form.clearData();
			}});
		}});
	};
	
	
	
	
	
	/**
	 * 返回当前页面html
	 */
	this.render = function() {
		var html = ['<div class="row">',
					'	<div class="col-md-4" style="padding-right:5px;padding-left:0px;">',
					'		<div class="panel" style="min-height: 860px;">',
					'			<div class="panel-heading no-divider">',
					'				<h3 class="panel-title">菜单结构树</h3>',
					'				<a href="###" class="table-link right a_menu_addFirst" title="添加一级菜单">',
					'					<i class="fa fa-plus-circle" style="font-size:20px;"></i>',
					'				</a>',
					'			</div>',
					'			<div class="panel-body" style="padding-top:5px;">',
					'				<div class="custom-tree tree_menu"></div>',
					'			</div>',
					'		</div>',
					'	</div>',
					'	<div class="col-md-8" style="padding-left:5px;padding-right:0px;">',
					'		<div class="panel" style="min-height: 860px;">',
					'			<div class="panel-heading no-divider">',
					'				<h3 class="panel-title">菜单信息</h3>',
					'			</div>',
					'			<div class="panel-body">',
					'				<div class="form-horizontal">',
					'				<form class="form-horizontal" role="form">',
					'	            	<div class="form-group">',
					'						<label for="menuCode" class="control-label pull-left lw100">菜单代码<font color="red">*</font></label>',
					'						<div class="pull-left lw260">',
					'							<input type="text" name="menuCode" required class="form-control" maxLength=30 >',
					'						</div>',
					'					</div>',
					'	            	<div class="form-group">',
					'						<label for="menuName" class="control-label pull-left lw100">菜单名称<font color="red">*</font></label>',
					'						<div class="pull-left lw260">',
					'							<input type="text" name="menuName" required class="form-control" maxLength=30 >',
					'						</div>',
					'					</div>',
					'					<div class="form-group">',
					'						<label for="menuImg" class="control-label pull-left lw100">菜单图标</label>',
					'						<div class="pull-left lw260">',
					'							<input type="text" name="menuImg" class="form-control"  maxLength=100>',
					'						</div>',
					'					</div>',
					'					<div class="form-group" style="padding-top:20px;padding-left:100px;">',
					'						<div class="text-left">',
					'							<button type="submit" class="btn btn-primary">保存</button>&nbsp;&nbsp;',
					'							<button type="button" class="btn btn-danger btn_removeMenu">删除</button>',
					'						</div>',
					'					</div>',
					'				</form>',
					'				</div>',
					'			</div>',
					'		</div>',
					'	</div>',
					'</div>'];
		return html.join('');
	};
	
	
	
	
}

