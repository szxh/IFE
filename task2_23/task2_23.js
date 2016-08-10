var searchWrap = document.getElementsByClassName('search')[0],
	root = document.getElementsByClassName('root')[0],
	searchText = '',
	nodeList = [],
	timer = null,
	currentQueue = null,
	queue = [];
	
EventUtil.addHandler(searchWrap, 'click', render);
	
function render(event) {
	var event = EventUtil.getEvent(event),
		target = EventUtil.getTarget(event);
		searchText = searchWrap.children[2].value;
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
			changeColor();
			break;
		case '广度优先搜索':
			reset();
			traverseBF(root);
			changeColor();
			break;
		default:
			break;
	}
}

function traverseDF(node) {
	if (node) {
		nodeList.push(node);
		for (var i = 0; i < node.children.length; i++) {
			traverseDF(node.children[i]);
		}
	}
}


function traverseBF(node) {
	if (node) {
		//currentQueue.push(node.children);
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

function changeColor() {
	if (searchText === nodeList[0].firstChild.nodeValue) {
		nodeList[0].style.backgroundColor = 'red';
		console.log('hhh');
		return;
	} else {
		nodeList[0].style.backgroundColor = 'blue';
	}
	timer = setTimeout(colorC, 500);
}

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

function reset() {
	nodeList = [];
	num = 0;
	clearTimeout(timer);
	var treeNode = document.getElementsByTagName('div');
	for (var i = 0; i < treeNode.length; i++) {
		treeNode[i].style.backgroundColor = 'white';
	}
}