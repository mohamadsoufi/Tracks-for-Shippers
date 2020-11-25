import React from "react";
import FilterBy from "../FilterBy";
import SelectByDate from "../SelectByDate";

export default function ToolsList({
    filterByCity,
    filterByCalculation,
    filterByGoodsType,
    filterByDate,
}) {
    return (
        <div>
            <p>temp</p>

            <SelectByDate filterByDate={filterByDate} />
            <FilterBy
                filterByCity={filterByCity}
                filterByCalculation={filterByCalculation}
                filterByGoodsType={filterByGoodsType}
            />
        </div>
    );
}
