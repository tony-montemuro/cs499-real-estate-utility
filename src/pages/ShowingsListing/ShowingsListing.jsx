import AbrvShowingInstance from "./AbrvShowingInstance.jsx";
import ListOfShowingsCmp from "./ListOfShowingsCmp.jsx";

function ShowingsListing() {

    return (
        <><h1>Showings</h1>
        <AbrvShowingInstance 
            address="Adress, addresss, asdf"  
            time= "9:00-10:00 p.m., March 3rd, 2010" 
            agencyInfo="Guy Person, QLTyProperties"/>
        <ListOfShowingsCmp/>
        </>
    )
};

export default ShowingsListing;