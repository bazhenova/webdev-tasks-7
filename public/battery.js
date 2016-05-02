'use strict';

initBattery();
function initBattery() {
    if (!navigator.getBattery) {
        console.log('Battery is not supported!');
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
