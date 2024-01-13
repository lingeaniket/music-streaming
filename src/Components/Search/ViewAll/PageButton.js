import React from "react";

const PageButton = ({ page, index, handleButtonPage }) => {
    const handleClick = (e) => {
        if (!Number.isNaN(e.target.innerText)) {
            handleButtonPage(Number(e.target.innerText));
        }
    };
    return (
        <div className="vAll010"
            key={index}
            
        >
            <div className="vAll011 app05"
                key={index}
                style={{
                    background: `${page === index + 1 ? "green" : "white"}`,
                    width: "50px",
                    border: `2px solid ${page === index+1 ? "white": "black"}`,
                    color: `${page === index + 1 ? "white" : "black"}`,
                }}
                onClick={handleClick}
            >
                {index + 1}
            </div>
        </div>
    );
};

export default PageButton;
