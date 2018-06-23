
// -----------------------------------
var gameOff = true;
$("#sw").click(function() {
  if (gameOff) {
      gameOff = false;
      onGame();
  } else {
      gameOff = true;
      offGame();
  }
});

// ------------------------------------------
var trictModeActive = false;

function onGame() {
  $("#sw").addClass("sw-on");
  $("#count").removeClass("led-off");
  $("#startGame").click(function() {
    startGame();
  });
  $(".button-wrapper > div").addClass("clickable");
    
  $("#strictMode").click(function() {
    if (trictModeActive) {
      trictModeActive = false;
      $("#trictModeLed").removeClass("led-on");
    } else {
      trictModeActive = true;
      $("#trictModeLed").addClass("led-on");
    }
  });
  
  $("#close").click(function() {
    $("#myModal").fadeOut(500);
  });
  
}

// startSequence 
// variables
var userSeq = [];
var simonSeq = [];
// var counter = 4;
var id, color, level = 0;
var boardSound = [
  'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', //green
  'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', //red
  'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', //yellow 
  'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3' //blue   
];

//startGame function
function startGame() {
  simonSequence();
  
  // add push listener
  $(".push").click(function() {
    id = $(this).attr("id");
    userSeq.push(id);
    console.log(userSeq);
    // check single user sequence
    if (!userCorrect()) {
      displayError();
      userSeq = [];
    }
    // checkin end of sequence
    if (userSeq.length == simonSeq.length) {
      $("#seqComplete-message").fadeIn(500).fadeOut(1500);
      userSeq = [];
      simonSequence();
    }
    addClassAndSound(id);
  });
  
}
// userCorrect function 
function userCorrect() {
  for (var i = 0; i < userSeq.length; i++) {
    if (userSeq[i] != simonSeq[i]) return false;
  }
  return true;
}
// displayError fucntion
function displayError() {
  var counter = 0;
  var myError = setInterval(function() {
    $("#count").text("!!");
    counter++;
    if(counter == 3) {
      $("#count").text(level);
      clearInterval(myError);
      counter = 0;
    }
  }, 500);
  
  if (trictModeActive) {
    simonSeq = [];
    for (var i = 0; i < level; i++) {
      getRandomNum();
    }
    displaySimonSeq();
  } else {
    displaySimonSeq();    
  }
}

//display sequence
function displaySimonSeq() {
  var i = 0;
  var myInterval = setInterval(function() {
    id = simonSeq[i];
    addClassAndSound(id);
    
    i++;
    if (i == simonSeq.length) {
        clearInterval(myInterval);
    }
  }, 1000);  
}

// startSeqence funciton
function simonSequence() {
  level++;
  console.log(level);
  $("#count").text(level);
  getRandomNum();
  displaySimonSeq();
}

// generate random number
function getRandomNum() {
  var random = Math.floor(Math.random() * 4);
  simonSeq.push(random);
}
// add class and temp sound
function addClassAndSound(id) {
  $("#" + id).addClass("light");
  playSound(id);
  setTimeout(function() {
    $("#" + id).removeClass("light");
  }, 500);
}
// play sound
function playSound(id) {
  var sound = new Audio(boardSound[id]);
  sound.play();
}
//-----------------------------------------------------------------

function strictModeOn() {
  $("#trictModeLed").addClass("led-on");
  trictModeActive = true;
}

function strictModeOff() {
  $("#trictModeLed").removeClass("led-on");
  trictModeActive = false;
}

// ---------------------------------------------------------------------\

function offGame() {
  $("#count").addClass("led-off");
  $("#sw").removeClass("sw-on");
  $(".button-wrapper > div").removeClass("clickable");
  $("#strictMode").off("click");
}


