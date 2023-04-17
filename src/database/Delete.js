/* ===== IMPORTS ===== */
import { supabase } from "./SupabaseClient";

const Delete = () => {
    /* ===== FUNCTIONS ===== */

    // FUNCTION 1: deleteListingById - given a listing id, delete a listing row from the listing table
    // PRECONDITIONS (1 parameter):
    // 1.) listingId: an integer corresponding to the unique id of a listing in the database
    // POSTCONDITIONS (2 possible outcomes):
    // if the query is successful, the listing, as well as any showings that reference this listing (!), will be
    // deleted from the database
    // if unsuccessful, the agent is notified of the error
    const deleteListingById = async (listingId) => {
        try {
            const { error } = await supabase
                .from("listing")
                .delete()
                .eq("listing_id", listingId);

            // error handling
            if (error) {
                throw error;
            }

        } catch (error) {
            console.log(error);
            alert(error.message);
        };
    };

    // FUNCTION 2: deletePropertyById - given a property id, delete a property row from the property table
    // PRECONDITIONS (1 parameter):
    // 1.) propertyId: an integer corresponding to the unique id of a property in the database
    // POSTCONDITIONS (2 possible outcomes):
    // if the query is successful, the property, as well as any rooms, listings, and showings that reference this
    // properety (!!!), will be deleted from the database
    // if unsuccessful, the agent is notified of the error
    const deletePropertyById = async (propertyId) => {
        try {
            const { error } = await supabase
                .from("property")
                .delete()
                .eq("property_id", propertyId);

            // error handling
            if (error) {
                throw error;
            }

        } catch (error) {
            console.log(error);
            alert(error.message);
        };
    };

    // FUNCTION 3: deleteRoomsById - given a property id, delete all rooms associated with that property
    // PRECONDITIONS (1 parameter):
    // 1.) propertyId: an integer corresponding to the unique id of a property in the database
    // POSTCONDITIONS (2 possible outcomes):
    // if the query is successful, this function will simply return
    // otherwise, this function throws an error, which will be handled by the caller function
    const deleteRoomsById = async (propertyId) => {
        try {
            const { error } = await supabase
                .from("room")
                .delete()
                .eq("property", propertyId);

            // error handling
            if (error) {
                return error;
            }

        } catch (error) {
            // error is handled by caller function
            throw error;
        };
    };

    return { deleteListingById, deletePropertyById, deleteRoomsById };
};

/* ===== EXPORTS ===== */
export default Delete;