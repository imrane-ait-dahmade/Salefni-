# Guide Technique Complet - Salfni

## 📚 Table des Matières

1. [Architecture de l'Application](#architecture)
2. [Composants Détaillés](#composants)
3. [Logique Métier](#logique)
4. [Sécurité et Validation](#sécurité)
5. [Performance et Optimisation](#performance)
6. [Guide de Présentation](#présentation)

---

## 🏗️ Architecture de l'Application

### Vue d'ensemble

```
┌─────────────────────────────────────────┐
│           Frontend (React)              │
│  ┌───────────────────────────────────┐ │
│  │  Router (React Router)            │ │
│  │  ├── Public Routes                │ │
│  │  │   ├── Home                     │ │
│  │  │   └── Simulation               │ │
│  │  └── Protected Routes (Admin)     │ │
│  │      ├── Login                    │ │
│  │      ├── Dashboard                │ │
│  │      └── DemandeDetail            │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
                   ↕ HTTP (fetch)
┌─────────────────────────────────────────┐
│      Backend (json-server)              │
│  ┌───────────────────────────────────┐ │
│  │  REST API                         │ │
│  │  ├── /simulations                 │ │
│  │  ├── /demandes                    │ │
│  │  ├── /notifications               │ │
│  │  └── /users                       │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │  db.json (Database)               │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Stack Technique

#### Frontend
- **React 19.1.1** : Dernière version avec performance améliorée
- **Vite 7.1.7** : Build ultra-rapide, HMR (Hot Module Replacement)
- **Tailwind CSS 4.1** : Styling utility-first, dark mode natif
- **React Router 6.30** : Navigation SPA avec routes protégées
- **jsPDF 3.0.3** : Génération de documents PDF côté client

#### Backend Mock
- **json-server 1.0.0-beta.3** : API REST complète avec CRUD
- Support des queries, filtres, pagination
- Middleware pour timestamps automatiques

---

## 🧩 Composants Détaillés

### 1. Composants Réutilisables (`/components/custom`)

#### **Button.jsx**
```javascript
// Composant bouton avec forwardRef pour l'accessibilité
const Button = forwardRef(({ title, fct, style = "", ...props }, ref) => {
  return (
    <button 
      ref={ref}
      className={`base-styles ${style}`}  // Merge des styles
      onClick={fct}
      {...props}  // Props spreading pour flexibilité
    >
      {title}
    </button>
  );
});
```

**Caractéristiques** :
- forwardRef pour manipulation DOM
- Props spreading pour extensibilité
- Styles de base + personnalisables
- Support des états disabled, loading

#### **Input.jsx**
```javascript
const Input = forwardRef(({label, placeholder, name, type = "text", className = "", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        ref={ref}
        id={name}  // Accessibilité
        name={name}
        type={type}
        className={`base-dark-mode-styles ${className}`}
        {...props}
      />
    </div>
  );
});
```

**Caractéristiques** :
- Label optionnel avec htmlFor
- Dark mode par défaut
- Support de tous les types HTML5
- Ring focus avec couleur brand

#### **Table.jsx**
Composant modulaire avec 6 sous-composants :

```javascript
// Système de composants exportés
export default Table;
export { TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell };
```

**Avantages** :
- Composition flexible
- Styles cohérents (dark mode)
- Hover effects sur les lignes
- Responsive avec overflow-auto

### 2. Pages Principales

#### **Simulation.jsx** - Le cœur de l'application

**Structure** :
```javascript
export default function Simulation() {
    // États
    const [formData, setFormData] = useState({...});
    const [results, setResults] = useState(null);
    const [amortissement, setAmortissement] = useState([]);
    const [showDemandeForm, setShowDemandeForm] = useState(false);

    // Logique de calcul
    const calculerSimulation = (e) => { ... };
    const sauvegarderSimulation = async (data) => { ... };

    // Rendu conditionnel
    return (
        <form>...</form>
        {results && <ResultsPanel />}
        {amortissement && <TableAmortissement />}
        {showDemandeForm && <DemandeForm />}
    );
}
```

**Fonctionnalités clés** :
1. **Formulaire de simulation**
   - Select pour type de crédit
   - Inputs contrôlés (value + onChange)
   - Validation HTML5 + JavaScript

2. **Calculs financiers**
   - Mensualité : Formule standard d'amortissement
   - TAEG : Calcul simplifié
   - Tableau d'amortissement : Boucle sur n mois

3. **Affichage des résultats**
   - Cards avec informations clés
   - Codes couleur pour différencier les données
   - Bouton CTA pour demande

4. **Sauvegarde automatique**
   - POST vers json-server
   - Timestamp automatique
   - Error handling

#### **DemandeForm.jsx** - Modal de demande

**Processus complet** :
```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Créer l'objet demande
    const demande = {
        ...demandeData,
        simulationData,
        results,
        statut: "en_attente",
        dateCreation: new Date().toISOString(),
        prioritaire: false,
        notes: []
    };

    // 2. Enregistrer dans la base
    const response = await fetch('http://localhost:3001/demandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(demande)
    });

    const createdDemande = await response.json();

    // 3. Créer une notification
    await fetch('http://localhost:3001/notifications', {
        method: 'POST',
        body: JSON.stringify({
            type: "nouvelle_demande",
            demandeId: createdDemande.id,
            message: `Nouvelle demande de ${demandeData.nom}`,
            date: new Date().toISOString(),
            lu: false
        })
    });

    // 4. Générer le PDF
    generatePDF();

    // 5. Notification succès
    onSuccess();
};
```

**Génération PDF avec jsPDF** :
```javascript
const generatePDF = () => {
    const doc = new jsPDF();
    
    // Configuration du style
    doc.setFontSize(20);
    doc.setTextColor(0, 200, 150);  // Couleur brand
    
    // Sections du document
    // 1. En-tête
    doc.text("Salfni - Demande de Crédit", 105, 20, { align: "center" });
    
    // 2. Informations personnelles
    doc.text(`Nom: ${demandeData.nom}`, 20, 45);
    
    // 3. Détails de la simulation
    // 4. Résultats
    // 5. Footer avec date
    
    // Téléchargement
    doc.save(`demande_credit_${demandeData.nom}_${Date.now()}.pdf`);
};
```

#### **AdminDashboard.jsx** - Interface administrateur

**Gestion d'état complexe** :
```javascript
const [demandes, setDemandes] = useState([]);
const [filteredDemandes, setFilteredDemandes] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [filterStatut, setFilterStatut] = useState("tous");
const [sortBy, setSortBy] = useState("date_desc");
```

**useEffect pour le filtrage** :
```javascript
useEffect(() => {
    let filtered = [...demandes];

    // Recherche textuelle
    if (searchTerm) {
        filtered = filtered.filter(d =>
            d.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Filtre par statut
    if (filterStatut !== "tous") {
        filtered = filtered.filter(d => d.statut === filterStatut);
    }

    // Tri
    filtered.sort((a, b) => {
        switch (sortBy) {
            case "date_desc":
                return new Date(b.dateCreation) - new Date(a.dateCreation);
            case "montant_desc":
                return parseFloat(b.simulationData.capital) - parseFloat(a.simulationData.capital);
            // ...
        }
    });

    setFilteredDemandes(filtered);
}, [searchTerm, filterStatut, sortBy, demandes]);
```

**Export CSV** :
```javascript
const exportCSV = () => {
    // 1. Définir les en-têtes
    const headers = ["Date", "Nom", "Prénom", "Email", ...];
    
    // 2. Mapper les données
    const rows = filteredDemandes.map(d => [
        new Date(d.dateCreation).toLocaleDateString('fr-FR'),
        d.nom,
        d.prenom,
        // ...
    ]);

    // 3. Créer le CSV (séparateur ;)
    const csv = [headers, ...rows]
        .map(row => row.join(";"))
        .join("\n");

    // 4. Créer un Blob et télécharger
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `demandes_${Date.now()}.csv`;
    link.click();
};
```

#### **DemandeDetail.jsx** - Détail et gestion

**PATCH pour mise à jour** :
```javascript
const updateStatut = async (nouveauStatut) => {
    // Ajouter à l'historique
    const historique = demande.historique || [];
    historique.push({
        date: new Date().toISOString(),
        statut: nouveauStatut,
        par: "Admin"
    });

    // Mise à jour partielle (PATCH)
    await fetch(`http://localhost:3001/demandes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            statut: nouveauStatut, 
            historique 
        })
    });
    
    fetchDemande();  // Rafraîchir
};
```

**Système de notes** :
```javascript
const ajouterNote = async (e) => {
    e.preventDefault();
    
    const notes = demande.notes || [];
    notes.push({
        date: new Date().toISOString(),
        contenu: nouvelleNote,
        auteur: "Admin"
    });

    await fetch(`http://localhost:3001/demandes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ notes })
    });

    setNouvelleNote("");
    fetchDemande();
};
```

---

## 🧮 Logique Métier - Calculs Financiers

### Formule de Mensualité

**Formule mathématique** :
```
M = C × t / (1 - (1 + t)^(-n))
```

**Implémentation JavaScript** :
```javascript
const capital = parseFloat(formData.capital);
const dureeAnnees = parseFloat(formData.duree);
const tauxAnnuel = parseFloat(formData.tauxAnnuel);

// Conversion en taux mensuel
const n = dureeAnnees * 12;  // nombre de mois
const t = tauxAnnuel / 12 / 100;  // taux mensuel décimal

// Calcul de la mensualité
const mensualite = (capital * t) / (1 - Math.pow(1 + t, -n));
```

**Exemple concret** :
- Capital : 150 000 €
- Durée : 20 ans (240 mois)
- Taux : 1.5% annuel

```javascript
n = 20 × 12 = 240 mois
t = 1.5 / 12 / 100 = 0.00125

mensualite = (150000 × 0.00125) / (1 - (1.00125)^(-240))
           = 187.5 / (1 - 0.7408)
           = 187.5 / 0.2592
           = 723.53 €
```

### Assurance et Coût Total

```javascript
// Assurance mensuelle (sur capital initial)
const assuranceMensuelle = (capital × tauxAssurance) / 100 / 12;

// Assurance totale sur la durée
const assuranceTotale = assuranceMensuelle × n;

// Mensualité totale
const mensualiteTotale = mensualite + assuranceMensuelle;

// Coût total du crédit
const coutTotal = (mensualite × n) + fraisFixes + assuranceTotale - capital;
```

### TAEG Simplifié

```javascript
const taeg = (coutTotal / (capital × dureeAnnees)) × 100;
```

### Tableau d'Amortissement

```javascript
let capitalRestant = capital;
const tableauAmortissement = [];

for (let mois = 1; mois <= n; mois++) {
    // Intérêts du mois
    const interets = capitalRestant × t;
    
    // Part du capital remboursé
    const principal = mensualite - interets;
    
    // Capital restant après paiement
    capitalRestant -= principal;
    
    // Enregistrement (sélectif pour ne pas surcharger)
    if (mois === 1 || mois % 12 === 0 || mois === n) {
        tableauAmortissement.push({
            mois,
            mensualite: mensualite.toFixed(2),
            principal: principal.toFixed(2),
            interets: interets.toFixed(2),
            assurance: assuranceMensuelle.toFixed(2),
            capitalRestant: Math.max(0, capitalRestant).toFixed(2)
        });
    }
}
```

**Observation importante** :
- Au début : Intérêts élevés, principal faible
- À la fin : Intérêts faibles, principal élevé
- Capital restant décroît de manière non-linéaire

---

## 🔐 Sécurité et Validation

### Validation Côté Client

#### 1. **Validation HTML5**
```jsx
<Input
    type="email"        // Validation format email
    required            // Champ obligatoire
    min="1000"         // Montant minimum
    max="1000000"      // Montant maximum
    step="0.01"        // Précision pour les décimaux
/>
```

#### 2. **Validation JavaScript**
```javascript
const calculerSimulation = (e) => {
    e.preventDefault();
    
    // Parsing et validation
    const capital = parseFloat(formData.capital);
    const dureeAnnees = parseFloat(formData.duree);
    const tauxAnnuel = parseFloat(formData.tauxAnnuel);
    
    // Vérification des valeurs
    if (!capital || !dureeAnnees || !tauxAnnuel) {
        alert("Veuillez remplir tous les champs obligatoires");
        return;
    }
    
    // Vérification des limites
    if (capital < 1000 || capital > 1000000) {
        alert("Le capital doit être entre 1 000 et 1 000 000 €");
        return;
    }
    
    // ... calculs
};
```

#### 3. **Sanitization des Inputs**
```javascript
// Pour les champs texte, éviter les scripts
const sanitizeInput = (input) => {
    return input
        .trim()
        .replace(/<script>/gi, '')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};
```

### Authentification Admin

#### 1. **Login**
```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        // Query sur json-server
        const response = await fetch(
            `http://localhost:3001/users?email=${credentials.email}&password=${credentials.password}`
        );
        const users = await response.json();
        
        // Vérification role admin
        if (users.length > 0 && users[0].role === "admin") {
            // Stockage en localStorage
            localStorage.setItem("admin", JSON.stringify(users[0]));
            navigate("/admin/dashboard");
        } else {
            setError("Email ou mot de passe incorrect");
        }
    } catch (error) {
        setError("Erreur de connexion");
    }
};
```

#### 2. **Protection des Routes**
```javascript
useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
        navigate("/login");
        return;
    }
    // Charger les données
    fetchDemandes();
}, [navigate]);
```

#### 3. **Logout**
```javascript
const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
};
```

### Gestion des Erreurs

#### 1. **Try-Catch Systématique**
```javascript
const fetchDemandes = async () => {
    try {
        const response = await fetch('http://localhost:3001/demandes');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setDemandes(data);
    } catch (error) {
        console.error("Erreur:", error);
        // Afficher un message à l'utilisateur
        setError("Impossible de charger les demandes");
    }
};
```

#### 2. **États de Loading**
```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

