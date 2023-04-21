/* ===== IMPORTS ===== */
import "./EditPropertyPopup.css";
import { AgentContext } from "../../../Contexts";
import { useContext, useEffect } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import editProperty from "./EditListingPopup.js";
import ErrorMessage from "./EditErrorMessage";
import FrontendHelper from "../../../util/FrontendHelper";
import RoomInput from "../../../ui/RoomInput/RoomInput";
import ShoppingInput from "../../../ui/ShoppingInput/ShoppingInput";

function EditPropertyPopup({ popup, setPopup, formData }) {
  /* ===== VARIABLES ===== */
  const dwellings = ["single", "family", "multi_family", "duplex", "apartment", "condo", "town_house", "mobile"];
  const MAX_SHOPPING_AREAS = 3;
  const TEXT_AREA_ROWS = 4;
  const ROOMS_PER_COL = 5;

  /* ===== CONTEXTS ===== */
  const { agent } = useContext(AgentContext);

  // states and functions from the PropertyListing js file
  const { 
    roomTypes, 
    propertyForm,
    error,
    agents,
    setPropertyForm, 
    getAgents,
    handleChange, 
    handleRoomChange, 
    addRoom, 
    removeRoom, 
    handleShoppingAreaChange, 
    addShoppingArea, 
    removeShoppingArea, 
    handleSubmit, 
    closePopup
  } = editProperty();

  // helper functions
  const { snakeToTitle } = FrontendHelper();

  /* ===== EFFECTS ===== */
  useEffect(() => {
    // set the property form using the formData parameter each time the popup is opened
    if (popup) {
      setPropertyForm(formData);
      getAgents(agent.agency.agency_id);
    }
    // eslint-disable-next-line
  }, [popup]);

  /* ===== ADD PROPERTY POPUP ===== */
  return popup &&
    <div className="edit-property-popup">
      <div className="edit-property-popup-inner">
        <div className="edit-property-popup-container">
          { /* Button to close the popup */ }
          <button className="close-btn" onClick={ () => closePopup(setPopup) }><CancelIcon /></button>
          
          <div className="edit-property-popup-header">
            <h1>Edit Listing</h1>
          </div>
          <form onSubmit={ handleSubmit }>
            <div className="edit-property-popup-body">
              <div className="edit-property-popup-section">
              { /* LEFT SECTION OF Edit Property Popup */ }
                <div className="edit-property-popup-wrapper">
                  <h2>Agency Details</h2>
                  <div className="edit-property-popup-input-group">
                    <p>Agency: <b>{ agent.agency.name }</b></p>
                    <label htmlFor="agent">Listing Agent: </label>
                    { agents && 
                      <select id="agent" value={ propertyForm.listing.agent } onChange={ handleChange }>
                      { agents.map(agent => {
                        return <option key={ agent.agent_id } value={ agent.agent_id }>
                          { snakeToTitle(agent.name) }
                        </option>
                      })}
                      </select>
                    }
                  </div>
                  <h2>Price</h2>
                  <div className="edit-property-popup-input">
                    <label htmlFor="price">Price ($): </label>
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      value={ propertyForm.listing.price }
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
                      value={propertyForm.property.street}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.street } />
                    <label htmlFor="city">City: </label>
                    <input 
                      id="city"
                      type="text"
                      value={propertyForm.property.city}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.city } />
                    <label htmlFor="state">State: </label>
                    <input
                      id="state"
                      type="text"
                      value={propertyForm.property.state}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.state } />
                    <label htmlFor="zip">ZIP Code: </label>
                    <input
                      id="zip"
                      type="text"
                      value={propertyForm.property.zip}
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
                      value={propertyForm.property.lot_size}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.lot_size } />
                    <label htmlFor="sqr_feet">Net Square Footage: </label>
                    <input
                      id="sqr_feet"
                      type="number"
                      value={propertyForm.property.sqr_feet}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.sqr_feet } />
                    <label htmlFor="dwelling_type">Dwelling Type: </label>
                    <select name="dwelling_type" id="dwelling_type" value={ propertyForm.property.dwelling_type } onChange={ handleChange }>
                      { dwellings.map(option => {
                        return <option key={ option } value={ option }>
                          { snakeToTitle(option) }
                        </option>
                      })}
                    </select>
                  </div>
                </div>
              </div>

              { /* MIDDLE SECTION OF Edit Property Popup */ }
              <div className="edit-property-popup-section">
                <div className="edit-property-popup-wrapper">
                  <h2>Rooms</h2>
                  <div className="edit-property-popup-input-group">
                    { propertyForm.rooms.slice(0, ROOMS_PER_COL).map((room, index) => {
                      return <RoomInput 
                        room={ room } 
                        roomTypes={ roomTypes } 
                        handleChange={ handleRoomChange } 
                        handleDelete={ removeRoom } 
                        key={ index } 
                      />
                    })}
                    { propertyForm.rooms.length <= ROOMS_PER_COL && 
                      <button className="edit-room-btn" onClick={ addRoom }>
                        <AddCircleOutlineIcon /> Add Room
                      </button> }
                  </div>
                </div>
              </div>
              <div className="edit-property-popup-section">
                <div className="edit-property-popup-wrapper">
                    { propertyForm.rooms.length > ROOMS_PER_COL &&
                    <div className="edit-property-popup-input-group">
                      { propertyForm.rooms.slice(ROOMS_PER_COL).map((room, index) => {
                        return <RoomInput 
                        room={ room } 
                        roomTypes={ roomTypes } 
                        handleChange={ handleRoomChange } 
                        handleDelete={ removeRoom } 
                        key={ index } 
                      />
                      })}
                      { propertyForm.rooms.length > ROOMS_PER_COL && 
                        <button 
                          className="edit-room-btn"
                          onClick={ addRoom } 
                          disabled={ propertyForm.rooms.length === ROOMS_PER_COL*2+1 
                        }><AddCircleOutlineIcon /> Add Room</button> 
                      }
                    </div>
                    }
                </div>
              </div>
              { /* RIGHT SECTION OF Edit Property Popup */ }
              <div className="edit-property-popup-section">
                <div className="edit-property-popup-wrapper">
                  <h2>Location Details</h2>
                  <div className="edit-property-popup-input-group">
                    <label htmlFor="subdivision">Subdivision (optional): </label>
                    <input 
                      id="subdivision"
                      type="text"
                      value={propertyForm.property.subdivision}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.subdivision } />
                    <label htmlFor="school_district">School District: </label>
                    <input
                      id="school_district"
                      type="text"
                      value={propertyForm.property.school_district}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.school_district } />
                    <label htmlFor="shopping_areas">Shopping Areas: </label>
                    { propertyForm.property.shopping_areas.map((shoppingArea, index) => {
                      return <ShoppingInput 
                        shoppingArea={ shoppingArea } 
                        handleChange={ handleShoppingAreaChange }
                        handleDelete={ removeShoppingArea }
                        index={ index }
                        key={ index }
                      />
                    }) }
                    <button 
                      className="add-shopping-area-btn"
                      disabled={ propertyForm.property.shopping_areas.length >= MAX_SHOPPING_AREAS }
                      onClick={ addShoppingArea }
                    ><AddCircleOutlineIcon /> Add Shopping Area</button>
                  </div>
                  <h2>Security Details</h2>
                  <div className="edit-property-popup-input-group">
                    <label htmlFor="arm">Arm Code: </label>
                    <input
                      id="arm"
                      type="text"
                      value={propertyForm.property.arm}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.arm } />
                    <label htmlFor="disarm">Disarm Code: </label>
                    <input
                      id="disarm"
                      type="text"
                      value={propertyForm.property.disarm}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.disarm } />
                    <label htmlFor="passcode">Passcode (optional): </label>
                    <input
                      id="passcode"
                      type="number"
                      value={propertyForm.property.passcode}
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.passcode } />
                    <label htmlFor="lock_box">Lockbox: </label>
                    <input
                      id="lock_box"
                      type="number"
                      value={ propertyForm.property.lock_box } 
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.lock_box } />
                    <label htmlFor="alarm_notes">Alarm Notes (optional): </label>
                    <textarea
                      id="alarm_notes"
                      rows={ TEXT_AREA_ROWS }
                      value={propertyForm.property.alarm_notes}
                      onChange={ handleChange }
                    />
                    <label htmlFor="occupied">Occupied?</label>
                    <input
                      id="occupied" 
                      type="checkbox" 
                      checked={ propertyForm.property.occupied }
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.occupied } />
                  </div>
                  <h2>Additional Details</h2>
                  <div className="edit-property-popup-input-group">
                    <label htmlFor="other">Additional Details (optional): </label>
                    <textarea
                      id="other"
                      rows={ TEXT_AREA_ROWS }
                      value={propertyForm.property.other}
                      onChange={ handleChange }
                    />
                  </div>
                </div>
              </div>
            </div>
            { /* Submit button for edit listing form */ }
            <button id="edit-property-popup-submit" onClick={(e) => {handleSubmit(e, setPopup)}}>
              Edit Listing
            </button>
          </form>
        </div>
      </div>
    </div>
};

/* ===== EXPORTS ===== */
export default EditPropertyPopup;