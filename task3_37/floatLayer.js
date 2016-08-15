//可拖拽
//点击confirm和cancel和半透明罩自动退出浮出层界面
//提供的接口：控制浮出层的显示和消失

//自制$选择器
function $(selector) {
	return document.querySelector(selector);
}

var floatLayer = function(floatDiv) {
	this.ele = floatDiv;
	this.mask = null;
	this.top = 0;
	this.left = 0;
	this.currentX = null;
	this.currentY = null;
	this.flag = false;
	this.init();
}

floatLayer.prototype = {
	show: function() {
		this.mask.classList.toggle('hide');
		this.ele.classList.toggle('hide');
	},
	
	hide: function() {
		this.mask.classList.toggle('hide');
		this.ele.classList.toggle('hide');
	},
	
	init: function() {
		var self = this;
		this.mask = document.createElement('div');
		this.mask.classList.add('float-wrap');
		this.ele.innerHTML = '<div class="float-title">这是一个浮出层</div><div class="float-content">这是一个浮出层</div><div class="btn"><input type="button" value="确定" class="confirm"/><input type="button" value="取消" class="cancel"/></div>';
		this.ele.classList.add('float-layer');
		$('body').insertBefore(this.mask,this.ele);
		EventUtil.addHandler($('.confirm'), 'click', function(){self.show()});
		EventUtil.addHandler($('.cancel'), 'click', function(){self.show()});
		EventUtil.addHandler($('.float-wrap'), 'click', function(){self.show()});
		this.setDrag();
	},
	
	setDrag: function() {
		var self = this;
		EventUtil.addHandler(this.ele.children[0], 'mousedown', dragStart);
		EventUtil.addHandler(this.ele.children[0], 'mouseup', dragEnd);
		EventUtil.addHandler(this.ele.children[0], 'mousemove', drag);
		EventUtil.addHandler(this.ele.children[0], 'mouseleave', dragEnd);
		
		function dragStart(event) {
			self.flag = true;
			self.currentX = event.clientX;
			self.currentY = event.clientY;
			self.left = self.ele.offsetLeft,
			self.top = self.ele.offsetTop;
		}
		
		function dragEnd(event) {
			self.flag = false;
		}
		
		function drag(event) {
			event = EventUtil.getEvent(event);
			if (self.flag) {
				var nowX = event.clientX,
					nowY = event.clientY;
					self.ele.style.left =  self.left  + nowX - self.currentX + 'px';
					self.ele.style.top =  self.top  + nowY - self.currentY + 'px';
			}
		}
	}
};






