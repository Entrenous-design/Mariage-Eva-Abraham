# Configuration de l'application

## Variables d'environnement

Pour que le formulaire RSVP fonctionne correctement, vous devez configurer les variables d'environnement suivantes :

### Pour le développement local

1. Créez un fichier `.env.local` à la racine du projet
2. Ajoutez la variable suivante avec votre URL Google Apps Script :
   ```
   NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/VOTRE_ID_DE_DEPLOIEMENT/exec"
   ```

### Pour le déploiement sur Vercel

1. Allez dans le dashboard Vercel de votre projet
2. Naviguez vers "Settings" > "Environment Variables"
3. Ajoutez une nouvelle variable :
   - Nom : `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`
   - Valeur : `https://script.google.com/macros/s/VOTRE_ID_DE_DEPLOIEMENT/exec`
4. Cliquez sur "Save"
5. Redéployez votre application

## Sécurité

- L'URL de votre Google Apps Script est sensible, ne la partagez pas publiquement
- En utilisant les variables d'environnement, l'URL n'apparaîtra pas dans votre code source
- Le préfixe `NEXT_PUBLIC_` est nécessaire car cette variable est utilisée côté client
