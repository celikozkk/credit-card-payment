import React from "react";
import CreditCardBack from "./CreditCardBack";
import CreditCardFront from "./CreditCardFront";
import "../styles/CreditCard.css";

export default function CreditCard(props) {
  const { cardNumber, expirationDate, ccv } = props.card;
  const width = props.width;

  return (
    <div className="container" style={{ width: width, height: width / 1.586 }}>
      <div id="card-container" className="card-container" >
        <CreditCardFront
          cardNumber={cardNumber}
          onCardNumberChange={props.onCardChange} />

        <CreditCardBack
          expirationDate={expirationDate}
          onExpirationDateChange={props.onCardChange}

          ccv={ccv}
          onCcvChange={props.onCardChange} />
      </div>
    </div>
  )
}