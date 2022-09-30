// @ts-nocheck
import React, { useEffect, useState } from "react";
import "../styles/Toast.css";

export default function Toast(props) {
  const toastOptions = props.options;

  const [options, setOptions] = useState(toastOptions);

  useEffect(() => {
    setOptions(toastOptions);

    const timeout = setTimeout(() => {
      hideToast();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    }
  }, [toastOptions])

  const hideToast = () => {
    toastOptions.message = "";
    setOptions({...options, message: "", type: ""});
  }

  return (
    <div className={`toast ${options.message ? 'toast-visible' : 'toast-hidden'} ${options.type ? 'toast-' + options.type : '' }`}>
      {options.message}
    </div>
  )
}