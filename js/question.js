function Question(qText,answers,correctAns)
{
  this.qText = qText;
  this.answers = answers;
  this.correctAns = correctAns;
}

let questionList = [
    new Question("Hangisi bir programlama dili değildir?", {"a":"java", "b":"python","c":"sql","d":"html"},"d"),
    new Question("Hangisi bir programlama dili değildir2?", {"a":"java", "b":"python","c":"sql","d":"html"},"d"),
    new Question("Hangisi bir programlama dili değildir3?", {"a":"java", "b":"python","c":"sql","d":"html"},"d")
                    ];