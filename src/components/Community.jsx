import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Community.css';

gsap.registerPlugin(ScrollTrigger);

const Community = () => {
    const sectionRef = useRef(null);
    const numRef = useRef(null);
    const memberNames = [
        "Rudraksh Pandey", "Sarthak Saini", "Tanishka Agarwal", 
        "Ansh Aditya", "Radhika Maheshwari", "Ananya Khatri", 
        "Prakhar Saxena", "Sparsh Raj", "Somya Purohit", 
        "Shatakshi Bajpai", "Shambhavi"
    ];

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

        // Member Chips Entry
        const chips = document.querySelectorAll('.member-chip');
        chips.forEach((chip, i) => {
            const rotation = Math.random() * 4 - 2;
            gsap.fromTo(chip, 
                { scale: 0.8, opacity: 0, rotation: rotation },
                {
                    scale: 1,
                    opacity: 1,
                    rotation: rotation,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: '.community-grid',
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    delay: i * 0.08
                }
            );
        });
    }, []);

    return (
        <section id="community" ref={sectionRef}>
            <span className="section-num">03</span>
            <h2>code catalysts</h2>
            <div className="community-content">
                <span className="decorative-quote">"</span>
                <p>
                    <strong>Code Catalysts</strong> is a student community I'm part of at <strong>GLA University</strong>. We build actual projects - web, app, AI, design - instead of just sitting through lectures. <strong>11 people</strong>, one GitHub org, <strong>zero budget</strong>, a lot of Vercel deployments.
                </p>
            </div>
            <div className="community-grid">
                {memberNames.map((name, i) => (
                    <div 
                        key={name} 
                        className={`member-chip ${name === 'Sarthak Saini' ? 'highlight' : ''}`}
                        data-index={i}
                    >
                        {name}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Community;
