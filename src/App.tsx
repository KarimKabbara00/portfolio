import React, { useState, useEffect } from "react";
import { LandingSection } from "./components/LandingSection/LandingSection";
import { AboutMe } from "./components/About/AboutMe";
import { Portfolio } from "./components/Portfolio/Portfolio";
import { Contact } from "./components/Contact/Contact";
import { Navigation } from "./components/shared/Navigation";
import { setUpBackgroundEffect } from "./helperFunctions";
import { BackgroundEffects } from "./components/shared/BackgroundEffect";

interface EffectType {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: string;
  size: string;
}

function App() {
  const [landingInView, setLandingInView] = useState<boolean>(false);
  const [aboutInView, setAboutInView] = useState<boolean>(false);
  const [portfolioInView, setPortfolioInView] = useState<boolean>(false);
  const [contactInView, setContactInView] = useState<boolean>(false);

  const [backgroundEffect, setBackgroundEffect] = useState<EffectType[]>([]);
  const [backgroundEffectTwo, setBackgroundEffectTwo] = useState<EffectType[]>([]);

  // initialize background effect
  useEffect(() => {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // initiate instantly, particles disappear after 60s
    setBackgroundEffect(setUpBackgroundEffect(windowWidth, windowHeight));

    setTimeout(() => {
      setBackgroundEffectTwo(setUpBackgroundEffect(windowWidth, windowHeight));
    }, 10000);

    const particleInterval = setInterval(() => {
      setBackgroundEffect(setUpBackgroundEffect(windowWidth, windowHeight));
    }, 60000);

    const particleIntervalTwo = setInterval(() => {
      setBackgroundEffectTwo(setUpBackgroundEffect(windowWidth, windowHeight));
    }, 60000);

    return () => {
      clearInterval(particleInterval);
      clearInterval(particleIntervalTwo);
    };
  }, []);

  return (
    <div className="z-1 relative m-0 flex flex-col overflow-x-hidden p-0">
      <BackgroundEffects effects={backgroundEffect} />
      <BackgroundEffects effects={backgroundEffectTwo} />
      <LandingSection landingInView={landingInView} setLandingInView={setLandingInView} />
      <AboutMe aboutInView={aboutInView} setAboutInView={setAboutInView} />
      <Portfolio portfolioInView={portfolioInView} setPortfolioInView={setPortfolioInView} />
      <Contact contactInView={contactInView} setContactInView={setContactInView} />
      <Navigation landingInView={landingInView} aboutInView={aboutInView} portfolioInView={portfolioInView} contactInView={contactInView} />
    </div>
  );
}

export default App;
