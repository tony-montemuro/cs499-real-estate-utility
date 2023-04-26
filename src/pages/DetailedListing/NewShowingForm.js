import { useReducer } from "react";
import Update from "../../database/Update.js";

const NewShowingForm = () => {

    // Database functions
    const {createShowings} = Update();

    // Initial state of the showing form
    const initShowingForm = {
        date: (new Date(Date.now()).toISOString().split('T')[0]),
        startTime: "00:00",
        length: "0",
        showingAgent: "",
        buyer: "",
    };

    // FUNCTION 1: updateShowingFormState - function that will handle update the showingForm reducer
    // PRECONDITIONS (2 parameters):
    // 1.) state - the showingForm state. THIS PARAMETER IS IMPLICITY PASSED!
    // 2.) action - an object with two parameters:
        // a.) type - specifies how the state should be updated. it must be one of the 5 string values:
        // "date", "startTime", "length", "ShowingAgent", "buyer". otherwise, this function does nothing
        // b.) value - contains the new value
    // POSTCONDITIONS (5 possible outcomes):
    // one of the five of the updateShowingForm state will be updated. a switch state handles each case
    const updateShowingFormState = (state, action) => {
        switch (action.type) {
            case "date":
                return { ...state, date: action.value };
            case "startTime":
                return { ...state, startTime: action.value };
            case "length":
                return { ...state, length: action.value };
            case "showingAgent":
                return { ...state, showingAgent: action.value };
            case "buyer":
                return {...state, buyer: action.value};
            default:
                return state;
        };
    };


    /* ===== STATES & REDUCERS ===== */
    const [showingForm, dispatchShowingForm] = useReducer(updateShowingFormState, initShowingForm);


    // FUNCTION 2: submitShowingForm - function that submits the new showing form
    // PRECONDITIONS (3 parameters):
    // 1.) e: the event that handles the submission
    // 2.) listing_id: the id of the listing to create a showing for
    // 3.) setPopup: the function to close the showing form after submission
    // POSTCONDITIONS (1 possible outcomes):
    // If an error occurs, alert of the error and return
    // Otherwise, create the showing and alert of the successful submission
    const submitShowingForm = async (e, listing_id, setPopup) => {
        // prevent page from reloading (default form submission behavior)
        e.preventDefault();
        try{
            await createShowings(showingForm.date, showingForm.startTime, showingForm.length, 
                listing_id, showingForm.showingAgent, showingForm.buyer);

            // if query is a success, let the user know, and close the popup
            alert("Successfully created showing!");
            setPopup(false); 
        }
        catch(error){
            // otherwise, we alert the user the error. most common is error 23505, which means the user entered the wrong agent id
            console.log(error);
            if (error.code === "23503") {
                alert("Error: Invalid agent ID.");
            } else {
                alert(error.message);
            }
        }

    };

    return({showingForm, dispatchShowingForm, submitShowingForm});


}

/* ===== EXPORTS ===== */
export default NewShowingForm;