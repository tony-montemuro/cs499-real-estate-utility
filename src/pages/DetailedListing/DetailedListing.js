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

    // FUNCTION 2: uploadPhoto
    const uploadPhoto = (e, photoRef) => {
        console.log(photoRef);
    };

    // FUNCTION 3: uploadThumbnail
    const uploadThumbnail = (e, thumbnailRef) => {
        console.log(thumbnailRef);
    };

    return { listings, getCurrListing, showForm, toggleForm, uploadPhoto, uploadThumbnail };
};

/* ===== EXPORTS ===== */
export default PropertyListings;