if (loading) return <Spinner />;
if (error) return <ErrorMessage message={error} />;
```

---

## ⚡ Performance et Optimisation

### 1. **Optimisation des Re-renders**

#### useCallback pour fonctions stables
```javascript
const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
}, []);
```

#### useMemo pour calculs coûteux
```javascript
const statistiques = useMemo(() => {
    return {
        total: demandes.length,
        enAttente: demandes.filter(d => d.statut === "en_attente").length,
        enCours: demandes.filter(d => d.statut === "en_cours").length,
        acceptees: demandes.filter(d => d.statut === "acceptee").length
    };
}, [demandes]);
```

### 2. **Code Splitting et Lazy Loading**

```javascript
// Chargement lazy des pages admin
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const DemandeDetail = lazy(() => import('./pages/DemandeDetail'));

// Dans App.jsx
<Suspense fallback={<Loading />}>
    <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
</Suspense>
```

### 3. **Optimisation Tailwind**

```javascript
// tailwind.config.js
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}"  // Purge des classes inutilisées
    ],
    // ...
};
```

### 4. **Debouncing pour Recherche**

```javascript
const [searchTerm, setSearchTerm] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");

useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(searchTerm);
    }, 300);  // Attendre 300ms après la dernière frappe
    
    return () => clearTimeout(timer);
}, [searchTerm]);

