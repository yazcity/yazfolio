import React, {useContext} from "react";
import "./Skills.scss";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import {illustration, skillsSection} from "../../portfolio";
import codingPerson from "../../assets/lottie/codingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";

import { motion } from "framer-motion";


export default function Skills() {
  const { isDark } = useContext(StyleContext);

  if (!skillsSection.display) {
    return null;
  }

  // Animation variants
  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <div className={isDark ? "dark-mode main" : "main"} id="skills">
      <div className="skills-main-div">
        {/* Left Image Section */}
        <motion.div
          className="skills-image-div"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {illustration.animated ? (
            <DisplayLottie animationData={codingPerson} />
          ) : (
            <img
              alt="Man Working"
              src={require("../../assets/images/developerActivity.svg")}
            />
          )}
        </motion.div>

        {/* Right Text Section */}
        <motion.div
          className="skills-text-div"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h1
            className={isDark ? "dark-mode skills-heading" : "skills-heading"}
          >
            {skillsSection.title}
          </h1>
          <p
            className={
              isDark
                ? "dark-mode subTitle skills-text-subtitle"
                : "subTitle skills-text-subtitle"
            }
          >
            {skillsSection.subTitle}
          </p>
          <SoftwareSkill />
          <div>
            {skillsSection.skills.map((skill, i) => (
              <p
                key={i}
                className={
                  isDark
                    ? "dark-mode subTitle skills-text"
                    : "subTitle skills-text"
                }
              >
                {skill}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
