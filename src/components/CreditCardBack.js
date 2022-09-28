import React from "react"
import "../styles/CreditCardBack.css";

export default function CreditCardBack(props) {
  const { year, month } = props.expirationDate;

  const monthRule = /^(0[1-9]{0,1}|1[0-2]{0,1})$/;
  const yearRule = /^(2[0-9]{0,3})$/;

  const isInputValid = (e) => {
    // allow only keyboard insert and backspace
    if (!(e.nativeEvent.inputType === "insertText" || e.nativeEvent.inputType === "deleteContentBackward")) return false;
    // allow only numbers
    if (isNaN(e.nativeEvent.data) || e.nativeEvent.data === " ") return false;
    return true;
  }

  const isNumber = (val) => {
    if (!!val) {
      const num = +val;
      if (!!num || num === 0) {
        return true;
      }
    }
    return false;
  }

  const handleExpirationDateChange = (e) => {
    if (!isInputValid(e)) return;

    if (e.target.id === "month") {
      if (isNumber(e.target.value) && e.target.value.search(monthRule) < 0) return false;
    }

    else if (e.target.id === "year") {
      if (e.target.value.length === 0)
        document.getElementById("month")?.focus();

      else if (isNumber(e.target.value) && e.target.value.search(yearRule) < 0) return false;
    }

    if (e.target.value.length === e.target.maxLength) {
      document.getElementById(e.target.dataset.nextinput)?.focus();
    }

    props.onExpirationDateChange(e);
  }

  const handleCcvChange = (e) => {
    if (!isInputValid(e)) return;

    props.onCcvChange(e);
  }

  return (
    <div className="card-layout card-back">
      <div className="stripe"></div>

      <div className="card-back__info">
        <div className="expirationDate">

          <div className="card-label">VALID THRU</div>

          <div className="input-container">
            <input
              id="month"
              type="text"
              value={month}
              onChange={handleExpirationDateChange}
              placeholder="mm"

              maxLength={2}
              data-inputtype="date"
              data-nextinput="year"
              onFocus={(e) => e.target.select()} />

            <span style={{ visibility: month.length === 2 ? 'initial' : 'hidden' }} className="slash">/</span>

            <input
              id="year"
              type="text"
              value={year}
              onChange={handleExpirationDateChange}
              placeholder="yyyy"

              maxLength={4}
              data-inputtype="date"
              data-nextinput="ccv"
              onFocus={(e) => e.target.select()} />
          </div>

        </div>

        <div className="ccv">
          <div className="card-label">CCV</div>
          <div className="input-container">
            <input
              id="ccv"
              type="text"
              value={props.ccv}
              onChange={handleCcvChange}
              maxLength={3}
              data-inputtype="ccv"
              onFocus={(e) => e.target.select()} />
          </div>
        </div>

      </div>
    </div>
  )
}