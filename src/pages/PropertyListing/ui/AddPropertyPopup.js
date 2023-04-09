/* ===== IMPORTS ===== */
import { AgentContext } from "../../../Contexts";
import { useContext, useReducer, useState } from "react";
import Update from "../../../database/Update";

const AddPropertyPopup = () => {
    /* ===== CONTEXTS ===== */

    // agent state from agent context
    const { agent } = useContext(AgentContext); 

    /* ===== VARIABLES ===== */
    const dwellings = ["single", "family", "multi_family", "duplex", "apartment", "condo", "town_house", "mobile"];
    const roomTypes = ["bedroom", "bathroom", "great_room", "den", "office", "kitchen", "dining_room", "nursery", "laundry_room", "sunroom", "attic", "basement"];
    const initRoom = { room_type: roomTypes[0], description: "" };
    const initShoppingArea = "";
    const initPropertyForm = {
        listing: {
            price: ""
        },
        property: {
            street: "",
            city: "",
            state: "",
            zip: "",
            lot_size: "",
            sqr_feet: "",
            dwelling_type: dwellings[0],
            subdivision: "",
            school_district: "",
            shopping_areas: [],
            arm: "",
            disarm: "",
            passcode: "",
            alarm_notes: "",
            occupied: false,
            lock_box: "",
            other: ""
        },
        rooms: []
    };
    const initError = {
        price: undefined,
        street: undefined,
        city: undefined,
        state: undefined,
        zip: undefined,
        lot_size: undefined,
        sqr_feet: undefined,
        school_district: undefined,
        arm: undefined,
        disarm: undefined,
        lockbox: undefined
    };

    /* ===== REDUCER FUNCTIONS ===== */

    // FUNCTION 1: updatePropertyFormState - function that handles updates to the propertyForm reducer
    // PRECONDITIONS (2 parameters):
    // 1.) state - the filterForm state. THIS PARAMETER IS IMPLICITY PASSED!
    // 2.) action - an object with two parameters:
        // a.) type - specifies how the state should be updated
        // b.) value - contains the new value
    // POSTCONDITIONS (1 possible outcome):
    // one of the many fields of the propertyForm is updated, with a switch statement handling special cases
    const updatePropertyFormState = (state, action) => {
        switch (action.type) {
            case "all":
                return { ...initPropertyForm };
            case "price":
                return { ...state, listing: { ...state.listing, price: action.value } };
            case "room_type":
                return { 
                    ...state,
                    rooms: state.rooms.map(item => item === action.room ? { ...item, room_type: action.value } : item)
                };
            case "description":
                return { 
                    ...state, 
                    rooms: state.rooms.map(item => item === action.room ? { ...item, description: action.value } : item)
                };
            case "add_room":
                return { ...state, rooms: [...state.rooms, action.value] };
            case "delete_room":
                return { ...state, rooms: state.rooms.filter(item => item !== action.value) };
            case "shopping_areas":
                return { 
                    ...state, 
                    property: { ...state.property, [action.type]: state.property[action.type].map((item, index) => {
                        return index === action.index ? action.value : item;
                    }
                )}};
            case "add_shopping_area":
                return { 
                    ...state, 
                    property: { ...state.property, shopping_areas: [...state.property.shopping_areas, action.value] }
                };
            case "delete_shopping_area":
                const arr = state.property.shopping_areas;
                return { ...state, property: { 
                    ...state.property, 
                    shopping_areas: arr.slice(0, action.index).concat(arr.slice(action.index+1))
                } };
            default:
                return { ...state, property: {...state.property, [action.type]: action.value } };
        };
    };

    /* ===== STATES & REDUCERS ===== */
    const [error, setError] = useState(initError);
    const [propertyForm, dispatchPropertyForm] = useReducer(updatePropertyFormState, initPropertyForm);
    const [submitted, setSubmitted] = useState(null);

    /* ===== FUNCTIONS ===== */

    // database functions
    const { insertProperty, insertListing, insertRoom } = Update();
    
    // FUNCTION 2 - handleChange: function that is called each time the agent edits the property form
    // PRECONDITIONS (1 parameter):
    // 1.) e: an event object that is generated when the agent modifies any input in the form
    // POSTCONDITIONS (2 possible outcome):
    // the property form state is updated by calling the dispatchPropertyForm() function
    // special case: if the id is occupied, then we need to pass checked as the event value, since the
    // occupied input is a checkbox rather than a textbox
    // general case: the value field from e.target is passed as the event value
    const handleChange = (e) => {
        const { checked, id, value } = e.target;
        dispatchPropertyForm({ type: id, value: id === "occupied" ? checked : value });
    };

    // FUNCTION 3 - handleRoomChange: function that is called each time the agent edits a room field
    // PRECONDITIONS (2 parameters):
    // 1.) e: an event object that is generated when the agent modifies a room input in the form
    // 2.) room: a room object, which corresponds to the current room being modified
    // POSTCONDITIONS (1 possible outcome):
    // the property form state is updated by calling the dispatchPropertyForm() function, but passes
    // an additional room field to the action object. this room field is used to identify the room being
    // modified, so that the state can update properly
    const handleRoomChange = (e, room) => {
        const { id, value } = e.target;
        dispatchPropertyForm({ type: id, value: value, room: room });
    };

    // FUNCTION 4 - addRoom: function that is called each time the agent wishes to add a new room to property form
    // PRECONDITIONS (1 parmater):
    // 1.) e: an event object that is generated when the agent clicks the "Add Room" button
    // POSTCONDITIONS (1 possible outcome):
    // the property form state is updated by calling the dispatchPropertyForm() function, by passing a special
    // type of "add_room", which will push a new room object to the propertyForm.room array
    const addRoom = (e) => {
        e.preventDefault();
        dispatchPropertyForm({ type: "add_room", value: initRoom });
    };

    // FUNCTION 5 - removeRoom: function that is called each time the agent wishes to delete a room from the property form
    // PRECONDITIONS (2 parmaters):
    // 1.) e: an event object that is generated when the agent clicks the "Remove Room" button for a particular room
    // 2.) room: a room object, which corresponds to the current room being deleted
    // POSTCONDITIONS (1 possible outcome):
    // the property form state is updated by calling the dispatchPropertyForm() function, by passing a special
    // type of "delete_room", as well as room as the value. this will remove the room parameter from the 
    // propertyForm.rooms array when called
    const removeRoom = (e, room) => {
        e.preventDefault();
        dispatchPropertyForm({ type: "delete_room", value: room });
    };

    // FUNCTION 6 - handleShoppingAreaChange: function that is called each time the agent edits a shopping area field
    // PRECONDITIONS (2 parameters):
    // 1.) e: an event object that is generated when the agent modifies a shopping area input in the form
    // 2.) index: an integer, which corresponds to the index of the shopping area being modified in the 
    // propertyForm.property.shopping_areas array
    // POSTCONDITIONS (1 possible outcome):
    // the property form state is updated by calling the dispatchPropertyForm() function, but passes
    // an additional index field to the action object. this index field is used to identify the shopping_area being
    // modified, so that the state can update properly
    const handleShoppingAreaChange = (e, index) => {
        const { id, value } = e.target;
        dispatchPropertyForm({ type: id, value: value, index: index })
    };

    // FUNCTION 7 - addShoppingArea: function that is called each time the agent wishes to add a new shopping area to the property form
    // PRECONDITIONS (1 parmater):
    // 1.) e: an event object that is generated when the agent clicks the "Add Shopping Area" button
    // POSTCONDITIONS (1 possible outcome):
    // the property form state is updated by calling the dispatchPropertyForm() function, by passing a special
    // type of "add_shopping_area", which will push a new shopping area string to the propertyForm.property.shopping_areas array
    const addShoppingArea = (e) => {
        e.preventDefault();
        dispatchPropertyForm({ type: "add_shopping_area", value: initShoppingArea });
    };

    // FUNCTION 8 - removeShoppingArea: function that is called each time the agent wishes to remove a shopping area from the property form
    // PRECONDITIONS (2 parameters):
    // 1.) e: an event object that is generated when the agent clicks the "Remove Shopping Area" button for a particular shopping area
    // 2.) index: an integer, which corresponds to the index of the shopping area being removed
    // POSTCONDITIONS (1 possible outcome):
    // the property form state is updated by calling the dispatchPropertyForm() function, by passing a special
    // type of "delete_shopping_area", as well as the special "index" field. this will remove the shopping area corresponding to the index
    // parameter from the propertyForm.property.shopping_areas array when called
    const removeShoppingArea = (e, index) => {
        e.preventDefault();
        dispatchPropertyForm({ type: "delete_shopping_area", index: index });
    };

    // FUNCTION 9 - validateRequiredField: function that validates whether or not a required field exists or not
    // PRECONDITIONS (1 parameter):
    // 1.) field: one of the string fields from the propertyForm that is required
    // POSTCONDITIONS (2 possible outcomes):
    // if field has any content, an undefined object is returned
    // otherwise, an error message stating that the field is requried is returned
    const validateRequiredField = (field) => {
        return field.length === 0 ? "Required field." : undefined; 
    };


    // FUNCTION 10 - validateRequiredIntegerField: function that validates whether or not a field that has an integer format exists
    // or not
    // PRECONDITIONS (1 parameter):
    // 1.) field: one of the string fields from the propertyForm that is required
    // POSTCONDITIONS (2 possible outcomes):
    // if the field has any content, and is well-formatted, an undefined object is returned
    // otherwise, an error message stating that the field is required (if missing), or that it's not formatted correctly (not an integer)
    // is returned
    const validateRequiredIntegerField = (field) => {
        let error = validateRequiredField(field);
        if (error === undefined) {
            error = /^\d+$/.test(field) ? undefined : "Invalid format.";
        }
        return error;
    };

    // FUNCTION 11: cleanField: function that 'cleans' non-required fields, essentially just returning null if the field is not filled
    // PRECONDITIONS (1 parameter):
    // 1.) field: one of the string fields from the propertyForm that is required
    // POSTCONDITIONS (2 possible outcomes):
    // if the field is empty, return a null object
    // otherwise, just return the field as-is
    const cleanField = (field) => {
        return field.length === 0 ? null : field;
    };

    // FUNCTION 12 - handleSubmit: function that is called when the agent hits the "Add Property" button
    // PRECONDITIONS (1 parameter):
    // 1.) e: an event object that is generated when the agent attempts to submit the property form
    // POSTCONDITIONS (3 possible outcomes):
    // If form validation fails, the function returns early, and the user is informed of any form errors.
    // If form validation succeeds, but queries fail, user is notified of the query error.
    // Otherwise, this function validates the form, cleans non-required inputs, and inserts the property listing: property, rooms,
    // and listing, to the database
    const handleSubmit = async (e) => {
        // prevent default form behavior of reloading upon submission
        e.preventDefault();

        // now, let's perform a series of validation tests on the form before submitting
        const error = initError;
        error.price = validateRequiredField(propertyForm.listing.price);
        error.street = validateRequiredField(propertyForm.property.street);
        error.city = validateRequiredField(propertyForm.property.city);
        error.state = validateRequiredField(propertyForm.property.state);
        error.zip = validateRequiredIntegerField(propertyForm.property.zip);
        error.lot_size = validateRequiredIntegerField(propertyForm.property.lot_size);
        error.sqr_feet = validateRequiredIntegerField(propertyForm.property.sqr_feet);
        error.school_district = validateRequiredField(propertyForm.property.school_district);
        error.arm = validateRequiredIntegerField(propertyForm.property.arm);
        error.disarm = validateRequiredIntegerField(propertyForm.property.disarm);
        error.lockbox = validateRequiredField(propertyForm.property.lock_box);

        // if even just 1 test failed, return the function early, denying the submission attempt
        setError(error);
        if (Object.values(error).some(field => field !== undefined)) {
            return;
        }

        // now, let's 'clean' non-required fields, which is just setting each to null if they were not filled
        const property = { ...propertyForm.property };
        property.subdivision = cleanField(property.subdivision);
        property.passcode = cleanField(property.passcode);
        property.alarm_notes = cleanField(property.alarm_notes);
        property.other = cleanField(property.other);
        
        try {
            // first, insert the property, which will return the properties id
            const propertyId = await insertProperty(property);

            // then, concurrenty insert all rooms, as well as the listing
            const promises = propertyForm.rooms.map(room => {
                room.property = propertyId;
                return insertRoom(room);
            });
            promises.push(insertListing({ 
                ...propertyForm.listing, 
                property: propertyId,
                agent: agent.agent_id
            }));
            await Promise.all(promises);

            // if all goes smoothly, let the agent know their property was successfully inserted
            setSubmitted("Property has successfully been added to the REU Properties system!");
            
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    // FUNCTION 13 - closePopup: function that is called when the agent hits the 'X' button at the top right of the popup
    // PRECONDITIONS (1 parameter):
    // 1.) setPopup: a state function which allows the popup state to be updated when called
    // POSTCONDITIONS (1 possible outcome):
    // the property form is reset to default values by calling the dispatchPropertyForm() function with the special type
    // all, which simply sets the entire form state back to the initial form values. then, the popup is closed by calling
    // setPopup(false)
    const closePopup = (setPopup) => {
        dispatchPropertyForm({ type: "all" });
        setPopup(false);
    };
    
    return { 
        dwellings, 
        error,
        propertyForm, 
        roomTypes, 
        submitted,
        handleChange, 
        handleRoomChange, 
        addRoom,
        removeRoom,
        handleShoppingAreaChange,
        addShoppingArea,
        removeShoppingArea,
        handleSubmit,
        closePopup
    };
};

/* ===== EXPORTS ===== */
export default AddPropertyPopup;