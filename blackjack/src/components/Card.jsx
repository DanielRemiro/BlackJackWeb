import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ card, index, isHidden, isRed }) => {
  // Variantes de animación
  const cardVariants = {
    initial: { opacity: 0, scale: 0.5, x: -300, y: -200, rotate: -180 },
    animate: { 
      opacity: 1, scale: 1, x: 0, y: 0, 
      rotate: (Math.random() * 6 - 3),
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }
  };

  const flipVariants = {
    hidden: { rotateY: 0 },
    visible: { rotateY: [0, 90, 0], transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      style={{ zIndex: index, perspective: 1000 }}
    >
      <motion.div
        className={`card ${isHidden ? 'hidden' : ''} ${isRed ? 'red' : ''}`}
        variants={flipVariants}
        animate={!isHidden ? "visible" : "hidden"}
      >
        {isHidden ? '?' : `${card.value}${card.suit}`}
      </motion.div>
    </motion.div>
  );
};

export default Card;