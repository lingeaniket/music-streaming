import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./bottomBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import LibrarryDiv from "./LibrarryDiv";
import Library from "../Icons/Library/Library";

const BottomBar = () => {
    const navigate = useNavigate();

    const [libraryOpen, setlibraryopen] = useState(false);

    const handlelibrary = () => {
        setTimeout(() => {
            setlibraryopen(true);
        }, 0);
    };

    return (
        <div className="bottom-bar">
            <div className="app03 h-100 btmbr01">
                <div className="app05 h-100 w-20">
                    <div
                        className="app06 app08 btmbr02"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <div>
                            <FontAwesomeIcon icon={faHouse} size="lg" />
                        </div>
                        <div>Home</div>
                    </div>
                </div>
                <div className="app05 h-100 w-20">
                    <div
                        className="app06 app08 btmbr02"
                        onClick={() => {
                            navigate("/search");
                        }}
                    >
                        <div>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                        </div>
                        <div>Search</div>
                    </div>
                </div>
                <div className="app05 h-100 w-20 btmbr03">
                    <div className="app06 app08 btmbr02" onClick={handlelibrary}>
                        <div>
                            <Library />
                        </div>
                        <div>Library</div>
                    </div>
                    {libraryOpen ? (
                        <div className="btmbr04">
                            <LibrarryDiv setOpen={setlibraryopen} />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default BottomBar;
