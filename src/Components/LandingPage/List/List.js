import React from "react";

import ListItem from "./ListItem/ListItem";

import "./list.css";

const List = ({ data }) => {
    return (
        <div
            className="list01 app01"
            style={{
                margin: "0 0 22px -22px",
            }}
        >
            {data?.map((val, i) => (
                <ListItem key={i} data={val} />
            ))}
        </div>
    );
};

export default List;
