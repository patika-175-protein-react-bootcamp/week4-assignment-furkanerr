
import './App.css';
import Routers from './routers/routers';
import {ScoreProvider} from './contexts/scoreContext';

function App() {
  return (
    <>
    <ScoreProvider>
     <Routers/>
     </ScoreProvider>
    </>
  );
}

export default App;
