// Globala variabler

var wordList = ['BLUES', 'RANGERS', 'HURRICANES', 'PENGUINS', 'KINGS', 'BRUINS', 'JETS', 'GOLDEN KNIGHTS', 'MIGHTY DUCKS', 'MAPLE LEAVES', 'LIGHTNING', 'BLACK HAWKS']; // Lista med spelets alla ord


var selectedWord; // Ett av orden valt av en slumpgenerator
var letterBoxes; //Rutorna där bokstäverna ska stå   //
var startGameBtn; // Knappen du startar spelet med

	var timeCounter = setInterval(counter, 1000);

var startTime = 30;

var hangmanLives = 6;
var score = 0;

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {

	startGameBtn;
	letterButtons;

	document.querySelector('.btn').disabled = false;
	document.querySelector('#startGameBtn').onclick = gameStart;
	document.getElementById('hangman').src = "images/sticks.png";
	//document.querySelector('#letterButtons').onclick = btnClick;

} // End init

window.onload = init; //Automatically cals init()

//Function that is called when the game starts, in turn calling other functions needed to play the game.
function gameStart(){
	
	counter();
	randomWord();
	numberOfTiles();
	document.querySelector('#startGameBtn').disabled = true;
	document.getElementById('hangman').src = "images/h6.png";
	document.querySelector('#message').innerHTML = 'You have 6 guesses left!';
}


//Function that generates a random word from the wordList-array
function randomWord() {

	letterButtons = document.getElementsByTagName("button");
          for (let i = 0; i < letterButtons.length; i++){    
         	 letterButtons[i].onclick = btnClick;
    }

	selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
	selectedWord = selectedWord.replace(" ", "-").split("");

	
	return selectedWord;
};

 
//Function that generates the correct amount in input tiles according to the randomly generated word
function numberOfTiles() {
	letterBoxes = document.querySelector('#letterBoxes > ul'); //
	let letterBox;

	for (let i = 0; i < selectedWord.length; i++){
		letterBox = document.createElement('li');
		letterBox.innerHTML = '<input type="text" value="&nbsp;" id="letter"/>';
		letterBoxes.appendChild(letterBox);
	}

	return letterBoxes;
}

//Function that runs when you click each of the letter buttons
function btnClick () {
	var letterValue = this.value;

	console.log('The letter is: ', letterValue);

	var letterIndices = []; // the indices for the letter
	var letterIndex = selectedWord.indexOf(letterValue);			

	while(letterIndex !== -1) {
		letterIndices.push(letterIndex);
		letterIndex = selectedWord.indexOf(letterValue, letterIndex + 1);
	}

	if (letterIndices.length > 0) {
		let listEls = letterBoxes.children;

		console.log(letterValue + '  finns på index ', letterIndices, 'i ord-arrayen: ',  selectedWord);
		console.log(listEls);

		for (let i = 0; i < selectedWord.length; i++){
			
			if(selectedWord[i] == letterValue){
				this.disabled = true;
			 	listEls[i].firstChild.value = letterValue;
			 	score++;
			 	if (score === listEls.length){
				document.querySelector('#message').innerHTML = 'Congratulations! You won!';
				document.getElementById('hangman').src = "images/win.png";
				setTimeout(resetGame, 3500);
				clearInterval(timeCounter);
				document.querySelector('#timer').innerHTML = 'You finished with ' + startTime + ' seconds left! Good job!';
				}
			}
			
		}

	} else {
		hangmanLives--;
		incorrectGuess();
		this.disabled = true;
		clearInterval(timeCounter);
		document.querySelector('#timer').innerHTML = ' ';

	}

};

//Funtion that runs if the number of guesses surpass 6
function incorrectGuess() {
		animate();
	if (hangmanLives === 0){
		deactivateButtons();
		setTimeout(resetGame, 5000);
	};
};

//Function that animates the hangman and displays the correct messages
function animate() {

	hangManAnimation = 'images/h' + hangmanLives + '.PNG';
	document.querySelector('#hangman').src = hangManAnimation;
	document.querySelector('#message').innerHTML = 'You have ' + hangmanLives + ' guesses left!';
	if (hangmanLives === 0){
			document.querySelector('#message').innerHTML = 'You lose!';
	} 

}

// Function that deactivaes the buttons
function deactivateButtons() {
	for (i = 0; i < letterButtons.length; i++) {
		  		letterButtons[i].disabled= true;
	   }
}

function resetGame() {
	location.reload();
}


	function counter() {
				document.querySelector('#timer').innerHTML = 'You have ' + startTime + ' seconds left';	

	startTime--;
	document.querySelector('#timer').innerHTML = 'You have ' + startTime + ' seconds left';
	
	if (startTime === 0){
		deactivateButtons();
		setTimeout(resetGame, 3000);
		document.querySelector('#message').innerHTML = 'You lose!';
		document.getElementById('hangman').src = "images/h0.png";
		clearInterval(timeCounter);
		}
	}


