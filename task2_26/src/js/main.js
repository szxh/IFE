
function $(selector) {
    return document.querySelector(selector);
}

//可以接受任意个参数，作为圆的半径，画出参数个数的同心圆
function circle() {
    var canvas =$('#circle');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }
    for (var i = 0; i < arguments.length; i++) {
        var radius = arguments[i];
        ctx.beginPath();
        ctx.arc(320, 320, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        if (i === 0) {
            ctx.fillStyle = '#58FE01';
            ctx.fill();
        } else {
            ctx.strokeStyle = '#58FE01';
            ctx.stroke();
        }
    }
}

circle(25, 80, 140, 200, 260);




//orbit上创建数组存储飞船
var orbit = [],
    loss = 0.3,
    consoleLog = $('.console-log');



//模拟传递介质Mediator
function mediator(command) {
    var random = Math.random();
    if (random < loss) {
        log(command, false);
        return;
    }
    setTimeout(function() {
        for (var i = 0; i < orbit.length; i++) {
            if (orbit[i]) {
                orbit[i].signalReceive(command);
            }
        }
    }, 1000);
    
}




//工具函数，用于在控制台上输出操作结果
function log(command, state) {
    var text = command.order + ' ship' + ' in orbit ' + command.id + '......';
    if (!state) {
        text = 'failed to ' + text;
    }
    var li = document.createElement('li'),
        logs = document.createTextNode(text);
    li.appendChild(logs);
    consoleLog.appendChild(li);
    consoleLog.scrollTop = consoleLog.scrollHeight - consoleLog.offsetHeight;
}




//工具函数，用于完成飞行动画
function start(that, r) {
    that.fly = true;
    var radius = r,
        x = 320 - that.div.offsetWidth / 2 + 1,
        y = 320 - that.div.offsetHeight / 2 + 1;
    that.timer = setInterval(function() {
        that.div.textContent = that.energy;
        if (that.energy > 0 && that.fly) {
            that.deg++;
            if (that.deg % 50 === 0) {
                that.energy < 5 ? that.energy = 0 : that.energy -= that.consume; 
            }
            var a = Math.sin(that.deg * Math.PI / 180) * radius;
            var b = Math.cos(that.deg * Math.PI / 180) * radius;
            that.div.style.left = x + a + 'px';
            that.div.style.top = y - b +'px';
            that.div.style.transform = 'rotate(' + that.deg + 'deg)';
        } else {
            clearInterval(that.timer);
            that.fly = false;
            that.energySystem();
        }
    }, 20);
}


//工具函数，用于暂停飞船的飞行状态
function stop(that) {
    that.fly = false;
    clearInterval(that.timer);
    that.energySystem();
}



//委托事件
var command = $('.commander');
Util.addHandler(command, 'click', commander.send.bind(commander));


