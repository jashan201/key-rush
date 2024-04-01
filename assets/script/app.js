// import classes from './class.js';
// import * as utils from './utils.js';



//Document Objects
const startButton = document.getElementById('start-button');
const input = document.getElementById('input');
const wordDisplay = document.getElementById('word-display');
const timer = document.getElementById('timer');

//Variables and Constants
const listOfWords = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
'keyboard', 'window'];

let currentWords = [];
let gameStart = false;




//Reset Values for Start of Game
function startGameReset(){
  gameStart = true;
}


//Load Words into a new Array
function loadWords(){
  const blankArray = []
  for (let i = 0; i < words.length; i++){
    blankArray.push(words[i]);
  }
  return blankArray;
}

//Get a Random Word from an Array
//Returns that word
function getRandomWord(array){
  let num = (Math.floor(Math.random()*array.length))+1;
  let word = array[num];
  return word;
}
//Remove Word From an Array
//Returns array without the word
function removeWordFrom(array, wordToRemove){
  const arrayMinusWord = array.filter(keep => keep !== wordToRemove);
  return arrayMinusWord;
}
//Display Current Word
function displayWord(word){
  wordDisplay.innerText = word;
}



// //Create End of Timer
// function createEndOfTimer(now, gameLength){
//   let endTimer = new Date(now);
//   endTimer.setSeconds(endTimer.getSeconds() + gameLength);
//   return endTimer;
// }

// //Create Current Time
// function currentTime(){
//   const now = new Date();
//   return now;
// }

// //Compare Time
// function compareTime(now,endTimer){
//   let currentSeconds = now.getSeconds();
//   let endSeconds = endTimer.getSeconds();
  
//   if(currentSeconds===endSeconds){
//     return true;
//   }
//   return false;
// }


//Create Intreval Timer
function createTimer(gameLength) {
  const interval = setInterval(function() {
      timer.innerText = gameLength;
      gameLength--;
      if (gameLength <= 0) {
          clearInterval(interval);
      }
  }, 1000); 
}

//Inital Setup For Game
function startGame(){
  //Game Length in Seconds
  let gameLength = 3;
  startGameReset();
  //Timers
  createTimer(gameLength);



}


//Event Listeners
startButton.addEventListener('click',startGame);


