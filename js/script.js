// Globala variabler

var wordList = ['Blues', 'Rangers', 'Hurricanes', 'Pengiuns', 'Kings', 'Bruins', 'Jets']; // Lista med spelets alla ord
var selectedWord; // Ett av orden valt av en slumpgenerator
var letterBoxes; //Rutorna där bokstäverna ska stå   // = selectedWord.length
var hangmanImg; //Bild som kommer vid fel svar
var hangmanImgNr; // Vilken av bilderna som kommer upp beroende på hur många fel du gjort
var msgElem; // Ger meddelande när spelet är över
var startGameBtn; // Knappen du startar spelet med
var letterButtons; // Knapparna för bokstäverna
var startTime; // Mäter tiden

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
	var letterButtons = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö']
	var wordList = ['Blues', 'Rangers', 'Hurricanes', 'Pengiuns', 'Kings', 'Bruins', 'Jets']; // Lista med spelets alla ord
	

	startGameBtn;
	letterButtons;
	
	document.querySelector('#startGameBtn').onclick = gameStart;
	document.querySelector('#letterButtons').onclick = btnClick;

} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function gameStart(){
	
	randomWord();
	numberOfTiles();

	document.getElementById('hangman').src = "images/h0.png";

}



// Funktion som slumpar fram ett ord
function randomWord() {
	selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
	return selectedWord;
};
 
// Funktionen som tar fram bokstävernas rutor, antal beror på vilket ord
function numberOfTiles() {
	
	var tile = [];

	for (var i = 0; i < selectedWord.length; i++){
		tile[i] = '<input type="text" value="&nbsp;" />'; //för varje bokstav i selectedWord ska tile få ett html-element.
	}
	document.querySelector('#letterBoxes').innerHTML = tile;

	return letterBoxes;
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function btnClick() {

	console.log('button click successful')
	return;
};


// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det
//OM vinst så kalla på msgElem[0] OM förlust kalla på msgElem[1] och 
//Kör disable på alla knappar så att spelaren måste trycka på start igen för att slumpa fram ett nytt ord.


// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
//OM bokstaven är vald SÅ add innerHTML disabled på slutet av elementet