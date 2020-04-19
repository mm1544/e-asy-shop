import React from 'react';
import './custom-button.styles.scss';

// Pulling-of the children of props...
/* If "type='submit'" will be passed to CustomButton, then 'button' receive get it. "children" ?? */
const CustomButton = ({ children, ...otherProps }) => (
  <button className='custom-button' {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
