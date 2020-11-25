import React from "react";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";

export default function FilterByCity({
    startCity,
    handleStart,
    handleEnd,
    endCity,
    handleSubmitFilter,
    uniqAvailableStartCities,
    uniqAvailableEndCities,
}) {
    return (
        <MenuItem>
            <Box>
                <Box p={1}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label1">
                            Start city
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={startCity + ""}
                            onChange={handleStart}
                            style={{ width: "90px" }}
                        >
                            {uniqAvailableStartCities.map((city) => (
                                <MenuItem key={city + "1"} value={city + ""}>
                                    {city}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box p={1}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">
                            End city
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={endCity + ""}
                            onChange={handleEnd}
                            style={{ width: "90px" }}
                        >
                            {uniqAvailableEndCities.map((city) => (
                                <MenuItem key={city} value={city + ""}>
                                    {city}
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
