var layer = new floatLayer($('.floatDiv'));
layer.hide();
var btn = $('.show-float');
EventUtil.addHandler(btn, 'click', layer.show.bind(layer));