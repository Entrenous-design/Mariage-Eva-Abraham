"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { API_CONFIG } from "../config/api";

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    mairie: { attending: "", count: "" },
    afterMairie: { attending: "", count: "" },
    synagogue: { attending: "", count: "" },
    reception: { attending: "", count: "" },
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Réinitialiser les états
    setHasError(false);
    
    // Si on a eu une erreur et qu'on reclique, on permet de resoumettre
    if (hasError && submitted) {
      setSubmitted(false);
      return;
    }

    // Validation des champs requis
    if (!formData.lastName.trim()) {
      setHasError(true);
      setSubmitted(true);
      alert("Veuillez entrer votre nom");
      return;
    }
    
    if (!formData.firstName.trim()) {
      setHasError(true);
      setSubmitted(true);
      alert("Veuillez entrer votre prénom");
      return;
    }

    // Valider que chaque événement a une réponse
    if (!formData.mairie.attending) {
      setHasError(true);
      setSubmitted(true);
      alert("Veuillez répondre pour la Mairie");
      return;
    }

    if (formData.mairie.attending === "Oui" && !formData.mairie.count.trim()) {
      setHasError(true);
      setSubmitted(true);
      alert("Veuillez entrer le nombre de personnes pour la Mairie");
      return;
    }

    if (!formData.afterMairie.attending) {
      setHasError(true);
      setSubmitted(true);
      alert("Veuillez répondre pour l'After-Mairie");
      return;
    }

    if (formData.afterMairie.attending === "Oui" && !formData.afterMairie.count.trim()) {
      setHasError(true);
      setSubmitted(true);
      alert("Veuillez entrer le nombre de personnes pour l'After-Mairie");
      return;
    }

    if (!formData.synagogue.attending) {
      setHasError(true);
      setSubmitted(true);
      alert("Veuillez répondre pour la Houppa");
      return;
    }

    if (formData.synagogue.attending === "Oui" && !formData.synagogue.count.trim()) {
      setHasError(true);
      setSubmitted(true);
      alert("Veuillez entrer le nombre de personnes pour la Houppa");
      return;
    }

    if (!formData.reception.attending) {
      setHasError(true);
      setSubmitted(true);
      alert("Veuillez répondre pour la Beach Party");
      return;
    }

    if (formData.reception.attending === "Oui" && !formData.reception.count.trim()) {
      setHasError(true);
      setSubmitted(true);
      alert("Veuillez entrer le nombre de personnes pour la Beach Party");
      return;
    }
    
    // Activer l'animation de chargement
    setIsLoading(true);
    
    // Préparer les paramètres avec encodage correct
    const params = new URLSearchParams();
    params.append("lastName", formData.lastName.trim());
    params.append("firstName", formData.firstName.trim());
    params.append("mairieAttending", formData.mairie.attending);
    params.append("mairieCount", formData.mairie.count.trim());
    params.append("afterMairieAttending", formData.afterMairie.attending);
    params.append("afterMairieCount", formData.afterMairie.count.trim());
    params.append("synagogueAttending", formData.synagogue.attending);
    params.append("synagogueCount", formData.synagogue.count.trim());
    params.append("receptionAttending", formData.reception.attending);
    params.append("receptionCount", formData.reception.count.trim());

    const fullURL = "/api/gapps?" + params.toString();
    
    // Log pour le debug
    console.log("Envoi des données via proxy /api/gapps");
    console.log("Paramètres:", Object.fromEntries(params));

    // Envoyer les données via le proxy serveur
    fetch(fullURL, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    })
      .then((response) => {
        console.log("Réponse reçue du serveur:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return response.json();
      })
      .then((data) => {
        console.log("Données reçues:", data);
        
        // Désactiver l'animation de chargement
        setIsLoading(false);
        
        if (data.success || data.ok) {
          setHasError(false);
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 3000);
        } else {
          setHasError(true);
          setSubmitted(true);
          console.error("Erreur du serveur:", data.error);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi:", error);
        
        // Désactiver l'animation de chargement même en cas d'erreur
        setIsLoading(false);
        setSubmitted(true);
        setHasError(true);
        
        // Afficher l'erreur spécifique
        alert(`Erreur: ${error.message}`);
      });
  };

  // Prévenir le comportement par défaut des touches pour éviter les soumissions inattendues
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-2 sm:px-3">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <img src="/rsvp.png" alt="Form Header"  style={{ backgroundColor: 'transparent' }} />
        <div>
          <label
            htmlFor="lastName"
            className="block text-base sm:text-lg mb-2 font-trajan"
            style={{ color: "#81579f" }}
          >
            NOM
          </label>
          <input
            type="text"
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            onKeyDown={handleKeyDown}
            inputMode="text"
            autoComplete="family-name"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 font-trajan text-sm sm:text-base transition-colors duration-300 focus:outline-none text-base"
            style={{
              backgroundColor: "#FCFAFB",
              color: "#81579f",
              borderColor: "#81579f",
              fontSize: "16px", // Empêche le zoom sur iOS
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#9B59B6";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#81579f";
            }}
          />
        </div>

        <div>
          <label
            htmlFor="firstName"
            className="block text-base sm:text-lg mb-2 font-trajan"
            style={{ color: "#81579f" }}
          >
            PRÉNOM
          </label>
          <input
            type="text"
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            onKeyDown={handleKeyDown}
            inputMode="text"
            autoComplete="given-name"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 font-trajan text-sm sm:text-base transition-colors duration-300 focus:outline-none"
            style={{
              backgroundColor: "#FCFAFB",
              color: "#81579f",
              borderColor: "#81579f",
              fontSize: "16px", // Empêche le zoom sur iOS
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#9B59B6";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#81579f";
            }}
          />
        </div>

        <div className="border-t-2 border-[#81579f] my-8" />

        {/* Section Mairie */}
        <div>
          <label className="block text-base sm:text-lg mb-3 font-trajan uppercase" style={{ color: "#6A1B9A" }}>
            Mairie
          </label>
          <div className="flex gap-4 mb-4 justify-center">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="mairie"
                value="Oui"
                checked={formData.mairie.attending === "Oui"}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    mairie: { ...formData.mairie, attending: e.target.value, count: e.target.value === "Oui" ? formData.mairie.count : "" }
                  })
                }
                className="h-4 w-4 sm:h-5 sm:w-5 text-[#81579f] focus:ring-[#81579f] accent-[#81579f]"
                style={{ color: "#81579f" }}
              />
              <span className="text-base sm:text-lg font-trajan" style={{ color: "#81579f" }}>
                Oui
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="mairie"
                value="Non"
                checked={formData.mairie.attending === "Non"}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    mairie: { ...formData.mairie, attending: e.target.value, count: "" }
                  })
                }
                className="h-4 w-4 sm:h-5 sm:w-5 text-[#81579f] focus:ring-[#81579f] accent-[#81579f]"
                style={{ color: "#81579f" }}
              />
              <span className="text-base sm:text-lg font-trajan" style={{ color: "#81579f" }}>
                Non
              </span>
            </label>
          </div>
          {formData.mairie.attending === "Oui" && (
            <div>
              <label htmlFor="mairieCount" className="block text-sm mb-2 font-trajan" style={{ color: "#6A1B9A" }}>
                Nombre de personnes à la mairie *
              </label>
              <input
                type="text"
                id="mairieCount"
                required
                value={formData.mairie.count}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    mairie: { ...formData.mairie, count: e.target.value }
                  })
                }
                onKeyDown={handleKeyDown}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 font-trajan text-sm sm:text-base transition-colors duration-300 focus:outline-none"
                style={{
                  backgroundColor: "#FCFAFB",
                  color: "#81579f",
                  borderColor: "#81579f",
                  fontSize: "16px",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#9B59B6";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#81579f";
                }}
              />
            </div>
          )}
        </div>

        <div className="border-t-2 border-[#81579f] my-8" />

        {/* Section After-Mairie */}
        <div>
          <label className="block text-base sm:text-lg mb-3 font-trajan uppercase" style={{ color: "#6A1B9A" }}>
            After-Mairie
          </label>
          <div className="flex gap-4 mb-4 justify-center">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="afterMairie"
                value="Oui"
                checked={formData.afterMairie.attending === "Oui"}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    afterMairie: { ...formData.afterMairie, attending: e.target.value, count: e.target.value === "Oui" ? formData.afterMairie.count : "" }
                  })
                }
                className="h-4 w-4 sm:h-5 sm:w-5 text-[#81579f] focus:ring-[#81579f] accent-[#81579f]"
                style={{ color: "#81579f" }}
              />
              <span className="text-base sm:text-lg font-trajan" style={{ color: "#81579f" }}>
                Oui
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="afterMairie"
                value="Non"
                checked={formData.afterMairie.attending === "Non"}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    afterMairie: { ...formData.afterMairie, attending: e.target.value, count: "" }
                  })
                }
                className="h-4 w-4 sm:h-5 sm:w-5 text-[#81579f] focus:ring-[#81579f] accent-[#81579f]"
                style={{ color: "#81579f" }}
              />
              <span className="text-base sm:text-lg font-trajan" style={{ color: "#81579f" }}>
                Non
              </span>
            </label>
          </div>
          {formData.afterMairie.attending === "Oui" && (
            <div>
              <label htmlFor="afterMairieCount" className="block text-sm mb-2 font-trajan" style={{ color: "#6A1B9A" }}>
                Nombre de personnes à l'after mairie *
              </label>
              <input
                type="text"
                id="afterMairieCount"
                required
                value={formData.afterMairie.count}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    afterMairie: { ...formData.afterMairie, count: e.target.value }
                  })
                }
                onKeyDown={handleKeyDown}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 font-trajan text-sm sm:text-base transition-colors duration-300 focus:outline-none"
                style={{
                  backgroundColor: "#FCFAFB",
                  color: "#81579f",
                  borderColor: "#81579f",
                  fontSize: "16px",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#9B59B6";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#81579f";
                }}
              />
            </div>
          )}
        </div>

        <div className="border-t-2 border-[#81579f] my-8" />

        {/* Section Houppa */}
        <div>
          <label className="block text-base sm:text-lg mb-3 font-trajan uppercase" style={{ color: "#6A1B9A" }}>
            Houppa
          </label>
          <div className="flex gap-4 mb-4 justify-center">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="synagogue"
                value="Oui"
                checked={formData.synagogue.attending === "Oui"}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    synagogue: { ...formData.synagogue, attending: e.target.value, count: e.target.value === "Oui" ? formData.synagogue.count : "" }
                  })
                }
                className="h-4 w-4 sm:h-5 sm:w-5 text-[#81579f] focus:ring-[#81579f] accent-[#81579f]"
                style={{ color: "#81579f" }}
              />
              <span className="text-base sm:text-lg font-trajan" style={{ color: "#81579f" }}>
                Oui
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="synagogue"
                value="Non"
                checked={formData.synagogue.attending === "Non"}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    synagogue: { ...formData.synagogue, attending: e.target.value, count: "" }
                  })
                }
                className="h-4 w-4 sm:h-5 sm:w-5 text-[#81579f] focus:ring-[#81579f] accent-[#81579f]"
                style={{ color: "#81579f" }}
              />
              <span className="text-base sm:text-lg font-trajan" style={{ color: "#81579f" }}>
                Non
              </span>
            </label>
          </div>
          {formData.synagogue.attending === "Oui" && (
            <div>
              <label htmlFor="synagogueCount" className="block text-sm mb-2 font-trajan" style={{ color: "#6A1B9A" }}>
                Nombre de personnes à la synagogue *
              </label>
              <input
                type="text"
                id="synagogueCount"
                required
                value={formData.synagogue.count}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    synagogue: { ...formData.synagogue, count: e.target.value }
                  })
                }
                onKeyDown={handleKeyDown}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 font-trajan text-sm sm:text-base transition-colors duration-300 focus:outline-none"
                style={{
                  backgroundColor: "#FCFAFB",
                  color: "#81579f",
                  borderColor: "#81579f",
                  fontSize: "16px",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#9B59B6";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#81579f";
                }}
              />
            </div>
          )}
        </div>

        <div className="border-t-2 border-[#81579f] my-8" />

        {/* Section Beach Party */}
        <div>
          <label className="block text-base sm:text-lg mb-3 font-trajan uppercase" style={{ color: "#6A1B9A" }}>
            Beach Party
          </label>
          <div className="flex gap-4 mb-4 justify-center">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="reception"
                value="Oui"
                checked={formData.reception.attending === "Oui"}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    reception: { ...formData.reception, attending: e.target.value, count: e.target.value === "Oui" ? formData.reception.count : "" }
                  })
                }
                className="h-4 w-4 sm:h-5 sm:w-5 text-[#81579f] focus:ring-[#81579f] accent-[#81579f]"
                style={{ color: "#81579f" }}
              />
              <span className="text-base sm:text-lg font-trajan" style={{ color: "#81579f" }}>
                Oui
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="reception"
                value="Non"
                checked={formData.reception.attending === "Non"}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    reception: { ...formData.reception, attending: e.target.value, count: "" }
                  })
                }
                className="h-4 w-4 sm:h-5 sm:w-5 text-[#81579f] focus:ring-[#81579f] accent-[#81579f]"
                style={{ color: "#81579f" }}
              />
              <span className="text-base sm:text-lg font-trajan" style={{ color: "#81579f" }}>
                Non
              </span>
            </label>
          </div>
          {formData.reception.attending === "Oui" && (
            <div>
              <label htmlFor="receptionCount" className="block text-sm mb-2 font-trajan" style={{ color: "#6A1B9A" }}>
                Nombre de personnes à la réception *
              </label>
              <input
                type="text"
                id="receptionCount"
                required
                value={formData.reception.count}
                onChange={(e) =>
                  setFormData({ 
                    ...formData, 
                    reception: { ...formData.reception, count: e.target.value }
                  })
                }
                onKeyDown={handleKeyDown}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 font-trajan text-sm sm:text-base transition-colors duration-300 focus:outline-none"
                style={{
                  backgroundColor: "#FCFAFB",
                  color: "#81579f",
                  borderColor: "#81579f",
                  fontSize: "16px",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#9B59B6";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#81579f";
                }}
              />
            </div>
          )}
        </div>

        <motion.button
          type="submit"
          whileHover={!submitted || hasError ? { scale: 1.05 } : {}}
          whileTap={!submitted || hasError ? { scale: 0.95 } : {}}
          className="w-full py-3 sm:py-4 rounded-lg text-base sm:text-xl font-trajan transition-colors duration-300 border-2"
          style={{
            backgroundColor: submitted 
              ? hasError 
                ? "#e57373" // Rouge pastel pour les erreurs
                : "#78B64D" // Vert pour succès
              : "#81579f", // Couleur normale
            color: "#FCFAFB",
            borderColor: submitted 
              ? hasError 
                ? "#e57373" 
                : "#78B64D"
              : "#81579f",
          }}
          onMouseEnter={(e) => {
            if (!submitted || hasError) {
              e.currentTarget.style.backgroundColor = "#78B64D";
              e.currentTarget.style.borderColor = "#9B59B6";
            }
          }}
          onMouseLeave={(e) => {
            if (!submitted || hasError) {
              e.currentTarget.style.backgroundColor = "#81579f";
              e.currentTarget.style.borderColor = "#81579f";
            } else if (hasError) {
              e.currentTarget.style.backgroundColor = "#e57373";
              e.currentTarget.style.borderColor = "#e57373";
            } else {
              e.currentTarget.style.backgroundColor = "#78B64D";
              e.currentTarget.style.borderColor = "#9B59B6";
            }
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              <span>ENVOI EN COURS...</span>
            </div>
          ) : submitted ? (
            hasError ? (
              "IL Y A EU UN PROBLÈME, CLIQUEZ POUR RESOUMETTRE"
            ) : (
              "MERCI !"
            )
          ) : (
            "ENVOYER RSVP"
          )}
        </motion.button>
      </form>
      
      {/* Copyright discret */}
      <div className="mt-6 text-center">
        <a 
          href="https://instagram.com/entrenous_design" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs opacity-60 hover:opacity-80 transition-opacity duration-300"
                style={{ color: "#81579f" }}
        >
          <span>©</span>
          <span>entrenous_design</span>
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="opacity-70"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}