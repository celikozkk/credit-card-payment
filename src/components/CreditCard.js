import React from "react";
import CreditCardBack from "./CreditCardBack";
import CreditCardFront from "./CreditCardFront";

export default function CreditCard(props) {
  const {cardNumber, expirationYear, expirationMonth, ccv} = props.card;

  return (
    <div>
      <CreditCardFront
        cardNumber={cardNumber}
        onCardNumberChange={props.onCardNumberChange}
      />

      <CreditCardBack
        expirationMonth={expirationMonth}
        onExpirationMonthChange={props.onExpirationMonthChange}

        expirationYear={expirationYear}
        onExpirationYearChange={props.onExpirationYearChange}

        ccv={ccv}
        onCcvChange={props.onCcvChange} />
    </div>
  )
}