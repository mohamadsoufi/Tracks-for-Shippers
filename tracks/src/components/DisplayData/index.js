import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

import RowDetails from "./RowDetails";
import { rowMaker } from "../../utils";

export default function DisplayData({ info }) {
    let [selectedRow, setSelectedRow] = useState({});
    const [open, setOpen] = React.useState(false);
    let rows = [];

    if (info.length >= 2) {
        rows = rowMaker(info);
    } else {
        rows = [{ id: 1, col3: "No Data found!", width: 150 }];
    }

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

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (row) => {
        for (let i = 0; i < rows.length; i++) {
            if (
                row.data.col3 ===
                info[i].travelled_distance.toString().slice(0, 6) + " km"
            ) {
                setSelectedRow(info[i]);

                break;
            }
        }
        setOpen(true);

        return;
    };

    return (
        <div style={{ height: 765, width: "65%" }}>
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
