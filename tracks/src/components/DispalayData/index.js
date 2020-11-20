import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
// import CellParams from "@material-ui/data-grid";

export default function DisplayData({ info }) {
    let [data, setData] = useState([]);
    let [selectedRow, setSelectedRow] = useState([]);

    useEffect(() => {
        setData(info);
    }, [data, info]);

    const rows = [];

    const columns = [
        { field: "col1", headerName: "Carrier Name", width: 150 },
        { field: "col2", headerName: "CO2 Emission", width: 150 },
        { field: "col3", headerName: "Distance", width: 150 },
        {
            field: "col4",
            headerName: "Average weight",
            width: 150,
        },
        { field: "col5", headerName: "Intensity Factor", width: 150 },
    ];

    data.map((inf) => {
        return (rows[inf.id] = {
            id: inf.id,
            col1: inf.carrier_company_id.toString().slice(0, 6),
            col2: inf.total_co2_emitted.toString().slice(0, 6) + " GT",
            col3: inf.travelled_distance.toString().slice(0, 6) + " km",
            col4: inf.weight.toString().slice(0, 6) + " kg",
            col5: "i don't know yet",
        });
    });

    let handleClick = (row) => {
        for (let i = 0; i < data.length; i++) {
            if (row.data.id === data[i].id) {
                setSelectedRow(data[i]);
                break;
            }
        }
        return;
    };
    // console.log("selectedRow :", selectedRow);

    return (
        <div style={{ height: 700, width: "80%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                onCellClick={(row) => handleClick(row)}
            />
        </div>
    );
}
