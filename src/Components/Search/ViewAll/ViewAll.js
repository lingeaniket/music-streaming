import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { Fragment, useCallback, useEffect, useState } from "react";

import PageButton from "./PageButton";
import Loader from "../../Icons/Loader/Loader";
import ListItem from "../../LandingPage/List/ListItem/ListItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import "./viewAll.css";

const ViewAll = () => {
    const navigate = useNavigate();

    const { type, key } = useParams();

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchData, setSearchData] = useState({});
    const [totalPages, setTotalPages] = useState(0);

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (page !== 1) {
            setPage((prev) => prev - 1);
        }
    };

    function handleMode() {
        navigate(`/search/${this.mode}/${key}`);
    }

    const handleButtonPage = useCallback((pgNo) => {
        setPage(pgNo);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [type, key]);

    useEffect(() => {
        setLoading(true);
        const loadData = async () => {
            const data = await axios.get(`https://saavn.me/search/${type}s?query=${key}&page=${page}&limit=24`);
            setSearchData(data.data.data);
            setTotalPages(Math.ceil(data.data.data.total / 24));
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };
        loadData();
    }, [page, type, key]);
    
    return (
        <div className="vAll001">
            <div className="vAll002">
                <div className="vAll003">
                    Search results for <span className="vAll004">{key}</span>
                </div>
                <div>{searchData?.total?.toLocaleString()} results</div>
            </div>
            <div className="vAll002">
                <div className="vAll005">
                    {["playlist", "song", "album", "artist"].map((mode) => (
                        <div className="vAll006">
                            <div
                                className="vAll007"
                                style={{
                                    borderBottom: `${type === mode ? "1px solid white" : "none"}`,
                                }}
                                onClick={handleMode.bind({
                                    mode,
                                })}
                            >
                                <span className="vAll008">{mode}</span>s
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        height: "100px",
                    }}
                >
                    <div
                        style={{
                            width: "50px",
                            height: "50px",
                        }}
                    >
                        <Loader />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="vAll013">
                        <div className="loadMoreSpin">
                            {searchData?.results?.map((search) => {
                                // if (!search.type) {
                                search.type = type;
                                // }
                                return <ListItem key={search.id} data={search} />;
                            })}
                        </div>
                    </div>
                </div>
            )}
            <div
                className="vAll002"
                style={{
                    position: "fixed",
                    zIndex: 15,
                    bottom: "68px",
                    // right: 0,
                    width: "calc(100% - 350px)",
                    display: "flex",
                    alignItems: "center",
                    background: "black",
                    justifyContent: "center",
                    height: "50px",
                }}
            >
                <div className="vAll009">
                    {totalPages > 1 && (
                        <>
                            <div className="vAll010">
                                <button
                                    className="vAll011"
                                    disabled={page === 1}
                                    onClick={() => {
                                        handleButtonPage(1);
                                    }}
                                >
                                    First
                                </button>
                            </div>
                            <div className="vAll010">
                                <button className="vAll011" onClick={handlePrev} disabled={page === 1}>
                                    Prev
                                </button>
                            </div>
                            {Array.from({ length: totalPages }).map((value, index, arr) => {
                                if (
                                    index === 0 ||
                                    (index + 1 >= page - 3 && index + 1 <= page + 3) ||
                                    index === arr.length - 1 ||
                                    page === index
                                ) {
                                    return <PageButton key={index} page={page} index={index} handleButtonPage={handleButtonPage} />;
                                } else if (index + 1 === Math.floor(page - 4) || index + 1 === Math.floor(page + 4)) {
                                    return (
                                        <div className="vAll012">
                                            <FontAwesomeIcon icon={faEllipsis} size="sm" style={{ color: "#ffffff" }} />
                                        </div>
                                    );
                                }
                                return <></>;
                            })}
                            <div className="vAll010">
                                <button className="vAll011" onClick={handleNext} disabled={page === totalPages}>
                                    Next
                                </button>
                            </div>
                            <div className="vAll010">
                                <button
                                    className="vAll011"
                                    disabled={page === totalPages}
                                    onClick={() => {
                                        handleButtonPage(totalPages);
                                    }}
                                >
                                    Last
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewAll;
