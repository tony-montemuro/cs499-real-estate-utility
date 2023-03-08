import AbrvShowingInstance from "./AbrvShowingInstance.jsx";
import { FixedSizeList } from 'react-window';

function Row({ data, index, style }){

    var {address, time, agencyInfo} = data;

    return(
        <div>
            
            <AbrvShowingInstance 
                address={address} 
                time = {time} 
                agencyInfo = {agencyInfo}>
            </AbrvShowingInstance>

        </div>
    )

}

function ListOfShowingsCmp() {

    return (
        <FixedSizeList
            height={400}
            width={360}
            itemCount={50}
            itemData={{ address: "foo",
                        time: "foo",
                        agencyInfo: "foo" }}>
            {Row}
        </FixedSizeList>
    )

};



export default ListOfShowingsCmp;