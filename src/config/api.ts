// Configuration des API
// Ce fichier utilise des variables d'environnement pour les données sensibles

export const API_CONFIG = {
  // URL du Google Apps Script pour le formulaire RSVP
  // Format: https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
  // Doit être défini dans les variables d'environnement de Vercel
  GOOGLE_APPS_SCRIPT_URL: process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || "",
};
