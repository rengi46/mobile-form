
import '../App.css';
import Form1 from './Form1';


function FormNoPremio() {

  return (
    <div className="App">
      
      <Form1 juego={0} points={0} premio={false} />
    </div>
  );
}

export default FormNoPremio;