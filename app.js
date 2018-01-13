var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Which team selected Kobe Bryant directly out of high school in the 1996 NBA draft?", "What player has the most career assists?", "Who has most coaching titles?", "who was the #1 draft pick in 2003?", "Who has the most career points in the playoff?", "What player scored the most points in one game??", "What year was the NBA established?", "What is the capital of India?"];
var answerArray = [["Toronto Raptors", "Los Angeles Lakers", "charlotte Hornets", "Washington Wizards"], ["John Stockton","Steve Nash","Chris Paul","Derrick Rose"], ["Doc River", "Phil Jackson", "Scot Skiles", "Greg Poppovich"], ["Dwight Howard","Lebron James","Michael Jordan","Kevin Garnet"], ["Michael Jordan","Michael Phelp","Anthony Davis","Stephen Curry"], ["Kobe Bryant", "Tim Duncan", "Wilt Chamberlin", "Bill Russel"], ["1935","1945","1946","1958"],  ["Rick Pitino","Larry Brown","Chuck Daly","John Calipari"]];
var imageArray = ["<img class='center-block img-right' src='assets/image/cha.png'>", "<img class='center-block img-right' src='assets/image/js.jpg'>", "<img class='center-block img-right' src='assets/image/phil.jpg'>", "<img class='center-block img-right' src='assets/image/lebron.png'>", "<img class='center-block img-right' src='assets/image/mj.jpg'>", "<img class='center-block img-right' src='assets/image/wilt.jpg'>", "<img class='center-block img-right' src='assets/image/nba.jpg'>", "<img class='center-block img-right' src='assets/image/larrybrown.jpg'>"];
var correctAnswers = ["C. charlotte Hornets", "A. John Stockton", "B. Phil Jackson", "B. Lebron James", "A. Michael Jordan", "C. Wilt Chamberlin", "C. 1946", "B. Larry Brown"];
var questionCounter = 0;
var selecterAnswer
var theClock;
var correctTally = 0
var incorrectTally = 0;
var unansweredTally = 0;



$(document).ready(function() {


function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();



$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	
	generateHTML();

	timerWrapper();

}); 

$("body").on("click", ".answer", function(event){
	
	
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		

		clearInterval(theClock);
		generateWin();
	}
	else {
		
		clearInterval(theClock);
		generateLoss();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/image/x.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/image/x.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}


