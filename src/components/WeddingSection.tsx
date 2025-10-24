"use client";

import { ReactNode, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WeddingSectionProps {
  id: string;
  title: string;
  backgroundImage: string;
  children?: ReactNode;
  isRSVP?: boolean;
  isActive?: boolean;
  isTransitioning?: boolean;
  transitionDirection?: 'up' | 'down';
}

export default function WeddingSection({
  id,
  title,
  backgroundImage,
  children,
  isRSVP = false,
  isActive = false,
  isTransitioning = false,
  transitionDirection = 'down',
}: WeddingSectionProps) {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(ref, { 
    amount: 0.01,
    margin: "-1% 0px -1% 0px"
  });

  // Marquer comme animé une fois qu'elle est en vue
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Animation variants pour l'effet de transition
  const fadeVariants = {
    hidden: {
      opacity: 0,
      scale: 1.1,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.9,
    }
  };

  // Animation pour le contenu
  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
    }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative flex flex-col items-center justify-center ${
        isRSVP ? 'min-h-screen pb-24 px-4 sm:px-6 py-12 sm:py-20' : 'h-screen'
      }`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
        backgroundColor: "transparent",
        willChange: "auto",
        transform: "translateZ(0)",
      }}
      variants={fadeVariants}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      exit="exit"
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
    >
      
      {/* Content */}
      <motion.div
        className="relative z-10 text-center"
        variants={contentVariants}
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>

    </motion.section>
  );
}