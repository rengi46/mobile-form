import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { SignInContext } from '../hooks/useContext/singInContext';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import DatePicker from 'react-native-date-picker';
import ReactDatePicker from 'react-datepicker';
import { getCheks, postCheck, postRegalo } from '../utils/functionsFetch';
import { variables } from '../utils/config';
import { confirmAlert } from 'react-confirm-alert'; // Importa la función de alerta de confirmación
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importa los estilos CSS (puedes personalizar los estilos según tus necesidades)




const AdminStoreGift = () => {
  const navigate = useNavigate()

  const {loginKey} = React.useContext(SignInContext)
  

  const [state , setState] = React.useState(0)
  const [checks, setChecks] = React.useState([]);
  const [error, setError] = React.useState(null);
 
  function logOut() {
    console.log("logOut");
    localStorage.removeItem('loginKey')
    window.location.href = "/"
  }

  useEffect(() => {
    const fetchCheck = async()=>{
      const cheks = await getCheks()
      setChecks(cheks)
    }
  fetchCheck()
  console.log(checks);
  }, [state])
  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen relative">
      <button className='absolute top-2 right-2 ' onClick={logOut}>logOut</button>
    <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 pt-16 shadow-2xl w-96 relative h-96 overflow-y-auto ">
      <div className='w-full absolute top-0 left-0'>
        <button onClick={()=>{setState(0)}} className='w-3/6 border-solid border-2 border-slate-200/50 p-2' >Validar Codigo</button>
        <button onClick={()=>{setState(1)}} className='w-3/6 border-solid border-b-2 border-slate-200/50 p-2' >Crear Regalo</button>
      </div>
      {
        state === 0 ? <CheckGift checks={checks} loginKey={loginKey}/> : <CreateGift checks={checks} loginKey={loginKey}/>
      }
    </div>
  </div>
  )
}

function CheckGift({checks,loginKey}) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  onchange = (e) => {
    setValue(e.target.value);
    setError(null);
  }
  const onSubmit = async(e) => {
    e.preventDefault();
    const cheque = checks.filter(check => {
      return check.attributes.code === value  })[0]
    if(!cheque?.id) return setError("No existe el cheque");
    if(cheque.attributes.users_permissions_user?.data?.attributes.username !== loginKey.user.username) return setError("El cheque no es de esta tienda");
    if(!cheque.attributes.emailEnviado) return setError("El cheque no ha sido enviado");
    if(cheque.attributes.regaloEntregado) {
      const date = new Date(cheque.attributes.updatedAt)
      setError("El cheque ya ha sido usado el dia: "+ date.getDate() +"/"+ (date.getMonth()+1) +"/"+ date.getFullYear() +" a las "+ date.getHours() +":"+ date.getMinutes());
      return
    } 
    const result = await postCheck(cheque.id)
    //TODO comprobar resultado de la peticion
    console.log(result);
    setValue("");
    setError(null);
    setSuccess("Cheque usado correctamente");


  }
  return (
    <div>
       <h1 className="font-bold text-center block text-2xl">Validar el Codigo Regalo</h1>
      <form className='flex flex-col'>
      <Input id="email" name="email" label="Codigo a validar" placeholder="code" autofocus={true}  onChange={onchange} value={value}/>
        <Button value="Validar" onClick={onSubmit}/>
      </form>
    {
      error && 
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">{error}</span>
      </div>
    }
    {
          success && <div class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">{success}</span> 
          </div>
        </div>
    }
    </div>
  )
}

