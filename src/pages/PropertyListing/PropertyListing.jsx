/* ===== IMPORTS ===== */
import "./PropertyListing.css";
import { useEffect } from "react";
import FilterForm from "./ui/FilterForm";
import ListingRow from "./ui/ListingRow";
import PropertyListingLogic from "./PropertyListing.js";

function PropertyListing() {
    /* ===== VARIABLES ===== */
    const MLS_WIDTH = 7;
    const NUM_PAGE_RESULTS = 10;

    /* ===== STATES & FUNCTIONS ===== */

    // states and functions from the PropertyListing js file
    const { 
        listings, 
        pageNumber,
        filterForm, 
        getListings, 
        dispatchFilterForm, 
        applyFilters,
        filterListingsByPage, 
        handlePageChange 
    } = PropertyListingLogic();

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

                        { /* Multiple Listing Service */ }
                        <div className="property-listing-mls">
                            <table>

                                { /* Table Header */ }
                                <thead>
                                    <tr>
                                        <th>Details</th>
                                        <th>Property Photo</th>
                                        <th>List Price</th>
                                        <th>Address</th>
                                        <th>Square Footage</th>
                                        <th>Listing Agency</th>
                                        <th>Listing Agent</th>
                                    </tr>
                                </thead>

                                { /* Table Body - Listing information, rendered for each listing object in the listing state. */ }
                                <tbody>

                                    {/* If any listings exist, we can render a series of listing rows. */}
                                    { listings.length > 0 ?
                                        filterListingsByPage(NUM_PAGE_RESULTS).map(listing => {
                                            return <ListingRow listing={ listing } key={ listing.listing_id } />;
                                        })
                                    :

                                    // Otherwise, render a single row, stating that no properties could be found.
                                        <tr>
                                            <td className="property-listing-empty-row" colSpan={ MLS_WIDTH }><i>No properties exist within your filters!</i></td>
                                        </tr>
                                    }

                                </tbody>

                            </table>
                        </div>

                        { /* Multiple Listing Service Filter */ }
                        <FilterForm 
                            formState={ filterForm } 
                            updateFormState={ dispatchFilterForm }
                            applyFiltersFunc={ applyFilters }
                            pageLength={ NUM_PAGE_RESULTS } 
                        />
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
                            <select disabled={ pageNumber.max < 2 } id="pageNumber" value={ pageNumber.current } onChange={ (e) => handlePageChange(parseInt(e.target.value)) }>
                            { Array.from({ length: pageNumber.max }, (_, i) => i + 1).map(num => (
                                <option key={ num } value={ num }>
                                    { num }
                                </option>
                            ))}
                            </select>
                        </div>

                        { /* Button that moves forward 1 page */ }
                        <button 
                            disabled={ pageNumber.current === pageNumber.max || pageNumber.max === 0 } 
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