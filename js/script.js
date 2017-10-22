// Globala variabler

var wordList = ['BLUES', 'RANGERS', 'HURRICANES', 'PENGUINS', 'KINGS', 'BRUINS', 'JETS', 'GOLDEN KNIGHTS', 'MIGHTY DUCKS', 'MAPLE LEAVES', 'LIGHTNING', 'BLACK HAWKS']; // Lista med spelets alla ord
var clues = ['St Louis', 'New York', 'Carolina', 'Pittburgh', 'Los Angeles', 'Boston', 'Winnipeg', 'Las Vegas', 'Anaheim', 'Toronto', 'Tampa Bay', 'Chicago'];

var hint;
var selectedWord; // Ett av orden valt av en slumpgenerator
var letterBoxes; //Rutorna där bokstäverna ska stå   //
var hangmanImg; //Bild som kommer vid fel svar
var hangmanImgNr; // Vilken av bilderna som kommer upp beroende på hur många fel du gjort
var msgElem; // Ger meddelande när spelet är över
var startGameBtn; // Knappen du startar spelet med
//var letterButtons = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö']
var startTime; // Mäter tiden
var hangmanLives = 6;
//var guessesLeft = 6;
var score = 0;
//var letter;

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
	
	modal()

	randomWord();
	numberOfTiles();
	document.querySelector('#startGameBtn').disabled = true;
		document.getElementById('hangman').src = "images/h6.png";
	document.querySelector('#message').innerHTML = 'You have 6 guesses left!';
}


//funktion som ger en ledtråd baserat på ordet
function clue(){
		

	//for (let i = 0; i < selectedWord.length; i++){
	//	if (wordList = clues[i]){
	//	document.querySelector('#message').innerHTML = "The team plays for the city of " + clues[i];
	//	}
	//}
	
	
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
				}
			}
			
		}

	} else {
		hangmanLives--;
		incorrectGuess();
		this.disabled = true;
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

function modal() {
	document.querySelector('#modal').style.display = block;

}

//todo: modal popup