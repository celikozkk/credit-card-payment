import React, { useState } from "react";
import CreditCard from "../components/CreditCard";

export default function PaymentPage(props) {
  const [card, setCard] = useState({
    cardNumber: new Array(4).fill(""),
    expirationDate: { year: "", month: "" },
    ccv: ""
  });

  const [cardFace, setCardFace] = useState(0);

  const handleFlipClick = (e) => {
    if (cardFace === 0) {
      // @ts-ignore
      document.getElementById("card-container").style.transform = "rotateY(180deg)";
      setCardFace(1);
    } else {
      // @ts-ignore
      document.getElementById("card-container").style.transform = "rotateY(0deg)";
      setCardFace(0);
    }

  }

  const handlePayClick = (e) => {
    console.log(card);
  }

  const handleCardChange = (e) => {
    setCard((prev) => {
      let updatedValue = {}
      switch (e.target.dataset.inputtype) {
        case "date":
          const prevDate = { ...prev.expirationDate }
          prevDate[e.target.id] = e.target.value;
          updatedValue = { expirationDate: prevDate }
          break;

        case "ccv":
          updatedValue = { ccv: e.target.value }
          break;

        case "cardinput":
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
      <CreditCard card={card} onCardChange={handleCardChange} width={500} />
      <button className="flip-button" onClick={handleFlipClick}>Flip</button>
      <button className="pay-button" onClick={handlePayClick}>Pay</button>
    </div>
  )
}