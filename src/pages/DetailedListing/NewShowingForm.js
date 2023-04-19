import { useState, useReducer } from "react";
import Update from "../../database/Update.js";



const NewShowingForm = () => {

    const {CreateShowings} = Update();

    const initShowingForm = {
        date: (new Date(Date.now()).toISOString().split('T')[0]),
        startTime: "00:00",
        length: "0",
        showingAgent: "",
        buyer: "",
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
            case "buyer":
                return {...state, buyer: action.value};
        };
    };

    const [showingForm, dispatchShowingForm] = useReducer(updateShowingFormState, initShowingForm);

    const submitShowingForm = (e, listing_id, setPopup) => {
        // prevent page from reloading (default form submission behavior)
        e.preventDefault();
        try{
            CreateShowings(showingForm.date, showingForm.startTime, showingForm.length, 
                listing_id, showingForm.showingAgent, showingForm.buyer);
            alert("Successfully created showing!");
            setPopup(false); 
        }
        catch(error){
            alert(error.message)
        }

    };

    return({showingForm, dispatchShowingForm, submitShowingForm});


}

export default NewShowingForm;