/* ===== IMPORTS ===== */
import { supabase } from "./SupabaseClient";

const Read = () => {
    /* ===== FUNCTIONS ===== */
    
    // FUNCTION 1: fetchAbbreviatedListings - fetch array of abbreviated listings from the database
    // PRECONDITIONS (2 parameters):
    // 1.) lower - an integer representing the lowest inclusive index of the query to include
    // 2.) upper - an integer representing the upper inclusive index of the query to include
    // POSTCONDITIONS (2 returns, 1 possible outcome):
    // await the call to fetch array of Abbreviated Listings objects from the database. if an error is detected, handle it. 
    // otherwise, we return two pieces of data:
    // 1.) abbreviatedListings: the array of abbreviatedListing objects
    // 2.) count: the number of listings that satisfy the query
    const fetchAbbreviatedListings = async (lower, upper) => {
        try {
            const { data: abbreviatedListings, count, error, status } = await supabase
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
                `, { count: "exact" })
                .range(lower, upper)
                .order("listing_id");

            // error handling
            if (error && status !== 406) {
                throw error;
            }

            // return data
            console.log(abbreviatedListings);
            console.log(count);
            return { abbreviatedListings: abbreviatedListings, count: count };

        } catch (error) {
            console.log(error);
            alert(error.message);
        };
    };

    const fetchFullListing = async (id) => {
        try{
            const { data: fullListing, error, status } = await supabase
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
            .eq("listing_id", id);
            

            // error handling
            if (error && status !== 406) {
                throw error;
            }

            //return data
            console.log(fullListing);
            return{fullListing: fullListing}
        }
        catch (error) {
            console.log(error);
            alert(error.message);
            return [];
        }
    }

    return { fetchAbbreviatedListings , fetchFullListing};
};

/* ===== EXPORTS ===== */
export default Read;