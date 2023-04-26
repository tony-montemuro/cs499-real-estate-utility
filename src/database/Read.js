/* ===== IMPORTS ===== */
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
        const maxSqrFeet = sqrFeet.max ? sqrFeet.max : 10000000;
        const minSqrFeet = sqrFeet.min ? sqrFeet.min : 0;

        // determine if query should include a filter for zip code based on the value of zip code
        const zip = filterObj.zip;
        let query = supabase
            .from("listing")
            .select(`
                agent (
                    agency (
                        agency_id,
                        name
                    ),
                    name
                ),
                listing_id,
                price,
                property!inner (
                    city,
                    property_id,
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
    
    // FUNCTION 2: fetchFullListing - fetch data of full listings from the database
    // PRECONDITIONS (1 parameter):
    // 1.) id: the integer value for the listing index 
    // POSTCONDITIONS (1 returns, 1 possible outcome):
    // await the call to fetch full Listings object from the database. if an error is detected, handle it. 
    // otherwise, we return:
    // 1.) fullListing: the specified full listing object (an empty object if we get an error)
    const fetchFullListing = async (id) => {
        try{
            const { data: fullListing, error } = await supabase
                .from("listing")
                .select(`
                    agent (
                        agency (
                            agency_id,
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
                        property_id,
                        city,
                        sqr_feet,
                        state,
                        street,
                        zip,
                        lot_size,
                        dwelling_type,
                        subdivision,
                        school_district,
                        shopping_areas,
                        arm,
                        disarm,
                        passcode,
                        alarm_notes,
                        occupied,
                        lock_box,
                        other,
                        small,
                        large_1,
                        large_2,
                        large_3,
                        large_4,
                        large_5,
                        room (
                            description,
                            room_type
                        )
                    )
                `)
                .eq("listing_id", id)
                .maybeSingle();
                
            // error handling
            if (error) {
                throw error;
            }
            
            // sort rooms by id, and return data
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

    // FUNCTION 4: fetchAbbreviatedShowings - fetch array of abbreviated showings from the database
    // PRECONDITIONS (2 parameters):
    // 1.) lower: the numeric lower index of the range of showings to grab from the total database list
    // 2.) upper: the numeric uppder index of the range of showings to grab from the total database list
    // POSTCONDITIONS (1 returns, 1 possible outcome):
    // await the call to fetch array of Abbreviated Showing objects from the database. if an error is detected, handle it. 
    // otherwise, we return:
    // 1.) abbreviatedShowings: the array of abbreviatedShowings objects from the specified range (an empty array if we get an error) 
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

    //========fetchAbbreviatedShowingFiltered Body Start===========================================================================

    // The fetch function calls a unique function for each combination of present fiter parameters. 
    const { fetchAbbreviatedShowingsNone, fetchAbbreviatedShowingsFilterZIP, fetchAbbreviatedShowingsFilterState, 
        fetchAbbreviatedShowingsFilterCity, fetchAbbreviatedShowingsFilterStateZIP, fetchAbbreviatedShowingsFilterCityZIP,
        fetchAbbreviatedShowingsFilterCityState, fetchAbbreviatedShowingsFilterCityStateZIP} = ReadFilterHelper();

    // FUNCTION 5: fetchAbbreviatedShowingsFiltered - fetch array of abbreviated showings from the database, according to filters
    // PRECONDITIONS (5 parameters):
    // 1.) lower: the numeric lower index of the range of showings to grab from the total database list
    // 2.) upper: the numeric uppder index of the range of showings to grab from the total database list
    // 3-5.) Conditional parameters - if they are set to empty, do not filter by this field
    //   3.) zip: the zip code of the showings to grab
    //   4.) state: the state of the showing to grab
    //   5.) city: the city of the showing to grab
    // POSTCONDITIONS (1 returns, 1 possible outcome):
    // await the call to fetch array of Abbreviated Showing objects from the database. if an error is detected, handle it. 
    // otherwise, we return:
    // 1.) abbreviatedShowings: the array of abbreviatedShowings objects from the specified range and filters
    // (an empty array if we get an error) 
    const fetchAbbreviatedShowingsFiltered = async (lower, upper, zip, state, city) => {

        // Each function call will throw its own error if an issue arises.
        try {
            if(city === null || city === "") {

                if(state === null || state === "") {

                    if (zip === null || zip ===""){ // All search fields are null, no filter
                        return await fetchAbbreviatedShowingsNone(lower, upper);
                    }

                    else { // Filter just against ZIP code
                        return await fetchAbbreviatedShowingsFilterZIP(lower, upper, zip);
                    }

                } //end of not city, nor state..
                else { // Filter against state and...

                    if (zip === null || zip === ""){ // Filter just against state 
                        return await fetchAbbreviatedShowingsFilterState(lower, upper, state);
                    }

                    else { //Filter against state and ZIP code
                        return await fetchAbbreviatedShowingsFilterStateZIP(lower, upper, zip, state);
                    }

                } //end of not city, but state and...
            } //end of not city...
            else { // Filter against city and..

                if(state === null || state === "") { // not filter for state

                    if (zip === null || zip === ""){ // filter only for city
                        return await fetchAbbreviatedShowingsFilterCity(lower, upper, city);
                    }

                    else { // Filter just against ZIP code and city
                        return await fetchAbbreviatedShowingsFilterCityZIP(lower, upper, zip, city);
                    }

                } //end of city and not state...
                else { // Filter against state and city and...

                    if (zip === null || zip === ""){ // Filter just against state and city
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

    //========fetchAbbreviatedShowingFiltered Body End===========================================================================

    // FUNCTION 6: fetchFullShowing - fetch data of full showing (including agent form) from the database
    // PRECONDITIONS (1 parameter):
    // 1.) id: the integer value for the showing index 
    // POSTCONDITIONS (1 returns, 1 possible outcome):
    // await the call to fetch full Showing object from the database. if an error is detected, handle it. 
    // otherwise, we return:
    // 1.) fullShowing: the specified full showing object (an empty object if we get an error)
    const fetchFullShowing = async (id) => {
        try {
            const { data:showing, error} = await supabase
                .from("showing")
                .select(`
                    customer_interest,
                    agent_experience,
                    customer_price_rating,
                    agent_price_rating,
                    notes,
                    listing (
                        property (
                            occupied,
                            lock_box
                        )
                    ),
                    agent (
                        name,
                        email,
                        phone_number
                    ),
                    buyer
                )
                `)
                .eq("showing_id", id)
                .maybeSingle();

            // error handling
            if (error) {
                throw error;
            }

            //return data
            console.log(showing);
            return { showing };
        }
        catch (error) {
            console.log(error);
            alert(error.message);
            return [];
        }
    }

    // FUNCTION 7 - fetchAgentById - given a user id, fetch an agent object from the database, and return it
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

    // FUNCTION 8 - fetchAgentsByAgency - given an agency id, fetch information on all agents belonging to that agency
    // PRECONDITIONS (1 parameter):
    // 1.) agencyId: an integer representing the id of an agency
    // POSTCONDITIONS (2 possible outcomes):
    // if the query is successful, the data (array of agent objects) is returned
    // otherwise, the agent is informed that there was an error, and an empty array is returned
    const fetchAgentsByAgency = async (agencyId) => {
        try {
            const { data: agents, error } = await supabase
                .from("agent")
                .select("agent_id, name")
                .eq("agency", agencyId);

            // error handling
            if (error) {
                throw error;
            }

            // otherwise, simply return data
            return agents;

        } catch (error) {
            console.log(error);
            alert(error.message);
            return [];
        };
    };

    // FUNCTION 9: fetchRandomListingId - fetch a random abbreviated listing from the database
    // PRECONDITIONS: NONE
    // POSTCONDITIONS (2 possible outcomes):
    // if the query is successful, the abreviated listing object is simply fetched and returned
    // if the query is unsuccessful, the user will be notified of the error, and null is returned
    const fetchRandomAbbreviatedListing = async () => {
        try {
            const { data: abbreviatedListing, error } = await supabase
                .from("random_listing")
                .select(`
                    agent (
                        agency (
                            agency_id,
                            name
                        ),
                        name
                    ),
                    listing_id,
                    price,
                    property!inner (
                        city,
                        property_id,
                        small,
                        sqr_feet,
                        state,
                        street,
                        zip
                    )
                `)
                .limit(1)
                .maybeSingle();

            // error handling
            if (error) {
                throw error;
            }

            // if we made it this far, simply return the listing
            return abbreviatedListing;

        } catch (error) {
            console.log(error);
            alert(error.message);
            return null;
        }
    };

    return { fetchAbbreviatedListings, fetchFullListing, fetchAbbreviatedShowings, fetchAbbreviatedShowingsFiltered, 
        fetchImageByFilename, fetchFullShowing, fetchAgentById, fetchAgentsByAgency, fetchRandomAbbreviatedListing };
};

/* ===== EXPORTS ===== */
export default Read;