import './AbrvShowingInstance.css';
import PropertyImage from "/app/src/ui/PropertyImage/PropertyImage.jsx";


function AbrvShowingInstance({ address, street, time, agencyInfo, image }){

    return( 
        <div className = "grid-container">
            <div className = "image-container">
                <PropertyImage filename={ image }/>
            </div>
            <div className = "address">
                {address}
                <br/>
                {street}
            </div>
            <div className = "time">
                {time}
            </div>
            <div className = "agency-info">
                {agencyInfo}
            </div>
        </div>
    )

};

export default AbrvShowingInstance;