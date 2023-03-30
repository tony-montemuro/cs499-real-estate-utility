import AbrvShowingInstance from "./AbrvShowingInstance.jsx";
import "./ListOfShowingsCmp.css";
import { FixedSizeList } from 'react-window';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ListOfShowingsCmpLogic from "./ListOfShowingsCmp.js"


function Row({ data, index, style }){

    // console.log(data);

    var showingA = data[(index*2)]
    if (index*2 + 1 < data.length) {
        var showingB = data[(index*2+1)]
    }

    return(
        <div style={style}>
            
            <div className = "showings-row">

                <Link to={ `${ showingA.showing_id }` } >
                    <AbrvShowingInstance 
                        address={showingA.listing.property.city + ' ' + showingA.listing.property.state}
                        street = {showingA.listing.property.street + ' ' + showingA.listing.property.zip} 
                        time = {showingA.start_time + ' - ' + showingA.end_time} 
                        agencyInfo = {showingA.agent ? showingA.agent.name + ', ' + showingA.agent.agency.name : "No agent"}
                        image = {showingA.listing.property.small}>
                            {/*console.log(showingA.listing.property.small)*/}
                    </AbrvShowingInstance>
                </Link>

                { showingB ?
                <Link to={ `${ showingB.showing_id }` } >
                    <AbrvShowingInstance 
                        address={showingB.listing.property.city + ' ' + showingB.listing.property.state}
                        street = {showingB.listing.property.street + ' ' + showingB.listing.property.zip} 
                        time = {showingB.start_time + ' - ' + showingB.end_time} 
                        agencyInfo = {showingB.agent ? showingB.agent.name + ', ' + showingB.agent.agency.name : "No agent"}
                        image = {showingB.listing.property.small}>
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

function ListOfShowingsCmp() {

    var pageElems = 16;
    const {showings, pageNumber, getShowings, getShowingsInit, handlePageChange} = ListOfShowingsCmpLogic();

    useEffect(() => {
        getShowingsInit(pageElems);
    }, []);

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
                    height={600}
                    width={1022}
                    itemCount={Math.ceil(showings.length / 2)}
                    itemSize = {175}
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