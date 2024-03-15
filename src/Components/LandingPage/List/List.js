import React, { memo } from "react";
import "./list.css";

import ListItem from "./ListItem/ListItem";

const List = ({ data }) => {
    return (
        <div className="list01 app01 list10">
            {data?.map((val, i) => {
                if (["album", "playlist", "chart", "song"].includes(val.type)) {
                    return <ListItem key={i} data={val} />;
                }
                return <></>;
            })}
        </div>
    );
};

export default memo(List);
