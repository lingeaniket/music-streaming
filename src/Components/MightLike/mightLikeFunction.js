import axios from "axios";

export const loadAData = async (mode, id, language, year) => {
    if (mode === "YML") {
        const data = await axios.get(`https://instagram-api-aniket.onrender.com/api/v1/music-player/get-yml?albumId=${id}`);
        return data.data;
    } else if (mode === "TAOSY") {
        const data = await axios.get(
            `https://instagram-api-aniket.onrender.com/api/v1/music-player/get-taosy?year=${year}&language=${language}`
        );
        return data.data;
    }
};

export const loadPData = async (id) => {
    const data = await axios.get(`https://instagram-api-aniket.onrender.com/api/v1/music-player/get-rp?playlistId=${id}`);
    return data.data;
};

export const loadSData = async (mode, artId, language, songId) => {
    if (mode === "TSOSAr") {
        const data = await axios.get(
            `https://instagram-api-aniket.onrender.com/api/v1/music-player/get-tsosar?artistId=${artId}&songId=${songId}&language=${language}`
        );
        return data.data;
    // } else if (mode === "TSOSAct") {
    //     const data = await axios.get(
    //         `https://instagram-api-aniket.onrender.com/api/v1/music-player/get-tsosact?actorstId=${actId}&songId=${songId}&language=${language}`
    //     );
    //     return data.data;
    } else if (mode === "YML") {
        const data = await axios.get(
            // `http://localhost:4000/api/v1/music-player/get-song-yml?songId=${songId}&language=${language}`
            `https://instagram-api-aniket.onrender.com/api/v1/music-player/get-song-yml?songId=${songId}&language=${language}`
        );
        return data.data;
    }
};
