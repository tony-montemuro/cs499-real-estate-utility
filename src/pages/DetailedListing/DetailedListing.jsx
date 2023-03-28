import "./DetailedListing.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import FrontendHelper from "../../util/FrontendHelper";
import DetailedListingsLogic from "./DetailedListing.js";

function DetailedListing() {
  //variables
  const location = useLocation();
  const path = location.pathname.split("/");
  console.log(path[2]);
  const page_id = path[2];

  /* ===== STATES ===== */

  // states and functions from the PropertyListing js file
  const { listings, getCurrListing } = DetailedListingsLogic();

  /* ===== EFFECTS ===== */
  useEffect(() => {
    getCurrListing(page_id);
  }, []);

  return (
    <>
      <div className="detailed-listings-header">
        <h1>Detailed Property Listing {path[2]}</h1>
      </div>

      { /* Render the body of this component if listings is defined. Otherwise, render a loading component. */ }
      { listings ?
        <>  
        {/*body of the listing */}
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

            <p>test {listings.listing_id} </p>
            <p> { listings.listing_id} </p>
            

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
      : 
        // Loading component
        <p>Loading...</p>
      }
      

    </>

  );
};

export default DetailedListing;