import React from "react";
import Select from 'react-select';
import "./inputText.scss";

export default ({
        labelText,
        hint,
        inputID,
        selectedOption,
        options,
        handleSelectChange,
        placeholder,
        isSearchable,
        isRequired,
        error_text,
        template_category_blur,
        handleBlur,
        submit
    }) => <div className="form-row">
    {labelText && <label className="form-label">
        {labelText}
        {hint && <span className="form-label-hint">{hint}</span>}
    </label>}
    <Select
        value={selectedOption}
        onChange={handleSelectChange}
        options={options}
        placeholder={placeholder}
        onBlur={handleBlur}
        name={inputID}
        isSearchable={isSearchable }
    />
    {(isRequired && (selectedOption === null || selectedOption === "") && (submit || template_category_blur)) && <div className="error-text">{error_text}</div>}
</div>