// Utiliser debouncedSearch pour filtrer
useEffect(() => {
    filterDemandes(debouncedSearch);
}, [debouncedSearch]);
```

---

## 🎤 Guide de Présentation (25 minutes)

### **Partie 1 : Démo (5 minutes)**

#### Script de démonstration :

**1. Page d'accueil (30 secondes)**
- "Voici Salfni, notre solution de simulation de crédit"
- "Design moderne, dark mode, responsive"
- Cliquer sur "Commencer la simulation"

**2. Simulation de crédit (2 minutes)**
- "Formulaire complet avec type de crédit, métier, montant..."
- Remplir : 
  - Type : Immobilier
  - Métier : Ingénieur
  - Capital : 200 000 €
  - Durée : 20 ans
  - Taux : 1.5%
  - Assurance : 0.36%
  
- "Calculs en temps réel avec formules financières standards"
- Montrer les résultats :
  - Mensualité
  - Coût total
  - TAEG
  - Tableau d'amortissement

**3. Demande de crédit (1.5 minutes)**
- Cliquer sur "Faire une demande"
- Remplir le formulaire guest
- "Génération automatique d'un PDF"
- "Création d'une notification pour l'admin"
- Montrer le PDF téléchargé

**4. Espace Admin (1 minute)**
- Se connecter (admin@salfni.com / admin123)
- Dashboard avec stats en temps réel
- Filtre, recherche, tri
- Cliquer sur une demande
- Changer le statut
- Ajouter une note
- Export CSV

### **Partie 2 : Code Source (5 minutes)**

#### **A. Architecture (1 minute)**
```
"Notre application suit une architecture React moderne :
- Composants réutilisables dans /components/custom
- Pages séparées pour chaque vue
- Routing avec React Router
- API REST mockée avec json-server"
```

#### **B. Composant clé : Simulation (2 minutes)**
Montrer le code de `simulation.jsx` :

```javascript
// 1. Gestion d'état
"Utilisation de useState pour les formulaires et résultats"

