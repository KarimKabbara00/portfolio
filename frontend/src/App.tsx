import React, { useState, useEffect } from "react";
import { LandingSection } from "./components/LandingSection/LandingSection";
import { AboutMe } from "./components/About/AboutMe";
import { Portfolio } from "./components/Portfolio/Portfolio";
import { Contact } from "./components/Contact/Contact";
import { Navigation } from "./components/shared/Navigation";
import { ParticleEffect } from "./components/shared/ParticleEffect";
import { AskGPTButton } from "./components/AskGPT/AskGPTButton";
import { GPTModal } from "./components/AskGPT/GPTModal";

function App() {
  const [landingInView, setLandingInView] = useState<boolean>(false);
  const [aboutInView, setAboutInView] = useState<boolean>(false);
  const [portfolioInView, setPortfolioInView] = useState<boolean>(false);
  const [contactInView, setContactInView] = useState<boolean>(false);
  const [showGPTModal, setShowGPTModal] = useState<boolean>(false);

  // app wide event listeners
  useEffect(() => {
    // hide blur backdrop (ChatGPT)
    const handleBlurClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const { id } = target;
      if (id === "chatGPTBlur") {
        setShowGPTModal(false);
      }
    };

    window.addEventListener("click", handleBlurClick);

    return () => {
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
      <Navigation landingInView={landingInView} aboutInView={aboutInView} portfolioInView={portfolioInView} contactInView={contactInView} />
      <LandingSection landingInView={landingInView} setLandingInView={setLandingInView} />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <AboutMe aboutInView={aboutInView} setAboutInView={setAboutInView} />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <Portfolio setPortfolioInView={setPortfolioInView} />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <Contact contactInView={contactInView} setContactInView={setContactInView} />
    </div>
  );
}

export default App;

// light mode?
