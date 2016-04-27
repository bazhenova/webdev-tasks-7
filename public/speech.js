'use strict';

initSpeech();
function initSpeech() {
    window.SpeechRecognition = window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!window.SpeechRecognition) {
        console.warn('Speech Recognition is not supported!');

        return;
    }

    var speech = document.querySelector('.buttons__speech');
    var speechLabel = document.querySelector('.speech__label');
    var text = document.querySelector('.text');
    var mood = document.querySelector('.mood__value');
    
    var recognizer = new window.SpeechRecognition();

    recognizer.lang = 'en-US';
    recognizer.continuous = true;

    speech.onclick = function () {
        recognizer.start();
        speechLabel.classList.remove('speech__label_invisible');
        text.innerHTML = '';
        text.classList.remove('text_invisible');
        var value = parseInt(mood.textContent, 10);

        setInterval(function () {
            var deathLabel = document.querySelector('.death');
            var classList = Array.prototype.slice.call(deathLabel.classList);
            var death = classList.indexOf('death_invisible') === -1;
            if (!isNaN(value) && value < 100 && !death) {
                mood.innerHTML = value + 1;
                value += 1;
            } else {
                recognizer.stop();
                speechLabel.classList.add('speech__label_invisible');
                text.classList.add('text_invisible');
            }
        }, 1000);
    };

    recognizer.onresult = function (e) {
        var index = e.resultIndex;
        var result = e.results[index][0].transcript.trim();
        text.innerHTML = result;
        
        var value = parseInt(mood.textContent, 10);

        if (!isNaN(value) && value > 99) {
            recognizer.stop();
            speechLabel.classList.add('speech__label_invisible');
            text.classList.add('text_invisible');
        }
    }
}
