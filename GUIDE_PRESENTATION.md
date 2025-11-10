# Guide de Présentation - Salfni
## Évaluation 25 minutes

---

## 📋 Structure de l'évaluation

| Partie | Durée | Contenu |
|--------|-------|---------|
| **Démonstration** | 5 min | Montrer les fonctionnalités |
| **Code Source** | 5 min | Expliquer l'architecture |
| **Mise en situation** | 10 min | Exercices pratiques |
| **Code Review & Culture Web** | 5 min | Questions techniques |

---

## 🎬 PARTIE 1 : Démonstration (5 minutes)

### Préparation avant l'évaluation
```bash
# Terminal 1 : Backend
json-server --watch db.json --port 3001

# Terminal 2 : Frontend
npm start
```

### Script de démonstration (chronométré)

#### 1. Page d'accueil (30 secondes)
- **URL** : `http://localhost:3000/home`
- **Montrer** :
  - Hero section avec description
  - 3 cartes de fonctionnalités
  - Design moderne en mode sombre
  - Responsive (réduire fenêtre)
  - Bouton "Commencer la simulation"

#### 2. Simulation de crédit (2 minutes)
- **URL** : `http://localhost:3000/simulation`
- **Remplir le formulaire** :
  ```
  Type de crédit : Immobilier
  Métier : Ingénieur
  Montant : 200000 €
  Durée : 25 ans
  Taux d'intérêt : 1.8 %
  Taux assurance : 0.36 %
  Frais de dossier : 2000 €
  ```
- **Cliquer "Calculer"**
- **Montrer les résultats** :
  - Mensualité hors assurance
  - Mensualité totale
  - Coût total du crédit
  - TAEG
  - Montant total à rembourser
- **Scroller vers** tableau d'amortissement
- **Expliquer** : Premier mois, chaque année, dernier mois

#### 3. Demande de crédit + PDF (1 minute)
- **Cliquer** "Faire une demande de crédit"
- **Remplir rapidement** :
  ```
  Nom : Dupont
  Prénom : Jean
  Email : jean.dupont@email.com
  Téléphone : 0612345678
  Revenu mensuel : 4000
  Situation pro : CDI
  Commentaire : Achat résidence principale
  ```
- **Cliquer** "Envoyer la demande"
- **Montrer** :
  - Message de succès
  - PDF téléchargé (ouvrir rapidement)
- **Dire** : "La demande est maintenant visible côté admin"

#### 4. Espace Admin (1 min 30)
- **URL** : `http://localhost:3000/login`
- **Se connecter** :
  ```
  Email : admin@salfni.com
  Password : admin123
  ```
- **Dashboard** :
  - Montrer statistiques en haut
  - Montrer liste des demandes
  - Montrer notification (badge cloche)
  - Montrer filtres et recherche
- **Cliquer sur "Voir"** sur la dernière demande
- **Page détail** :
  - Informations demandeur
  - Détails du crédit
  - Changer statut → "En cours"
  - Ajouter une note → "Dossier complet, à analyser"
  - Montrer historique mis à jour
  - Marquer prioritaire
- **Retour dashboard** :
  - Export CSV (cliquer, fichier téléchargé)

**Temps total : ~5 minutes**

---

## 💻 PARTIE 2 : Code Source (5 minutes)

### Structure à montrer (VSCode)

#### 1. Architecture du projet (1 min)
```
📁 react/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 custom/
│   │   │   ├── button.jsx
│   │   │   ├── input.jsx
│   │   │   └── table.jsx
│   │   └── DemandeForm.jsx
│   ├── 📁 pages/
│   │   ├── home.jsx
│   │   ├── simulation.jsx
│   │   ├── Login.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── DemandeDetail.jsx
│   └── App.jsx
└── db.json
```

**Expliquer** :
- Séparation composants réutilisables / pages
- Composants custom pour cohérence UI
- db.json pour backend mocké

#### 2. Composant clé : simulation.jsx (2 min)
**Ouvrir** `src/pages/simulation.jsx`

