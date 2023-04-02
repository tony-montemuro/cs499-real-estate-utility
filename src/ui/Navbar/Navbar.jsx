import classes from "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import PopUp from "../Login/Login.js";
import logo from '../../assets/Logo_withText.png'; // Tell webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

//import TitleStyle from "../pages/Forms/Components/Styles/TitleStyle";
//import ButtonStyle from "../pages/Forms/Components/Styles/ButtonStyle";


function REUNavbar(props){
	const [loginbutton, setButtonLogin ] = useState(false);

	return (

		<header className="header">
			<img src={logo} alt="logo" />

			<nav className="nav">
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
					<li>
							<Link to="/showings">Showings</Link>
					</li>
				</ul>
				<div className="login">
					Welcome, Guest! <button onClick={() => setButtonLogin(true)}>Log In</button>
				</div>
			</nav>
			<PopUp trigger={loginbutton} setTrigger={setButtonLogin}></PopUp>
		</header>
	);
}

export default REUNavbar; 
