/* ===== IMPORTS ===== */
import "./AddPropertyPopup.css";
import { AgentContext } from "../../../Contexts";
import { useContext } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddPropertyPopupLogic from "./AddPropertyPopup.js";
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorMessage from "./ErrorMessage";
import FrontendHelper from "../../../util/FrontendHelper";
import RoomInput from "../../../ui/RoomInput/RoomInput.jsx";
import ShoppingInput from "../../../ui/ShoppingInput/ShoppingInput";

function AddPropertyPopup({ popup, setPopup }) {
  /* ===== VARIABLES ===== */
  const MAX_SHOPPING_AREAS = 3;
  const TEXT_AREA_ROWS = 4;
  const ROOMS_PER_COL = 5;

  /* ===== CONTEXTS ===== */
  const { agent } = useContext(AgentContext);

  /* ===== STATES & FUNCTIONS ===== */

  // states and functions fron the js file
  const { 
    dwellings, 
    error,
    propertyForm, 
    roomTypes, 
    submitted,
    handleChange, 
    handleRoomChange, 
    addRoom, 
    removeRoom,
    handleShoppingAreaChange,
    addShoppingArea,
    removeShoppingArea,
    handleSubmit,
    closePopup
  } = AddPropertyPopupLogic();

  // helper functions
  const { snakeToTitle } = FrontendHelper();

  /* ===== ADD PROPERTY POPUP ===== */
  return popup &&
    <div className="add-property-popup">
      <div className="add-property-popup-inner">
        <div className="add-property-popup-container">

          { /* Button to close the popup */ }
          <button className="close-btn" onClick={ () => closePopup(setPopup) }><CancelIcon /></button>

          { /* Popup header */ }
          <div className="add-property-popup-header">
            <h1>Add Property</h1>
          </div>

          { /* Add popup form: allows an agent to enter information about a property */ }
          <form onSubmit={ handleSubmit }>
            <div className="add-property-popup-body">

              { /* LEFT SECTION of Add Property Popup Form */ }
              <div className="add-property-popup-section">
                <div className="add-property-popup-wrapper">

                  { /* Agency Details section: simply displays the current agent's agency, as well as their name. */ }
                  <h2>Agency Details</h2>
                  <div className="add-proeprty-popup-input-group">
                    <p>Agency: <b>{ agent.agency.name }</b></p>
                    <p>Listing Agent: <b>{ agent.name }</b></p>
                  </div>

                  { /* Price section: allows agent to enter the price of the listing. */ }
                  <h2>Price</h2>
                  <div className="add-property-popup-input-group">
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

                  { /* Address section: allows agent to enter the address of the property: street, city, state, zip code */ }
                  <h2>Address</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="street">Street: </label>
                    <input
                      id="street"
                      type="text"
                      value={ propertyForm.property.address }
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.street } />
                    <label htmlFor="city">City: </label>
                    <input 
                      id="city"
                      type="text"
                      value={ propertyForm.property.city }
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.city } />
                    <label htmlFor="state">State: </label>
                    <input
                      id="state"
                      type="text"
                      value={ propertyForm.property.state }
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.state } />
                    <label htmlFor="zip">ZIP Code: </label>
                    <input
                      id="zip"
                      type="text"
                      value={ propertyForm.property.zip }
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.zip } />
                  </div>

                  { /* Property Sizes section: Allows agent to enter information relating to the size of the property:
                  lot size, net square footage, and dwelling type */ }
                  <h2>Property Sizes</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="lot_size">Lot Size (Square Feet): </label>
                    <input
                      id="lot_size"
                      type="number"
                      value={ propertyForm.property.lot_size }
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.lot_size } />
                    <label htmlFor="sqr_feet">Net Square Footage: </label>
                    <input
                      id="sqr_feet"
                      type="number"
                      value={ propertyForm.property.sqr_feet }
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.sqr_feet } />
                    <label htmlFor="dwelling_type">Dwelling Type: </label>
                    <select id="dwelling_type" value={ propertyForm.property.dwelling_type } onChange={ handleChange }>
                      { dwellings.map(option => {
                        return <option key={ option } value={ option }>
                          { snakeToTitle(option) }
                        </option>
                      })}
                    </select>
                  </div>
                </div>
              </div>

              { /* MIDDLE SECTION OF Add Property Popup */ }
              <div className="add-property-popup-section">
                <div className="add-property-popup-wrapper">
                  <h2>Rooms</h2>
                  <div className="add-property-popup-input-group">
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
                      <button className="add-room-btn" onClick={ addRoom }>
                        <AddCircleOutlineIcon /> Add Room
                      </button> }
                  </div>
                </div>
              </div>
              <div className="add-property-popup-section">
                <div className="add-property-popup-wrapper">
                    { propertyForm.rooms.length > ROOMS_PER_COL &&
                    <div className="add-property-popup-input-group">
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
                          className="add-room-btn"
                          onClick={ addRoom } 
                          disabled={ propertyForm.rooms.length === ROOMS_PER_COL*2+1 
                        }><AddCircleOutlineIcon /> Add Room</button> 
                      }
                    </div>
                    }
                </div>
              </div>

              { /* RIGHT SECTION of Add Property Popup Form */ }
              <div className="add-property-popup-section">
                <div className="add-property-popup-wrapper">

                  { /* Location Details section: Allows agent to enter information about the location of the property: subdivision,
                  school district, and shopping areas */ }
                  <h2>Location Details</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="subdivision">Subdivision (optional): </label>
                    <input 
                      id="subdivision"
                      type="text"
                      value={ propertyForm.property.subdivision }
                      onChange={ handleChange }
                    />
                    <label htmlFor="school_district">School District: </label>
                    <input
                      id="school_district"
                      type="text"
                      value={ propertyForm.property.school_district }
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

                  { /* Security Details section: Allows agent to enter security information relating to the property: arm code,
                  disarm code, passcode, lockbox, alarm notes, and occupation status. */ }
                  <h2>Security Details</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="arm">Arm Code: </label>
                    <input
                      id="arm"
                      type="text"
                      value={ propertyForm.property.arm }
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.arm } /> 
                    <label htmlFor="disarm">Disarm Code: </label>
                    <input
                      id="disarm"
                      type="text"
                      value={ propertyForm.property.disarm }
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.disarm } />
                    <label htmlFor="passcode">Passcode (optional): </label>
                    <input
                      id="passcode"
                      type="number"
                      value={ propertyForm.property.passcode }
                      onChange={ handleChange }
                    />
                    <label htmlFor="lock_box">Lockbox Code: </label>
                    <input
                      id="lock_box"
                      type="number"
                      value={ propertyForm.property.lock_box }
                      onChange={ handleChange }
                    />
                    <ErrorMessage message={ error.lockbox } />
                    <label htmlFor="alarm_notes">Alarm Notes (optional): </label>
                    <textarea
                      id="alarm_notes"
                      rows={ TEXT_AREA_ROWS }
                      value={ propertyForm.property.alarm_notes }
                      onChange={ handleChange }
                    />
                    <label htmlFor="occupied">Occupied?</label>
                    <input
                      id="occupied" 
                      type="checkbox" 
                      checked={ propertyForm.property.occupied }
                      onChange={ handleChange }
                    />
                  </div>

                  { /* Additional Details section - allows agent to enter any additional details about the property in a textbox */ }
                  <h2>Additional Details</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="other">Additional Details (optional): </label>
                    <textarea
                      id="other"
                      rows={ TEXT_AREA_ROWS }
                      value={ propertyForm.property.other }
                      onChange={ handleChange }
                    />
                  </div>

                </div>
              </div>
            </div>

            { /* Add Property button - when pressed, the application will attempt to add the property listing to the database */ }
            <button id="add-property-popup-submit" disabled={ submitted }>Add Property</button>
            { submitted && <p id="add-property-popup-submitted">{ submitted }</p> }

          </form>
        </div>
      </div>
    </div>
};

/* ===== EXPORTS ===== */
export default AddPropertyPopup;