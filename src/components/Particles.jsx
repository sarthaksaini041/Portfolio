import React, { useEffect, useRef } from 'react';

const Particles = () => {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        const spacing = 50;
        const dots = [];
        const whiteDots = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            dots.length = 0;
            whiteDots.length = 0;
            
            // Primary Dots
            for (let x = spacing / 2; x < width; x += spacing) {
                for (let y = spacing / 2; y < height; y += spacing) {
                    dots.push({ x, y, baseX: x, baseY: y, radius: 0.8, opacity: 0.1 });
                }
            }

            // Secondary Dots
            const whiteSpacing = spacing * 1.5;
            for (let x = whiteSpacing / 2; x < width; x += whiteSpacing) {
                for (let y = whiteSpacing / 2; y < height; y += whiteSpacing) {
                    whiteDots.push({ x, y, baseX: x, baseY: y, radius: 0.5, opacity: 0.03 });
                }
            }
        };

        let mouseX = -1000, mouseY = -1000;
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const lerp = (a, b, n) => (1 - n) * a + n * b;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const allDots = [...dots, ...whiteDots];

            // Update and Draw Dots
            allDots.forEach((dot, i) => {
                const dx = mouseX - dot.x;
                const dy = mouseY - dot.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 120;

                let targetRadius = dot.baseRadius || (dot === whiteDots[i - dots.length] ? 0.5 : 0.8);
                let targetOpacity = dot === whiteDots[i - dots.length] ? 0.03 : 0.1;

                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    targetRadius = 2;
                    targetOpacity = 0.3;
                    dot.x = lerp(dot.x, dot.baseX - dx * force * 0.15, 0.1);
                    dot.y = lerp(dot.y, dot.baseY - dy * force * 0.15, 0.1);
                } else {
                    dot.x = lerp(dot.x, dot.baseX, 0.05);
                    dot.y = lerp(dot.y, dot.baseY, 0.05);
                }

                dot.radius = lerp(dot.radius, targetRadius, 0.1);
                dot.opacity = lerp(dot.opacity, targetOpacity, 0.1);

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                
                // Pure White, very dim
                ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
                
                ctx.fill();
            });

            // Draw Connections (White, very dim)
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            for (let i = 0; i < allDots.length; i++) {
                for (let j = i + 1; j < allDots.length; j++) {
                    const d1 = allDots[i];
                    const d2 = allDots[j];
                    const dx = d1.x - d2.x;
                    const dy = d1.y - d2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 60) {
                        const opacity = (1 - dist / 60) * 0.03;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.moveTo(d1.x, d1.y);
                        ctx.lineTo(d2.x, d2.y);
                    }
                }
            }
            ctx.stroke();

            rafRef.current = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} id="hero-canvas" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />;
};

export default Particles;
