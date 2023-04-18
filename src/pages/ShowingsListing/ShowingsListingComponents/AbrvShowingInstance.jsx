import './AbrvShowingInstance.css';
import PropertyImage from "../../../ui/PropertyImage/PropertyImage.jsx";


function AbrvShowingInstance({ address, street, startTime, endTime, listAgentInfo, image, showAgentInfo, listing_id }){

    return( 
        <div className = "abrv-show-instance">
            <div className = "image-container">
                <PropertyImage filename={ image }/>
            </div>
            <div className = "grid-container">
                <div className = "address">
                    {address}
                    <br/>
                    {street}
                </div>
                <div className = "time">
                    MLS#: {listing_id}
                    <br/>
                    Starting Time:<br/>{startTime}
                    <br/>Ending Time:<br/>{endTime}
                </div>
                <div className = "agency-info">
                    Listing Agent: {listAgentInfo}
                    { showAgentInfo ? 
                                    <>
                                        <br/>
                                        Showing Agent: {showAgentInfo}
                                    </>            
                    :
                    <></>
                    }
                </div>
            </div>
        </div>
    )

};

export default AbrvShowingInstance;