/* ===== IMPORTS ===== */
import "../DetailedListing.css";
import { AgentContext } from "../../../Contexts";
import { useContext } from "react";
import DetailedListingsLogic from "../DetailedListing.js";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AddPropertyPopup({ popup, setPopup }) {
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

  /* ===== EFFECTS ===== */
  useEffect(() => {
    getCurrListing(page_id);
  }, []);

  /* ===== ADD PROPERTY POPUP ===== */
  return popup &&
    <div className="popup">
      <div className="popup-inner">
        <div className="add-property-popup">
          { /* Button to close the popup */ }
          <button className="close-btn" onClick={ () => setPopup(false) }>Close</button>

          <div className="add-property-popup-header">
            <h1>Edit Property</h1>
          </div>
          <form>
            <div className="add-property-popup-body">
              <div className="add-property-popup-half">
                <div className="add-property-popup-wrapper">
                  <h2>Agency Details</h2>
                  <div className="add-proeprty-popup-input-group">
                    <p>Agency: <b>{ listings.agent.agency.name }</b></p>
                    <p>Listing Agent: <b>{ listings.agent.name }</b></p>
                  </div>
                  <h2>Price</h2>
                  <div className="add-property-popup-input">
                    <label htmlFor="price">Price: </label>
                    $<input
                      id="price"
                      type="number"
                      step="0.01"
                      value={listings.price}
                    />
                  </div>
                  <h2>Address</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="street">Street: </label>
                    <input
                      id="street"
                      type="text"
                      value={listings.property.street}
                    />
                    <label htmlFor="city">City: </label>
                    <input 
                      id="city"
                      type="text"
                      value={listings.property.city}
                    />
                    <label htmlFor="state">State: </label>
                    <input
                      id="state"
                      type="text"
                      value={listings.property.state}
                    />
                    <label htmlFor="zip">ZIP Code: </label>
                    <input
                      id="zip"
                      type="text"
                      value={listings.property.zip}
                    />
                  </div>
                  <h2>Property Sizes</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="lot_size">Lot Size (Square Feet): </label>
                    <input
                      id="lot_size"
                      type="number"
                      value={listings.property.lot_size}
                    />
                    <label htmlFor="sqr_feet">Net Square Footage: </label>
                    <input
                      id="sqr_feet"
                      type="number"
                      value={listings.property.sqr_feet}
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
                      value={listings.property.subdivision}
                    />
                    <label htmlFor="school_district">School District: </label>
                    <input
                      id="school_district"
                      type="text"
                      value={listings.property.school_district}
                    />
                    <label htmlFor="shopping_areas">Shopping Areas: </label>
                    <input
                      id="shopping_areas"
                      type="text"
                      value={listings.property.shopping_areas}
                    />
                  </div>
                  <h2>Security Details</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="arm">Arm Code: </label>
                    <input
                      id="arm"
                      type="text"
                      value={listings.property.arm}
                    />
                    <label htmlFor="disarm">Disarm Code: </label>
                    <input
                      id="disarm"
                      type="text"
                      value={listings.property.disarm}
                    />
                    <label htmlFor="passcode">Passcode: </label>
                    <input
                      id="passcode"
                      type="number"
                      value={listings.property.passcode}
                    />
                    <label htmlFor="lockbox">Lockbox: </label>
                    <input
                      id="lockbox"
                      type="number"
                      value={listings.property.lock_box}
                    />
                    <label htmlFor="alarm_notes">Alarm Notes: </label>
                    <textarea
                      id="alarm_notes"
                      rows={ TEXT_AREA_ROWS }
                      value={listings.property.alarm_notes}
                    />
                    <label htmlFor="occupied">Occupied?</label>
                    <input
                      id="occupied" 
                      type="checkbox" 
                      value={listings.property.occupied}
                    />
                  </div>
                  <h2>Additional Details</h2>
                  <div className="add-property-popup-input-group">
                    <label htmlFor="other">Additional Details: </label>
                    <textarea
                      id="other"
                      rows={ TEXT_AREA_ROWS }
                      value={listings.property.other}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button>Edit Property</button>
          </form>
        </div>
      </div>
    </div>
};

/* ===== EXPORTS ===== */
export default AddPropertyPopup;