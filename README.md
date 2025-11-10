# Salfni - Solution de Simulation et Gestion des Crédits en Ligne

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Description

Salfni est une application web moderne permettant aux visiteurs de simuler différents types de crédits et d'envoyer leurs demandes de financement en ligne. L'application offre également un espace administrateur complet pour gérer et traiter les demandes.

## ✨ Fonctionnalités Principales

### 🔹 Pour les Visiteurs (Guests)

- **Simulation de crédit** avec calculs précis :
  - Mensualité (formule standard d'amortissement)
  - Coût total du crédit
  - TAEG (Taux Annuel Effectif Global)
  - Tableau d'amortissement détaillé
  
- **Types de crédits supportés** :
  - Crédit à la consommation
  - Crédit auto
  - Crédit immobilier
  - Crédit personnel
  - Crédit travaux

- **Formulaire de demande** avec informations complètes :
  - Données personnelles (nom, prénom, email, téléphone)
  - Informations professionnelles (métier, situation, revenu mensuel)
  - Génération automatique de PDF récapitulatif

### 🔹 Pour les Administrateurs

- **Dashboard complet** avec :
  - Statistiques en temps réel
  - Liste des demandes avec filtres avancés
  - Recherche par nom/email
  - Tri par date ou montant
  - Export CSV des demandes

- **Gestion des demandes** :
  - Vue détaillée de chaque demande
  - Changement de statut (En attente, En cours, Acceptée, Refusée)
  - Marquage des demandes prioritaires
  - Ajout de notes internes
  - Historique des changements

- **Système de notifications** :
  - Badge de notification pour les nouvelles demandes
  - Alertes en temps réel

## 🚀 Installation et Configuration

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/salfni.git
cd salfni
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer le backend (json-server)**
```bash
npm run server
```
Le serveur démarre sur `http://localhost:3001`

4. **Démarrer l'application (dans un nouveau terminal)**
```bash
npm run dev
```
L'application démarre sur `http://localhost:5173`

## 📂 Structure du Projet

```
salfni/
├── src/
│   ├── components/
│   │   ├── custom/
│   │   │   ├── button.jsx          # Composant bouton réutilisable
│   │   │   ├── input.jsx           # Composant input avec label
│   │   │   ├── table.jsx           # Composant table complet
│   │   │   ├── navbar.jsx          # Barre de navigation
│   │   │   └── form.jsx            # Composant formulaire
│   │   └── DemandeForm.jsx         # Modal de demande de crédit
│   ├── pages/
│   │   ├── home.jsx                # Page d'accueil
│   │   ├── simulation.jsx          # Page de simulation de crédit
│   │   ├── Login.jsx               # Page de connexion admin
│   │   ├── AdminDashboard.jsx      # Dashboard administrateur
│   │   └── DemandeDetail.jsx       # Détail d'une demande
│   ├── App.jsx                     # Configuration des routes
│   └── main.jsx                    # Point d'entrée
├── db.json                         # Base de données JSON
├── package.json
└── README.md
```

## 🔧 Technologies Utilisées

### Frontend
- **React 19.1.1** - Bibliothèque JavaScript
- **Vite 7.1.7** - Build tool et dev server
- **React Router 6.30** - Gestion des routes
- **Tailwind CSS 4.1** - Framework CSS utility-first
- **jsPDF 3.0.3** - Génération de PDF

### Backend
- **json-server 1.0.0-beta.3** - API REST mockée

## 📊 Modèle de Données

### Simulations
```json
{
  "id": "string",
  "date": "ISO8601",
  "donnees": {
    "typeCredit": "string",
    "metier": "string",
    "capital": "number",
    "duree": "number",
    "tauxAnnuel": "number",
    "tauxAssurance": "number",
    "fraisFixes": "number"
  },
  "resultats": {
    "mensualite": "number",
    "mensualiteTotale": "number",
    "coutTotal": "number",
    "taeg": "number"
  }
}
```

### Demandes
```json
{
  "id": "string",
  "nom": "string",
  "prenom": "string",
  "email": "string",
  "telephone": "string",
  "revenuMensuel": "number",
  "situationPro": "string",
  "commentaire": "string",
  "simulationData": {},
  "results": {},
  "statut": "en_attente|en_cours|acceptee|refusee",
  "dateCreation": "ISO8601",
  "prioritaire": boolean,
  "notes": [],
  "historique": []
}
```

## 🔐 Authentification Admin

**Identifiants de démonstration** :
- Email : `admin@salfni.com`
- Mot de passe : `admin123`

## 🧮 Formules de Calcul

### Mensualité
```
M = C × t / (1 - (1 + t)^(-n))
```
Où :
- M = mensualité
- C = capital emprunté
- t = taux mensuel (taux annuel / 12 / 100)
- n = nombre de mois (durée × 12)

### TAEG (simplifié)
```
TAEG = (Coût total du crédit / (Capital × Durée en années)) × 100
```

### Tableau d'amortissement
Pour chaque mois :
- **Intérêts** = Capital restant × taux mensuel
- **Principal** = Mensualité - Intérêts
- **Capital restant** = Capital restant - Principal

## 🎨 Design System

### Couleurs Principales
- **Primary** : `#00C896` (Vert turquoise)
- **Background** : Gradient `gray-900` to `black`
- **Text** : `white` et variations de `gray`

### Composants Stylisés
Tous les composants respectent le thème dark mode avec :
- Effet glassmorphism (`backdrop-blur`)
- Transitions fluides
- États hover interactifs
- Bordures subtiles

## 📱 Pages de l'Application

1. **/** ou **/home** - Page d'accueil avec présentation
2. **/simulation** - Simulateur de crédit
3. **/login** - Connexion administrateur
4. **/admin/dashboard** - Dashboard admin
5. **/admin/demande/:id** - Détail d'une demande

## 🔄 Workflow Utilisateur

### Guest (Visiteur)
1. Accède à la page simulation
2. Remplit le formulaire de simulation
3. Consulte les résultats et le tableau d'amortissement
4. Clique sur "Faire une demande de crédit"
5. Remplit ses informations personnelles
6. Soumet la demande
7. Reçoit un PDF récapitulatif

### Admin
1. Se connecte via `/login`
2. Accède au dashboard
3. Consulte les statistiques et demandes
4. Filtre/recherche les demandes
5. Clique sur une demande pour voir les détails
6. Change le statut, ajoute des notes
7. Exporte les données en CSV si nécessaire

## 🚀 Scripts Disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Démarrer json-server
npm run server

# Build pour production
npm run build

# Preview du build
npm run preview

# Linter
npm run lint
```

## 📈 Fonctionnalités Avancées Implémentées

- ✅ DataTable personnalisé avec tri et filtres
- ✅ Système de routing avec React Router
- ✅ Gestion d'état avec React hooks (useState, useEffect)
- ✅ Validation des données côté UI
- ✅ Génération de PDF avec jsPDF
- ✅ Export CSV
- ✅ Système de notifications
- ✅ Authentification basique avec localStorage
- ✅ Design responsive
- ✅ Dark mode complet

## 🧪 Tests et Validation

### Tests Fonctionnels
- ✅ Simulation de crédit avec tous les types
- ✅ Création de demande avec génération PDF
- ✅ Authentification admin
- ✅ CRUD complet sur les demandes
- ✅ Filtrage et recherche
- ✅ Export CSV

### Validation des Données
- Champs obligatoires marqués avec *
- Validation HTML5 (required, type="email", etc.)
- Validation des nombres (montants, taux, durée)
- Feedback utilisateur en cas d'erreur

## 🐛 Dépannage

### Le serveur json-server ne démarre pas
```bash
# Vérifier que le port 3001 est disponible
netstat -ano | findstr :3001

# Ou changer le port dans package.json
"server": "json-server --watch db.json --port 3002"
```

### Les données ne se sauvegardent pas
- Vérifier que json-server tourne
- Vérifier la console pour les erreurs CORS
- Vérifier le fichier `db.json`

## 📝 Bonnes Pratiques Appliquées

1. **Architecture modulaire** - Composants réutilisables
2. **Naming conventions** - PascalCase pour composants, camelCase pour variables
3. **Commentaires** - Code documenté
4. **DRY** - Don't Repeat Yourself
5. **Responsive Design** - Mobile-first approach
6. **Accessibilité** - Labels, htmlFor, semantic HTML
7. **Performance** - Lazy loading, optimisation des re-renders

## 👨‍💻 Auteur

**Votre Nom**
- GitHub: [@votre-username](https://github.com/votre-username)
- Email: votre.email@example.com

## 📄 Licence

Ce projet est sous licence MIT.

## 🙏 Remerciements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [json-server](https://github.com/typicode/json-server)
- [jsPDF](https://github.com/parallax/jsPDF)

---

**Salfni** - Simplifiez vos simulations de crédit 🚀
