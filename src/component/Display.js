//Display.js 
import CardPic from "./CardPic.js"
import { useState, useEffect } from 'react'

function Display(props) {

    // need to set useState to keep track of the values of the cards clicked IN THIS COMPONENT--b/c it's the one that sees the 'big picture' and can compare the items
    const [ choiceOne, setChoiceOne ] = useState(null)
    const [ choiceTwo, setChoiceTwo ] = useState(null)
    const [ oneId, setOneId ] = useState('')
    const [ twoId, setTwoId ] = useState('')
    const [ disabled, setDisabled ] = useState(false)

    // create a function to pass to PosterPic.js to retrieve the value of the card that's been clicked
    const handleChoice = function (card, id) {
        // if choiceOne is set, then update choiceTwo, else update choiceOne
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
        
        // create an id state to help keep track of what cards can have the .flipped class added and when
        oneId ? setTwoId(id) : setOneId(id)
    }

    // create a useEffect that will compare choiceOne and choiceTWO values ONLY after they have been assigned
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.img === choiceTwo.img) {

                // create a .map that will target the matched attribute in props and change it to true and return it as a new array
                const matched = props.matchedCards(props.cardSelections, choiceOne.img);

                // access setFinalSelections which has been passed down as a function and we update it with the new array
                props.flippedCards(matched);
                
                reset()
            } else {
                setTimeout( () => {
                    reset()
                }, 1000)
            }

        }
    }, [ props, choiceOne, choiceTwo])


    // reset function to set choice states to null
    const reset = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setOneId('')
        setTwoId('')
        setDisabled(false)
    }


    return (
        <div className="cardContainer">
            {  
                props.cardSelections.map( (card) => {
                    return (
                        <CardPic 
                            img={card.image} 
                            alt={card.title} 
                            key={card.id}
                            id={card.id}
                            handleChoice={handleChoice}
                            flipped={ card.matched || card.id === oneId || card.id === twoId }
                            disabled={disabled}
                            clickCounter={props.movesCounter}
                        />
                    )
                })
            }
        </div>
    )
}

export default Display;