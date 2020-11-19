import "./App.css";
import { useEffect, useState } from "react";

function App() {
    let [info, setInfo] = useState([]);

    useEffect(() => {
        fetch("/api")
            .then((data) => data.json())
            .then((data) => {
                setInfo(data);
            });
    }, []);

    if (info) {
        info.forEach((i) => console.log("i :", i.id));
    }

    return (
        <div className="App">
            <header className="App-header"></header>
        </div>
    );
}

export default App;
