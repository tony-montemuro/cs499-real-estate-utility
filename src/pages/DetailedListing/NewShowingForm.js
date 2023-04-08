import { useState, useReducer } from "react";
import Update from "/app/src/database/Update.js";



const NewShowingForm = () => {

    const {CreateShowings} = Update();

    const initShowingForm = {
        date: "2000-01-01",
        startTime: "00:00",
        length: "0",
        showingAgent: "",
    };

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
        };
    };

    const [showingForm, dispatchShowingForm] = useReducer(updateShowingFormState, initShowingForm);

    const submitShowingForm = (e, listing_id) => {
        // prevent page from reloading (default form submission behavior)
        e.preventDefault();
        CreateShowings(showingForm.date, showingForm.startTime, showingForm.length, listing_id, showingForm.showingAgent);
        
    };

    return({showingForm, dispatchShowingForm, submitShowingForm});


}

export default NewShowingForm;