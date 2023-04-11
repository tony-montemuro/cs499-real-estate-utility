import "./DetailedListing.css";
import NewShowingFormLogic from "./NewShowingForm.js";
import "./NewShowingForm.css"


function NewShowingForm({toggleForm, listing_id}) {

    const { 
        showingForm, 
        dispatchShowingForm, 
        submitShowingForm
    } = NewShowingFormLogic();


    return (
        
    <div className="new-showing-form-box">

        <button onClick = {() => toggleForm(false)}>
          Close Form
        </button>

        <form onSubmit={(e) => submitShowingForm(e, listing_id)} className="new-showing-form">
            <h2>Starting Date</h2>
        
            <label htmlFor="Showing Date"></label>
            <input 
                id="date" 
                name="date" 
                type="date" 
                value={ showingForm.date }
                onChange={ (e) => dispatchShowingForm({ type: e.target.id, value: e.target.value }) }
            />

            <h2>Starting Time</h2>

            <label htmlFor="Starting Time"></label>
            <input 
                id="startTime" 
                name="startTime" 
                type="time" 
                value={ showingForm.startTime }
                onChange={ (e) => dispatchShowingForm({ type: e.target.id, value: e.target.value }) }
            />

            <h2>Length (in Hours)</h2>

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

            <label htmlFor="Showing Agent ID (optional)"></label>
            <input 
                id="showingAgent" 
                name="showingAgent" 
                type="number" 
                min = "0"
                value={ showingForm.showingAgent }
                onChange={ (e) => dispatchShowingForm({ type: e.target.id, value: e.target.value }) }
            />
            <br/>
            <button>Submit</button>

        </form>
    </div>
    );
};

export default NewShowingForm;
