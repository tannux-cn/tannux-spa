/**
 * 
 * 移动端底部抽屉选择器
 * 
 * 由后端开发人员编写
 * @author yyq 
 * @CSDN 慕云枫
 * @date 2023-09-09
 * @version 1.0
 */
var layPicker = {
	index: 0, // 递增的index，作为元素的唯一标识
	indexList: [], // 每个index的集合
	offset: {}, // 每个ul元素的滚动位置
	liHeight: 50, // 每个li的高度
	selectList: {}, // 存储每个被选中的值，li下标
	textField: 'name', // 参数名称-内容
	valueField: 'value',// 参数名称-值
	fieldList: {}, // 参数名称集
	dataList: {}, // 数据集合
	config:{},
	init: function(data){
		layPicker.index ++;
		layPicker.config[layPicker.index] = data;
		layPicker.indexList.push(layPicker.index);
		var key = ''+layPicker.index;
		// 参数名称替换
		layPicker.fieldList[key] = {
			textField: data.textField || layPicker.textField,
			valueField: data.valueField || layPicker.valueField,
		};
		// 滚动位置初始化
		layPicker.offset[key] = {
			start: {},
			move: {},
			end: {state: false},
		};
		// 日期选择器-获取对应值
		if(data.options){
			data.data = lay_picker_date.getData(data.options, data);
		}
		// 选中值初始化
		layPicker.selectList[key] = {};
		// 数据集
		layPicker.dataList[key] = data.data;
		// 渲染标签
		var html = layPicker.initBody(data, key);
		$('body').append(html);
		// 给绑定元素添加标识
		$(data.elem).attr('readonly', true);
		$(data.elem).attr('lay-picker-id', key);
		
		// 不等于自定义html才需要执行这些操作
		if(!data.type || data.type != 3){
			// 初始化标签和值
			layPicker.initBox(data.data, key);
			layPicker.initSelect(key);
			// 日期选择器-赋值
			if(data.options){
				layPicker.setValue(key, lay_picker_date.getVoluation(data.options, layPicker.fieldList[key].valueField));
			}
			// 滑动-开始（手指放在页面时触发）
			$('.lay-picker-'+key).on('touchstart', '.lay-picker-list-wrap', function(e) {
				if(!layPicker.offset[key].end.state){
					layPicker.offset[key].end.state = true;
					var touch = e.originalEvent.targetTouches[0];
					layPicker.offset[key].start.y = touch.clientY;
					var ul = $(this).find('ul')[0];
					layPicker.offset[key].start.top = parseInt(ul.style.transform.split(",")[1].replace('px', '')) || 0;
				}
				e.stopPropagation(); // 防止屏幕滑动
			});
			// 滑动-中（手指移动时触发）
			$('.lay-picker-'+key).on('touchmove', '.lay-picker-list-wrap', function(e) {
				var touch = e.originalEvent.targetTouches[0];
				layPicker.offset[key].move.y = touch.clientY;
				var y = layPicker.offset[key].move.y - layPicker.offset[key].start.y + layPicker.offset[key].start.top;
				$(this).find('ul').css('transform', 'translate3d(0px, ' + y + 'px, 0px)');
				layPicker.offset[key].end.y = y;
				e.stopPropagation();
	            e.preventDefault();// 防止屏幕滑动
			});
			// 滑动-结束（手指离开页面时触发）
			$('.lay-picker-'+key).on('touchend', '.lay-picker-list-wrap', function(e) {
				layPicker.offset[key].end.state = false;
				var itemHeight = layPicker.liHeight;
				var sign = layPicker.offset[key].end.y >= 0 ? 1 : -1;
				var ul = $(this).find('ul')[0];
				var thisIndex = $(this).attr("index");
				// 计算超出回弹
				var fieldIndex = Math.round(Math.abs(layPicker.offset[key].end.y) / itemHeight);
	            var len = sign * (fieldIndex * itemHeight);
	            if (len > 0) {
	                len = 0;
	                fieldIndex = 0;
	            } else if (len < -(ul.children.length - 1) * itemHeight) {
	                len = -(ul.children.length - 1) * itemHeight;
	                fieldIndex = ul.children.length - 1;
	            };
	            $(this).find('ul').css('transform', 'translate3d(0px, ' + len + 'px, 0px)');
				layPicker.selectList[key][thisIndex] = fieldIndex;
				// 获取选中值
				var list = layPicker.dataList[key];
				var resultArray = [];
				for(var i=0; i<=Number(thisIndex); i++){
					var arr = list[i];
					if(arr && arr.length > 0){
						var obj = arr[layPicker.selectList[key][i]];
						resultArray.push(obj);
					}
				}
				// 回调
				if(data.onSelect){
					data.onSelect(key, thisIndex, resultArray);
				}
				// 日期选择器-赋值day
				if(data.options && (data.options == 'date' || data.options == 'datetime' || data.options == 'datetimesecond')){
					if(thisIndex==0 || thisIndex==1){
						if(thisIndex == 0) {
							var obj = list[1][layPicker.selectList[key][1]];
							resultArray.push(obj);
						}
						
						var oldday = list[2][layPicker.selectList[key][2]];
						var newdays = lay_picker_date.getDay(resultArray);
						layPicker.setData(key, 1, newdays);
						
						var olddaynum = parseInt(oldday.value, 10);
						var newdaynum = parseInt(newdays[newdays.length-1].value, 10);
						if(olddaynum > newdaynum) {
							oldday = newdays[newdays.length-1];
						}
						
						layPicker.setValue(key, [null, null, oldday]);
					}
				}else if(data.options && (data.options == 'region')) {
					if(thisIndex == 0) {
						var prov = resultArray[0].value;
						
						var oldcity = list[1][layPicker.selectList[key][1]];
						var newcs = lay_picker_date.getCitys(prov);
						layPicker.setData(key, 0, newcs);
						
						for(var i=0; i<newcs.length; i++) {
							if(oldcity.value == newcs[i].value) {
								layPicker.setValue(key, [null, oldcity]);
								break ;
							}
						}
					}
				}
				e.stopPropagation();// 防止屏幕滑动
			});
		  	// 取消-点击
			$('.lay-picker-'+key).on("click", ".lay-picker-cancel-click", function(e){
				layPicker.hiden($(this).parents('.lay-picker').attr('lay-index'));
				if(data.onCancel){
					data.onCancel(key);
				}
		  	});
		  	// 确认-点击
			$('.lay-picker-'+key).on("click", ".lay-picker-confirm-click", function(e){
				layPicker.hiden($(this).parents('.lay-picker').attr('lay-index'));
				
				if(data.onConfirm){
					var o = layPicker.getValueAndString(key);
					data.onConfirm(key, o.value, o.array);
				}
		  	});
		}
		// 绑定元素-点击
		$(data.elem).on('click', function(e){
			if(data.beforeShow) {
				var ba = data.beforeShow(key);
				if(ba === false) return ;
			}
			layPicker.show($(this).attr('lay-picker-id'));
			if(data.onShow){
				data.onShow(key);
			}
		})
		// 遮罩-点击
		$('.lay-picker-'+key).on("click", ".lay-picker-shade", function(e){
			layPicker.hiden($(this).parents('.lay-picker').attr('lay-index'));
			if(data.onShade){
				data.onShade(key);
			}
	  	});
	  	// 成功回调
		if(data.onSuccess){
			data.onSuccess(key, '.lay-picker-'+key);
		}
	  	return key;
	},
	initBody: function(data, index){
		var s = '';
		s += '<div class="lay-picker lay-picker-'+index+'" lay-index="'+index+'" style="display: none;">';
		if(data.shade !== false){
			if(data.shade){
				s += '	<div class="lay-picker-shade" style="background: rgba(0, 0, 0, '+data.shade+');"></div>';
			}else{
				s += '	<div class="lay-picker-shade"></div>';
			}
		}
		if(data.type == 3){
			var radius = (data.radius?'border-radius: '+data.radius+'px '+data.radius+'px 0px 0;':'');
			s += '	<div class="lay-picker-container" style=";transform: translate3d(0px, 100%, 0px);'+radius+'">';
			s += '		<div class="lay-picker-content" style="overflow: auto;">';
			s += (data.content || '');
			s += '		</div>';
			s += '	</div>';
			s += '</div>';
		}else if(data.type == 2){
			var radius = (data.radius?'border-radius: '+data.radius+'px '+data.radius+'px 0px 0;':'');
			s += '	<div class="lay-picker-container" style="transform: translate3d(0px, 100%, 0px);'+radius+'">';
			if(data.title){
				s += '		<div class="lay-picker-header" style="'+radius+'">';
				s += '			<div class="lay-picker-title">'+(data.title || '')+'</div>';
				s += '		</div>';
			}
			s += '		<div class="lay-picker-content" style="'+(data.title ? '' : 'margin: 30px 15px;')+'">';
			s += '			<div class="lay-picker-shadowup"></div>';
			s += '			<div class="lay-picker-shadowdown"></div>';
			s += '			<div class="lay-picker-box"></div>';
			s += '		</div>';
			s += '		<div class="lay-picker-bottom">';
			s += '			<span class="lay-picker-cancel-click lay-picker-bottom-btn lay-picker-bottom-btn-cancel">取消</span>';
			s += '			<span class="lay-picker-confirm-click lay-picker-bottom-btn lay-picker-bottom-btn-confirm">确定</span>';
			s += '		</div>';
			s += '	</div>';
			s += '</div>';
		}else{
			var radius = (data.radius?'border-radius: '+data.radius+'px '+data.radius+'px 0px 0;':'');
			s += '	<div class="lay-picker-container" style="transform: translate3d(0px, 100%, 0px);'+radius+'">';
			s += '		<div class="lay-picker-header" style="'+radius+'">';
			s += '			<div class="lay-picker-title">'+(data.title || '')+'</div>';
			s += '			<div class="lay-picker-btn">';
			s += '				<span class="lay-picker-cancel lay-picker-cancel-click">取消</span>';
			s += '				<span class="lay-picker-confirm lay-picker-confirm-click">确定</span>';
			s += '			</div>';
			s += '		</div>';
			s += '		<div class="lay-picker-content">';
			s += '			<div class="lay-picker-shadowup"></div>';
			s += '			<div class="lay-picker-shadowdown"></div>';
			s += '			<div class="lay-picker-box"></div>';
			s += '		</div>';
			s += '	</div>';
			s += '</div>';
		}
		return s;
	},
	initBox: function(data, index){
		var len = 100 / data.length;
		var box = $('.lay-picker-'+index).find('.lay-picker-box');
		for(var i=0; i<data.length; i++){
			var div = $('<div index="'+i+'" class="lay-picker-list-wrap" style="width: '+len+'%;"></div>');
			var ul = $('<ul style="transform: translate3d(0px, 0, 0px);"></ul>');
			for(var j=0; j<data[i].length; j++){
				var li = $('<li>'+data[i][j][layPicker.fieldList[index].textField]+'</li>');
				ul.append(li);
			}
			div.append(ul);
			box.append(div);
		}
	},
	initSelect: function(index){
		var list = layPicker.dataList[index];
		for(var i=0; i<list.length; i++){
			layPicker.selectList[index][i+''] = 0;
		}
	},
	setData: function(index, i, data, trends){
		var t_index = (Number(i) + 1);
		var ul = $('.lay-picker-'+index).find('.lay-picker-box').find('[index='+t_index+']>ul');
		ul.empty();
		ul.css('transform', 'translate3d(0px, 0px, 0px)');
		for(var i=0; i<data.length; i++){
			var li = $('<li>'+data[i][layPicker.fieldList[index].textField]+'</li>');
			ul.append(li);
		}
		layPicker.selectList[index][t_index+''] = 0;
		layPicker.dataList[index][t_index] = data;
		
	},
	setDataTrends: function(index, i, data){
		var t_index = (Number(i) + 1);
		if(!data || data.length == 0){
			layPicker.deleteData(index, i, t_index);
			var len = 100 / layPicker.dataList[index].length;
			$('.lay-picker-'+index).find('.lay-picker-list-wrap').css('width', len+'%');
			return;
		}
		var data_len = t_index > layPicker.dataList[index].length-1;
		if(data_len){
			layPicker.dataList[index].push(data);
		}else{
			layPicker.dataList[index][t_index] = data;
			layPicker.deleteData(index, t_index, t_index+1);
		}
		var box = $('.lay-picker-'+index).find('.lay-picker-box');
		var len = 100 / layPicker.dataList[index].length;
		$('.lay-picker-'+index).find('.lay-picker-list-wrap').css('width', len+'%');
		if(data_len){
			var div = $('<div index="'+t_index+'" class="lay-picker-list-wrap" style="width: '+len+'%;"><ul style="transform: translate3d(0px, 0, 0px);"></ul></div>');
			box.append(div);
		}
		var ul = $('.lay-picker-'+index).find('.lay-picker-box').find('[index='+t_index+']>ul');
		ul.empty();
		ul.css('transform', 'translate3d(0px, 0px, 0px)');
		for(var i=0; i<data.length; i++){
			var li = $('<li>'+data[i][layPicker.fieldList[index].textField]+'</li>');
			ul.append(li);
		}
		layPicker.selectList[index][t_index+''] = 0;
	},
	deleteData: function(index, i, t_index){
		if(layPicker.dataList[index].length > Number(i)){
			for(var i=t_index; i<layPicker.dataList[index].length; i++){
				layPicker.dataList[index].splice(i, 1);
				$('.lay-picker-'+index).find('.lay-picker-box').find('[index='+i+']').remove();
				return layPicker.deleteData(index, i, t_index);
			}
		}
	},
	
	
	refreshDynamicItems : function(index, resultArray) {
		var data = layPicker.config[index];
		
		if(data.options && (data.options == 'date' || data.options == 'datetime' || data.options == 'datetimesecond')){
			if(!CU.isEmpty(resultArray) && resultArray.length>=2 && !CU.isEmpty(resultArray[0]) && !CU.isEmpty(resultArray[1])
				 && !CU.isEmpty(resultArray[0].value) && !CU.isEmpty(resultArray[1].value)){
				var oldday = resultArray[2];
				var newdays = lay_picker_date.getDay(resultArray);
				layPicker.setData(index, 1, newdays);
				
				if(!CU.isEmpty(oldday) && !CU.isEmpty(oldday.value)) {
					var olddaynum = parseInt(oldday.value, 10);
					var newdaynum = parseInt(newdays[newdays.length-1].value, 10);
					if(olddaynum > newdaynum) {
						oldday = newdays[newdays.length-1];
					}
					
					layPicker.setValue(index, [null, null, oldday]);
				}
			}
		}else if(data.options && (data.options == 'region')) {
			if(!CU.isEmpty(resultArray) && resultArray.length>=1 && !CU.isEmpty(resultArray[0]) && !CU.isEmpty(resultArray[0].value)){
				var prov = resultArray[0].value;
				
				var oldcity = resultArray[1];;
				var newcs = lay_picker_date.getCitys(prov);
				layPicker.setData(index, 0, newcs);
				
				if(!CU.isEmpty(oldcity) && !CU.isEmpty(oldcity.value)) {
					for(var i=0; i<newcs.length; i++) {
						if(oldcity.value == newcs[i].value) {
							layPicker.setValue(index, [null, oldcity]);
							break ;
						}
					}
				}
			}
		}
	},
	
	
	setValue: function(index, data){
		var list = layPicker.dataList[index];
		var box = $('.lay-picker-'+index).find('.lay-picker-box');
		for(var i=0; i<data.length; i++){
			var arr = list[i];
			var item = data[i];
			if(!item) continue;
			for(var j=0; j<arr.length; j++){
				if(arr[j][layPicker.fieldList[index].valueField] == item[layPicker.fieldList[index].valueField]){
					layPicker.selectList[index][i+''] = j;
					var y = j * layPicker.liHeight;
					box.find('[index='+i+']>ul').css('transform', 'translate3d(0px, -'+y+'px, 0px)');
				}
			}
		}
		layPicker.refreshDynamicItems(index, data);
	},
	getValue: function(key) {
		return layPicker.getValueAndString(key).array;
	},
	getValueAndString: function(key) {
		var data = layPicker.config[key];
		var list = layPicker.dataList[key];
		var v = '', resultArray = [];
		for(var k in layPicker.selectList[key]){
			var arr = list[Number(k)]
			if(arr && arr.length > 0){
				var obj = arr[layPicker.selectList[key][k]]
				if(data.options && (data.options == 'time' || data.options == 'timesecond' || data.options == 'datetime' || data.options == 'datetimesecond')){
					if(data.options == 'time' || data.options == 'timesecond'){
						v += obj[layPicker.fieldList[key].valueField] + ":";
					}else if((data.options == 'datetime' || data.options == 'datetimesecond') && Number(k) == 2){
						v += obj[layPicker.fieldList[key].valueField] + " ";
					}else if((data.options == 'datetime' || data.options == 'datetimesecond') && Number(k) > 2){
						v += obj[layPicker.fieldList[key].valueField] + ":";
					}else{
						v += obj[layPicker.fieldList[key].valueField] + "-";
					}
				}else if(data.options && (data.options == 'region')) {
					v += obj[layPicker.fieldList[key].valueField] + ",";
				}else{
					v += obj[layPicker.fieldList[key].valueField] + "-";
				}
				resultArray.push(obj);
			}
		}
		if(v.length>0) v = v.substring(0, v.length-1);
		return {value:v, array:resultArray};
	},
	hiden: function(index){
		$('.lay-picker-'+index).find('.lay-picker-container').css('transform', 'translate3d(0px, 100%, 0px)');
		$('.lay-picker-'+index).find('.lay-picker-shade').fadeOut(200);
		setTimeout(function(){
			$('.lay-picker-'+index).css('display', 'none');
		}, 100)
	},
	show: function(index){
		$('.lay-picker-'+index).css('display', 'block');
		$('.lay-picker-'+index).find('.lay-picker-shade').fadeIn(200);
		setTimeout(function(){
			$('.lay-picker-'+index).find('.lay-picker-container').css('transform', 'translate3d(0px, 0px, 0px)');
		}, 10)
	},
	remove: function(index){
		layPicker.hiden(index);
		setTimeout(function(){
			$('.lay-picker-'+index).remove();
		}, 200)
		for(var i=0; i<layPicker.indexList.length; i++){
			if(layPicker.indexList[i] == index){
				layPicker.indexList.splice(i, 1);
				break;
			}
		}
	},
	removeAll: function(){
		if(layPicker.indexList.length > 0){
			for(var i=0; i<layPicker.indexList.length; i++){
				layPicker.hiden(layPicker.indexList[i]);
				var index = layPicker.indexList[i];
				layPicker.removeTime(index);
				layPicker.indexList.splice(i, 1);
				return layPicker.removeAll();
			}
		}
	},
	removeTime: function(index){
		setTimeout(function(){
			$('.lay-picker-'+index).remove();
		}, 200)
	},
}

