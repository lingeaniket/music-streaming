import React from "react";

import ListItem from "./ListItem/ListItem";

import "./list.css";

const List = ({ data }) => {
    return (
        <div
            className="list01"
            style={{
                margin: "0 0 22px -22px",
            }}
        >
            {data?.map((val, i) => (
                <ListItem data={val} />
            ))}
        </div>
    );
};

export default List;
