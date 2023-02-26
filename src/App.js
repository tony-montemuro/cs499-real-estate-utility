import './App.css';
import { Route, Routes } from "react-router-dom";
import ShowingsListing from './pages/Login/ShowingsListing';

function App() {
  return (
    <div className="App">
      <h1>Start</h1>
      <Routes>
        <Route path="/showings" element={ <ShowingsListing/> } />
      </Routes>
    </div>
  );
}

export default App;
