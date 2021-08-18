var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"]

var level = 0;

// game starter 

var started = false;

$(this).keydown(function() {
    if (started === false) {
        started = true;
        $("#level-title").text("Level " + level);
        nextSequence();
        console.log(started);
    }
});


// random pattern generator 

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);


}

// user behavior

$(".btn").on("click", function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
    var currentColourSelected = "#" + currentColour;
    $(currentColourSelected).addClass("pressed");
    setTimeout(function() {
        $(currentColourSelected).removeClass("pressed");
    }, 100);
}

// play sound 

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("wrong");
    }
}

function startOver() {
    started = false;
    gamePattern = [];
    level = 0;
}