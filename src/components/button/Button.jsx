import React from 'react';
import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';

const Button = () => {
  const handleClick = () => {
    UIkit.notification('Button clicked!');
  };

  return (
    <button className="uk-button uk-button-primary" onClick={handleClick}>
      Click me
    </button>
  );
};

export default Button;
