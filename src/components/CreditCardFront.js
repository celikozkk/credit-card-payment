import React from "react";
import visaLogo from '../assets/visa.png';
import mastercardLogo from '../assets/mastercard.png';
import "../styles/CreditCardFront.css";

export default function CreditCardFront(props) {
  const digitInputs = [];
  const digitSegments = [];

  const getCardType = () => {
    if (props.cardNumber.every(c => c !== "")) {
      if (props.cardNumber[0] === "4") return visaLogo;
      else if (props.cardNumber[0] === "5") return mastercardLogo;
    }
    return ""
  }

  const handleInputChange = (e) => {
    // allow only keyboard insert and backspace
    if (!(e.nativeEvent.inputType === "insertText" || e.nativeEvent.inputType === "deleteContentBackward")) {
      e.target.value = props.cardNumber[e.target.dataset.inputindex];
      return;
    };

    // allow only numbers
    if (isNaN(e.nativeEvent.data) || e.nativeEvent.data === " ") {
      e.target.value = props.cardNumber[e.target.dataset.inputindex];
      return;
    }

    props.onCardNumberChange(e);
  }

  const handleOnKeyUp = (e) => {
    if (!isNaN(e.key) && e.key !== ' ') {
      if (e.target.value.length === e.target.maxLength) {
        document.getElementById(e.target.dataset.nextinput)?.focus();
        e.target.value = e.key;
        props.onCardNumberChange(e);
      }
    }

    if (e.keyCode === 37 || e.keyCode === 8) { // left arrow or backspace deleting
      // @ts-ignore
      document.getElementById(e.target.dataset.previnput)?.focus();
    }
    else if (e.keyCode === 39) { // right arrow
      // @ts-ignore
      document.getElementById(e.target.dataset.nextinput)?.focus();
    } 
  }

  const getInputType = (index) => {
    if ([4,5,6,7,8,9,10,11].includes(index)) return "password";
    else return "text";
  }

  for (let i = 0; i < 16; i++) {
    digitInputs.push(
      <input
        key={i}
        id={"cardInput" + i}
        className="cardInput"
        type={getInputType(i)}
        onChange={handleInputChange}
        onKeyUp={handleOnKeyUp}
        placeholder="*"
        value={props.cardNumber[i] ?? ""}

        maxLength={1}
        data-inputtype="carddigit"
        data-inputindex={i}
        data-previnput={"cardInput" + (i - 1)}
        data-nextinput={"cardInput" + (i + 1)}
        onFocus={(e) => e.target.select()} />
    )
  }

  for (let i = 0; i < digitInputs.length; i += 4) {
    const chunk = digitInputs.slice(i, i + 4);
    digitSegments.push(
      <div key={'segment' + i} className="cardnumber-inputs__segment">
        {chunk}
      </div>
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
        <div className="cardnumber-inputs">
          {digitSegments}
        </div>
      </div>
    </div>
  )
}