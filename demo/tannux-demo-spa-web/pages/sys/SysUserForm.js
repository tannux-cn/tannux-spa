

function SysUserForm() {
	var thiz = this;
	this.P_form = null;
	this.CurrentId = "";
	
	
	this.init = function(ps) {
		thiz.CurrentId = ps.id;
		
		thiz.returnValue = "测试看下返回值";
	};
	
	
	/**
	 * 页面元素被渲染后执行函数
	 */
	this.onShow = function() {
		thiz.initComponent();
		thiz.initListener();
		
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
						loadUrl:"/sys/user/queryById",
						submitUrl:"/sys/user/saveOrUpdate"});
	};
	
	this.initListener = function() {
	};
	
	
	/**
	 * 此函数拼装当前页面的html并返回
	 */
	this.render = function() {
		var html = ['<div class="panel-body tx-menu-pop-inner" >',
					'		<form class="form-horizontal" role="form" id="form_code">',
					'            <div class="form-group">',
					'				<label for="userCode" class="control-label pull-left lw200"><font color="red">*</font>用户编码</label>',
					'				<div class="pull-left lw220">',
					'					<input type="text" name="userCode" required class="form-control" maxLength=20>',
					'				</div>',
					'			</div>',
					'            <div class="form-group">',
					'				<label for="userName" class="control-label pull-left lw200"><font color="red">*</font>用户姓名</label>',
					'				<div class="pull-left lw220">',
					'					<input type="text" name="userName" required class="form-control" maxLength=20>',
					'				</div>',
					'			</div>',
					'            <div class="form-group">',
					'				<label for="sex" class="control-label pull-left lw200">性别</label>',
					'				<div class="pull-left lw220">',
					'					<select name="sex"  class="form-control tannux-input-select" dict="V_SEX" ></select>',
					'				</div>',
					'			</div>',
					'            <div class="form-group">',
					'				<label for="birthday" class="control-label pull-left lw200">生日</label>',
					'				<div class="pull-left lw220">',
					'					<div class="input-group date" data-provide="datepicker">',
					'						<input type="text" name="birthday" tannux-format="date" class="form-control" ><span class="input-group-addon"><i class="fa fa-calendar"></i></span>',
					'					</div>',
					'				</div>',
					'			</div>',
					'            <div class="form-group">',
					'				<label for="loginCode" class="control-label pull-left lw200"><font color="red">*</font>登录账号</label>',
					'				<div class="pull-left lw220">',
					'					<input type="text" name="loginCode" required class="form-control" maxLength=20>',
					'				</div>',
					'			</div>',
					'			<div class="form-group" style="padding-top:20px;">',
					'				<div class="pull-left lw240">&nbsp;</div>',
					'				<div class="pull-left">',
					'					<button type="submit" class="btn btn-primary"><i class="fa fa-save"></i>保存</button>&nbsp;&nbsp;',
					'				</div>',
					'			</div>',
					'		</form>',
					'</div>'];
		return html.join('');
	};
	
	
	
	
	
	
}
