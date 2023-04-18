/* ===== IMPORTS ===== */
import "./PropertyListing.css";
import { AgentContext } from "../../Contexts";
import { useContext, useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddPropertyPopup from "./ui/AddPropertyPopup.jsx";
import DeletePropertyPopup from "./ui/DeletePropertyPopup.jsx";
import FilterForm from "./ui/FilterForm";
import ListingRow from "./ui/ListingRow";
import PropertyListingLogic from "./PropertyListing.js";

function PropertyListing() {
    /* ===== VARIABLES ===== */
    const MLS_WIDTH = 7;
    const NUM_PAGE_RESULTS = 10;

    /* ===== CONTEXTS ===== */
    const { agent } = useContext(AgentContext);

    /* ===== STATES & FUNCTIONS ===== */
    const [addPopup, setAddPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);

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

                { /* Add Property Listing Button - only renders if an agent is currently logged in */ }
                { agent && <button onClick={ () => setAddPopup(true) }><AddCircleOutlineIcon /> Add Property Listing</button> }

            </div>

            { /* Render the body of this component if listings is defined. Otherwise, render a loading component. */ }
            { listings ?
                <>
                    { /* Property Listings Body - render the listings */ }
                    <div className="property-listing-body">

                        { /* Multiple Listing Service */ }
                        <div className="property-listing-mls">

                            <table className="property-listing-table">

                                { /* Table Header */ }
                                <thead>
                                    <tr>
                                        <th>Details</th>
                                        <th>Photo</th>
                                        <th>Price</th>
                                        <th>Address</th>
                                        <th>Square Footage</th>
                                        <th>Agency</th>
                                        <th>Agent</th>

                                        { /* Delete column header - only renders if an agent is logged in. */ }
                                        { agent && <th>Delete Listing</th> }
                                        
                                    </tr>
                                </thead>

                                { /* Table Body - Listing information, rendered for each listing object in the listing state. */ }
                                <tbody>

                                    {/* If any listings exist, we can render a series of listing rows. */}
                                    { listings.length > 0 ?
                                        filterListingsByPage(NUM_PAGE_RESULTS).map(listing => {
                                            return <ListingRow listing={ listing } setDeletePopup={ setDeletePopup } key={ listing.listing_id } />;
                                        })
                                    :

                                    // Otherwise, render a single row, stating that no properties could be found.
                                        <tr>
                                            <td 
                                                className="property-listing-empty-row" 
                                                colSpan={ agent ? MLS_WIDTH+1 : MLS_WIDTH }
                                            >
                                                <i>No properties exist within your filters!</i>
                                            </td>
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
                            &lt;
                        </button>

                        { /* Page number selector - allows user to select any page from 1 to pageNumber.max */ }
                        <div className="property-listing-page-select">
                            <label htmlFor="pageNumber">Page Number:&nbsp;</label>
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
                            &gt;
                        </button>

                    </div>
                    
                    <AddPropertyPopup popup={ addPopup } setPopup={ setAddPopup } />
                    <DeletePropertyPopup popup={ deletePopup } setPopup={ setDeletePopup } />
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