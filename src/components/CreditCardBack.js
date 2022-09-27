import React from "react"
import "../styles/CreditCardBack.css";

export default function CreditCardBack(props) {
  const {year, month} = props.expirationDate;

  const handleExpirationDateInputChange = (e) => {
    // allow only keyboard insert and backspace
    if (!(e.nativeEvent.inputType === "insertText" || e.nativeEvent.inputType === "deleteContentBackward")) return;

    // allow only numbers
    if (isNaN(e.nativeEvent.data) || e.nativeEvent.data === " ") return;

    if (e.target.value.length === e.target.maxLength) {
      document.getElementById(e.target.dataset.nextinput)?.focus();
    }
    props.onExpirationDateChange(e);
  }

  const handleCcvChange = (e) => {
    // allow only keyboard insert and backspace
    if (!(e.nativeEvent.inputType === "insertText" || e.nativeEvent.inputType === "deleteContentBackward")) return;

    // allow only numbers
    if (isNaN(e.nativeEvent.data) || e.nativeEvent.data === " ") return;

    props.onCcvChange(e);
  }

  return (
    <div className="card-layout card-back">
      <div className="stripe"></div>

      <div className="card-back__info">
        <div className="expirationDate">
          <input
            id="month"
            type="text"
            value={month}
            onChange={handleExpirationDateInputChange}
            placeholder="mm"

            maxLength={2}
            data-inputtype="date"
            data-nextinput="year"
            onFocus={(e) => e.target.select()} />

          <span style={{display: month.length === 2 ? 'initial' : 'none'}} className="slash">/</span>

          <input
            id="year"
            type="text"
            value={year}
            onChange={handleExpirationDateInputChange}
            placeholder="yyyy"

            maxLength={4}
            data-inputtype="date"
            data-nextinput="ccv"
            onFocus={(e) => e.target.select()} />

        </div>

        <div className="ccv">
          <input
            id="ccv"
            type="text"
            value={props.ccv}
            onChange={handleCcvChange}
            placeholder={"CCV"}

            maxLength={3}
            data-inputtype="ccv"
            onFocus={(e) => e.target.select()} />
        </div>

      </div>
    </div>
  )
}