import classes from './BottomHalf.module.css'

// This component helps build the detailed showing form's property infromation
function BottomHalf(props) {
    return < div className={classes.bottom} > {props.children}</div>
}

export default BottomHalf