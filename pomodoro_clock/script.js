var breakLength = 5;
var sessionLength = 25;

$("#break-time").find("button").click(function() {
  val = $(this).val();
  if ( val == "+") {
    breakLength++;
    $("#break-length").text(breakLength);
  } else {
    breakLength--;
    $("#break-length").text(breakLength);
  } 
});

$("#session-time").find("button").click(function() {
  val = $(this).val();
  if ( val == "+") {
    sessionLength++;
    $("#session-length").text(sessionLength);
  } else {
    sessionLength--;
    $("#session-length").text(sessionLength);
  } 
});

var dealthLine = new Date().getTime() + sessionLength * 60 * 1000;
var checkPoint = "sessionRunning";

function getTimeLeft(){
  var now = new Date().getTime();
  var timeLeft = dealthLine - now;
  var min = Math.floor(timeLeft / 1000 / 60);
  var sec = Math.floor((timeLeft / 1000) % 60);

  return {
    "timeLeft": timeLeft,
    "min": min,
    "sec": sec
  };
}

function startClock() {
  timeInterval = setInterval(function() {
    var t = getTimeLeft(dealthLine);
    document.getElementById("timeLeft").innerHTML = t.min + ":" + t.sec;
    
    //If timer reaches zero, stop the timer and reset the clock
    if (t.timeLeft <= 0) {
      clearInterval(timeInterval);
      if ( checkPoint == "sessionRunning") {
        startBreak();
      } else {
        startSession();
      }
    }
  }, 1000);
}
  
function startBreak() {
  dealthLine = new Date().getTime() + breakLength * 60 * 1000;
  $("#current").text("BREAK");
  checkPoint = "breakRunning";
  startClock();
}

function startSession() {
  dealthLine = new Date().getTime() + sessionLength * 60 * 1000;
  $("#current").text("SESSION");
  checkPoint = "sessionRunning";
  startClock();
}
var isPause = true;
$("#timing").click(function() {
  if (isPause) {
    $("#status").text("Click to Stop!");
    isPause = false;
    startClock();
  } else {
    $("#status").text("Click to Start!");
    isPause = true;
    clearInterval(timeInterval);
  }
});

$("#reset").click(function() {
  clearInterval(timeInterval);
  $("#timeLeft").text(sessionLength + ":" + "00");
  isPause = true;
  $("#status").text("Click to Start!");
  dealthLine = new Date().getTime() + sessionLength * 60 * 1000;
});