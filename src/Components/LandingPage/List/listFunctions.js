import axios from "axios";

export const getPlayListData = async (data, type) => {
    if (type === "album" || type === "playlist") {
        const albumSongsData = await axios.get(`https://saavn.me/${type}s?id=${data.id}`);
        const albumData = albumSongsData.data.data;
        const playerData = {
            song: albumData.songs[0].id,
            playlist: albumData.songs.map((song) => song.id),
            nameOfList: albumData.name,
        };
        return playerData;
    } else if (data.type === "song") {
        const playerData = {
            song: data.id,
            playlist: [data.id],
        };

        return playerData;
    } else if (data.type === "artist") {
        const artist = await axios.get(`https://saavn.me/artists?id=${data.id}`);
        const artistData = await axios.get(`https://saavn.me/artists/${data.id}/songs?page=1`);
        const artistSongsData = artistData.data.data;
        const playerData = {
            song: artistSongsData.results[0].id,
            playlist: artistSongsData.results.map((song) => song.id),
            nameOfList: artist.data.data.name,
        };

        return playerData;
    }
};
