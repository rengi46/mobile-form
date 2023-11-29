import { useParams } from 'react-router-dom';
import './App.css';
import Form1 from './pages/Form1';

function App() {
  const {juego} = useParams();
  return (
    <div className="App">
      <img src='../logo.jpg' width={200} />
     <Form1 juego={juego}/>
    </div>
  );
}

export default App;
