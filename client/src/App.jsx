import { useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import {
  navItems,
  hero,
  socialLinks,
  personalInfo,
  interests,
  technicalSkills,
  softSkills,
  education,
  experience,
  trainings,
  profileSummary,
  projects
} from './data/portfolioData';

export default function App() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main > section'));
    if (sections.length === 0) {
      return undefined;
    }

    sections.forEach((section, index) => {
      section.classList.add('page-transition');
      section.style.setProperty('--reveal-delay', `${Math.min(index * 50, 220)}ms`);
    });

    const firstSection = sections[0];
    firstSection.classList.add('page-transition-visible');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('page-transition-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -12% 0px'
      }
    );

    sections.slice(1).forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove('page-transition', 'page-transition-visible');
        section.style.removeProperty('--reveal-delay');
      });
    };
  }, []);

  return (
    <>
      <Header items={navItems} />
      <main>
        <About
          hero={hero}
          socialLinks={socialLinks}
          personalInfo={personalInfo}
          interests={interests}
        />
        <Skills technicalSkills={technicalSkills} softSkills={softSkills} />
        <Timeline
          education={education}
          experience={experience}
          trainings={trainings}
          profileSummary={profileSummary}
        />
        <Projects projects={projects} />
        <Contact />
      </main>
      <Footer socialLinks={socialLinks} />
    </>
  );
}
