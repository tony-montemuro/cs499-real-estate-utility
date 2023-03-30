// for logic
import { useState } from "react";
import Read from "../../database/Read";

const Home = () => {
    const [listings, setListings] = useState(undefined);

    const { fetchAbbreviatedListings } = Read(); // read from database

    const getListings = async () => {
        // fetch array of listings from the database, and update the listings state
        const abbreviatedListings = await fetchAbbreviatedListings();
        setListings(abbreviatedListings);
    }
    
    return { listings, getListings};
}

export default Home;