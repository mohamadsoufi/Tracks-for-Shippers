import React, { forwardRef } from "react";
import {
    AppBar,
    Dialog,
    IconButton,
    List,
    ListItem,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
    Box,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function createData(title, value) {
    return { title, value };
}

export default function RowDetails({ handleClose, open, selectedRow }) {
    let estimatedFuelConsumed = selectedRow.estimated_fuel_consumed
        ? selectedRow.estimated_fuel_consumed.toString().slice(0, 6)
        : selectedRow.estimated_fuel_consumed;

    let AllocatedDistance = selectedRow.allocated_distance
        ? selectedRow.allocated_distance.toString().slice(0, 6)
        : selectedRow.allocated_distance;

    let AllocatedFuel = selectedRow.allocated_fuel
        ? selectedRow.allocated_fuel.toString().slice(0, 6)
        : selectedRow.allocated_fuel;

    const rows = [
        createData("Estimated fuel consumed", estimatedFuelConsumed),
        createData("Weight", selectedRow.weight.toString().slice(0, 6) + " kg"),
        createData(
            "Travelled distance",
            selectedRow.travelled_distance.toString().slice(0, 6) + " km"
        ),
        createData("Type of goods", selectedRow.type_of_goods.toString()),
        createData("Start country", selectedRow.start_country.toString()),
        createData("End country", selectedRow.end_country.toString()),
        createData("Start city", selectedRow.start_city.toString()),
        createData("End city", selectedRow.end_city.toString()),
        createData(
            "Type of calculations",
            selectedRow.type_of_calculations.toString()
        ),
        createData("Allocated distance", AllocatedDistance),
        createData("Allocated fuel", AllocatedFuel),
        createData(
            "Total co2 emitted",
            selectedRow.total_co2_emitted.toString().slice(0, 6) + " GT"
        ),
        createData(
            "Start time",
            selectedRow.start_time.toString().slice(0, 9) +
                " | " +
                selectedRow.start_time.toString().slice(11, 16)
        ),
        createData(
            "End time",
            selectedRow.end_time.toString().slice(0, 9) +
                " | " +
                selectedRow.end_time.toString().slice(11, 16)
        ),
    ];

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6">close</Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <Box mt={20}>
                        <ListItem button>
                            <TableContainer>
                                <Box p={1} px="40%">
                                    <Table
                                        size="small"
                                        aria-label="a dense table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell align="right"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.title}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {row.title}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.value}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </TableContainer>
                        </ListItem>
                    </Box>
                </List>
            </Dialog>
        </div>
    );
}
