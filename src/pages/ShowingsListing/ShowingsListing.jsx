import ListOfShowingsCmp from "./ShowingsListingComponents/ListOfShowingsCmp.jsx";
import ShowSortComp from "./ShowingsListingComponents/ShowSortComp.jsx";
import "./ShowingsListing.css";
import Box from '@mui/material/Box';
import ShowingsListingLogic from "./ShowingsListings.js";
import { AgentContext } from "../../Contexts";
import {useContext} from "react";
import "./ShowingsListing.css"


function ShowingsListing() {

    const {agent} = useContext(AgentContext);

    const { filterForm, 
        dispatchFilterForm, 
        applyFilters,
        showings, 
        pageNumber, 
        getShowingsInit, 
        handlePageChange} = ShowingsListingLogic();

    return (
        <>  
            {agent ? 
            <>
            <div className="showings-header"><h1>Showings</h1></div>
            <div className = "showings-body">
                <Box id="ShowingsListingContainingBox" overflow="hidden" width="75%">
                    <ListOfShowingsCmp showings={showings} pageNumber={pageNumber} 
                    getShowingsInit={getShowingsInit} handlePageChange={handlePageChange}/>
                </Box>
                <ShowSortComp filterForm={filterForm} dispatchFilterForm={dispatchFilterForm} applyFilters={applyFilters} />
            </div>
            </>
            :
            <h1>Invalid Credentials</h1>
            }
        </>
    )
};

export default ShowingsListing;