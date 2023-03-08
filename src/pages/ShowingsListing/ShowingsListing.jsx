import AbrvShowingInstance from "./ShowingsListingComponents/AbrvShowingInstance.jsx";
import ListOfShowingsCmp from "./ShowingsListingComponents/ListOfShowingsCmp.jsx";

function ShowingsListing() {

    return (
        <>
        <h1>Showings</h1>

        <AbrvShowingInstance address={"toot"} time={"time"} agencyInfo={"Croed"} />

        <ListOfShowingsCmp/>

        </>
    )
};

export default ShowingsListing;