import movies from './movies.js';
import * as utils from './utils.js';


const search = utils.getElement('movie-search');
const button = utils.select('button');
const posterImage = utils.select('.poster');
const movieTitle = utils.select('.movie-title');
const movieInfo = utils.select('.movie-info');
const movieDescription = utils.select('.movie-description');
const movieGenres = utils.select('.genres');

//Movie Search Suggestion Links
const suggest1 = utils.getElement('suggestion1');
const suggest2 = utils.getElement('suggestion2');
const suggest3 = utils.getElement('suggestion3');


//Generate an Array of Titles
const titles = [];
const lowerTitles = [];
movies.forEach(movie => {
    titles.push(movie.title);
    lowerTitles.push(movie.title.toLocaleLowerCase());
});


//Make Genres more Presentable
//Turn into Divs later?
function cleanGenres(genres){
  let gen = genres.join(" - ");
  return gen;
}


//If the Title is Found, Display Movie
function searchMovie(){
  let title = search.value;
  if (!lowerTitles.includes(title.toLowerCase())){
    // console.log(title);
    // console.log(titles);
    console.log('not found');
  }
  else{
    displayMovie(title);
  }
}


//Clear and Hide Values
function reset(){
  hide(suggest1);
  hide(suggest2);
  hide(suggest3);
  search.value = '';
}

//Display Movie Information
function displayMovie(title){

  const display = movies.find(movie => movie.title === title);
  let year = display.year;
  let description = display.description;
  const genres = cleanGenres(display.genre);
  let posterLink = display.poster;

  posterImage.src = posterLink;
  movieTitle.innerText = title;
  movieInfo.innerText = year;
  movieDescription.innerText = description;
  movieGenres.innerText = genres;

  reset();
}

//Filter Titles
//Returns array of titles, filtered by search word
function filterTitlesByWord(word){
  const filteredTitles = [];
  titles.forEach(film => {
    if (film.toLowerCase().startsWith(word)){
      filteredTitles.push(film);
    }
  });
  return filteredTitles;
}

//Check the letters in the input box
//Returns list of filtered titles
function searchInput(){
  let word = search.value.toLowerCase();
  if (word.length > 2 && typeof word === 'string'){
    const filteredTitles = filterTitlesByWord(word);
    displaySuggestions(filteredTitles);
    }
} 


//Hide Element
function hide(element){
  element.style.visibility = 'hidden';
}
//Show Element
function show(element){
  element.style.visibility = 'visible';
}

//Check if Function Works
function print(){
  console.log('here');
}

//Show Suggestions
function displaySuggestions(array){
  let arrayLength = array.length;
  let elementArray = [suggest1, suggest2, suggest3];
  hide(suggest1);
  hide(suggest2);
  hide(suggest3);

  //Show First 3 Suggestions
  for (let i = 0; i < arrayLength; i++){
    let element = elementArray[i];
    show(element);
    element.innerText = array[i];
    element.addEventListener('click', () => {
      search.value = element.innerText;
    });

    if (i===2){
      break
    }
  }
}

//Event Listeners
utils.listen('click', button, searchMovie);
utils.listen('input', search, searchInput);

/* Unused Section for Key Rush */


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









