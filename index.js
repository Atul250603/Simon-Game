const colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var yourPattern = [];
var round=0;
function nextSequence() {
  let randomNum = Math.floor(Math.random() * 4);
  let randomColor = colors[randomNum];
  $(`div.${randomColor}`).fadeOut().fadeIn();
  gamePattern.push(randomColor);
    round=round+1;
  $("h1#level-title").html(`Level ${round}`);
}
function addtoPattern(color){
    yourPattern.push(color);
}
function checkAnswer(){
    for(let i=0;i<yourPattern.length;i++){
        if(gamePattern[i]!==yourPattern[i])return false;
    }
    return true;
}
function restart(){
    yourPattern=[];
    gamePattern=[];
    round=0;
    $("h1#level-title").html("Game Over, Press Any Key to Restart");
    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(
        ()=>{
            $("body").removeClass("game-over");
        },
    200)
}
function nextRound(){
    yourPattern=[];
    nextSequence();
}
$("div.btn").on("click", function () {
    playSound(`sounds/${this.classList[1]}.mp3`);
    $(`div#${this.classList[1]}`).addClass("pressed");
    setTimeout(()=>{ $(`div#${this.classList[1]}`).removeClass("pressed");},100)
    addtoPattern(this.classList[1]);
    let flag = checkAnswer();
    if (flag===false) {
     restart();
    } 
    else {
      if (yourPattern.length === round) {
          nextRound();
      }
    }
  });
$(document).on("keypress", function (e) {
  if (e.key!=null) {
    nextSequence();
  }
});
function playSound(audioPath){
    let sound=new Audio(audioPath);
    sound.play();
}