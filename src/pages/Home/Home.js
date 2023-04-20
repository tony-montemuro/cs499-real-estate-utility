/* ===== IMPORTS ===== */
import { useState } from "react";
import Read from "../../database/Read";

const Home = () => {
    /* ===== STATES ===== */
    const [listing, setListing] = useState(undefined);

    /* ===== FUNCTIONS ===== */

    // database functions
    const { fetchRandomAbbreviatedListing } = Read();

    // FUNCTION 1 - getListing - get a listing from the database
    // PRECONDITIONS (1 condition):
    // this function should be called each time the Home component is mounted
    // POSTCONDITIONS (2 possible outcomes):
    // if the query is a success, we call the setListing() function with the listing object, which will render it to the screen
    // if the query is not successful, the query will return null, and the listing will not be rendered to the screen
    const getListing = async () => {
        // fetch a random listing id from the database
        const listing = await fetchRandomAbbreviatedListing();
        setListing(listing);
    }
    
    return { listing, getListing };
}

/* ===== EXPORTS ===== */
export default Home;