'use strict';

var satiety = document.querySelector('.satiety__value');
var energy = document.querySelector('.energy__value');
var mood = document.querySelector('.mood__value');
var deathLabel = document.querySelector('.death');
var pig = document.querySelector('.pig');
var img = document.querySelector('.img');
var death = false;

if (!localStorage in window) {
    console.log('localStorage is not supported!');
} else {
    if (localStorage.satiety) {
        satiety.innerHTML = localStorage.satiety;
    }
    if (localStorage.energy) {
        energy.innerHTML = localStorage.energy;
    }
    if (localStorage.mood) {
        mood.innerHTML = localStorage.mood;
    }
}

window.onbeforeunload = function() {
    if (!localStorage in window) {
        console.log('localStorage is not supported!');
    } else {
        localStorage.satiety = satiety.textContent;
        localStorage.energy = energy.textContent;
        localStorage.mood = mood.textContent;
    }
};

document.addEventListener('click', function(event) {
    var targetClassList = Array.prototype.slice.call(event.target.classList);
    if (targetClassList.indexOf('buttons__feed') !== -1 && !death) {
        var value = parseInt(satiety.textContent, 10);
        if (!isNaN(value)) {
            if (value <= 90) {
                satiety.innerHTML = value + 10;
            } else {
                satiety.innerHTML = 100;
            }
        }
    }

    if (targetClassList.indexOf('buttons__start') !== -1) {
        localStorage.removeItem('satiety');
        localStorage.removeItem('energy');
        localStorage.removeItem('mood');
        deathLabel.classList.add('death_invisible');
        pig.classList.remove('pig_invisible');
        img.style.backgroundImage = 'url(day.jpg)';
        satiety.innerHTML = 100;
        energy.innerHTML = 100;
        mood.innerHTML = 100;
        death = false;
    }
});

setInterval(function () {
    var value1 = parseInt(satiety.textContent, 10);
    if (!isNaN(value1) && value1 > 0 && !death) {
        satiety.innerHTML = value1 - 1;
        value1 -= 1;
    }

    var value2 = parseInt(energy.textContent, 10);
    if (!isNaN(value2) && value2 > 0 && !death) {
        energy.innerHTML = value2 - 1;
        value2 -= 2;
    }

    var value3 = parseInt(mood.textContent, 10);
    if (!isNaN(value3) && value3 > 0 && !death) {
        mood.innerHTML = value3 - 1;
        value3 -= 1;
    }

    if (value1 === 0 && value2 === 0 ||
        value1 === 0 && value3 === 0 ||
        value2 === 0 && value3 === 0) {
        deathLabel.classList.remove('death_invisible');
        pig.classList.add('pig_invisible');
        img.style.backgroundImage = 'url(death.jpeg)';
        death = true;
    }
}, 5000);
