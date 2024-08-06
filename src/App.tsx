import React, { useEffect, useState } from "react";
import { LandingSection } from "./components/LandingSection/LandingSection";
import { AboutMe } from "./components/About/AboutMe";
import { Portfolio } from "./components/Portfolio/Portfolio";
import { Contact } from "./components/Contact/Contact";
import { Navigation } from "./components/shared/Navigation";

function App() {
  const [landingInView, setLandingInView] = useState<boolean>(false);
  const [aboutInView, setAboutInView] = useState<boolean>(false);
  const [portfolioInView, setPortfolioInView] = useState<boolean>(false);
  const [contactInView, setContactInView] = useState<boolean>(false);

  return (
    <div className="relative m-0 flex flex-col overflow-x-hidden p-0">
      <LandingSection landingInView={landingInView} setLandingInView={setLandingInView} />
      <AboutMe aboutInView={aboutInView} setAboutInView={setAboutInView} />
      <Portfolio portfolioInView={portfolioInView} setPortfolioInView={setPortfolioInView} />
      <Contact contactInView={contactInView} setContactInView={setContactInView} />
      <Navigation landingInView={landingInView} aboutInView={aboutInView} portfolioInView={portfolioInView} contactInView={contactInView} />
    </div>
  );
}

export default App;
