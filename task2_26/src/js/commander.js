import {spaceship} from './spaceship';
import {util} from './util';
import {log} from './log';
import {BUS} from './BUS';

let orbit = [];

var commander = {
    
    create: function(number) {
        var ship = document.createElement('div');
        util.$('.wrapper').appendChild(ship);
        ship.classList.add(number);
        switch (number) {
            case 'one':
                orbit[0] = new spaceship(number);
                break;
            case 'two':
                orbit[1] = new spaceship(number);
                break;
            case 'three':
                orbit[2] = new spaceship(number);
                break;
            case 'four':
                orbit[3] = new spaceship(number);
                break;
            default:
                break;
        }
        var energy = document.createTextNode('100');
        ship.appendChild(energy);
    },
    
    send: function(event) {
        event = util.getEvent(event);
        var target = util.getTarget(event),
            shipNumber = target.parentNode.children[0].textContent,
            order = target.className,
            command = {
                id: shipNumber,
                order: order
            };
        if (order === 'create' && !util.$('.' + shipNumber)) {
            this.create(shipNumber);
            log(command, true);
            return;
        }
        if (order !== 'create') {
            BUS(command);
        }
    }
};

export {commander, orbit};