import React from "react";

export default function CreditCardFront(props) {
  const getCardType = () => {
    if (props.cardNumber[0] === "4") return "M";
    else if (props.cardNumber[0] === "5") return "V";
    else return "N"
  }

  return (
    // TODO: div in background una sketch veya css
    <div className="creditCardFront">
      {/* <img src={getCardImage()} /> */}
      <p>{getCardType()}</p>
      <input type="text" value={props.cardNumber} onChange={props.onCardNumberChange} />
    </div>
  )
}