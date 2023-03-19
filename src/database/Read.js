/* ===== IMPORTS ===== */
import { supabase } from "./SupabaseClient";

const Read = () => {
    /* ===== FUNCTIONS ===== */
    
    // FUNCTION 1: fetchAbbreviatedListings - fetch array of abbreviated listings from the database
    // PRECONDITIONS (2 parameters):
    // 1.) lower - an integer representing the lowest inclusive index of the query to include
    // 2.) upper - an integer representing the upper inclusive index of the query to include
    // POSTCONDITIONS (1 possible outcome):
    // await the call to fetch array of Abbreviated Listings objects from the database. if an error is detected, handle it. 
    // otherwise, just return the data
    const fetchAbbreviatedListings = async (lower, upper) => {
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
                `)
                .range(lower, upper)
                .order("listing_id");

            // error handling
            if (error && status !== 406) {
                throw error;
            }

            // return data
            console.log(abbreviatedListings);
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