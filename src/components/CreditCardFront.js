import React from "react";

export default function CreditCardFront(props) {
  const digits = [];

  const getCardType = () => {
    if (props.cardNumber.length === 16) {
      if (props.cardNumber[0] === "4") return "Visa";
      else if (props.cardNumber[0] === "5") return "MasterCard";
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

  const getInputType = (index) => {
    if ([4,5,6,7,8,9,10,11].includes(index)) return "password";
    else return "text";
  }

  for (let i = 0; i < 16; i++) {
    digits.push(
      <input
        key={i}
        id={"cardInput" + i}
        className="cardInput"
        type={getInputType(i)}
        onChange={handleInputChange}

        maxLength={1}
        data-inputtype="carddigit"
        data-inputindex={i}
        data-nextinput={"cardInput" + (i + 1)}
        onFocus={(e) => e.target.select()} />
    )
  }

  return (
    // TODO: div in background una sketch veya css
    <div className="creditCardFront">
      {/* <img src={getCardImage()} /> */}
      <div className="cardType">{getCardType()}</div>

      <div className="cardInputContainer">
        {digits}
      </div>
    </div>
  )
}