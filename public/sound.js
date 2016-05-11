'use strict';

var player = document.querySelector('.player');
var volume = document.querySelector('.sound__volume');
var deathLabel = document.querySelector('.death');

setInterval(function () {
    if (deathLabel.classList.contains('death_invisible')) {
    	player.volume = volume.value / 100;
    	player.play();
    }
}, 20000);
