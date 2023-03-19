/* ===== IMPORTS ===== */
import { useState } from "react";
import Read from "../../database/Read";

const PropertyListings = () => {
    /* ===== STATES ===== */
    const [listings, setListings] = useState(undefined);

    /* ===== FUNCTIONS ===== */

    // functions used to read from database
    const { fetchAbbreviatedListings } = Read();

    // FUNCTION 1: getListings - fetch listings and update listing state
    // PRECONDITIONS
    // none [for now, this will change]
    // POSTCONDITIONS (1 possible outcome):
    // await the call to fetch array of Abbreviated Listings objects from the database. once the data has been receieved,
    // update the listing state by calling the setListing() function
    const getListings = async () => {
        const abbreviatedListings = await fetchAbbreviatedListings();
        setListings(abbreviatedListings);
    };

    return { listings, getListings };
};

/* ===== EXPORTS ===== */
export default PropertyListings;