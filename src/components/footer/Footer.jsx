import React, { useContext } from "react";
import "./Footer.scss";
import emoji from "react-easy-emoji";
import { motion } from "framer-motion";
import StyleContext from "../../contexts/StyleContext";

export default function Footer() {
  const { isDark } = useContext(StyleContext);

  return (
    <motion.div
      className="footer-div"
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
        {emoji("This website is lovingly built ❤️ by Ahammed Yaseen")}
      </p>
      <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
        Theme by{" "}
        <a
          href="https://github.com/yazcity/yazfolio"
          target="_blank"
          rel="noreferrer"
        >
          yazFolio
        </a>
      </p>
    </motion.div>
  );
}
