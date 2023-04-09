import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import classes from "../DetailedShowing.module.css";

function BasicSelect(props) {

    return (
        <div className={classes.answer}>
            <FormControl sx={{ width: "75%", hight: "75%" }}>
                <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.currentAnswer}
                    label="Answer"
                    variant="filled"
                    onChange={props.onChange}
                >
                    <MenuItem value={props.answer1}>{props.answer1}</MenuItem>
                    <MenuItem value={props.answer2}>{props.answer2}</MenuItem>
                    <MenuItem value={props.answer3}>{props.answer3}</MenuItem>
                    <MenuItem value={props.answer4}>{props.answer4}</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default BasicSelect;

