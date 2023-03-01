import "./App.css";
import { Route, Routes } from "react-router-dom";
import DetailedListing from "./pages/DetailedListing/DetailedListing";
import DetailedShowing from "./pages/DetailedShowing/DetailedShowing";
import HomePage from './pages/Login/homepage';
import PropertyListing from "./pages/PropertyListings";
import ShowingsListing from './pages/Login/ShowingsListing';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/propertylisting" element={ <PropertyListing />} />
        <Route path="/listings/:listing" element={ <DetailedListing /> } />
        <Route path="/showings" element={ <ShowingsListing/> } />
        <Route path="/showings/:showing" element={ <DetailedShowing /> } />
      </Routes>
    </div>
  );
}

export default App;
