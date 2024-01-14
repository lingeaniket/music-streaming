export const handleSeek = (percent) => {
    document.getElementById("overlay-div").style.width = `calc(${percent}% + ${percent > 50 ? "0px" : percent < 1 ? "0px" : "5px"})`;
};

export const handleVolumeSeek = (percent) => {
    document.getElementById("overlay-volume-div").style.width = `calc(${percent}% + ${percent > 50 ? "0px" : percent < 1 ? "0px" : "5px"})`;
};
