function $(selector) {
    return document.querySelector(selector);
}

function circle(radius) {
    var canvas =$('#circle');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }
    ctx.beginPath();
    ctx.arc(350, 320, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.strokeStyle = 'green';
    ctx.stroke();
}

function init() {
    circle(100);
    circle(200);
    circle(300);
}

init();