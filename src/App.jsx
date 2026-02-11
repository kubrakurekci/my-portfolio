import React from "react";
import Navigation from "./components/Navigation.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import Timeline from "./components/Timeline.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx"
import Contact from "./components/Contact.jsx"
function App() {
  return (
    <div>
      <Navigation />
      <Hero />
      <Timeline />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
