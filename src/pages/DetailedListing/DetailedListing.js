/* ===== IMPORTS ===== */
import { useState } from "react";
import Read from "../../database/Read";
import Update from "../../database/Update";

const PropertyListings = () => {
    /* ===== VARIABLES ===== */
    const largeArr = ["large_1", "large_2", "large_3", "large_4", "large_5"];

    /* ===== STATES ===== */
    const [hasUpdatedHits, updateHits] = useState(false);
    const [listings, setListings] = useState(undefined);
    const [showForm, toggleForm] = useState(false);
    const [error, setError] = useState({ thumbnail: undefined, photo: undefined });
    const [uploaded, setUploaded] = useState({ thumbnail: undefined, photo: undefined });

    /* ===== FUNCTIONS ===== */

    // database functions
    const { fetchFullListing } = Read();
    const { uploadFile, updatePhotoName, UpdatePageHits } = Update();

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
            if (value === null && !largeArr.concat(["small"]).includes(key)) {
                property[key] = "";
            }
        }

        // finally, create the rooms array
        const rooms = listings.property.room;

        // return copy of listing object, formatted for the edit property popup
        const copyListing = { listing: listing, property: property, rooms: rooms };
        return copyListing;
    };

    const setPageHits = async (id) => {
        if(!hasUpdatedHits)
        { 
            await UpdatePageHits(id); 
            updateHits(true); 
        }
    }

    // FUNCTION 4: getNumRemaining - function that counts the number of image (large) fields that are null for a property
    // PRECONDITIONS (1 requirement):
    // the listings state must be defiend before this function is called!
    // POSTCONDITIONS (1 possible outcome):
    // the number of remanining avaliable photo slots is returned
    const getNumRemaining = () => {
        let count = 0;
        largeArr.forEach(field => listings.property[field] === null ? count += 1 : count += 0);
        return count;
    };

    // FUNCTION 5: validateFile - function that returns a string error if the file has any errors. otherwise, undefined is returned.
    // PRECONDITIONS (1 parameter):
    // 1.) file: a file object generated when a user uploads an image
    // POSTCONDITIONS (2 possible outcomes):
    // if the file successfully is validated, undefined is returned
    // otherwise, a string error is returned, which explains the error
    const validateFile = (file) => {
        // initialize variables used to determine any errors
        const fileExt = file.name.split(".").pop();
        const fileSize = file.size;

        // first, let's check the file extension
        const validExtensions = ["png", "jpg", "jpeg"];
        if (!validExtensions.includes(fileExt)) {
            return "Invalid file type.";
        }

        // next, let's make sure the file is not too massive (>5MB in size)
        if (fileSize > 5000000) {
            return "File size must be less than 5MB.";
        }

        // if we made it this far, the file is validated. return undefined
        return undefined;        
    };

    // FUNCTION 6: uploadPhoto - given a photoRef, upload a large photo, and update the property database
    // PRECONDITIONS (2 parameters):
    // 1.) e: an event object that is generated when the agent hits the "upload" button for a photo
    // 2.) photoRef: a ref hook, that references the file input for photos
    // POSTCONDITIONS (3 possible outcomes):
    // if the file is not validated, or the file validates, but the query is unsuccessful, the function will update the error state
    // by calling setError(), and return early
    // if the file is validated and all queries are successful, the uploaded state is updated by calling the setUploaded() function
    const uploadPhoto = async (e, photoRef) => {
        e.preventDefault();
        const file = photoRef.current.files[0];
        setUploaded({ ...uploaded, photo: undefined });

        // first, let's validate the file
        const photoError = validateFile(file);  
        setError({ ...error, photo: photoError });
        
        // check for error
        if (photoError) {
            return;
        }

        // if we made it this far, let's upload the photo to the storage container, and update the
        // property
        try {
            // first, upload the file to storage
            const fileName = file.name;
            await uploadFile(fileName, file);

            // if query is successful, we then update the property's first large field that is non-null
            const propertyId = listings.property.property_id;
            const fieldName = largeArr.find(element => listings.property[element] === null);
            await updatePhotoName(fileName, propertyId, fieldName);

            // now, let's requery for the full listing
            const listingId = listings.listing_id;
            await getCurrListing(listingId);

            // finally, update the uploaded state
            setUploaded({ ...uploaded, photo: "Photo was successfully uploaded. If it does not display immediately, give it some time." });

        } catch (queryError) {
            console.log(queryError);
            alert(queryError.message);
            setError({ ...error, photo: queryError });
        }
    };

    // FUNCTION 7: uploadThumbnail - given a thumbnailRef, upload a thumbnail, and update the property database
    // PRECONDITIONS (2 parameters):
    // 1.) e: an event object that is generated when the agent hits the "upload" button for a photo
    // 2.) thumbnailRef: a ref hook, that references the file input for thumbnails
    // POSTCONDITIONS (3 possible outcomes):
    // if the file is not validated, or the file validates, but the query is unsuccessful, the function will update the error state
    // by calling setError(), and return early
    // if the file is validated and all queries are successful, the uploaded state is updated by calling the setUploaded() function
    const uploadThumbnail = async (e, thumbnailRef) => {
        e.preventDefault();
        const file = thumbnailRef.current.files[0];
        setUploaded({ ...uploaded, thumbnail: undefined });

        // first, let's validate the file
        const thumbnailError = validateFile(file);  
        setError({ ...error, thumbnail: thumbnailError });
        
        // check for error
        if (thumbnailError) {
            return;
        }

        // if we made it this far, let's upload the photo to the storage container, and update the
        // property
        try {
            // first, upload the file to storage
            const fileName = file.name;
            await uploadFile(fileName, file);

            // if query is successful, we then update the property's small field
            const propertyId = listings.property.property_id;
            await updatePhotoName(fileName, propertyId, "small");

            // finally, let's requery for the full listing
            const listingId = listings.listing_id;
            await getCurrListing(listingId);

            // finally, update the uploaded state
            setUploaded({ ...uploaded, thumbnail: "Thumbnail was successfully updated. If it does not update immediately, give it some time." })

        } catch (queryError) {
            console.log(queryError);
            alert(queryError.message);
            setError({ ...error, thumbnail: queryError });
        }
    };

    return { 
        listings, 
        getCurrListing, 
        generateCopyListing,
        showForm, 
        error, 
        uploaded, 
        toggleForm, 
        getNumRemaining,
        uploadPhoto, 
        uploadThumbnail,
        setPageHits
    };   
};

/* ===== EXPORTS ===== */
export default PropertyListings;