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
            <Route path="/" element={ <Home /> } />
            <Route path="/forms" element={ <Forms /> } /> 
            <Route path="/listings" element={ <PropertyListing /> } />
            <Route path="/listings/:listing" element={ <DetailedListing /> } />
            <Route path="/showings" element={ <ShowingsListing /> } />
            <Route path="/showings/:showing" element={ <DetailedShowing /> } />
          </Routes>
        </div>
      </ImagesContext.Provider>
    </AgentContext.Provider>
  );
};

/* ===== EXPORTS ===== */
export default App;
