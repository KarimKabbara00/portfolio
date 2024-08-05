import React from "react";
import { LandingSection } from "./components/LandingSection/LandingSection";
import { AboutMe } from "./components/About/AboutMe";
import { Portfolio } from "./components/Portfolio/Portfolio";
import { Contact } from "./components/Contact/Contact";

function App() {
  return (
    <div className="flex flex-col">
      <LandingSection />
      <AboutMe />
      <Portfolio />
      <Contact />
    </div>
  );
}

export default App;
