var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern =[];

var started = false;

var level = 0;

$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function(){
var  userChosenColour = $(this).attr("id");

userClickedPattern.push(userChosenColour);

playSound(userChosenColour);
animatePress(userChosenColour);
// Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
checkAnswer(userClickedPattern.length-1)
});


function checkAnswer(currentLevel) {
  // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern.
if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
  console.log("success")

  if ((userClickedPattern.length)===(gamePattern.length)) {
    setTimeout( function(){
      nextSequence();
    }, 1000);

  }

}  else{
    console.log("wrong");

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();

    }




}

function nextSequence() {

  userClickedPattern= [];

  level++;

  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

};
// $("#yellow").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
// var playSound = new Audio ("sounds/" + randomChosenColour + ".mp3");
// playSound.play();
function playSound(name) {
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
  $("#" + currentColour).removeClass("pressed")
  }, 100);
}

// Create a new function called checkAnswer(), it should take one input with the name currentLevel



function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

}