// 2. Fonction de calcul
"Formule standard de crédit amortissable"
const mensualite = (capital * t) / (1 - Math.pow(1 + t, -n));

// 3. Sauvegarde asynchrone
"Communication avec json-server via fetch"
await fetch('http://localhost:3001/simulations', {
    method: 'POST',
    body: JSON.stringify(data)
});
```

#### **C. Composants réutilisables (1 minute)**
Montrer `input.jsx` et `button.jsx` :

```javascript
"Composants avec forwardRef pour l'accessibilité"
"Props spreading pour la flexibilité"
"Styles cohérents avec Tailwind"
```

#### **D. Table personnalisée (1 minute)**
Montrer `table.jsx` :

```javascript
"Système modulaire : Table, TableHeader, TableBody, TableRow..."
"Export multiple pour composition flexible"
"Styles dark mode avec hover effects"
```

### **Partie 3 : Mise en Situation (10 minutes)**

**Scénario 1 : "Un client signale que ses calculs sont incorrects"**

*Réponse :*
1. "Je vérifie d'abord les données saisies"
2. "Je valide les formules de calcul dans le code"
3. "Je teste avec des valeurs connues"
4. "J'ajoute des logs pour tracer les calculs"

**Code à montrer :**
```javascript
console.log("Capital:", capital, "Durée:", dureeAnnees, "Taux:", tauxAnnuel);
console.log("Taux mensuel:", t, "Nombre de mois:", n);
console.log("Mensualité calculée:", mensualite);
```

**Scénario 2 : "Ajouter un nouveau type de crédit 'Études'"**

*Réponse :*
1. "Je modifie le select dans simulation.jsx"
```javascript
<option value="etudes">Crédit études</option>
```
2. "Aucune autre modification nécessaire car le code est générique"
3. "Le type sera automatiquement sauvegardé et affiché"

**Scénario 3 : "L'admin veut filtrer par montant minimum"**

*Réponse :*
1. "J'ajoute un input dans le dashboard"
```javascript
const [montantMin, setMontantMin] = useState("");
```
2. "Je modifie le useEffect de filtrage"
```javascript
if (montantMin) {
    filtered = filtered.filter(d => 
        parseFloat(d.simulationData.capital) >= parseFloat(montantMin)
    );
}
```

**Scénario 4 : "Performance : 1000 demandes dans le tableau"**

*Réponse :*
1. "Implémenter la pagination"
2. "Utiliser la virtualisation (react-window)"
3. "Limiter les résultats côté serveur"

**Scénario 5 : "Sécurité : Protéger l'API admin"**

*Réponse actuelle :*
- "localStorage pour l'auth (démo)"
- "Vérification côté client"

*Amélioration production :*
1. "JWT tokens avec HttpOnly cookies"
2. "Backend Node.js/Express réel"
3. "Validation côté serveur"
4. "Rate limiting"
5. "HTTPS obligatoire"

### **Partie 4 : Questions Culture Web (5 minutes)**

#### Questions probables et réponses :

**Q1 : "Quelle est la différence entre useState et useRef ?"**
```
useState : 
- Provoque un re-render quand changé
- Pour les données qui affectent le UI

