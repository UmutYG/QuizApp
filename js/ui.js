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
  fetch('https://the-trivia-api.com/api/questions')
      .then(firstResponse => {
        return firstResponse.json();
      })
      .then(questionResponse => {
        let data = questionResponse[0];
        questionList.push(
          new Question(data.question, [...data.incorrectAnswers, data.correctAnswer],data.correctAnswer));
          quizManager.startTimer();
          let question = quizManager.getQuestion();  
          let optionsHtml = ``;
          quizManager.prepareNextQuestion();
          this.questionTitle.textContent = quizManager.questionIndex+1 + ". Question";
          this.questionText.textContent = question.question;
          const array = [0, 1, 2, 3];
          for(let i=0;i<4;i++)
          {
            const randomElement = array[Math.floor(Math.random() * array.length)];
            array.splice(array.findIndex(i => i == randomElement),1);
            optionsHtml += `
            <li class="list-group-item option">
            <div>
            <span >${String.fromCharCode(65+i)}</span>:
            <span id="answerText">${question.answers[randomElement]}</span>
            </div>
            </li>
            `
          }
        
          this.ansList.innerHTML = optionsHtml;
          for(let option of ui.ansList.children)
          {
            option.addEventListener("click", quizManager.checkAnswer);
          }
          
      });
 
  
}


