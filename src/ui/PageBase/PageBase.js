import classes from './PageBase.module.css'

function PageBase(props) {
    return <div className={classes.base}>{props.children}</div>
}

export default PageBase