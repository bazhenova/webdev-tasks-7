'use strict';

var hidden = null;

if ('hidden' in document) {
    hidden = 'hidden';
} else if ('mozHidden' in document) {
    hidden = 'mozHidden';
} else if ('webkitHidden' in document) {
    hidden = 'webkitHidden';
}

if (!hidden) {
    console.warn('Page Visibility is not supported!');
}

initBattery();
function initBattery() {
    if (!navigator.getBattery) {
        console.log('Battery is not supported!');
        var buttonFeed = document.querySelector('.buttons__feed');
        buttons__feed.classList.remove('buttons__feed_hidden');
        return;
    }

    navigator
        .getBattery()
        .then(initBattery);

    function initBattery(battery) {
        battery.addEventListener('chargingchange', function () {
            if (!battery.charging) {
                return;
            }
            var satiety = document.querySelector('.satiety__value');
            var value = parseInt(satiety.textContent, 10);
            setInterval(function () {
                if (!isNaN(value) && value < 100 && !document[hidden]) {
                    satiety.innerHTML = value + 1;
                    value += 1;
                }
            }, 1000);
        });
    }
}
