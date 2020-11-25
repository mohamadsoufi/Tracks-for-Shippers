import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Menu } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import parseDate from "../../utils/parseDate";

export default function SelectedByDate({ filterByDate }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [inputDateStart, setInputDateStart] = React.useState(new Date());
    const [inputDateEnd, setInputDateEnd] = React.useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = React.useState(
        new Date()
    );
    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());

    const handleStartChange = (date) => {
        let timeZone = parseDate(date)[0];
        let start = parseDate(date)[1];
        setInputDateStart(date);
        setSelectedStartDate({ start, timeZone });
    };

    const handleEndChange = (date) => {
        setInputDateEnd(date);
        setSelectedEndDate(parseDate(date)[1]);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmitFilter = () => {
        // if (startCity.length > 1 && endCity.length > 1)
        //     filterByCity(startCity, endCity);

        // if (typeOfCalc.length > 1) filterByCalculation(typeOfCalc);
        // if (typeOfGoods.length > 1) filterByGoodsType(typeOfGoods);
        filterByDate(selectedStartDate, selectedEndDate);
        setAnchorEl(null);
    };
    // console.log("selectedStartDate :", selectedStartDate);
    // console.log("selectedEndDate :", selectedEndDate);
    return (
        <>
            <Button
                color="primary"
                variant="contained"
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                Select by Date
            </Button>
            <Menu
                id="fade-menu"
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
