/* ===== IMPORTS ===== */
import { supabase } from "./SupabaseClient";

const Read = () => {
    /* ===== FUNCTIONS ===== */
    
    // FUNCTION 1: fetchAbbreviatedListings - fetch array of abbreviated listings from the database
    // PRECONDITIONS (0 parameters):
    // this will have parameters soon...
    // POSTCONDITIONS (1 returns, 1 possible outcome):
    // await the call to fetch array of Abbreviated Listings objects from the database. if an error is detected, handle it. 
    // otherwise, we return:
    // 1.) abbreviatedListings: the array of abbreviatedListing objects (an empty array if we get an error)
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
                        small,
                        sqr_feet,
                        state,
                        street,
                        zip
                    )
                `)
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
            return [];
        };
    };

    // FUNCTION 2: fetchImageByFilename - given a filename, fetch the image from the database
    // PRECONDITIONS (1 parameter):
    // 1.) fileName: a string representing a valid file in the database, must also be well formatted (include file extension)
    // POSTCONDITIONS (1 returns, 1 possible outcome):
    // await the call to database storage for the image. if we get an error, we will handle it here. otherwise, return:
    // 1.) an image URL generated by the blob (null if we get an error)
    const fetchImageByFilename = async (fileName) => {
        try {
            const { data: blob, error } = await supabase.storage.from("property-images").download(fileName);

            // error handling
            if (error) {
                throw error;
            }

            // use the createObjectURL method to turn the blob into a URL, and return that
            return URL.createObjectURL(blob);

        } catch (error) {
            console.log(error);
            alert(error.message);
            return null;
        }
    };

    const fetchAbbreviatedShowings = async (lower, upper) => {
        try {
            const { data:abbreviatedShowings, count, error, status} = await supabase
                .from("showing")
                .select(`
                    showing_id,
                    start_time,
                    end_time,
                    listing (
                        property (
                            street,
                            city,
                            small,
                            state,
                            zip
                        )
                    ),
                    agent (
                        name,
                        agency(
                            name
                        )
                    )
                `, { count: "exact" })
                .range(lower, upper)
                .order("showing_id")

            // error handling
            if (error && status !== 406) {
                throw error;
            }

            return { abbreviatedShowings: abbreviatedShowings, count: count }

        } catch (error) {
            console.log(error);
            alert(error.message)
        };

    }

    return {fetchAbbreviatedListings, fetchAbbreviatedShowings, fetchImageByFilename};



};

/* ===== EXPORTS ===== */
export default Read;