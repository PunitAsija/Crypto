import React from "react";
import "./styles.css";
import Button from "../../Button";
import { motion } from "framer-motion"
import iphone from "./iphone.png"
import gradient from "./gradient.png"


function MainComponent() {
    return (
        <div className="flex-info">

            <div className="left-component">
                <motion.h1 className="track"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Track Crypto
                </motion.h1>
                <motion.h1 className="real"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Real Time
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="info">
                    Track crypto through a public api in real time. Visit dashboard to do so!
                </motion.p>

                <motion.div className="btn-flex"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}>
                    <Button text={"Dashboard"} />
                    <Button text={"Share"} outlined={true} />
                </motion.div>

            </div>
            <div className="phone-container">
                <motion.img src={iphone} className="phone"
                    initial={{ y: -10 }}
                    animate={{ y: 10 }}
                    transition={{
                        type: "smooth",
                        repeatType: "mirror",
                        duration: 2,
                        repeat: Infinity,
                    }} />
                <img src={gradient} className="gradient" />
            </div>
        </div>
    )
};

export default MainComponent;