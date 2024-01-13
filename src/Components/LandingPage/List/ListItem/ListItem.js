import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { playAlbum } from "../../../../Features/musicPlayerSlice";
import { getPlayListData } from "../listFunctions";
import he from "he";
import { convertName } from "../../../commonFunctions";
import Play from "../../../Icons/Play/Play";
import Heart from "../../../Icons/Heart/Heart";
import Ellipsis from "../../../Icons/Ellipsis/Ellipsis";
import { addLiked, removeLiked } from "../../../../Features/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const ListItem = ({ data }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const likedData = useSelector((state) => state.user.liked);

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
        const playerData = await getPlayListData(data);
        dispatch(playAlbum(playerData));
    };

    const handleAlbumRoute = () => {
        const songTitle = data.name ? data.name : data.title;
        const nString = he.decode(songTitle).toLowerCase();
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
    }, [data]);

    return (
        <div className="list02">
            <div className="listButtons" onClick={handleAlbumRoute}>
                <div
                    className="list03"
                    style={{
                        borderRadius: `${data.type === "artist" ? "50%" : 0}`,
                    }}
                >
                    <div className="list04 w-100 app01">
                        <img src={Array.isArray(data?.image) ? data?.image[2].link : data.image} alt="" />
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
                                        <div onClick={handleLike}>
                                            <i
                                                className={`fa-${liked ? "solid" : "regular"} fa-heart fa-xl`}
                                                style={{ color: `${liked ? "green" : "#ffffff"}` }}
                                            ></i>
                                        </div>
                                        <div className="app05">
                                            <FontAwesomeIcon icon={faEllipsis} size="2xl" style={{ color: "#ffffff" }} />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="listTitle">{data.name ? convertName(data.name) : convertName(data.title)}</h4>
                    <p className="listTitle">
                        {convertName(
                            Array.isArray(data.primaryArtists)
                                ? data?.primaryArtists.map((artist, id, arr) => {
                                      if (id === arr.length - 1) {
                                          return artist.name;
                                      } else {
                                          return `${artist.name}, `;
                                      }
                                  })
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

export default ListItem;
