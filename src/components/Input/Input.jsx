import { ErrorMessage, Field } from 'formik';
import React from 'react';


const Input = ({nameInput,type="text",children}) => {


  return (
    <div className="inputText">
    <Field  type={type} id={nameInput} name={nameInput} />
    <label htmlFor={nameInput}>{nameInput}</label>
    <ErrorMessage name={nameInput} component="div" className='error' />
  </div>
  );
};

export default Input;
