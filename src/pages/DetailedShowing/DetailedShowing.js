import { useState } from "react";
import { useRef } from "react";
import Read from "../../database/Read.js";
import Update from "../../database/Update.js"

const DetailedShowing = () => {

    /* ===== STATES & REDUCERS ===== */
    const { fetchFullShowing } = Read();
    const { updateShowingSurvey } = Update();

    const [fullShowing, setFullShowing] = useState(undefined);

    const additionalNotesRef = useRef("");
    const [question1, setQuestion1] = useState({ words: "", number: 0 });
    const [question2, setQuestion2] = useState({ words: "", number: 0 });
    const [question3, setQuestion3] = useState({ words: "", number: 0 });
    const [question4, setQuestion4] = useState({ words: "", number: 0 });
    const [textField, setTextField] = useState("");

    // Function 1, saveFeedbackForm,
    // updates the showing survey of the passed in pageID to match the state of the questions 1-4 and text field
    const saveFeedbackForm = async (e, pageID) => {
        // prevent page from reloading (default form submission behavior)
        e.preventDefault();

        // update the survey on the database
        try{
            updateShowingSurvey(pageID, question1.number, question2.number, question3.number, question4.number, textField);
            alert("Updated Feedback Form")
        }
        catch(error){
            alert(error.message);
        }
    };

    // Function 2, getCurrShowing
    // Gets the fields from the specified showing id field in the database
    // Updates the strings for each question combobox to match the associated integer grabbed from the database
    const getCurrShowing = async (id) => {
        // fetch current listing from the database, and update the listings state
        const currentShowing = await fetchFullShowing(id);
        setFullShowing(currentShowing.showing);

        switch (currentShowing.showing.customer_interest) {
            case 2: setQuestion1({ words: "Extremely Interested", number: 2 }); break;
            case 1: setQuestion1({ words: "Somewhat Interested", number: 1 }); break;
            default: setQuestion1({ words: "Not Interested", number: 0 });
        }
        switch (currentShowing.showing.agent_experience) {
            case 2: setQuestion2({ words: "Great!", number: 2 }); break;
            case 1: setQuestion2({ words: "Okay...", number: 1 }); break;
            default: setQuestion2({ words: "Terrible.", number: 0 });
        }
        switch (currentShowing.showing.customer_price_rating) {
            case 2: setQuestion3({ words: "Too Expensive", number: 2 }); break;
            case 1: setQuestion3({ words: "Just Right", number: 1 }); break;
            default: setQuestion3({ words: "Somewhat Cheap", number: 0 });
        }
        switch (currentShowing.showing.agent_price_rating) {
            case 2: setQuestion4({ words: "Too Expensive", number: 2 }); break;
            case 1: setQuestion4({ words: "Just Right", number: 1 }); break;
            default: setQuestion4({ words: "Somewhat Cheap", number: 0 });
        }
        currentShowing.showing.notes === null ? setTextField("") : setTextField(currentShowing.showing.notes);

    };

    // Function 3, textHandler
    // sets the textHandler text state to match the input value
    function textHandler(event) {
        setTextField(event.target.value);
    }

    // Function 4, question1Handler
    // sets the question state to the specified integer and string value when the user selects a string value
    function question1Handler(event) {
        if (event.target.value === "Extremely Interested") {
            setQuestion1({ words: event.target.value, number: 2 });
        }
        else if (event.target.value === "Somewhat Interested") {
            setQuestion1({ words: event.target.value, number: 1 });
        }
        else {
            setQuestion1({ words: event.target.value, number: 0 });
        }
    }

    // Function 5, question2Handler
    // sets the question state to the specified integer and string value when the user selects a string value
    function question2Handler(event) {
        if (event.target.value === "Great!") {
            setQuestion2({ words: event.target.value, number: 2 });
        }
        else if (event.target.value === "Okay...") {
            setQuestion2({ words: event.target.value, number: 1 });
        }
        else {
            setQuestion2({ words: event.target.value, number: 0 });
        }
    }

    // Function 6, question3Handler
    // sets the question state to the specified integer and string value when the user selects a string value
    function question3Handler(event) {
        if (event.target.value === "Too Expensive") {
            setQuestion3({ words: event.target.value, number: 2 });
        }
        else if (event.target.value === "Just Right") {
            setQuestion3({ words: event.target.value, number: 1 });
        }
        else {
            setQuestion3({ words: event.target.value, number: 0 });
        }
    }

    // Function 7, question4Handler
    // sets the question state to the specified integer and string value when the user selects a string value
    function question4Handler(event) {
        if (event.target.value === "Too Expensive") {
            setQuestion4({ words: event.target.value, number: 2 });
        }
        else if (event.target.value === "Just Right") {
            setQuestion4({ words: event.target.value, number: 1 });
        }
        else {
            setQuestion4({ words: event.target.value, number: 0 });
        }
    }


    return {
        saveFeedbackForm, fullShowing, setFullShowing, additionalNotesRef, question1, setQuestion1, question2, setQuestion2,
        question3, setQuestion3, question4, setQuestion4, getCurrShowing, question1Handler, question2Handler,
        question3Handler, question4Handler, textHandler, textField
    };

}

/* ===== EXPORTS ===== */
export default DetailedShowing;