/* ===== IMPORTS ===== */
import "../PropertyListing.css";
import { AgentContext } from "../../../Contexts";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import HomeIcon from "@mui/icons-material/Home";
import FrontendHelper from "../../../util/FrontendHelper";
import PropertyImage from '../../../ui/PropertyImage/PropertyImage.jsx';

function ListingRow({ listing, setDeletePopup }) {
  /* ===== VARIABLES ===== */
  const navigate = useNavigate();

  /* ===== CONTEXTS ===== */
  const { agent } = useContext(AgentContext);

  /* ===== FUNCTIONS ====== */

  // helper functions
  const { floatToUSD, formatFloat, getAddress } = FrontendHelper();

  /* ===== LISTING ROW COMPONENT ===== */
  return (
    <tr>

      { /* Clickable home icon, which navigates user to the detailed property page. */ }
      <td>
        <HomeIcon onClick={ () => navigate(`${ listing.listing_id }`) } />
      </td>

      { /* PropertyImage - renders the small image corresponding to the property. */ }
      <td id="property-listing-img-td">
        <div className="property-listing-img-container">
          <PropertyImage filename={ listing.property.small } />
        </div>
      </td>

      {/* Property data - price, address, square footage, agency name, and agent */}
      <td>{ floatToUSD(listing.price) }</td>
      <td>{ getAddress(listing.property) }</td>
      <td>{ formatFloat(listing.property.sqr_feet) }</td>
      <td>{ listing.agent.agency.name }</td>
      <td>{ listing.agent.name }</td>

      { /* Delete column - renders only if an agent is signed in. Normal users will not have access to this button. */ }
      { agent && <td className="property-listing-delete">
        <button 
          onClick={ () => setDeletePopup({ listingId: listing.listing_id, propertyId: listing.property.property_id }) }
          disabled={ listing.agent.agency.agency_id !== agent.agency.agency_id }
        >
          <ClearIcon />
        </button>
      </td> }
      
    </tr>
  );
};

/* ===== EXPORTS ===== */
export default ListingRow;