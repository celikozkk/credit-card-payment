import React from "react";

export default function CreditCardFront(props) {
  const getCardType = () => {
    if (props.cardNumber.join('').length === 16)
    {
      if (props.cardNumber[0][0] === "4") return "Visa";
      else if (props.cardNumber[0][0] === "5") return "MasterCard";
    }
    return ""
  }

  const handleInputChange = (e) => {
    // allow only keyboard insert and backspace
    if (!(e.nativeEvent.inputType === "insertText" || e.nativeEvent.inputType === "deleteContentBackward")) return;

    // allow only numbers
    if (isNaN(e.nativeEvent.data) || e.nativeEvent.data === " ") return;

    if (e.target.value.length === e.target.maxLength) {
      document.getElementById(e.target.dataset.nextinput)?.focus();
    }
    props.onCardNumberChange(e);
  }

  return (
    // TODO: div in background una sketch veya css
    <div className="creditCardFront">
      {/* <img src={getCardImage()} /> */}
      <p>{getCardType()}</p>

      <div>
        <input 
            id="cardInput1" 
            type="text" 
            value={props.cardNumber[0]} 
            onChange={handleInputChange} 

            maxLength={4}
            data-inputtype="cardnumber"
            data-inputindex="0"
            data-nextinput="cardInput2" 
            onFocus={(e) => e.target.select()}  />

        <input 
            id="cardInput2" 
            type="password" 
            onChange={handleInputChange}
            value={props.cardNumber[1]} 

            maxLength={4} 
            data-inputtype="cardnumber"
            data-inputindex="1"
            data-nextinput="cardInput3" 
            onFocus={(e) => e.target.select()}  />

        <input 
            id="cardInput3" 
            type="password" 
            value={props.cardNumber[2]} 
            onChange={handleInputChange}

            maxLength={4} 
            data-inputtype="cardnumber"
            data-inputindex="2"
            data-nextinput="cardInput4" 
            onFocus={(e) => e.target.select()} />

        <input 
            id="cardInput4" 
            type="text" 
            value={props.cardNumber[3]} 
            onChange={handleInputChange}

            maxLength={4} 
            data-inputtype="cardnumber"
            data-inputindex="3"
            onFocus={(e) => e.target.select()} />
      </div>
      {/* <CardInputGroup cardNumber={props.cardNumber} onCardNumberChange={props.onCardNumberChange} /> */}
    </div>
  )
}