import { useParams } from 'react-router-dom';
import './App.css';
import Form1 from './pages/Form1';

function App() {
  const {juego,points} = useParams();
  return (
    <div className="App">
      <img src='/logo.jpg' width={200} />
     <Form1 juego={juego} points={points}/>
    </div>
  );
}

export default App;
