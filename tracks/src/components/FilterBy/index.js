import React, { useEffect, useState } from "react";
import FilterByCity from "./FilterByCity";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import FilterByTypeOfCalculation from "./FilterByTypeOfCalculation";
import FilterByGoodsType from "./FilterByGoodsType";

import { makeUnique } from "../../utils";

export default function FilterBy({
    filterByCity,
    filterByCalculation,
    filterByGoodsType,
    info,
}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [availableStartCities, setAvailableStartCities] = useState([]);
    const [availableEndCities, setAvailableEndCities] = useState([]);
    const [availableCalc, setAvailableCalc] = useState([]);
    const [availableGoods, setAvailableGoods] = useState([]);
    const [startCity, setStartCity] = useState([]);
    const [typeOfCalc, setTypeOfCalc] = useState([]);
    const [typeOfGoods, setTypeOfGoods] = useState([]);
    const [endCity, setEndCity] = useState([]);
    const open = Boolean(anchorEl);

    useEffect(() => {
        let startCities = info.map((elem) => {
            return elem.start_city;
        });

        let endCities = info.map((elem) => {
            return elem.end_city;
        });
        let calc = info.map((elem) => {
            return elem.type_of_calculations;
        });
        let goods = info.map((elem) => {
            return elem.type_of_goods;
        });
        setAvailableStartCities(startCities);
        setAvailableEndCities(endCities);
        setAvailableCalc(calc);
        setAvailableGoods(goods);
    }, [info]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Filter by type of calc
    const handleCalc = (event) => {
        setTypeOfCalc(event.target.value);
    };

    let uniqAvailableCalc = makeUnique(availableCalc);

    //Filter by Goods
    const handleGoods = (event) => {
        setTypeOfGoods(event.target.value);
    };
    let uniqAvailableGoods = makeUnique(availableGoods);

    //Filter by Cities

    let uniqAvailableStartCities = makeUnique(availableStartCities);

    if (endCity) {
        uniqAvailableStartCities = uniqAvailableStartCities.filter((elem) => {
            return elem !== endCity;
        });
    }
    const handleStart = (event) => {
        setStartCity(event.target.value);
    };

    const handleEnd = (event) => {
        setEndCity(event.target.value);
    };

    let uniqAvailableEndCities = makeUnique(availableEndCities);
    if (startCity) {
        uniqAvailableEndCities = uniqAvailableEndCities.filter((elem) => {
            return elem !== startCity;
        });
    }
    const handleSubmitFilter = () => {
        if (startCity.length > 1 && endCity.length > 1) {
            filterByCity(startCity, endCity);
        }

        if (typeOfCalc.length > 1) filterByCalculation(typeOfCalc);
        if (typeOfGoods.length > 1) filterByGoodsType(typeOfGoods);

        setAnchorEl(null);
    };

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ width: "145px" }}
            >
                Filter
            </Button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <FilterByTypeOfCalculation
                    typeOfCalc={typeOfCalc}
                    uniqAvailableCalc={uniqAvailableCalc}
                    handleCalc={handleCalc}
                    handleSubmitFilter={handleSubmitFilter}
                />
                <FilterByGoodsType
                    typeOfGoods={typeOfGoods}
                    uniqAvailableGoods={uniqAvailableGoods}
                    handleGoods={handleGoods}
                    handleSubmitFilter={handleSubmitFilter}
                />
                <FilterByCity
                    startCity={startCity}
                    endCity={endCity}
                    uniqAvailableStartCities={uniqAvailableStartCities}
                    uniqAvailableEndCities={uniqAvailableEndCities}
                    handleStart={handleStart}
                    handleEnd={handleEnd}
                    handleSubmitFilter={handleSubmitFilter}
                />
            </Menu>
        </>
    );
}
