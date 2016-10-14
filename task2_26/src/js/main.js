//飞船的速度还不确定，需要定一个标准
//在控制台上输出工作日志
//指挥官类需要重构和完善
//mediator的效果还没有模拟


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

var Spaceship = function(id) {
    this.speed = 20;//flying speed
    this.consume = 5; //consume speed of fuel
    this.charge = 2;// charge speed
    this.energy = 100;//percent of energy
    this.fly = false;// the state of spaceship, flying or not
    this.id = id;
    this.div = $('.' + id);
    this.deg = 0;
    this.timer;
};

Spaceship.prototype = {

    dynamSystem: function(id) {
        switch (id) {
            case 'one':
                var radius = 80;
                break;
            case 'two':
                var radius = 140;
                break;
            case 'three':
                var radius = 200;
                break;
            case 'four':
                var radius = 260;
                break;
            default:
                break;
        }
        this.fly = true;
        start(this, radius);
    },

    energySystem: function() {
        var that = this;
        if (that.fly === true || that.energy >= 100) {
            return;
        }
        var timer = setInterval(function() {
            that.energy === 99 ? that.energy = 100 : that.energy += that.charge;
            if (that.energy === 100 || that.fly === true) {
                clearInterval(timer);
            }
            that.div.textContent = that.energy;
        }, 1000);
    },

    signalReceive: function(command) {
        if (this.id !== command.id) {
            return;
        }
        switch(command.order) {
            case 'start':
                if (!this.fly) {
                    this.dynamSystem(command.id);
                }
                break;
            case 'stop':
                if (!this.fly) {
                    return;
                }
                this.fly = false;
                clearInterval(this.timer);
                this.energySystem();
                break;
            case 'destroy':
                this.selfDestroy();
                break;
            default:
                break;
        }
    },

    selfDestroy: function() {
        this.div.parentNode.removeChild(this.div);
        var that = this;
        that = {};
        console.log(that);
    }
};

//委托事件
var command = $('.commander');
Util.addHandler(command, 'click', commander);
var shipOne, 
    shipTwo,
    shipThree,
    shipFour;



var commander = function() {
};

commander.prototype = {
    create: function(number) {
        var ship = document.createElement('div');
        $('.wrapper').appendChild(ship);
        ship.classList.add(number);
        switch (number) {
            case 'one':
                shipOne = new Spaceship(number);
                break;
            case 'two':
                shipTwo = new Spaceship(number);
                break;
            case 'three':
                shipThree = new Spaceship(number);
                break;
            case 'four':
                shipFour = new Spaceship(number);
                break;
            default:
                break;
        }
        var energy = document.createTextNode(shipOne.energy);
        ship.appendChild(energy);
    },
    //发射信号
    transmit: function() {

    }
};


function commander(event) {
    event = Util.getEvent(event);
    var target = Util.getTarget(event);
    var shipNumber = target.parentNode.children[0].textContent;
    var order = target.className;
    var command = {
        id: shipNumber,
        order: order
    };
    if (order === 'create' && !$('.' + shipNumber)) {
        createShip(shipNumber);
    }
    if (shipOne) {
        shipOne.signalReceive(command);
    }
    if (shipTwo) {
        shipTwo.signalReceive(command);
    }
    if (shipThree) {
        shipThree.signalReceive(command);
    }
    if (shipFour) {
        shipFour.signalReceive(command);
    }
}

function createShip(number) {
    var ship = document.createElement('div');
    $('.wrapper').appendChild(ship);
    ship.classList.add(number);
    switch (number) {
        case 'one':
            shipOne = new Spaceship(number);
            break;
        case 'two':
            shipTwo = new Spaceship(number);
            break;
        case 'three':
            shipThree = new Spaceship(number);
            break;
        case 'four':
            shipFour = new Spaceship(number);
            break;
        default:
            break;
    }
    var energy = document.createTextNode(shipOne.energy);
    ship.appendChild(energy);
}



//工具函数，用于完成飞行动画
function start(that, r) {
    var radius = r,
        x = 320 - that.div.offsetWidth / 2 + 1,
        y = 320 - that.div.offsetHeight / 2 + 1;
    that.timer = setInterval(function() {
        console.log(that.energy);
        that.div.textContent = that.energy;
        if (that.energy > 0 && that.fly) {
            that.fly = true;
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


//初始化
function init() {
    circle(25, 80, 140, 200, 260);
}

init();