var tagWrap = document.getElementsByClassName("queueTag")[0],
	hobbyWrap = document.getElementsByClassName("queueHobby")[0],
	btn = document.getElementsByClassName("btn")[0],
	tagInput = document.getElementsByClassName("tagInput")[0],
	hobbyInput = document.getElementsByTagName("textarea")[0];
	

var createWrap = (function(){
	function tagObj(wrap) {
		this.wrap = wrap;
		this.data = {};
	}
	
	tagObj.prototype = {
		
		add: function(num) {
			var numSpan,numText;
			if (this.wrap.childNodes.length == 10){
				this.wrap.removeChild(this.wrap.firstChild);
			}
			numSpan = document.createElement('span');
			numText = document.createTextNode(num);
			numSpan.appendChild(numText);
			this.wrap.appendChild(numSpan);
		},
		
		deleteSth: function(event) {
			var event = EventUtil.getEvent(event),
				target = EventUtil.getTarget(event);
			if (target.nodeName.toLowerCase() === 'span') {
				if (target.parentNode.className.toLowerCase() === 'queuehobby') {
					hobby.data[target.textContent.replace(/点击删除/g, '')] = false;
				} else {
					tag.data[target.textContent.replace(/点击删除/g, '')] = false;
				}
				target.parentNode.removeChild(target);
			}
		},
		
		outStyle: function(event) {
			var event = EventUtil.getEvent(event),
				target = EventUtil.getTarget(event);
			if (target.nodeName.toLowerCase() === 'span') {
				target.textContent = target.textContent.replace(/点击删除/g, '');
				target.style.backgroundColor = 'red';
				target.style.color = 'black';
			}
		},
		
		overStyle: function(event) {
			var event = EventUtil.getEvent(event),
				target = EventUtil.getTarget(event);
			if (target.nodeName.toLowerCase() === 'span') {
				target.textContent = '点击删除' + target.firstChild.nodeValue;
				target.style.backgroundColor = 'blue';
				target.style.color = 'white';
			}
		}
	};
	
	return tagObj;
})();

var tag = new createWrap(tagWrap),
	hobby = new createWrap(hobbyWrap);
	
EventUtil.addHandler(tagWrap, 'click', tag.deleteSth);
EventUtil.addHandler(tagWrap, 'mouseover', tag.overStyle);
EventUtil.addHandler(tagWrap, 'mouseout', tag.outStyle);
EventUtil.addHandler(hobbyWrap, 'click', hobby.deleteSth);
EventUtil.addHandler(hobbyWrap, 'mouseover', hobby.overStyle);
EventUtil.addHandler(hobbyWrap, 'mouseout', hobby.outStyle);
EventUtil.addHandler(btn, 'click', renderHobby);
EventUtil.addHandler(tagInput, 'keyup', renderTag);

function renderTag(event) {
	var inputText = tagInput.value,
		event = EventUtil.getEvent(event),
		charCode = event.keyCode;
	if ((charCode === 32 || charCode === 188) && (new RegExp('[, ， ]$', 'g').test(inputText))){
		if (!tag.data[inputText.slice(0, -1)] && !!inputText) {
			tag.data[inputText.slice(0, -1).trim()] = true;
			tag.add(inputText.slice(0, -1).trim());
			tagInput.value = '';
		} else {
			tagInput.value = '';
		}
	}
	if (charCode === 13) {
		if (!tag.data[inputText] && !!inputText) {
			tag.data[inputText] = true;
			tag.add(inputText.trim());
			tagInput.value = '';
		} else {
			tagInput.value = '';
		}
	}
}

function renderHobby() {
	var inputText = hobbyInput.value,
		pattern = new RegExp('[^,、，  \r\n\s]+', 'gm'),
		arr = inputText.match(pattern);
	for (var i = 0; i < arr.length; i++) {
		if (!hobby.data[arr[i]] && !!arr[i]) {
			hobby.data[arr[i]] = true;
			hobby.add(arr[i]);
		}
	}
}





