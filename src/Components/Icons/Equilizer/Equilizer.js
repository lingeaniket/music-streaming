import React from "react";
import "./equilizer.css"

const Equilizer = () => {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 21 24"
            xmlSpace="preserve"
            className="o-equalizer"
            stroke="white"
        >
            <line className="o-equalizer__slide" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" x1="3" y1="22" x2="3" y2="2"></line>
            <line className="o-equalizer__slide" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" x1="8" y1="22" x2="8" y2="2"></line>
            <line className="o-equalizer__slide" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" x1="13" y1="22" x2="13" y2="2"></line>
            <line className="o-equalizer__slide" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" x1="18" y1="22" x2="18" y2="2"></line>
        </svg>
    );
};

export default Equilizer;
