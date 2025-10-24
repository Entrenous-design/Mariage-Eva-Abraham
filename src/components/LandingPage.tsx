"use client";

import { motion } from "framer-motion";

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundImage: "url('/1.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "transparent",
      }}
    >
      <motion.button
        onClick={onEnter}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 px-3 sm:px-6 py-1 sm:py-2 text-sm sm:text-lg font-trajan pointer-events-auto"
        style={{
          color: "#81579f",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#78B64D";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#81579f";
        }}
      >
        Ouvrir l'invitation
      </motion.button>
    </motion.div>
  );
}