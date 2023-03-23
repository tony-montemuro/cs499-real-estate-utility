/* ===== IMPORTS ===== */
import "./PropertyListing.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import FrontendHelper from "../../util/FrontendHelper";
import PropertyListingsLogic from "./PropertyListing.js";

function PropertyListing() {
    /* ===== VARIABLES ===== */
    const NUM_PAGE_RESULTS = 10;

    /* ===== STATES & FUNCTIONS ===== */

    // states and functions from the PropertyListing js file
    const { listings, pageNumber, getListings, filterListingsByPage, handlePageChange } = PropertyListingsLogic();

    // helper functions
    const { floatToUSD, formatFloat, getAddress } = FrontendHelper();

    /* ===== EFFECTS ===== */
    useEffect(() => {
        getListings(NUM_PAGE_RESULTS);
        // eslint-disable-next-line
    }, []);

    /* ===== PROPERTY LISTING COMPONENT ===== */
    return (
        <>
            { /* Property Listing Header - contains header information for this page */ }
            <div className="property-listings-header">
                <h1>Property Listings</h1>
            </div>

            { /* Render the body of this component if listings is defined. Otherwise, render a loading component. */ }
            { listings ?
                <>
                    { /* Property Listings Body - render the listings */ }
                    <div className="property-listing-body">
                        <table>

                            { /* Table Header */ }
                            <thead>
                                <tr>
                                    <th>Details</th>
                                    <th>List Price</th>
                                    <th>Address</th>
                                    <th>Square Footage</th>
                                    <th>Listing Agency</th>
                                    <th>Listing Agent</th>
                                </tr>
                            </thead>

                            { /* Table Body - Listing information, rendered for each listing object in the listing state. */ }
                            <tbody>
                                { filterListingsByPage(NUM_PAGE_RESULTS).map(listing => {
                                    return <tr key={ listing.listing_id }>
                                        <td>
                                            <Link to={ `${ listing.listing_id }` }>📄</Link>
                                        </td>
                                        <td>{ floatToUSD(listing.price) }</td>
                                        <td>{ getAddress(listing.property) }</td>
                                        <td>{ formatFloat(listing.property.sqr_feet) }</td>
                                        <td>{ listing.agent.agency.name }</td>
                                        <td>{ listing.agent.name }</td>
                                    </tr>
                                }) }
                            </tbody>

                        </table>
                    </div>

                    { /* Property Listing Footer - contains footer information for this page */ }
                    <div className="property-listing-footer">

                        { /* Button that moves back 1 page */ }
                        <button 
                            disabled={ pageNumber.current === 1 } 
                            onClick={ () => handlePageChange(pageNumber.current-1) }
                        >
                            Previous Page
                        </button>

                        { /* Page number selector - allows user to select any page from 1 to pageNumber.max */ }
                        <div className="property-listing-page-select">
                            <label htmlFor="pageNumber">Page Number: </label>
                            <select id="pageNumber" value={ pageNumber.current } onChange={ (e) => handlePageChange(parseInt(e.target.value)) }>
                            { Array.from({ length: pageNumber.max }, (_, i) => i + 1).map(num => (
                                <option key={ num } value={ num }>
                                    { num }
                                </option>
                            ))}
                            </select>
                        </div>

                        { /* Button that moves forward 1 page */ }
                        <button 
                            disabled={ pageNumber.current === pageNumber.max } 
                            onClick={ () => handlePageChange(pageNumber.current+1) }
                        >
                            Next Page
                        </button>
                    </div>
                </>

            :

                // Loading component
                <p>Loading...</p>
            }

        </>
    );
};

/* ===== EXPORTS ===== */
export default PropertyListing;