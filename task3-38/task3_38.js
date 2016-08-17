//点击三角形进行升序或降序排序
//提供接口

var table = {
	//配置表格的标题
	th: ['姓名', '语文', '数学', '英语', '总分'],
	
	//配置表格的单元格数据，为二重数组
	td: [
			['小明', '820', '97', '744', '2487'],
			['小红', '904', '625', '978', '2414'],
			['小亮', '632', '114', '72024', '234'],
			['小蛤', '110', '150', '301', '101'],
			['小哈', '11', '1450', '31', '1'],
			['小明', '820', '97', '744', '2487'],
			['小红', '904', '625', '978', '2414'],
			['小亮', '632', '114', '72024', '234'],
			['小蛤', '110', '150', '301', '101'],
			['小哈', '11', '1450', '31', '1'],
			['小明', '820', '97', '744', '2487'],
			['小红', '904', '625', '978', '2414'],
			['小亮', '632', '114', '72024', '234'],
			['小蛤', '110', '150', '301', '101'],
			['小哈', '11', '1450', '31', '1'],
			['小明', '820', '97', '744', '2487'],
			['小红', '904', '625', '978', '2414'],
			['小亮', '632', '114', '72024', '234'],
			['小蛤', '110', '150', '301', '101'],
			['小哈', '11', '1450', '31', '1']
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
EventUtil.addHandler(document, 'scroll', fix);

//排序
function sortUD(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	if (target.classList.contains('triangle-up')) {
		var headValue = target.parentNode.parentNode.firstChild.nodeValue;
		if (table.th.indexOf(headValue) !== -1) {
			var index = table.th.indexOf(headValue);
		}
		table.td.sort(function(a, b) {
			return a[index] - b[index];
		});
		render();
	}
	if (target.classList.contains('triangle-down')) {
		var headValue = target.parentNode.parentNode.firstChild.nodeValue;
		if (table.th.indexOf(headValue) !== -1) {
			var index = table.th.indexOf(headValue);
		}
		table.td.sort(function(a, b) {
			return b[index] - a[index];
		});
		render();
	}
}

//确定需要排序的列，给其标题加上排序符号
function render() {
	var headHTML = '<tr class="title">' + table.th.map(function(item) {
		if (table.sortCol.indexOf(item) === -1) {
			return '<th>' + item + '</th>';
		} else {
			return '<th>' + item + '<span id="triangle-wrap"><span class="triangle-up"></span><span class="triangle-down"></span></span></th>';
		}
	}).join('') + '</tr>';
	var dataHTML = '';
	for (var i = 0; i < table.td.length; i++) {
		var text = '';
		for (var j = 0; j < table.td[i].length; j++) {
			text += '<td>' + table.td[i][j] + '</td>';
		}
		dataHTML += '<tr>' + text + '</tr>';
	}
	tableSort.innerHTML = headHTML + dataHTML;
}

render();

function fix() {
	console.log(document.body.scrollTop, tableSort.offsetTop);
	if (tableSort.offsetTop < document.body.scrollTop && !$('.title').classList.contains('fixed')) {
		$('.title').classList.add('fixed');
	}
	if (tableSort.offsetTop + tableSort.offsetHeight < document.body.scrollTop) {
		$('.title').classList.remove('fixed');
	}
	if (tableSort.offsetTop > document.body.scrollTop) {
		$('.title').classList.remove('fixed');
	}
}
