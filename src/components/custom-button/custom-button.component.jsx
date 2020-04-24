import React from 'react';
import './custom-button.styles.scss';

// Pulling-of the children of props...
/* If "type='submit'" will be passed to CustomButton, then 'button' receive get it. "children" ??
Will conditionaly render a className, based on a prop 'isGoogleSignIn'*/
const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${inverted ? 'inverted' : ''} ${
      isGoogleSignIn ? 'google-sign-in' : ''
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
