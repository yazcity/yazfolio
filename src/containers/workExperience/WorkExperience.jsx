import React, { useContext } from "react";
import "./WorkExperience.scss";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import { workExperiences } from "../../portfolio";
import { motion } from "framer-motion";
import StyleContext from "../../contexts/StyleContext";

export default function WorkExperience() {
  const { isDark } = useContext(StyleContext);

  // Animation configuration
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

  if (workExperiences.display) {
    return (
      <div id="experience">
        <motion.div
          className="experience-container"
          id="workExperience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div>
            <h1 className="experience-heading">Experiences</h1>
            <div className="experience-cards-div">
              {workExperiences.experience.map((card, i) => (
                <ExperienceCard
                  key={i}
                  isDark={isDark}
                  cardInfo={{
                    company: card.company,
                    desc: card.desc,
                    date: card.date,
                    companylogo: card.companylogo,
                    role: card.role,
                    descBullets: card.descBullets,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}
