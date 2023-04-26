import classes from "./DetailedShowing.module.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import BottomHalf from "./components/BottomHalf";
import BasicSelect from "./components/BasicSelect";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import DetailedShowingLogic from "./DetailedShowing.js";
import { AgentContext } from "../../Contexts";
import { useContext } from "react";

function DetailedShowing() {

    /*==VARIABLES==*/
    const pageID = useLocation().pathname.split("/")[2];
    const { agent } = useContext(AgentContext);

    /*==Functions and states from the DetailedShowing.js file==*/
    const { saveFeedbackForm, fullShowing, additionalNotesRef, question1, question2,
        question3, question4, getCurrShowing, question1Handler, question2Handler,
        question3Handler, question4Handler, textHandler, textField } = DetailedShowingLogic();

    // Use Effect, when page is loaded, get the current showing details
    useEffect(() => {
        if (!fullShowing) {
            getCurrShowing(pageID);
        }
        // eslint-disable-next-line
    }, [fullShowing]);

    // DetailedShowing component
    return (
        <> {/*Only render the data if agent is authenticated and the fullShowing has been grabbed*/}
            {agent ?
                <>
                    {!fullShowing ?

                        <p>Loading...</p> 
                        :

                        <div className={classes.content}>

                            <div className={classes.header}>
                                <h1>Showing Details</h1>

                                {/* The showing form has questions for the agent to fill in. Each field has a BasicSelect
                                combo box with 3 options that can be set for the question.
                                Question1 - Customer Interest
                                Question2 - Agent Experience
                                Question3 - Customer Price Rating
                                Question4 - Agent Price Rating
                                */}
                                <form onSubmit={(e) => (saveFeedbackForm(e, pageID))}>
                                    <div className={classes.docheader}>Feedback Form</div>
                                    <div className={classes.block}>
                                        <div className={classes.question}>
                                            1.) Is the customer interested in the property?
                                        </div>
                                        <BasicSelect
                                            onChange={question1Handler}
                                            answer1="Extremely Interested"
                                            answer2="Somewhat Interested"
                                            answer3="Not Interested"
                                            currentAnswer={question1.words}
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
                                            currentAnswer={question2.words}
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
                                            currentAnswer={question3.words}
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
                                            currentAnswer={question4.words}
                                        />
                                    </div>

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
                                                onChange={textHandler}
                                                value={textField}
                                            />
                                        </div>
                                    </div>

                                    <div className={classes.block}>
                                        <div className={classes.question} />
                                        <div className={classes.answer}>
                                            <Button
                                                sx={{ width: "50%" }}
                                                variant="contained"
                                                type="submit"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </div>

                                </form>

                                {/* The Bottom half contains data on the showing property, including the customer for who the showing
                                is for, if such a customer exists */}
                                <BottomHalf>
                                    <div className={classes.infoblock}>
                                        <div className={classes.prompt}>Showing Agent:</div>
                                        <div className={classes.info}>

                                            {fullShowing.agent ?
                                                fullShowing.agent.name + " | " + fullShowing.agent.phone_number + " | " + fullShowing.agent.email
                                                :
                                                "No showing agent"
                                            }

                                        </div>
                                    </div>
                                    {fullShowing !== undefined ?
                                        <>
                                            <div className={classes.infoblock}>
                                                <div className={classes.prompt}>Occupation Status:</div>
                                                <div className={classes.info}>{fullShowing.listing.property.occupied ? "Occupied" : "Not Occupied"}</div>
                                            </div>

                                            <div className={classes.infoblock}>
                                                <div className={classes.prompt}>Lockbox Code:</div>
                                                <div className={classes.info}>{fullShowing.listing.property.lock_box}</div>
                                            </div>

                                            <div className={classes.infoblock}>
                                                <div className={classes.prompt}>Buyer:</div>
                                                <div className={classes.info}>{fullShowing.buyer ? fullShowing.buyer : "None"}</div>
                                            </div>
                                        </>
                                        :
                                        <p>loading...</p>
                                    }
                                </BottomHalf>
                            </div>
                        </div>
                    }
                </> :
                <p>Invalid Credentials</p>
            }
        </>
    );
}

/* ===== EXPORTS ===== */
export default DetailedShowing;