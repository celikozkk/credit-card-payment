import React, {useState } from "react";
import CreditCard from "../components/CreditCard";

export default function PaymentPage(props) {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [ccv, setCcv] = useState("");

  const card = {cardNumber, expirationYear, expirationMonth, ccv};

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  }

  const handleExpirationYearChange = (e) => {
    setExpirationYear(e.target.value);
  }

  const handleExpirationMonthChange = (e) => {
    setExpirationMonth(e.target.value);
  }

  const handleCcvChange = (e) => {
    setCcv(e.target.value);
  }

  return (
    <div className="PaymentPage">
      <CreditCard card={card}
        onCardNumberChange={handleCardNumberChange}
        onExpirationYearChange={handleExpirationYearChange}
        onExpirationMonthChange={handleExpirationMonthChange}
        onCcvChange={handleCcvChange} />
      <button>Flip</button>
      <button>Pay</button>
    </div>
  )
}