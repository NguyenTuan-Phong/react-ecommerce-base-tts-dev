import { useState, useEffect } from 'react';
import '../../assets/css/TextAnimation.css';

const TextReveal = ({ text = '', interval = 200, pause = 800 }) => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const max = text.length;
    const timer = setTimeout(() => {
      let next = index + dir;
      if (next > max) {
        setDir(-1);
        next = max - 1;
      } else if (next < 0) {
        setDir(1);
        next = 1;
      }
      setIndex(next);
    }, index === 0 || index === max ? pause : interval);
    return () => clearTimeout(timer);
  }, [index, dir, text.length, interval, pause]);

  return (
    <div className="text-reveal">
      {text
        .slice(0, index)
        .split('')
        .map((ch, i) => (
          <span key={i}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
    </div>
  );
};

export default TextReveal;
