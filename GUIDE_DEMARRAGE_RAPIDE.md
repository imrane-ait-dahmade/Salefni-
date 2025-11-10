# 🚀 Guide de Démarrage Rapide - Salfni

## ⚡ Installation en 3 minutes

### Prérequis
- ✅ Node.js version 18+ ([Télécharger](https://nodejs.org/))
- ✅ npm ou yarn

### Étapes d'installation

#### 1️⃣ Cloner le projet
```bash
git clone https://github.com/votre-username/salfni.git
cd salfni
```

#### 2️⃣ Installer les dépendances
```bash
npm install
```

#### 3️⃣ Démarrer l'application

**Terminal 1 - Backend (json-server)**
```bash
npm run server
```
✅ Le serveur démarre sur `http://localhost:3001`

**Terminal 2 - Frontend (React + Vite)**
```bash
npm run dev
```
✅ L'application démarre sur `http://localhost:5173`

#### 4️⃣ Accéder à l'application
Ouvrir dans votre navigateur : [http://localhost:5173](http://localhost:5173)

---

## 🎮 Premiers Pas

### Tester la simulation (Guest)

1. **Aller sur la page Simulation**
   - Cliquer sur "Simulation" dans le menu
   - Ou naviguer vers `/simulation`

2. **Remplir le formulaire**
   ```
   Type de crédit : Immobilier
   Métier : Ingénieur
   Montant : 150000 €
   Durée : 20 ans
   Taux d'intérêt : 1.5 %
   Taux d'assurance : 0.36 %
   Frais de dossier : 1000 €
   ```

3. **Cliquer sur "Calculer"**
   - Les résultats s'affichent instantanément
   - Tableau d'amortissement généré

4. **Faire une demande de crédit**
   - Cliquer sur "Faire une demande de crédit"
   - Remplir les informations personnelles
   - Soumettre → PDF téléchargé automatiquement

### Accéder à l'espace Admin

1. **Se connecter**
   - Cliquer sur "Admin" dans le menu
   - Ou naviguer vers `/login`

2. **Identifiants de démonstration**
   ```
   Email : admin@salfni.com
   Mot de passe : admin123
   ```

3. **Explorer le dashboard**
   - Voir les statistiques
   - Filtrer les demandes
   - Cliquer sur une demande pour voir les détails
   - Changer le statut
   - Ajouter des notes
   - Exporter en CSV

---

## 📦 Structure du Projet

```
salfni/
├── 📄 db.json                    # Base de données JSON
├── 📄 package.json               # Dépendances
├── 📄 README.md                  # Documentation principale
├── 📄 GUIDE_TECHNIQUE_COMPLET.md # Guide technique détaillé
├── 📄 vite.config.js             # Configuration Vite
├── 📄 tailwind.config.js         # Configuration Tailwind
│
└── 📁 src/
    ├── 📄 main.jsx               # Point d'entrée
    ├── 📄 App.jsx                # Routes principales
    │
    ├── 📁 components/
    │   ├── 📁 custom/
    │   │   ├── button.jsx        # Bouton réutilisable
    │   │   ├── input.jsx         # Input avec label
    │   │   ├── table.jsx         # Table complète
    │   │   ├── navbar.jsx        # Navigation
    │   │   └── form.jsx          # Formulaire
    │   │
    │   └── DemandeForm.jsx       # Modal demande de crédit
    │
    ├── 📁 pages/
    │   ├── home.jsx              # Page d'accueil
    │   ├── simulation.jsx        # Simulation de crédit
    │   ├── Login.jsx             # Connexion admin
    │   ├── AdminDashboard.jsx    # Dashboard admin
    │   └── DemandeDetail.jsx     # Détail demande
    │
    └── 📁 styles/
        └── global.css            # Styles globaux
```

---

## 🛠️ Commandes Utiles

### Développement
```bash
# Démarrer le frontend
npm run dev

# Démarrer le backend
npm run server

# Les deux en même temps (si configuré)
npm start
```

### Production
```bash
# Build pour production
npm run build

# Preview du build
npm run preview
```

### Qualité du code
```bash
# Linter
npm run lint

# Format (si Prettier configuré)
npm run format
```

---

## 🐛 Dépannage

### Problème : Le serveur ne démarre pas

**Erreur : "Port 3001 already in use"**

**Solution :**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID [PID_NUMBER] /F

# macOS/Linux
lsof -ti:3001 | xargs kill -9
```

Ou changer le port dans `package.json` :
```json
"server": "json-server --watch db.json --port 3002"
```

### Problème : Les modules ne sont pas trouvés

**Erreur : "Cannot find module 'react'"**

**Solution :**
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Problème : Les données ne se sauvegardent pas

**Vérifications :**
1. json-server est-il démarré ? → Vérifier le terminal
2. Le fichier `db.json` existe-t-il ? → Créer s'il manque
3. Console navigateur : Erreur CORS ? → Relancer json-server

### Problème : Styles Tailwind ne s'appliquent pas

**Solution :**
```bash
# Vérifier tailwind.config.js
# Redémarrer le serveur de dev
npm run dev
```

### Problème : PDF ne se génère pas

**Vérification :**
```bash
# Vérifier que jspdf est installé
npm list jspdf

# Si absent, installer
npm install jspdf
```

---

## 📊 Données de Test

Le fichier `db.json` contient déjà des données de démonstration.

### Ajouter plus de demandes

**Méthode 1 : Via l'application**
- Faire des simulations et soumettre des demandes

**Méthode 2 : Éditer db.json manuellement**
```json
{
  "demandes": [
    {
      "id": "1",
      "nom": "Dupont",
      "prenom": "Jean",
      "email": "jean@example.com",
      ...
    }
  ]
}
```

**⚠️ Attention :** Arrêter json-server avant d'éditer db.json manuellement !

---

## 🌐 URLs de l'Application

| Page | URL | Accès |
|------|-----|-------|
| Accueil | http://localhost:5173/ | Public |
| Simulation | http://localhost:5173/simulation | Public |
| Login Admin | http://localhost:5173/login | Public |
| Dashboard Admin | http://localhost:5173/admin/dashboard | Protégé |
| Détail Demande | http://localhost:5173/admin/demande/:id | Protégé |

| API | URL | Méthode |
|-----|-----|---------|
| Simulations | http://localhost:3001/simulations | GET, POST |
| Demandes | http://localhost:3001/demandes | GET, POST, PATCH |
| Notifications | http://localhost:3001/notifications | GET, POST, PATCH |
| Users | http://localhost:3001/users | GET |

---

## 🎨 Personnalisation

### Changer la couleur principale

**Fichier : `src/styles/global.css` ou directement dans les composants**
```css
/* Remplacer #00C896 par votre couleur */
.bg-primary { background-color: #00C896; }
.text-primary { color: #00C896; }
```

**Dans les composants JSX :**
```javascript
// Chercher et remplacer
className="bg-[#00C896]"  // Ancienne couleur
className="bg-[#FF5733]"  // Nouvelle couleur
```

### Ajouter un nouveau type de crédit

**Fichier : `src/pages/simulation.jsx`**
```javascript
<select name="typeCredit">
  <option value="consommation">Crédit à la consommation</option>
  <option value="auto">Crédit auto</option>
  <option value="immobilier">Crédit immobilier</option>
  <option value="personnel">Crédit personnel</option>
  <option value="travaux">Crédit travaux</option>
  <option value="nouveau">Nouveau type</option>  // ← Ajouter ici
</select>
```

### Modifier les statuts de demande

**Fichier : `src/pages/AdminDashboard.jsx` et `DemandeDetail.jsx`**
```javascript
const statuts = {
  en_attente: "En attente",
  en_cours: "En cours",
  acceptee: "Acceptée",
  refusee: "Refusée",
  // nouveau_statut: "Nouveau statut"  // ← Ajouter ici
};
```

---

## 📚 Ressources Complémentaires

### Documentation Officielle
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)
- [jsPDF Documentation](https://github.com/parallax/jsPDF)

### Tutoriels et Guides
- [React Hooks](https://react.dev/reference/react)
- [Modern JavaScript](https://javascript.info/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## ✅ Checklist Post-Installation

Vérifier que tout fonctionne :

- [ ] ✅ npm install sans erreur
- [ ] ✅ json-server démarre (port 3001)
- [ ] ✅ React app démarre (port 5173)
- [ ] ✅ Page d'accueil s'affiche
- [ ] ✅ Navigation fonctionne
- [ ] ✅ Simulation calcule correctement
- [ ] ✅ Demande de crédit crée un PDF
- [ ] ✅ Login admin réussit
- [ ] ✅ Dashboard affiche les demandes
- [ ] ✅ Filtres et recherche fonctionnent
- [ ] ✅ Export CSV télécharge
- [ ] ✅ Modification de statut sauvegarde
- [ ] ✅ Notes s'ajoutent correctement

---

## 🚀 Prêt pour la Démo !

Votre application est maintenant prête. Voici un scénario de démo rapide :

1. **Montrer la page d'accueil** (20 secondes)
   - Design moderne
   - Navigation fluide

2. **Faire une simulation** (2 minutes)
   - Remplir le formulaire
   - Afficher les résultats
   - Montrer le tableau d'amortissement

3. **Soumettre une demande** (1 minute)
   - Modal de demande
   - Génération du PDF

4. **Espace admin** (2 minutes)
   - Login
   - Dashboard avec stats
   - Filtrer une demande
   - Changer le statut
   - Exporter CSV

**Total : 5 minutes de démo parfaite ! 🎯**

---

## 💬 Besoin d'aide ?

- 📧 Email : votre.email@example.com
- 🐛 Issues : GitHub Issues
- 💬 Discord : Votre serveur Discord

---

**Bonne chance avec Salfni ! 🎉**

