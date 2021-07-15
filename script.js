// questions for the quiz
var questions = [
    {
      title: "What is HTML Tag called that allows you to write Javascript?",
      multiChoice: ["<script>", "<shrek>", "<shrimp>", "<shmoney>"],
      answer: "<script>"
    },
  
    {
      title: "Where is the correct place to insert Javascript?",
      multiChoice: ["only head section", "Both head and body section", "only body section", "Crikey!"],
      answer: "Both head and body section"
    },
  
    {
      title: "How do you create a function?",
      multiChoice: ["whistle loudly", "function myFunction()", "say 'hello' to your neighbor", "$(@#@$#@)"],
      answer: "function myFunction()"
    },
  
    {
      title: "What built-in method returns the characters in a string beginning to a specified location?",
      multiChoice: [".getCrunk()", "substr()", ".Farquad", ".stylo"],
      answer: "substr()"
    },
  
    {
      title: "Which of the following is the correct syntax to redirect a url using JavaScript?",
      multiChoice: ["place.location();", "takeItem.place()", "var = boolean (true)", "window.location='http://www.newlocation.com';"],
      answer: "window.location='http://www.newlocation.com';"
    }
  ];


//var for start-time

let secondsLeft = 60 ;


//creating element that displays time
let timer = document.getElementById("timer");

//creating div to house the high scores 
let scoresDiv = document.getElementById("timer");

let buttonsDiv = document.getElementById("buttons");

//creating variable to view high scores 
let viewScoresBtn = document.getElementById("view-scores");

//start button div
let startButton = document.getElementById("start-button");
startButton.addEventListener("click", setTime)

//creating variable for question header
var questionDiv = document.getElementById("question-div");

//div to hold quiz results
let results = document.getElementById("results");

//div for the quiz answers options
var choices = document.getElementById("choices");

//creating array to house user scores 
let emptyArray = [];

//filling the array with values from local storage
let storedArray = JSON.parse(window.localStorage.getItem("highScores"));

//establishing order of questions 
var questionCount = 0;

//keeping score 
let score = 0;




//Timer starts onClick event "startButton"
function setTime() {
    displayQuestions();
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "";
        timer.textContent = "Time: " + secondsLeft;
        if (secondsLeft <= 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            captureUserScore();
            
        }
    }, 1000);
}

//function to load the question title and questions answers onto the page
function displayQuestions() {
    removeEls(startButton);

    if (questionCount < questions.length) {
        questionDiv.innerHTML = questions[questionCount].title;
        choices.textContent ="";

//logs the user's click + the number of questions the user answers correct 
        for (let i = 0; i < questions[questionCount].multiChoice.length; i++){
            let el = document.createElement("button");
            el.innerText =questions[questionCount].multiChoice[i];
            el.setAttribute("data-id", i);
            el.addEventListener("click", function (event) {
                event.stopPropagation();

                if (el.innerText === questions[questionCount].answer) {
                    score += secondsLeft;
                } else { 
                score -= 10;
                secondsLeft = secondsLeft - 5;
            }

            questionDiv.innerHTML = "";

            if (questionCount === questions.length) {
                return;
            } else {
                questionCount++;
                displayQuestions();
            }
            });
            choices.append(el);
                }
            }
        }

        
//function to log user's score 
function captureUserScore() {
    timer.remove();
    choices.textContent ="";

    let initialsInput = document.createElement("input");
    let postScoreBtn = document.createElement("input");

    //figure out how to log user's score
    results.innerHTML = `Wow! You Scored ${score} Please Enter Your Initials: `;
    initialsInput.setAttribute("type", "text");
    postScoreBtn.setAttribute("type", "button");
    postScoreBtn.setAttribute("value", "Log Score!");
    postScoreBtn.addEventListener("click", function (event) {
        event.preventDefault();
       

        let allScores = JSON.parse(window.localStorage.getItem("highScores")) || [];

        let initials = initialsInput.value;
        let userAndScore = {
            initials: initials,
            score: score,
        };
console.log(userAndScore);

        allScores.push(userAndScore);
        saveScores(allScores);
        clearScoresBtn();
        goBackBtn();
        viewScoresBtn.remove();
    });

//appes the results from the score combined with user input
results.append(initialsInput);
results.append(postScoreBtn);
}

const saveScores = (array) => {
    window.localStorage.setItem("highScores", JSON.stringify(array));
}


//defines the empty array for the user's scores to collect
const definesScoresArray =(arr1, arr2) => {
    if(arr1 !== null) {
        return arr1
    } else {
        return arr2
    }
}

const removeEls = (...els) => {
    for (let el of els) el.remove();
}



//feature that allows user to view previous scores
function viewScores() {
    viewScoresBtn.addEventListener("click", function (event){
        event.preventDefault();
        removeEls(timer, startButton);
        removeEls(viewScoresBtn);
        clearScoresBtn();
        goBackBtn();
    });
}

//feature that resets the highscores
function clearScoresBtn() {
let clearBtn = document.createElement("input");
clearBtn.setAttribute("type", "button");
clearBtn.setAttribute("value", "Clear Score");
clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    removeEls(scoresDiv);
})
scoresDiv.append(clearBtn)
}


//feature to let the user go back to the start
function goBackBtn() {
    let backBtn = document.createElement("input");
    backBtn.setAttribute("type", "button");
    backBtn.setAttribute("value", "Go Back");
    backBtn.addEventListener("click", function(event){
        event.preventDefault();
        window.location.reload();
    })
    buttonsDiv.append(backBtn);
}

viewScores();