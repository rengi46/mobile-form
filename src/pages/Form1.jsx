import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../components/Input/Input';
import PhoneInputField from '../components/phoneInput/PhoneInput';
import { redirect, useNavigate } from 'react-router-dom';
import { findEmail, postUser, postPointGame } from '../utils/functionsFetch';


const Form1 = ({juego="",points=0}) => {
  const navigate = useNavigate()

  const [error, setError] = React.useState(null);
  const initialValues = {
    Nombre: '',
    Apellido: '',
    Email: '',
    birthday: '',
    genero: '',
    phoneNumber: '',
  };

  const validationSchema = Yup.object({
    Nombre: Yup.string().required('El nombre es requerido'),
    Apellido: Yup.string().required('El apellido es requerido'),
    Email: Yup.string().required('El email es requerido').email('Email invalido'),
    birthday: Yup.date(),
    genero: Yup.string(),
    phoneNumber: Yup.number().required('El numero de telefono es requerido'),
  });

  const handleSubmit = async(values) => {
    // Handle form submission
    let userDB = await findEmail(values.Email);
    if(userDB === undefined) {
      userDB = await postUser(values.Nombre,values.Apellido,values.Email,values.birthday,values.genero,values.phoneNumber);
      console.log(userDB);
    } 
    await postPointGame(userDB.id,points,juego);
    navigate('/register/gracias');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className='formFromik'>
        <Input nameInput="Nombre" />
        <Input nameInput="Apellido" />
        <Input nameInput="Email" type='email' />
        <div>
          {/* Utilizando react-datepicker */}
          <Field name="birthday">
            {({ field, form }) => (
              <DatePicker
                {...field}
                selected={field.value}
                onChange={(date) => form.setFieldValue(field.name, date)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                placeholderText="Selecciona la fecha de nacimiento"
              />
            )}
          </Field>
          <ErrorMessage name="birthday" component="div" />
        </div>

        <div className="selectContainer">
          <Field  
                  as="select" 
                  id={"genero"} 
                  name={"genero"} 

              >
                <option value="">Genero</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Otros">Otro</option>
          </Field>
          <ErrorMessage name={"genero"} component="div" className='error' />
        </div>
        <Field
          name="phoneNumber" // Asegúrate de que coincide con el nombre del campo en PhoneInputField
          component={PhoneInputField}
          country="US" // Puedes ajustar el país según tus necesidades
          onChange={(phoneNumber) => {}}
        />
        {
          error && <div className='error'>{error}</div>
        }
        <button className='buttonSubmit' type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default Form1;


