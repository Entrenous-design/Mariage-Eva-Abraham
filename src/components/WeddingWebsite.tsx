"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingPage from "./LandingPage";
import NavigationBanner from "./NavigationBanner";
import WeddingSection from "./WeddingSection";
import RSVPForm from "./RSVPForm";
import { useSectionTransition } from "../hooks/useSectionTransition";

const sections = [
  { id: "mairie", label: "Mairie" },
  { id: "after-mairie", label: "After Mairie" },
  { id: "synagogue", label: "Houppa" },
  { id: "reception", label: "beach party" },
  { id: "rsvp", label: "RSVP" },
];

export default function WeddingWebsite() {
  const [showLanding, setShowLanding] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Utiliser le hook de transition
  const { activeSection, isTransitioning, transitionDirection } = useSectionTransition({
    sections: sections.map(s => s.id),
    threshold: 0.3
  });

  const handleEnter = () => {
    setShowLanding(false);
    // Start music
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Audio autoplay prevented:", error);
      });
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  useEffect(() => {
    // Preload audio with lazy loading strategy
    if (audioRef.current) {
      // Set preload to metadata only to avoid downloading the full file initially
      audioRef.current.preload = "metadata";
      
      // Load the audio file
      audioRef.current.load();
      
      // Optional: Preload the full file after a delay to avoid blocking initial page load
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.preload = "auto";
          audioRef.current.load();
        }
      }, 1000); // 2 seconds delay
    }
  }, []);

  return (
    <div
      className="min-h-screen font-trajan"
      style={{ backgroundColor: "#FCFAFB" }}
    >
      {/* Background Music */}
      <audio ref={audioRef} loop preload="metadata">
        <source src="https://files.catbox.moe/j0442a.mp3" type="audio/mpeg" />
      </audio>

      {/* Mute Button */}
      {!showLanding && (
        <button
          onClick={handleMuteToggle}
          className="fixed top-2 left-2 z-40 flex items-center justify-center transition-all duration-300 text-xl font-bold opacity-60 hover:opacity-100 p-4"
          style={{
            color: "#81579f",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          title={isMuted ? "Activer le son" : "Désactiver le son"}
        >
          {isMuted ? "✕" : "♪"}
        </button>
      )}

      {/* Landing Page */}
      <AnimatePresence>
        {showLanding && <LandingPage onEnter={handleEnter} />}
      </AnimatePresence>

      {/* Navigation Banner */}
      {!showLanding && <NavigationBanner sections={sections} />}

      {/* Main Content avec effet de transition */}
      {!showLanding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-24"
        >
          {/* City Hall Section */}
          <WeddingSection
            id="mairie"
            title=""
            backgroundImage="/2.svg"
            isActive={activeSection === "mairie"}
            isTransitioning={isTransitioning && activeSection === "mairie"}
            transitionDirection={transitionDirection}
          >
          </WeddingSection>

          {/* After City Hall Section */}
          <WeddingSection
            id="after-mairie"
            title=""
            backgroundImage="/3.svg"
            isActive={activeSection === "after-mairie"}
            isTransitioning={isTransitioning && activeSection === "after-mairie"}
            transitionDirection={transitionDirection}
          >
          </WeddingSection>

          {/* Synagogue Section */}
          <WeddingSection
            id="synagogue"
            title=""
            backgroundImage="/4.svg"
            isActive={activeSection === "synagogue"}
            isTransitioning={isTransitioning && activeSection === "synagogue"}
            transitionDirection={transitionDirection}
          >
          </WeddingSection>

          {/* Reception Section */}
          <WeddingSection
            id="reception"
            title=""
            backgroundImage="/6.svg"
            isActive={activeSection === "reception"}
            isTransitioning={isTransitioning && activeSection === "reception"}
            transitionDirection={transitionDirection}
          >
          </WeddingSection>

          {/* Additional Section */}
          <WeddingSection
            id="additional"
            title=""
            backgroundImage="/6.svg"
            isActive={activeSection === "additional"}
            isTransitioning={isTransitioning && activeSection === "additional"}
            transitionDirection={transitionDirection}
          >
          </WeddingSection>

          {/* RSVP Section */}
          <WeddingSection
            id="rsvp"
            title=""
            backgroundImage=""
            isRSVP={true}
            isActive={activeSection === "rsvp"}
            isTransitioning={isTransitioning && activeSection === "rsvp"}
            transitionDirection={transitionDirection}
          >
            <RSVPForm />
          </WeddingSection>
        </motion.div>
      )}
    </div>
  );
}