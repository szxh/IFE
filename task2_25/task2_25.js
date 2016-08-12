var searchWrap = $('.search')[0],
	root = $('.root')[0],
	searchText = '',//要搜索的文本
	addText = '',//要添加的文本
	nodeSelected = null,//保存选中的数据
	nodeList = [],//保存渲染所用的数据
	timer = null,//记录超时调用函数返回的id
	currentQueue = null,//广度优先搜索处理的当前节点
	queue = [];//广度优先搜索的队列，通过控制进队出队为currentQueue赋值
	
	
	var divs = $('div');
	//给页面添加加减号。。。放在html里面太丑了
	//同时隐藏内部页面结构
	for (var i = 0; i < divs.length; i++) {
		if (i > 0) {
			divs[i].classList.add('hide');
		}
		var plus = document.createElement('span');
		var textPlus = document.createTextNode('+');
		plus.appendChild(textPlus);
		
		var minus = document.createElement('span');
		var textMinus = document.createTextNode('-');
		minus.appendChild(textMinus);
		minus.classList.add('hide');
		divs[i].insertBefore(minus, divs[i].firstChild);
		divs[i].insertBefore(plus, divs[i].firstChild);
	}
	
	
//自制$选择器
function $(selector) {
	return document.querySelectorAll(selector);
}

//事件委托
EventUtil.addHandler(searchWrap, 'click', render);
EventUtil.addHandler(root, 'click', isSelected);

//渲染
function render(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	switch(target.value) {
		case '搜索':
			reset();
			traverseDF(root);
			changeColor(searchText);
			break;
		case '删除':
			reset();
			removeNode();
			break;
		case '添加':
			reset();
			addNode();
			break;
		default:
			break;
	}
}

//深度优先遍历
function traverseDF(node) {
	if (node && node.nodeName.toLowerCase() === 'div') {
		nodeList.push(node);
		for (var i = 0; i < node.children.length; i++) {
			traverseDF(node.children[i]);
		}
	}
}

//延迟改变背景色
function changeColor(text) {
	console.log(nodeList[1].childNodes[2].nodeValue);
	if (text) {
		if (searchText === nodeList[0].childNodes[2].nodeValue) {
			nodeList[0].style.backgroundColor = 'red';
		} else {
			nodeList[0].style.backgroundColor = 'blue';
		}
	} else {
		nodeList[0].style.backgroundColor = 'blue';
	}
	timer = setTimeout(colorC, 500);
}

//延迟函数所调用的函数
function colorC() {
	num++;
	if (num < nodeList.length){
		if (searchText === nodeList[num].childNodes[2].nodeValue) {
			nodeList[num-1].style.backgroundColor = 'white';
			nodeList[num].style.backgroundColor = 'red';
			show(nodeList[num].parentNode);
		} else {
			if (nodeList[num-1].style.backgroundColor === 'red') {
				nodeList[num].style.backgroundColor = 'blue';
			} else {
				nodeList[num-1].style.backgroundColor = 'white';
				nodeList[num].style.backgroundColor = 'blue';
			}
		}
		timer = setTimeout(colorC, 500);
	} else {
		nodeList[num-1].style.backgroundColor = 'white';
	}
}

//通过递归解决搜索项自动展开需求
function show(node) {
	if(node.nodeName.toLowerCase() == 'div') {
		for (var i = 0; i < nodeList[num].parentNode.children.length; i++) {
			if (node.children[i].nodeName.toLowerCase() !== 'span') {
				node.children[i].classList.remove('hide');
			}
		}
	show(node.parentNode);
	}
}

//点击按钮后重置数据并取消超时调用
function reset() {
	nodeList = [];
	num = 0;
	clearTimeout(timer);
	searchText = $('input[type=text]')[0].value;
	addText = $('input[type=text]')[1].value;
	var treeNode = $('div');
	for (var i = 0; i < treeNode.length; i++) {
		treeNode[i].style.backgroundColor = 'white';
	}
}

//确定点击选择到的元素
function isSelected(event) {
	reset();
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	switch(target.nodeName.toLowerCase()) {
		case 'div':
			if (nodeSelected !== null) {
				nodeSelected.style.backgroundColor = 'white';
			}
			target.style.backgroundColor = 'orange';
			nodeSelected = target;
			break;
		case 'span':
			toggleClass(target);
			break;
		default:
			break;
	}
}

//删除选中节点
function removeNode() {
	if (nodeSelected) {
		nodeSelected.parentNode.removeChild(nodeSelected);
	}
}

//添加节点
function addNode() {
	if (addText) {
		console.log('hh');
		var newNode = document.createElement('div');
		var newText = document.createTextNode(addText);
		newNode.appendChild(newText);
		newNode.classList.add('new-node');
		//添加 加减号
		var plus = document.createElement('span');
		var textPlus = document.createTextNode('+');
		plus.appendChild(textPlus);
		var minus = document.createElement('span');
		var textMinus = document.createTextNode('-');
		minus.appendChild(textMinus);
		minus.classList.add('hide');
		newNode.insertBefore(minus, newNode.firstChild);
		newNode.insertBefore(plus, newNode.firstChild);
		
		nodeSelected.appendChild(newNode);
	}
}

//切换隐藏和展示状态，可以改进
function toggleClass(node) {
	if (node.parentNode.children.length > 2) {
		for (var i = 0; i < node.parentNode.children.length; i++) {
			node.parentNode.children[i].classList.toggle('hide');
		}
	}
}

