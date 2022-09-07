"use strict"

const ui = new UI();
let quizManager = new QuizManager(questionList);

ui.renderQuestion();


ui.nextButton.addEventListener("click",function()
{
  quizManager.questionIndex++;
  ui.renderQuestion();
});
