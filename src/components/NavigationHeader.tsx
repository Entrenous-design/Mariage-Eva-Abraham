"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

interface NavigationHeaderProps {
  sections: Section[];
}

export default function NavigationHeader({ sections }: NavigationHeaderProps) {
  const [activeSection, setActiveSection] = useState<string>("mairie");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Mise à jour de la section active et détection du scroll
  useEffect(() => {
    const handleScroll = () => {
      // Détection de la section courante
      const currentScrollPos = window.scrollY + window.innerHeight / 3;
      let currentSection = sections[0]?.id;
      
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element && 
            element.offsetTop <= currentScrollPos && 
            element.offsetTop + element.clientHeight > currentScrollPos) {
          currentSection = id;
        }
      });
      
      setActiveSection(currentSection);
      
      // Détection du scroll pour l'apparence du header
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  // Fonction pour faire défiler jusqu'à une section spécifique
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 z-30 transition-all duration-300 ${
        isScrolled ? "bg-[#FCFAFB]/10 backdrop-blur-sm" : ""
      }`}
    >
      {/* Bouton de menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-16 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow-md transition-all duration-300"
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
            className="fixed top-28 right-4 bg-[#FCFAFB]/95 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden z-50"
            style={{ minWidth: "180px", maxWidth: "70vw" }}
          >
            <nav className="py-2">
              <ul className="flex flex-col">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-6 py-3 text-sm font-trajan transition-all duration-300 ${
                        activeSection === section.id
                          ? "text-[#78B64D] font-bold border-l-4 border-[#78B64D]"
                          : "text-[#81579f] hover:text-[#78B64D] hover:bg-[#FCFAFB]/50"
                      }`}
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
      
    </motion.header>
  );
}