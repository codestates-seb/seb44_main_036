import { scrollup, scrollupHover } from '@/assets/scrollup';
import { useEffect, useState } from 'react';

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`fixed w-70pxr h-70pxr right-80pxr bottom-30pxr ${isVisible ? 'block' : 'hidden'}`}
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={isHovered ? scrollupHover : scrollup} alt='scrollup'></img>
    </button>
  );
};

export default ScrollUpButton;
