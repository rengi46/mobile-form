import React, { useContext } from 'react'
import { SignInContext } from '../hooks/useContext/singInContext';
import { useNavigate } from 'react-router-dom';
import AdminStoreGift from '../pages/AdminStoreGift';

const MidelWearLogin = () => {
  const context = useContext(SignInContext)
  console.log(context.loginKey);
  // if(!context.loginKey) return (window.location.href='/')
   return (<AdminStoreGift/>)
}

export default MidelWearLogin