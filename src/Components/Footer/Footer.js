import React from "react";

const Footer = () => {
    return (
        <div className="footer">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        width: "30%",
                        minWidth: "180px",
                    }}
                >
                    Player Image
                </div>
                <div
                    style={{
                        width: "40%",
                        maxWidth: "722px",
                    }}
                >
                    Controlls
                </div>
                <div
                    style={{
                        width: "30%",
                        minWidth: "180px",
                    }}
                >
                    settings
                </div>
            </div>
        </div>
    );
};

export default Footer;
