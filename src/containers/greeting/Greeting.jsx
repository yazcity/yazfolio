import React, { useContext } from "react";
import { motion } from "framer-motion";
import emoji from "react-easy-emoji";
import "./Greeting.scss";

import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import { illustration, greeting } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

import { FaFileDownload } from "react-icons/fa";



function Greeting() {
  const { isDark } = useContext(StyleContext);

  if (!greeting.displayGreeting) return null;

  // Same as Fade bottom distance="40px" duration={1000}
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="greet-main"
      id="greeting"
    >
      <div className="greeting-main">
        <div className="greeting-text-div">
          <div>
            <h1
              className={isDark ? "dark-mode greeting-text" : "greeting-text"}
            >
              {greeting.title} <span className="wave-emoji">{emoji("👋")}</span>
            </h1>

            <p
              className={
                isDark
                  ? "dark-mode greeting-text-p"
                  : "greeting-text-p subTitle"
              }
            >
              {greeting.subTitle}
            </p>

            <div id="resume" className="empty-div"></div>
            <SocialMedia />

            <div className="button-greeting-div">
              <Button text="Contact me" href="#contact" />
              {greeting.resumeLink && (
                <a
                  href={require("./resume.pdf")}
                  download="Resume.pdf"
                  className="download-link-button"
                >
                  <Button
                    text={
                      window.innerWidth <= 480 ? <FaFileDownload /> : "Download my resume"
                    }
                  />
                </a>

                // <a
                //   href={require("./resume.pdf")}
                //   download="Resume.pdf"
                //   className="download-link-button"
                // >
                //   <Button text="Download my resume" />
                // </a>
              )}
            </div>
          </div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2, duration: 1 }}
          className="greeting-image-div"
        >
          {illustration.animated ? (
            <DisplayLottie animationData={landingPerson} />
          ) : (
            <img
              alt="man sitting on table"
              src={require("../../assets/images/manOnTable.svg")}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Greeting;
