import Update from "../../../database/Update";
import { useContext, useReducer, useState, useEffect } from "react";
import { AgentContext } from "../../../Contexts";
import { useLocation  } from "react-router-dom";
import DetailedListingsLogic from "../DetailedListing.js";

const EditListing = () => {
	const dwellings = ["single", "family", "multi_family", "duplex", "apartment", "condo", "town_house", "mobile"];
	const roomTypes = ["bedroom", "bathroom", "great_room", "den", "office", "kitchen", "dining_room", "nursery", "laundry_room", "sunroom", "attic", "basement"];
	const { editListing, editProperty, editRooms } = Update();
    const initRoom = { room_type: roomTypes[0], description: "" };
    const initShoppingArea = "";

	const location = useLocation();
	const path = location.pathname.split("/");
	const page_id = path[2];

	// agent state from agent context
	const { agent } = useContext(AgentContext); 

	const { getCurrListing, listings } = DetailedListingsLogic();

	/* ===== EFFECTS ===== */
	useEffect(() => {
		getCurrListing(page_id);
	}, []);

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

    const setDefaultsForm = (e) => {
		if (propertyForm.listing.price === null) {
			propertyForm.listing.price = listings.price;
		}
		if (propertyForm.property.street === null) {
			propertyForm.property.street = listings.property.street;
		}
		if (propertyForm.property.city === null){
			propertyForm.property.city = listings.property.city;
		}
		if (propertyForm.property.state === null){
			propertyForm.property.state = listings.property.state;
		}
		if (propertyForm.property.zip === null){
			propertyForm.property.zip = listings.property.zip;
		}
		if (propertyForm.property.lot_size === null){
			propertyForm.property.lot_size = listings.property.lot_size;
		}
		if (propertyForm.property.sqr_feet === null){
			propertyForm.property.sqr_feet = listings.property.sqr_feet;
		}
		if (propertyForm.property.subdivision === null){
			propertyForm.property.subdivision = listings.property.subdivision;
		}
		if (propertyForm.property.school_district=== null){
			propertyForm.property.school_district = listings.property.school_district;
		}
		if (propertyForm.property.shopping_areas === null){
			propertyForm.property.shopping_areas = listings.property.shopping_areas;
		}
		if (propertyForm.property.arm === null){
			propertyForm.property.arm = listings.property.arm;
		}
		if (propertyForm.property.disarm === null){
			propertyForm.property.disarm = listings.property.disarm;
		}
		if (propertyForm.property.passcode === null){
			propertyForm.property.passcode = listings.property.passcode;
		}
		
		if (propertyForm.property.alarm_notes === null){
			propertyForm.property.alarm_notes = listings.property.alarm_notes;
		}
		
		if (propertyForm.property.occupied === null){
			propertyForm.property.occupied = listings.property.occupied;
		}
		
		if (propertyForm.property.lock_box === null){
			propertyForm.property.lock_box = listings.property.lock_box;
		}
		
		if (propertyForm.property.other === null){
			propertyForm.property.other = listings.property.other;
		}
		
    }

	const setNewValues =  async (id, property) => {
		editListing(id, property);
		editProperty(id, property);
    };

	const handleChange = (e) => {
        const { checked, id, value } = e.target;
        dispatchPropertyForm({ type: id, value: id === "occupied" ? checked : value });
    };

	const handleRoomChange = (e, room) => {
        const { id, value } = e.target;
        dispatchPropertyForm({ type: id, value: value, room: room });
    };

	const addRoom = (e) => {
        e.preventDefault();
        dispatchPropertyForm({ type: "add_room", value: initRoom });
    };

	const removeRoom = (e, room) => {
        e.preventDefault();
        dispatchPropertyForm({ type: "delete_room", value: room });
    };

	const handleShoppingAreaChange = (e, index) => {
        const { id, value } = e.target;
        dispatchPropertyForm({ type: id, value: value, index: index })
    };

	const addShoppingArea = (e) => {
        e.preventDefault();
        dispatchPropertyForm({ type: "add_shopping_area", value: initShoppingArea });
    };

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

    // validateRequiredIntegerField: function that validates whether or not a field that has an integer format exists
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

    // cleanField: function that 'cleans' non-required fields, essentially just returning null if the field is not filled
    // PRECONDITIONS (1 parameter):
    // 1.) field: one of the string fields from the propertyForm that is required
    // POSTCONDITIONS (2 possible outcomes):
    // if the field is empty, return a null object
    // otherwise, just return the field as-is
    const cleanField = (field) => {
        return field.length === 0 ? null : field;
    };

	// handleSubmit: function that is called when the agent hits the "Add Property" button
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
		console.log("entered handle submit");
		{ setDefaultsForm() }
        // now, let's perform a series of validation tests on the form before submitting
        const error = initError;
        error.price = validateRequiredField(propertyForm.listing.price);
		console.log(error.price);
        error.street = validateRequiredField(propertyForm.property.street);
		console.log(error.street);
        error.city = validateRequiredField(propertyForm.property.city);
		console.log(error.city);
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
			console.log("returned from error line 222");
			console.log(error);
            return;
        }

        // now, let's 'clean' non-required fields, which is just setting each to null if they were not filled
        const property = { ...propertyForm.property };
        property.subdivision = cleanField(property.subdivision);
        property.passcode = cleanField(property.passcode);
        property.alarm_notes = cleanField(property.alarm_notes);
        property.other = cleanField(property.other);
        
        try {
			console.log("starting try");
            // first, insert the property, which will return the properties id
            const promises = editProperty(property, page_id);

			console.log("promise 1");
            promises.push(editListing({ 
                ...propertyForm.listing, 
                property: page_id,
                agent: agent.agent_id
            }));
			console.log("awaiting promise");
            await Promise.all(promises);

            // if all goes smoothly, let the agent know their property was successfully inserted
            setSubmitted("Property has successfully been added to the REU Properties system!");
            
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

	const closePopup = (setPopup) => {
        dispatchPropertyForm({ type: "all" });
        setError(initError);
        setSubmitted(null);
        setPopup(false);
    };

    return { setNewValues, handleChange, handleRoomChange, addRoom, removeRoom, handleShoppingAreaChange, addShoppingArea, removeShoppingArea, validateRequiredField, validateRequiredIntegerField, cleanField, handleSubmit, closePopup, submitted, propertyForm, setDefaultsForm, error };
};

export default EditListing;