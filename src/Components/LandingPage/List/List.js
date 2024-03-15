import React, { Fragment, memo } from "react";
import "./list.css";

import ListItem from "./ListItem/ListItem";

const List = ({ data }) => {
    return (
        <div className="list01 app01 list10">
            {data?.map((item, i) => {
                if (["album", "playlist", "chart", "song"].includes(item.type)) {
                    return <ListItem key={item.id + i} data={item} />;
                }
                return <Fragment key={item.id + i}></Fragment>;
            })}
        </div>
    );
};

export default memo(List);
