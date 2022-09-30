import React from "react";
import visaLogo from '../assets/visa.png';
import mastercardLogo from '../assets/mastercard.png';
import "../styles/CreditCardFront.css";

export default function CreditCardFront(props) {
  const inputElements = [];
  const getCardType = () => {
    if (props.cardNumber.join('').length === 16) {
      if (props.cardNumber[0][0] === "4") return visaLogo;
      else if (props.cardNumber[0][0] === "5") return mastercardLogo;
    }
    return ""
  }

  const isInputValid = (e) => {
    // allow only keyboard insert and backspace
    if (!(e.nativeEvent.inputType === "insertText" || e.nativeEvent.inputType === "deleteContentBackward")) return false;
    // allow only numbers
    if (isNaN(e.nativeEvent.data) || e.nativeEvent.data === " ") return false;
    return true;
  }

  const handleInputChange = (e) => {
    if (!isInputValid(e)) return;

    if (e.target.value.length === 4) {
      document.getElementById(e.target.dataset.nextinput)?.focus();
    }
    else if (e.target.value.length === 0) {
      document.getElementById(e.target.dataset.previnput)?.focus();
    }
    props.onCardNumberChange(e);
  }

  const getInputType = (index) => {
    if (index === 1 || index === 2) return "password"
    else return "text";
  }

  for (let i = 0; i < props.cardNumber.length; i++) {
    inputElements.push(
      <input
        key={"cardInput" + i}
        id={"cardInput" + i}
        className="cardInput"
        type={getInputType(i)}
        value={props.cardNumber[i]}
        onChange={handleInputChange}
        placeholder={i.toString().repeat(4)}
        inputMode={"numeric"}

        maxLength={4}
        data-inputtype="cardinput"
        data-inputindex={i}
        data-previnput={"cardInput" + (i - 1)}
        data-nextinput={"cardInput" + (i + 1)}
        onFocus={(e) => e.target.select()}
      />
    )
  }

  return (
    <div className="card-layout card-front">
      <div className="card-type">
        <div className="card-type-image-container">
          <img src={getCardType()} />
        </div>
      </div>

      <div className="cardnumber-container">
        <div className="card-label">CARD NUMBER</div>
        <div className="cardnumber-inputs">
          {inputElements}
        </div>
      </div>
    </div>
  )
}