// CardPic.js
function CardPic(props) {

    // create a click event to attach the cardBack to the cardFront
    // pass this value into the choices useState in Display.js so that it can be compared
    const handleClick = function() {
        if (!props.disabled) {
            // access the function handed down to this component from Display.js
            props.handleChoice(props, props.id)
        }
    }

    return (
        <div 
            className="indivCard animate__animated animate__fadeIn animate__slower" 
            onClick={ !props.disabled ? props.clickCounter : null }
        >
                <img 
                    className="cardFront" 
                    src={props.img} 
                    alt={props.alt} 
                    id={props.id} 
                />

                <img 
                    className={ props.flipped ? 'flipped' : 'cardBack' }
                    src="/assets/newCardBack.jpg" 
                    alt="card back" 
                    onClick={handleClick}
                    disabled={props.disabled}
                /> 
        </div>
    )
}

export default CardPic;