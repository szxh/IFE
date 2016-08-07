var myForm = document.getElementsByClassName("form-all")[0],
	queue = document.getElementsByClassName("queue-wrap")[0],
	inputText,
	isNumber,
	queueChild,
	pattern1 = new RegExp('^[1-9][0-9]$|^100$');

EventUtil.addHandler(myForm, 'click', numHandle);
EventUtil.addHandler(queue, 'click', deleteNum);

//给按钮添加click事件，根据不同的值判断所要执行的操作。
function numHandle(event) {
	var event = EventUtil.getEvent(event),
	target = EventUtil.getTarget(event);
	inputText = myForm.children[0].value;
	switch (target.value) {
		case '左侧入':
			if (filter(inputText)){
				insertNode(target.value, inputText);
			}
			break;
		case '右侧入':
			if (filter(inputText)){
				insertNode(target.value, inputText);
			}
			break;
		case '左侧出':
			deleteNode(target.value);
			break;
		case '右侧出':
			deleteNode(target.value);
			break;
		case '冒泡排序':
			bubbleSort();
			break;
		case '随机50组':
			randomHeight();
			break;
		default:
			break;
	}
}

//给所有加入的span添加click事件，点击后删除。
function deleteNum(event) {
	var event = EventUtil.getEvent(event),
		target = EventUtil.getTarget(event);
	if (target.nodeName.toLowerCase() === 'span') {
		queue.removeChild(target);
	} else {
		return;
	}
}

//输入框中做正则表达式判断，判断输入的值是否为数字。
function filter(text) {
	isNumber = pattern1.exec(text);
	queueChild = queue.childNodes;
	if (!isNumber) {
		alert('请输入10-100之间的整数');
		return false;
	} else if (queueChild.length === 60) {
		alert('队列元素数量最多为60个');
		return false;
	} else {
		return true;
	}
}

//插入节点
function insertNode(pos, heightValue) {
	var numSpan = document.createElement('span');
	numSpan.style.height = heightValue + '%';
	if (pos === "左侧入") {
		queue.insertBefore(numSpan, queue.firstChild);
	}
	if (pos === "右侧入") {
		queue.appendChild(numSpan);
	}
}

//删除节点
function deleteNode(pos) {
	if (pos === '左侧出') {
		if (!queue.firstChild) {
			return;
		} else {
			queue.removeChild(queue.firstChild);
		}
	}
	if (pos === '右侧出') {
		if (!queue.lastChild) {
			return;
		} else {
			queue.removeChild(queue.lastChild);
		}
	}
}

//冒泡排序
function bubbleSort() {
	
	for (var i = 0; i < queue.childNodes.length-1; i++) {
		for (var j = queue.childNodes.length-1; j > i; j--) {
			if (queue.childNodes[j].style.height.slice(0,-1) < queue.childNodes[j-1].style.height.slice(0,-1)){
				var temp;
				temp = queue.childNodes[j].style.height;
				queue.childNodes[j].style.height = queue.childNodes[j-1].style.height;
				queue.childNodes[j-1].style.height = temp;
			}
		}
	}
}

//交换函数
function swap(a,b) {
	var temp;
	temp = a;
	a = b;
	b = temp;
}

//创建柱高度的数值数组
function createArray() {
	var arr = [];
	for (var i = 0; i < queue.childNodes.length; i++) {
		arr.push(queue.childNodes[i].style.height);
	}
	return arr;
}

//生成50组高度随机的柱
function randomHeight() {
	for (var i = 0; i < 50; i++){
		if (queue.childNodes.length === 60) {
			alert('队列元素数量最多为60个');
			return;
		}
		var randomHeight = Math.floor(Math.random() * 91 + 10);
		insertNode('右侧入', randomHeight);
	}
}
