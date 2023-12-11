import axios from "axios";
export const getPlayListData = async (data) => {
    if (data.type === "album") {
        const albumSongsData = await axios.get(`https://saavn.me/albums?id=${data.id}`);
        const albumData = albumSongsData.data.data;
        const playerData = {
            song: albumData.songs[0],
            playlist: albumData.songs.length > 2 ? albumData.songs.slice(1, albumData.songCount) : albumData.songs[1],
        };
        return playerData;
    } else if (data.type === "song") {
        const albumSongsData = await axios.get(`https://saavn.me/songs?id=${data.id}`);
        const albumData = albumSongsData.data.data;
        const playerData = {
            song: albumData[0],
            playlist: [],
        };

        return playerData;
    } else if (data.type === "playlist") {
        const albumSongsData = await axios.get(`https://saavn.me/playlists?id=${data.id}`);
        const albumData = albumSongsData.data.data;
        const playerData = {
            song: albumData.songs[0],
            playlist: albumData.songs.length > 2 ? albumData.songs.slice(1, albumData.songCount) : albumData.songs[1],
        };

        return playerData;
    } else if (data.type === "artist") {
        const artistData = await axios.get(`https://saavn.me/artists/${data.id}/songs?page=1`);
        const artistSongsData = artistData.data.data;
        // console.log(artistSongsData)
        const playerData = {
            song: artistSongsData.results[0],
            playlist:
                artistSongsData.results.length > 2
                    ? artistSongsData.results.slice(1, artistSongsData.results.length)
                    : artistSongsData.results[1],
        };

        console.log(playerData)

        return playerData;
    }
};
