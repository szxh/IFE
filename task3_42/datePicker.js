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
	//此次选中的日期节点
	this.selected = null;
	//记录范围选择时的初始日期节点和最终日期节点
	this.selectDate = [];
	//选中日期后的回调函数
	this.selectCall = null;
	this.min = null;
	this.max = null;
}

datePicker.prototype = {
	init: function(param) {
		this.min = param.dateMin || null;
		this.max = param.dateMax || null;
		this.selectCall = param.selectCall || null;
		this.rangeCall = param.rangeCall || null;
		this.isRange = param.isRange;
		this.container = param.container;
		this.rangeLimit = param.rangeLimit || null;
	    this.container.innerHTML = '<input type="text" class="date-input" readOnly="true"/>' + '<div class="date-wrap hide">' + 
				'<div class="date-title"><span class="date-left"><</span>' +
				'<span class="year"></span>年<span class="month"></span>月<span class="date-right">></span></div>'+
				'<ul class="date-content"></div>';
		this.render();
		this.setDate(this.dates);
		EventUtil.addHandler($('.date-wrap'), 'click', this.changeDate.bind(this));
		EventUtil.addHandler($('.date-input'), 'click', this.hide);
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
		var dateMax = this.dateMaxFunc(this.month);
		//确定一个月的最后一天是周几
		var endDay = new Date(this.year, this.month - 1, dateMax).getDay();
		//判断这个月之前需要显示哪几天
		var lastMax = this.dateMaxFunc(this.month - 1);
		
		//构建渲染用的数据
		var dateArr = [];
		for (var i = 1;i < dateMax + 1; i++) {
			dateArr.push(i);
		}
		for (var i = lastMax; i > lastMax - this.day; i--) {
			dateArr.unshift(i);
		}
		for (var i = 1; i < 7 - endDay; i++) {
			dateArr.push(i);
		}
		var self = this;
		//渲染日历表日期
		
		dateContent.innerHTML = '<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul>' + 
			dateArr.map(function(item, index) {
				var dat = new Date(self.year, self.month - 1, item),
					datMin = new Date(self.min.year, self.min.month - 1, self.min.date),
					datMax = new Date(self.max.year, self.max.month - 1, self.max.date);
				
				if (dat > datMax || dat < datMin) {
					return '<li class="gray">' + item + '</li>';
				}
				if (index < self.day || index >= self.day + dateMax) {
					return '<li class="gray">' + item + '</li>';
				}
				if (dat - self.selectDate[0] === 0 || dat - self.selectDate[1] === 0) {
					return '<li class="selected">' + item + '</li>';
				}
				if (self.selectDate[0] > self.selectDate[1]) {
					if (dat < self.selectDate[0] && dat > self.selectDate[1]) {
						return '<li class="light-red">' + item + '</li>';
					}
				} else {
					if (dat > self.selectDate[0] && dat < self.selectDate[1]) {
						return '<li class="light-red">' + item + '</li>';
					}
				}
				if ((index % 7 ===0 || (index + 1) % 7 === 0) && (index >= self.day && index <self.day + dateMax)) {
					return '<li class="red">' + item + '</li>';
				}
				else {
					return '<li>' + item + '</li>';
				}
		}).join('') + '<div><span class="date-confirm">确定</span><span class="date-cancel">取消</span></div>';
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
		//单个日期选中后样式变化
		if (target.nodeName.toLowerCase() === 'li' && !target.classList.contains('gray')) {
			//范围日期选择后变化
			this.changeColor(target);
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
		if (target.classList.contains('date-confirm')) {
			this.confirm();
		}
		if (target.classList.contains('date-cancel')) {
			this.hide();
		}
	},
	
	
	//改变被选中日期的样式
	changeColor: function(target) {
		if (this.isRange && !isNaN(target.innerText)) {
			if (this.selectDate.length < 2) {
				this.selectDate.push(new Date(this.year, this.month - 1, parseInt(target.textContent)));
				if (this.rangeLimit && this.selectDate.length === 2) {
					var dayInterval = Math.abs(this.selectDate[0] - this.selectDate[1]) / 1000 / 60 / 60 / 24 + 1;
					if (dayInterval > this.rangeLimit[1] || dayInterval < this.rangeLimit[0]) {
						if (this.rangeCall) {
							this.rangeCall();
						} else {
							alert('所选时间超出时间跨度');
						}
						this.selectDate.pop();
						return;
					}
				}
				target.classList.add('selected');
			} else {
				this.selectDate.push(new Date(this.year, this.month - 1, parseInt(target.textContent)));
				if (this.rangeLimit && this.selectDate.length === 3) {
					var dayInterval = Math.abs(this.selectDate[1] - this.selectDate[2]) / 1000 / 60 / 60 / 24 + 1;
					if (dayInterval > this.rangeLimit[1] || dayInterval < this.rangeLimit[0]) {
						if (this.rangeCall) {
							this.rangeCall();
						} else {
							alert('所选时间超出时间跨度');
						}
						this.selectDate.pop();
						return;
					}
				}
				if (this.year === this.selectDate[0].getFullYear() && this.month === this.selectDate[0].getMonth() + 1) {
					$('.date-content').children[this.day + this.selectDate[0].getDate() + 6].classList.remove('selected');
				}
				this.selectDate.shift();
				target.classList.add('selected');
			}
			if (this.selectDate.length === 2) {
				var dateMax = this.dateMaxFunc(this.month);
				var dateContent = $('.date-content');
				for (var i = 1; i <= dateMax; i++) {
					var dat = new Date(this.year, this.month - 1, i);
					if (this.selectDate[0] > this.selectDate[1]) {
						if (dat < this.selectDate[0] && dat > this.selectDate[1]) {
							dateContent.children[this.day + i + 6].classList.add('light-red');
						} else {
							dateContent.children[this.day + i + 6].classList.remove('light-red');
						}
					} else {
						if (dat > this.selectDate[0] && dat < this.selectDate[1]) {
							dateContent.children[this.day + i + 6].classList.add('light-red');
						} else {
							dateContent.children[this.day + i + 6].classList.remove('light-red');
						}
					}
				}
			}
		} else {
			if (!isNaN(target.innerText)) {
				if (this.selected) {
					this.selected.classList.remove('selected');
				}
				target.classList.add('selected');
				this.selected = target;
			}
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
	
	confirm: function() {
		console.log('jj');
		if (!this.isRange) {
			$('.date-input').value = this.year + '/' + this.month + '/' + this.selected.textContent;
			if (this.selectCall) {
				this.selectCall();
			} else {
				alert('选择成功');
			}
			this.hide();
		} else {
			if (this.selectDate[0] < this.selectDate[1]) {
				$('.date-input').value = this.selectDate[0].getFullYear() + '/' + (this.selectDate[0].getMonth() + 1) + '/' + this.selectDate[0].getDate() + '-' +
				this.selectDate[1].getFullYear() + '/' + (this.selectDate[1].getMonth() + 1) + '/' + this.selectDate[1].getDate();
			} else {
				$('.date-input').value = this.selectDate[1].getFullYear() + '/' + (this.selectDate[1].getMonth() + 1) + '/' + this.selectDate[1].getDate() + ' - ' +
				this.selectDate[0].getFullYear() + '/' + (this.selectDate[0].getMonth() + 1) + '/' + this.selectDate[0].getDate();
			}
			this.hide();
		}
	}
};



