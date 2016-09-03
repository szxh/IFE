//点击三角形进行升序或降序排序
//提供接口
//todo:样式与html中的结构需完全解耦，在js中添加样式名和相应结构。

var createTable = function(th, td, sortCol, sortFunc, tableSort,isFixed) {
	this.tableSort = tableSort;
	this.th = th;
	this.td = td;
	this.sortCol = sortCol;
	this.sortFunc = sortFunc;
	this.isFixed = isFixed;
	this.init();
}

createTable.prototype = {
	init: function() {
		EventUtil.addHandler(this.tableSort, 'click', this.sortUD.bind(this));
		if (this.isFixed) {
			EventUtil.addHandler(document, 'scroll', this.fix.bind(this));
		}
		this.render();
	},
	
	render: function() {
		var headHTML = '<tr class="title">' + this.th.map(function(item) {
			if (this.sortCol.indexOf(item) === -1) {
				return '<th>' + item + '</th>';
			} else {
				return '<th>' + item + '<span id="triangle-wrap"><span class="triangle-up"></span><span class="triangle-down"></span></span></th>';
			}
		}).join('') + '</tr>';
		var dataHTML = '';
		for (var i = 0; i < this.td.length; i++) {
			var text = '';
			for (var j = 0; j < this.td[i].length; j++) {
				text += '<td>' + this.td[i][j] + '</td>';
			}
			dataHTML += '<tr>' + text + '</tr>';
		}
		this.tableSort.innerHTML = headHTML + dataHTML;
	},
	
	sortUD: function(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		if (target.classList.contains('triangle-up')) {
			var headValue = target.parentNode.parentNode.firstChild.nodeValue;
			if (this.th.indexOf(headValue) !== -1) {
				var index = this.th.indexOf(headValue);
			}
			if (this.sortFunc === 'default') {
				this.td.sort(function(a, b) {
					return a[index] - b[index];
				});
			} else {
				this.sortFunc(this.td);
			}
			
			this.render();
		}
		if (target.classList.contains('triangle-down')) {
			var headValue = target.parentNode.parentNode.firstChild.nodeValue;
			if (this.th.indexOf(headValue) !== -1) {
				var index = this.th.indexOf(headValue);
			}
			if (this.sortFunc === 'default') {
				this.td.sort(function(a, b) {
					return b[index] - a[index];
				});
			} else {
				this.sortFunc(this.td);
			}
			this.render();
		}
	},
	
	fix: function() {
		function $(selector) {
			return document.querySelector(selector);
		}
		if (this.tableSort.offsetTop < document.body.scrollTop && !$('.title').classList.contains('fixed')) {
			$('.title').classList.add('fixed');
		}
		if (this.tableSort.offsetTop + this.tableSort.offsetHeight < document.body.scrollTop) {
			$('.title').classList.remove('fixed');
		}
		if (this.tableSort.offsetTop > document.body.scrollTop) {
			$('.title').classList.remove('fixed');
		}
	}
}

