/* ===== IMPORTS ===== */
import { useState } from "react";
import Read from "../../database/Read";

const PropertyListings = () => {
    /* ===== STATES ===== */
    const [listings, setListings] = useState(undefined);

    /* ===== FUNCTIONS ===== */

    // functions used to read from database
    const { fetchFullListing } = Read();

    const getCurrListing = async (id) => {
        // fetch current listing from the database, and update the listings state
        const currentListing = await fetchFullListing(id);
        setListings(currentListing);
    };

    return { listings, getCurrListing };
};

/* ===== EXPORTS ===== */
export default PropertyListings;