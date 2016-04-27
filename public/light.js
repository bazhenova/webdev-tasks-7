'use strict';

initLight();
function initLight() {
    if (!'ondevicelight' in window) {
        console.warn('\'ondevicelight\' is not supported!');
        return;
    }
    window.addEventListener('devicelight', function (event) {
        var img = document.querySelector('.img');
        if (event.value < 10) {
            img.style.backgroundImage = 'url(/night.jpg)';
        } else if (event.value > 200) {
            img.style.backgroundImage = 'url(/day.jpg)';
        }
    });    
}
