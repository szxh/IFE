function $(selector) {
	return document.querySelector(selector);
}

function datePicker() {
	this.dates = new Date();
	this.year = this.dates.getFullYear();
	this.month = this.dates.getMonth() + 1;
	this.date = this.dates.getDate();
	//一个月第一天是周几
	this.day = null;
	//一个月最后一天是周几
	this.endDay = null;
	//本月最大的日期
	this.dateMax = null;
	//上个月最大的日期
	this.lastMax = null;
	//此次选中的日期节点
	this.selected = null;
	this.selectCall = null;
	this.min = null;
	this.max = null;
}

datePicker.prototype = {
	init: function(container, min, max) {
		if (min && max) {
			this.min = min;
			this.max = max;
		}
		
		container.innerHTML = '<input type="text" class="date-input" readOnly="true"/>' + '<div class="date-wrap hide">' + 
				'<div class="date-title"><span class="date-left"><</span>' +
				'<span class="year"></span>年<span class="month"></span>月<span class="date-right">></span></div>'+
				'<ul class="date-content"></div>';
		this.render();
		this.setDate(this.dates);
		EventUtil.addHandler(container, 'click', this.changeDate.bind(this));
		var dateInput = $('.date-input');
		EventUtil.addHandler(dateInput, 'click', this.hide);
	},
	//渲染日历
	render: function() {
		//确定一个月的第一天是周几
		this.day = new Date(this.year, this.month - 1, 1).getDay();
		var year = $('.year'),
			month = $('.month'),
			dateContent = $('.date-content');
		year.innerText = this.year;
		month.innerText = this.month;
		
		//判断这个月有多少天
		this.dateMax = this.dateMaxFunc(this.month);
		//确定一个月的最后一天是周几
		this.endDay = new Date(this.year, this.month - 1, dateMax).getDay();
		//判断这个月之前需要显示哪几天
		this.lastMax = this.dateMaxFunc(this.month - 1);
		
		//构建渲染用的数据
		var dateArr = [];
		for (let i = 1;i < this.dateMax + 1; i++) {
			dateArr.push(i);
		}
		for (let i = this.lastMax; i > this.lastMax - this.day; i--) {
			dateArr.unshift(i);
		}
		for (let i = 1; i < 7 - this.endDay; i++) {
			dateArr.push(i);
		}
		var self = this;
		//渲染日历表日期
		dateContent.innerHTML = '<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul>' + 
			dateArr.map(function(item, index) {
				if (self.year > self.max.year || (self.year === self.max.year && self.month > self.max.month) || (self.year === self.max.year && self.month === self.max.month && index >= self.day && item > self.max.date)) {
					return '<li class="gray">' + item + '</li>';
				}
				if (self.year < self.min.year || (self.year === self.min.year && self.month < self.min.month) || (self.year === self.min.year && self.month === self.min.month && index >= self.day && item < self.min.date)) {
					return '<li class="gray">' + item + '</li>';
				}
				if ((index % 7 ===0 || (index + 1) % 7 === 0) && (index >= self.day && index <self.day + self.dateMax)) {
					return '<li class="red">' + item + '</li>';
				}
				if (index < self.day || index >= self.day + self.dateMax) {
					return '<li class="gray">' + item + '</li>';
				} else {
					return '<li>' + item + '</li>';
				}
		}).join('');
	},
	//获得一个月最大的日期
	dateMaxFunc: function(month) {
		if (month === 0) {
			month === 12;
		}
		var smallMonth = {
			4: true,
			6: true,
			9: true,
			11: true
		};
		if (month === 2) {
			if (this.year % 4 === 0) {
				dateMax = 29;
			} else {
				dateMax = 28;
			}
		} else if (smallMonth[month]) {
			dateMax = 30;
		} else {
			dateMax = 31;
		}
		return dateMax;
	},
	//处理点击日历后的变化
	changeDate: function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		//选中后样式变化，并隐藏面板
		if (target.nodeName.toLowerCase() === 'li' && !target.classList.contains('gray')) {
			this.changeColor(target);
			this.selectCall();
			this.hide();
			return;
		}
		//改变年月日
		if (target.classList.contains('date-left')) {
			if (this.month === 1) {
				this.month = 12;
				this.year--;
			} else {
				this.month--;
			}
			this.render();
		}
		if (target.classList.contains('date-right')) {
			if (this.month === 12) {
				this.month = 1;
				this.year++;
			} else {
				this.month++;
			}
			this.render();
		}
	},
	//改变被选中日期的样式
	changeColor: function(target) {
		if (!isNaN(target.innerText)) {
			if (this.selected) {
				this.selected.classList.remove('selected');
			}
			target.classList.add('selected');
			this.selected = target;
			$('.date-input').value = this.year + '-' + this.month + '-' + this.selected.textContent;
		}
	},
	//设定初始日期
	setDate: function(year, month, date) {
		if (!(year && month && date)) {
			return;
		}
		this.year = year;
		this.month = month;
		this.render();
		var target = $('.date-content').children[this.day + date + 6];
		this.changeColor(target);
	},
	//获取当前选中日期对象
	getDate: function() {
		try {
			if (this.selected.classList.contains('selected')) {
				return {
					year: this.year,
					month: this.month,
					date: parseInt(this.selected.textContent)
				}
			}
		} catch (error){
			return null;
		}
	},
	
	hide: function() {
		$('.date-wrap').classList.toggle('hide');
	},
	
	select: function(fn) {
		this.selectCall = fn;
	}
};

var dateObj = new datePicker();

//组件初始化，第一个参数传入在html中的位置，而后传入两个对象，这两个对象可选，分别对应可选日期的上限和下限,前后闭区间
var min = {
	year: 2013,
	month: 5,
	date: 15
};
var max = {
	year: 2018,
	month: 7,
	date: 8
};
dateObj.init($('.container'), min, max);

//设定日期的接口
dateObj.setDate(2015, 6, 8);

//获取选中日期的接口，若无选中的日期，则返回null；
var selectedDate = dateObj.getDate();

//增加点击日期后回调函数的接口
dateObj.select(function() {
	console.log(this);
	alert('您选择的日期是' + this.year + '-' + this.month + '-' + this.selected.textContent);
});

