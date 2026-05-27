import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Particles from './Particles';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Hero = ({ isVisible = true }) => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const quoteRef = useRef(null);

    useEffect(() => {
        if (!isVisible) return;

        gsap.set('.hero-character', { opacity: 1 });

        const title = titleRef.current;
        const chars = title.innerText.split('');
        title.innerHTML = chars.map(c => `<span class="char" style="will-change: transform, opacity">${c === ' ' ? '&nbsp;' : c}</span>`).join('');

        const tl = gsap.timeline();
        
        tl.to('.hero-sub .word', { 
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            stagger: 0.04,
            duration: 0.8,
            ease: "power2.out"
        })
        .to('.hero-bio', {
            duration: 1.5,
            text: {
                value: "I build ML pipelines, break things in Java, and lead a student dev team. |",
                delimiter: ""
            },
            ease: "none"
        }, "-=0.3");

        gsap.to('.hero-bio', {
            text: "I build ML pipelines, break things in Java, and lead a student dev team.",
            delay: 4,
            duration: 0.1
        });

        gsap.to(quoteRef.current, {
            x: -200,
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 2
            }
        });

        gsap.to(heroRef.current, {
            borderRadius: "0 0 150px 150px",
            scale: 0.95,
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        gsap.to('.transition-strip.primary', {
            y: -100,
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.3
            }
        });
        gsap.to('.transition-strip.secondary', {
            y: -150,
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.5
            }
        });

        const handleMouseMove = (e) => {
            const character = document.querySelector('.hero-character');
            if (!character) return;

            const rect = character.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height * 0.4;

            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const angle = Math.atan2(dy, dx);
            const distance = Math.min(10, Math.hypot(dx, dy) / 30);

            const pupils = document.querySelectorAll('.eye-pupil');
            pupils.forEach(pupil => {
                gsap.to(pupil, {
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            const tiltX = (e.clientX - window.innerWidth / 2) / 60;
            gsap.to(character, {
                rotate: 2 + tiltX,
                x: tiltX * 2,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        const blinkInterval = setInterval(() => {
            const tl = gsap.timeline();
            tl.to('#cat-eyes', {
                scaleY: 0,
                duration: 0.15,
                transformOrigin: "center"
            })
            .to('.eye-lid', {
                opacity: 1,
                duration: 0.05
            }, 0)
            .to('#cat-eyes', {
                scaleY: 1,
                duration: 0.15,
                delay: 0.1
            })
            .to('.eye-lid', {
                opacity: 0,
                duration: 0.05
            }, "-=0.15");
        }, Math.random() * 3000 + 5000);

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(blinkInterval);
        };
    }, [isVisible]);

    return (
        <section id="hero" ref={heroRef}>
            <div className="hero-quote" ref={quoteRef}>BREAK THINGS.</div>
            <Particles />
            <div className="hero-sub">
                {"CSE @ GLA University · Mathura".split(' ').map((word, i) => (
                    <span key={i} className="word-wrapper">
                        <span className="word">{word}&nbsp;</span>
                    </span>
                ))}
            </div>
            <h1 id="hero-title" ref={titleRef}>sarthak saini</h1>
            <div className="hero-bio"></div>

            <div className="transition-strip secondary">
                <div className="hero-character">
                    <svg viewBox="0 0 200 200">
                        <g className="tail">
                            <path d="M145,185 Q185,185 185,145 Q185,115 160,115" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
                            <path d="M145,185 Q185,185 185,145 Q185,115 160,115" fill="none" stroke="var(--accent)" strokeWidth="14" strokeDasharray="8 16" strokeLinecap="round" />
                        </g>
                        <path d="M40,200 C65,120 135,120 160,200 Z" fill="#fff" />
                        <path d="M45,105 Q45,65 100,65 Q155,65 155,105 Q155,145 100,145 Q45,145 45,105" fill="#fff" />
                        <path d="M60,75 Q50,15 45,20 L80,70 Z" fill="#fff" />
                        <path d="M140,75 Q150,15 155,20 L120,70 Z" fill="#fff" />
                        <circle className="blush" cx="65" cy="120" r="5" fill="#ff0000" />
                        <circle className="blush" cx="135" cy="120" r="5" fill="#ff0000" />
                        <g id="cat-eyes">
                            <circle className="eye-sclera" cx="80" cy="110" r="15" fill="#000" />
                            <g className="eye-pupil">
                                <circle cx="80" cy="110" r="5" fill="#fff" />
                                <circle cx="83" cy="107" r="2" fill="#fff" opacity="0.6" />
                            </g>
                            <circle className="eye-sclera" cx="120" cy="110" r="15" fill="#000" />
                            <g className="eye-pupil">
                                <circle cx="120" cy="110" r="5" fill="#fff" />
                                <circle cx="117" cy="107" r="2" fill="#fff" opacity="0.6" />
                            </g>
                        </g>
                        <g className="eye-lid" style={{ opacity: 0 }}>
                            <path d="M65,110 L95,110" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
                            <path d="M105,110 L135,110" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
                        </g>
                        <circle cx="100" cy="128" r="2" fill="#000" />
                        <path d="M40,115 L20,112" stroke="#000" strokeWidth="0.5" opacity="0.2" />
                        <path d="M40,125 L20,128" stroke="#000" strokeWidth="0.5" opacity="0.2" />
                        <path d="M160,115 L180,112" stroke="#000" strokeWidth="0.5" opacity="0.2" />
                        <path d="M160,125 L180,128" stroke="#000" strokeWidth="0.5" opacity="0.2" />
                    </svg>
                </div>
                <div style={{ overflow: 'hidden', width: '100%' }}>
                    <div className="strip-content reverse">
                        {[...Array(10)].map((_, i) => (
                            <span key={i}>Code Catalysts · Open Source · GLA University · System Design ·</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="transition-strip primary">
                <div style={{ overflow: 'hidden', width: '100%' }}>
                    <div className="strip-content">
                        {[...Array(10)].map((_, i) => (
                            <span key={i}>Sarthak Saini · Problem Solver · Developer · Builder ·</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
