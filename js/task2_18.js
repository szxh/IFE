var myForm = document.getElementsByClassName("form-all")[0],
	queue = document.getElementsByClassName("queue-wrap")[0],
	inputText = '',
	pattern1 = new RegExp('^[0-9]+$');

EventUtil.addHandler(myForm, 'click', numHandle);
EventUtil.addHandler(queue, 'click', deleteNum);

//给按钮添加click事件，根据不同的值判断所要执行的操作。
function numHandle(event) {
	var event = EventUtil.getEvent(event),
	target = EventUtil.getTarget(event);
	switch (target.value) {
		case '左侧入':
			inputText = myForm.children[0].value;
			//输入框中做正则表达式判断，判断输入的值是否为数字。
			if (!pattern1.test(inputText)) {
				alert('请输入纯数字');		
				return;
			}
			var numSpan = document.createElement('span'),
				numText = document.createTextNode(inputText);
			numSpan.appendChild(numText);
			queue.insertBefore(numSpan, queue.firstChild);
			break;
			
		case '右侧入':
			inputText = myForm.children[0].value;
			if (!pattern1.test(inputText)) {
				alert('请输入纯数字');		
				return;
			}
			var numSpan = document.createElement('span'),
			numText = document.createTextNode(inputText);
			numSpan.appendChild(numText);
			queue.appendChild(numSpan);
			break;
			
		case '左侧出':
			if (!queue.firstChild) {
				return;
			} else {
				queue.removeChild(queue.firstChild);
			}
			break;
			
		case '右侧出':
			if (!queue.lastChild) {
				return;
			} else {
				queue.removeChild(queue.lastChild);
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


