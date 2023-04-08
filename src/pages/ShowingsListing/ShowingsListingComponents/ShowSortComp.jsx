import "./ShowSortComp.css"

function ShowSortComp({filterForm, dispatchFilterForm, applyFilters}) {

    return(
    <div className="property-listing-filters">
        <div className="filter-header">Filters</div>
        <div className="property-listing-filters-form">

            <form onSubmit={ (applyFilters) }>

                <b><p>Zip</p></b>
                <div>
                    <label htmlFor="zip"></label>
                    <input 
                        id="zip" 
                        name="zip" 
                        type="text" 
                        pattern="[0-9]*" 
                        value={ filterForm.zip }
                        onChange={ (e) => dispatchFilterForm({ type: e.target.id, value: e.target.value }) }
                    />
                </div>

                <b><p>State</p></b>
                <div>
                    <label htmlFor="state"></label>
                    <input 
                        id="state" 
                        name="state" 
                        type="text" 
                        pattern="[a-zA-Z]*" 
                        value={ filterForm.state }
                        onChange={ (e) => dispatchFilterForm({ type: e.target.id, value: e.target.value }) }
                    />
                </div>

                <b><p>City</p></b>
                <div>
                    <label htmlFor="city"></label>
                    <input 
                        id="city" 
                        name="city" 
                        type="text" 
                        pattern="[a-zA-Z]*" 
                        value={ filterForm.city }
                        onChange={ (e) => dispatchFilterForm({ type: e.target.id, value: e.target.value }) }
                    />
                </div>

                <button>Filter</button>

            </form>

        </div>
    </div>
    );
};

export default ShowSortComp;