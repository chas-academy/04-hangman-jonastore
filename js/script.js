// Globala variabler

var wordList = ['Blues', 'Rangers', 'Hurricanes', 'Pengiuns', 'Kings', 'Bruins', 'Jets']; // Lista med spelets alla ord
var selectedWord; // Ett av orden valt av en slumpgenerator
var letterBoxes; //Rutorna där bokstäverna ska stå   // = selectedWord.length
var hangmanImg; //Bild som kommer vid fel svar
var hangmanImgNr; // Vilken av bilderna som kommer upp beroende på hur många fel du gjort
var msgElem = ['Du har förlorat.', 'Du har vunnit!']; // Ger meddelande när spelet är över
var startGameBtn; // Knappen du startar spelet med
var letterButtons; // Knapparna för bokstäverna
var startTime; // Mäter tiden

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
var gameStart = function(){
		return randomWord() + numberOfTiles();
}

document.getQuerySelector('#startGameBtn').addEventListener('click' gameStart);

// Funktion som slumpar fram ett ord
var randomWord = function() {
	selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
	return selectedWord;
};
 
// Funktionen som tar fram bokstävernas rutor, antal beror på vilket ord
var numberOfTiles = function() {
	letterBoxes = selectedWord.length;
	return letterBoxes;
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
var btnClick = function() {
	document.getQuerySelector('.btn')//???
};


// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det
//OM vinst så kalla på msgElem[0] OM förlust kalla på msgElem[1] och 
//Kör disable på alla knappar så att spelaren måste trycka på start igen för att slumpa fram ett nytt ord.


// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
//OM bokstaven är vald SÅ add innerHTML diabled på slutet av elementet