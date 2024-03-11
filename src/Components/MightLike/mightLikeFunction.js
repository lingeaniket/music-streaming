import axios from "axios";
import { apiWebsite } from "../../apiWeb";

export const loadAData = async (mode, id, details) => {
    const { year, language } = details.params;
    if (mode === "YML") {
        const data = await axios.get(`${apiWebsite}/album/recommend?id=${id}`);
        return data.data.data;
    } else if (mode === "TAOSY") {
        const data = await axios.get(`${apiWebsite}/album/same-year?year=${year}&language=${language}`);
        return data.data.data;
    }
};

export const loadPData = async (id) => {
    const data = await axios.get(`${apiWebsite}/playlist/recommend?id=${id}`);
    return data.data.data;
};

export const loadSData = async (mode, songId, details) => {
    const { id, lang, artist_id, song_id } = details.params;
    if (mode === "TSOSAr") {
        const data = await axios.get(`${apiWebsite}/artist/recommendations?song_id=${song_id}&artist_id=${artist_id}&language=${lang}`);
        return data.data.data;
    } else if (mode === "YML") {
        const data = await axios.get(`${apiWebsite}/song/recommend?id=${id}&language=${lang}`);

        return data.data.data;
    }
};
