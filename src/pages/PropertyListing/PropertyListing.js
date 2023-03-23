/* ===== IMPORTS ===== */
import { useState } from "react";
import Read from "../../database/Read";

const PropertyListings = () => {
    /* ===== STATES ===== */
    const [listings, setListings] = useState(undefined);
    const [pageNumber, setPageNumber] = useState(undefined);

    /* ===== FUNCTIONS ===== */

    // functions used to read from database
    const { fetchAbbreviatedListings } = Read();

    // FUNCTION 1: getListings - fetch listings, and update the listings and page number state
    // PRECONDITIONS (1 parameter):
    // 1.) pageLength - an integer value representing the number of results to be rendered per page
    // POSTCONDITIONS (1 possible outcome):
    // await the call to fetch array of Abbreviated Listings objects from the database. once the data has been receieved,
    // update the listing state by calling the setListing() function. then, update the pageNumber state by calling the
    // setPageNumber() function. this function resets the current page back to 1, and sets the max parameter based on the
    // number of listings returned by the query.
    const getListings = async (pageLength) => {
        // fetch array of listings from the database, and update the listings state
        const abbreviatedListings = await fetchAbbreviatedListings();
        setListings(abbreviatedListings);

        // compute the max number of pages based on the count of listings returned by the query, & update the
        // pageNumber state
        const count = abbreviatedListings.length;
        const maxPageNumber = Math.ceil(count / pageLength);
        setPageNumber({ current: 1, max: maxPageNumber });
    };

    // FUNCTION 2: filterListings - generate a filtered array of listings based on the page number and page length
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

    // FUNCTION 3: handlePageChange - function that handles when the user switches to a different page
    // PRECONDITIONS (1 parameter):
    // 1.) num - an integer value representing the new page number. this number must be between 1 and pageNumber.max
    // POSTCONDITIONS (1 possible outcome):
    // update the pageNumber state by calling the setPageNumber() function. only change the current field; the max field
    // will not change
    // number of listings returned by the query.
    const handlePageChange = (num) => {
        setPageNumber({ current: num, max: pageNumber.max });
    }

    return { listings, pageNumber, getListings, filterListingsByPage, handlePageChange };
};

/* ===== EXPORTS ===== */
export default PropertyListings;