/* ===== IMPORTS ===== */
import { useState } from "react";
import Read from "../../database/Read";

const PropertyListings = () => {
    /* ===== STATES ===== */
    const [listings, setListings] = useState(undefined);
    const [showForm, toggleForm] = useState(false)

    /* ===== FUNCTIONS ===== */

    // functions used to read from database
    const { fetchFullListing } = Read();


    const getCurrListing = async (id) => {
        // fetch current listing from the database, and update the listings state
        const currentListing = await fetchFullListing(id);
        setListings(currentListing);
    };

    const generateCopyListing = () => {
        // first, create listing object
        const listing = { listing_id: listings.listing_id, price: listings.price };

        // next, the property object
        const property = { ...listings.property };
        delete property.room;
        // we want to replace all null fields with empty strings for the form
        for (const [key, value] of Object.entries(property)) {
            if (value === null) {
                property[key] = "";
            }
        }

        // finally, create the rooms array
        const rooms = listings.property.room;

        // return copy of listing object, formatted for the edit property popup
        const copyListing = { listing: listing, property: property, rooms: rooms };
        return copyListing;
    };

    return { listings, getCurrListing, generateCopyListing, showForm, toggleForm };
};

/* ===== EXPORTS ===== */
export default PropertyListings;