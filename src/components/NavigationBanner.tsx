"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

interface NavigationBannerProps {
  sections?: Section[];
}

export default function NavigationBanner({ sections = [] }: NavigationBannerProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Date cible : 13 juin 2026 à 17h00
    const targetTime = new Date(2026, 5, 13, 17, 0, 0);

    const calculateCountdown = () => {
      const now = new Date();
      const difference = targetTime.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calcul initial immédiat
    calculateCountdown();

    // Mise à jour chaque seconde
    const timer = setInterval(() => {
      calculateCountdown();
    }, 1000);

    // Nettoyage
    return () => clearInterval(timer);
  }, []);

  // Fonction pour faire défiler jusqu'à une section spécifique
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 50; // 100px au-dessus de la section
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMenuOpen(false); // Ferme le menu après avoir cliqué
    }
  };

  // Animation du menu
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-purple-200/50 shadow-sm" style={{ backgroundColor: '#F8F3FF' }}>
      <div className="flex items-center justify-between px-4 py-3 h-16">
        {/* Logo à gauche */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </div>

        {/* Compte à rebours au centre */}
        <div className="flex items-center space-x-3 text-sm font-trajan" style={{ color: '#81579f' }}>
          <div className="text-center">
            <div className="text-lg font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
            <div className="text-xs">jours</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs">h</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-xs">m</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-xs">s</div>
          </div>
        </div>

        {/* Bouton de navigation à droite */}
        {sections.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-sm transition-all duration-300 hover:bg-white"
              style={{ color: "#81579f" }}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
              )}
            </button>

            {/* Menu déroulant */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute top-10 right-0 bg-white/95 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden z-50"
                  style={{ minWidth: "160px", maxWidth: "70vw" }}
                >
                  <nav className="py-2">
                    <ul className="flex flex-col">
                      {sections.map((section) => (
                        <li key={section.id}>
                          <button
                            onClick={() => scrollToSection(section.id)}
                            className="w-full text-left px-4 py-2 text-sm font-trajan transition-all duration-300 text-[#81579f] hover:text-[#8E44AD] hover:bg-purple-100/50"
                          >
                            {section.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
