import "./App.css";
import { useEffect, useState } from "react";
import DisplayData from "./components/DispalayData";
import ToolsList from "./components/ToolsList";
import Box from "@material-ui/core/Box";

function App() {
    let [info, setInfo] = useState([]);

    useEffect(() => {
        fetch("/api")
            .then((data) => data.json())
            .then((data) => {
                setInfo(data);
            });
    }, []);

    const filterByCity = (startCity, endCity) => {
        fetch("/api")
            .then((data) => data.json())
            .then((data) => {
                let res = data.filter((details) => {
                    return (
                        details.start_city === startCity &&
                        details.end_city === endCity
                    );
                });

                setInfo(res);
            });
    };

    return (
        <div className="App">
            <header className="App-header">header</header>
            <main style={{ width: "100%" }}>
                <Box display="flex" p={1}>
                    <DisplayData info={info} />
                    <Box p={2}>
                        <ToolsList info={info} filterByCity={filterByCity} />
                    </Box>
                </Box>
            </main>
        </div>
    );
}

export default App;
