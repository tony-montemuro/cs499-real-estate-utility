import "./App.css";
import { Route, Routes } from "react-router-dom";
import DetailedListing from "./pages/DetailedListing/DetailedListing";
import DetailedShowing from "./pages/DetailedShowing/DetailedShowing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/listings/:listing" element={ <DetailedListing /> } />
        <Route path="/showings/:showing" element={ <DetailedShowing /> } />
      </Routes>
    </div>
  );
}

export default App;
