import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Display from './component/Display.js';


function App() {
  const [ apiResults, setApiResults ] = useState([])
  const [ errorMessage, setErrorMessage ] = useState('displayNone')
  const [ finalCardSelections, setFinalCardSelections ] = useState([])
  const [moves, setMoves] = useState(0)
  const [ matchedCardsTracker, setMatchedCardsTracker ] = useState(0)

  // shuffle function to shuffle the items and return a new array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array
  }
  
  // function that will map through the array to change the matched attribute so user knows what cards are matched
  const trueMatch = function(array, choice) {
    array.map( function(item) {
      if (item.image === choice) {

        setMatchedCardsTracker( matchedCardsTracker + 1)
        return item.matched = true

      } else {
        return item.image
      }
    })
    return array
  }

// create a function that will set the FinalSelections array with the newly updated array that is returned in the trueMatch()
  const updateFinalSelections = function(array) {
    setFinalCardSelections(array);
  }
  
  // handle click to display a new set of shuffled cards 
  function handleClick() {
    const shuffledApiResults = shuffleArray(apiResults)

    //take only 6 of the items from the array
    const finalApiArray = shuffledApiResults.slice(0, 6)
    
    // making a new array (ghibliMovies) with the information needed for the app (title, image, and id)
    const ghibliMovies = []

    finalApiArray.map(function (movie) {
      // create an object for each movie, and push object into the ghibliMovies array
      const movieData = {
        title: movie.title,
        image: movie.image,
        id: movie.id,
        matched: false
      }
      return (
        ghibliMovies.push(movieData)
      )
    })

    // cloning the ghibliMovies array so that we can create paired cards for users to match
    const clone = JSON.parse(JSON.stringify(ghibliMovies));

    // changing the #ids for the newly cloned array, so that each item has a unique #id
    clone.map(function (item) {
      return (
        item.id = item.id + 99
      )
    })

    // concatonating the two arrays together so that the 6 pairs of cards can be displayed on screen
    const allGhibliResults = ghibliMovies.concat(clone);

    // shuffling the 12 cards, so that the order is displayed at random
    const posterCards = shuffleArray(allGhibliResults);

    setFinalCardSelections(posterCards)

    setMatchedCardsTracker(0)
    setMoves(0)

  } //end of handleClick function
  

  // to keep track of the number of clicks the user makes
  function movesCounter() {
    setMoves (moves + 1)
  }

  // getting the API calls
  useEffect( () => {
    axios({
      url: 'https://ghibliapi.herokuapp.com/films', 
    }).then((apiData) => {

      if (apiData.status === 200 || apiData.statusText === 'OK') {
        setApiResults(apiData.data)
      } else {
        setErrorMessage('displayError')
      }
    })
  }, [])


  return (
    <div className="App">
      <header> 
        <img className='totoro' src="/assets/totoro.png" alt="picture of Totoro" />
        <h1>Do you remember Ghilbi?</h1>
      </header>

      <main className='wrapper'>
        <p className='instructions'>Test your memory! Find the matching pairs by clicking on each card to reveal it.  </p>

        <button onClick={handleClick}>New Game</button>

        <div className='gameContainer wrapper'>

          <p className={ errorMessage }>Unfortunately the website is down right now.  Please come back later to test your memory skills!  We trust that you'll remember to do so! 😉</p>

          <div className={ matchedCardsTracker === 6 ? 'userWins' : 'displayNone' }>
            <p className={ matchedCardsTracker === 6 ? 'animate__animated animate__fadeIn animate__slow' : 'displayNone' }>YOU WIN!</p>
          </div>

          <div>
            <p className={ moves === 0 ? 'displayNoneMoves' : 'displayMoves' }>Moves: { moves }</p>
          </div>

          <Display 
            cardSelections={finalCardSelections} 
            matchedCards={trueMatch} 
            flippedCards={updateFinalSelections}
            movesCounter={movesCounter}
          />
        </div> 

        <img className='totoroPic' src="/assets/totoro.png" alt="picture of Totoro" />
      </main>

      <footer>
        <p>Created and designed by <a href="sophielai.ca">Sophie Lai</a></p>
        <p>API courtesy of <a href="https://ghibliapi.herokuapp.com/#">Studio Ghibli API</a></p>
      </footer>
    </div>
  );
}

export default App;


// MVP:
  // make API call with axios
  // parse API data array into movies (the array in useState)
      // use randomizer function (component#1?) to select 6 random movies from the movies array and use setMovies sto make new array (save movie poster and id into the array)
          // use for loop to loop through each card to show a toggle-display function (component?)
              // will either display picture, show the back of the card ~ a flip function?
      // duplicate the array so that there are two sets and combine the two sets into one main array (component?)
          // use Fischer-Yates algorithm to shuffle through the cards to return a new array (component)
          // append the newly shuffled array to the DOM (component) ~ use .map()
          // using the onClick event listener, the toggle-display function will be called (previously mentioned in line 9)
          // if the opened cards have matching ids/movie poster path, then the user wins (component) ~matching cards stays facing up (have th flip function??) be disabled
                // else the user clicks to close the card and plays again