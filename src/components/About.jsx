import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const numRef = useRef(null);

    useEffect(() => {
        // Section Number Parallax
        gsap.to(numRef.current, {
            y: 100,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.4
            }
        });

        // Heading Animation (Pattern for all sections)
        const heading = sectionRef.current.querySelector('h2');
        if (heading) {
            gsap.fromTo(heading, 
                { clipPath: 'inset(0 100% 0 0)' },
                { 
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Stats Count Up + Glow Pulse
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            ScrollTrigger.create({
                trigger: stat,
                start: "top 90%",
                toggleActions: "play none none reverse",
                onEnter: () => {
                    let count = { val: 0 };
                    gsap.to(count, {
                        val: target,
                        duration: 2,
                        onUpdate: () => stat.innerText = Math.floor(count.val),
                        onComplete: () => {
                            gsap.to(stat, {
                                textShadow: "0 0 40px rgba(255, 0, 0, 0.8)",
                                duration: 0.5,
                                yoyo: true,
                                repeat: 1
                            });
                        },
                        ease: "power2.out"
                    });
                }
            });
        });

        gsap.fromTo('.stat-block', 
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.stats-grid',
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Text Reveals
        document.querySelectorAll('.about-text p').forEach(p => {
            gsap.fromTo(p,
                { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: p,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Border Expansion
        gsap.fromTo('.about-text p::before', 
            { height: 0 },
            { 
                height: "100%", 
                duration: 1, 
                scrollTrigger: {
                    trigger: '.about-text',
                    start: "top 80%"
                }
            }
        );

        // Skill Chips Stagger with random Y
        const chips = document.querySelectorAll('.skill-chip');
        chips.forEach(chip => {
            gsap.fromTo(chip,
                { y: Math.random() * 20 + 15, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.skills-container',
                        start: "top 95%",
                        toggleActions: "play none none reverse"
                    },
                    delay: Math.random() * 0.2
                }
            );
        });

        // Scan line animation
        gsap.fromTo('.scan-line',
            { top: '-1px' },
            { 
                top: '100%', 
                duration: 1.5, 
                ease: "none",
                scrollTrigger: {
                    trigger: '.skills-container',
                    start: "top 90%"
                }
            }
        );

    }, []);

    const skills = ["Python", "scikit-learn", "MLflow", "DVC", "Random Forest", "Java", "JavaScript", "Supabase", "Vite", "Git", "Streamlit", "SQL"];

    return (
        <section id="about" ref={sectionRef}>
            <span className="section-num" ref={numRef}>01</span>
            <div className="stats-grid">
                <div className="stat-block">
                    <span className="stat-number" data-count="10">0</span>
                    <span className="stat-label">repos</span>
                </div>
                <div className="stat-block">
                    <span className="stat-number" data-count="3">0</span>
                    <span className="stat-label">real projects</span>
                </div>
                <div className="stat-block">
                    <span className="stat-number" data-count="1">0</span>
                    <span className="stat-label">community (Code Catalysts)</span>
                </div>
                <div className="stat-block">
                    <span className="stat-number" data-count="50">0</span>
                    <span className="stat-label">LeetCode tabs open</span>
                </div>
            </div>
            <div className="about-text">
                <p>
                    I'm a second-year CSE student who got tired of just studying algorithms and decided to actually build things. I got into ML not because it was trendy but because I wanted to see if a model could actually predict something useful.
                </p>
                <p>
                    I also help run Code Catalysts, which is basically a group of students who build instead of just attending lectures.
                </p>
                <div className="skills-container">
                    <div className="scan-line"></div>
                    {skills.map(skill => <span key={skill} className="skill-chip">{skill}</span>)}
                </div>
            </div>
        </section>
    );
};

export default About;
