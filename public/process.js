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
        return;
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
    var satietyValue = parseInt(satiety.textContent, 10);
    if (!isNaN(satietyValue) && satietyValue > 0 && !death) {
        satiety.innerHTML = satietyValue - 1;
        satietyValue -= 1;
    }

    var energyValue = parseInt(energy.textContent, 10);
    if (!isNaN(energyValue) && energyValue > 0 && !death) {
        energy.innerHTML = energyValue - 1;
        energyValue -= 1;
    }

    var moodValue = parseInt(mood.textContent, 10);
    if (!isNaN(moodValue) && moodValue > 0 && !death) {
        mood.innerHTML = moodValue - 1;
        moodValue -= 1;
    }
    if ([satietyValue, energyValue, moodValue].filter(function (elem) {
        return elem;
    }).length < 2) {
        deathLabel.classList.remove('death_invisible');
        pig.classList.add('pig_invisible');
        img.style.backgroundImage = 'url(death.jpeg)';
        death = true;
    }
}, 5000);
