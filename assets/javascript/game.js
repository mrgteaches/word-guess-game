

var list = [        //Word list: 16 words
    "helado",
    "pastel",
    "queso",
    "leche",
    "mantequilla",
    "pan",
    "carne",
    "pollo",
    "cordero",
    "pescado",
    "naranja",
    "manzana",
    "verduras",
    "ensalada",
    "cebolla",
    "papa",
];


var guessedLetters = [];    // Stores the letters guessed already
var currentWordIndex;       // Index of the current word
var guessingWord = [];      // Word being built to match the current word
var remainingGuesses = 10;   // How many tries a player has left
var wins = 0;               // How many wins earned

// Reset variables

function resetGame() {
    console.log ('reset game');
    currentWordIndex = Math.floor(Math.random() * (list.length));
    guessedLetters = [];
    guessingWord = [];

    for (var i = 0; i < list[currentWordIndex].length; i++) {
        guessingWord.push(" _ ");
    }

    /*
    document.getElementById("tryAgain").style.cssText = "display: none";   // Hide gameover and win text
    document.getElementById("gameover").style.cssText = "display: none";
    document.getElementById("youwin").style.cssText = "display: none";
*/
    updateDisplay();

}; //ends reset

resetGame();

function updateDisplay()    {  
    console.log ('update display');                                             // Updates the display on the HTML 
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;

    if(remainingGuesses <= 0) {
        document.getElementById("gameover").style.cssText = "display: block";
        document.getElementById("tryAgain").style.cssText = "display:block";
        hasFinished = true;
    }

}; //ends update display

document.onkeyup = function(event) {
    console.log ('pressed key');
  /*
    if (hasFinished)  {
        resetGame();
        hasFinished = false;
    }
    else { 
     */                                                    // Checking to make sure A-Z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
   //     }
    }
    
}; // ends onkey

function makeGuess(letter) {
    console.log ('make guess , letter, ', letter);
    if (remainingGuesses > 0) {
        console.log ('remaining guesses ', remainingGuesses);
     /*
        if(!gameStarted) {
            console.log ('game is started');
            gameStarted = true;
        }
      */  
        if (guessedLetters.indexOf(letter) === -1) {            // Make sure we didn't use this letter yet
        console.log ('guessed letter pushed');
            guessedLetters.push(letter);
            evaluateGuess(letter);
            console.log ('guess has been evaluated');        }
    }
    
    checkWin();
    updateDisplay();
}; //ends makeGuess

 // This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.                                   

function evaluateGuess(letter) {                                    
    // Array to store positions of letters in string
    var positions = [];
    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < list[currentWordIndex].length; i++) {
        if(list[currentWordIndex][i] === letter) {
            positions.push(i);
            console.log("current word index pushed ", positions);
        }
    }
    // if there are no indicies, remove a guess 
    if (positions.length <= 0) {
        remainingGuesses--;
    } 
    else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
            console.log ('guessing word ', guessingWord);
        }
    }
};

function checkWin() {
    for (i = 0; i < guessingWord.length; i++) {
       if (guessingWord[i] == " _ ") {
        var blanks = 1;
       };
    };  
     if (blanks != 1) {  
        console.log ('else is running, wins ', wins);   
        document.getElementById("youwin").style.cssText = "display: block";
        document.getElementById("tryAgain").style.cssText= "display: block";
        wins++;
       }; 
}; // ends checkWin
