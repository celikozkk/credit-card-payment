import React, { useState } from "react";
import CreditCard from "../components/CreditCard";
import Toast from "../components/Toast";

export default function PaymentPage(props) {
  const [card, setCard] = useState({
    cardNumber: new Array(4).fill(""),
    expirationDate: { year: "", month: "" },
    ccv: ""
  });

  const [cardFace, setCardFace] = useState(0);
  const [payButtonOptions, setPayButtonOptions] = useState({
    text: "Pay",
    disabled: false
  });
  const [toastOptions, setToastOptions] = useState({});

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
    setPayButtonOptions({text: "Processing", disabled: true});

    fetch('https://mocki.io/v1/a5ae8585-b42d-486b-a4ff-25ebfebbaddf')
      .then((response) => response.json())
      .then((cards) => {
        const cardToQuery = {
          number: card.cardNumber.join(''),
          exp: card.expirationDate.month + "/" + card.expirationDate.year.slice(2),
          ccv: card.ccv
        }

        const cardExist = cards.some(card => {
          return card.number === cardToQuery.number &&
                 card.exp === cardToQuery.exp &&
                 card.ccv === cardToQuery.ccv
        });
    
        if (cardExist) {
          setToastOptions({
            message: "Payment successful",
            type: "success"
          });
        }
        else {
          setToastOptions({
            message: "Payment failed",
            type: "danger"
          });
        }

        setTimeout(() => {
          setPayButtonOptions({text: "Pay", disabled: false});
        }, 500);
      })
      .catch((error) => {
        console.error(error);

        setTimeout(() => {
          setPayButtonOptions({text: "Pay", disabled: false});
        }, 500);
      });

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
      <h1 className="card-font" style={{textAlign: "center"}}>Payment Information</h1>
      <CreditCard card={card} onCardChange={handleCardChange} width={400} />

      <button className="flip-button" onClick={handleFlipClick}>Flip</button>

      <button disabled={payButtonOptions.disabled} 
              className={`pay-button ${payButtonOptions.disabled ? 'button-disabled' : ''}`} 
              onClick={handlePayClick}>{payButtonOptions.text}</button>

      <Toast options={toastOptions} />
    </div>
  )
}