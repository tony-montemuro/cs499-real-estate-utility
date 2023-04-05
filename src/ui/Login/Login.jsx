/* ===== IMPORTS ===== */
import "./Login.css";
import LoginLogic from "./Login.js";
import { useState } from "react";

function PopUp(props) {
  /* ===== STATES & FUNCTIONS ===== */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // states and functions from the js file
  const { message, loginUser, closePopup } = LoginLogic();

  /* ===== LOGIN POPUP COMPONENT ===== */
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">

        { /* Button to close the popup */ }
        <button className="close-btn" onClick={ () => closePopup(props.setTrigger) }>Close</button>

        { /* Login form */ }
        <form>
          <label>Username: &nbsp;</label>
          <input type="text" name="username" autoComplete="username" onChange={(e) => setUsername(e.target.value)}/>
          <br></br>
          <label>Password: &nbsp;&nbsp;</label>
          <input type="password" name="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)}/>
          <br></br>
          { message && <p>{ message }</p>}
          <button onClick={(e) => loginUser(e, username, password)}>Log in</button>
          <br></br>
        </form>

      </div>
    </div>
  ) : "";
};

/* ===== EXPORTS ===== */
export default PopUp;