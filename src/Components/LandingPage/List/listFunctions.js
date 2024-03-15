import axios from "axios";
import { apiWebsite } from "../../../apiWeb";

export const getPlayListData = async (data, type) => {
    if (type === "album" || type === "playlist") {
        const albumSongsData = await axios.get(`${apiWebsite}/${type}?id=${data.id}`);
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
        const artist = await axios.get(`${apiWebsite}/artist?id=${data.id}`);
        const artistData = await axios.get(`${apiWebsite}/artist/${data.id}/songs?page=1`);
        const artistSongsData = artistData.data.data;
        const playerData = {
            song: artistSongsData.results[0].id,
            playlist: artistSongsData.results.map((song) => song.id),
            nameOfList: artist.data.data.name,
        };

        return playerData;
    }
};

export const getArtists = (data) => {
    return Array.isArray(data.primaryArtists) && data?.primaryArtists.length > 0
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
        : data.subtitle;
};
