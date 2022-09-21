import React from "react"

export default function CreditCardBack(props) {
  return (
    <div className="creditCardBack">
      <div className="expirationDate">
        <input type="text" placeholder="yyyy" value={props.expirationYear}
        onChange={props.onExpirationYearChange} />
        <input type="text" placeholder="mm" value={props.expirationMonth}
        onChange={props.onExpirationMonthChange} />
      </div>

      <div className="ccv">
        <input type="text" value={props.ccv} onChange={props.onCcvChange} />
      </div>
    </div>
  )
}