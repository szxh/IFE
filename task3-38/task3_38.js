//点击三角形进行升序或降序排序
//提供接口

var table = {
	//配置表格的标题
	th: ['姓名', '语文', '数学', '英语', '总分'],
	
	//配置表格的单元格数据，为二重数组
	td: [
			['小明', '80', '90', '70', '240'],
			['小红', '90', '60', '90', '240'],
			['小亮', '60', '100', '70', '230']
		],
	
	//需要排序序列的标题名
	sortCol: ['语文', '数学', '英语', '总分'],
	
	//排序的方式，可自定义，若无自定义，则使用默认方法。
	//若参数为default，则使用默认排序函数，否则使用自定义排序函数
	sortFunc: 'default'
};

function $(selector) {
	return document.querySelector(selector);
}

var tableSort = $('#table-sort');

EventUtil.addHandler(tableSort, 'click', sortUD);

function sortUD(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	if (target.classList.contains('triangle-up')) {
		var headValue = target.parentNode.firstChild.nodeValue;
		if (table.th.indexOf(headValue) !== -1) {
			var index = table.th.indexOf(headValue);
		}
		for (var i = table.td.length-1; i > 0; i--) {
			for (var j = 0; j < i; j++) {
				if (table.td[j][index] < table.td[j+1][index]) {
					swap(table.td[j],table.td[j+1]);
				}
			}
		}
	}
	if (target.classList.contains('triangle-down')) {
		var headValue = target.parentNode.firstChild.nodeValue;
		if (table.th.indexOf(headValue) !== -1) {
			var index = table.th.indexOf(headValue);
		}
		for (var i = table.td.length-1; i > 0; i--) {
			for (var j = 0; j < i; j++) {
				if (table.td[j][index] > table.td[j+1][index]) {
					swap(table.td[j],table.td[j+1]);
				}
			}
		}
	}
	render();
}

function swap(a, b) {
	var temp;
	temp = a;
	a = b;
	b = temp;
}

//确定需要排序的列，给其标题加上排序符号
function render() {
	var headHTML = '<tr>' + table.th.map(function(item,index) {
		return '<th>' + item + '</th>';
	}).join('') + '</tr>';
	var dataHTML;
	for (var i = 0; i < table.td.length; i++) {
		for (var j = 0; j < table.td[i].length; j++) {
			var text = '<td>' + table.td[i][j] + '</td>';
		}
		dataHTML = '<tr>' + text + '</tr>';
	}
	tableSort.innerHTML = headHTML + dataHTML;
}

render();
