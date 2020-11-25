import React from "react";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";

export default function FilterByGoodsType({
    typeOfGoods,
    handleGoods,
    handleSubmitFilter,
    uniqAvailableGoods,
}) {
    return (
        <MenuItem>
            <Box>
                <Box p={1}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label2">
                            Type of Goods
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select2"
                            value={typeOfGoods + ""}
                            onChange={handleGoods}
                            style={{ width: "155px" }}
                        >
                            {uniqAvailableGoods.map((goods) => (
                                <MenuItem key={goods + "1"} value={goods + ""}>
                                    {goods}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box mx={1}>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={handleSubmitFilter}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </MenuItem>
    );
}