**Montrer et expliquer** :
```javascript
// 1. États
const [formData, setFormData] = useState({...})
const [results, setResults] = useState(null)

// 2. Fonction de calcul (ligne ~23)
const calculerSimulation = (e) => {
  // Récupération des données
  const capital = parseFloat(formData.capital);
  const n = dureeAnnees * 12;
  const t = tauxAnnuel / 12 / 100;
  
  // Formule de mensualité
  const mensualite = (capital * t) / (1 - Math.pow(1 + t, -n));
  
  // TAEG
  const taeg = (coutTotal / (capital * dureeAnnees)) * 100;
  
  // Tableau d'amortissement (boucle)
  for (let mois = 1; mois <= n; mois++) {
    const interets = capitalRestant * t;
    const principal = mensualite - interets;
    capitalRestant -= principal;
  }
}
```

**Points à souligner** :
- Formules mathématiques correctes
- Gestion de l'état avec hooks
- Sauvegarde automatique dans json-server

#### 3. Composant réutilisable : Table.jsx (1 min)
**Ouvrir** `src/components/custom/table.jsx`

**Montrer** :
```javascript
// Table modulaire avec exports multiples
export default Table;
export { TableHeader, TableBody, TableRow, TableHead, TableCell };

// forwardRef pour compatibilité
const Table = forwardRef(({ children, ...props }, ref) => {
  return <table ref={ref} {...props}>{children}</table>
})
```

**Dire** :
- Composant modulaire et composable
- Peut afficher n'importe quel type de données
- Utilisé dans AdminDashboard et DemandeDetail

#### 4. Routing : App.jsx (1 min)
**Ouvrir** `src/App.jsx`

**Montrer** :
```javascript
<Router>
  <NavbarWrapper />  {/* Conditionnel selon route */}
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/simulation" element={<Simulation />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/demande/:id" element={<DemandeDetail />} />
  </Routes>
</Router>
```

**Points clés** :
- React Router v6
- NavbarWrapper conditionnel (masqué sur admin)
- Route paramétrique pour détail demande

---

## 🎯 PARTIE 3 : Mise en situation (10 minutes)

### Scénarios possibles

#### Scénario 1 : Modifier un calcul
**Demande** : "Ajoutez un champ pour les frais de notaire (2% du montant)"

**Réponse** :
1. Ouvrir `simulation.jsx`
2. Ajouter dans formData :
   ```javascript
   fraisNotaire: ""
   ```
3. Ajouter dans le formulaire :
   ```jsx
   <Input
     label="Frais de notaire (%)"
     type="number"
     step="0.01"
     name="fraisNotaire"
     value={formData.fraisNotaire}
     onChange={handleChange}
   />
   ```
4. Modifier le calcul du coût total :
   ```javascript
   const fraisNotaireTotal = (capital * fraisNotaire / 100);
   const coutTotal = ... + fraisNotaireTotal;
   ```

#### Scénario 2 : Ajouter un statut
**Demande** : "Ajoutez un statut 'Annulée' dans l'admin"

**Réponse** :
1. Ouvrir `DemandeDetail.jsx`
2. Ajouter un bouton dans la section statuts :
   ```jsx
   <Button
     title="Annulée"
     style={`w-full ${demande.statut === 'annulee' ? 'bg-gray-500' : 'bg-gray-700'} text-white`}
     fct={() => updateStatut('annulee')}
   />
   ```
3. Ajouter dans `getStatutBadge` (AdminDashboard.jsx) :
   ```javascript
   annulee: "bg-gray-500/20 text-gray-400 border-gray-500/50"
   ```

#### Scénario 3 : Filtrer par montant
**Demande** : "Ajoutez un filtre pour les demandes > 100 000 €"

**Réponse** :
1. Ouvrir `AdminDashboard.jsx`
2. Ajouter un état :
   ```javascript
   const [filterMontant, setFilterMontant] = useState("tous");
   ```
