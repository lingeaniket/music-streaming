import axios from "axios";

export const getPlayListData = async (data) => {
    if (data.type === "album") {
        const albumSongsData = await axios.get(`https://saavn.me/albums?id=${data.id}`);
        const albumData = albumSongsData.data.data;
        const playerData = {
            song: albumData.songs[0].id,
            playlist: albumData.songs.map((song) => song.id),
        };
        return playerData;
    } else if (data.type === "song") {
        const playerData = {
            song: data.id,
            playlist: [data.id],
        };

        return playerData;
    } else if (data.type === "playlist") {
        const albumSongsData = await axios.get(`https://saavn.me/playlists?id=${data.id}`);
        const albumData = albumSongsData.data.data;
        const playerData = {
            song: albumData.songs[0].id,
            playlist: albumData.songs.map((song) => song.id),
        };

        return playerData;
    } else if (data.type === "artist") {
        const artistData = await axios.get(`https://saavn.me/artists/${data.id}/songs?page=1`);
        const artistSongsData = artistData.data.data;
        const playerData = {
            song: artistSongsData.results[0].id,
            playlist: artistSongsData.results.map((song) => song.id),
        };

        return playerData;
    }
};
