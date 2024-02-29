var startBtn = document.querySelector(".start-btn");
var countdown = document.querySelector("#countdown");
var question = document.querySelector(".question");
var choice1 = document.querySelector(".choice1");
var choice2 = document.querySelector(".choice2");
var choice3 = document.querySelector(".choice3");
var choice4 = document.querySelector(".choice4");
var theTest = document.querySelector(".the-test");
var finalResult = document.querySelector("#correct-incorrect");
var initialsSection = document.querySelector(".initials-section");
var submitButton = document.querySelector(".submit-btn");
var theScore = document.querySelector(".the-score");
var viewHighscores = document.querySelector("#highscore");
var theHighscore = document.querySelector(".highscores-section");

var q1 = "Inside which HTML element do we put the JavaScript?";
var q2 = "Are variable names case-sensitive?";
var q3 = "What happens if you try to initialize a variable before it is declared?";
var q4 = "What happens if you try to use a variable that does not exist?";
var q5 = "What happens if you try to declare a variable whose name starts with a digit?";
var quizQuestions = [q1, q2, q3, q4, q5];

// A is correct
var quizChoice1 = {
    optionA: "A--  <script>",
    optionB: "B--  <javascript>",
    optionC: "C--  <js>",
    optionD: "D--  <scripting>"
}
// A is correct
var quizChoice2 = {
    optionA: "A--  Yes",
    optionB: "B-- No",

}
// D is correct
var quizChoice3 = {
    optionA: "A--  A ReferenceError is thrown.",
    optionB: "B--  The variable is created in global scope",
    optionC: "C--  The variable is created in global or function scope, depending on where it is initialized.",
    optionD: "D--  In strict mode, a ReferenceError is thrown, in non-strict mode, the variable is created in the global scope."
}
// C is correct
var quizChoice4 = {
    optionA: "A--  The scriipt will not compile and will not execute.",
    optionB: "B--  The variable will be implicitly created with a default value of undefined.",
    optionC: "C--  A ReferenceError is thrown.",
    optionD: "D--  In strict mode, a ReferenceError is thrown, in non-strict mode, the variable evaluates to undefined."
}
// A is correct
var quizChoice5 = {
    optionA: "A--  A SyntaxError is thrown with the message 'Invalid or unexpected token'.",
    optionB: "B--  The variable is created because numbers are valid characters in identifiers.",
    optionC: "C--  This is a special syntax that is used to declare variables used by the internal JavaScript engine.",
    optionD: "D--  Number variables in octal and hexadecimal formats must be declared with identifiers that begin with a digit."
}

var quizAnswers = [quizChoice1, quizChoice2, quizChoice3, quizChoice4, quizChoice5]

var right1 = quizChoice1.optionA;
var right2 = quizChoice2.optionA;
var right3 = quizChoice3.optionD;
var right4 = quizChoice4.optionC;
var right5 = quizChoice5.optionA;
var rightAnswers = [right1, right2, right3, right4, right5]
 
startBtn.addEventListener("click", startTimer)

    startBtn.addEventListener("click", function(){
        document.querySelector(".quiztitle").style.display = "none";
        theTest.style.display = "block";
        })

    startBtn.addEventListener("click", nextQuestion)

    var correctIndex = 0; 

function nextQuestion(){

       if (correctIndex === theQuestions.length - 1) {
           setTimeout(function(){theTest.style.display = "none";
           initialsSection.style.display = "inline";
       }, 500);
   
           setTimeout(function(){clearInterval(timerInterval)}, 500);
   
       } else {
           question.textContent = quizQuestions[correctIndex];
           choice1.textContent = quizAnswers[correctIndex].optionA;
           choice2.textContent = quizAnswers[correctIndex].optionB;
           choice3.textContent = quizAnswers[correctIndex].optionC;
           choice4.textContent = quizAnswers[correctIndex].optionD;
       }
       }
       
       var timeLeft = 60;
       var timerInterval;
       function startTimer(){
           timerInterval = setInterval(function() {
               timeLeft --;
               countdown.textContent =  "Time: " + timeLeft + " seconds";
           
               if (timeLeft === 0) {
                 clearInterval(timerInterval);
                 theTest.style.display = "none";
                 initialsSection.style.display = "inline";
               }
             }, 1000);
           return timerInterval;
       }   
   
   theTest.addEventListener("click", verifyAnswer)
   
   function verifyAnswer(event){
       if(event.target.matches(".trigger")){
           var userChoice = event.target.textContent;
   
           finalResult.textContent = " ";
           finalResult.style.display = "block";
               if (userChoice === rightAnswers[correctIndex]){
                   finalResult.textContent = "Correct!";
                   setTimeout(function(){ finalResult.style.display = "none"}, 500);
               } else {
                   finalResult.textContent = "Wrong!"
                   setTimeout(function(){ finalResult.style.display = "none"}, 500);
                   timeLeft -= 5;
                   countdown.textContent =  "Time: " + timeLeft + " seconds";
               }
               correctIndex++;
       }
       return timeLeft;
   };
   
   theTest.addEventListener("click", function(event){
       if(event.target.matches(".trigger")){
           nextQuestion();
       }})
   
   submitButton.addEventListener("click", function(event){
       event.preventDefault();
   
       newUser();        
   
           initialsSection.style.display = "none";
           document.querySelector(".the-score").style.display = "block";
           document.querySelector(".user-scores").style.display = "block";
   })
   
   function newUser() {
       var userInitial = document.querySelector("#initials").value;
       if (userInitial === "") {
           userInitial = "anonymous";
       } 
           localStorage.setItem(userInitial, timeLeft);
           document.querySelector(".user-scores").textContent = " ";
           var p = document.createElement("p");
           p.textContent = userInitial + ": " + timeLeft;
           document.querySelector(".user-scores").appendChild(p);    
       
   }
   
   document.querySelector(".start-over").addEventListener("click", function(){
       
       correctIndex = 0;
       

       timeLeft = 60;
       countdown.textContent =  "Time: 60 seconds";
       
       document.querySelector(".quiztitle").style.display = "block";
       
       theScore.style.display = "none";
   })
   
   document.querySelector(".clear-highscores").addEventListener("click", function(){
       localStorage.clear();
   
       document.querySelector(".user-scores").textContent = " ";
       document.querySelector(".user-scores").style.display = "none";
   
   });
   
   viewHighscores.addEventListener("click", function(){
   
       clearInterval(timerInterval);
      
       document.querySelector(".quiztitle").style.display = "none";
       theTest.style.display = "none";
       initialsSection.style.display = "none";
       theScore.style.display = "block";
   
       document.querySelector(".user-scores").textContent = " ";
       for (let i = 0; i< localStorage.length; i++) {
           var p = document.createElement("p");
           var user = localStorage.key(i);
           var scores = localStorage.getItem(localStorage.key(i));
           p.textContent = user + ": " + scores;
           document.querySelector(".user-scores").appendChild(p);}
       })    
