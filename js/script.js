// Globala variabler

// var wordList = ['BLUES', 'RANGERS', 'HURRICANES', 'PENGUINS', 'KINGS', 'BRUINS', 'JETS']; // Lista med spelets alla ord
var wordList = ['CHAS ACADEMY']; // Lista med spelets alla ord
var selectedWord; // Ett av orden valt av en slumpgenerator
var letterBoxes; //Rutorna där bokstäverna ska stå   //
var hangmanImg; //Bild som kommer vid fel svar
var hangmanImgNr; // Vilken av bilderna som kommer upp beroende på hur många fel du gjort
var msgElem; // Ger meddelande när spelet är över
var startGameBtn; // Knappen du startar spelet med
var letterButtons = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö']
var startTime; // Mäter tiden
//var letter;

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
	//var letterButtons = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö']
	//var wordList = ['Blues', 'Rangers', 'Hurricanes', 'Pengiuns', 'Kings', 'Bruins', 'Jets']; // Lista med spelets alla ord
	
	startGameBtn;
	letterButtons;

	
	document.querySelector('#startGameBtn').onclick = gameStart;
	//document.querySelector('#letterButtons').onclick = btnClick;





} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function gameStart(){
	
	randomWord();
	numberOfTiles();


	document.getElementById('hangman').src = "images/h0.png";

	// console.log(randomWord());	//temporär kontroll
	// console.log(numberOfTiles());
}


// Funktion som slumpar fram ett ord
function randomWord() {

	letterButtons = document.getElementsByTagName("button");
          for (let i = 0; i < letterButtons.length; i++){    
         	 letterButtons[i].onclick = btnClick;
    }

	selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
	selectedWord = selectedWord.replace(" ", "-").split("");

	
	return selectedWord;
};

 
// Funktionen som tar fram bokstävernas rutor, antal beror på vilket ord
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

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
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


		//skriv en loop så att letterIndices matchar index-platserna i selectedWord/listEls!
		for (let i = 0; i < selectedWord.length; i++){
			
			if(selectedWord[i] == letterValue){
			 	listEls[i].firstChild.value = letterValue;	
			}
			
		}

	} else {
		// gissat fel
		//wrongguess++; ???
		console.log('wrong button, hombre.')
	}

	//console.log(letterIndices)

	// 	for (let i = 0; i < selectedWord.length; i++) {
					
	// 		var index = selectedWord.indexOf(letterValue);			
			
	// 		if (letterValue === selectedWord[i]){		//  selectedWord.indexOf(letterValue)
	// 			document.querySelector('#letter').value = letterValue;
	// 			document.querySelector('#letter').id = index;
	// 			console.log(index);
	// 		}

	// 		//TA FRAM ARRAYPLATSEN PÅ BOKSTAVEN OCH SKJUT FRAM BOKSTAVEN SÅ MÅNGA STEG I INPUT???   	
	// 	console.log('RIGHT BUTTON WAS CLICKED')

	// 	if (selectedWord.indexOf(letterValue) < -1){
	// 		console.log('wrong')
	// 		console.log(index);
	// 		//mer skit här
	// 	}
	// }

	// return;

};

function correctGuess(letterIndices, guessedLetter) {

};

function incorrectGuess() {
	//IF wrongguess > 6 THEN terminate process
	// Keep track of number of guesses somehow...
};

// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det
//OM vinst så kalla på msgElem[0] OM förlust kalla på msgElem[1] och 
//Kör disable på alla knappar så att spelaren måste trycka på start igen för att slumpa fram ett nytt ord.


// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
//OM bokstaven är vald SÅ add innerHTML disabled på slutet av elementet