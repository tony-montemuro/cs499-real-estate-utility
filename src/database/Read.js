/* ===== IMPORTS ===== */
import { queryByLabelText } from "@testing-library/react";
import { supabase } from "./SupabaseClient";
import ReadFilterHelper from "./ReadFilterHelper.js";

const Read = () => {
    /* ===== FUNCTIONS ===== */
    
    // FUNCTION 1: fetchAbbreviatedListings - fetch array of abbreviated listings from the database
    // PRECONDITIONS (1 parameter):
    // 1.) filterObj: an object, which contains contraints on the query. each field corresponds to a filter:
        // a.) price: limits the price between a `min` and `max` value. if min is "", allow any price to 0. if max is "", allow any
        // price to 99,999,999.99
        // b.) sqrFeet: limits the square footage between a `min` and `max` value. if min is "", allow any sqrtFeet to 0. if max is "",
        // allow any sqrFeet to 100,000
        // c.) zip: a zip code, which will restrict the query to only properties in the zip code. if null, allow any zip code.
    // POSTCONDITIONS (1 returns, 1 possible outcome):
    // await the call to fetch array of Abbreviated Listings objects from the database. if an error is detected, handle it. 
    // otherwise, we return:
    // 1.) abbreviatedListings: the array of abbreviatedListing objects (an empty array if we get an error)
    const fetchAbbreviatedListings = async (filterObj) => {
        // declare price query variables
        const price = filterObj.price;
        const maxPrice = price.max ? price.max : 99999999.00;
        const minPrice = price.min ? price.min : 0;

        // declare sqrFeet query variables
        const sqrFeet = filterObj.sqrFeet;
        const maxSqrFeet = sqrFeet.max ? sqrFeet.max : 100000;
        const minSqrFeet = sqrFeet.min ? sqrFeet.min : 0;

        // determine if query should include a filter for zip code based on the value of zip code
        const zip = filterObj.zip;
        let query = supabase
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
                property!inner (
                    city,
                    small,
                    sqr_feet,
                    state,
                    street,
                    zip
                )
            `)
            .order("listing_id")
            .gte("price", minPrice)
            .lte("price", maxPrice)
            .gte("property.sqr_feet", minSqrFeet)
            .lte("property.sqr_feet", maxSqrFeet);
        query = zip.length > 0 ? query.eq("property.zip", zip) : query;

        // attempt query
        try {
            const { data: abbreviatedListings, error } = await query;

            // error handling
            if (error) {
                throw error;
            }

            // return data
            return abbreviatedListings;

        } catch (error) {
            console.log(error);
            alert(error.message);
            return [];
        };
    };
    
    const fetchFullListing = async (id) => {
        try{
            const { data: fullListing, error, status } = await supabase
                .from("listing")
                .select(`
                    agent (
                        agency (
                            name,
                            street,
                            city,
                            state,
                            zip,
                            phone_number
                        ),
                        name,
                        email,
                        phone_number
                    ),
                    listing_id,
                    price,
                    property (
                        city,
                        sqr_feet,
                        state,
                        street,
                        zip,
                        lot_size,
                        dwelling_type,
                        subdivision,
                        school_district,
                        shopping_areas
                    )
                `)
                .eq("listing_id", id)
                .maybeSingle();
                
            // error handling
            if (error) {
                throw error;
            }
            
            // return data
            console.log(fullListing);
            return fullListing;
                
        } catch (error) {
            console.log(error);
            alert(error.message);
            return {};
        };

    }
            
    // FUNCTION 3: fetchImageByFilename - given a filename, fetch the image from the database
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
                        agent (
                            agency (
                                name
                            ),
                            name
                        ),
                        listing_id,
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
                        agency (
                            name
                        )
                    )
                `, { count: "exact" })
                .range(lower, upper)
                .order("showing_id");

            // error handling
            if (error && status !== 406) {
                throw error;
            }

            //return data
            return { abbreviatedShowings: abbreviatedShowings, count: count };
        }
        catch (error) {
            console.log(error);
            alert(error.message);
            return [];
        }
    };

    const { fetchAbbreviatedShowingsNone, fetchAbbreviatedShowingsFilterZIP, fetchAbbreviatedShowingsFilterState, 
        fetchAbbreviatedShowingsFilterCity, fetchAbbreviatedShowingsFilterStateZIP, fetchAbbreviatedShowingsFilterCityZIP,
        fetchAbbreviatedShowingsFilterCityState, fetchAbbreviatedShowingsFilterCityStateZIP} = ReadFilterHelper();

    const fetchAbbreviatedShowingsFiltered = async (lower, upper, zip, state, city) => {

        try {
            if(city == null || city == "") {
                if(state == null || state == "") {
                    if (zip == null || zip ==""){ // All search fields are null, no filter
                        
                        return await fetchAbbreviatedShowingsNone(lower, upper);

                    }
                    else { // Filter just against ZIP code

                        return await fetchAbbreviatedShowingsFilterZIP(lower, upper, zip);

                    }
                } //end of
                else { // Filter against state and...
                    if (zip == null || zip == ""){ // Filter just against state
                        
                        return await fetchAbbreviatedShowingsFilterState(lower, upper, state);

                    }
                    else { //Filter against state and ZIP code
                            
                        return await fetchAbbreviatedShowingsFilterStateZIP(lower, upper, zip, state);

                    }
                } //end of not city, but state and...
            } //end of not city...
            else { // Filter against city and..
                if(state == null || state == "") { // not filter for state
                    if (zip == null || zip == ""){ // filter only for city
                        
                        return await fetchAbbreviatedShowingsFilterCity(lower, upper, city);

                    }
                    else { // Filter just against ZIP code and city

                        return await fetchAbbreviatedShowingsFilterCityZIP(lower, upper, zip, city);

                    }
                } //end of city and nont state...
                else { // Filter against state and city and...
                    if (zip == null || zip == ""){ // Filter just against state and city
                        
                        return await fetchAbbreviatedShowingsFilterCityState(lower, upper, state, city);

                    }
                    else { //Filter against city, state and ZIP code
                        
                        return await fetchAbbreviatedShowingsFilterCityStateZIP(lower, upper, zip, state, city);
                            
                    }
                } //end of city and state...
            } //end of city and...
        }
        catch (error) {
            console.log(error);
            alert(error.message);
            return [];
        }
    };

    // FUNCTION 5 - fetchAgentById - given a user id, fetch an agent object from the database, and return it
    // PRECONDITIONS (1 parameter):
    // 1.) id - a string value, representing a uuid belonging to a unique agent user in the database
    // POSTCONDITIONS (1 return, 2 possible outcomes):
    // if the query is successful, return:
    // 1.) agent - an object that contains information about the agent corresponding to the id parameter
    // otherwise, the user is alerted of the error that has occured, and null is returned
    const fetchAgentById = async (id) => {
        try {
            const { data: agent, error } = await supabase
                .from("agent")
                .select(`
                    agency (agency_id, name), 
                    agent_id, 
                    name, 
                    user_id
                `)
                .eq("user_id", id)
                .maybeSingle();

            // error handling
            if (error) {
                throw error;
            }

            // if there is no error, simply return the result of the query
            return agent;

        } catch (error) {
            console.log(error);
            alert(error.message);
            return null;
        }
    };

    return { fetchAbbreviatedListings, fetchFullListing, fetchAbbreviatedShowings, fetchAbbreviatedShowingsFiltered, fetchImageByFilename, fetchAgentById };
};

/* ===== EXPORTS ===== */
export default Read;