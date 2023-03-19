/* ===== IMPORTS ===== */
import { supabase } from "./SupabaseClient";

const Read = () => {
    /* ===== FUNCTIONS ===== */
    
    // FUNCTION 1: fetchAbbreviatedListings - fetch array of abbreviated listings from the database
    // PRECONDITIONS
    // none [for now, this will change]
    // POSTCONDITIONS (1 possible outcome):
    // await the call to fetch array of Abbreviated Listings objects from the database. if an error is detected, handle it. 
    // otherwise, just return the data
    const fetchAbbreviatedListings = async () => {
        try {
            const { data: abbreviatedListings, error, status } = await supabase
                .from("listing")
                .select(`
                    agent (
                        agency (
                            name
                        ),
                        name
                    ),
                    listing_id,
                    price,
                    property (
                        city,
                        sqr_feet,
                        state,
                        street,
                        zip
                    )
                `);

            // error handling
            if (error && status !== 406) {
                throw error;
            }

            // return data
            return abbreviatedListings;

        } catch (error) {
            console.log(error);
            alert(error.message);
        };
    };

    return { fetchAbbreviatedListings };
};

/* ===== EXPORTS ===== */
export default Read;