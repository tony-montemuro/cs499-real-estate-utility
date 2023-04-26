import Read from "../../database/Read";
import { useReducer, useState } from "react";

const ListOfShowingsCmp = () => {

    // States and Reducers
    const [showings, setShowings] = useState(undefined);
    const [pageNumber, setPageNumber] = useState(undefined);
    const [pageLength, setPageLength] = useState(undefined);

    // Functions for reading the database
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
    // POSTCONDITIONS (1 outcome):
    // When the function is called, the showings are set to a subset of the showings in the database
    // If an error occurs, the showings are left empty, otherwise the showings are filtered accordingly
    const applyFilters = async (e) => {
        // prevent page from reloading (default form submission behavior)
        e.preventDefault();
        
        await setFilters(filterForm);

        const lower = 0;
        const upper = pageLength.current - 1;

        const {abbreviatedShowings, count} 
            = await fetchAbbreviatedShowingsFiltered(lower, upper, filterForm.zip, filterForm.state, filterForm.city);
        setShowings(abbreviatedShowings);

        var maxPageNumber = Math.ceil(count / pageLength.current);
        maxPageNumber = (maxPageNumber <1 ? 1 : maxPageNumber);
        setPageNumber({ current: 1, max: maxPageNumber });
    };


    // Function 4: getShowings
    // get the specified number of showings according to num and the current page number
    const getShowings = async (num) => {

        const lower = num * (pageNumber.current-1);
        const upper = lower + num - 1;

        const { abbreviatedShowings } = await fetchAbbreviatedShowings(lower, upper);
        setShowings(abbreviatedShowings);

    };

    // Function 5: getShowingsInit
    // On the first pass of database access, sets up the page size from the passed in num, uses
    // it to set the page length and get the database
    const getShowingsInit = async (num) => {

        const {abbreviatedShowings, count} = await fetchAbbreviatedShowings(0, num - 1);
        setShowings(abbreviatedShowings);

        const maxPageNumber = Math.ceil(count / num);
        setPageNumber({ current: 1, max: maxPageNumber });
        setPageLength({current: num});

    };

    // Function 6: handlePageChange
    // When users change the page, get a new subset from the database
    const handlePageChange = async (num) => {
        setPageNumber({ current: num, max: pageNumber.max });
        
        const lower = pageLength.current * (num-1);
        const upper = lower + pageLength.current - 1;

        const { abbreviatedShowings } 
            = await fetchAbbreviatedShowingsFiltered(lower, upper, usedFilter.zip, usedFilter.state, usedFilter.city);
        setShowings(abbreviatedShowings);
    };

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

/* ===== EXPORTS ===== */
export default ListOfShowingsCmp;