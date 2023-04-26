import AbrvShowingInstance from "./AbrvShowingInstance.jsx";
import "./ListOfShowingsCmp.css";
import { FixedSizeList } from 'react-window';
import { Link } from "react-router-dom";
import { useEffect } from "react";

// The row component is a utility for the list of showings component - do not export
function Row({ data, index, style }){

    // The data, index, and style passed to the row contain the array of abbreviated showings, the row#, and style needed for
    // rendering the row correctly. Two showings are displayed per row, so index*2 and index*2+1 are used.

    // Set the first and second abbreviated showing objects for the row - 
    // if only one object remains in the list, skip the second assignment
    var showingA = data[(index*2)]
    if (index*2 + 1 < data.length) {
        var showingB = data[(index*2+1)]
    }

    return(
        <div style={style}>
            
            <div className = "showings-row">
                {/*Create both instances using the A and B abreviated showing objects*/}
                <Link to={ `${ showingA.showing_id }` } >
                    <AbrvShowingInstance 
                        address={showingA.listing.property.city + ' ' + showingA.listing.property.state}
                        street = {showingA.listing.property.street + ' ' + showingA.listing.property.zip} 
                        startTime = {showingA.start_time}
                        endTime = {showingA.end_time} 
                        listAgentInfo = {showingA.listing.agent.name + ', ' + showingA.listing.agent.agency.name}
                        image = {showingA.listing.property.small}
                        showAgentInfo= {showingA.agent ? showingA.agent.name + ', ' + showingA.agent.agency.name : null}
                        listing_id={showingA.listing.listing_id}
                        >
                    </AbrvShowingInstance>
                </Link>

                { showingB ?
                <Link to={ `${ showingB.showing_id }` } >
                    <AbrvShowingInstance 
                        address={showingB.listing.property.city + ' ' + showingB.listing.property.state}
                        street = {showingB.listing.property.street + ' ' + showingB.listing.property.zip} 
                        startTime = {showingB.start_time}
                        endTime = {showingB.end_time} 
                        listAgentInfo = {showingB.listing.agent.name + ', ' + showingB.listing.agent.agency.name} 
                        image = {showingB.listing.property.small}
                        showAgentInfo = {showingB.agent ? showingB.agent.name + ', ' + showingB.agent.agency.name : null}
                        listing_id={showingB.listing.listing_id}
                        >
                    </AbrvShowingInstance>
                </Link>
                :
                <br/>
                }

            </div>

        </div>
    )

}

// The ListOfShowingsCmp component contains the actual list of components
function ListOfShowingsCmp({showings, pageNumber, getShowingsInit, handlePageChange}) {

    // variables for list rendering
    var pageElems = 16;
    const listWidth = document.querySelector("#ShowingsListingContainingBox") ? 
        document.querySelector("#ShowingsListingContainingBox").clientWidth : 50;
    const listHeight = 470;

    // When the page is loaded, get the list of showings
    useEffect(() => {
        if (!showings){
            getShowingsInit(pageElems) 
        }
        // eslint-disable-next-line
    }, [showings, pageNumber]);

    // ListOfShowingsCmp details
    return (

        <>  
            {/*Dispaly loading until the showings list is set */}
            { showings ?
                <>
                    {/*First render the buttons for changing the page of showings listings.*/}
                    <div className="showing-selector">
                    <button 
                        disabled={ pageNumber.current === 1 } 
                        onClick={ () => handlePageChange(pageNumber.current-1) }
                    >
                        &lt;
                    </button>

                    {/* Page numbers are set if length of database list is greater than elements per page*/}
                    <div className="showing-page-select">
                        <label htmlFor="pageNumber">Page: </label>
                        <select id="pageNumber" value={ pageNumber.current } onChange={ (e) => handlePageChange(parseInt(e.target.value)) }>
                        { Array.from({ length: pageNumber.max }, (_, i) => i + 1).map(num => (
                            <option key={ num } value={ num }>
                                { num }
                            </option>
                        ))}
                        </select>
                    </div>

                    {/* Disable the next page button if on the last page*/}
                    <button 
                        disabled={ pageNumber.current === pageNumber.max } 
                        onClick={ () => handlePageChange(pageNumber.current+1) }
                    >
                        &gt;
                    </button>
                </div>

                <FixedSizeList className="list-display"
                    height={listHeight}
                    width={listWidth}
                    itemCount={Math.ceil(showings.length / 2)}
                    itemSize = {(0.34 * window.innerHeight)}
                    itemData={showings}>
                    {Row}

                </FixedSizeList>
                </>
            :
            <p>Loading...</p> 
            }
            
        </>
        
    )

};


/*==EXPORTS==*/
export default ListOfShowingsCmp;