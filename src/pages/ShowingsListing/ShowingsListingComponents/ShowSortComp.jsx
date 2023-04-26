import "./ShowSortComp.css"

// The ShowSortComp provides a means to select a specific kind of showings
function ShowSortComp({filterForm, dispatchFilterForm, applyFilters}) {

    return(
    <div className="showings-listing-filters">
        <div className="filter-header">Filters</div>
        <div className="showings-listing-filters-form">

            <form onSubmit={ (applyFilters) }>
            {/*The Filter form allows the setting of a zip, state, and city for which the showings gathered will follow.*/}

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

/*==EXPORT==*/
export default ShowSortComp;