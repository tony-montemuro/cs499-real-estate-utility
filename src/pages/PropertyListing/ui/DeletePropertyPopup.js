/* ===== IMPORTS ===== */
import { useState } from "react";
import Delete from "../../../database/Delete";

const DeletePropertyPopup = () => {
    /* ===== STATES ===== */
    const [deleted, setDeleted] = useState(undefined);
    const [deleteProperty, setDeleteProperty] = useState(false);
    
    /* ===== FUNCTIONS ===== */
    
    // database functions
    const { deleteListingById, deletePropertyById } = Delete();

    // FUNCTION 1 - confirmRemoval: when the agent selects 'Yes', this function is called, and removes listing from database
    // PRECONDITIONS (1 parameter):
    // 1.) ids: a simple object with two parameters:
        // a.) listingId: an integer corresponding to the unique id of a listing in the database
        // b.) propertyId: an integer corresponding to the unique id of a property in the database
    // POSTCONDITIONS (2 parameters):
    // if deleteProperty is true, we call the delete based on the propertyId (checkbox is checked)
    // if deleteProperty is false, we call the delete based on the listingId (checkbox is NOT checked)
    // in both cases, delete is set to a string letting the user know that the deletion was successful by calling
    // the setDeleted() function with a string argument
    const confirmRemoval = async (ids) => {
        // extract ids from the ids paramter
        const listingId = ids.listingId;
        const propertyId = ids.propertyId;

        // if deleteProperty is set to true, delete based on property id. otherwise, delete based on listing id
        if (deleteProperty) {
            await deletePropertyById(propertyId);
            setDeleted("Listing, and all property data, successfully removed from the REU system.");
        } else {
            await deleteListingById(listingId);
            setDeleted("Listing successfully removed from REU system.");   
        }
    };

    // FUNCTION 2 - closePopup: function that is called when the user selects 'No', or closes the popup
    // PRECONDITIONS (1 parameter):
    // 1.) setPopup: a function that allows the user to update the popup state initialized in DeletePropertyPopup.js
    // POSTCONDITIONS (1 possible outcome):
    // all states defined in this file are set to default values by calling their set functions, and the popup
    // state defined in DeletePropertyPopup.js is set to false by calling setPopup(false)
    const closePopup = (setPopup) => {
        setDeleted(undefined);
        setDeleteProperty(false);
        setPopup(false);
    };

    return { deleted, deleteProperty, setDeleteProperty, confirmRemoval, closePopup };
};

/* ===== EXPORTS ===== */
export default DeletePropertyPopup;