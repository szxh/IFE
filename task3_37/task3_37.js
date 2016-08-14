//可拖拽
//可缩小放大
//点击confirm和cancel和半透明罩自动退出浮出层界面
//提供的接口：控制浮出层的显示和消失，控制浮出层的窗口大小

function $(selector) {
	return document.querySelectorAll(selector);
}

var btn = $('show-float')[0],
	floatWrap = document.getElementsByClassName('float-wrap')[0],
	floatLayer = document.getElementsByClassName('float-layer')[0],
	floatAll = document.getElementsByClassName('float-all')[0],
	body = $('body')[0];

EventUtil.addHandler(body, 'click', toggleFloat);

function toggleFloat(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	if (target.value === '确定' || target.value === '取消' || target.value === '点击' || target.classList.contains('float-wrap')){
		floatAll.classList.toggle('hide');
	}
}
