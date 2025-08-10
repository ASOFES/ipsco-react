# 🚗 IPSCO React Frontend

Interface utilisateur moderne pour la gestion de parc automobile IPSCO, développée avec React et TypeScript.

## 🚀 Technologies

- **React 18** - Bibliothèque UI moderne
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router** - Navigation SPA
- **Axios** - Client HTTP

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm start
```

## 🔧 Configuration

1. Créer un fichier `.env.local` :
```bash
REACT_APP_API_URL=http://localhost:8000
```

2. Pour la production :
```bash
REACT_APP_API_URL=https://ipsco-fastapi.onrender.com
```

## 🏃‍♂️ Scripts

```bash
npm start          # Démarrage développement
npm run build      # Build production
npm test           # Tests
npm run eject      # Eject (irréversible)
```

## 📱 Composants

- **Layout** - Structure principale
- **Dashboard** - Tableau de bord
- **Vehicules** - Gestion des véhicules
- **Missions** - Gestion des missions
- **Chauffeurs** - Gestion des chauffeurs
- **Rapports** - Génération de rapports

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connecter le repository GitHub
2. Déploiement automatique
3. Configuration des variables d'environnement

### Netlify
1. Build command : `npm run build`
2. Publish directory : `build`
3. Variables d'environnement dans l'interface

## 🔗 API Backend

L'application se connecte à votre API FastAPI déployée sur Render :
- **Développement** : `http://localhost:8000`
- **Production** : `https://ipsco-fastapi.onrender.com`

## 🎨 Design

- **Responsive** - Mobile-first
- **Dark/Light mode** - Thèmes automatiques
- **Tailwind CSS** - Classes utilitaires
- **Icons** - Heroicons intégrés

---

🎉 **Interface moderne et performante pour votre IPSCO !** 🎉
