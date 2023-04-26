/* ===== IMPORTS ===== */
import { supabase } from "./SupabaseClient";

const Update = () => {
    // FUNCTION 1: insertProperty - given a property object, insert it into the property table in the database, and return the
    // property's id
    // PRECONDITIONS (1 parameter):
    // 1.) property: an object containing the fields required by the property table in the database (must be validated!)
    // POSTCONDITIONS (2 possible outcomes, 1 return)
    // if the query was successful, we grab the id assigned to the property by the database, and return it
    // otherwise, we throw the error to the caller function, where it will be handled
    const insertProperty = async (property) => {
        try {
            const { data: propertyId, error } = await supabase
                .from("property")
                .insert(property)
                .select("property_id");

            // error handling
            if (error) {
                throw error;
            }

            // if query was successful, return the id assigned to the new property
            return propertyId[0].property_id;

        } catch (error) {
            // error is handled by caller function
            throw error;
        };
    };

    // FUNCTION 2: insertListing - given a listing object, insert it into the listing table in the database
    // PRECONDITIONS (1 parameter):
    // 1.) listing: a listing object, which contains fields required by the listing table in the database (must be validated!)
    // POSTCONDITIONS (2 possible outcomes):
    // if the query is successful, the function will simply return
    // otherwise, we throw the error to the caller function, where it will be handled
    const insertListing = async (listing) => {
        try {
            const { error } = await supabase
                .from("listing")
                .insert(listing);
            
            // error handling
            if (error) {
                throw error;
            }

        } catch (error) {
            // error is handled by caller function
            throw error;
        };
    };

    // FUNCTION 3: insertRoom - given a room object, insert it into the room table in the database
    // PRECONDITIONS (1 paramter):
    // 1.) room: a room object, which contains fields requried by the room table in the database (must be validated!)
    // POSTCONDITIONS (2 possible outcomes):
    // if the query is successful, the function will simply return
    // otherwise, we throw the error to the caller function, where it will be handled
    const insertRoom = async (room) => {
        try {
            const { error } = await supabase
                .from("room")
                .insert(room);

            // error handling
            if (error) {
                throw error;
            }

        } catch (error) {
            // error is handled by caller function
            throw error;
        };
    };
    
    // FUNCTION 4: createShowings - given parameters for a showing object, insert that object into the database for showings
    // PRECONDITIONS (6 parameters):
    // 1.) day: the day for the showing to start
    // 2.) time: the time of day for the showing to start
    // 3.) hours: the length of the showing in hours
    // 4.) listing_number: the listing to have a showing set for
    // 5.) agent_number: the agent to be set as the showing agent (if agent exists, can be set blank)
    // 6.) buyer: the name of the interested customer
    // POSTCONDITIONS (2 possible outcomes, 1 return)
    // if the query was successful, the database entry is created and nothing is returrned
    // otherwise, we throw the erro to the caller function, where it will be handled
    const createShowings = async (day, time, hours, listing_number, agent_number, buyer) => {

        // If hours is somehow not set, set it to one
        hours = hours ? hours : 1;

        // Calculate time objects from the given date and time parameters
        var time_start = new Date(day + "T" + time + ":00");
        var time_end = new Date();
        time_end.setTime(time_start.getTime() + (hours * 3600000));

        try {
            if(agent_number){   // If a showing agent exists, set that for the showing

            const { error, status } = await supabase
                .from("showing")
                .insert([{
                    start_time: time_start.toISOString(),
                    end_time: time_end.toISOString(),
                    listing: listing_number,
                    agent: agent_number,
                    buyer: buyer
                }]);

                // error handling
                if (error && status !== 406) {
                    throw error;
                }
            }

            else {              // If a showing agent is not existant, skip that optional field

                const { error, status } = await supabase
                .from("showing")
                .insert([{
                    start_time: time_start.toISOString(),
                    end_time: time_end.toISOString(),
                    listing: listing_number,
                    buyer: buyer
                }])
                // error handling
                if (error && status !== 406) {
                    throw error;
                }
            }
     
        }
        catch (error) {

            // handle error in caller function
            throw error;
        }
    };

    // FUNCTION 5: editListing - given a newListing object, update the entry with the matching listing ID
    // PRECONDITIONS (1 parameter):
    // 1.) newListing: a listing object, which contains fields required by the listing table in the database (must be validated!)
    // POSTCONDITIONS (2 possible outcomes):
    // if the query is successful, the function will update the entry's fields to match newListing and simply return
    // otherwise, we throw the error to the caller function, where it will be handled
    const editListing = async (newListing) => {
        try {
            const { error } = await supabase
                .from("listing")
                .update(newListing)
                .eq("listing_id", newListing.listing_id);

            // error handling
            if (error) {
                throw error;
            }

        } catch (error) {
            // handle error in caller function
            throw error;
        };
    };

    // FUNCTION 6: editProperty - given a newProperty object, update the entry with the matching property ID
    // PRECONDITIONS (1 parameter):
    // 1.) newProperty: a property object, which contains fields required by the property table in the database (must be validated!)
    // POSTCONDITIONS (2 possible outcomes):
    // if the query is successful, the function will update the entry's fields to match newProperty and simply return
    // otherwise, we throw the error to the caller function, where it will be handled
    const editProperty = async (newProperty) => {
        try {
            const { error } = await supabase         
                .from("property")
                .update(newProperty)
                .eq("property_id", newProperty.property_id);
                
              // error handling
            if (error) {
                throw error;
            }

        } catch (error) {
            // handle error in caller function
            throw error;
        }
    };

    // FUNCTION 7: updateShowingSurvey - given the fields in a showing survey, update the entry with the matching showing ID
    // PRECONDITIONS (1 parameter):
    // 1.) showingID: the entry to update
    // 2.) customer_interest: the integer entry for the customer_interest field
    // 3.) agent_experience: the integer entry for the agent_experience field
    // 4.) customer_price_rating: the integer entry for the customer_price_rating field
    // 5.) agent_price_rating: the integer entry for the agent_price_rating field
    // 6.) notes: the sring entry for the notes field
    // POSTCONDITIONS (2 possible outcomes):
    // if the query is successful, the function will update the entry's fields to match newListing and simply return
    // otherwise, we throw the error to the caller function, where it will be handled
    const updateShowingSurvey = async (showingID, customer_interest, agent_experience, customer_price_rating, agent_price_rating, notes) => {
        try{
            console.log(showingID, customer_interest, agent_experience, notes);
            const { error } = await supabase
            .from("showing")
            .update({
                customer_interest: customer_interest,
                agent_experience: agent_experience,
                customer_price_rating: customer_price_rating,
                agent_price_rating: agent_price_rating,
                notes: notes
            })
            .eq("showing_id", showingID);

            if (error) {
                throw error;
            }
        }
        catch(error) {
            throw error;
        }
    };

    // FUNCTION 6: uploadFile - given a fileName and file object, upload an image to database storage
    // PRECONDITIONS (2 parameters):
    // 1.) fileName: a well-formatted string that gives the name of the file to upload; comes from file input
    // 2.) file: a file object that was grabbed from a file input
    // POSTCONDITIONS (2 possible outcomes):
    // if the upload is successful, the function will simply return
    // otherwise, this function throws an error object, which will be handled by the caller function
    const uploadFile = async (fileName, file) => {
        try {
            const { error } = await supabase.storage
                .from("property-images")
                .upload(fileName, file);

             // error handling
            if (error) {
                throw error;
            }
            
         } catch (error) {
            // error is handled by caller function
            throw error;
        };
    };

    // FUNCTION 7: updatePhotoName - given a fileName, propertyId, and field, update one of the image fields for a property
    // PRECONDITIONS (3 parameters):
    // 1.) fileName: a well-formatted string that gives the name of the file to upload; comes from file input
    // 2.) propertyId: an integer corresponding to the unique id of a property assigned by the database
    // 3.) field: a string, with one of the six possible values: small, large_1, large_2, large_3, large_4, large_5
    // POSTCONDITIONS (2 possible outcomes):
    // if the update query is successful, the function will simply return
    // otherwise, this function throws an error object, which will be handled by the caller function
    const updatePhotoName = async (fileName, propertyId, field) => {
        try {
            const { error } = await supabase
                .from("property")
                .update({ [field]: fileName })
                .eq("property_id", propertyId);

            // error handling
            if (error) {
                throw error;
            }

        } catch (error) {
            // handle error in caller function
            throw error;
        }
    };

    // FUNCTION 8: updatePageHits - update the number of page visits on the specified listing
    // PRECONDITIONS (1 parameters):
    // 1.) listing_id: the integer index of the entry in the database to update
    // POSTCONDITIONS (1 possible outcomes):
    // if the update query is successful, the function will simply return
    // if an error occurs, alert the window of the issue and return
    const updatePageHits = async (listing_id) => {
        try {
            const{error} = await supabase.rpc('increment_hit_count', {id_of_listing: listing_id});

            // If an error occurs, throw an error to handle
            if (error) {throw error;}

        } catch(error) {
            console.log(error);
            alert(error.message);
        }


    };

    return { insertProperty, insertListing, insertRoom, createShowings, editListing, editProperty, 
        updateShowingSurvey, uploadFile, updatePhotoName, updatePageHits };
};

/* ===== EXPORTS ===== */
export default Update;