import "./App.css";
import { Route, Routes } from "react-router-dom";
import DetailedListing from "./pages/DetailedListing/DetailedListing.jsx";
import DetailedShowing from "./pages/DetailedShowing/DetailedShowing.jsx";
import Forms from "./pages/Forms/Forms.jsx";
import Home from "./pages/Home/Home.jsx";
import PropertyListing from "./pages/PropertyListing/PropertyListing.jsx";
import ShowingsListing from "./pages/ShowingsListing/ShowingsListing.jsx";
import {ImagesContext } from "./Contexts.js";

function App() {

  const imagesCache = {};

  return (
    <ImagesContext.Provider value={ { imagesCache } }>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/forms" element={ <Forms /> } /> 
          <Route path="/listings" element={ <PropertyListing /> } />
          <Route path="/listings/:listing" element={ <DetailedListing /> } />
          <Route path="/showings" element={ <ShowingsListing /> } />
          <Route path="/showings/:showing" element={ <DetailedShowing /> } />
        </Routes>
      </div>
    </ImagesContext.Provider>
  );
}

export default App;
