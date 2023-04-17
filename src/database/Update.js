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
    
    const CreateShowings = async (day, time, hours, listing_number, agent_number) => {

        hours = hours ? hours : 1;

        console.log(day, time, hours, listing_number, agent_number)

        var time_start = new Date(day + "T" + time + ":00");
        var time_end = new Date();
        time_end.setTime(time_start.getTime() + (hours * 3600000));

        try {
            if(agent_number){
            const { error, status } = await supabase
                .from("showing")
                .insert([{
                    start_time: time_start.toISOString(),
                    end_time: time_end.toISOString(),
                    listing: listing_number,
                    agent: agent_number
                }]);

                // error handling
                if (error && status !== 406) {
                    throw error;
                }
            }

            else {
                const { error, status } = await supabase
                .from("showing")
                .insert([{
                    start_time: time_start.toISOString(),
                    end_time: time_end.toISOString(),
                    listing: listing_number,
                }])
                // error handling
                if (error && status !== 406) {
                    throw error;
                }
            }
     



        }
        catch (error) {
            console.log(error);
            console.log("huh");
            alert(error.message);
        }
    };

    const editListing = async(newProperty, id) => {
        try {
            const { data: error } = await supabase
                .from("listing")
                .update(
                    {listing_id: newProperty.listing_id},
                    {price: newProperty.price}
                )
                .eq("property_id", id)

            //error handling
            if (error) {
                throw error;
            }
        } catch (error) {
            throw error;
        };
    };

    const editProperty = async(newProperty, id) => {
        try {
            const { data: error } = await supabase         
                .from("property")
                .update(
                    {city: newProperty.property.city},
                    {sqr_feet: newProperty.property.sqr_feet},
                    {state: newProperty.property.state},
                    {street: newProperty.property.street},
                    {zip: newProperty.property.zip},
                    {lot_size: newProperty.property.lot_size},
                    {dwelling_type: newProperty.property.dwelling_type},
                    {subdivision: newProperty.property.subdivision},
                    {school_district: newProperty.property.school_district},
                    {shopping_areas: newProperty.property.shopping_areas},
                    {arm: newProperty.property.arm},
                    {disarm: newProperty.property.disarm},
                    {passcode: newProperty.property.passcode},
                    {alarm_notes: newProperty.property.alarm_notes},
                    {occupied: newProperty.property.occupied},
                    {lock_box: newProperty.property.lock_box},
                    {other: newProperty.property.other}
                )
                .eq("property_id", id)

            // error handling
            if (error) {
                throw error;
            }

        } catch (error) {
            // error is handled by caller function
            throw error;
        };
    };

    const editRooms = async(newProperty, id) => {
        try {
            const { data: error } = await supabase
                .from("room")
                .update(
                    
                )
                .eq("property", id)
            if (error) {
                throw error;
            }
        } catch (error) {
            // error is handled by caller function
            throw error;
        }
    }

    return { insertProperty, insertListing, insertRoom, CreateShowings, editListing, editProperty, editRooms };
};

/* ===== EXPORTS ===== */
export default Update;