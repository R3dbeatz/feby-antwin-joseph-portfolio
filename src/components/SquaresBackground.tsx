
import { useCallback } from "react";
import { motion } from "framer-motion";

const SquaresBackground = () => {
  const renderSquares = useCallback(() => {
    const squares = [];
    for (let i = 0; i < 20; i++) {
      const randomSize = Math.random() * (100 - 20) + 20;
      squares.push(
        <motion.div
          key={i}
          className="absolute bg-gradient-to-br from-primary/20 to-accent/20"
          style={{
            width: randomSize,
            height: randomSize,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 400 - 200],
            y: [0, Math.random() * 400 - 200],
            rotate: [0, Math.random() * 360],
            opacity: [0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      );
    }
    return squares;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {renderSquares()}
    </div>
  );
};

export default SquaresBackground;
