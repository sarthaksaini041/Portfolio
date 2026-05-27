import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const numRef = useRef(null);
    const floatTweens = useRef([]);

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

        // Heading Animation
        const heading = sectionRef.current.querySelector('h2');
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

        gsap.fromTo('#projects', 
            { borderTopLeftRadius: "200px", borderTopRightRadius: "200px" },
            { 
                borderTopLeftRadius: "0px", 
                borderTopRightRadius: "0px",
                scrollTrigger: {
                    trigger: '#projects',
                    start: "top 95%",
                    end: "top 5%",
                    scrub: 1
                }
            }
        );

        // Project Card Perspective Entrance
        gsap.fromTo('.project-card', 
            { y: 80, opacity: 0, rotateX: 15 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.project-grid',
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Floating animation with varied speeds
        if (window.innerWidth > 768) {
            const cards = document.querySelectorAll('.project-card');
            const speeds = [3, 4, 3.5];
            cards.forEach((card, i) => {
                const tween = gsap.to(card, {
                    y: "-=10",
                    duration: speeds[i % speeds.length],
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.2
                });
                floatTweens.current.push(tween);
            });
        }

        return () => {
            floatTweens.current.forEach(t => t.kill());
        };
    }, []);

    const handleMouseEnter = (i) => {
        if (floatTweens.current[i]) floatTweens.current[i].pause();
    };

    const handleMouseLeave = (i) => {
        if (floatTweens.current[i]) floatTweens.current[i].resume();
    };

    const projects = [
        {
            tags: ["Python", "ML Pipeline", "DVC", "MLflow"],
            title: "Heart Disease Prediction Pipeline",
            desc: "A production-style ML pipeline that actually follows proper software practices - DVC for reproducibility, MLflow for experiment tracking, feature engineering with derived indicators like cholesterol-age ratio.",
            link: "https://github.com/sarthaksaini041/HealthcareAnalysis"
        },
        {
            tags: ["Python", "Random Forest", "Streamlit"],
            title: "Retail Demand Forecasting",
            desc: "Predicts how many units of a product a store will sell given its category, region, price, discounts, and whether it's a holiday. Compared Linear Regression, Decision Trees, and Random Forest.",
            link: "https://github.com/sarthaksaini041/Product-Predict"
        },
        {
            tags: ["JavaScript", "Vite", "Supabase", "Vercel"],
            title: "Code Catalysts - Student Builder Community",
            desc: "Built the entire website for our college tech community from scratch. Full application pipeline, admin portal, Supabase backend, deployed on Vercel.",
            link: "https://github.com/sarthaksaini041/CodeCatalysts"
        }
    ];

    return (
        <section id="projects" ref={sectionRef}>
            <span className="section-num" ref={numRef}>02</span>
            <h2>stuff i've built</h2>
            <div className="project-grid" style={{ transformPerspective: 800 }}>
                {projects.map((project, i) => (
                    <div 
                        key={i} 
                        className="project-card"
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={() => handleMouseLeave(i)}
                    >
                        <span className="project-id">0{i + 1}</span>
                        <div className="project-card-inner">
                            <div className="project-tags">
                                {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                            </div>
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.desc}</p>
                        </div>
                        <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                            <span className="link-text">{project.link.replace('https://', '')}</span>
                            <span className="link-arrow">→</span>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
