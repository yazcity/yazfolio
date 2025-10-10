import React, { createRef, useContext } from "react";
import { motion } from "framer-motion";
import "./EducationCard.scss";
import StyleContext from "../../contexts/StyleContext";

export default function EducationCard({ school }) {
  const imgRef = createRef();
  const { isDark } = useContext(StyleContext);

  const GetDescBullets = ({ descBullets }) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <li key={i} className="subTitle">
            {item}
          </li>
        ))
      : null;
  };

  if (!school.logo)
    console.error(`Image of ${school.name} is missing in education section`);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const borderVariants = {
    hidden: { width: "0%" },
    visible: { width: "100%", transition: { duration: 1.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="education-card-wrapper"
    >
      {/* Education Card */}
      <motion.div
        className="education-card"
        variants={cardVariants}
        whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.15)" }}
      >
        {school.logo && (
          <div className="education-card-left">
            <img
              crossOrigin="anonymous"
              ref={imgRef}
              className="education-roundedimg"
              src={school.logo}
              alt={school.schoolName}
            />
          </div>
        )}

        <div className="education-card-right">
          <h5 className="education-text-school">{school.schoolName}</h5>

          <div className="education-text-details">
            <h5
              className={
                isDark
                  ? "dark-mode education-text-subHeader"
                  : "education-text-subHeader"
              }
            >
              {school.subHeader}
            </h5>

            <p
              className={`${
                isDark ? "dark-mode" : ""
              } education-text-duration`}
            >
              {school.duration}
            </p>

            <p className="education-text-desc">{school.desc}</p>

            <div className="education-text-bullets">
              <ul>
                <GetDescBullets descBullets={school.descBullets} />
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Animated Border */}
      <motion.div
        className="education-card-border"
        variants={borderVariants}
      />
    </motion.div>
  );
}
