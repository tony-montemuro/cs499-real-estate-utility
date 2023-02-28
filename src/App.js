import './App.css';
import { Route, Routes } from "react-router-dom";
import Forms from "./pages/Forms/Forms";

function App() {
  return (
      <div className="App">
      <Routes>
              <Route path="/forms" element={ <Forms />} /> 
      </Routes>
    </div>
  );
}

export default App;
