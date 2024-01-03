import React, { createContext, useState } from 'react';

// Create the context
const SignInContext = createContext();

// Create the provider component
const SignInProvider = ({ children }) => {
  let value = false
  if(localStorage.getItem("value") !== null){
    value = JSON.parse(localStorage.getItem("value"))
  }
  const [loginKey, setLoginKey] = useState(value);

  return (
    <SignInContext.Provider value={{ loginKey, setLoginKey }}>
      {children}
    </SignInContext.Provider>
  );
};

export { SignInContext, SignInProvider };
