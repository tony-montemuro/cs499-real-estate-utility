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

    const pageID = useLocation().pathname.split("/")[2];
    const { agent } = useContext(AgentContext);

    const { saveFeedbackForm, fullShowing, additionalNotesRef, question1, question2,
        question3, question4, getCurrShowing, question1Handler, question2Handler,
        question3Handler, question4Handler, textHandler, textField } = DetailedShowingLogic();

    useEffect(() => {
        if (!fullShowing) {
            getCurrShowing(pageID);
        }

    }, [fullShowing]);

    return (
        <>
            {agent ?
                <>
                    {!fullShowing ?

                        <p>Loading...</p>
                        :

                        <div className={classes.content}>

                            <div className={classes.header}>
                                <h1>Documents</h1>

                                <form onSubmit={(e) => (saveFeedbackForm(e, pageID))}>
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
                                    {fullShowing != undefined ?
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
export default DetailedShowing;