/* ===== IMPORTS ===== */
import "../PropertyListing.css";
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FrontendHelper from "../../../util/FrontendHelper";
import PropertyImage from '../../../ui/PropertyImage/PropertyImage.jsx';

function ListingRow({ listing }) {
  /* ===== VARIABLES ===== */
  const navigate = useNavigate();

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
      
    </tr>
  );
};

/* ===== EXPORTS ===== */
export default ListingRow;