import './AbrvShowingInstance.css';
import PropertyImage from "../../../ui/PropertyImage/PropertyImage.jsx";


function AbrvShowingInstance({ address, street, startTime, endTime, listAgentInfo, image, showAgentInfo, listing_id }){

    // The AbrvShowingInstance component - display all fields as passed in to the component 
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
                                    {/*If the showing agent is not defined, don't display it or the lable */}
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

/*==Exports==*/
export default AbrvShowingInstance;