/* ===== IMPORTS ===== */
import "../DetailedListing.css";
import FrontendHelper from "../../../util/FrontendHelper";

function Room({ room, index }) {
  /* ===== FUNCTIONS ===== */
  
  // helper functions
  const { snakeToTitle } = FrontendHelper();

  /* ===== ROOM COMPONENT ====== */
  return (
    <div className="detailed-listings-room">
      <h3>Room #{index+1}</h3>
      <p>Type: { snakeToTitle(room.room_type) }</p>
      <p>Description: { room.description && room.description.length > 0 ? room.description : <i>None</i> }</p>
    </div>
  );
};

/* ===== EXPORTS ===== */
export default Room;