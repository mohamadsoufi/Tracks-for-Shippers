import React, { useEffect, useState } from "react";
import FilterByCity from "./FilterByCity";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import FilterByTypeOfCalculation from "./FilterByTypeOfCalculation";
import FilterByGoodsType from "./FilterByGoodsType";
import Axios from "axios";

export default function FilterBy({
    filterByCity,
    filterByCalculation,
    filterByGoodsType,
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
        Axios.get("/all-data").then(({ data }) => {
            let startCities = data.map((elem) => {
                return elem.start_city;
            });

            let endCities = data.map((elem) => {
                return elem.end_city;
            });
            let calc = data.map((elem) => {
                return elem.type_of_calculations;
            });
            let goods = data.map((elem) => {
                return elem.type_of_goods;
            });
            setAvailableStartCities(startCities);
            setAvailableEndCities(endCities);
            setAvailableCalc(calc);
            setAvailableGoods(goods);
        });
    }, []);
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

    let uniqAvailableCalc = [...new Set(availableCalc)];
    let calcList = [];
    uniqAvailableCalc.forEach((calc) => {
        calcList.push({ type_of_calculation: calc });
    });
    //Filter by type of Goods
    const handleGoods = (event) => {
        setTypeOfGoods(event.target.value);
    };

    let uniqAvailableGoods = [...new Set(availableGoods)];
    let goodsList = [];
    uniqAvailableGoods.forEach((goods) => {
        goodsList.push({ type_of_goods: goods });
    });

    //Filter by Start City
    let uniqAvailableStartCities = [...new Set(availableStartCities)];
    let startCitiesList = [];
    uniqAvailableStartCities.forEach((city) => {
        startCitiesList.push({ start_city: city });
    });

    //Filter by end City
    let uniqAvailableEndCities = [...new Set(availableEndCities)];
    let endCitiesList = [];
    uniqAvailableEndCities.forEach((city) => {
        endCitiesList.push({ end_city: city });
    });

    const handleStart = (event) => {
        setStartCity(event.target.value);
    };

    const handleEnd = (event) => {
        setEndCity(event.target.value);
    };

    const handleSubmitFilter = () => {
        if (startCity.length > 1 && endCity.length > 1)
            filterByCity(startCity, endCity);

        if (typeOfCalc.length > 1) filterByCalculation(typeOfCalc);
        if (typeOfGoods.length > 1) filterByGoodsType(typeOfGoods);

        setAnchorEl(null);
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
                <hr />
                <FilterByGoodsType
                    typeOfGoods={typeOfGoods}
                    uniqAvailableGoods={uniqAvailableGoods}
                    handleGoods={handleGoods}
                    handleSubmitFilter={handleSubmitFilter}
                />
                <hr />
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
        </div>
    );
}
