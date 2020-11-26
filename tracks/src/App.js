import "./App.css";
import { useEffect, useState } from "react";
import DisplayData from "./components/DisplayData";
import ToolsList from "./components/ToolsList";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { parseDefaultDate } from "./utils";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),

        [theme.breakpoints.up("md")]: {
            width: "100%",
            margin: "0 ",
        },
        [theme.breakpoints.up("lg")]: {
            width: "75%",
            margin: "0 auto",
        },
    },
}));

let [timeZone, last10Weeks] = parseDefaultDate();

var params = { last10Weeks, timeZone };
function App() {
    let [info, setInfo] = useState([]);
    let [apiInfo, setApiInfo] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        axios
            .get("/api", { params })
            .then(({ data }) => {
                setInfo(data);
                setApiInfo(data);
            })
            .catch((err) => {
                console.log("err :", err);
            });
    }, []);

    const filterByDate = ([start, timeZone], endDate) => {
        axios
            .get("/selected-date", { params: { start, endDate, timeZone } })
            .then(({ data }) => {
                setInfo(data);
                setApiInfo(data);
            })
            .catch((err) => {
                console.log("err :", err);
            });
    };

    const filterByCity = (startCity, endCity) => {
        let res = apiInfo.filter((details) => {
            return (
                details.start_city === startCity && details.end_city === endCity
            );
        });
        if (res.length > 0) {
            setInfo(res);
        } else {
            setInfo([{ id: 1, col3: "no Data found" }]);
        }
    };

    const filterByCalculation = (typeOfCalc) => {
        let res = apiInfo.filter((details) => {
            return details.type_of_calculations === typeOfCalc;
        });
        setInfo(res);
    };

    const filterByGoodsType = (typeOfGoods) => {
        let res = apiInfo.filter((details) => {
            return details.type_of_goods === typeOfGoods;
        });
        setInfo(res);
    };

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <p>Tracks</p>
                </div>
                <div></div>
            </header>
            <main className={classes.root}>
                <Box display="flex" p={1}>
                    <Box p={4} m={5}>
                        <ToolsList
                            info={info}
                            filterByDate={filterByDate}
                            filterByCalculation={filterByCalculation}
                            filterByCity={filterByCity}
                            filterByGoodsType={filterByGoodsType}
                        />
                    </Box>
                    <DisplayData info={info} />
                </Box>
            </main>
            <footer>
                <p>Copyright & copy; 2020 - All Rights Reserved</p>
            </footer>
        </div>
    );
}

export default App;
