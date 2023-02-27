import './App.css';
import { Route, Routes } from "react-router-dom";
import PropertyListing from "./pages/PropertyListings";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/propertylisting" element={ <PropertyListing />} />
      </Routes>
    </div>
  );
}

export default App;
