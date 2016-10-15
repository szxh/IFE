var commander = {
    
    create: function(number) {
        var ship = document.createElement('div');
        $('.wrapper').appendChild(ship);
        ship.classList.add(number);
        switch (number) {
            case 'one':
                orbit[0] = new Spaceship(number);
                break;
            case 'two':
                orbit[1] = new Spaceship(number);
                break;
            case 'three':
                orbit[2] = new Spaceship(number);
                break;
            case 'four':
                orbit[3] = new Spaceship(number);
                break;
            default:
                break;
        }
        var energy = document.createTextNode('100');
        ship.appendChild(energy);
    },
    
    send: function(event) {
        event = Util.getEvent(event);
        var target = Util.getTarget(event),
            shipNumber = target.parentNode.children[0].textContent,
            order = target.className,
            command = {
                id: shipNumber,
                order: order
            };
        if (order === 'create' && !$('.' + shipNumber)) {
            this.create(shipNumber);
            log(command, true);
            return;
        }
        mediator(command);
    }
};