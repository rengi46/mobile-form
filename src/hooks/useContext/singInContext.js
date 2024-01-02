import React, { createContext, useState } from 'react';

// Create the context
const SignInContext = createContext();

// Create the provider component
const SignInProvider = ({ children }) => {
  const [loginKey, setLoginKey] = useState(false);

  return (
    <SignInContext.Provider value={{ loginKey, setLoginKey }}>
      {children}
    </SignInContext.Provider>
  );
};

export { SignInContext, SignInProvider };
