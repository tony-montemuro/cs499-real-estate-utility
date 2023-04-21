import Read from "../../database/Read";
import { useReducer, useState } from "react";

const ListOfShowingsCmp = () => {
    const [showings, setShowings] = useState(undefined);
    const [pageNumber, setPageNumber] = useState(undefined);
    const [pageLength, setPageLength] = useState(undefined);

    const { fetchAbbreviatedShowings, fetchAbbreviatedShowingsFiltered } = Read();

    // Filter stuff below here

    /* ===== VARIABLES ====== */
    const initFilterForm = {
        zip: "",
        state: "",
        city: "",
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
            default:
                return state;

        };
    };

    const [filterForm, dispatchFilterForm] = useReducer(updateFilterFormState, initFilterForm);
    const [usedFilter, setFilters] = useState({zip: "", state: "", city: ""});

    // FUNCTION 3: applyFilters function
    // PRECONDITIONS (1 parameter):
    // 1.) e: an event object generated when the form is submitted
    const applyFilters = async (e) => {
        // prevent page from reloading (default form submission behavior)
        e.preventDefault();
        
        await setFilters(filterForm);

        // log filterForm object to console
        console.log(usedFilter);

        const lower = 0;
        const upper = pageLength.current - 1;

        const {abbreviatedShowings, count} 
            = await fetchAbbreviatedShowingsFiltered(lower, upper, filterForm.zip, filterForm.state, filterForm.city);
        setShowings(abbreviatedShowings);

        var maxPageNumber = Math.ceil(count / pageLength.current);
        maxPageNumber = (maxPageNumber <1 ? 1 : maxPageNumber);
        setPageNumber({ current: 1, max: maxPageNumber });
    };


    // Page handling below

    const getShowings = async (num) => {

        const lower = num * (pageNumber.current-1);
        const upper = lower + num - 1;

        console.log(lower);
        console.log(upper);

        const { abbreviatedShowings } = await fetchAbbreviatedShowings(lower, upper);
        setShowings(abbreviatedShowings);

    };

    const getShowingsInit = async (num) => {

        const {abbreviatedShowings, count} = await fetchAbbreviatedShowings(0, num - 1);
        setShowings(abbreviatedShowings);

        const maxPageNumber = Math.ceil(count / num);
        setPageNumber({ current: 1, max: maxPageNumber });
        setPageLength({current: num});

    };

    const handlePageChange = async (num) => {
        setPageNumber({ current: num, max: pageNumber.max });
        
        const lower = pageLength.current * (num-1);
        const upper = lower + pageLength.current - 1;

        const { abbreviatedShowings } 
            = await fetchAbbreviatedShowingsFiltered(lower, upper, usedFilter.zip, usedFilter.state, usedFilter.city);
        setShowings(abbreviatedShowings);
    };

    // return

    return { 
        filterForm, 
        dispatchFilterForm, 
        applyFilters,
        showings, 
        pageNumber, 
        getShowings, 
        getShowingsInit, 
        handlePageChange};

}

export default ListOfShowingsCmp;