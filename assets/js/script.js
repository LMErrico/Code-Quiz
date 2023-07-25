var viewHighscores = document.querySelector(".view-highscores");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var isWin = false;
var timer;
var timerCount;
var questionsAnswered = 0;

startButton.addEventListener("click", startGame);

function startGame() {
    isWin = false;
    timerCount = 20;
    startButton.disabled = true;
    startTimer()
    showQuestion()
}

function startTimer() {
  var timeInterval = setInterval(() => {
    if (timerCount < 0) {
      console.log("stop");
      clearInterval(timeInterval);
      isWin = false;
      showFinalScore();
      return;
    }
    timerElement.textContent = timerCount; 
    timerCount--;
  }, 1000);
}

const quizData = [
    {
      question: "Commonly used data types DO not include:",
      choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      correctAnswer: "3. alerts"
    },
    {
      question: "The condition in an if / else statement is enclosed with ______",
      choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
      correctAnswer: "3. parenthesis"
    },
    {
      question: "Arrays in JavaScript can be used to store",
      choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
      correctAnswer: "4. all of the above"
    },
    {
      question: "String values must be enclosed within _____ when being assigned to variables.",
      choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
      correctAnswer: "3. quotes"
    }
    
  ];
  
  let currentQuestionIndex = 0;
  console.log(currentQuestionIndex)
  let score = 0;
  
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const resultElement = document.getElementById("result");
  const scoreElement = document.getElementById("score");
  
  function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
  
    currentQuestion.choices.forEach((choice) => {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.addEventListener("click", () => checkAnswer(choice));
      choicesElement.appendChild(choiceButton);
    });
  }
  
function checkAnswer(userChoice) { 
    // console.log(userChoice)
    const currentQuestion = quizData[currentQuestionIndex];
    if (userChoice === currentQuestion.correctAnswer) {
      score++;
      resultElement.textContent = "Correct!";  
    }
  
    if (userChoice != currentQuestion.correctAnswer) {
        // console.log("wrong")
        timerCount -=10;
        resultElement.textContent = "Wrong!"  
    }
    questionsAnswered++
    if (questionsAnswered == quizData.length) {
        showFinalScore();
    }

    currentQuestionIndex++;
  
    if (currentQuestionIndex < quizData.length) {
      showQuestion();
    } else {
      showFinalScore();
    }
  }

  function showFinalScore() {
    questionElement.textContent = "GAME OVER!";
    choicesElement.innerHTML = "";
    startButton.style.display = "none";
    scoreElement.style.display= "block";
    scoreElement.textContent = `Final Score: ${score} of ${quizData.length}`;
    localStorage.setItem("score", score)
  }

