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

    // FUNCTION 1: getListings - fetch listings for a page number, and update the listings and page number state
    // PRECONDITIONS (1 parameter):
    // 1.) num - an integer value representing the page number
    // 2.) pageLength - an integer value representing the number of results to be rendered per page
    // POSTCONDITIONS (1 possible outcome):
    // update the pageNumber state by calling the setPageNumber() function with the num parameter. then,
    // await the call to fetch array of Abbreviated Listings objects from the database. once the data has been receieved,
    // update the listing state by calling the setListing() function
    const getListings = async (num, pageLength) => {
        console.log(num);
        // compute the range of indicies to query
        const lower = num * pageLength - pageLength;
        const upper = num * pageLength - 1;

        // fetch array of listings from the database, and update the listings state
        const { abbreviatedListings, count } = await fetchAbbreviatedListings(lower, upper);

        // compute the max number of pages based on the count
        const maxPageNumber = Math.ceil(count / pageLength);

        // update states
        setPageNumber({ current: num, max: maxPageNumber });
        setListings(abbreviatedListings);
    };

    return { listings, pageNumber, getListings };
};

/* ===== EXPORTS ===== */
export default PropertyListings;