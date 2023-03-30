import classes from './BottomHalf.module.css'

function BottomHalf(props) {
    return < div className={classes.bottom} > {props.children}</div>
}

export default BottomHalf