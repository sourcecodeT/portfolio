var oriBoard;
const  huPlayer = "0";
const aiPlayer = "X";
const winCombos = [
  	[0, 1, 2],
  	[3, 4, 5],
 	  [6, 7, 8],
  	[0, 3, 6],
  	[2, 5, 8],
  	[0, 4, 8],
	  [2, 4, 6],
	  [1, 4, 7]
];

const cells = document.querySelectorAll(".cell");

// var for result

var compScore = 0;
var tie = 0;
var yourScore = 0;

//
startGame();

function restartGame() {
  compScore = 0;
  tie = 0;
  yourScore = 0;
  $("#compScore").text(0);
  $("#tie").text(0);
  $("#yourScore").text(0);
  startGame();
}


function startGame() {
  	document.querySelector(".endGame").style.display = "none";
  	oriBoard = Array.from(Array(9).keys());
  	// console.log(oriBoard);
  	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = "";
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
  	}
}

function turnClick(square) {
	// console.log(square.target.id);
	if (typeof oriBoard[square.target.id] == "number") {
		turn(square.target.id, huPlayer);
		if (!checkWin(oriBoard, huPlayer) && !checkTie()) {
			turn(bestSpot(), aiPlayer);
		} 
	}
}

function turn(squareId, player) {
	oriBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(oriBoard, player);
	if (gameWon) {
		gameOver(gameWon);
		// console.log(gameWon);
	}

}	

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	// console.log(plays);
	let gameWon = null;

	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {"index": index, "player": player};
			break;
		}
	}

	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor = 
			gameWon.player == huPlayer ? "blue" : "red";	
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener("click", turnClick, false);
	}

	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose!");
}

function declareWinner(who) {
	document.querySelector(".endGame").style.display = "block";
	document.querySelector(".endGame .text").innerText = who;
  if ( who == "You win!") {
    yourScore++;
    $("#yourScore").text(yourScore);
  } else if ( who == "You lose!") {
    compScore++;
    $("#compScore").text(compScore);
  } else {
    tie++;
    $("#tie").text(tie);
  }
}

function emptySquares() {
	return oriBoard.filter(s => typeof s == "number");
}

function bestSpot() {
	return minimax(oriBoard, aiPlayer).index;
	// return emptySquares()[0];
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}

		declareWinner("Tie Game!");
		return true;
	}

	return false;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares(newBoard);
	
	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if(checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if(availSpots.length === 0) {
		return {score: 0};
	}

	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}
	
		newBoard[availSpots[i]] = move.index;
	
		moves.push(move);
	}

	
	var bestMove;
	if (player === aiPlayer) {
		var bestScore = -10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}


















