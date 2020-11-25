import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

import RowDetails from "./RowDetails";

export default function DisplayData({ info }) {
    let [data, setData] = useState([]);
    let [selectedRow, setSelectedRow] = useState({});

    useEffect(() => {
        setData(info);
    }, [data, info]);

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    let rows = [];

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

    console.log("data in display data :", data);
    if (data.length > 0) {
        data.map((inf, i) => {
            return (rows[i] = {
                id: i,
                col1: inf.carrier_company_id.toString(),
                col2: inf.total_co2_emitted.toString().slice(0, 6) + " GT",
                col3: inf.travelled_distance.toString().slice(0, 6) + " km",
                col4: inf.weight.toString().slice(0, 6) + " kg",
                col5: "i don't know yet",
            });
        });
    } else {
        rows[0] = { id: 1, co1: "no Data found" };
    }
    let handleClick = (row) => {
        for (let i = 0; i < data.length; i++) {
            if (
                row.data.col3 ===
                data[i].travelled_distance.toString().slice(0, 6) + " km"
            ) {
                setSelectedRow(data[i]);

                break;
            }
        }
        setOpen(true);

        return;
    };

    return (
        <div style={{ height: 750, width: "65%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                onCellClick={(row) => handleClick(row)}
            />
            {selectedRow.id && (
                <RowDetails
                    open={open}
                    handleClose={handleClose}
                    selectedRow={selectedRow}
                />
            )}
        </div>
    );
}
