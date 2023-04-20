/* ===== IMPORTS ===== */
import "./Home.css";
import PropertyImage from "../../ui/PropertyImage/PropertyImage.jsx";
import { Link } from "react-router-dom";
import HomeLogic from "./Home.js";
import FrontendHelper from "../../util/FrontendHelper.js";
import { useEffect } from "react";

function Home() {
    /* ===== FUNCTIONS ===== */

    // states and functions from the Home.js file
    const { listing, getListing } = HomeLogic();

    // helper functions
    const { floatToUSD, formatFloat, getAddress } = FrontendHelper();

    /* ===== EFFECTS ===== */

    // code that is executed when the home component mounts
    useEffect(() => {
        getListing();
        // eslint-disable-next-line
    }, []);

    /* ===== HOME COMPONENT ===== */
    return (
        <>
            <div className="container">
                <div className="introduction">
                    <h1>Welcome to REU Properties!</h1>
                    <p>This is the official web-based application of REU Properties!</p>
                    <p>We promise to find the perfect home, just for you!</p>
                    <p>Feel free to use the navbar at the top of the page to take a look around!</p>
                </div>
                <div className="hotproperty">
                    <h1>Check out this hot property!</h1>
                    { listing ? 
                        <>
                        <div className="hot-property-listing-img">
                            <div className="property-listing-img-container">
                                <PropertyImage filename={ listing.property.small } />
                            </div>
                        </div>
                        <p>{ getAddress(listing.property) }</p>
                        <p>{ formatFloat(listing.property.sqr_feet) } Square Feet</p>
                        <p>{ floatToUSD(listing.price) }</p>
                        <p><Link to= {`/listings/${ listing.listing_id }`} >Learn More!</Link></p>
                        </>
                    :
                        <p>Loading...</p>
                    }
                </div>
            </div>
        </>
    )
};

/* ===== EXPORTS ===== */
export default Home;