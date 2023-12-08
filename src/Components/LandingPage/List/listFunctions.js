import axios from "axios";
export const getPlayListData = async (data) => {
    if (data.type === "album") {
        const albumSongsData = await axios.get(`https://saavn.me/albums?id=${data.id}`);
        const albumData = albumSongsData.data.data;
        const playerData = {
            song: albumData.songs[0],
            playlist: albumData.songs > 2 ? albumData.songs.slice(1, albumData.songCount) : albumData.songs[1],
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
          playlist: albumData.songs > 2 ? albumData.songs.slice(1, albumData.songCount) : albumData.songs[1],
      };

      return playerData;
    }
};
