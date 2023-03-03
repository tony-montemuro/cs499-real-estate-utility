import classes from "./NavigationMenu.module.css";
import { Link } from "react-router-dom";
import TitleStyle from "../pages/Forms/Components/Styles/TitleStyle";
import ButtonStyle from "../pages/Forms/Components/Styles/ButtonStyle";


function NavigationMenu(props){
	return (

		<header className={classes.header}>
		
			<div className={classes.logo}>SAMPLE MAIN NAVIGATION BAR</div>

			<nav>
				<ul>
					
						<li>
							<Link to="/">Home</Link>				
						</li>
					

					<li>

							<Link to="/">Home</Link>
						
					</li>

					<li>
					
							<Link to="/">Home</Link>
						
					</li>

					<li>
						
							<Link to="/">Home</Link>
					
					</li>

					<li>
						
							<Link to="/">Home</Link>
						
					</li>

					<li>
						
							<Link to="/">Home</Link>
						
					</li>

					<li>
						
							<Link to="/">Home</Link>
						
					</li>

					<li>
						
							<Link to="/">Home</Link>
						
					</li>

				</ul>
			</nav>

		</header>
	);
}

export default NavigationMenu; 