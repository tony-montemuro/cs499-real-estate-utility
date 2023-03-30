// for presentation
import "./Home.css";
import PropertyImage from "../../ui/PropertyImage/PropertyImage.jsx";
import { Link } from "react-router-dom";
import HomeLogic from "./Home.js";
import FrontendHelper from "../../util/FrontendHelper.js";
import { useEffect } from "react";

function Home() {
    
    
    // states and functions from the Home.js file
    const { listings, getListings } = HomeLogic();

    // helper functions
    const { floatToUSD, formatFloat, getAddress } = FrontendHelper();

    useEffect(() => {
        getListings();
        // eslint-disable-next-line
    }, []);

    var hot_listing = Math.floor(Math.random() * 10);
    var listing_link = "/listings/" + hot_listing;

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
            { listings ? 
                <>
                <div className="hot-property-listing-img">
                    <div className="property-listing-img-container">
                        <PropertyImage filename={ listings[hot_listing].property.small } />
                    </div>
                </div>
                <p>{ getAddress(listings[hot_listing].property) }</p>
                <p>{ formatFloat(listings[hot_listing].property.sqr_feet) } Square Feet</p>
                <p>{ floatToUSD(listings[hot_listing].price) }</p>
                <p><Link to= {listing_link} >Learn More!</Link></p>
                </>
            :
                <p>Loading...</p>
            }
            </div>
        </div>
        </>
    )
};

export default Home;
