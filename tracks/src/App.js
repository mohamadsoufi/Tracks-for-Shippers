import "./App.css";
import { useEffect, useState } from "react";
import DisplayData from "./components/DisplayData";
import ToolsList from "./components/ToolsList";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import parseDefaultDate from "./utils/parseDefaultDate";
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

let [timeZone, lastMonth] = parseDefaultDate();

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

    const filterByDate = ({ start, timeZone }, endDate) => {
        axios
            .get("/selected-date", { params: { start, endDate, timeZone } })
            .then(({ data }) => {
                setInfo(data);
                console.log("data in filter >>>>>>>>>>> :", data);
            })
            .catch((err) => {
                console.log("err :", err);
            });
    };

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
                            filterByDate={filterByDate}
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
