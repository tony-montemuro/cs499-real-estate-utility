/* ===== IMPORTS ===== */
import "./DeletePropertyPopup.css";
import CancelIcon from "@mui/icons-material/Cancel";
import DeletePropertyPopupLogic from "./DeletePropertyPopup.js";

function DeletePropertyPopup({ popup, setPopup }) {
  /* ===== STATES & FUNCTIONS ===== */
  const { deleted, deleteProperty, setDeleteProperty, confirmRemoval, closePopup } = DeletePropertyPopupLogic();

  /* ===== DELETE PROPERTY POPUP COMPONENT ===== */
  return popup && (
    <div className="delete-property-popup">
      <div className="delete-property-popup-inner">

        { /* Button to close the popup */ }
        <button onClick={ () => closePopup(setPopup) } className="close-btn"><CancelIcon /></button>

        { /* Popup header */ }
        <h1>Are you sure you want to delete this listing?</h1>

        { /* Checkbox that allows user to choose whether to just remove listing (unchecked), or proporty data as well (checked) */ }
        <div className="delete-property-popup-checkbox">
          <label htmlFor="deleteProperty">Also delete all property data?</label>
          <input 
            type="checkbox"
            value={ deleteProperty }
            onChange={ () => setDeleteProperty(!deleteProperty) }
            disabled={ deleted }
          />
        </div>

        { /* Popup buttons - if agent selects 'Yes', a call will be made to the database to remove the listing
        if agent selects 'No', the popup will close, similar to the close button. NOTE: Buttons disable after user
        selects 'Yes'. */ }
        <div className="delete-property-popup-buttons">
          <button onClick={ () => confirmRemoval(popup) } disabled={ deleted }>Yes</button>
          <button onClick={ () => closePopup(setPopup) } disabled={ deleted }>No</button>
        </div>

        { /* Message that renders if the agent successfully removes the listing. */ }
        { deleted && <p>{ deleted }</p> }

      </div>
    </div>
  );
};

/* ===== EXPORTS ===== */
export default DeletePropertyPopup;