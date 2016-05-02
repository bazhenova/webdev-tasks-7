'use strict';

var energy = document.querySelector('.energy__value');
var deathLabel = document.querySelector('.death');
var battery = navigator.getBattery();

initVisibility();
function initVisibility() {
    var hidden = null;
    var visibilityState = null;
    var visibilityChange = null;

    if ('hidden' in document) {
        hidden = 'hidden';
        visibilityState = 'visibilityState';
        visibilityChange = 'visibilitychange';
    } else if ('mozHidden' in document) {
        hidden = 'mozHidden';
        visibilityState = 'mozVisibilityState';
        visibilityChange = 'mozvisibilitychange';
    } else if ('webkitHidden' in document) {
        hidden = 'webkitHidden';
        visibilityState = 'webkitVisibilityState';
        visibilityChange = 'webkitvisibilitychange';
    }

    if (!hidden) {
        console.warn('Page Visibility is not supported!');
        return;
    }
    
    document.addEventListener(visibilityChange, function () {
        if (!document[hidden]) {
            return;
        }
        
        var value = parseInt(energy.textContent, 10);
        setInterval(function () {
            var deathClassList = Array.prototype.slice.call(deathLabel.classList);
            if (deathClassList.indexOf('death_invisible') !== -1) {
                if (!isNaN(value) && value < 100 && document[hidden]) {
                    energy.innerHTML = value + 1;
                    value += 1;
                }
            }
        }, 1000);
    });
}