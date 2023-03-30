import { Link } from "react-router-dom";
import classes from "./SideBarMenu.module.css";
import BuildIcon from '@mui/icons-material/Build';

function SideBarMenu(props) {
    function handleECC() {
        props.ECC();
    }

    function handleSC() {
        props.SC(); 
    }

    function handleRR() {
        props.RR();
    }

    return ( 
        <div className={classes.options}>
            <div className={classes.row}>
                <div className={classes.left} />
                <div className={classes.bottom}>
                    <div>
                        <div className={classes.header}>Available Forms</div>
                    </div>
                    <li>
                        <Link onClick={handleECC}>Estimated Closing Cost</Link>
                    </li>

                    <li>
                        <Link onClick={handleSC}>Sales Contract</Link>
                    </li>

                    <li>
                        <Link onClick={handleRR}>Repairs Request</Link>
                    </li>
                </div>
            </div>
        </div>
 )
}

export default SideBarMenu; 
