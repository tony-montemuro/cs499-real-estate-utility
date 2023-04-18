/* ===== IMPORTS ===== */
import "./App.css";
import { AgentContext, ImagesContext } from "./Contexts";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import AppLogic from "./AppUtils.js";
import REUNavbar from './ui/Navbar/Navbar.jsx';
import DetailedListing from "./pages/DetailedListing/DetailedListing.jsx";
import DetailedShowing from "./pages/DetailedShowing/DetailedShowing.jsx";
import Forms from "./pages/Forms/Forms.jsx";
import Home from "./pages/Home/Home.jsx";
import PropertyListing from "./pages/PropertyListing/PropertyListing.jsx";
import ShowingsListing from "./pages/ShowingsListing/ShowingsListing.jsx";

function App() {
  /* ===== VARIABLES ===== */
  const imagesCache = {};

  /* ===== STATES & FUNCTIONS ===== */

  // states and functions from the js file
  const { agent, getCurrentAgent } = AppLogic();

  /* ===== EFFECTS ===== */

  // code that is executed when the application is first loaded
  useEffect(() => {
    getCurrentAgent();
    // eslint-disable-next-line
  }, []);

  /* ===== APP COMPONENT ===== */
  return (
    <AgentContext.Provider value={ { agent } }>
      <ImagesContext.Provider value={ { imagesCache } }>
        <div className="App">
          <REUNavbar />
          <Routes>
            <Route path="/cs499-real-estate-utility/" element={ <Home /> } />
            <Route path="/cs499-real-estate-utility/forms" element={ <Forms /> } /> 
            <Route path="/cs499-real-estate-utility/listings" element={ <PropertyListing /> } />
            <Route path="/cs499-real-estate-utility/listings/:listing" element={ <DetailedListing /> } />
            <Route path="/cs499-real-estate-utility/showings" element={ <ShowingsListing /> } />
            <Route path="/cs499-real-estate-utility/showings/:showing" element={ <DetailedShowing /> } />
          </Routes>
        </div>
      </ImagesContext.Provider>
    </AgentContext.Provider>
  );
};

/* ===== EXPORTS ===== */
export default App;
