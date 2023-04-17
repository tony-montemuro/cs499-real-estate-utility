/* ===== IMPORTS ===== */
import "./EditPropertyPopup.css";
import { AgentContext } from "../../../Contexts";
import { useContext } from "react";
import DetailedListingsLogic from "../DetailedListing.js";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import editProperty from "./EditListingPopup.js";
import ErrorMessage from "./EditErrorMessage";

function EditPropertyPopup({ popup, setPopup }) {
  /* ===== VARIABLES ===== */
     const dwellings = ["single", "family", "multi_family", "duplex", "apartment", "condo", "town_house", "mobile"];
    const TEXT_AREA_ROWS = "4";
    const location = useLocation();
    const path = location.pathname.split("/");
    console.log(path[2]);
    const page_id = path[2];

  /* ===== CONTEXTS ===== */
  const { agent } = useContext(AgentContext);
  console.log(agent);

  // states and functions from the PropertyListing js file
  const { listings, getCurrListing } = DetailedListingsLogic();
  const { setNewValues, handleChange, handleRoomChange, addRoom, removeRoom, handleShoppingAreaChange, addShoppingArea, removeShoppingArea, validateRequiredField, validateRequiredIntegerField, cleanField, handleSubmit, closePopup, submitted, propertyForm, setDefaultsForm, error } = editProperty();

  /* ===== EFFECTS ===== */
  useEffect(() => {
    getCurrListing(page_id);
  }, []);

  /* ===== ADD PROPERTY POPUP ===== */
  return popup &&
    <div className="edit-property-popup">
      <div className="edit-property-popup-inner">
        <div className="edit-property-popup-container">
          { /* Button to close the popup */ }
          <button className="close-btn" onClick={ () => closePopup(setPopup) }><CancelIcon /></button>
          
          <div className="edit-property-popup-header">
            <h1>Edit Property</h1>
          </div>
          <form onSubmit={ handleSubmit }>
            <div className="edit-property-popup-body">
              <div className="edit-property-popup-section">
                <div className="edit-property-popup-wrapper">
                  <h2>Agency Details</h2>
                  <div className="edit-property-popup-input-group">
                    <p>Agency: <b>{ listings.agent.agency.name }</b></p>
                    <p>Listing Agent: <b>{ listings.agent.name }</b></p>
                  </div>
                  <h2>Price</h2>
                  <div className="edit-property-popup-input">
                    <label htmlFor="price">Price ($): </label>
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      defaultValue={ listings.price }
                      value={propertyForm.price}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.price } />
                  </div>
                  <h2>Address</h2>
                  <div className="edit-property-popup-input-group">
                    <label htmlFor="street">Street: </label>
                    <input
                      id="street"
                      type="text"
                      defaultValue={listings.property.street}
                      value={listings.property.street}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.street } />
                    <label htmlFor="city">City: </label>
                    <input 
                      id="city"
                      type="text"
                      defaultValue={listings.property.city}
                      value={listings.property.city}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.city } />
                    <label htmlFor="state">State: </label>
                    <input
                      id="state"
                      type="text"
                      defaultValue={listings.property.state}
                      value={listings.property.state}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.state } />
                    <label htmlFor="zip">ZIP Code: </label>
                    <input
                      id="zip"
                      type="text"
                      defaultValue={listings.property.zip}
                      value={listings.property.zip}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.zip } />
                  </div>
                  <h2>Property Sizes</h2>
                  <div className="edit-property-popup-input-group">
                    <label htmlFor="lot_size">Lot Size (Square Feet): </label>
                    <input
                      id="lot_size"
                      type="number"
                      defaultValue={listings.property.lot_size}
                      value={listings.property.lot_size}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.lot_size } />
                    <label htmlFor="sqr_feet">Net Square Footage: </label>
                    <input
                      id="sqr_feet"
                      type="number"
                      defaultValue={listings.property.sqr_feet}
                      value={listings.property.sqr_feet}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.price } />
                    <label htmlFor="dwelling_type">Dwelling Type: </label>
                    <select name="dwelling_type" id="dwelling_type">
                      { dwellings.map(option => {
                        return <option key={ option } value={ option }>
                          { option }
                        </option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="edit-property-popup-section">
                <div className="edit-property-popup-wrapper">
                  <h2>Location Details</h2>
                  <div className="edit-property-popup-input-group">
                    <label htmlFor="subdivision">Subdivision: </label>
                    <input 
                      id="subdivision"
                      type="text"
                      defaultValue={listings.property.subdivision}
                      value={listings.property.subdivision}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.subdivision } />
                    <label htmlFor="school_district">School District: </label>
                    <input
                      id="school_district"
                      type="text"
                      defaultValue={listings.property.school_district}
                      value={listings.property.school_district}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.school_district } />
                    <label htmlFor="shopping_areas">Shopping Areas: </label>
                    <input
                      id="shopping_areas"
                      type="text"
                      defaultValue={listings.property.shopping_areas}
                      value={listings.property.shopping_areas}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.shopping_areas } />
                  </div>
                  <h2>Security Details</h2>
                  <div className="edit-property-popup-input-group">
                    <label htmlFor="arm">Arm Code: </label>
                    <input
                      id="arm"
                      type="text"
                      defaultValue={listings.property.arm}
                      value={listings.property.arm}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.arm } />
                    <label htmlFor="disarm">Disarm Code: </label>
                    <input
                      id="disarm"
                      type="text"
                      defaultValue={listings.property.disarm}
                      value={listings.property.disarm}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.disarm } />
                    <label htmlFor="passcode">Passcode: </label>
                    <input
                      id="passcode"
                      type="number"
                      defaultValue={listings.property.passcode}
                      value={listings.property.passcode}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.passcode } />
                    <label htmlFor="lockbox">Lockbox: </label>
                    <input
                      id="lockbox"
                      type="number"
                      defaultValue={listings.property.lock_box}
                      value={listings.property.lock_box}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.lock_box } />
                    <label htmlFor="alarm_notes">Alarm Notes: </label>
                    <textarea
                      id="alarm_notes"
                      rows={ TEXT_AREA_ROWS }
                      defaultValue={listings.property.alarm_notes}
                      value={listings.property.alarm_notes}
                      onChange={ handleChange }
                    />
                    <label htmlFor="occupied">Occupied?</label>
                    <input
                      id="occupied" 
                      type="checkbox" 
                      defaultValue={listings.property.occupied}
                      value={listings.property.occupied}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.occupied } />
                  </div>
                  <h2>Additional Details</h2>
                  <div className="edit-property-popup-input-group">
                    <label htmlFor="other">Additional Details: </label>
                    <textarea
                      id="other"
                      rows={ TEXT_AREA_ROWS }
                      defaultValue={listings.property.other}
                      value={listings.property.other}
                      onChange={ handleChange }
                    />
                  </div>
                </div>
              </div>
            </div>
            <button id="edit-property-popup-submit" disabled={ submitted } onClick={handleSubmit}>Edit Property</button>
            { submitted && <p id="edit-property-popup-submitted">{ submitted }</p> }
          </form>
        </div>
      </div>
    </div>
};

/* ===== EXPORTS ===== */
export default EditPropertyPopup;