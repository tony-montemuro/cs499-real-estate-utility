/* ===== IMPORTS ===== */
import "../PropertyListing.css";
import RangeInputs from "./RangeInputs";

function FilterForm({ formState, updateFormState, applyFiltersFunc, pageLength }) {
  /* ===== FILTER FORM STATE ===== */
  return (
    <div className="property-listing-filters">
      <h2>Filters</h2>
      <div className="property-listing-filters-form">

        { /* Form used to set search filters */ }
        <form onSubmit={ (e) => applyFiltersFunc(e, pageLength) }>

          { /* Price range */ }
          <b><p>Price</p></b>
          <RangeInputs type={ "price" } formState={ formState } updateFormState={ updateFormState } />
          { formState.error.price && <p>Error: { formState.error.price }</p> }

          { /* Square footage range */ }
          <b><p>Square Footage</p></b>
          <RangeInputs type={ "sqrFeet" } formState={ formState } updateFormState={ updateFormState } />
          { formState.error.sqrFeet && <p>Error: { formState.error.sqrFeet }</p> }

          { /* Zip code */ }
          <b><p>Zip</p></b>
          <div>
            <label htmlFor="zip">Zip: </label>
            <input 
              id="zip" 
              name="zip" 
              type="text" 
              pattern="[0-9]*" 
              value={ formState.zip }
              onChange={ (e) => updateFormState({ type: e.target.id, value: e.target.value }) }
            />
          </div>
          { formState.error.zip && <p>Error: { formState.error.zip }</p> }

          { /* Form button */ }
          <button>Filter</button>

        </form>

      </div>
    </div>
  );
};

/* ===== EXPORTS ===== */
export default FilterForm;