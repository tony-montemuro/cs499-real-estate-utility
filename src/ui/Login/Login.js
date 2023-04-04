import "./Login.css";
import { AgentContext } from "../../Contexts";
import Auth from "../../database/Auth.js";
import { useContext } from "react";
import { useState } from "react";

function PopUp(props) {
    const {agent} = useContext(AgentContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { logIn } = Auth();

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <form>
  					<label>
    					Username: &nbsp;
    				<input type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
  					</label>
  					<br></br>
                    <label>
    					Password: &nbsp;&nbsp;  
    				<input type="text" name="password" onChange={(e) => setPassword(e.target.value)}/>
  					</label>
  					<br></br>
                    <button onClick={() => logIn(username,password)}> Log in </button>
  					<br></br>
				</form>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
            </div>
        </div>
    ) : "";
}

export default PopUp