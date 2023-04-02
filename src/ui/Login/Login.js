import "./Login.css"

function PopUp(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <form>
  					<label>
    					Username: &nbsp;
    				<input type="text" name="name" />
  					</label>
  					<br></br>
                    <label>
    					Password: &nbsp;&nbsp;  
    				<input type="text" name="name" />
  					</label>
  					<br></br>
                    <button>Log In</button>
  					<br></br>
				</form>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
            </div>
        </div>
    ) : "";
}

export default PopUp