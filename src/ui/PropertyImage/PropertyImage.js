/* ===== IMPORTS ====== */
import { ImagesContext } from "../../Contexts";
import { useContext, useState } from "react";
import Read from "../../database/Read";

const PropertyImage = () => {
    /* ===== CONTEXTS ===== */
    const { imagesCache } = useContext(ImagesContext);

    /* ===== STATES ===== */
    const [img, setImg] = useState(undefined);

    /* ===== FUNCTIONS ===== */

    // database functions
    const { fetchImageByFilename } = Read();

    // FUNCTION 1: fetchImage - given a filename and our global images cache object, get an image url, and set the img state
    // PRECONDITIONS (1 parameter):
    // 1.) fileName: a string representing a valid file in the database, must also be well formatted (include file extension)
    // POSTCONDITIONS (1 possible outcome):
    // this function will attempt to fetch the image from global imagesCache. if it exists, simply call setImg() to update the
    // img if it does not exist, we need to fetch it from the database. once it has been returned, we want to update our 
    // imagesCache object, and call setImg() to update the img
    const fetchImage = async (filename) => {
        // attempt to fetch image url from global imagesCache object
        let url = imagesCache[filename];

        // if we are unsuccessful, grab image from database, and update imagesCache
        if (!url) {
            url = await fetchImageByFilename(filename);
            imagesCache[filename] = url;
        }

        // set img state
        setImg(url);
    };
    
    return { img, fetchImage };
};

/* ===== EXPORTS ===== */
export default PropertyImage;