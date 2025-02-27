
import { useState, useEffect, useRef, ReactNode } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

const Magnet = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 100,
  activeTransition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  inactiveTransition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  wrapperClassName = "",
  innerClassName = "",
}: MagnetProps) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!magnetRef.current || disabled) return;

    const bounds = magnetRef.current.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );

    if (distance < padding) {
      setIsActive(true);
      const x = (e.clientX - centerX) / magnetStrength;
      const y = (e.clientY - centerY) / magnetStrength;
      setPosition({ x, y });
    } else {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [padding, disabled, magnetStrength]);

  return (
    <div
      ref={magnetRef}
      className={`relative inline-block ${wrapperClassName}`}
      style={{ cursor: "none" }}
    >
      <div
        className={`transform ${innerClassName}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
