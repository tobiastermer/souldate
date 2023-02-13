let timeSelected;
let alarm = new Audio('alarm.mp3');
let timerStarted = false;
let minutes;
let seconds;
let text;
var intervalId;
let currentPlayer;
let roundCounter;

const questionsFreierModus = ["Spreche darüber, was dir auf dem Herzen liegt. Wenn du nichts mehr zu sagen hast, schaue deinem Gegenüber in die Augen und genieße."]

const questionsGefuehle = ["Wie fühlst du dich gerade allgemein?",
    "Wie fühlst du dich gerade in Bezug auf deine Partnerschaft?",
    "Was begeistert dich in deinem Leben zurzeit am meisten?",
    "Was sind momentan deine primär dominanten LebensGefühle?",
    "In welchen Situationen entstehen negative Gefühle in dir und wie kannst du damit umgehen?"];

const questionsPartnerschaft = ["Was bedeutet Partnerschaft für dich?",
    "Wie geht es dir aktuell mit unserer Partnerschaft?",
    "Was magst du besoners gerne an deiner Partnerin / deinem Partner?",
    "Wofür bist du in unserer Partnerschaft alles dankbar?",
    "Was glaubst du, ist unsere größte gemeinsame Stärke? Und was ist unsere größte gemeinsame Schwäche?",
    "Welche neue Gewohnheit oder welches Erlebnis würdest du gerne in deiner Partnerschaft integrieren bzw. erleben?"];

const questionsSexualitaet = ["Wie zufrieden bist du mit deiner Sexualität?",
    "Was findest du an deiner Partnerin / deinem Partner besonders erotisch?",
    "Was sind deine sexuellen Wünsche und Träume? Was möchtest du ausprobieren?"];

const questionsKinder = ["Wie stellst du dir dein späteres Familienleben vor?",
    "Wie stellst du dir dich als idealen Vater bzw. als ideale Mutter vor?"];

const questionsZusammenleben = ["Wie sieht dein idealer Tag aus?",
    "Wie stellst du dir das optimale Zusammenleben mit deiner Partnerin / deinem Partner vor?",
    "Wie zufrieden bist Du mit deiner aktuellen Wohnsituation und was möchtest du ggf. ändern?"];

const questionsPersoenlichesWachstum = ["Was siehst du in deiner Partnerin / deinem Partner, was er/sie nicht sieht?",
    "In welchen Bereichen nimmst du seine/ihre anderen Sichtweisen als Bereicherung wahr?",
    "Wo fällt es dir schwer, seine/ihre Sicht der Dinge zu teilen? Wie könnt ihr trotzdem einen gemeinsamen Weg finden?",
    "Was war dein wichtigstes Learning in der vergangenen Zeit?",
    "Wo willst du in einem Jahr / in drei Jahren stehen?",
    "Was ist die eine Sache, die du jetzt tun kannst, um deine Vision umzusetzen?",
    "Was sind im Moment deine drei größten Probleme? Was sind die drei besten Lösungen für jedes dieser Probleme?",
    "Wo verbleibst du zurzeit in deiner Komfortzone und wie kannst du dem begegnen?"];

const questionsGemischterModus = questionsGefuehle.concat(questionsPartnerschaft, questionsSexualitaet, questionsKinder, questionsZusammenleben, questionsPersoenlichesWachstum);


var questionsCategorySelected = [];

function saveQuestionsAndGoToNamesAndLength(category) {
    localStorage.setItem('storage_categorySelected', category);
    window.location.href = 'namesandlength.html';
}

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
    //localStorage.setItem('storage_minutes', minutes);
    //localStorage.setItem('storage_seconds', seconds);
    localStorage.setItem('storage_text', text);
    localStorage.setItem('storage_namePerson1', NamePerson1);
    localStorage.setItem('storage_namePerson2', NamePerson2);
    window.location.href = 'timer.html';
    fieldTimer.innerHTML = text;
}

function getNamesAndLength() {

    if (localStorage.getItem('storage_namePerson1') != "") {
        document.getElementById("fieldNamePerson1").value = localStorage.getItem('storage_namePerson1');
        document.getElementById("fieldNamePerson2").value = localStorage.getItem('storage_namePerson2');
        document.getElementById("sliderTimeSelected").value = localStorage.getItem('storage_timeSelected');
        setTimer();
    }
}

function getTimerAndNames() {
    fieldTimer.innerHTML = localStorage.getItem('storage_text');
    fieldPersonOnTurn.innerHTML = localStorage.getItem('storage_namePerson1') + " ist dran";
    currentPlayer = 1;
    selectedCategory = localStorage.getItem('storage_categorySelected');
    selectedCategoryUmlaut = selectedCategory;

    if (selectedCategory == "Freier Modus") {
        questionsCategorySelected = questionsFreierModus.slice();
    } else if (selectedCategory == "Gemischter Modus") {
        questionsCategorySelected = questionsGemischterModus.slice();
    } else if (selectedCategory == "Gefühle") {
        questionsCategorySelected = questionsGefuehle.slice();
        selectedCategoryUmlaut = "Gefuehle";
    } else if (selectedCategory == "Partnerschaft") {
        questionsCategorySelected = questionsPartnerschaft.slice();
    } else if (selectedCategory == "Sexualität") {
        questionsCategorySelected = questionsSexualitaet.slice();
        selectedCategoryUmlaut = "Sexualitaet";
    } else if (selectedCategory == "Kinder") {
        questionsCategorySelected = questionsKinder.slice();
    } else if (selectedCategory == "Zusammenleben") {
        questionsCategorySelected = questionsZusammenleben.slice();
    } else if (selectedCategory == "Persönliches Wachstum") {
        questionsCategorySelected = questionsPersoenlichesWachstum.slice();
        selectedCategoryUmlaut = "Persoenliches Wachstum";
    }

    getQuestion();
    fieldSelectedCategory.innerHTML = "<img class='listPictures' src='img/" + selectedCategoryUmlaut + ".jpg'>" + selectedCategory;
    roundCounter = 1;
    fieldRoundCounter.innerHMTL = "Runde " + roundCounter;
}

function startTimer() {
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
            //alarm.play();
        }
    }, 1000);
    timerStarted = true;
}

function interruptTimer() {
    timerStarted = false;
    clearInterval(intervalId);
    //alarm.currentTime = 0;
    //alarm.pause();
}

function reloadQuestion() {
    getQuestion();
}

function nextPlayer() {
    interruptTimer();
    fieldTimer.innerHTML = localStorage.getItem('storage_text');
    if (currentPlayer == 1) {
        currentPlayer = 2;
        fieldPersonOnTurn.innerHTML = localStorage.getItem('storage_namePerson2') + " ist dran";
    } else {
        currentPlayer = 1;
        fieldPersonOnTurn.innerHTML = localStorage.getItem('storage_namePerson1') + " ist dran";
        getQuestion();
        roundCounter = roundCounter + 1;
        fieldRoundCounter.innerHTML = "Runde " + roundCounter;
    }
}

function getQuestion() {
    let obj_keys = Object.keys(questionsCategorySelected);
    randomQuestion = obj_keys[Math.floor(Math.random() * obj_keys.length)];
    fieldQuestion.innerHTML = `${questionsCategorySelected[randomQuestion]}`
}

