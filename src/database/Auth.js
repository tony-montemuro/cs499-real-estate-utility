/* ===== IMPORTS ===== */
import { supabase } from "./SupabaseClient";

const Auth = () => {
    /* ===== FUNCTIONS ===== */

    // FUNCTION 1: getSession - function that fetches the current session from supabase
    // PRECONDITIONS: NONE
    // POSTCONDITIONS (2 possible outcomes):
    // if the query is successful, the session object from the database is returned (if there is one. null
    // is returned if no current session exists)
    // otherwise, the user is alerted of the error, and null is returned
    const getSession = async () => {
        try {
            const { data: { session } , error } = await supabase.auth.getSession();

            // error handling
            if (error) {
                throw error;
            }

            // if successful, simply return session object
            return session;

        } catch (error) {
            console.log(error);
            alert(error.message);
            return null;
        }
    };

    // FUNCTION 2: logIn - given an email and password, attempt to log the user in
    // PRECONDITIONS (2 parameters):
    // 1.) email: a string that contains an email
    // 2.) password: a string that contains a password
    // POSTCONDITIONS (2 possible outcomes):
    // if log in is successful, the session will automatically be updated by the listener function defined in AppUtils.js
    // if log in is unsuccessful, or the query fails, the user is alerted of the error
    const logIn = async (email, password) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            // error handling
            if (error) {
                throw error;
            }

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    // FUNCTION 3: signOut - when this function is called, log the user out
    // PRECONDITIONS (1 condition):
    // the user should be logged in before calling this function
    // POSTCONDITIONS (2 possible outcomes):
    // if the query is successful, the session will automatically be updated by the listener function defined in AppUtils.js
    // if the query is unsuccessful, the user is alerted of the error
    const logOut = async() => {
        try {
            const { error } = await supabase.auth.signOut();

            // error handling
            if (error) {
                throw error;
            }

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    return { getSession, logIn, logOut };
};

/* ===== EXPORTS ===== */
export default Auth;