import './AbrvShowingInstance.css';


function AbrvShowingInstance(props){

    const { data, index, style } = props;

    address = data.offset + index;
    time = data.offset + index;
    agencyInfo = data.offset + index;
    imageSource = "https://dcv19h61vib2d.cloudfront.net/thumbs/scikit-learn-create-an-image-with-javascript-using-fetch-and-url-createobjecturl-H1GhM8w7B/scikit-learn-create-an-image-with-javascript-using-fetch-and-url-createobjecturl-H1GhM8w7B.jpg"

    return( 
        <div className = "grid-container">
            <div className = "image-container">
                <img className = "image" src = "{{imageSource}}" />
            </div>
            <div className = "address">
                {address}
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