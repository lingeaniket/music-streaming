import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState, memo } from "react";
import "./viewAll.css";

import PageButton from "./PageButton";
import Loader from "../../Icons/Loader/Loader";
import ListItem from "../../LandingPage/List/ListItem/ListItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { apiWebsite } from "../../../apiWeb";

const ViewAll = () => {
    const navigate = useNavigate();
    const { type, key } = useParams();

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [searchData, setSearchData] = useState({});

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
            const data = await axios.get(`${apiWebsite}/search/${type}s?query=${key}&page=${page}&limit=24`);
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
                <div className="vAll005 app06">
                    {["playlist", "song", "album", "artist"].map((mode) => (
                        <div className="vAll006">
                            <div
                                className="vAll007 app06"
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
                <div className="app02 w-100 vAll018">
                    <div className="vAll019">
                        <Loader />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="vAll013">
                        <div className="loadMoreSpin app01">
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
            <div className="vAll014">
                <div className="vAll009 app05">
                    {totalPages > 1 && (
                        <>
                            <div className="vAll010">
                                <button
                                    className="vAll011 app05"
                                    disabled={page === 1}
                                    onClick={() => {
                                        handleButtonPage(1);
                                    }}
                                >
                                    First
                                </button>
                            </div>
                            <div className="vAll010">
                                <button className="vAll011 app05" onClick={handlePrev} disabled={page === 1}>
                                    Prev
                                </button>
                            </div>
                            {Array.from({ length: totalPages }).map((value, index, arr) => {
                                if (
                                    index === 0 ||
                                    (index + 1 >= page - 4 && index + 1 <= page + 4) ||
                                    index === arr.length - 1 ||
                                    page === index
                                ) {
                                    return <PageButton key={index} page={page} index={index} handleButtonPage={handleButtonPage} />;
                                } else if (index + 1 === Math.floor(page - 5) || index + 1 === Math.floor(page + 5)) {
                                    return (
                                        <div className="vAll012 app05">
                                            <FontAwesomeIcon icon={faEllipsis} size="sm" style={{ color: "#ffffff" }} />
                                        </div>
                                    );
                                }
                                return <></>;
                            })}
                            <div className="vAll010">
                                <button className="vAll011 app05" onClick={handleNext} disabled={page === totalPages}>
                                    Next
                                </button>
                            </div>
                            <div className="vAll010">
                                <button
                                    className="vAll011 app05"
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

export default memo(ViewAll);
