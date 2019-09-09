import React from "react";
import "./inputText.scss";

export default ({
        labelText,
        name,
        inputID,
        hint,
        handleChange,
        value,
        placeHolder,
        isRequired,
        error_text,
        blurID,
        handleBlur,
        minlength,
        submit
    }) => <div className="form-row">
    {labelText && <label className="form-label" htmlFor={inputID}>
        {labelText}
        {hint && <span className="form-label-hint">{hint}</span>}
    </label>}
    <textarea 
        name={name}
        value={value}
        id={inputID}
        className="form-area"
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeHolder}>
    </textarea>
    {((isRequired && (value === "" || minlength > value.length) && (blurID === inputID || submit)) || (!isRequired && value !== "" && minlength > value.length && (blurID === inputID || submit))) && <div className="error-text">{error_text}</div>}
</div>