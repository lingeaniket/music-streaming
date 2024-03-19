import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, memo } from "react";

import { convertName } from "../../../commonFunctions";
import { setOptions } from "../../../../Features/optionSlice";
import { getArtists, getPlayListData } from "../listFunctions";
import { playAlbum } from "../../../../Features/musicPlayerSlice";
import { addLiked, removeLiked } from "../../../../Features/userSlice";

import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Play from "../../../Icons/Play/Play";
import Options from "../../../Options/Options";

const ListItem = ({ data }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const likedData = useSelector((state) => state.user.liked);

    const [liked, setLiked] = useState(false);
    const [options, setoptions] = useState(false);

    // function to open options modal
    const handleOptions = (event) => {
        event.stopPropagation(); // to not execute further events

        const parentDiv = document.getElementById("options-container"); // get main scrolling container
        const optionContiner = document.getElementById("options-main-container"); // get options main container
        const parentRect = parentDiv.getBoundingClientRect(); // parent rect
        const { top, right, left } = event.target.parentNode.getBoundingClientRect(); // targets rect

        const relativeLeft = left - parentRect.left + parentDiv.scrollLeft; // left of target - parents left = left position of options in main container + scrolling left value
        const relativeTop = top - parentRect.top + parentDiv.scrollTop; // top of target - parents top = top position of options in main container + scrolling top value

        // handle how option container position on screen with respected item
        if (top > window.innerHeight / 2) {
            // if option button is below of half of screen
            optionContiner.style.top = relativeTop - 155 + "px"; // 155px towards top from button
        } else {
            optionContiner.style.top = relativeTop + 20 + "px"; // 20px towards bottom from button
        }

        if (right < window.innerWidth / 2) {
            // if option button is right of half of screen
            optionContiner.style.left = relativeLeft + 20 + "px"; // 20px towards right from button
        } else {
            optionContiner.style.left = relativeLeft - 130 + "px"; // 130px towards left from button
        }
        setTimeout(() => {
            // dispatch action to open option modal and give it data
            dispatch(
                setOptions({
                    open: true,
                    data,
                })
            );
        }, 0);
    };

    // function to like or unlike
    const handleLike = (event) => {
        event.stopPropagation();
        if (liked) {
            dispatch(removeLiked({ id: data.id, type: data.type }));
            setLiked(false);
        } else {
            dispatch(addLiked({ id: data.id, type: data.type }));
            setLiked(true);
        }
    };

    // to Play the current category
    const handleAlbum = async (event) => {
        event.stopPropagation();
        const playerData = await getPlayListData(data, data.type);
        dispatch(playAlbum(playerData));
    };

    // function to navigate to respected category details with its name
    const handleAlbumRoute = () => {
        const songTitle = data.name ? data.name : data.title;
        const nString = convertName(songTitle).toLowerCase();
        const conTitle = nString
            .replace(/[^a-zA-Z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, ""); // removes unwanted characters so it navigate properly
        if (data.type === "album" || data.type === "song") {
            navigate(`/${data.type}/${conTitle}/${data.id}`);
        } else {
            navigate(`/featured/${conTitle}/${data.id}`); // route for playlist and charts
        }
    };

    // useeffect to set whether the category liked or not
    useEffect(() => {
        setLiked(likedData[`${data.type}s`].findIndex((idx) => idx === data.id) > -1);
        // eslint-disable-next-line
    }, [data]);

    return (
        <div className="list02">
            <div className="listButtons" onClick={handleAlbumRoute}>
                <div className={`list03 ${data.type === "artist" ? "list09" : ""}`}>
                    <div className="list04 w-100 app01">
                        <img
                            height={"100%"}
                            width={"100%"}
                            loading="lazy"
                            src={Array.isArray(data?.image) ? (data?.image[1].link ? data?.image[1].link : data?.image[1].url) : data.image}
                            alt=""
                        />
                    </div>
                    <div className="listTabs">
                        <div className="list05">
                            <div className="list06 app09 app03">
                                <div className="mainBtnHov">
                                    <div className="list07 app05" onClick={handleAlbum}>
                                        <div className="playBtn app05"></div>
                                    </div>
                                    <div className="list07 app05" onClick={handleAlbum}>
                                        <Play />
                                    </div>
                                </div>
                                {data.type !== "artist" && (
                                    <>
                                        <div onClick={handleLike} className="list08">
                                            <i
                                                className={`fa-${liked ? "solid" : "regular"} fa-heart fa-lg`}
                                                style={{ color: `${liked ? "red" : "#ffffff"}` }}
                                            ></i>
                                        </div>
                                        <div className="options">
                                            <div className="app05" onClick={handleOptions}>
                                                <FontAwesomeIcon icon={faEllipsis} size="xl" style={{ color: "#ffffff" }} />
                                            </div>
                                            <div className="options01">
                                                {options && (
                                                    <Options liked={liked} data={data} handleLike={handleLike} setoptions={setoptions} />
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="listTitle">{data.name ? convertName(data.name) : data.title ? convertName(data.title) : ""}</h4>
                    <p className="listTitle">{convertName(getArtists(data))}</p>
                </div>
            </div>
        </div>
    );
};

export default memo(ListItem);
