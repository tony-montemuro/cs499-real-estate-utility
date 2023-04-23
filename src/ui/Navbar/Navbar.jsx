import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import PopUp from "../Login/Login.jsx";
import logo from '../../assets/Logo_withText.png'; // Tell webpack this JS file uses this image
import { AgentContext } from "../../Contexts";
import Auth from "../../database/Auth.js"

console.log(logo); // /logo.84287d09.png

function REUNavbar(props){
	
	const [loginbutton, setButtonLogin ] = useState(false);
    const {agent} = useContext(AgentContext);

    const { logOut } = Auth();

	return (

		<header className="header">
			{ /* Logo */ }
			<img src={logo} alt="logo" />

			<nav className="nav">
			{ /* Links to pages */ }
				<ul className="header ul"> 
					<li>
							<Link to="/">Home</Link>				
					</li>
					<li>
							<Link to="/forms">Forms</Link>
					</li>
					<li>
							<Link to="/listings">Listings</Link>
					</li>
					{ /* Showings page only displays if the agent is logged in. */ }
					{ agent ? 
					<li>
							<Link to="/showings">Showings</Link>
					</li> 
					 : 
					 <></> }
				</ul>
				{ /* Login component. Displays differently whether the user is logged in or not. */ }
				{ agent ? 
					<div className="login">
						Welcome, {agent.name}! <button onClick={() => logOut()}>Log Out</button>
					</div> :
					<div className="login">
						Welcome, Guest! <button onClick={() => setButtonLogin(true)}>Log In</button>
					</div> 
				}
			</nav>
			<PopUp trigger={loginbutton} setTrigger={setButtonLogin}></PopUp>
		</header>
	);
}

export default REUNavbar; 
