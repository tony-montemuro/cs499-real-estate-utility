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

  // helper functions
  const { floatToUSD, formatFloat, getAddress } = FrontendHelper();

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
        <div className="container">
          <div className="left">
            <p>Image Placeholders</p>
            <div className="image1"/>
            <div className="image2"/>
            <div className="image3"/>
            <div className="image3"/>
            <div className="image2"/>
          </div>
          <div class="right">
            <h2>Price: { floatToUSD(listings.price) } &emsp; bed | bath | { formatFloat(listings.property.sqr_feet) } sqft</h2>
            <h2>{ getAddress(listings.property) }</h2>
            <hr class="insert-line"/>
            <h3>Listed By:</h3>
            <p>{ listings.agent.agency.name }: { listings.agent.agency.phone_number }</p>
            <p>&emsp; &emsp; { getAddress(listings.agent.agency) }</p>
            <p>{ listings.agent.name }: { listings.agent.phone_number }</p>
            <p>&emsp; &emsp; { listings.agent.email }</p>
            <hr class="insert-line"/>
            <h3>Overview:</h3>
            <p>Dwelling Type: { listings.property.dwelling_type }</p>
            <p>Subdivision (if applicable): { listings.property.subdivision }</p>
            <p>School District: { listings.property.school_district }</p>
            <p>Shopping Areas: { listings.property.shopping_areas }</p>
            <hr class="insert-line"/>
            <h3>Room Details:</h3>
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