useRef :
- Ne provoque pas de re-render
- Pour stocker des valeurs mutables (timers, DOM refs)
```

**Q2 : "Expliquez le Virtual DOM"**
```
Le Virtual DOM est une représentation en mémoire du DOM réel.
React compare le nouveau Virtual DOM avec l'ancien (diffing),
puis met à jour seulement les éléments qui ont changé.
Cela optimise les performances en évitant des manipulations DOM coûteuses.
```

**Q3 : "Qu'est-ce qu'une closure en JavaScript ?"**
```
Une closure est une fonction qui se souvient de son environnement lexical,
même après que sa fonction parente ait terminé son exécution.

Exemple dans notre code :
const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Cette fonction "se souvient" de formData
};
```

**Q4 : "Différence entre useEffect et useLayoutEffect ?"**
```
useEffect : Asynchrone, exécuté après le render et paint
useLayoutEffect : Synchrone, bloque le paint jusqu'à l'exécution

Usage :
- useEffect : La plupart des cas (fetch, subscriptions)
- useLayoutEffect : Mesures DOM, animations synchrones
```

**Q5 : "Qu'est-ce que le hoisting ?"**
```
Le hoisting est le mécanisme JavaScript qui déplace les déclarations
en haut de leur scope.

var : hoisted (undefined)
let/const : hoisted mais Temporal Dead Zone
functions : entièrement hoisted
```

**Q6 : "REST vs GraphQL ?"**
```
REST :
- Endpoints multiples (/users, /posts)
- Over-fetching ou under-fetching
- Cacheable facilement

