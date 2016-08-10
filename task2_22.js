
let root = document.getElementsByClassName('root')[0],
	orderWrap = document.getElementsByClassName('order')[0],
	nodeArr = [],
	timer,
	num = 0;
EventUtil.addHandler(orderWrap, 'click', render);

function render(event) {
	var event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	switch(target.value) {
		case 'pre':
			reset();
			preOrderTraverse(root);
			changeColor();
			break;
		case 'in':
			reset();
			inOrderTraverse(root);
			changeColor();
			break;
		case 'post':
			reset();
			postOrderTraverse(root);
			changeColor();
			break;
		default:
			break;
	}
}

function preOrderTraverse(node) {
	if (node) {
		nodeArr.push(node);
		preOrderTraverse(node.children[0]);
		preOrderTraverse(node.children[1]);
	}
}

function inOrderTraverse(node) {
	if (node) {
		inOrderTraverse(node.children[0]);
		nodeArr.push(node);
		inOrderTraverse(node.children[1]);
	}
}

function postOrderTraverse(node) {
	if (node) {
		postOrderTraverse(node.children[0]);
		postOrderTraverse(node.children[1]);
		nodeArr.push(node);
	}
}

function changeColor() {
	nodeArr[0].style.backgroundColor = 'blue';
	timer = setTimeout(colorC, 1000);
}

function colorC() {
	num++;
	if (num < nodeArr.length){
		nodeArr[num-1].style.backgroundColor = 'white';
		nodeArr[num].style.backgroundColor = 'blue';
		timer = setTimeout(colorC, 1000);
	} else {
		nodeArr[num-1].style.backgroundColor = 'white';
	}
}

function reset() {
	nodeArr = [];
	num = 0;
	clearTimeout(timer);
	var treeNode = document.getElementsByTagName('div');
	for (var i = 0; i < treeNode.length; i++) {
		treeNode[i].style.backgroundColor = 'white';
	}
}
