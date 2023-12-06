import React from "react";
import "./list.css";
import ListItem from "./ListItem/ListItem";

const List = ({ data }) => {
    return (
        <div
            className="list01"
            style={{
                // justifyContent: "space-between",
                // flexDirection: `${Array.isArray(val) ? 'row' : 'column'}`,
                margin: "0 0 22px -22px",
            }}
        >
            {data.map((val, i) => (
                <ListItem val={val}/>
            ))}
        </div>
    );
};

export default List;