function CreateGift({checks,loginKey}) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const [openPopUp, setOpenPopUp] = React.useState(false);

  const HandleRemovePopUp = () => setOpenPopUp(false);

  onchange = (e) => {
    setValue(e.target.value);
    setError(null);
  }


  const initialValues = {
    Regalo: '',
    CantidadCheques: 1,
    Inicio: new Date(),
    Fin: new Date(),
    FinPromo: new Date(),
    Descripcion: "",
  };

  const validationSchema = Yup.object({
    Regalo:  Yup.string().required('El nombre es requerido'),
    CantidadCheques: Yup.number(),
    Inicio:  Yup.date(),
    Fin:  Yup.date().required('La fecha es requerido'),
    FinPromo: Yup.date().required('La fecha es requerido') ,
    Descripcion:  Yup.string(),
  });

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return String(Math.floor(Math.random() * (max - min) + min)); // The maximum is exclusive and the minimum is inclusive
  }

  const handleSubmit = async(values,{resetForm}) => {
    confirmAlert({
      title: 'Confirmar acción', // Título de la alerta
      message: '¿Estás seguro de que deseas realizar esta acción?', // Mensaje de la alerta
      buttons: [
        {
          label: 'Sí', // Etiqueta del botón de aceptar
          onClick: async() => {
            // Lógica a ejecutar si el usuario hace clic en "Sí"
            console.log('Usuario hizo clic en Sí');

              const lettersCode = values.Regalo.split("")
              const numberCode = getRandomInt(100, 999)
              const code = lettersCode[0]+lettersCode[1]+lettersCode[2]+ numberCode;
              const data = {"data":{
                "Max":values.CantidadCheques,
                "codigoRegalo":code,
                "users_permissions_user":loginKey.user.id,
                "Descripcion": values.Descripcion,
                "Fin": values.Fin,
                "FinPromo":values.FinPromo,
                "Inicio":values.Inicio ,
                "Regalo": values.Regalo,
                "genero": values,
                "createdBy":variables.ID_CLIENTE,
              }}
              setOpenPopUp(true)
              console.log("handleSubmit");
              const result = await postRegalo(data)
            if(result){
              resetForm();
              setSuccess("Regalo creado");
            }
          }
        },
        {
          label: 'No', // Etiqueta del botón de cancelar
          onClick: () => {
            // Lógica a ejecutar si el usuario hace clic en "No"
            console.log('Usuario hizo clic en No');
          }
        }
      ]
    });




 
  };

  return (
    <div>
    <div>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className='formFromik'>
      <div className='inputCreate'>
        <label className="relative  text-gray-500 pointer-events-auto  mt-3" >Nombre Regalo
          <Field type="text" id="Regalo" name="Regalo"  placeholder="Regalo" />
        </label>
      </div>
        <div className='inputCreate'>
        <label className="relative  text-gray-500 pointer-events-auto  mt-3" >Cantidad Cheques
          <Field type="number" id="CantidadCheques" name="CantidadCheques"  placeholder="Cantidad de Cheques" />
        </label>
        </div>
        <div>
        <label className="relative  text-gray-500 pointer-events-auto  mt-3">Empezar a dar los cheques:

          <Field name="Inicio">
            {({ field, form }) => (
              <ReactDatePicker
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
          <ErrorMessage name="Inicio" component="div" />
          </label>
        </div>
        <div>
        <label className="relative  text-gray-500 pointer-events-auto  mt-3">Fin de a dar los cheques:
   
          <Field name="Fin">
            {({ field, form }) => (
              <ReactDatePicker
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
          <ErrorMessage name="Fin" component="div" />
          </label>
        </div>
        <div>
          <label className="relative  text-gray-500 pointer-events-auto  mt-3">Fin de la promocion de los cheques:
          <Field name="FinPromo">
            {({ field, form }) => (
              <ReactDatePicker
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
          <ErrorMessage name="FinPromo" component="div" />
          </label>
        </div>
        <div className='inputCreate'>
        <label className="relative  text-gray-500 pointer-events-auto  mt-3" >Descripcion
          <Field type="text" id="Descripcion" name="Descripcion"  placeholder="Descripcion" /> 
        </label>
        </div>

        {/* <div className="selectContainer">
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
        </div> */}

        {
          error && <div className='error'>{error}</div>
        }
       {
          success && <div class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">{success}</span> 
          </div>
        </div>
    }
        <Button value="Crear" type='submit'/>
      </Form>
    </Formik>
    </div>
    </div>
  );
}

function Button({value,onClick,type="button"}) {
  return (
    <button 
      type={type}
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

const PopUp = ({ openPopUp, closePopUp }) => {

  const handlelosePopUp = (e) => {
    if (e.target.id === 'ModelContainer') {
      closePopUp();
    }
  }

  if (openPopUp !== true) return null

  return (
    <div
      id='ModelContainer'
      onClick={handlelosePopUp}
      className='fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm'>
      <div 
        className='p-2 bg-white w-10/12 md:w-1/2 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-5'>
        <div
          className='w-full p-3 justify-center items-center'>
          <h2
            className='font-semibold py-3 text-center text-xl'>
              My PopUP
          </h2>
        </div>
      </div>
    </div>
  )
}



export default AdminStoreGift