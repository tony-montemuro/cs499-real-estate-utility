import classes from "./ButtonStyle.module.css";

function ButtonStyle(props) {
    return <div className={classes.button}>{props.children}</div>;
}

export default ButtonStyle;