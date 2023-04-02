import AbrvShowingInstance from "./ShowingsListingComponents/AbrvShowingInstance.jsx";
import ListOfShowingsCmp from "./ShowingsListingComponents/ListOfShowingsCmp.jsx";
import ShowSortComp from "./ShowingsListingComponents/ShowSortComp.jsx";
import "./ShowingsListing.css";
import Box from '@mui/material/Box';


function ShowingsListing() {

    return (
        <>  
            <h1>Showings</h1>
            <div className = "showings-body">
                <Box id="ShowingsListingContainingBox" overflow="hidden" width="75%">
                    <ListOfShowingsCmp/>
                </Box>
                <ShowSortComp/>
            </div>

        </>
    )
};

export default ShowingsListing;