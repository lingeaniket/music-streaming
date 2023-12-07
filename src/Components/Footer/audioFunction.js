export const handleSeek = (percent) => {
    document.getElementById("seek-range").style.background = `linear-gradient(90deg, white ${percent}%, gray 0)`;
    document.getElementById("overlay-div").style.width = `calc(${percent}% + ${percent > 50 ? "0px" : percent < 1 ? "0px" : "5px"})`;
};

export const handleVolumeSeek = (percent) => {
    document.getElementById("seek-volume").style.background = `linear-gradient(90deg, white ${percent}%, gray 0)`;
    document.getElementById("overlay-volume-div").style.width = `calc(${percent}% + ${percent > 50 ? "0px" : percent < 1 ? "0px" : "5px"})`;
};
