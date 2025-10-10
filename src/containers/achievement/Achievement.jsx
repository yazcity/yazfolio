import React, { useContext } from "react";
import "./Achievement.scss";
import AchievementCard from "../../components/achievementCard/AchievementCard";
import { achievementSection } from "../../portfolio";
import { motion } from "framer-motion";
import StyleContext from "../../contexts/StyleContext";

export default function Achievement() {
  const { isDark } = useContext(StyleContext);

  if (!achievementSection.display) return null;

  return (
    <motion.div
      className="main"
      id="achievements"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="achievement-main-div">
        <div className="achievement-header">
          <h1
            className={
              isDark
                ? "dark-mode heading achievement-heading"
                : "heading achievement-heading"
            }
          >
            {achievementSection.title}
          </h1>
          <p
            className={
              isDark
                ? "dark-mode subTitle achievement-subtitle"
                : "subTitle achievement-subtitle"
            }
          >
            {achievementSection.subtitle}
          </p>
        </div>

        <div className="achievement-cards-div">
          {achievementSection.achievementsCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <AchievementCard
                isDark={isDark}
                cardInfo={{
                  title: card.title,
                  description: card.subtitle,
                  image: card.image,
                  imageAlt: card.imageAlt,
                  footer: card.footerLink,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
