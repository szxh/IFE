import {log} from './log';
import {orbit} from './commander';

//模拟传递介质BUS
function BUS(command) {
    var timer = setInterval(function() {
        var random = Math.random();
        if (random < 0.8) {
            log(command, false);
        } else {
            for (var i = 0; i < orbit.length; i++) {
                if (orbit[i]) {
                    orbit[i].signalReceive(command);
                }
        
            }
            clearInterval(timer);
        }
    }, 300);
}

export {BUS};