3. Ajouter dans le useEffect de filtrage :
   ```javascript
   if (filterMontant === "plus100k") {
     filtered = filtered.filter(d => 
       parseFloat(d.simulationData.capital) > 100000
     );
   }
   ```
4. Ajouter un select dans les filtres :
   ```jsx
   <select value={filterMontant} onChange={(e) => setFilterMontant(e.target.value)}>
     <option value="tous">Tous montants</option>
     <option value="plus100k">> 100 000 €</option>
   </select>
   ```

#### Scénario 4 : Créer un nouveau composant
**Demande** : "Créez un composant Badge pour les statuts"

**Réponse** :
1. Créer `src/components/custom/badge.jsx` :
   ```jsx
   export default function Badge({ statut, children }) {
     const styles = {
       en_attente: "bg-yellow-500/20 text-yellow-400",
       en_cours: "bg-blue-500/20 text-blue-400",
       acceptee: "bg-green-500/20 text-green-400",
       refusee: "bg-red-500/20 text-red-400"
     };
     
     return (
       <span className={`px-3 py-1 rounded-full text-xs ${styles[statut]}`}>
         {children}
       </span>
     );
   }
   ```
2. Utiliser dans AdminDashboard :
   ```jsx
   import Badge from '../components/custom/badge';
   
   <Badge statut={demande.statut}>
     {demande.statut.replace('_', ' ')}
   </Badge>
   ```

---

## 🧠 PARTIE 4 : Code Review & Culture Web (5 minutes)

### Questions techniques attendues

#### React & Hooks

**Q: Pourquoi utiliser useState au lieu de variables classiques ?**
```javascript
// ❌ Mauvais : pas de re-render
let count = 0;
count++;

// ✅ Bon : re-render automatique
const [count, setCount] = useState(0);
setCount(count + 1);
```

**Q: Expliquez useEffect dans votre code.**
```javascript
useEffect(() => {
  fetchDemandes(); // Exécuté au montage
}, []);  // Dépendances vides = une seule fois

useEffect(() => {
  filterData(); // Exécuté quand searchTerm change
}, [searchTerm]);
```

**Q: Qu'est-ce que forwardRef ?**
```javascript
// Permet de passer une ref à un composant enfant
const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Usage parent
const inputRef = useRef();
<Input ref={inputRef} />
```

#### React Router

**Q: Comment récupérer un paramètre d'URL ?**
```javascript
// Route : /admin/demande/:id
const { id } = useParams(); // Récupère "id" depuis l'URL
```

**Q: Différence entre Link et <a> ?**
- `<Link>` : Navigation SPA sans rechargement
- `<a>` : Rechargement complet de la page

#### API & Fetch

**Q: Comment gérez-vous les erreurs API ?**
```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
} catch (error) {
  console.error("Erreur:", error);
  alert("Une erreur est survenue");
}
```

**Q: Quelle est la différence entre GET et POST ?**
- GET : Récupérer des données (lecture)
- POST : Envoyer des données (création)
- PATCH : Modifier partiellement
- DELETE : Supprimer

#### JavaScript ES6+

**Q: Qu'est-ce que le destructuring ?**
```javascript
// Objet
const { nom, email } = user;

// Array
const [first, second] = array;

// Props
const Input = ({ label, type, ...props }) => { }
```

**Q: Spread operator (...) ?**
```javascript
// Copie d'objet
const newFormData = { ...formData, name: "Jean" };

// Passage de props
<Input {...inputProps} />
```

#### CSS & Design

**Q: Pourquoi Tailwind au lieu de CSS classique ?**
- Rapidité de développement
- Pas de conflits de noms
- Taille finale optimisée (tree-shaking)
- Cohérence du design
- Responsive facile

**Q: Comment fonctionne le dark mode dans votre app ?**
- Classes Tailwind : `bg-gray-800`, `text-white`
- Palette cohérente définie
- backdrop-blur pour glassmorphism

#### Sécurité

