import React from "react";
import CreditCardBack from "./CreditCardBack";
import CreditCardFront from "./CreditCardFront";

export default function CreditCard(props) {
  const { cardNumber, expirationDate, ccv } = props.card;

  return (
    <div>
      <CreditCardFront
        cardNumber={cardNumber}
        onCardNumberChange={props.onCardChange} />

      <CreditCardBack
        expirationDate={expirationDate}
        onExpirationDateChange={props.onCardChange}

        ccv={ccv}
        onCcvChange={props.onCardChange} />
    </div>
  )
}