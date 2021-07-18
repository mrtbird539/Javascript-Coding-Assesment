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
const rightOrWrong = $("#message");
const subBtn = $("#subbtn");
const HS = $("#hs");
const viewHS = $("#viewHS");
const backBtn = $("#back");
const clearBtn = $("#clear");
const hsList = $("#hsList")
let timeLeft = 75;
let questions = [question1, question2, question3, question4, question5];
questionIndex = 0
let timeInterval;
let highScores = JSON.parse(localStorage.getItem("Highscores")) || [];
//Sets page init
function init() {
    questionBlock.show();
    question1.hide();
    question2.hide();
    question3.hide();
    question4.hide();
    question5.hide();
    quizEnd.hide();
    HS.hide();
}

function isQuizOver() {
    if (questionIndex < (questions.length - 1)) {
        questionIndex++;
        questions[questionIndex].show();
    }
    else {
        clearInterval(timeInterval);
        rightOrWrong.text("");
        timer.text("Time: " + timeLeft);
        finalScore.text("Your final score is: " + timeLeft);
        quizEnd.show();

        subBtn.on("click", function (event) {
            event.preventDefault();
            let scores = {
                name: $("#initials").val().trim(),
                score: timeLeft
            }
            highScores.push(scores);
            localStorage.setItem("Highscores", JSON.stringify(highScores));
            scoreOrdering();
            quizEnd.hide();
            HS.show();
        })
    }
}

//Loop to cycle viewport through each question and capture if user clicks the correct answer
function questionCycle() {
    countdown();
    button.on('click', function (event) {

        if ($(event.target).hasClass("correct")) {
            console.log("worked");
            questions[questionIndex].hide();
            rightOrWrong.text("Correct!")
            isQuizOver();
            return;
        }
        else if ($(event.target).hasClass("wrong")) {
            console.log("no");
            questions[questionIndex].hide();
            timeLeft = timeLeft - 10;
            rightOrWrong.text("Wrong");
            isQuizOver();
            return;
        }
    })
}

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

viewHS.on("click", function () {
    rightOrWrong.text("");
    questionBlock.hide();
    question1.hide();
    question2.hide();
    question3.hide();
    question4.hide();
    question5.hide();
    quizEnd.hide();
    HS.show()
    scoreOrdering();
})

backBtn.on("click", function () {
    window.location.reload();
})

clearBtn.on("click", function () {
    hsList.empty()
    localStorage.clear();
})

function scoreOrdering() {
    hsList.empty();
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });
    for (let i = 0; i < highScores.length; i++) {
        let score = highScores[i]
        if (i % 2) {
            hsList.append('<li class="list-group-item bg-secondary">' + score.score + ": " + score.name + "</li>")
        }
        else {
            hsList.append('<li class="list-group-item">' + score.score + ": " + score.name + "</li>")
        }
    }
}