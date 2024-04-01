// import classes from './class.js';
// import * as utils from './utils.js';

//Document Objects
const startButton = document.getElementById('start-button');
const input = document.getElementById('input');
const wordDisplay = document.getElementById('random-word');
const timer = document.getElementById('timer');
const hits = document.getElementById('hits');

//List of Words, Move?
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


//Game Variables
let currentWords = [];
let gameStart = false;
let text = "";
let currentWord = "";
let hitsCounter = 0;
let changeWord = false;
input.disabled = true;
let score = 0;
//Set Game Length in Seconds
let gameLength = 10;

//Audio
const bgMusic = new Audio('./assets/audio/bgmusic.mp3');
bgMusic.type = 'audio/mp3';


//Reset Values for Start of Game
function startGameReset(){
  //Basic Variables and ELements to Reset
  hitsCounter = 0;
  hits.innerText = (`Hits: ${hitsCounter}`)
  gameStart = true;
  input.disabled = false;
  input.value = "";
  startButton.disabled = true;
  score = 0;
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
//Remove Word From an Array
//Returns array without the word
function removeWordFrom(wordToRemove){
  currentWords = currentWords.filter(keep => keep !== wordToRemove);
}
//Display Current Word
function displayWord(word){
  wordDisplay.innerText = word;
}

//Create Interval Timer
function createTimer(gameLength) {
  const interval = setInterval(function() {
      timer.innerText = gameLength;
      gameLength--;
      if (gameLength <= 0) {
        timer.innerText = gameLength;
        timerEnded();
        clearInterval(interval);
      }
  }, 1000); 
}

//Timer Ended, Game Ends
function timerEnded(){
  gameStart = false;
  input.disabled = true;
  startButton.innerText = 'Reset';
  startButton.disabled = false;
  stopMusic();

  //Change Display Area Later
  wordDisplay.innerText = (`Your Score is ${score}`);
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
  console.log(text,currentWord);
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
      hits.innerText = (`Hits: ${hitsCounter}`)
    }

    //Change Word if Needed
    if(changeWord){
      currentWord = getRandomWord(currentWords);
      removeWordFrom(currentWord);
      displayWord(currentWord);
      changeWord = false;
    }
    
  }
}

//Stop Music and Fade Out
function stopMusic() {
  fadeOut = setInterval(function() {
      if (bgMusic.volume > 0) {
        bgMusic.volume = Math.max(bgMusic.volume-0.1, 0);
      } 
      else {
          clearInterval(fadeOut);
      }
  }, 100); 
}

//Event Listeners
startButton.addEventListener('click',startGame);
input.addEventListener('input', getInput);

