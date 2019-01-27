var trivaQuestions = [{
  question: "Mickey Mouse made his first appearance in what short film?",
  answerList: ["Steam Boat Willie", "Plane Crazy", "The Barn Dance"],
  answer: 1
},{
    question: "What color shoes does Mickey Mouse traditionally wear?",
    answerList: ["Yellow", "Red", "Black"],
    answer: 0
},{
    question: "In what short film does Mickey first speak?",
    answerList: ["Look Out", "Wanna Dance", "Hot Dogs"],
    answer: 2
},{
    question: "In what year does Mickey Mouse make his first comic strip appearance?",
    answerList: ["1945", "1930", "1934"],
    answer: 2
},{
    question: "Which star is NOT a Mouskateer?",
    answerList: ["Ricky Martin", "Justin Timberlake", "Christina Agilera"],
    answer: 0

}];

var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
    correct: "Yes! That's correct!",
    incorrect: "Sorry! That's incorrect!",
    endTime: "Time's Up!",
    finished: "Thanks for playing! Here's your score."
}

$('#startBtn').on('click', function(){
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function(){
    $(this).hide();
    newGame();
});

function newGame(){
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion(){
    $('#message').empty();
    $('#correctedAnswer').empty();
    answered = true;

    // sets up new questions and answerList
    $('#currentQuestion').html('Question #' + (currentQuestion+1)+'/'+trivaQuestions.length);
    $('.question').html('<h2>' + trivaQuestions [currentQuestion].question + '</h2>');
    for(var i = 0; i < 4; i++){
        var choices = $('<div>');
        choices.text(trivaQuestions
            [currentQuestion].answerList[i]);
            choices.attr({'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
    }
    // There may be a typo or error in one of the yellow words - I thought there was an issue with clearInterval on line 74, but the code worked.
    countdown();
    $('.thisChoice').on('click', function(){
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown(){
    seconds = 10;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    time = setInterval(showCountdown, 1000);
}

function showCountdown(){
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if(seconds < 1){
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage(){
    $('#currentQuestion').empty();
    $('.thisChoice').empty();
    $('.question').empty();
// May be an issue with rightAnswerText - Solved - I accidentally typed rightAnswerText on line 104 instead of rightAnswerIndex
    var rightAnswerText = trivaQuestions
    [currentQuestion].answerList[trivaQuestions
    [currentQuestion].answer];
    var rightAnswerIndex = trivaQuestions
    [currentQuestion].answer;

    // May be an issue with rightAnswerIndex - Once rightAnswerIndex was corrected on line 104 (see comment on line 100 ) the code worked
    if((userSelect == rightAnswerIndex) && (answered == true)){
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if((userSelect != rightAnswerIndex) && (answered == true)){
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else{
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if(currentQuestion == (trivaQuestions.length-1)){
        setTimeout(scoreboard, 5000)
    } else{
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }

}

function scoreboard(){
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();

    $('#finalMessage').html(messages.finished);
    // Only Correct Answers are showing at the end of the game. incorrectAnswers and unanswered are not shown.
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    // I forgot to write the incorrectAnswers and unanswered to the html
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}
