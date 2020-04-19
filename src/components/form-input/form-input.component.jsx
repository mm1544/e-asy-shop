import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className='group'>
    <input className='form-input' onChange={handleChange} {...otherProps} />
    {/* Will selectively render the 'label', if 'label' is passed then it will be rendered. "otherProps.value.length" is to deduce of whether 'label' is passed. 'shrink' class will be added whwnever the user has typed something in.*/}
    {label ? (
      <label
        className={`${
          otherProps.value.length ? 'shrink' : ''
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
