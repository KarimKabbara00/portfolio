import React, { useState, useEffect } from "react";
import { LandingSection } from "./components/LandingSection/LandingSection";
import { AboutMe } from "./components/About/AboutMe";
import { Portfolio } from "./components/Portfolio/Portfolio";
import { Contact } from "./components/Contact/Contact";
import { Navigation } from "./components/shared/Navigation";
import { ParticleEffect } from "./components/shared/BackgroundEffect";
import { AskGPTButton } from "./components/AskGPT/AskGPTButton";
import { GPTModal } from "./components/AskGPT/GPTModal";

function App() {
  const [landingInView, setLandingInView] = useState<boolean>(false);
  const [aboutInView, setAboutInView] = useState<boolean>(false);
  const [portfolioInView, setPortfolioInView] = useState<boolean>(false);
  const [contactInView, setContactInView] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);
  const [showGPTModal, setShowGPTModal] = useState<boolean>(false);

  // app wide event listeners
  useEffect(() => {
    // hide nav bar
    const handleNavClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const { id } = target;
      if (!id.includes("nav")) {
        setShowNav(false);
      }
    };

    // hide blur backdrop (ChatGPT)
    const handleBlurClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const { id } = target;
      if (id === "chatGPTBlur") {
        setShowGPTModal(false);
      }
    };

    // close if anything but ids are clicked
    window.addEventListener("click", handleNavClick);
    window.addEventListener("click", handleBlurClick);

    return () => {
      window.removeEventListener("click", handleNavClick);
      window.removeEventListener("click", handleBlurClick);
    };
  }, []);

  // disallow scroll when chatGPT modal is opened
  useEffect(() => {
    document.body.style.overflow = showGPTModal ? "hidden" : "auto";
  }, [showGPTModal]);

  return (
    <div className="z-1 relative m-0 flex h-full flex-col overflow-x-hidden">
      <div className="-z-1 fixed h-full w-full">
        <ParticleEffect />
      </div>
      <AskGPTButton setShowGPTModal={setShowGPTModal} />
      <GPTModal showGPTModal={showGPTModal} setShowGPTModal={setShowGPTModal} />
      <Navigation showNav={showNav} setShowNav={setShowNav} landingInView={landingInView} aboutInView={aboutInView} portfolioInView={portfolioInView} contactInView={contactInView} />
      <LandingSection landingInView={landingInView} setLandingInView={setLandingInView} />
      <AboutMe aboutInView={aboutInView} setAboutInView={setAboutInView} />
      <Portfolio portfolioInView={portfolioInView} setPortfolioInView={setPortfolioInView} />
      <Contact contactInView={contactInView} setContactInView={setContactInView} />
    </div>
  );
}

export default App;

// light mode?
