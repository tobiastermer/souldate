let timeSelected;
let alarm = new Audio('alarm.mp3');
let timerStarted = false;
let text;
let NamePerson1 = document.getElementById('fieldNamePerson1').value;
let NamePerson2 = document.getElementById('fieldNamePerson2').value;

function selectTimer() {
    let timeSelected = document.getElementById('sliderTimeSelected').value;
    let minutes = timeSelected / 60;
    minutes = Math.floor(minutes);
    let seconds = timeSelected % 60;
    seconds = Math.round(seconds);
    seconds = ('0' + seconds).slice(-2);
    if (minutes < 10) {
        text = '0' + minutes + ' : ' + seconds;
    } else {
        text = minutes + ' : ' + seconds;
    }
    fieldTimerSelected.innerHTML = text;
}

function startTimer() {
    if (!timerStarted) {
        let startTime = new Date().getTime();
        let fiveMinutes = 1000;
        let endTime = startTime + fiveMinutes;


        setInterval(function () {
            let timeLeft = endTime - new Date().getTime();


            if (timeLeft > 0) {
                let minutes = timeLeft / (1000 * 60);
                minutes = Math.floor(minutes);
                let seconds = (timeLeft / 1000) % 60;
                seconds = Math.round(seconds);
                seconds = ('0' + seconds).slice(-2);
                if (minutes < 10) {
                    let text = '0' + minutes + ' : ' + seconds;
                } else {
                    let text = minutes + ' : ' + seconds;
                }
                timer.innerHTML = text;
            } else {
                alarm.play();
                timer.innerHTML = '00 : 00';
            }
        }, 1000);
        timerStarted = true;
    }
}