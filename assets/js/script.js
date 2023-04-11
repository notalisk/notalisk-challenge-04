var startButton = document.querySelector("#start-button");
var timerDisplay = document.querySelector("#timer");
var main = document.querySelector("main");
var question = document.querySelector(".shown");
var a1;
var a2;
var a3;
var a4;

// On button click, start game (start timer and change to first question)

var secondsLeft = 45;
var pageCount = 0;

startButton.addEventListener("click", function() {
    nextPage();
    //setQuestionVars();

    secondsLeft = 45;
    var timer = setInterval(function() {
        secondsLeft--;
        timerDisplay.textContent = secondsLeft;

        if(secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timer);
            // Game over :(
            gameOver();
          }
    }, 1000);
});

// click an answer
// if the answer is correct, go to the next page
// if the answer is wrong, subtract from time/score
question.addEventListener("click", function() {

    if (document.querySelector(".correct")) {
        nextPage();
    } else {
        secondsLeft - 5;
    }
});

// Flip to the next page/section/question/screen/whatever-you-call-it
function nextPage() {
    main.children[pageCount].className = "card hidden";
    main.children[pageCount + 1].className = "card question shown";
}

// set the question and answer (a) variables
function setQuestionVars() {
    question = document.querySelector(".shown");
    a1 = question.children[0];
    a2 = question.children[1];
    a3 = question.children[2];
    a3 = question.children[3];
    a4 = question.children[4];
}