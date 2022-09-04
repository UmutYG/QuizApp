"use strict"
const ansList = document.querySelector("#ansList");
const questionTitle = document.querySelector("#qTitle");
const questionText = document.querySelector("#qText");
const nextButton = document.querySelector(".button-next");
const timerDiv = document.querySelector(".time-bar");
const timerProgBar = document.querySelector(".progress-bar");
let timerSecsF;
let timerBarF;
let questionList = [
  new Question("Hangisi bir programlama dili değildir?", {"a":"java", "b":"python","c":"sql","d":"html"},"d"),
  new Question("Hangisi bir programlama dili değildir2?", {"a":"java", "b":"python","c":"sql","d":"html"},"d"),
  new Question("Hangisi bir programlama dili değildir3?", {"a":"java", "b":"python","c":"sql","d":"html"},"d")
                  ]
let quizManager = new QuizManager(questionList);


function Question(qText,answers,correctAns)
{
  this.qText = qText;
  this.answers = answers;
  this.correctAns = correctAns;
}

function QuizManager(questions)
{
  this.questions = questions;
  this.questionIndex = 0;
  this.getQuestion = function()
  {
    return this.questions[this.questionIndex];
  }
}
renderQuestion();

function renderQuestion()
{
  startTimer();
  let question = quizManager.getQuestion();
  let optionsHtml = ``;
  prepareNextQuestion();
  questionTitle.textContent = quizManager.questionIndex+1 + ".soru";
  questionText.textContent = question.qText;
  for(let option in question.answers)
  {
    optionsHtml += `
    <li class="list-group-item option"><span>${option}</span>: ${question.answers[option]}</li>
    `
  }

  ansList.innerHTML = optionsHtml;
  for(let option of ansList.children)
  {
    option.addEventListener("click", checkAnswer);
  }
  
}

function prepareNextQuestion()
{
  nextButton.style.display = "none";
  timerDiv.style.display = "block";
  timerProgBar.classList.remove("bg-danger");
  timerProgBar.classList.add("bg-warning");
}

function checkAnswer()
{

  let currentQuestion = quizManager.getQuestion();
  let isTrue =  this.querySelector("span").textContent == currentQuestion.correctAns ? true : false;
 
  if(isTrue)
  {
  console.log(this.classList.add("correct"));

  }
  else
  {
    console.log(this.classList.add("wrong"));

    
  } 

  for(let option of ansList.children)
  {
    option.firstElementChild.textContent == currentQuestion.correctAns ? option.classList.add("correct") :"" ;
    option.classList.add("disabled");

  }
  clearInterval(timerSecsF);
  clearInterval(timerBarF);
  nextButton.style.display = "block";
  timerDiv.style.display = "none";
  
}

nextButton.addEventListener("click",function()
{
  quizManager.questionIndex++;
  renderQuestion();
});

function startTimer()
{
  let time = 10;
  let lineWidth = 0;
  timerSecsF = setInterval(timerSecs, 1000);
  timerBarF = setInterval(timerBar, 100);
  timerProgBar.style.width = 0;
    function timerSecs()
    {
      timerDiv.firstElementChild.textContent = "Time Left:";
      timerDiv.lastElementChild.textContent = time;
      time--;
      
    }
    function timerBar()
    {
      timerProgBar.style.width = lineWidth + "px";
      lineWidth += 7.7;
      if(lineWidth > 500)
      {
        timerProgBar.classList.remove("bg-warning");
        timerProgBar.classList.add("bg-danger");
      }
      
      if(time < 0)
      {
        clearInterval(timerSecsF);
        clearInterval(timerBarF);
        timerDiv.lastElementChild.textContent = "Time Is Up!";
        
        
        nextButton.style.display = "block";
        timerDiv.style.display = "none";
        ansList.insertAdjacentHTML("beforeend", `
        <div class="alert alert-info text-center" role="alert">
        Time Is Up, Click Next Question Button!
        </div>`)
      } 
      
  }
}