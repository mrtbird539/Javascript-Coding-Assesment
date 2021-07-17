let timer = $("#time");
let finalScore = $("#final-score")
const questionBlock = $("#intro");
const startBtn = $("#start-quiz");
const question1 = $("#1");
const question2 = $("#2");
const question3 = $("#3");
const question4 = $("#4");
const question5 = $("#5");
const quizEnd = $("#quiz-end");
const correctAnswer = $(".correct");
const container = $("container");
const button = $(".btn");
let timeLeft = 75;
let userInfo = [{name: "",score: 0}];
let questions = [question1, question2, question3, question4, question5];
questionIndex = 0
let timeInterval;
//Sets page init
function init() {
    question1.hide();
    question2.hide();
    question3.hide();
    question4.hide();
    question5.hide();
    quizEnd.hide();
}

function isQuizOver() {
    if (questionIndex < (questions.length - 1)) {
        questionIndex++;
        questions[questionIndex].show();
    }
    else {
        clearInterval(timeInterval);
        timer.text("Time: " + timeLeft);
        userInfo.score = timeLeft;
        finalScore.text("Your final score is: " + userInfo.score)
        quizEnd.show();
    }
}

//Loop to cycle viewport through each question and capture if user clicks the correct answer
function questionCycle() {
    countdown();
    button.on('click', function (event) {

        if ($(event.target).hasClass("correct")) {
            console.log("worked");
            questions[questionIndex].hide();
            isQuizOver();
            return;
        }
        else {
            console.log("no");
            questions[questionIndex].hide();
            timeLeft = timeLeft - 10;
            isQuizOver();
            return;
        }
    })
}

// Timer that counts down from 5
// Timer that starts when you start the quiz.
function countdown() {
    timeInterval = setInterval(function () {
        timeLeft--;
        timer.text("Time: " + timeLeft);
        if (timeLeft === 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
}

init();
//Starts quiz
startBtn.on("click", function () {
    questionBlock.hide();
    question1.show();
    questionCycle();
})
