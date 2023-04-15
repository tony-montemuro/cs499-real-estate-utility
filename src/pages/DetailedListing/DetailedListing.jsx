/* ===== IMPORTS ===== */
import "./DetailedListing.css";
import { useLocation, Link  } from "react-router-dom";
import { Fragment, useEffect, useRef, useState, useContext } from "react";
import FrontendHelper from "../../util/FrontendHelper";
import DetailedListingsLogic from "./DetailedListing.js";
import EditListing from "./ui/EditPropertyPopup.jsx";
import { AgentContext } from "../../Contexts";
import PropertyImage from '../../ui/PropertyImage/PropertyImage.jsx';
import NewShowingForm from "./NewShowingForm.jsx";
import UploadIcon from "@mui/icons-material/Upload";

function DetailedListing() {
  /* ===== VARIABLES ===== */
  const location = useLocation();
  const path = location.pathname.split("/");
  const page_id = path[2];
  const [popup, setPopup] = useState(false);

  var showing_link = "/showings/" + page_id;

  /* ====== CONTEXTS ====== */
  const { agent } = useContext(AgentContext);

  /* ===== REFS ===== */
  const photoRef = useRef(null);
  const thumbnailRef = useRef(null);

  /* ===== STATES ===== */
  const [imageUploaded, setImageUploaded] = useState(false);
  const [thumbnailUploaded, setThumbnailUploaded] = useState(false);

  // states and functions from the PropertyListing js file
  const { 
    listings, 
    getCurrListing, 
    showForm, 
    error, 
    uploaded, 
    toggleForm, 
    getNumRemaining,
    uploadPhoto, 
    uploadThumbnail  
  } = DetailedListingsLogic();

  // helper functions
  const { floatToUSD, formatFloat, getAddress, snakeToTitle } = FrontendHelper();

  /* ===== EFFECTS ===== */
  useEffect(() => {
    getCurrListing(page_id);
  }, []);

  /* ===== DETAILED LISTING COMPONENT ==== */
  return (
    <>
      <div>
        <div className="detailed-listings-header">
          <h1>Detailed Property Listing {path[2]}&emsp;&emsp;
          { agent && <button onClick={ () => setPopup(true)} class="button-style">Edit Listing</button>}
          
          </h1>
        </div>
      </div>
      


      { /* Render the body of this component if listings is defined. Otherwise, render a loading component. */ }
      { listings ?
        <>  
        {/*body of the listing */}
            {showForm ? 
            <>
              <button disabled={true} >
              Create Showing
              </button>
              <NewShowingForm toggleForm={toggleForm} listing_id = {page_id}></NewShowingForm>
            </>
            :
              <button onClick = {() => toggleForm(true)} >
              Create Showing
              </button>
            }
        <div className="container">
          <div className="left">
            <p></p>
            <div className="image1">
                <PropertyImage filename={ listings.property.small } />
            </div>
            <br></br>
            <div className="image2">
                <PropertyImage filename={ listings.property.large_1 } />
            </div>
            <div className="image2">
                <PropertyImage filename={ listings.property.large_2 } />
            </div>
            <div className="image2">
                <PropertyImage filename={ listings.property.large_3 } />
            </div>
            <div className="image2">
                <PropertyImage filename={ listings.property.large_4 } />
            </div>
            <div className="image2">
                <PropertyImage filename={ listings.property.large_5 } />
            </div>

            { /* Property Image Uploader */ }
            { agent && agent.agency.agency_id === listings.agent.agency.agency_id &&
              <>
                <h2>Upload Property Images</h2>
                <div className="detailed-listing-image">

                  { /* Update thumbnail */ }
                  <div className="detailed-listing-thumbnail-upload">
                    <h3><UploadIcon />Update thumbnail</h3>
                    <label htmlFor="property-thumbnail-upload"></label>
                    <input
                      type="file"
                      id="property-thumbnail-upload"
                      accept=".jpg,.jpeg,.png"
                      ref={ thumbnailRef }
                      onChange={ () => setThumbnailUploaded(thumbnailRef.current.files.length > 0) }
                    />
                    <button
                      disabled={ !thumbnailUploaded }
                      onClick={ (e) => uploadThumbnail(e, thumbnailRef) }
                      >Upload
                    </button>

                    { /* If the thumbnail fails to validate, render the error message here. */ }
                    { error.thumbnail && <p>Error: { error.thumbnail }</p> }

                    { /* If the thumbnail successfully updates, render a success message here. */ }
                    { uploaded.thumbnail && <p>{ uploaded.thumbnail }</p> }

                  </div>

                  { /* Upload large photo */ }
                  <div className="detailed-listing-image-upload">

                    { /* Only render this uploader if the property has image fields that are null */ }
                    { getNumRemaining() > 0 &&

                      <>
                        <h3><UploadIcon />Upload photo ({ getNumRemaining() } remaning)</h3>
                        <label htmlFor="property-image-upload"></label>
                        <input
                          type="file"
                          id="property-image-upload"
                          accept=".jpg,.jpeg,.png"
                          ref={ photoRef }
                          onChange={ () => setImageUploaded(photoRef.current.files.length > 0) }
                        />
                        <button 
                          disabled={ !imageUploaded } 
                          onClick={ (e) => uploadPhoto(e, photoRef) }
                          >Upload
                        </button>

                        { /* If the photo fails to validate, render the error message here. */ }
                        { error.photo && <p>Error: { error.photo }</p> }

                        { /* If the photo successfully updates, render a success message here. */ }
                        { uploaded.photo && <p>{ uploaded.photo }</p> }

                      </>

                    }

                  </div>
                </div>
              </>
            }
            
          </div>
          <div className="right">
            <h2>
              Price: { floatToUSD(listings.price) } &emsp; 
              { listings.property.room.filter(item => item.room_type === "bedroom").length } bed |
              { ` ${ listings.property.room.filter(item => item.room_type === "bathroom").length }` } bathroom |
              { ` ${ formatFloat(listings.property.sqr_feet) }` } sqft</h2>
            <h2>{ getAddress(listings.property) }</h2>
            <p>Interested?&emsp;<button class="button-style"><Link to = {showing_link}>Book A Listing!</Link></button></p>
            <hr class="insert-line"/>
            <hr className="insert-line"/>
            <h3>Listed By:</h3>
            <p>{ listings.agent.agency.name }: { listings.agent.agency.phone_number }</p>
            <p>&emsp; &emsp; { getAddress(listings.agent.agency) }</p>
            <p>{ listings.agent.name }: { listings.agent.phone_number }</p>
            <p>&emsp; &emsp; { listings.agent.email }</p>
            <hr className="insert-line"/>
            <h3>Overview:</h3>
            <p>Dwelling Type: { snakeToTitle(listings.property.dwelling_type) }</p>
            { listings.property.subdivision && <p>Subdivision: { listings.property.subdivision }</p> }
            <p>School District: { listings.property.school_district }</p>
            <p>Shopping Areas:  
              { listings.property.shopping_areas.map((area, index) => {
                return (
                  <Fragment key={ index }>
                    { ` ${area}` }
                    { index < listings.property.shopping_areas.length-1 && "," }
                  </Fragment>
                )
              })}
            </p>
            <p>Lot Size: { formatFloat(listings.property.lot_size) } sqft</p>
            <hr className="insert-line"/>
            <h3>Room Details:</h3>
            { listings.property.other &&
              <>
                <hr className="insert-line"/>
                <h3>Additional Information:</h3>
                <p>{ listings.property.other }</p>
              </>
            }
          </div>
        </div>
        </>
      : 
        // Loading component
        <p>Loading...</p>
      }

      <EditListing popup={ popup } setPopup={ setPopup } />

      
    </>

  );
};

/* ===== EXPORTS ===== */
export default DetailedListing;