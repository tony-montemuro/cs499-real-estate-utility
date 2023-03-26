import classes from "./Navbar.css";
import { Link } from "react-router-dom";
//import TitleStyle from "../pages/Forms/Components/Styles/TitleStyle";
//import ButtonStyle from "../pages/Forms/Components/Styles/ButtonStyle";


function REUNavbar(props){
	return (

		<header className="header">
		
			<div className={"title"}>REU PROPERTIES</div>

			

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
