/* ===== IMPORTS ===== */
import { supabase } from "./database/SupabaseClient";
import { useState } from "react";
import Read from "./database/Read";

const AppUtils = () => {
    /* ===== STATES ===== */
    const [agent, setAgent] = useState(undefined);

    /* ===== FUNCTIONS ===== */

    // database functions
    const { fetchAgentById } = Read();

    // FUNCTION 1 - updateAgent - given a session object, update the global agent state
    // PRECONDITIONS (1 condition):
    // this function is ran each time the session object is updated
    // POSTCONDITIONS (2 possible outcomes):
    // if the session object is an object, this implies that an agent is currently signed in. use the user.id
    // field to determine the associated agent, and update the agent state by calling the setAgent() function
    // if session is null, this means no agent is signed in. thus, call the setAgent() with a null argument
    const updateAgent = async (session) => {
        // two different cases: a null session, or a session belonging to a user
        if (session) {
            // make an api calls to database to load the agent data
            const user = session.user;
            const agent = await fetchAgentById(user.id);
    
            // update the agent state
            setAgent(agent);
            
        } else {
            // if we have a null session, there is no current agent. simply set the state to default value
            setAgent(null);
        }
    };

    // FUNCTION 2 - getCurrentAgent - function that is called upon application load
    // PRECONDITIONS: NONE
    // POSTCONDITIONS (1 possible outcome):
    // this function is essentially called to set up a listener function. the listener function will call the
    // asynchronous updateAgent() function each time the application detects a change in the session, with the exception
    // of one particular edge case, which is described in the listener function
    const getCurrentAgent = async () => {
        // define a variable used to keep track of the session object
        let session = undefined;

        // listener for changes to the session
        supabase.auth.onAuthStateChange((event, newSession) => {
            // special case: listener detects a SIGNED_IN event, but the session's user is the same (tab swapping typically)
            // in this case, we do not need to update the agent, so just return early
            if (event === "SIGNED_IN" && session && newSession && newSession.user.id === session.user.id) {
                return;
            }

            // update agent, and session variable
            updateAgent(newSession);
            session = newSession;
        });
    };

    return { agent, getCurrentAgent };
};

/* ===== EXPORTS ===== */
export default AppUtils;