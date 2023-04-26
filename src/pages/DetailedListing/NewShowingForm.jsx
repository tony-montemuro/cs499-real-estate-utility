import "./DetailedListing.css";
import NewShowingFormLogic from "./NewShowingForm.js";
import "./NewShowingForm.css"

// Passed in parameters are as given:
// listing_id - the id of the listing the showing form is being created on
// showForm - state saying if the form should be rendered
// toggleForm - the function to set showForm
function NewShowingForm({listing_id, showForm, toggleForm}) {

    // states and functions from the NewShowingForm.js file
    const { 
        showingForm, 
        dispatchShowingForm, 
        submitShowingForm
    } = NewShowingFormLogic();

    // NewShowingForm component
    return showForm &&
        
        <div className="new-showing-form-box">

            {/* Button to close the new showing form, cancle creation of new showing*/}
            <button onClick = {() => toggleForm(false)}>
            Close Form
            </button>

            <form onSubmit={(e) => {submitShowingForm(e, listing_id, toggleForm)}} className="new-showing-form" >


                <h2>Starting Date</h2>
                {/* Calendar select date, must be created on current date or in the future.*/}
                <label htmlFor="Showing Date"></label>
                <input 
                    id="date" 
                    name="date" 
                    type="date" 
                    min= {(new Date(Date.now()).toISOString().split('T')[0])}
                    value={ showingForm.date }
                    onChange={ (e) => dispatchShowingForm({ type: e.target.id, value: e.target.value }) }
                />


                <h2>Starting Time</h2>
                {/* Time select field.*/}
                <label htmlFor="Starting Time"></label>
                <input 
                    id="startTime" 
                    name="startTime" 
                    type="time" 
                    value={ showingForm.startTime }
                    onChange={ (e) => dispatchShowingForm({ type: e.target.id, value: e.target.value }) }
                />


                <h2>Length (in Hours)</h2>
                {/* Number field, set how long the showing is.*/}
                <label htmlFor="Length"></label>
                <input 
                    id="length" 
                    name="length" 
                    type="number" 
                    min = "0"
                    required={true}
                    value={ showingForm.length }
                    onChange={ (e) => dispatchShowingForm({ type: e.target.id, value: e.target.value }) }
                />
                

                <h2>Showing Agent ID (optional):</h2>
                {/*numeric field to enter showing agent ID number */}
                <label htmlFor="Showing Agent ID (optional)"></label>
                <input 
                    id="showingAgent" 
                    name="showingAgent" 
                    type="number" 
                    min = "0"
                    value={ showingForm.showingAgent }
                    onChange={ (e) => dispatchShowingForm({ type: e.target.id, value: e.target.value }) }
                />

                <h2>Buyer Name (optional):</h2>
                {/*character field to enter customer name */}
                <label htmlFor="Showing Agent ID (optional)"></label>
                <input 
                    id="buyer" 
                    name="buyer" 
                    type="text" 
                    value={ showingForm.buyer }
                    onChange={ (e) => dispatchShowingForm({ type: e.target.id, value: e.target.value }) }
                />

                <br/>
                <button>Submit</button>

            </form>
        </div>
};

/* ===== EXPORTS ===== */
export default NewShowingForm;
