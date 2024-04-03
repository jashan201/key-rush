import Score from './class.js';
import * as utils from './utils.js';

//Document Objects
const startButton = utils.getElement('start-button');
const input = utils.getElement('input');
const wordDisplay = utils.getElement('random-word');
const timer = utils.getElement('timer');
const hits = utils.getElement('hits');

// List of Words, Move
const listOfWords = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana', 'perfume', 'computer', 'management', 'discovery', 'ambition', 'music',
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
'keyboard', 'window'];

//Game Variables
let currentWords = [];
let gameStart = false;
let text = "";
let currentWord = "";
let hitsCounter = 0;
let changeWord = false;
input.disabled = true;
let resetButton = false;
let score = 0;
let interval;

//Set Game Length in Seconds
let gameLength = 99;

//Audio
const bgMusic = new Audio('./assets/audio/bgmusic.mp3');
bgMusic.type = 'audio/mp3';


//Reset Values for Start of Game
function startGameReset(){
  

  //Basic Variables and ELements to Reset
  hitsCounter = 0;
  hits.innerText = (`Typos: ${hitsCounter}`)
  gameStart = true;
  input.disabled = false;
  input.value = "";
  timer.innerText = 99;
  score = 0;

  //Reset Button Turned On
  startButton.innerText = 'Reset';
  resetButton = true;

  //Audio
  bgMusic.currentTime = 0;
  bgMusic.play();
  bgMusic.volume = 1;
  //Focus on the Input

  input.focus();
}

//Load Words into a new Array
function loadWords(){
  const blankArray = []
  for (let i = 0; i < listOfWords.length; i++){
    blankArray.push(listOfWords[i]);
  }
  return blankArray;
}

//Get a Random Word from an Array
//Returns that word
function getRandomWord(array){
  let num = (Math.floor(Math.random()*array.length));
  let word = array[num];
  return word;
}

//Remove Word From an CurrentWords Array
function removeWordFrom(wordToRemove){
  currentWords = currentWords.filter(keep => keep !== wordToRemove);
}

//Display Current Word
function displayWord(word){
  wordDisplay.innerText = word;
}

//Create Interval Timer
function createTimer(gameLength) {
  clearInterval(interval);
  interval = setInterval(function() {
      timer.innerText = gameLength;
      gameLength--;
      if (gameLength <= 0) {
        timer.innerText = gameLength;
        timerEnded();
        clearInterval(interval);
      }
  }, 1000); 
}

//For Scoreboard
function calculatePercentage(){
  return Math.floor((score/listOfWords.length)*100);
}

//Timer Ended, Game Ends
function timerEnded(){
  gameStart = false;
  input.disabled = true;
  startButton.innerText = 'Start';
  startButton.disabled = false;
  resetButton = false;
  stopMusic();

  //Object
  const myScore = new Score(new Date(), hitsCounter, calculatePercentage());

  //Display Score
  wordDisplay.innerText = (`Your Score: ${myScore.percentage}%`);
}

//Inital Setup For Game
function startGame(){
  
  //Reset to Game Start
  startGameReset();

  //Timer
  createTimer(gameLength);

  //Load Words
  currentWords = loadWords();
  currentWord = getRandomWord(currentWords);
  removeWordFrom(currentWord);
  displayWord(currentWord);

}

//Get Value from Text Input
function getInput(){
  text = input.value.toLowerCase();
  if (gameStart){

    //Check Input Text vs Current Word
    if(currentWord === text){
      changeWord = true;

      //Change to Object Later
      score +=1;
      input.value = "";
    }

    else if (!currentWord.startsWith(text)) {
      changeWord = true;
      input.value = "";
      hitsCounter+=1;
      hits.innerText = (`Typos: ${hitsCounter}`)
    }

    //Change Word if Needed
    if(changeWord){
      if(currentWords.length === 0){
        timerEnded();
      } else {
      currentWord = getRandomWord(currentWords);
      removeWordFrom(currentWord);
      displayWord(currentWord);
      changeWord = false;
      }
    }
  }
}

//Stop Music and Fade Out
function stopMusic() {
  const fadeOut = setInterval(function() {
      if (bgMusic.volume > 0) {
        bgMusic.volume = Math.max(bgMusic.volume-0.1, 0);
      } 
      else {
          clearInterval(fadeOut);
      }
  }, 100); 
}

//Event Listeners
utils.listen('click', startButton, startGame);
utils.listen('input', input, getInput);
