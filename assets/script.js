const questionBlock = $("#intro");
const startBtn = $("#start-quiz");
const question1 = $("#1")
const question2 = $("#2")
const question3 = $("#3")
const question4 = $("#4")
const question5 = $("#5")
const finalScore = $("#finalScore")
const correctAnswer = $(".correct")
const container = $("container")
const button = $("button")
let questions = [question1, question2, question3, question4, question5]
//question1.hide();
//question2.hide();
//question3.hide();
//question4.hide();
//question5.hide();
finalScore.hide();




startBtn.on("click", function () {
    questionBlock.hide();
    question1.show();
})


for (let i = 0; i < 5; i++) {
    button.on('click', button, function (event) {

        if ($(event.target).hasClass("correct")) {
            console.log("worked");
        }
        else {
            console.log("no");
        }
        questions[i].hide()
        questions[i++].show()
    })
}
