/* ===== IMPORTS ===== */
import { useReducer, useState } from "react";
import Read from "../../database/Read";

const PropertyListings = () => {
    /* ===== VARIABLES ====== */
    const initFilterForm = {
        price: { min: "100000", max: "10000000" },
        sqrFeet: { min: "1000", max: "5000" },
        zip: "",
        error: { price: null, sqrFeet: null, zip: null }
    };

    /* ===== filterForm FUNCTION ===== */

    // FUNCTION 1: updateFilterFormState - function that will handle update the filterForm reducer
    // PRECONDITIONS (2 parameters):
    // 1.) state - the filterForm state. THIS PARAMETER IS IMPLICITY PASSED!
    // 2.) action - an object with two parameters:
        // a.) type - specifies how the state should be updated. it must be one of the 6 string values:
        // "minPrice", "maxPrice", "minSqrFeet", "maxSqrFeet", "zip", "error". otherwise, this function does nothing
        // b.) value - contains the new value
    // POSTCONDITIONS (5 possible outcomes):
    // one of the six fields of the filterForm state will be updated. a switch state handles each case
    const updateFilterFormState = (state, action) => {
        switch (action.type) {
            case "min-price":
                return { ...state, price: { ...state.price, min: action.value } };
            case "max-price":
                return { ...state, price: { ...state.price, max: action.value } };
            case "min-sqrFeet":
                return { ...state, sqrFeet: { ...state.sqrFeet, min: action.value } };
            case "max-sqrFeet":
                return { ...state, sqrFeet: { ...state.sqrFeet, max: action.value } };
            case "zip":
                return { ...state, zip: action.value };
            case "error":
                return { ...state, error: action.value };
            default:
                return state;
        };
    };

    /* ===== STATES & REDUCERS ===== */
    const [listings, setListings] = useState(undefined);
    const [pageNumber, setPageNumber] = useState(undefined);
    const [filterForm, dispatchFilterForm] = useReducer(updateFilterFormState, initFilterForm);

    /* ===== FUNCTIONS ===== */

    // functions used to read from database
    const { fetchAbbreviatedListings } = Read();

    // FUNCTION 2: getListings - fetch listings, and update the listings and page number state
    // PRECONDITIONS (1 parameter):
    // 1.) pageLength - an integer value representing the number of results to be rendered per page
    // POSTCONDITIONS (1 possible outcome):
    // await the call to fetch array of Abbreviated Listings objects from the database. once the data has been receieved,
    // update the listing state by calling the setListing() function. then, update the pageNumber state by calling the
    // setPageNumber() function. this function resets the current page back to 1, and sets the max parameter based on the
    // number of listings returned by the query.
    const getListings = async (pageLength) => {
        // fetch array of listings from the database, and update the listings state
        const abbreviatedListings = await fetchAbbreviatedListings(filterForm);
        setListings(abbreviatedListings);

        // compute the max number of pages based on the count of listings returned by the query, & update the
        // pageNumber state
        const count = abbreviatedListings.length;
        const maxPageNumber = Math.ceil(count / pageLength);
        setPageNumber({ current: 1, max: maxPageNumber });
    };

    // FUNCTION 3: applyFilters function
    // PRECONDITIONS (2 parameters):
    // 1.) e: an event object generated when the form is submitted
    // 2.) pageLength: the number of listings to render on a page
    // POSTCONDITIONS (2 possible outcomes):
    // if the filter form fails to validate, then the function will update the error state, which will alert the user
    // of any formatting mistakes they made, and returns the function early
    // if the filter form validates, then getListings(pageLength) is called, which requeries the listings with updated filters
    const applyFilters = (e, pageLength) => {
        // prevent page from reloading (default form submission behavior)
        e.preventDefault();
        let error = { price: null, sqrFeet: null, zip: null };

        // first, let's validate the price inputs
        const maxPrice = parseInt(filterForm.price.max), minPrice = parseInt(filterForm.price.min);
        if (minPrice > maxPrice) {
            error.price = "The minimum price cannot be greater than the maximum price.";
        }

        // next, let's validate the square footage inputs
        const maxSqrFeet = parseInt(filterForm.sqrFeet.max), minSqrFeet = parseInt(filterForm.sqrFeet.min);
        if (minSqrFeet > maxSqrFeet) {
            error.sqrFeet = "The mimimum square footage cannot be greater than the maximum square footage.";
        }

        // finally, validate the zip code
        const zip = filterForm.zip;
        if (zip.length !== 0 && zip.length !== 5) {
            error.zip = "Not a valid zip code.";
        }

        // loop through the error object. if any fields are null, we want to update the error field in the filterForm, and
        // return early (do NOT want to update listings state)
        if (Object.values(error).some(val => val !== null)) {
            dispatchFilterForm({ type: "error", value: error });
            return;
        }
        
        // if we made it this far, simply make a call to getListings
        getListings(pageLength);
    };

    // FUNCTION 4: filterListings - generate a filtered array of listings based on the page number and page length
    // PRECONDITIONS (1 parameter):
    // 1.) pageLength - an integer value representing the number of results to be rendered per page
    // it is required the the pageNumber state be defined before this function is called
    // POSTCONDITIONS (1 possible outcome):
    // the lower and upper indicies of the array are computed based on the pageLength and pageNumber.current field.
    // then, we return:
    // 1.) a filtered copy of listings, filtered based on the lower and upper values
    const filterListingsByPage = (pageLength) => {
        // compute the range of indicies to render
        const lower = pageNumber.current * pageLength - pageLength;
        const upper = pageNumber.current * pageLength;

        return listings.filter((_, i) => {
            return i >= lower && i < upper;
        });
    };

    // FUNCTION 5: handlePageChange - function that handles when the user switches to a different page
    // PRECONDITIONS (1 parameter):
    // 1.) num - an integer value representing the new page number. this number must be between 1 and pageNumber.max
    // POSTCONDITIONS (1 possible outcome):
    // update the pageNumber state by calling the setPageNumber() function. only change the current field; the max field
    // will not change
    // number of listings returned by the query.
    const handlePageChange = (num) => {
        setPageNumber({ current: num, max: pageNumber.max });
    };

    return { 
        listings, 
        pageNumber, 
        filterForm, 
        getListings, 
        dispatchFilterForm, 
        applyFilters,
        filterListingsByPage, 
        handlePageChange
    };
};

/* ===== EXPORTS ===== */
export default PropertyListings;