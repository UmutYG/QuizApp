"use strict"
const ansList = document.querySelector("#ansList");
const questionTitle = document.querySelector("#qTitle");
const questionText = document.querySelector("#qText");
const nextButton = document.querySelector(".button-next")
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
  let question = quizManager.getQuestion();
  let optionsHtml = ``;
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

function checkAnswer()
{

  let currentQuestion = quizManager.getQuestion();
  let isTrue =  this.querySelector("span").textContent == currentQuestion.correctAns ? true : false;
 
  if(isTrue)
  {
  console.log(this.classList.add("correct"));

  }
  else 
    console.log(this.classList.add("wrong"));

    for(let o of ansList.children)
  {
    console.log(o);
    o.classList.add("disabled");
  }
  nextButton.style.display = "block";
}

nextButton.addEventListener("click",function()
{
  quizManager.questionIndex++;
  renderQuestion();
});
