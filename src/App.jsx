import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Community from './components/Community';
import DsaStrip from './components/DsaStrip';
import Contact from './components/Contact';
import NavRail from './components/NavRail';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Session storage check for preloader
    const hasVisited = sessionStorage.getItem('visited');
    if (hasVisited) {
      setLoading(false);
    }

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    const handleMouseMove = (e) => {
      gsap.to(dot, { opacity: 1, x: e.clientX, y: e.clientY, duration: 0 });
      gsap.to(ring, { opacity: 1, x: e.clientX, y: e.clientY, duration: 0.08, ease: "power3.out" });
    };

    const handleMouseDown = () => {
      gsap.to(ring, { scale: 1.4, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: "back.out(2)" });
    };

    // Hover delegation
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .interactive')) {
        document.body.classList.add('cursor-hover');
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, .interactive')) {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    // Scroll Progress
    gsap.to('#scroll-bar', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    sessionStorage.setItem('visited', 'true');
  };

  return (
    <div className="App">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <div id="cursor-dot"></div>
      <div id="cursor-ring"></div>
      
      <div id="scroll-progress">
        <div id="scroll-bar"></div>
      </div>

      <NavRail />
      
      <main>
        <Hero isVisible={!loading} />
        <About />
        <Projects />
        <DsaStrip />
        <Community />
        <Contact />
      </main>
    </div>
  );
}

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete
    });

    tl.to(".preloader-ss", {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.inOut"
    })
    .to(".preloader-overlay", {
      y: "-100%",
      duration: 0.6,
      ease: "power4.in"
    });
  }, []);

  return (
    <div className="preloader-overlay">
      <svg className="preloader-svg" viewBox="0 0 100 100">
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="preloader-ss"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: "40px",
            fill: "none",
            stroke: "#ff0000",
            strokeWidth: "0.5",
            strokeDasharray: "200",
            strokeDashoffset: "200"
          }}
        >
          SS
        </text>
      </svg>
    </div>
  );
};

export default App;
