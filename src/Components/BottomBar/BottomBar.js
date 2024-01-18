import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./bottomBar.css";
import { useNavigate } from "react-router-dom";
import Library from "../Icons/Library/Library";
import LibrarryDiv from "./LibrarryDiv";

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
                        className="app06 app08  btmbr02"
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
                <div className="app05 h-100 w-20  btmbr03">
                    <div className="app06 app08  btmbr02" onClick={handlelibrary}>
                        <div>
                            <Library />
                        </div>
                        <div>Library</div>
                    </div>
                    {libraryOpen ? (
                        <div
                            style={{
                                position: "absolute",
                                bottom: "calc(100% + 15px)",
                                backgroundColor: "rgb(18,18,18)",
                                borderRadius: "4px",
                                boxShadow: "0 0 5px white",
                            }}
                        >
                            <LibrarryDiv setOpen={setlibraryopen} />
                        </div>
                    ) : null}
                </div>
                {/* <div
                    className="app05 h-100 w-20"
                    style={{
                        width: "20%",
                    }}
                >
                    Account
                </div> */}
            </div>
        </div>
    );
};

export default BottomBar;
