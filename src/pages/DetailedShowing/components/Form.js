import classes from './Form.module.css'

function Form(props) {
    return < div className = { classes.form } > { props.children }</div> 
}

export default Form