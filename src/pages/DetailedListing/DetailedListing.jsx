/* ===== IMPORTS ===== */
import "./DetailedListing.css";
import { useLocation, Link  } from "react-router-dom";
import { Fragment, useEffect, useRef, useState, useContext } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FrontendHelper from "../../util/FrontendHelper";
import DetailedListingsLogic from "./DetailedListing.js";
import EditListing from "./ui/EditPropertyPopup.jsx";
import { AgentContext } from "../../Contexts";
import PropertyImage from '../../ui/PropertyImage/PropertyImage.jsx';
import NewShowingForm from "./NewShowingForm.jsx";
import DefaultImage from "./ui/No_Image.jpg"
import Room from "./ui/Room";
import UploadIcon from "@mui/icons-material/Upload";
import EditIcon from "@mui/icons-material/Edit";

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

  // states and functions from the PropertyListing js file
  const { 
    listings, 
    getCurrListing, 
    generateCopyListing,
    showForm, 
    error, 
    uploading,
    uploadedMessage, 
    isSubmitting,
    toggleForm, 
    getNumRemaining,
    handleFileInputChange,
    uploadPhoto, 
    uploadThumbnail,
    setPageHits
  } = DetailedListingsLogic();

  // helper functions
  const { floatToUSD, formatFloat, getAddress, snakeToTitle } = FrontendHelper();

  /* ===== EFFECTS ===== */
  
  // code that updates the page hit count each time the component mounts
  useEffect(() => {
    setPageHits(page_id);
  }, []);
  
  useEffect(() => {
    // get the current listing when component mounts, and each time popup is closed
    if (!popup) {
      getCurrListing(page_id);
    }
    getCurrListing(page_id);
  }, [popup]);

  /* ===== DETAILED LISTING COMPONENT ==== */
  return listings ?
    <> 
      { /* Listing header */ }
      <div className="detailed-listings-header">
        <h1>{ getAddress(listings.property) }</h1>

        { agent && agent.agency.agency_id === listings.agent.agency.agency_id&&
          <div className="detailed-listing-buttons">
            {/* Button conditionally shown to edit the listing */}
            <button onClick={ () => setPopup(true)} class="button-style">
              <EditIcon /> Edit Listing
            </button>

            {/* Button conditionally shown to add a showing for the listing */}
            <button disabled={ showForm } class="button-style" onClick = {() => toggleForm(true)} >
              <AddCircleOutlineIcon /> Create Showing
            </button>
          </div>
        }
      </div>

    {/*body of the listing */}
    <div className="detailed-listing-container">
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
        <br></br>
        <div className="image2">
            <PropertyImage filename={ listings.property.large_4 } />
        </div>
        <div className="image2">
            <PropertyImage filename={ listings.property.large_5 } />
        </div>
        <div className="detailed-listing-photo-upload">
          
        </div>
        { /* Property Image Uploader: only renders if agent is logged in, and they belong to same agent as current listing */ }
        { agent && listings.agent.agency.agency_id === agent.agency.agency_id && 
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
                  onChange={ () => handleFileInputChange(thumbnailRef, "thumbnail") }
                />
                <button
                  disabled={ uploading.thumbnail || isSubmitting.thumbnail }
                  onClick={ (e) => uploadThumbnail(e, thumbnailRef) }
                  >Upload
                </button>
    
                { /* If the thumbnail fails to validate, render the error message here. */ }
                { error.thumbnail && <p>Error: { error.thumbnail }</p> }
    
                { /* If the thumbnail successfully updates, render a success message here. */ }
                { uploadedMessage.thumbnail && <p>{ uploadedMessage.thumbnail }</p> }
    
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
                      onChange={ () => handleFileInputChange(photoRef, "photo") }
                    />
                    <button 
                      disabled={ uploading.photo || isSubmitting.photo } 
                      onClick={ (e) => uploadPhoto(e, photoRef) }
                      >Upload
                    </button>
    
                    { /* If the photo fails to validate, render the error message here. */ }
                    { error.photo && <p>Error: { error.photo }</p> }
    
                    { /* If the photo successfully updates, render a success message here. */ }
                    { uploadedMessage.photo && <p>{ uploadedMessage.photo }</p> }
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
          { ` ${ formatFloat(listings.property.sqr_feet) }` } sqft
        </h2>
        
        <h2>
          { getAddress(listings.property) }
        </h2>

        <hr className="insert-line"/>
        <h3>Listed By:</h3>
        <p>{ listings.agent.agency.name }: { listings.agent.agency.phone_number }</p>
        <p>&emsp; &emsp; { getAddress(listings.agent.agency) }</p>
        <p>{ listings.agent.name }: { listings.agent.phone_number }</p>
        <p>&emsp; &emsp; { listings.agent.email }</p>
        <hr className="insert-line"/>
        <h3>Overview:</h3>

        <p>
          Dwelling Type: { snakeToTitle(listings.property.dwelling_type) }
        </p>

        { listings.property.subdivision && 
          <p>
            Subdivision: { listings.property.subdivision }
          </p> 
        }

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
        <div>
          { listings.property.room.map((room, index) => {
            return <Room room={ room } index={ index } />
          })}
        </div>
        { listings.property.other &&
          <>
            <hr className="insert-line"/>
            <h3>Additional Information:</h3>
            <p>{ listings.property.other }</p>
          </>
        }
      </div>
    </div>
    <NewShowingForm listing_id = {page_id} showForm={ showForm } toggleForm={toggleForm}></NewShowingForm>
    <EditListing popup={ popup } setPopup={ setPopup } formData={ generateCopyListing() } />
    </>
  : 
    // Loading component
    <p>Loading...</p>
};

/* ===== EXPORTS ===== */
export default DetailedListing;