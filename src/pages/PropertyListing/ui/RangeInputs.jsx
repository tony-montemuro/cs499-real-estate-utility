/* ===== IMPORTS ===== */
import "../PropertyListing.css";

function RangeInputs({ type, formState, updateFormState }) {
  /* ===== STATES & FUNCTIONS ===== */
  
  /* ===== RANGE INPUTS COMPONENT ===== */
  return (
    <div className="property-listings-range-inputs">

      { /* Min bound */ }
      <div>
        <label htmlFor={ `min-${ type }` }>Min: </label> 
        <input 
          id={ `min-${ type }` }
          type="number"
          value={ formState[type].min }
          onChange={ (e) => updateFormState({ type: e.target.id, value: e.target.value }) }
        />
      </div>

      { /* Max bound */ }
      <div> 
        <label htmlFor={ `max-${ type }` }>Max: </label> 
        <input 
          id={ `max-${ type }` } 
          type="number" 
          value={ formState[type].max }
          onChange={ (e) => updateFormState({ type: e.target.id, value: e.target.value }) }
        /> 
      </div>

    </div>
  );
};

/* ===== EXPORTS ===== */
export default RangeInputs;