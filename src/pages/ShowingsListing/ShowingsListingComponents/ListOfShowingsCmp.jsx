import AbrvShowingInstance from "./AbrvShowingInstance.jsx";
import "./ListOfShowingsCmp.css";
import { FixedSizeList } from 'react-window';
import { Link } from "react-router-dom";
import { useEffect } from "react";


function Row({ data, index, style }){

    // console.log(data);

    var showingA = data[(index*2)]
    if (index*2 + 1 < data.length) {
        var showingB = data[(index*2+1)]
    }

    console.log(data)

    return(
        <div style={style}>
            
            <div className = "showings-row">

                <Link to={ `${ showingA.showing_id }` } >
                    <AbrvShowingInstance 
                        address={showingA.listing.property.city + ' ' + showingA.listing.property.state}
                        street = {showingA.listing.property.street + ' ' + showingA.listing.property.zip} 
                        startTime = {showingA.start_time}
                        endTime = {showingA.end_time} 
                        listAgentInfo = {showingA.listing.agent.name + ', ' + showingA.listing.agent.agency.name}
                        image = {showingA.listing.property.small}
                        showAgentInfo= {showingA.agent ? showingA.agent.name + ', ' + showingA.agent.agency.name : null}>
                            {/*console.log(showingA.listing.property.small)*/}
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
                        >
                            {/*console.log(showingB.listing.property.small)*/}
                    </AbrvShowingInstance>
                </Link>
                :
                <br/>
                }

            </div>

        </div>
    )

}

function ListOfShowingsCmp({showings, pageNumber, getShowingsInit, handlePageChange}) {

    var pageElems = 16;
    //const {showings, pageNumber, getShowings, getShowingsInit, handlePageChange} = ListOfShowingsCmpLogic();

    const listWidth = document.querySelector("#ShowingsListingContainingBox") ? 
        document.querySelector("#ShowingsListingContainingBox").clientWidth : 50;
    const listHeight = 470;

    useEffect(() => {
        if (!showings){
        getShowingsInit(pageElems) 
        }
    }, [showings, pageNumber]);

    return (

        <>  
            
            { showings ?
                <>
                    <div className="showing-selector">
                    <button 
                        disabled={ pageNumber.current === 1 } 
                        onClick={ () => handlePageChange(pageNumber.current-1) }
                    >
                        &lt;
                    </button>

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
                    itemSize = {(0.30 * window.innerHeight)}
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



export default ListOfShowingsCmp;