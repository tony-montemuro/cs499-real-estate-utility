import AbrvShowingInstance from "./ShowingsListingComponents/AbrvShowingInstance.jsx";
import ListOfShowingsCmp from "./ShowingsListingComponents/ListOfShowingsCmp.jsx";
import ShowSortComp from "./ShowingsListingComponents/ShowSortComp.jsx";
import "./ShowingsListing.css";
import Box from '@mui/material/Box';
import ShowingsListingLogic from "./ShowingsListings.js";



function ShowingsListing() {

    const { filterForm, 
        dispatchFilterForm, 
        applyFilters,
        showings, 
        pageNumber, 
        getShowings, 
        getShowingsInit, 
        handlePageChange} = ShowingsListingLogic();

    return (
        <>  
            <h1>Showings</h1>
            <div className = "showings-body">
                <Box id="ShowingsListingContainingBox" overflow="hidden" width="75%">
                    <ListOfShowingsCmp showings={showings} pageNumber={pageNumber} 
                    getShowingsInit={getShowingsInit} handlePageChange={handlePageChange}/>
                </Box>
                <ShowSortComp filterForm={filterForm} dispatchFilterForm={dispatchFilterForm} applyFilters={applyFilters} />
            </div>

        </>
    )
};

export default ShowingsListing;