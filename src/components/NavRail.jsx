import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './NavRail.css';

const NavRail = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [scrolled, setScrolled] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);
    const navRef = useRef(null);
    const indicatorRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'about', 'projects', 'community', 'contact'];
            let current = 'hero';
            
            for (const id of sections) {
                const section = document.getElementById(id);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 200) current = id;
                }
            }
            setActiveSection(current);
            setScrolled(window.scrollY > 50);

            // Light mode detection for sections with white background
            const lightSections = ['projects', 'community'];
            let overLight = false;
            
            for (const id of lightSections) {
                const section = document.getElementById(id);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    // If navbar (80px height) is within the section
                    if (rect.top <= 80 && rect.bottom >= 0) {
                        overLight = true;
                        break;
                    }
                }
            }
            setIsLightMode(overLight);
        };

        window.addEventListener('scroll', handleScroll);
        
        // Entrance animation
        gsap.fromTo(navRef.current, 
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 1.8 }
        );

        gsap.fromTo(".nav-item", 
            { opacity: 0, y: -20 },
            { opacity: 0.6, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 2 }
        );

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const activeLink = document.querySelector(`.nav-item[data-section="${activeSection}"]`);
        if (activeLink && indicatorRef.current) {
            const rect = activeLink.getBoundingClientRect();
            const navRect = navRef.current.getBoundingClientRect();
            gsap.to(indicatorRef.current, {
                x: rect.left - navRect.left + rect.width / 2 - 2,
                opacity: 1,
                duration: 0.4,
                ease: "power3.inOut"
            });
        }
    }, [activeSection]);

    return (
        <div ref={navRef} className={`nav-rail ${scrolled ? 'scrolled' : ''} ${isLightMode ? 'light-mode' : ''}`}>
            <div ref={indicatorRef} className="nav-indicator"></div>
            <a href="#hero" data-section="hero" className={`nav-item ${activeSection === 'hero' ? 'active' : ''}`}>
                <span className="nav-label" data-text="Home">Home</span>
            </a>
            <a href="#about" data-section="about" className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}>
                <span className="nav-label" data-text="About">About</span>
            </a>
            <a href="#projects" data-section="projects" className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}>
                <span className="nav-label" data-text="Work">Work</span>
            </a>
            <a href="#contact" data-section="contact" className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}>
                <span className="nav-label" data-text="Contact">Contact</span>
            </a>
        </div>
    );
};

export default NavRail;
