import React, {useEffect, useState} from "react";
import Header from '../components/header/Header';
import {useLocalStorage} from "../hooks/useLocalStorage";
import {StyleProvider} from "../contexts/StyleContext";
import SplashScreen from "./splashScreen/SplashScreen";
import {splashScreen} from "../portfolio";
import "./Main.scss";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import SkillProgress from "./skillProgress/SkillProgress";
import Education from "./education/Education";
import WorkExperience from "./workExperience/WorkExperience";
import Projects from "./projects/Projects";
import StartupProject from "./StartupProjects/StartupProject";
import Achievement from "./achievement/Achievement";
import Blogs from "./blogs/Blogs";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "./scrollToTopButton/ScrollToTopButton";
import Profile from "./profile/profile";

const Main = ()=> {

  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] = useState(true);

  useEffect(() => {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, []);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
        {isShowingSplashAnimation && splashScreen.enabled ? (
          <SplashScreen />
        ) : (
          <>
            <Header />
            <Greeting/>
            <Skills />
            <SkillProgress />
            <Education />
            <WorkExperience/>
            <Projects />
            <StartupProject/>
            <Achievement/>
            <Blogs />
            <Profile/>
            <Footer />
            <ScrollToTopButton/>
            {/* 
            <Talks />
            <Twitter />
            <Podcast />
            <Profile />
            <Footer />
            <ScrollToTopButton /> */}
          </>
        )}
      </StyleProvider>
    </div>
  )
}

export default Main
