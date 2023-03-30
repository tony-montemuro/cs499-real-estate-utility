import AbrvShowingInstance from "./ShowingsListingComponents/AbrvShowingInstance.jsx";
import ListOfShowingsCmp from "./ShowingsListingComponents/ListOfShowingsCmp.jsx";
import ShowSortComp from "./ShowingsListingComponents/ShowSortComp.jsx";
import "./ShowingsListing.css";

function ShowingsListing() {

    return (
        <>  
            <h1>Showings</h1>
            <ListOfShowingsCmp/>
            <ShowSortComp/>

        </>
    )
};

export default ShowingsListing;