/**
 * 日期对象
 */
var lay_picker_date = {
	getVoluation: function(value, key){
		var date_obj = lay_picker_date.getDateTime();
		var year_obj = {};
		year_obj[''+key] = date_obj.year;
		var month_obj = {};
		month_obj[''+key] = date_obj.month;
		var day_obj = {};
		day_obj[''+key] = date_obj.day;
		var hours_obj = {};
		hours_obj[''+key] = date_obj.hours;
		var minutes_obj = {};
		minutes_obj[''+key] = date_obj.minutes;
		var seconds_obj = {};
		seconds_obj[''+key] = date_obj.seconds;
		if(value == 'year'){
			return [year_obj];
		}else if(value == 'month'){
			return [year_obj, month_obj];
		}else if(value == 'date'){
			return [year_obj, month_obj, day_obj];
		}else if(value == 'time'){
			return [hours_obj, minutes_obj];
		}else if(value == 'timesecond'){
			return [hours_obj, minutes_obj, seconds_obj];
		}else if(value == 'datetime'){
			return [year_obj, month_obj, day_obj, hours_obj, minutes_obj];
		}else if(value == 'datetimesecond'){
			return [year_obj, month_obj, day_obj, hours_obj, minutes_obj];
		}else if(value=='enum' || value=='dict') {
			year_obj[''+key] = '';
			return [year_obj];
		}else if(value=='region') {
			year_obj[''+key] = '';
			month_obj[''+key] = '';
			return [year_obj, month_obj];
		}
	},
	getData: function(value, config){
		if(value == 'year'){
			var years = lay_picker_date.getYear();
			var months = lay_picker_date.getMonth();
			return [years];
		}else if(value == 'month'){
			var years = lay_picker_date.getYear();
			var months = lay_picker_date.getMonth();
			return [years, months];
		}else if(value == 'date'){
			var years = lay_picker_date.getYear();
			var months = lay_picker_date.getMonth();
			var date_obj = lay_picker_date.getDateTime();
			var days = lay_picker_date.getDay(
				[
					{value: date_obj.year},
					{value: date_obj.month},
				]
			);
			return [years, months, days];
		}else if(value == 'time'){
			var hourss = lay_picker_date.getHours();
			var minutess = lay_picker_date.getMinutes();
			return [hourss, minutess];
		}else if(value == 'timesecond'){
			var hourss = lay_picker_date.getHours();
			var minutess = lay_picker_date.getMinutes();
			var secondss = lay_picker_date.getSeconds();
			return [hourss, minutess, secondss];
		}else if(value == 'datetime'){
			var years = lay_picker_date.getYear();
			var months = lay_picker_date.getMonth();
			var date_obj = lay_picker_date.getDateTime();
			var days = lay_picker_date.getDay(
				[
					{value: date_obj.year},
					{value: date_obj.month},
				]
			);
			var hourss = lay_picker_date.getHours();
			var minutess = lay_picker_date.getMinutes();
			return [years, months, days, hourss, minutess];
		}else if(value == 'datetimesecond'){
			var years = lay_picker_date.getYear();
			var months = lay_picker_date.getMonth();
			var date_obj = lay_picker_date.getDateTime();
			var days = lay_picker_date.getDay(
				[
					{value: date_obj.year},
					{value: date_obj.month},
				]
			);
			var hourss = lay_picker_date.getHours();
			var minutess = lay_picker_date.getMinutes();
			var secondss = lay_picker_date.getSeconds();
			return [years, months, days, hourss, minutess, secondss];
		}else if(value=="enum" || value=="dict") {
			var n = config.view;
			if(CU.isEmpty(n)) n = config.dict;
			if(CU.isEmpty(n)) throw "not setting enum name.";
			var ls = DROP[n];
			if(!CU.isEmpty(ls)) {
				var arr = [];
				for(var i=0; i<ls.length; i++) {
					var row = ls[i];
					arr.push({value:row.code, name:row.name});
				}
				return [arr];
			}else {
				throw "not found dict '"+n+"'.";
			}
		}else if(value=="region") {
			var ls = window.REGION_PROV_CITY;
			if(!CU.isEmpty(ls)) {
				var arr = [];
				var subs = [];
				for(var i=0; i<ls.length; i++) {
					var row = ls[i];
					arr.push({value:row.n, name:row.n});
					
					if(i==0 && !CU.isEmpty(row.cs)) {
						for(var j=0; j<row.cs.length; j++) {
							var c = row.cs[j];
							subs.push({value:c, name:c});
						}
					}
				}
				return [arr, subs];
			}else {
				throw "not found 'REGION_PROV_CITY'.";
			}
		}
	},
	getDateTime: function() {
	    var myDate = new Date();
	    var year = myDate.getFullYear(); //获取年
	    var month = myDate.getMonth() + 1; //获取月，默认从0开始，所以要加一
	    month = ('00' + month).slice(-2);
	    var day = ('00' + myDate.getDate()).slice(-2); //获取日
	    var hours = ('00' + myDate.getHours()).slice(-2); //获取小时
	    var minutes = ('00' + myDate.getMinutes()).slice(-2); //获取分
	    var seconds = ('00' + myDate.getSeconds()).slice(-2); //获取秒
		return {
			year: year,
			month: month,
			day: day,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		}
	},
	getYear: function(){
		var arr = [],
			now = new Date();
		var year = now.getFullYear();
		for(var i = 1990; i <= year + 30; i++) {
			arr.push({
				name: i + '年',
				value: i
			});
		}
		return arr;
	},
	getMonth: function(result) {
		var arr = [],
			now = new Date();
		for(var i = 1; i <= 12; i++) {
			var code = ('00' + i).slice(-2);
			arr.push({
				name: i + '月',
				value: code
			});
		}
		return arr;
	},
	getDay: function(result) {
		var year = result[0].value,
			month = result[1].value;
		var thisDate = new Date(Number(year), Number(month), 0);
		var maxDay = thisDate.getDate();
		var arr = [];
		for(var i = 1; i <= maxDay; i++) {
			var code = ('00' + i).slice(-2);
			arr.push({
				name: i + '日',
				value: code
			});
		}
		return arr;
	},
	getHours: function(result) {
		var arr = [],
			now = new Date();
		for(var i = 0; i < 24; i++) {
			var value = ('00' + i).slice(-2);
			arr.push({
				name: value + '时',
				value: value
			})
		}
		return arr;
	},
	getMinutes: function(result) {
		var arr = [],
			now = new Date();
		for(var i = 0; i < 60; i++) {
			var value = ('00' + i).slice(-2);
			arr.push({
				name: value + '分',
				value: value
			})
		}
		return arr;
	},
	getSeconds: function(result) {
		var arr = [],
			now = new Date();
		for(var i = 0; i < 60; i++) {
			var value = ('00' + i).slice(-2);
			arr.push({
				name: value + '秒',
				value: value
			})
		}
		return arr;
	},
	
	getCitys : function(prov) {
		var subs = [];
		if(!CU.isEmpty(window.REGION_PROV_CITY)) {
			var ls = window.REGION_PROV_CITY;
			for(var i=0; i<ls.length; i++) {
				var row = ls[i];
				if(row.n == prov) {
					if(!CU.isEmpty(row.cs)) {
						for(var j=0; j<row.cs.length; j++) {
							var c = row.cs[j];
							subs.push({value:c, name:c});
						}
					}
					break ;
				}
			}
		}
		return subs;
	}
}

