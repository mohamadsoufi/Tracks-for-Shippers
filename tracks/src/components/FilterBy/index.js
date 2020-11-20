import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import Box from "@material-ui/core/Box";

export default function FilterBy({ filterByCity }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [availableCities, setAvailableCities] = useState([]);
    const [startCity, setStartCity] = useState([]);
    const [endCity, setEndCity] = useState([]);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSubmitFilter = (e) => {
        filterByCity(startCity, endCity);

        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        fetch("/api")
            .then((data) => data.json())
            .then((data) => {
                let res = data.map((elem) => {
                    return elem.start_city;
                });
                setAvailableCities(res);
            });
    }, []);
    let uniqAvailableCities = [...new Set(availableCities)];

    let citiesList = [];
    uniqAvailableCities.forEach((city) => {
        citiesList.push({ start_city: city });
    });

    const handleStart = (event) => {
        setStartCity(event.target.value);
    };

    const handleEnd = (event) => {
        setEndCity(event.target.value);
    };

    return (
        <div>
            <Button
                color="primary"
                variant="contained"
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                Filter By
            </Button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>Type of Calculation</MenuItem>
                <MenuItem onClick={handleClose}>Goods Type</MenuItem>
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
                                    {uniqAvailableCities.map((city) => (
                                        <MenuItem
                                            key={city + "1"}
                                            value={city + ""}
                                        >
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
                                    {uniqAvailableCities.map((city) => (
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
            </Menu>
        </div>
    );
}
