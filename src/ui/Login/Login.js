/* ===== IMPORTS ===== */
import { useState } from "react";
import Auth from "../../database/Auth";

const Login = () => {
    /* ===== STATES ===== */
    const [message, setMessage] = useState(null);

    /* ===== FUNCTIONS ===== */

    // database functions
    const { logIn } = Auth();

    // FUNCTION 1 - loginUser: given a username and password, log the user in
    // PRECONDITIONS (3 parameters):
    // 1.) e: an event object generated by the log in button
    // 2.) username: a string that contains the username entered by the user
    // 3.) password: a string that contains the password entered by the user
    // POSTCONDITIONS (1 possible outcomes):
    // the user attempts a login, and the status of the login is updated by calling the setMessage() function
    const loginUser = async (e, username, password) => {
        // prevent page from reloading
        e.preventDefault();

        // attempt to log user in; update message state when complete
        const status = await logIn(username, password);
        setMessage(status);
    };

    // FUNCTION 2 - closePopup: given a trigger function, close the popup
    // PRECONDITIONS (1 parameter):
    // 1.) setTrigger: a function that will update the state that determines whether or not to render the popup
    // POSTCONDITIONS (1 possible outcome):
    // the popup is closed, and the message state is reset (set to null)
    const closePopup = (setTrigger) => {
        setMessage(null);
        setTrigger(false);
    };

    return { message, loginUser, closePopup };
};

/* ===== EXPORTS ===== */
export default Login;