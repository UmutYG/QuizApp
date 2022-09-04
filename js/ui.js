function UI()
{
    this.ansList = document.querySelector("#ansList");
    this.questionTitle = document.querySelector("#qTitle");
    this.questionText = document.querySelector("#qText");
    this.nextButton = document.querySelector(".button-next");
    this.timerDiv = document.querySelector(".time-bar");
    this.timerProgBar = document.querySelector(".progress-bar");
    this.timerSecsF;
    this.timerBarF;
}

UI.prototype.renderQuestion = function renderQuestion()
{
  quizManager.startTimer();
  let question = quizManager.getQuestion();
  let optionsHtml = ``;
  quizManager.prepareNextQuestion();
  this.questionTitle.textContent = quizManager.questionIndex+1 + ".soru";
  this.questionText.textContent = question.qText;
  for(let option in question.answers)
  {
    optionsHtml += `
    <li class="list-group-item option"><span>${option}</span>: ${question.answers[option]}</li>
    `
  }

  this.ansList.innerHTML = optionsHtml;
  for(let option of ui.ansList.children)
  {
    option.addEventListener("click", quizManager.checkAnswer);
  }
  
}

ui.nextButton.addEventListener("click",function()
{
  quizManager.questionIndex++;
  ui.renderQuestion();
});

