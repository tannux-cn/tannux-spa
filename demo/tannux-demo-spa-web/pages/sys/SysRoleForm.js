

function SysRoleForm() {
	var thiz = this;
	this.P_form = null;
	this.CurrentId = "";
	
	
	this.init = function(ps) {
		thiz.CurrentId = ps.id;
	};
	
	
	/**
	 * 页面元素被渲染后执行函数
	 */
	this.onShow = function() {
		this.initComponent();
		this.initListener();
		
		if(!CU.isEmpty(thiz.CurrentId)) {
			thiz.P_form.setRecordId(thiz.CurrentId);
			thiz.P_form.load();
		}
	};
	
	
	/**
	 * 页面被关闭(销毁)时执行函数
	 */
	this.onClose = function() {
		delete thiz.P_form;
	};
	
	
	this.initComponent = function() {
		thiz.P_form = PU.getForm({bid:thiz.dom, addroot:DC,
						loadUrl:"/sys/role/queryById",
						submitUrl:"/sys/role/saveOrUpdate"});
	};
	
	this.initListener = function() {
		thiz.dom.find(".btn-refresh").bind("click", function() {
			refreshMenu();
		});
	};
	
	
	/**
	 * 此函数拼装当前页面的html并返回
	 */
	this.render = function() {
		var html = ['<div class="panel-body tx-menu-pop-inner" >',
					'		<form class="form-horizontal" role="form" id="form_code">',
					'            <div class="form-group">',
					'				<label for="roleName" class="control-label pull-left lw120"><font color="red">*</font>岗位名称</label>',
					'				<div class="pull-left lw220">',
					'					<input type="text" name="roleName" required class="form-control" maxLength=20>',
					'				</div>',
					'			</div>',
					'          	<div class="form-group">',
					'				<label for="roleDesc" class="control-label pull-left lw120"><font color="red">*</font>岗位描述</label>',
					'				<div class="pull-left lw220">',
					'					<textarea id="roleDesc" name="roleDesc" class="form-control" required maxLength=200 style="width:350px;height:80px;"></textarea>',
					'				</div>',
					'			</div>',
					'			<div class="form-group" style="padding-top:20px;">',
					'				<div class="pull-left lw160">&nbsp;</div>',
					'				<div class="pull-left">',
					'					<button type="submit" class="btn btn-primary btn-save"><i class="fa fa-save"></i>保存</button>&nbsp;&nbsp;',
					'					<button type="button" class="btn btn-primary btn-refresh"><i class="fa fa-refresh"></i>刷新</button>&nbsp;&nbsp;',
					'				</div>',
					'			</div>',
					'		</form>',
					'</div>'];
		return html.join('');
	};
	
	
	
	
	
	
}
