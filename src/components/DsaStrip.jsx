import React, { useState } from 'react';
import gsap from 'gsap';
import './DsaStrip.css';

const DsaStrip = () => {
    const [isPaused, setIsPaused] = useState(false);

    const handleMouseEnter = (e) => {
        if (e.target.classList.contains('data-point')) {
            const originalText = e.target.innerText;
            const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
            let iteration = 0;
            
            const interval = setInterval(() => {
                e.target.innerText = originalText.split("")
                    .map((char, index) => {
                        if(index < iteration) return originalText[index];
                        return symbols[Math.floor(Math.random() * symbols.length)]
                    })
                    .join("");
                
                if(iteration >= originalText.length) clearInterval(interval);
                iteration += 1/3;
            }, 30);

            gsap.to(e.target, { 
                color: '#fff', 
                textShadow: '0 0 10px #ff0000',
                scale: 1.1,
                duration: 0.2 
            });
        }
    };

    const handleMouseLeave = (e) => {
        if (e.target.classList.contains('data-point')) {
            gsap.to(e.target, { 
                scale: 1, 
                color: 'var(--accent)', 
                textShadow: 'none',
                duration: 0.2 
            });
        }
    };

    const row1 = ["Java", "Arrays", "Strings", "Binary Search", "Two Pointers", "Recursion", "HashMaps", "Trees"];
    const row2 = ["LeetCode", "Java", "Problem Solving", "Arrays", "Graphs", "DP", "BFS", "DFS"];

    return (
        <div 
            className="data-spine-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="spine-noise"></div>
            
            {/* Background Parallax Layer */}
            <div className={`marquee-layer bg-layer ${isPaused ? 'paused' : ''}`}>
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="marquee-group">
                        {row1.concat(row2).map((word, j) => (
                            <span key={j} className="ghost-text">{word}</span>
                        ))}
                    </div>
                ))}
            </div>

            {/* Main Interactive Layer */}
            <div className={`marquee-layer main-layer ${isPaused ? 'paused' : ''}`}>
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="marquee-group">
                        {row1.concat(row2).map((word, j) => (
                            <span 
                                key={j} 
                                className="data-point"
                                onMouseEnter={handleMouseEnter} 
                                onMouseLeave={handleMouseLeave}
                            >
                                {word}
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            <div className="scanner-beam"></div>
        </div>
    );
};

export default DsaStrip;
