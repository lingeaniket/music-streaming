import React, { memo } from "react";
import "./list.css";

import ListItem from "./ListItem/ListItem";

const List = ({ data }) => {
    return (
        <div className="list01 app01 list10">
            {data
                ?.filter((item) => ["album", "playlist", "chart", "song"].includes(item.type))
                .map((item, i) => (
                    <ListItem key={item.id + i} data={item} />
                ))}
        </div>
    );
};

export default memo(List);
