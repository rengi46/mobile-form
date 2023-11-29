import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Gracias = () => {
  return (
    <div className='gracias'>
      <div className='imageGracias'>
        <img src='./image.png' alt='gracias' />
      </div>
      <h1>Te as registrado !</h1>
      <p>Pronto te enviaremos un mail con el regalo</p>
      <a className='buttonSubmit' href="https://phygitalstudio.es/" >Ir a la pagina principal</a>
    </div>
  );
};

export default Gracias;
