import { useEffect, useState } from 'react';

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            // Use requestAnimationFrame for smoother performance if needed, 
            // but direct state update is often fine for simple cursors in React 18+ 
            // due to automatic batching. For very high performance, direct DOM manipulation is better.
            // Here we use a simple approach first.
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', updatePosition);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if the target is interactive
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('cursor-hover-trigger');

            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mouseover', handleMouseOver);
        return () => window.removeEventListener('mouseover', handleMouseOver);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="fixed pointer-events-none z-[9999] flex items-center justify-center transition-transform duration-100 ease-out"
            style={{
                left: position.x,
                top: position.y,
                transform: 'translate(-50%, -50%)',
            }}
        >
            {/* Outer Glow */}
            <div
                className={`
          rounded-full bg-primary/30 blur-md transition-all duration-300 ease-out
          ${isHovering ? 'w-30 h-30 bg-primary/20' : 'w-16 h-16'}
        `}
            />

            {/* Inner Dot */}
            <div
                className={`
          absolute rounded-full bg-primary transition-all duration-300 ease-out
          ${isHovering ? 'w-3 h-3 opacity-80' : 'w-4 h-4'}
        `}
            />
        </div>
    );
};
