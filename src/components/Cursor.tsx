import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position coordinates using motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring settings for smooth lagging following physics
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop/mouse pointing systems
    const hasMediaMatch = window.matchMedia('(pointer: fine)').matches;
    if (!hasMediaMatch) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Track active interactable classes
    const onMouseEnterInteractable = () => setIsHovered(true);
    const onMouseLeaveInteractable = () => setIsHovered(false);

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Find and attach listeners to active hover components
    const attachListeners = () => {
      const elements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .interactive-card');
      elements.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterInteractable);
        el.addEventListener('mouseleave', onMouseLeaveInteractable);
      });
    };

    attachListeners();

    // Re-bind occasionally when DOM changes
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner precise pointing dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#131313] rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? '#64748b' : '#131313',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      />

      {/* Outer spring follower halo */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 64 : 40,
          height: isHovered ? 64 : 40,
          border: isHovered
            ? '1px solid rgba(13, 13, 13, 0.4)'
            : '1.5px solid rgba(13, 13, 13, 0.12)',
          backgroundColor: isHovered ? 'rgba(76, 91, 113, 0.05)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      />
    </>
  );
}
