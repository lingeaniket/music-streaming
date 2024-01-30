import React, { memo } from "react";
import "./list.css";

import ListItem from "./ListItem/ListItem";

const List = ({ data }) => {
    return (
        <div className="list01 app01 list10">
            {data?.map((val, i) => (
                <ListItem key={i} data={val} />
            ))}
        </div>
    );
};

export default memo(List);
