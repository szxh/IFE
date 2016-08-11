var searchWrap = $('.search')[0],
	root = $('.root')[0],
	searchText = '',//要搜索的文本
	addText = '',//要添加的文本
	nodeSelected = null,//保存选中的数据
	nodeList = [],//保存渲染所用的数据
	timer = null,//记录超时调用函数返回的id
	currentQueue = null,//广度优先搜索处理的当前节点
	queue = [];//广度优先搜索的队列，通过控制进队出队为currentQueue赋值

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
		case '深度优先遍历':
			reset();
			traverseDF(root);
			changeColor();
			break;
		case '广度优先遍历':
			reset();
			traverseBF(root);
			changeColor();
			break;
		case '深度优先搜索':
			reset();
			traverseDF(root);
			changeColor(searchText);
			break;
		case '广度优先搜索':
			reset();
			traverseBF(root);
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
	if (node) {
		nodeList.push(node);
		for (var i = 0; i < node.children.length; i++) {
			traverseDF(node.children[i]);
		}
	}
}

//广度优先遍历
function traverseBF(node) {
	if (node) {
		queue.push(node);
		currentQueue = queue.shift();
		while(currentQueue) {
			for (var i = 0; i < currentQueue.children.length; i++) {
				queue.push(currentQueue.children[i]);
			}
			nodeList.push(currentQueue);
			currentQueue = queue.shift();
		}
	}
}

//延迟改变背景色
function changeColor(text) {
	console.log(nodeList[0].firstChild.nodeValue);
	if (text) {
		if (searchText === nodeList[0].firstChild.nodeValue) {
			nodeList[0].style.backgroundColor = 'red';
			return;
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
		if (searchText === nodeList[num].firstChild.nodeValue) {
			nodeList[num-1].style.backgroundColor = 'white';
			nodeList[num].style.backgroundColor = 'red';
			return;
		}
		nodeList[num-1].style.backgroundColor = 'white';
		nodeList[num].style.backgroundColor = 'blue';
		timer = setTimeout(colorC, 500);
	} else {
		nodeList[num-1].style.backgroundColor = 'white';
	}
}

//点击按钮后重置数据并取消超时调用
function reset() {
	nodeList = [];
	num = 0;
	clearTimeout(timer);
	searchText = $('input[type=text]')[0].value;
	addText = $('input[type=text]')[1].value;
	var treeNode = document.getElementsByTagName('div');
	for (var i = 0; i < treeNode.length; i++) {
		treeNode[i].style.backgroundColor = 'white';
	}
}

//确定点击选择到的元素
function isSelected(event) {
	reset();
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	if (nodeSelected !== null) {
		nodeSelected.style.backgroundColor = 'white';
	}
	target.style.backgroundColor = 'orange';
	nodeSelected = target;
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
		newNode.className = 'new-node';
		nodeSelected.appendChild(newNode);
	}
}




