/* ===== IMPORTS ===== */
import DeleteIcon from '@mui/icons-material/Delete';
import FrontendHelper from "../../../util/FrontendHelper";

function RoomInput({ room, roomTypes, handleChange, handleDelete }) {
  /* ===== FUNCTIONS ===== */
  const { snakeToTitle } = FrontendHelper();

  /* ===== ROOM INPUT COMPONENT ===== */
  return (
    <>
      <label htmlFor="room_type">Room Type: </label>
      <select id="room_type" value={ room.room_type } onChange={ (e) => handleChange(e, room) }>
        { roomTypes.map(option => {
          return <option key={ option } value={ option }>
            { snakeToTitle(option) }
          </option>
        })}
      </select>
      <label htmlFor="description">Description (optional): </label>
      <input
        id="description"
        type="text"
        value={ room.description }
        onChange={ (e) => handleChange(e, room) }
      />
      <button className="delete-room-btn" onClick={ (e) => handleDelete(e, room) }>
        <DeleteIcon /> Remove Room
      </button>
    </>
  );
};

/* ===== EXPORTS ===== */
export default RoomInput;