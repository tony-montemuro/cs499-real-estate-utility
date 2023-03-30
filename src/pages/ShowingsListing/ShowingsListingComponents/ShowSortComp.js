import { useReducer, useState } from "react";

const ShowSortComp = () => {
    /* ===== VARIABLES ====== */
    const initFilterForm = {
        zip: "",
        state: "",
        city: "",
        time: "",
        agency: ""
    };

    /* ===== filterForm FUNCTION ===== */

    // FUNCTION 1: updateFilterFormState - function that will handle update the filterForm reducer
    // PRECONDITIONS (2 parameters):
    // 1.) state - the filterForm state. THIS PARAMETER IS IMPLICITY PASSED!
    // 2.) action - an object with two parameters:
        // a.) type - specifies how the state should be updated. it must be one of the 5 string values:
        // "minPrice", "maxPrice", "minSqrFeet", "maxSqrFeet", "zip". otherwise, this function does nothing
        // b.) value - contains the new value
    // POSTCONDITIONS (5 possible outcomes):
    // one of the five fields of the filterForm state will be updated. a switch state handles each case
    const updateFilterFormState = (state, action) => {
        switch (action.type) {
            case "zip":
                return { ...state, zip: action.value };
            case "state":
                return { ...state, state: action.value };
            case "city":
                return { ...state, city: action.value };
            case "time":
                return { ...state, time: action.value };
            case "agency":
                return { ...state, agency: action.value };
        };
    };

    const [filterForm, dispatchFilterForm] = useReducer(updateFilterFormState, initFilterForm);

    // FUNCTION 3: applyFilters function
    // PRECONDITIONS (1 parameter):
    // 1.) e: an event object generated when the form is submitted
    const applyFilters = (e) => {
        // prevent page from reloading (default form submission behavior)
        e.preventDefault();
        
        // log filterForm object to console
        console.log(filterForm);
    };

    return { 
        filterForm, 
        dispatchFilterForm, 
        applyFilters,
    };

};

export default ShowSortComp;