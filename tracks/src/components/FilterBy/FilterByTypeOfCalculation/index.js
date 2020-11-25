import React from "react";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";

export default function FilterByTypeOfCalculation({
    typeOfCalc,
    handleCalc,
    handleSubmitFilter,
    uniqAvailableCalc,
}) {
    return (
        <MenuItem>
            <Box>
                <Box p={1}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label2">
                            Type of Calculation
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select2"
                            value={typeOfCalc + ""}
                            onChange={handleCalc}
                            style={{ width: "155px" }}
                        >
                            {uniqAvailableCalc.map((calc) => (
                                <MenuItem key={calc + "1"} value={calc + ""}>
                                    {calc}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box mx={1}>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={handleSubmitFilter}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </MenuItem>
    );
}
