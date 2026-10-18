import React from "react";
import HeroSection from "../HeroSection";
import MySkills from "../MySkills";
import AboutMe from "../AboutMe";
import MyPortfolio from "../MyPortfolio";
import Testimonial from "../Testimonial";
import ContactMe from "../ContactMe";
import Footer from "../Footer";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";
export default function Index() {
  return (
    <div>
      <NavBar />
      <section id="hero">
        <HeroSection />
      </section>

      <section id="about">
        <AboutMe />
      </section>

      <section id="skills">
        <MySkills />
      </section>

      <section id="portfolio">
        <MyPortfolio />
      </section>

      <section id="contact">
        <ContactMe />
      </section>
      <Footer />
    </div>
  );
}
