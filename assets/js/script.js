var startButton = document.querySelector("#start-button");
var timerDisplay = document.querySelector("#timer");
var main = document.querySelector("main");
var scoreboard = document.querySelector(".scoreboard");
var scoreOl = document.querySelector("#score-list");

// On button click, start game (start timer and change to first question)

var secondsLeft = 45;
var pageCount = 0;

var score = 0;
var initials;
var allScores = JSON.parse(localStorage.getItem("scores")) || [];

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
            gameOverTime();
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

        if (nextQuestion.className.includes("scoreboard")) {
            gameOverWin();
        }
    });
});

// game over function (for when timer runs out)
function gameOverTime() {
    var question = document.querySelector(".shown");

    question.classList.remove("shown");
    question.classList.add("hidden");
    scoreboard.classList.remove("hidden");
    scoreboard.classList.add("shown");

    askInitials();
    storeScore();
    renderScoreboard();
}

// game over function (for when user wins)
function gameOverWin() {
    score = secondsLeft;
    secondsLeft = 0;
}

// asks the user for their initials
function askInitials() {
    initials = window.prompt("Your score was " + score + "\nPlease enter your initials:");
}

// store the score and user's initials in local storage
function storeScore() {
    var currentScore = {
        score: score,
        initials: initials
    };
    allScores.push(currentScore);
    localStorage.setItem("scores", JSON.stringify(allScores));
};

// build and render the scoreboard
function renderScoreboard() {
    allScores = JSON.parse(localStorage.getItem("scores"));
    console.log(allScores);

    for (var i = 0; i < allScores.length; i++) {
        var scoreLi = document.createElement("li");
        scoreLi.innerHTML = allScores[i].initials + " - " + allScores[i].score;
        scoreOl.appendChild(scoreLi);
    }
}