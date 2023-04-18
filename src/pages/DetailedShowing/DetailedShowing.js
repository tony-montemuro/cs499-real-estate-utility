import { useState } from "react";
import { useRef } from "react";
import Read from "/app/src/database/Read.js";
import Update from "/app/src/database/Update.js"

const DetailedShowing = () => {


    const { fetchFullShowing } = Read();
    const { UpdateShowingSurvey } = Update();

    const [fullShowing, setFullShowing] = useState(undefined);

    const additionalNotesRef = useRef("");
    const [question1, setQuestion1] = useState({ words: "", number: 0 });
    const [question2, setQuestion2] = useState({ words: "", number: 0 });
    const [question3, setQuestion3] = useState({ words: "", number: 0 });
    const [question4, setQuestion4] = useState({ words: "", number: 0 });
    const [textField, setTextField] = useState("");

    const saveFeedbackForm = async (e, pageID) => {
        // prevent page from reloading (default form submission behavior)
        e.preventDefault();

        // log filterForm object to console


        UpdateShowingSurvey(pageID, question1.number, question2.number, question3.number, question4.number, textField)

    };

    const getCurrShowing = async (id) => {
        // fetch current listing from the database, and update the listings state
        const currentShowing = await fetchFullShowing(id);
        setFullShowing(currentShowing.showing);

        switch (currentShowing.showing.customer_interest) {
            case 2: setQuestion1({ words: "Exetremely Interested", number: 2 }); break;
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
        setTextField(currentShowing.showing.notes);

    };

    function textHandler(event) {
        setTextField(event.target.value);
    }

    function question1Handler(event) {
        if (event.target.value === "Exetremely Interested") {
            setQuestion1({ words: event.target.value, number: 2 });
        }
        else if (event.target.value === "Somewhat Interested") {
            setQuestion1({ words: event.target.value, number: 1 });
        }
        else {
            setQuestion1({ words: event.target.value, number: 0 });
        }
    }

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

export default DetailedShowing;