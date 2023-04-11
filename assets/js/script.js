var startButton = document.querySelector("#start-button");
var timerDisplay = document.querySelector("#timer");
var main = document.querySelector("main");

// On button click, start game (start timer and change to first question)

var secondsLeft = 45;
var pageCount = 0;

startButton.addEventListener("click", function() {
    nextPage();

    secondsLeft = 45;
    var timer = setInterval(function() {
        secondsLeft--;
        timerDisplay.textContent = secondsLeft;

        if(secondsLeft < 1) {
            // Stops execution of action at set interval
            clearInterval(timer);
            secondsLeft = 0;
            timerDisplay.textContent = secondsLeft;
            // Game over :(
            gameOver();
          }
    }, 1000);
});

// Flip to the next page/section/question/screen/whatever-you-call-it
function nextPage() {
    main.children[pageCount].className = "card hidden";
    main.children[pageCount + 1].className = "card question shown";
}

var answers = document.querySelectorAll(".a");

answers.forEach(answer => {
    answer.addEventListener("click", () => {
        var question = answer.parentNode;

        var nextQuestion = question.nextElementSibling;

        if (answer.className === "a correct") {
            question.classList.remove("shown");
            question.classList.add("hidden");
            nextQuestion.classList.remove("hidden");
            nextQuestion.classList.add("shown");
        } else {
            console.log("nope!");
            secondsLeft = secondsLeft - 5;
        }

    });
});