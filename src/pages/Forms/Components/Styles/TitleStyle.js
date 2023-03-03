import classes from "./TitleStyle.module.css"; 


function TitleStyle(props) {
    return <div className={classes.title}>{props.children}</div>;
}

export default TitleStyle;