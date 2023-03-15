import AbrvShowingInstance from "./AbrvShowingInstance.jsx";
import "./ListOfShowingsCmp.css";
import { FixedSizeList } from 'react-window';

function Row({ data, index, style }){

    var {address, time, agencyInfo} = data;

    return(
        <div style={style}>
            
            <div className = "showings-row">

                <AbrvShowingInstance 
                    address={address + (index * 2)} 
                    time = {time + (index * 2)} 
                    agencyInfo = {agencyInfo + (index * 2)}>
                </AbrvShowingInstance>

                <AbrvShowingInstance 
                    address={address + (index * 2 + 1)} 
                    time = {time + (index * 2 + 1)} 
                    agencyInfo = {agencyInfo + (index * 2 + 1)}>
                </AbrvShowingInstance>
                
            </div>

        </div>
    )

}

function ListOfShowingsCmp() {

    return (
        <FixedSizeList className="list-display"
            height={600}
            width={868}
            itemCount={30}
            itemSize = {175}
            itemData={{ address: "foo",
                        time: "foo",
                        agencyInfo: "foo" }}>
            {Row}
        </FixedSizeList>
    )

};



export default ListOfShowingsCmp;