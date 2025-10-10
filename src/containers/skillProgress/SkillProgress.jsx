import React from "react";
import "./SkillProgress.scss";
import {illustration, techStack} from "../../portfolio";
import { motion } from "framer-motion";
import Build from "../../assets/lottie/build";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";

export default function SkillProgress() {
  if (!techStack.viewSkillBars) {
    return null;
  }

  // Motion animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="skills-container"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="skills-bar">
        <h1 className="skills-heading">Proficiency</h1>
        {techStack.experience.map((exp, i) => {
          const progressStyle = { width: exp.progressPercentage };
          return (
            <div key={i} className="skill">
              <p>{exp.Stack}</p>
              <div className="meter">
                <span style={progressStyle}></span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="skills-image">
        {illustration.animated ? (
          <DisplayLottie animationData={Build} />
        ) : (
          <img
            alt="Skills"
            src={require("../../assets/images/skill.svg")}
          />
        )}
      </div>
    </motion.div>
  );
}