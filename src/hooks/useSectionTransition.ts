"use client";

import { useState, useEffect, useRef } from "react";

interface UseSectionTransitionProps {
  sections: string[];
  threshold?: number;
}

export function useSectionTransition({ sections, threshold = 0.1 }: UseSectionTransitionProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down'>('down');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const previousSectionRef = useRef<string>(sections[0]);

  useEffect(() => {
    // Créer l'observer pour détecter l'intersection des sections
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            
            // Déterminer la direction de la transition
            const currentIndex = sections.indexOf(sectionId);
            const previousIndex = sections.indexOf(previousSectionRef.current);
            
            if (currentIndex > previousIndex) {
              setTransitionDirection('down');
            } else if (currentIndex < previousIndex) {
              setTransitionDirection('up');
            }

            // Déclencher la transition
            setIsTransitioning(true);
            setActiveSection(sectionId);
            previousSectionRef.current = sectionId;

            // Arrêter la transition après un délai
            setTimeout(() => {
              setIsTransitioning(false);
            }, 200);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '-1% 0px -1% 0px'
      }
    );

    // Observer toutes les sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections, threshold]);

  return {
    activeSection,
    isTransitioning,
    transitionDirection
  };
}
