/* ===== IMPORTS ===== */
import "./PropertyListing.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PropertyListingsLogic from "./PropertyListing.js";

function PropertyListing() {
    /* ===== STATES & FUNCTIONS ===== */

    // states and functions from the PropertyListing js file
    const { listings, getListings } = PropertyListingsLogic();

    /* ===== EFFECTS ===== */
    useEffect(() => {
        getListings();
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

                // Property Listings Body - render the listings
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
                            { listings.map(listing => {
                                return <tr key={ listing.listing_id }>
                                    <td>
                                        <Link to={ `${ listing.listing_id }` }>📄</Link>
                                    </td>
                                    <td>${ listing.price }</td>
                                    <td>{ listing.property.street }, { listing.property.city }, { listing.property.state } { listing.property.zip }</td>
                                    <td>{ listing.property.sqr_feet }</td>
                                    <td>{ listing.agent.agency.name }</td>
                                    <td>{ listing.agent.name }</td>
                                </tr>
                            }) }
                        </tbody>

                    </table>
                </div>

            :

                // Loading component
                <p>Loading...</p>
            }

        </>
    );
};

/* ===== EXPORTS ===== */
export default PropertyListing;