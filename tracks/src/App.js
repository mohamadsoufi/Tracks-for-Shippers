import "./App.css";
import { useEffect, useState } from "react";
import DisplayData from "./components/DisplayData";
import ToolsList from "./components/ToolsList";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
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
// timeZone
var split = new Date().toString().split(" ");
var gtm = split[5];
let timeZone = gtm.slice(3, 7);

var today = new Date();
var dayLastMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 28
);

let lastMonth =
    dayLastMonth.getFullYear() +
    "-" +
    (dayLastMonth.getMonth() + 1) +
    "-" +
    dayLastMonth.getDate();
var params = { lastMonth, timeZone };
function App() {
    let [info, setInfo] = useState([]);
    // let [apiInfo, setApiInfo] = useState([]);
    let [check, setCheck] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        axios.get("/api", { params }).then(({ data }) => {
            // setApiInfo(data);
            setInfo(data);
        });
    }, []);

    const filterByCity = (startCity, endCity) => {
        let res;
        if (!check) {
            console.log("no fetch :");
            res = info.filter((details) => {
                return (
                    details.start_city === startCity &&
                    details.end_city === endCity
                );
            });
            setInfo(res);
            setCheck(true);
        } else {
            axios.get("/api", { params }).then(({ data }) => {
                console.log("data in filter:", data);
                res = data.filter((details) => {
                    return (
                        details.start_city === startCity &&
                        details.end_city === endCity
                    );
                });
                setInfo(res);
                setCheck(false);
            });
        }
    };

    const filterByCalculation = (typeOfCalc) => {
        axios.get("/api", { params }).then(({ data }) => {
            let res = data.filter((details) => {
                return details.type_of_calculations === typeOfCalc;
            });
            setInfo(res);
        });
    };

    const filterByGoodsType = (typeOfGoods) => {
        axios.get("/api", { params }).then(({ data }) => {
            let res = data.filter((details) => {
                return details.type_of_goods === typeOfGoods;
            });
            setInfo(res);
        });
    };

    return (
        <div className="App">
            <header className="App-header">header</header>
            <main className={classes.root}>
                <Box display="flex" p={1}>
                    <Box p={4} m={5}>
                        <ToolsList
                            info={info}
                            filterByCalculation={filterByCalculation}
                            filterByCity={filterByCity}
                            filterByGoodsType={filterByGoodsType}
                        />
                    </Box>
                    <DisplayData info={info} />
                </Box>
            </main>
        </div>
    );
}

export default App;
