import {util} from './util';
import {log} from './log';
import {start, stop} from './main';


//飞船类
var spaceship = function(id) {
    this.speed = 20;//flying speed
    this.consume = 5; //consume speed of fuel
    this.charge = 2;// charge speed
    this.energy = 100;//percent of energy
    this.fly = false;// the state of spaceship, flying or not
    this.id = id;//only identifier of spaceship
    this.div = util.$('.' + id);//dom structure in html
    this.deg = 0;//the flying deg of spaceship
    this.timer;
};

spaceship.prototype = {

    dynamSystem: function(command) {
        var radius;
        switch (command.id) {
            case 'one':
                radius = 80;
                break;
            case 'two':
                radius = 140;
                break;
            case 'three':
                radius = 200;
                break;
            case 'four':
                radius = 260;
                break;
            default:
                break;
        }
        if (!this.fly && command.order === 'start') {
            start(this, radius);
        } else if (this.fly && command.order === 'stop'){
            stop(this);
        }
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
        log(command, true);
        console.log('hhh');
        switch(command.order) {
            case 'start':
                this.dynamSystem(command);
                break;
            case 'stop':
                this.dynamSystem(command);
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
    }
};

export {spaceship};