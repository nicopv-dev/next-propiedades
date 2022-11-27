import { useRef, useState, useEffect } from 'react';

// is scroll down
export default function useScroll() {
  const scrollYRef = useRef<number>(0);
  const [goingUp, setGoingUp] = useState<boolean>(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 0) {
      setGoingUp(true);
    } else {
      setGoingUp(false);
    }
    scrollYRef.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [goingUp]);

  return { goingUp, scrollYRef };
}
