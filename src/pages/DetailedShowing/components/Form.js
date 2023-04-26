import classes from './Form.module.css'

// This component helps build the feedback form
function Form(props) {
    return < div className = { classes.form } > { props.children }</div> 
}

export default Form