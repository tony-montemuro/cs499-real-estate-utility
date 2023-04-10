/* ===== IMPORTS ===== */
import DeleteIcon from '@mui/icons-material/Delete';

function ShoppingInput({ shoppingArea, handleChange, handleDelete, index }) {
  /* ===== SHOPPING INPUT COMPONENT ===== */
  return (
    <>
      <input 
        id="shopping_areas"
        type="text"
        value={ shoppingArea }
        onChange={ (e) => handleChange(e, index) }
      />
      <button className="delete-shopping-area-btn" onClick={ (e) => handleDelete(e, index) }>
        <DeleteIcon />Remove Shopping Area
      </button>
    </>
  );
};

/* ===== EXPORTS ===== */
export default ShoppingInput;