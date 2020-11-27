import React, { useState } from "react";
import { Box, Button, Menu } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { parseDate } from "../../utils";

export default function SelectedByDate({ filterByDate }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [inputDateStart, setInputDateStart] = React.useState(new Date());
    const [inputDateEnd, setInputDateEnd] = React.useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = React.useState(
        parseDate(new Date())
    );
    const [selectedEndDate, setSelectedEndDate] = React.useState(
        parseDate(new Date())
    );

    const handleStartChange = (date) => {
        let timeZone = parseDate(date)[1];
        let start = parseDate(date)[0];
        setInputDateStart(date);
        setSelectedStartDate([start, timeZone]);
    };

    const handleEndChange = (date) => {
        setInputDateEnd(date);
        setSelectedEndDate(parseDate(date));
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmitFilter = () => {
        filterByDate(selectedStartDate, selectedEndDate);
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                aria-controls="fade-menu1"
                aria-haspopup="true"
                onClick={handleClick}
            >
                Select by Date
            </Button>
            <Menu
                id="fade-menu1"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Box display="flex" flexDirection="column" p={1}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline1"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline1"
                            label="Start Date"
                            value={inputDateStart}
                            onChange={handleStartChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                            style={{ width: "185px" }}
                        />
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline2"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline2"
                            label="End Date"
                            value={inputDateEnd}
                            onChange={handleEndChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                            style={{ width: "185px" }}
                        />
                    </Box>
                </MuiPickersUtilsProvider>

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
            </Menu>
        </>
    );
}
