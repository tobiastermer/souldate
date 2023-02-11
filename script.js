let timeSelected;
let alarm = new Audio('alarm.mp3');
let timerStarted = false;
let minutes;
let seconds;
let text;
var intervalId;
let currentPlayer;


function setTimer() {
    timeSelected = document.getElementById('sliderTimeSelected').value;
    minutes = timeSelected / 60;
    minutes = Math.floor(minutes);
    seconds = timeSelected % 60;
    seconds = Math.round(seconds);
    seconds = ('0' + seconds).slice(-2);
    if (minutes < 10) {
        text = '0' + minutes + ' : ' + seconds;
    } else {
        text = minutes + ' : ' + seconds;
    }
    fieldTimerSelected.innerHTML = text;


}

function goToTimer() {
    setTimer();
    NamePerson1 = document.getElementById('fieldNamePerson1').value;
    NamePerson2 = document.getElementById('fieldNamePerson2').value;
    localStorage.setItem('storage_timeSelected', timeSelected);
    localStorage.setItem('storage_minutes', minutes);
    localStorage.setItem('storage_seconds', seconds);
    localStorage.setItem('storage_text', text);
    localStorage.setItem('storage_namePerson1', NamePerson1);
    localStorage.setItem('storage_namePerson2', NamePerson2);
    window.location.href = 'timer.html';
    fieldTimer.innerHTML = text;
}

function getTimerAndNames() {
    fieldTimer.innerHTML = localStorage.getItem('storage_text');
    //NamePerson1 = localStorage.getItem('storage_namePerson1');
    //NamePerson2 = localStorage.getItem('storage_namePerson2');
    fieldPersonOnTurn.innerHTML = localStorage.getItem('storage_namePerson1') + " ist dran";
    currentPlayer = 1;
}

function startTimer() {
    //if (!timerStarted) {
        timerStarted = true;
        let timeLeftText = fieldTimer.innerHTML;
        let minutesLeftText = parseInt(timeLeftText.substr(0, 2));
        let secondsLeftText = parseInt(timeLeftText.substr(5, 2));
        let timeLeftInSeconds = minutesLeftText * 60 + secondsLeftText;
        intervalId = setInterval(function () {


            if (timeLeftInSeconds > 0 && timerStarted == true) {
                timeLeftInSeconds = timeLeftInSeconds - 1;
                let minutes = timeLeftInSeconds / 60;
                minutes = Math.floor(minutes);
                let seconds = timeLeftInSeconds % 60;
                seconds = Math.round(seconds);
                seconds = ('0' + seconds).slice(-2);
                if (minutes < 10) {
                    text = '0' + minutes + ' : ' + seconds;
                } else {
                    text = minutes + ' : ' + seconds;
                }
                fieldTimer.innerHTML = text;
            } else if (timeLeftInSeconds <= 0) {
                //fieldTimer.innerHTML = '00 : 00';
                alarm.play();
            }
        }, 1000);
        timerStarted = true;
    //}
}

function interruptTimer() {
    timerStarted = false;
    clearInterval(intervalId);
    alarm.currentTime = 0;
    alarm.pause();
}

function reloadTimer() {
    interruptTimer();
    fieldTimer.innerHTML = localStorage.getItem('storage_text');
}

function nextPlayer() {
    reloadTimer();
    if (currentPlayer == 1) {
        currentPlayer = 2;
        fieldPersonOnTurn.innerHTML = localStorage.getItem('storage_namePerson2') + " ist dran";
    } else {
        currentPlayer = 1;
        fieldPersonOnTurn.innerHTML = localStorage.getItem('storage_namePerson1') + " ist dran";
    }
}

