import classes from "./Navbar.css";
import { Link } from "react-router-dom";
import logo from './assets/Logo_withText.png'; // Tell webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

//import TitleStyle from "../pages/Forms/Components/Styles/TitleStyle";
//import ButtonStyle from "../pages/Forms/Components/Styles/ButtonStyle";


function REUNavbar(props){
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
					Welcome, Guest! <button><Link to="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Log In</Link></button>
				</div>
			</nav>

		</header>
	);
}

export default REUNavbar; 
