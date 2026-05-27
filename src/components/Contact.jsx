import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
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

        // Lava Blobs
        gsap.to('.blob-1', {
            x: "20%", y: "10%", duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut"
        });
        gsap.to('.blob-2', {
            x: "-10%", y: "20%", duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut"
        });
        gsap.to('.blob-3', {
            x: "-15%", y: "-20%", duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut"
        });

        // Blobs Fade In
        gsap.fromTo('.blob', 
            { opacity: 0 },
            { 
                opacity: 0.3, 
                duration: 1.5, 
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%"
                }
            }
        );

        // Heading Animation
        gsap.fromTo('.talk-line-1',
            { x: -100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.contact-heading',
                    start: "top 80%"
                }
            }
        );
        gsap.fromTo('.talk-line-2',
            { x: 100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.contact-heading',
                    start: "top 80%"
                }
            }
        );

        // Icons Stagger
        gsap.fromTo('.contact-item',
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(2)",
                scrollTrigger: {
                    trigger: '.contact-links',
                    start: "top 90%"
                }
            }
        );

        // Footer Word Stagger
        const footerWords = document.querySelectorAll('.footer-word');
        gsap.fromTo(footerWords,
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.06,
                scrollTrigger: {
                    trigger: '.footer-line',
                    start: "top 95%"
                }
            }
        );

    }, []);

    const footerText = "GLA University, Mathura · open to internships and collabs";

    return (
        <section id="contact" ref={sectionRef}>
            <span className="section-num" ref={numRef}>04</span>
            <div className="lava-container">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            
            <div className="contact-heading">
                <h2 className="talk-line-1">let's</h2>
                <h2 className="talk-line-2">talk<span className="accent-period">.</span></h2>
            </div>

            <div className="contact-links">
                <a href="https://github.com/sarthaksaini041" target="_blank" rel="noreferrer" className="contact-item">
                    <div className="icon-ring"></div>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://linkedin.com/in/sarthakksaini" target="_blank" rel="noreferrer" className="contact-item">
                    <div className="icon-ring"></div>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="mailto:sarthaksaini041@gmail.com" className="contact-item">
                    <div className="icon-ring"></div>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
            </div>

            <hr className="footer-divider" />
            <p className="footer-line">
                {footerText.split(' ').map((word, i) => (
                    <span key={i} className="footer-word">{word}&nbsp;</span>
                ))}
                <span className="blinking-cursor">▌</span>
            </p>
        </section>
    );
};

export default Contact;
