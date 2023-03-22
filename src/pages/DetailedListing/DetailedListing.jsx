import "./DetailedListing.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import FrontendHelper from "../../util/FrontendHelper";
import DetailedListingsLogic from "./DetailedListing.js";

function DetailedListing() {
  return (
    <>
      <div className="detailed-listings-header">
        <h1>Detailed Property Listing</h1>
      </div>

      { /* Render the body of this component if listings is defined. Otherwise, render a loading component. */ }
      { /* need to set up full infomation pull from database */}
      
      <div class="container">
        <div class="left">
          <p>Images</p>
          <div className="rectangle"/>
          <div className="image2"/>
          <div className="image3"/>
        </div>
        <div class="right">
          <p>Property Details</p>
          <h2>Price &emsp; bed | bath | sq ft</h2>
          <h2>Address</h2><br/>
          <hr class="insert-line"/>
          <h2>Listing Agency: Phone #</h2>
          <h2>&emsp; &emsp; Address</h2>
          <h2>Listing Agent: Phone #</h2>
          <h2>&emsp; &emsp; Email</h2><br/>
          <hr class="insert-line"/>
          <h2>Overview:</h2><br/>
          <hr class="insert-line"/>
          <h2>Room Details:</h2>
        </div>
      </div>
    </>

  );
};

export default DetailedListing;