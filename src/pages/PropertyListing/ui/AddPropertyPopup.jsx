/* ===== IMPORTS ===== */
import "../PropertyListing.css";
import { AgentContext } from "../../../Contexts";
import { useContext } from "react";

function AddPropertyPopup({ popup, setPopup }) {
  /* ===== VARIABLES ===== */
  const dwellings = ["single", "family", "multi_family", "duplex", "apartment", "condo", "town_house", "mobile"];
  const TEXT_AREA_ROWS = "4";

  /* ===== CONTEXTS ===== */
  const { agent } = useContext(AgentContext);
  console.log(agent);

  /* ===== ADD PROPERTY POPUP ===== */
  return popup &&
    <div className="popup">
      <div className="popup-inner">
        <div className="add-property-popup">
          { /* Button to close the popup */ }
          <button className="close-btn" onClick={ () => setPopup(false) }>Close</button>

          <div className="add-property-popup-header">
            <h1>Add Property</h1>
          </div>
          <form>
            <div className="add-property-popup-body">
              <div className="add-property-popup-half">
                <div className="add-property-popup-wrapper">
                  <h2>Agency Details</h2>
                  <div className="add-proeprty-popup-input-group">
                    <p>Agency: <b>{ agent.agency.name }</b></p>
                    <p>Listing Agent: <b>{ agent.name }</b></p>
                  </div>
                  <h2>Price</h2>
                  <div className="add-property-popup-input">
                    <label htmlFor="price">Price: </label>
                    $<input
                      id="price"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <h2>Address</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="street">Street: </label>
                    <input
                      id="street"
                      type="text"
                    />
                    <label htmlFor="city">City: </label>
                    <input 
                      id="city"
                      type="text"
                    />
                    <label htmlFor="state">State: </label>
                    <input
                      id="state"
                      type="text"
                    />
                    <label htmlFor="zip">ZIP Code: </label>
                    <input
                      id="zip"
                      type="text"
                    />
                  </div>
                  <h2>Property Sizes</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="lot_size">Lot Size (Square Feet): </label>
                    <input
                      id="lot_size"
                      type="number"
                    />
                    <label htmlFor="sqr_feet">Net Square Footage: </label>
                    <input
                      id="sqr_feet"
                      type="number"
                    />
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
              <div className="add-property-popup-half">
                <div className="add-property-popup-wrapper">
                  <h2>Location Details</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="subdivision">Subdivision: </label>
                    <input 
                      id="subdivision"
                      type="text"
                    />
                    <label htmlFor="school_district">School District: </label>
                    <input
                      id="school_district"
                      type="text"
                    />
                    <label htmlFor="shopping_areas">Shopping Areas: </label>
                    <input
                      id="shopping_areas"
                      type="text"
                    />
                  </div>
                  <h2>Security Details</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="arm">Arm Code: </label>
                    <input
                      id="arm"
                      type="text"
                    />
                    <label htmlFor="disarm">Disarm Code: </label>
                    <input
                      id="disarm"
                      type="text"
                    />
                    <label htmlFor="passcode">Passcode: </label>
                    <input
                      id="passcode"
                      type="number"
                    />
                    <label htmlFor="lockbox">Lockbox: </label>
                    <input
                      id="lockbox"
                      type="number"
                    />
                    <label htmlFor="alarm_notes">Alarm Notes: </label>
                    <textarea
                      id="alarm_notes"
                      rows={ TEXT_AREA_ROWS }
                    />
                    <label htmlFor="occupied">Occupied?</label>
                    <input
                      id="occupied" 
                      type="checkbox" 
                    />
                  </div>
                  <h2>Additional Details</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="other">Additional Details: </label>
                    <textarea
                      id="other"
                      rows={ TEXT_AREA_ROWS }
                    />
                  </div>
                </div>
              </div>
            </div>
            <button>Add Property</button>
          </form>
        </div>
      </div>
    </div>
};

/* ===== EXPORTS ===== */
export default AddPropertyPopup;