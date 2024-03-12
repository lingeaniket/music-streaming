import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, memo } from "react";

import { getPlayListData } from "../listFunctions";
import { playAlbum } from "../../../../Features/musicPlayerSlice";
import { addLiked, removeLiked } from "../../../../Features/userSlice";
import { closeForceOptions, convertName } from "../../../commonFunctions";

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

    const handleOptions = (event) => {
        event.stopPropagation();
        closeForceOptions();
        

        const { top, right } = event.target.parentNode.getBoundingClientRect();
        const parent = event.target.closest(".options");

        const option = parent.querySelector(".options01");
        option.style.opacity = 1;
        option.style.visibility = "visible";

        if (top > window.innerHeight / 2) {
            option.style.bottom = "10%";
        } else {
            option.style.top = "100%";
        }

        if (right < window.innerWidth / 2) {
            option.style.left = "25%";
        } else {
            option.style.right = "10%";
        }

        setTimeout(() => {
            setoptions(true);
        }, 0);
    };

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

    const handleAlbum = async (event) => {
        event.stopPropagation();
        const playerData = await getPlayListData(data, data.type);
        dispatch(playAlbum(playerData));
    };

    const handleAlbumRoute = () => {
        const songTitle = data.name ? data.name : data.title;
        const nString = convertName(songTitle).toLowerCase();
        const conTitle = nString
            .replace(/[^a-zA-Z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
        if (data.type === "album" || data.type === "song") {
            navigate(`/${data.type}/${conTitle}/${data.id}`);
        } else {
            navigate(`/featured/${conTitle}/${data.id}`);
        }
    };

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
                    <p className="listTitle">
                        {convertName(
                            Array.isArray(data.primaryArtists) && data?.primaryArtists.length > 0
                                ? data?.primaryArtists
                                      .map((artist, id, arr) => {
                                          if (id === arr.length - 1) {
                                              return artist.name;
                                          } else {
                                              return `${artist.name}, `;
                                          }
                                      })
                                      .toString()
                                : Array.isArray(data.artists) && data.artists.length > 0
                                ? data?.artists
                                      .map((artist, id, arr) => {
                                          if (id === arr.length - 1) {
                                              return artist.name;
                                          } else {
                                              return `${artist.name}, `;
                                          }
                                      })
                                      .toString()
                                : data.primaryArtists
                                ? data.primaryArtists
                                : data.subtitle
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default memo(ListItem);
