import axios from "axios";

export const loadAData = async (mode, id, language, year) => {
    if (mode === "YML") {
        const data = await axios.get(`https://music-streaming-api.onrender.com/api/v1/music/get-yml?albumId=${id}`);
        return data.data;
    } else if (mode === "TAOSY") {
        const data = await axios.get(`https://music-streaming-api.onrender.com/api/v1/music/get-taosy?year=${year}&language=${language}`);
        return data.data;
    }
};

export const loadPData = async (id) => {
    const data = await axios.get(`https://music-streaming-api.onrender.com/api/v1/music/get-rp?playlistId=${id}`);
    return data.data;
};

export const loadSData = async (mode, artId, language, songId, albumId, year) => {
    if (mode === "TSOSAr") {
        const data = await axios.get(
            `https://music-streaming-api.onrender.com/api/v1/music/get-tsosar?artistId=${artId}&songId=${songId}&language=${language}`
        );
        return data.data;
        // } else if (mode === "TSOSAct") {
        //     const data = await axios.get(
        //         `https://instagram-api-aniket.onrender.com/api/v1/music-player/get-tsosact?actorstId=${actId}&songId=${songId}&language=${language}`
        //     );
        //     return data.data;
    } else if (mode === "YML") {
        // const albumData = {
        //     data: [],
        // };
        // const albumData =  await axios.get(`https://music-streaming-api.onrender.com/api/v1/music/get-yml?albumId=${albumId}`);
        const yearData = await axios.get(
            `https://music-streaming-api.onrender.com/api/v1/music/get-taosy?year=${year}&language=${language}`
        );

        const random1 = generateRandom(13, 24);
        const newData = yearData.data
            .slice(random1-13, random1)
            .map((album) => {
                const random = generateRandom(0, album.list_count);
                return album.list[random];
            })
            .filter((song) => song.id !== songId);

        // const convertedData = albumData.data.slice(0, 12).map((album) => {
        //     const albumid = album.id;

        //     const getAlbumData = async (albumid) => {
        //         const songData = await axios.get(`https://saavn.me/albums?id=${albumid}`);
        //         const random = generateRandom(songData.data.songCount);
        //         return songData.data.songs[random];
        //     };

        //     return getAlbumData(albumid);
        // });

        return newData;
        // return albumData.data
    }
};

const generateRandom = (low, high) => {
    return Math.floor(Math.random() * (high - low)) + low;
};
