import { Box } from "@material-ui/core";
import React from "react";
import FilterBy from "../FilterBy";
import SelectByDate from "../SelectByDate";

export default function ToolsList({
    filterByCity,
    filterByCalculation,
    filterByGoodsType,
    filterByDate,
    info,
}) {
    return (
        <div>
            <Box p={1}>
                <SelectByDate filterByDate={filterByDate} />
            </Box>
            <Box p={1}>
                <FilterBy
                    info={info}
                    filterByCity={filterByCity}
                    filterByCalculation={filterByCalculation}
                    filterByGoodsType={filterByGoodsType}
                />
            </Box>
        </div>
    );
}