**Q: Votre authentification est-elle sécurisée ?**
- Non, c'est une démo
- En production : JWT, httpOnly cookies, hash bcrypt
- Pas de password en clair côté client
- HTTPS obligatoire

**Q: Comment éviter les failles XSS ?**
- React échappe automatiquement le JSX
- Ne jamais utiliser `dangerouslySetInnerHTML` sans sanitization
- Valider les inputs côté backend

---

## 📚 Vocabulaire et concepts à maîtriser

### React
- Component (fonctionnel vs classe)
- Props & State
- Hooks (useState, useEffect, useRef, etc.)
- Virtual DOM
- Reconciliation
- JSX
- Lifting state up
- Conditional rendering

### Architecture
- SPA (Single Page Application)
- Component-based architecture
- Separation of concerns
- DRY (Don't Repeat Yourself)
- Modularité

### Web
- REST API
- CRUD (Create, Read, Update, Delete)
- HTTP methods (GET, POST, PATCH, DELETE)
- JSON
- CORS
- LocalStorage vs SessionStorage

### Git
- Commit
- Branch
- Merge
- Pull Request
- Clone

---

## ✅ Checklist avant l'évaluation

### Technique
- [ ] json-server fonctionne (port 3001)
- [ ] React app démarre (port 3000)
- [ ] Toutes les pages s'affichent
- [ ] Simulation calcule correctement
- [ ] PDF se télécharge
- [ ] Admin peut se connecter
- [ ] Filtres fonctionnent
- [ ] Export CSV marche

### Présentation
- [ ] Fenêtre navigateur en plein écran
- [ ] Onglets préparés (home, simulation, login)
- [ ] VSCode ouvert avec fichiers clés
- [ ] db.json visible
- [ ] Console développeur (F12) propre (pas d'erreurs)

### Documentation
- [ ] README.md complet
- [ ] DOCUMENTATION_TECHNIQUE.md lisible
- [ ] INSTALLATION.md testé
- [ ] Code commenté

### Mental
- [ ] Relire le brief
- [ ] Relire BRIEF_COMPLETION.md
- [ ] Préparer réponses aux questions courantes
- [ ] Respirer, avoir confiance 😊

---

## 💡 Conseils finaux

### Pendant la démo
✅ **À faire :**
- Parler clairement et assez fort
- Montrer, puis expliquer
- Gérer son temps (5 min chrono)
- Être enthousiaste
- Dire "J'ai implémenté..." pas "Il y a..."

❌ **À éviter :**
- Parler trop vite
- S'excuser pour ce qui manque
- Improviser si bug : passer au suivant
- Lire le code ligne par ligne
- Dire "je ne sais pas" directement

### Pendant les questions
✅ **Si vous savez :**
- Répondre avec confiance
- Donner un exemple concret de votre code
- Montrer dans le code si possible

✅ **Si vous ne savez pas :**
- "Je ne suis pas certain, mais je pense que..."
- "Je ne l'ai pas utilisé dans ce projet, mais je sais que..."
- "C'est une bonne question, je vais me renseigner"

### Attitude
- Sourire
- Montrer que vous êtes fier de votre travail
- Accepter les remarques constructives
- Poser des questions si besoin de clarification

---

## 🎬 Dernière vérification (5 min avant)

```bash
# Terminal 1
cd c:\Users\imrane\react
json-server --watch db.json --port 3001

# Terminal 2
cd c:\Users\imrane\react
npm start

# Navigateur
http://localhost:3000/home
http://localhost:3000/simulation
http://localhost:3000/login

# VSCode
Ouvrir : simulation.jsx, AdminDashboard.jsx, Table.jsx, App.jsx
```

---

## 🏆 Objectif

**Montrer que vous maîtrisez :**
1. React et ses hooks
2. Architecture d'une app web moderne
3. Intégration API REST
4. Logique métier (calculs)
5. Bonnes pratiques de code
6. Capacité à expliquer votre code

**Bonne chance ! 🚀**

---

**Temps de préparation recommandé** : 1-2 heures
**Relire ce guide** : 30 minutes avant l'évaluation

