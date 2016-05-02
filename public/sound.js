'use strict';

createjs.Sound.registerSound({src:'/hryu.mp3', id:'pig'});
var volume = document.querySelector('.sound__volume');

setInterval(function () {
    var value = volume.value / 100;
    createjs.Sound.play('pig').setVolume(value);
}, 15000);
