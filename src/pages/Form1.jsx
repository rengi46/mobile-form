import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Input from '../components/Input/Input';
import PhoneInputField from '../components/phoneInput/PhoneInput';
import { redirect, useNavigate } from 'react-router-dom';
import { findEmail, postUser, postPointGame } from '../utils/functionsFetch';
import dayjs from 'dayjs';



const Form1 = ({juego="",points=0,premio}) => {
  const url = process.env.REACT_APP_URL;
  const autorization = process.env.REACT_APP_AUTHORIZATION;

  const navigate = useNavigate()

  const [error, setError] = React.useState(null);
  const [required, setRequired] = React.useState({});
  

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${autorization}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

  fetch(url+"/api/form-users?populate=centro,Logo,createdBy", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          if(result.data === null) navigate('/register/gracias');
          if(result.data?.length === 0) navigate('/register/gracias');
          setRequired( result.data[0]?.attributes)
        },
        (error) => {
          setError(error);
        }
      )
  }, [])

  const initialValues = {
    Nombre: '',
    Apellido: '',
    Email: '',
    birthday: "11/11/1990",
    genero: "",
    phoneNumber: "+34",
    centro: required?.centro?.data?.attributes?.id,
  };

  const validationSchema = Yup.object({
    Nombre: required?.NameObligatorio ? Yup.string().required('El nombre es requerido'): Yup.string(),
    Apellido: required?.ApellidoObligatorio ? Yup.string().required('El apellido es requerido'): Yup.string(),
    Email:  Yup.string().required('El email es requerido').email('Email invalido'),
    birthday: required?.NacimientoObligatorio ? Yup.date(): Yup.date(),
    genero: required?.GeneroObligatorio ? Yup.string().required('El genero es requerido') : Yup.string(),
    phoneNumber: required?.TelefonoObligatorio ? Yup.number().required('El numero de telefono es requerido'): Yup.number(),
  });

  const handleSubmit = async(values) => {
    // Handle form submission
    try{
      let userDB = await findEmail(values.Email);
      if(userDB === undefined) {
        userDB = await postUser(values.Nombre,values.Apellido,values.Email,values.birthday.$d,values.genero,values.phoneNumber,values.centro,premio);
        await postPointGame(userDB?.id,points,juego);
        navigate('/register/gracias');
      }
      await postPointGame(userDB?.id,points,juego);
      setError("Ya estas registrado")
    }catch(error){
      console.log(error);
      setError(error);
    }
  };

  return (
    <div>
   {
    required &&
    
    <div>
    <div className='w-full p-2'>
      {required?.Logo?.data && <img src={required.Logo.data.attributes.url} width={200} />}
    </div>
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
              <MyDatePicker
                value={field.value}
                onChange={(date) => form.setFieldValue(field.name, date)}
               
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
    </div>
  }
    </div>
  );
};

export default Form1;


const MyDatePicker = ({value,onChange}) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  if(!value) value = selectedDate;

  return (
    <div className="relative my-4 max-w-sm">

    <DatePicker
      value={dayjs(value)}
      onChange={onChange}
      // className=" text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      // placeholderText="Select date"
    />
  </div>
  );
};