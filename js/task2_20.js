var myForm = document.getElementsByClassName("form-all")[0],
	queue = document.getElementsByClassName("queue-wrap")[0],
	inputText,
	arr,
	queueChild,
	arrData = [],
	searchText,
	pattern1 = new RegExp('[0-9a-zA-Z\u4e00-\u9fa5]+','g');

EventUtil.addHandler(myForm, 'click', render);
EventUtil.addHandler(queue, 'click', deleteNum);

//给按钮添加click事件，根据不同的值判断所要执行的操作。
function render(event) {
	var event = EventUtil.getEvent(event),
	target = EventUtil.getTarget(event);
	inputText = myForm.childNodes[0].value;
	switch (target.value) {
		case '左侧入':
			if (filter(inputText)) {
				arr = filter(inputText).reverse();
				arrData = arrData.concat(arr);
				insertNode(target.value, arr);
			}
			break;
		case '右侧入':
			arr = filter(inputText);
			arrData = arrData.concat(arr);
			if (arr){
				insertNode(target.value, arr);
			}
			break;
		case '左侧出':
			arrData.shift();
			deleteNode(target.value);
			break;
		case '右侧出':
			arrData.pop();
			deleteNode(target.value);
			break;
		case '查询':
			if (searchText === myForm.childNodes[5].value) {
				return;
			} else {
				searchText = myForm.childNodes[5].value;
				searchMatch(searchText);
			}
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

//输入框中做正则表达式判断，筛选出符合条件的文本。
function filter(text) {
	var arr = text.match(pattern1);
	return arr;
}

//插入节点
function insertNode(pos, arr) {
	var numSpan,numText;
	for (var i = 0; i < arr.length; i++){
		numSpan = document.createElement('span');
		numText = document.createTextNode(arr[i]);
		numSpan.appendChild(numText);
		if (pos === "左侧入") {
			queue.insertBefore(numSpan, queue.firstChild);
		}
		if (pos === "右侧入") {
			queue.appendChild(numSpan);
		}
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


//查询并突出显示
function searchMatch(text) {
	var pattern2 = new RegExp(text, 'g');
	queue.innerHTML = arrData.map(function(item) {
		item = item.replace(pattern2, '<span class="white">' + text + '</span>');
		return '<span>' + item + '</span>';
	}).join('');
}