GraphQL :
- Un seul endpoint
- Client demande exactement ce dont il a besoin
- Typage fort

Notre projet utilise REST car plus simple pour un MVP.
```

**Q7 : "Expliquez CORS"**
```
Cross-Origin Resource Sharing.
Mécanisme de sécurité du navigateur qui bloque les requêtes
entre différentes origines (domaine, protocole, port).

Solution : 
- En dev : json-server ajoute les headers CORS
- En prod : Configurer le serveur avec Access-Control-Allow-Origin
```

**Q8 : "Async/Await vs Promises ?"**
```
Promises : .then().catch()
const data = await fetch(url).then(res => res.json());

Async/Await : Syntaxe plus lisible
const response = await fetch(url);
const data = await response.json();

Async/await utilise les Promises en interne.
On peut mélanger : await retourne une Promise.
```

**Q9 : "Qu'est-ce que le Tree Shaking ?"**
```
Technique d'optimisation qui élimine le code mort (non utilisé) du bundle.

Vite le fait automatiquement.
Important d'utiliser des imports nommés :
import { useState } from 'react';  // ✓
import * as React from 'react';     // ✗ (importe tout)
```

**Q10 : "Sécurité XSS dans React ?"**
```
React échappe automatiquement les valeurs JSX.
Danger avec dangerouslySetInnerHTML :

<div dangerouslySetInnerHTML={{__html: userInput}} />  // ✗ Danger

Solution : Sanitize avec DOMPurify
```

---

## 📋 Checklist avant Présentation

### Technique
- [ ] json-server fonctionne (port 3001)
- [ ] Application démarre sans erreur
- [ ] Toutes les pages sont accessibles
- [ ] PDF se génère correctement
- [ ] CSV s'exporte correctement
- [ ] Login admin fonctionne
- [ ] Filtres et recherche réactifs

### Démo
- [ ] Données de test dans db.json
- [ ] Navigateur en plein écran
- [ ] Extensions de dev désactivées
- [ ] Cache navigateur vidé
- [ ] Console ouverte et propre

### Code
- [ ] Code propre et commenté
- [ ] Indentation cohérente
- [ ] Pas de console.log inutiles
- [ ] Variables bien nommées
- [ ] Fichiers organisés

### Documentation
- [ ] README.md complet
- [ ] INSTALLATION.md clair
- [ ] Guide technique préparé
- [ ] Architecture documentée

---

## 🎯 Points Forts à Mettre en Avant

1. **Architecture propre** - Séparation des responsabilités
2. **Composants réutilisables** - DRY principle
3. **Calculs financiers précis** - Formules standards
4. **UX soignée** - Dark mode, animations, responsive
5. **Fonctionnalités complètes** - Tout le cahier des charges
6. **Code modulaire** - Facile à maintenir et étendre
7. **Performance** - Vite, optimisations React
8. **Documentation** - README complet, code commenté

---

**Bonne chance pour votre présentation ! 🚀**

