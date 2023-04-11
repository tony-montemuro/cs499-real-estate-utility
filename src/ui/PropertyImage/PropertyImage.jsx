/* ===== IMPORTS ===== */
import "./PropertyImage.css";
import { useEffect } from "react";
import PropertyImageLogic from "./PropertyImage.js";

function PropertyImage({ filename }) {
  /* ===== STATES & FUNCTIONS ===== */
  const { img, fetchImage } = PropertyImageLogic();

  /* ===== EFFECTS ===== */

  // code that is executed upon component load
  useEffect(() => {
    if (filename) {
      fetchImage(filename);
    }
    // eslint-disable-next-line
  }, [filename]);

  /* ===== PROPERTY IMAGE COMPONENT ===== */
  return <img id="property-image" src={ img } alt={ filename } />
};

/* ===== EXPORTS ===== */
export default PropertyImage;