import React, { useState } from "react";
import CreditCard from "../components/CreditCard";

export default function PaymentPage(props) {
  const [card, setCard] = useState({
    cardNumber: new Array(16).fill(""),
    expirationDate: { year: "", month: ""},
    ccv: ""
  });

  const handleFlipClick = (e) => {

  }

  const handlePayClick = (e) => {

  }

  const handleCardChange = (e) => {
    setCard((prev) => {
      let updatedValue = {}
      switch (e.target.dataset.inputtype) {
        case "date":
          const prevDate = {...prev.expirationDate}
          prevDate[e.target.id] = e.target.value;
          updatedValue = { expirationDate: prevDate }
          break;
          
        case "ccv":
          updatedValue = { ccv: e.target.value }
          break;

        case "carddigit":
          const prevCardNumber = [...prev.cardNumber]
          prevCardNumber[e.target.dataset.inputindex] = e.target.value;
          updatedValue = { cardNumber: prevCardNumber };
          break;

        default:
      }
      return { ...prev, ...updatedValue }
    })
  }

  return (
    <div className="PaymentPage">
      <CreditCard card={card} onCardChange={handleCardChange} />
      <button onClick={handleFlipClick}>Flip</button>
      <button onClick={handlePayClick}>Pay</button>
    </div>
  )
}