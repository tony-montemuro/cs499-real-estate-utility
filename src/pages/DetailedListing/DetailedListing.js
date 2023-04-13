/* ===== IMPORTS ===== */
import { useState } from "react";
import Read from "../../database/Read";
import Update from "../../database/Update";

const PropertyListings = () => {
    /* ===== STATES ===== */
    const [listings, setListings] = useState(undefined);
    const [showForm, toggleForm] = useState(false);
    const [error, setError] = useState({ thumbnail: undefined, photo: undefined });
    const [uploaded, setUploaded] = useState({ thumbnail: undefined, photo: undefined });

    /* ===== FUNCTIONS ===== */

    // database functions
    const { fetchFullListing } = Read();
    const { uploadFile, updatePhotoName } = Update();

    const getCurrListing = async (id) => {
        // fetch current listing from the database, and update the listings state
        const currentListing = await fetchFullListing(id);
        setListings(currentListing);
    };

    // FUNCTION 2: validateFile
    const validateFile = (photoRef) => {
        // initialize variables used to determine any errors
        const file = photoRef.current.files[0];
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

    // FUNCTION 3: uploadPhoto - given a photoRef, upload a large photo, and update the property database
    // PRECONDITIONS (3 parameters):
    // 1.) e: an event object that is generated when the agent hits the "upload" button for a photo
    // 2.) photoRef: a ref hook, that references the file input for photos
    // 3.) largeArr: a simple array of strings containing the 5 large fields [large_1, large_2, large_3, large_4, large_5]
    // POSTCONDITIONS (3 possible outcomes):
    // if the file is not validated, or the file validates, but the query is unsuccessful, the function will update the error state
    // by calling setError(), and return early
    // if the file is validated and all queries are successful, the uploaded state is updated by calling the setUploaded() function
    const uploadPhoto = async (e, photoRef, largeArr) => {
        e.preventDefault();
        setUploaded({ ...uploaded, photo: undefined });

        // first, let's validate the file
        const photoError = validateFile(photoRef);  
        setError({ ...error, photo: photoError });
        
        // check for error
        if (photoError) {
            return;
        }

        // if we made it this far, let's upload the photo to the storage container, and update the
        // property
        try {
            // first, upload the file to storage
            const file = photoRef.current.files[0], fileName = file.name;
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

    // FUNCTION 4: uploadThumbnail - given a thumbnailRef, upload a thumbnail, and update the property database
    // PRECONDITIONS (2 parameters):
    // 1.) e: an event object that is generated when the agent hits the "upload" button for a photo
    // 2.) thumbnailRef: a ref hook, that references the file input for thumbnails
    // POSTCONDITIONS (3 possible outcomes):
    // if the file is not validated, or the file validates, but the query is unsuccessful, the function will update the error state
    // by calling setError(), and return early
    // if the file is validated and all queries are successful, the uploaded state is updated by calling the setUploaded() function
    const uploadThumbnail = async (e, thumbnailRef) => {
        e.preventDefault();
        setUploaded({ ...uploaded, thumbnail: undefined });

        // first, let's validate the file
        const thumbnailError = validateFile(thumbnailRef);  
        setError({ ...error, thumbnail: thumbnailError });
        
        // check for error
        if (thumbnailError) {
            return;
        }

        // if we made it this far, let's upload the photo to the storage container, and update the
        // property
        try {
            // first, upload the file to storage
            const file = thumbnailRef.current.files[0], fileName = file.name;
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

    return { listings, getCurrListing, showForm, error, uploaded, toggleForm, uploadPhoto, uploadThumbnail };
};

/* ===== EXPORTS ===== */
export default PropertyListings;