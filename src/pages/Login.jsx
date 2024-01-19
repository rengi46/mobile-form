import React, { Component, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { SignInContext } from '../hooks/useContext/singInContext';

export const  Login = ()=>{ 
  const url = process.env.REACT_APP_URL;
  const autorization = process.env.REACT_APP_AUTHORIZATION;

  const navigate = useNavigate()
  const {loginKey,setLoginKey} = React.useContext(SignInContext)

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null);

  const onchangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const onchangePassword = (e) => {
    setPassword(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+autorization);

    var raw = JSON.stringify({
      "identifier": email,
      "password": password
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(url+"/api/auth/local", requestOptions)
      .then(response => {
        if(response.ok)
          return response.json();

      })
      .then(result => {
        console.log(result);
        setError(null);
        setLoginKey(result)
      })
      .then(result =>{setError(" contraseña o email no valido"); })
  }
  useEffect(() => {
    localStorage.setItem('loginKey', JSON.stringify(loginKey))
    if(loginKey) navigate('/check')
  }, [loginKey])
  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
        <h1 className="font-bold text-center block text-2xl">Log In</h1>
        <form className='flex flex-col'>
        <Input type="email" id="email" name="email" label="Email Address" placeholder="me@example.com" autofocus={true}  onChange={onchangeEmail} value={email}/>
        <Input type="password" id="password" name="password" label="Password" placeholder="••••••••••" onChange={onchangePassword} value={password}/>
        <Button value="Submit" onClick={onSubmit}/>
          
        </form>

          {
            error && 
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          }

      </div>
    </div>
  )

}


function Button({value,onClick}) {
  return (
    <button 
      onClick={onClick}
      className="relative  mt-6 transition transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
      {value}
  </button>
  )
}

function Input({type, id, name, label, placeholder, autofocus,onChange,value}) {
  return (
    <label className="relative  text-gray-500 pointer-events-auto  mt-3">{label}
      <input
        value={value}
        onChange={onChange}
        type={type} 
        id={id} 
        name={name} 
        placeholder={placeholder}
        className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"/>
    </label>
  )
}