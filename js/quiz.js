function QuizManager(questions)
{
  this.questions = questions;
  this.questionIndex = 0;
  
}

QuizManager.prototype.getQuestion = function()
{
    return this.questions[this.questionIndex];

}

QuizManager.prototype.checkAnswer = function checkAnswer()
{
  let currentQuestion = quizManager.getQuestion();
  let isTrue =  this.querySelector("#answerText").textContent == currentQuestion.correctAns ? true : false;

  if(isTrue)
  {
    console.log(this);
    this.classList.add("correct");
    document.querySelector(".option.correct").insertAdjacentHTML("beforeend", '<i class="fa-solid fa-check"></i>');
  }
  else
  {
    this.classList.add("wrong");
    document.querySelector(".option.wrong").insertAdjacentHTML("beforeend", '<i class="fa-solid fa-xmark"></i>');
  } 

  for(let option of ansList.children)
  {
    option.firstElementChild.lastElementChild.textContent == currentQuestion.correctAns ? option.classList.add("correct") :"" ;
    option.classList.add("disabled");

  }
  clearInterval(ui.timerSecsF);
  clearInterval(ui.timerBarF);
  ui.nextButton.style.display = "block";
  ui.timerDiv.style.display = "none";
}
QuizManager.prototype.prepareNextQuestion = function prepareNextQuestion()
{
  ui.nextButton.style.display = "none";
  ui.timerDiv.style.display = "block";
  ui.timerProgBar.classList.remove("bg-danger");
  ui.timerProgBar.classList.add("bg-warning");
}

QuizManager.prototype.startTimer = function startTimer()
{
  let time = 10;
  let lineWidth = 0;
  ui.timerSecsF = setInterval(timerSecs, 1000);
  ui.timerBarF = setInterval(timerBar, 100);
  ui.timerProgBar.style.width = 0;
    function timerSecs()
    {
      ui.timerDiv.firstElementChild.textContent = "Time Left:";
      ui.timerDiv.lastElementChild.textContent = time;
      time--;
      
    }
    function timerBar()
    {
      ui.timerProgBar.style.width = lineWidth + "px";
      lineWidth += 7.7;
      if(lineWidth > 500)
      {
        ui.timerProgBar.classList.remove("bg-warning");
        ui.timerProgBar.classList.add("bg-danger");
      }
      
      if(time < 0)
      {
        clearInterval(ui.timerSecsF);
        clearInterval(ui.timerBarF);
        ui.timerDiv.lastElementChild.textContent = "Time Is Up!";
        
        
        ui.nextButton.style.display = "block";
        ui.timerDiv.style.display = "none";
        ui.ansList.insertAdjacentHTML("beforeend", `
        <div class="alert alert-info text-center" role="alert">
        Time Is Up, Click Next Question Button!
        </div>`)
      } 
      
  }
}