import classes from "./DetailedShowing.module.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Form from "./components/Form"
import { useState } from "react";
import { useRef } from "react";
import BottomHalf from "./components/BottomHalf";
import PageBase from "../../ui/PageBase/PageBase";
import BasicSelect from "./components/BasicSelect";

function DetailedShowing() {

    const additionalNotesRef = useRef();
    const [question1, setQuestion1] = useState("");
    const [question2, setQuestion2] = useState("");
    const [question3, setQuestion3] = useState("");
    const [question4, setQuestion4] = useState("");

    function question1Handler(event) {
        setQuestion1(event.target.value);
    }

    function question2Handler(event) {
        setQuestion2(event.target.value);
    }

    function question3Handler(event) {
        setQuestion3(event.target.value);
    }

    function question4Handler(event) {
        setQuestion4(event.target.value);
    }

    function submitHandler() {
        console.log(question1)
        console.log(question2)
        console.log(question3)
        console.log(question4)
    }

    return (

        <div className={classes.content}>

            <div className={classes.header}>
                <h1>Documents</h1>

                <Form>
                    <div className={classes.docheader}>Feedback Form</div>
                    <div className={classes.block}>
                        <div className={classes.question}>
                            1.) Is the customer interested in the property?
                        </div>
                        <BasicSelect
                            onChange={question1Handler}
                            answer1="Exetremely Interested"
                            answer2="Somewhat Interested"
                            answer3="Not Interested"
                            currentAnswer={question1}
                        />
                    </div>

                    <div className={classes.block}>
                        <div className={classes.question}>
                            2.) Please rate your overall experience at this showing:
                        </div>
                        <BasicSelect
                            onChange={question2Handler}
                            answer1="Great!"
                            answer2="Okay..."
                            answer3="Terrible."
                            currentAnswer={question2}
                        />
                    </div>

                    <div className={classes.block}>
                        <div className={classes.question}>
                            3.) Your opinion of the price:
                        </div>
                        <BasicSelect
                            onChange={question3Handler}
                            answer1="Too Expensive"
                            answer2="Just Right"
                            answer3="Somewhat Cheap"
                            currentAnswer={question3}
                        />
                    </div>

                    <div className={classes.block}>
                        <div className={classes.question}>
                            4.) The customers opinion of the price:
                        </div>
                        <BasicSelect
                            onChange={question4Handler}
                            answer1="Too Expensive"
                            answer2="Just Right"
                            answer3="Somewhat Cheap"
                            currentAnswer={question4}
                        />
                    </div>

                    <form>
                        <div className={classes.textblock}>
                            <div className={classes.additional}>5.) Additional Notes:</div>
                            <div className={classes.notes}>
                                <TextField
                                    sx={{ width: "79%", height: "maxRows" }}
                                    id="outlined-multiline-static"
                                    label=""
                                    multiline
                                    rows={5}
                                    variant="filled"
                                    ref={additionalNotesRef}
                                />
                            </div>
                        </div>
                        <div className={classes.block}>
                            <div className={classes.question} />
                            <div className={classes.answer}>
                                <Button
                                    sx={{ width: "50%" }}
                                    variant="contained"
                                    onClick={submitHandler}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>

                <BottomHalf>
                    <div className={classes.infoblock}>
                        <div className={classes.prompt}>Showing Agent:</div>
                        <div className={classes.info}>
                            John Doe | 111-111-1111 | john@doe.com
                        </div>
                    </div>

                    <div className={classes.infoblock}>
                        <div className={classes.prompt}>Occupation Status:</div>
                        <div className={classes.info}>Not Occupied</div>
                    </div>

                    <div className={classes.infoblock}>
                        <div className={classes.prompt}>Lockbox Code:</div>
                        <div className={classes.info}>1234</div>
                    </div>

                    <div className={classes.infoblock}>
                        <div className={classes.prompt}>Buyer:</div>
                        <div className={classes.info}>John Doe</div>
                    </div>
                </BottomHalf>
            </div>
        </div>
    );
}
export default DetailedShowing;
