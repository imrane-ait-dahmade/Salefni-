# 🎤 Support de Présentation - Salfni
## Soutenance de 25 minutes

---

## 📑 Sommaire de la Présentation

1. **Démo Fonctionnalités** (5 min)
2. **Code Source et Architecture** (5 min)
3. **Mise en Situation** (10 min)
4. **Code Review & Questions Culture Web** (5 min)

---

# 🎬 PARTIE 1 : DÉMO FONCTIONNALITÉS (5 minutes)

## Slide 1 : Introduction (30 secondes)

### À dire :
> "Bonjour, je vous présente **Salfni**, une application web moderne de simulation et gestion de crédits en ligne.
> 
> Salfni permet aux visiteurs de simuler différents types de crédits avec des calculs financiers précis, puis de soumettre des demandes. Un espace administrateur complet permet de gérer ces demandes."

**Montrer :** Page d'accueil

---

## Slide 2 : Simulation de Crédit (2 minutes)

### À montrer :
1. **Naviguer vers /simulation**
   
2. **Remplir le formulaire :**
   - Type : Crédit immobilier
   - Métier : Ingénieur informatique
   - Montant : 200 000 €
   - Durée : 20 ans
   - Taux : 1.5%
   - Assurance : 0.36%
   - Frais : 1000 €

3. **Cliquer sur "Calculer"**

### À expliquer :
> "Le formulaire utilise la formule standard de crédit amortissable pour calculer :
> - La mensualité hors assurance : **966,24 €**
> - La mensualité totale avec assurance
> - Le coût total du crédit
> - Le TAEG
> 
> Un tableau d'amortissement montre l'évolution du remboursement mois par mois."

**Points clés :**
- ✅ Calculs instantanés
- ✅ Interface claire et intuitive
- ✅ Validation des données en temps réel

---

## Slide 3 : Demande de Crédit (1.5 minutes)

### À montrer :
1. **Cliquer sur "Faire une demande de crédit"**

2. **Remplir le formulaire modal :**
   - Nom : Dupont
   - Prénom : Jean
   - Email : jean.dupont@email.com
   - Téléphone : 06 12 34 56 78
   - Revenu : 3500 €
   - Situation : CDI
   - Commentaire : "Projet d'achat résidence principale"

3. **Soumettre la demande**

### À expliquer :
> "Lors de la soumission :
> 1. La demande est enregistrée dans la base de données
> 2. Une notification est créée pour l'administrateur
> 3. Un PDF récapitulatif est automatiquement généré et téléchargé
> 
> Le visiteur reçoit un message de confirmation."

**Montrer le PDF téléchargé**

---

## Slide 4 : Espace Administrateur (1 minute)

### À montrer :
1. **Se déconnecter / Aller sur /login**

2. **Se connecter :**
   - Email : admin@salfni.com
   - Mot de passe : admin123

3. **Dashboard Admin :**
   - Statistiques en temps réel
   - Badge de notification (1 nouvelle demande)
   - Liste des demandes

### À expliquer :
> "L'administrateur a accès à un dashboard complet avec :
> - Des statistiques globales
> - Un système de notifications
> - Des filtres puissants (statut, recherche, tri)
> - Un export CSV de toutes les données"

**Démontrer :**
- Rechercher "Dupont"
- Filtrer par statut "En attente"
- Trier par montant décroissant

---

## Slide 5 : Gestion d'une Demande (1 minute)

### À montrer :
1. **Cliquer sur "Voir" pour la demande de Jean Dupont**

2. **Page de détail :**
   - Informations complètes du demandeur
   - Détails du crédit simulé
   - Résultats de simulation

3. **Actions :**
   - Changer le statut → "En cours"
   - Ajouter une note : "Dossier complet, revenus stables"
   - Marquer comme prioritaire (étoile)

### À expliquer :
> "L'admin peut :
> - Changer le statut de la demande (workflow complet)
> - Ajouter des notes internes pour le suivi
> - Marquer des demandes prioritaires
> - Consulter l'historique de tous les changements
> 
> Toutes les modifications sont sauvegardées en temps réel."

**Retourner au dashboard → Exporter en CSV**

---

# 💻 PARTIE 2 : CODE SOURCE (5 minutes)

## Slide 6 : Architecture Globale (1 minute)

### Schéma à montrer :

```
┌─────────────────────────────────────┐
│      Frontend (React + Vite)       │
│                                     │
│  ├── Components (Réutilisables)    │
│  ├── Pages (Routes)                │
│  └── Styles (Tailwind)             │
└─────────────────────────────────────┘
              ↕ HTTP (fetch)
┌─────────────────────────────────────┐
│     Backend (json-server)           │
│                                     │
│  ├── /simulations                  │
│  ├── /demandes                     │
│  ├── /notifications                │
│  └── /users                        │
└─────────────────────────────────────┘
```

### À expliquer :
> "Architecture moderne avec séparation claire :
> - **Frontend** : React 19 avec Vite pour des performances optimales
> - **Backend** : json-server pour l'API REST mockée
> - **Communication** : fetch API avec gestion d'erreur complète"

---

## Slide 7 : Structure du Projet (30 secondes)

### Ouvrir le projet dans VS Code

```
src/
├── components/
│   ├── custom/          # 🔧 Composants réutilisables
│   │   ├── button.jsx   # Bouton stylisé
│   │   ├── input.jsx    # Input avec label
│   │   └── table.jsx    # Table complète modulaire
│   └── DemandeForm.jsx  # Modal demande
│
├── pages/               # 📄 Pages de l'app
│   ├── home.jsx
│   ├── simulation.jsx   # ⭐ Composant principal
│   ├── AdminDashboard.jsx
│   └── DemandeDetail.jsx
```

### À dire :
> "Organisation modulaire et scalable. Chaque composant a une responsabilité unique."

---

## Slide 8 : Composant Clé - Simulation (2 minutes)

### Ouvrir `simulation.jsx`

### Montrer et expliquer :

**1. Gestion d'état (ligne ~8-16)**
```javascript
const [formData, setFormData] = useState({
    typeCredit: "consommation",
    metier: "",
    capital: "",
    // ...
});

const [results, setResults] = useState(null);
const [amortissement, setAmortissement] = useState([]);
```

> "Utilisation de **useState** pour gérer les données du formulaire et les résultats."

**2. Fonction de calcul (ligne ~29-96)**
```javascript
const calculerSimulation = (e) => {
    e.preventDefault();
    
    // Conversion et validation
    const capital = parseFloat(formData.capital);
    const n = dureeAnnees * 12;
    const t = tauxAnnuel / 12 / 100;
    
    // Formule de mensualité
    const mensualite = (capital * t) / (1 - Math.pow(1 + t, -n));
    
    // ...
};
```

> "La formule standard de crédit amortissable :  
> **M = C × t / (1 - (1 + t)^-n)**
> 
> Avec validation des données avant calcul."

**3. Sauvegarde asynchrone (ligne ~107-117)**
```javascript
const sauvegarderSimulation = async (data) => {
    try {
        await fetch('http://localhost:3001/simulations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.log("Erreur de sauvegarde:", error);
    }
};
```

> "Gestion asynchrone avec **async/await** et **try-catch** pour la robustesse."

---

## Slide 9 : Composants Réutilisables (1 minute)

### Ouvrir `button.jsx`

```javascript
const Button = forwardRef(({ title, fct, style = "", ...props }, ref) => {
  return (
    <button 
      ref={ref}
      className={`
        inline-flex items-center justify-center 
        rounded-md px-4 py-2 text-sm font-medium
        transition-colors duration-200
        ${style}
      `}
      onClick={fct}
      {...props}
    >
      {title}
    </button>
  );
});

Button.displayName = 'Button';
```

### À expliquer :
> "**Pattern de conception moderne :**
> - **forwardRef** : Permet de passer des refs pour l'accessibilité
> - **Props spreading** (...props) : Extensibilité maximale
> - **Merge de styles** : Classes de base + personnalisables
> - **displayName** : Meilleur debugging"

### Ouvrir `table.jsx`

```javascript
export default Table;
export { TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell };
```

> "**Table modulaire** avec 6 composants exportés :
> - Composition flexible à la shadcn/ui
> - Styles cohérents (dark mode)
> - Réutilisable pour n'importe quel tableau de données"

---

## Slide 10 : Gestion Admin Avancée (1 minute)

### Ouvrir `AdminDashboard.jsx`

**Montrer le useEffect de filtrage (ligne ~47-81)**

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

    // Tri dynamique
    filtered.sort((a, b) => { /* ... */ });

    setFilteredDemandes(filtered);
}, [searchTerm, filterStatut, sortBy, demandes]);
```

### À expliquer :
> "**Filtrage réactif avec useEffect** :
> - Dépendances multiples : [searchTerm, filterStatut, sortBy, demandes]
> - Recalcul automatique à chaque changement
> - Performance : Tri sur données déjà filtrées
> - UX : Résultats instantanés"

**Montrer l'export CSV (ligne ~105-126)**

```javascript
const exportCSV = () => {
    const headers = ["Date", "Nom", "Prénom", "Email", ...];
    const rows = filteredDemandes.map(d => [/* ... */]);
    
    const csv = [headers, ...rows]
        .map(row => row.join(";"))
        .join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `demandes_${Date.now()}.csv`;
    link.click();
};
```

> "**Export CSV côté client** :
> - Création d'un Blob
> - Téléchargement programmatique
> - Nom de fichier avec timestamp"

---

# 🎭 PARTIE 3 : MISE EN SITUATION (10 minutes)

## Situation 1 : Bug - Calculs Incorrects (2 minutes)

### Question :
> "Un utilisateur signale que les calculs de sa simulation sont incorrects pour un prêt de 100 000€ sur 15 ans à 2%. Comment débuguer ?"

### Réponse (démontrer) :

**1. Reproduire le problème**
```javascript
// Dans la console du navigateur
const capital = 100000;
const dureeAnnees = 15;
const tauxAnnuel = 2;

const n = dureeAnnees * 12;  // 180 mois
const t = tauxAnnuel / 12 / 100;  // 0.001666...

console.log("n =", n);
console.log("t =", t);

const mensualite = (capital * t) / (1 - Math.pow(1 + t, -n));
console.log("Mensualité calculée:", mensualite.toFixed(2));
```

**2. Vérifier avec un calculateur externe**
- Aller sur un site de calcul de crédit
- Comparer les résultats

**3. Ajouter des logs dans le code**
```javascript
const calculerSimulation = (e) => {
    // ... parsing
    
    console.group("🧮 Calcul de simulation");
    console.log("Capital:", capital);
    console.log("Durée (années):", dureeAnnees);
    console.log("Taux annuel:", tauxAnnuel);
    console.log("n (mois):", n);
    console.log("t (taux mensuel):", t);
    console.log("Mensualité:", mensualite);
    console.groupEnd();
};
```

**4. Tests unitaires (proposition)**
```javascript
// simulation.test.js
test('calcul mensualité pour 100k sur 15 ans à 2%', () => {
    const result = calculerMensualite(100000, 15, 2);
    expect(result).toBeCloseTo(643.51, 2);
});
```

---

## Situation 2 : Nouvelle Fonctionnalité (2 minutes)

### Question :
> "Le client veut ajouter un nouveau type de crédit 'Écologique' avec un taux bonifié. Comment l'implémenter ?"

### Réponse (coder en live) :

**1. Modifier le formulaire de simulation**
```javascript
// Dans simulation.jsx, ligne ~133-146
<select name="typeCredit" value={formData.typeCredit} onChange={handleChange}>
    <option value="consommation">Crédit à la consommation</option>
    <option value="auto">Crédit auto</option>
    <option value="immobilier">Crédit immobilier</option>
    <option value="personnel">Crédit personnel</option>
    <option value="travaux">Crédit travaux</option>
    <option value="ecologique">Crédit écologique</option> {/* ← NOUVEAU */}
</select>
```

**2. Optionnel : Ajouter une logique de taux bonifié**
```javascript
const calculerSimulation = (e) => {
    // ... parsing initial
    
    let tauxFinal = tauxAnnuel;
    
    // Bonification pour crédit écologique
    if (formData.typeCredit === "ecologique") {
        tauxFinal = tauxAnnuel * 0.8;  // -20% de taux
        console.log("🌱 Taux bonifié appliqué:", tauxFinal);
    }
    
    const t = tauxFinal / 12 / 100;
    // ... reste du calcul
};
```

**3. Mettre à jour les labels si nécessaire**
```javascript
const typeCreditLabels = {
    consommation: "Crédit à la consommation",
    auto: "Crédit auto",
    immobilier: "Crédit immobilier",
    personnel: "Crédit personnel",
    travaux: "Crédit travaux",
    ecologique: "Crédit écologique 🌱"
};
```

> "**Avantage de l'architecture actuelle :**
> - Modification minimale (1 ligne de code principal)
> - Aucun changement dans l'API
> - Aucun changement dans l'admin
> - Le type sera automatiquement affiché partout"

---

## Situation 3 : Performance (2 minutes)

### Question :
> "Le dashboard devient lent avec 1000+ demandes. Comment optimiser ?"

### Réponse :

**1. Analyser le problème**
> "Le problème : Re-render complet de la table à chaque filtre"

**2. Solutions à implémenter**

**a) Pagination**
```javascript
const ITEMS_PER_PAGE = 20;
const [currentPage, setCurrentPage] = useState(1);

const paginatedDemandes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredDemandes.slice(start, end);
}, [filteredDemandes, currentPage]);

// Afficher paginatedDemandes au lieu de filteredDemandes
```

**b) Virtualisation avec react-window**
```bash
npm install react-window
```

```javascript
import { FixedSizeList } from 'react-window';

<FixedSizeList
    height={600}
    itemCount={filteredDemandes.length}
    itemSize={60}
    width="100%"
>
    {({ index, style }) => (
        <div style={style}>
            {/* Ligne de tableau */}
        </div>
    )}
</FixedSizeList>
```

**c) Debouncing de la recherche**
```javascript
useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(searchTerm);
    }, 300);  // Attendre 300ms
    
    return () => clearTimeout(timer);
}, [searchTerm]);
```

**d) Pagination côté serveur**
```javascript
// Au lieu de fetch('/demandes')
fetch('/demandes?_page=1&_limit=20&_sort=dateCreation&_order=desc')
```

**e) React.memo pour les lignes**
```javascript
const TableRow = React.memo(({ demande }) => {
    return (
        <tr>
            {/* ... */}
        </tr>
    );
});
```

---

## Situation 4 : Sécurité (2 minutes)

### Question :
> "Comment sécuriser l'application pour la production ?"

### Réponse :

**Problèmes actuels (dev) :**
1. ❌ Mot de passe en clair dans db.json
2. ❌ Authentification localStorage (facile à manipuler)
3. ❌ Pas de validation côté serveur
4. ❌ json-server accepte toutes les requêtes

**Solutions production :**

**1. Backend sécurisé**
```javascript
// Remplacer json-server par Express + MongoDB

// server.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    // 1. Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    // 2. Vérifier le mot de passe hashé
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    
    // 3. Générer un JWT
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    
    // 4. Retourner le token
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
});
```

**2. Middleware d'authentification**
```javascript
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Protéger les routes admin
app.get('/api/demandes', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    // ...
});
```

**3. Stockage sécurisé côté client**
```javascript
// Utiliser httpOnly cookies au lieu de localStorage
// Le serveur set le cookie, le navigateur l'envoie automatiquement

// Ou stocker le token en mémoire (pas de persistance)
const [token, setToken] = useState(null);
```

**4. HTTPS obligatoire**
```javascript
// Dans Express
if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
}
```

**5. Rate limiting**
```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 tentatives max
    message: 'Trop de tentatives, réessayez plus tard'
});

app.post('/api/login', loginLimiter, loginHandler);
```

**6. Validation côté serveur**
```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/demandes',
    body('email').isEmail(),
    body('capital').isNumeric().isInt({ min: 1000, max: 1000000 }),
    body('nom').trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // ...
    }
);
```

**7. Protection XSS**
```javascript
const helmet = require('helmet');
const xss = require('xss-clean');

app.use(helmet());  // Headers de sécurité
app.use(xss());     // Sanitize inputs
```

---

## Situation 5 : Tests (2 minutes)

### Question :
> "Comment mettre en place des tests automatisés ?"

### Réponse :

**1. Installation des outils**
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

**2. Tests unitaires - Calculs**
```javascript
// __tests__/calculations.test.js
import { describe, it, expect } from 'vitest';

describe('Calculs de crédit', () => {
    it('calcule correctement la mensualité', () => {
        const capital = 100000;
        const dureeAnnees = 15;
        const tauxAnnuel = 2;
        
        const n = dureeAnnees * 12;
        const t = tauxAnnuel / 12 / 100;
        const mensualite = (capital * t) / (1 - Math.pow(1 + t, -n));
        
        expect(mensualite).toBeCloseTo(643.51, 2);
    });
    
    it('calcule correctement le TAEG', () => {
        const capital = 100000;
        const coutTotal = 15831.80;
        const dureeAnnees = 15;
        
        const taeg = (coutTotal / (capital * dureeAnnees)) * 100;
        
        expect(taeg).toBeCloseTo(1.06, 2);
    });
});
```

**3. Tests de composants**
```javascript
// __tests__/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../src/components/custom/button';

describe('Button Component', () => {
    it('affiche le titre correctement', () => {
        render(<Button title="Cliquer ici" />);
        expect(screen.getByText('Cliquer ici')).toBeInTheDocument();
    });
    
    it('appelle la fonction au clic', () => {
        const handleClick = vi.fn();
        render(<Button title="Test" fct={handleClick} />);
        
        fireEvent.click(screen.getByText('Test'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
```

**4. Tests d'intégration**
```javascript
// __tests__/Simulation.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Simulation from '../src/pages/simulation';

describe('Simulation Page', () => {
    it('affiche les résultats après calcul', async () => {
        render(<Simulation />);
        
        // Remplir le formulaire
        fireEvent.change(screen.getByLabelText(/Montant/), {
            target: { value: '100000' }
        });
        fireEvent.change(screen.getByLabelText(/Durée/), {
            target: { value: '15' }
        });
        fireEvent.change(screen.getByLabelText(/Taux/), {
            target: { value: '2' }
        });
        
        // Soumettre
        fireEvent.click(screen.getByText('Calculer'));
        
        // Vérifier les résultats
        await waitFor(() => {
            expect(screen.getByText(/643\.51/)).toBeInTheDocument();
        });
    });
});
```

**5. Tests E2E avec Playwright**
```javascript
// e2e/simulation.spec.js
import { test, expect } from '@playwright/test';

test('parcours complet simulation + demande', async ({ page }) => {
    // 1. Aller sur la simulation
    await page.goto('http://localhost:5173/simulation');
    
    // 2. Remplir le formulaire
    await page.fill('[name="capital"]', '100000');
    await page.fill('[name="duree"]', '15');
    await page.fill('[name="tauxAnnuel"]', '2');
    
    // 3. Calculer
    await page.click('text=Calculer');
    
    // 4. Vérifier les résultats
    await expect(page.locator('text=/643\\.51/')).toBeVisible();
    
    // 5. Faire une demande
    await page.click('text=Faire une demande');
    await page.fill('[name="nom"]', 'Dupont');
    await page.fill('[name="email"]', 'test@example.com');
    await page.click('text=Envoyer');
    
    // 6. Vérifier le succès
    await expect(page.locator('text=/succès/')).toBeVisible();
});
```

**6. Lancer les tests**
```json
// package.json
{
    "scripts": {
        "test": "vitest",
        "test:ui": "vitest --ui",
        "test:coverage": "vitest --coverage",
        "test:e2e": "playwright test"
    }
}
```

---

# 🤓 PARTIE 4 : CODE REVIEW & QUESTIONS CULTURE WEB (5 minutes)

## Code Review (2 minutes)

### Points à mettre en avant :

**1. Architecture propre**
> "Séparation claire : components/pages, réutilisabilité maximale"

**2. Hooks modernes**
> "Utilisation appropriée de useState, useEffect, useNavigate, useParams"

**3. Gestion d'erreur**
> "Try-catch systématique, feedback utilisateur"

**4. Performance**
> "useEffect avec dépendances correctes, pas de re-renders inutiles"

**5. Accessibilité**
> "forwardRef, htmlFor sur les labels, aria-labels"

**6. Code propre**
> "Nommage clair, commentaires pertinents, indentation cohérente"

---

## Questions Culture Web (3 minutes)

### Question 1 : Virtual DOM
> **Q :** "Expliquez le concept du Virtual DOM dans React."

**Réponse :**
> "Le Virtual DOM est une représentation en mémoire du DOM réel. Quand l'état change :
> 1. React crée un nouveau Virtual DOM
> 2. Compare avec l'ancien (algorithme de diffing)
> 3. Calcule les changements minimaux nécessaires
> 4. Met à jour seulement ces éléments dans le vrai DOM
> 
> **Avantage :** Performance – manipuler le DOM est coûteux, React minimise ces opérations."

---

### Question 2 : Closures
> **Q :** "Qu'est-ce qu'une closure ? Donnez un exemple."

**Réponse :**
> "Une closure est une fonction qui 'se souvient' de son environnement lexical, même après que sa fonction parente ait terminé.
> 
> **Exemple dans notre code :**"

```javascript
const createCounter = () => {
    let count = 0;  // Variable privée
    
    return {
        increment: () => ++count,
        getCount: () => count
    };
};

const counter = createCounter();
counter.increment();  // 1
counter.increment();  // 2
counter.getCount();   // 2
// count n'est pas accessible directement
```

> "Les fonctions retournées 'se souviennent' de la variable count."

---

### Question 3 : Async/Await vs Promises
> **Q :** "Différence entre Promises et async/await ?"

**Réponse :**
> "async/await est du sucre syntaxique au-dessus des Promises.
> 
> **Promises :**"

```javascript
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

> "**Async/Await :** (plus lisible)"

```javascript
try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
} catch (error) {
    console.error(error);
}
```

> "Async/await utilise les Promises en interne. On peut mélanger les deux."

---

### Question 4 : Hoisting
> **Q :** "Qu'est-ce que le hoisting en JavaScript ?"

**Réponse :**
> "Le hoisting est le comportement JavaScript qui 'remonte' les déclarations en haut de leur scope."

```javascript
console.log(x);  // undefined (pas d'erreur)
var x = 5;

// Équivalent à :
var x;  // Déclaration remontée
console.log(x);  // undefined
x = 5;

// MAIS avec let/const :
console.log(y);  // ReferenceError: Cannot access 'y' before initialization
let y = 5;
```

> "**let/const** sont hoistées mais dans la 'Temporal Dead Zone' jusqu'à leur ligne de déclaration.
> 
> **Functions** sont entièrement hoistées (déclaration + définition)."

---

### Question 5 : REST vs GraphQL
> **Q :** "Différence entre REST et GraphQL ?"

**Réponse :**

| Aspect | REST | GraphQL |
|--------|------|---------|
| **Endpoints** | Multiples (/users, /posts) | Un seul (/graphql) |
| **Data fetching** | Fixe (défini par le serveur) | Flexible (client choisit) |
| **Over-fetching** | Courant | Non, requête précise |
| **Under-fetching** | Requêtes multiples nécessaires | Une seule requête |
| **Typage** | Non (documentation séparée) | Oui (schema fort) |
| **Caching** | Facile (HTTP) | Plus complexe |

> "**Notre choix (REST) :** Plus simple pour un MVP, cacheable facilement, standard bien établi."

---

### Question 6 : CORS
> **Q :** "Expliquez CORS."

**Réponse :**
> "Cross-Origin Resource Sharing.
> 
> **Problème :** Par défaut, un navigateur bloque les requêtes JavaScript vers un domaine différent (sécurité).
> 
> **Exemple :**"

```
Frontend : http://localhost:5173
Backend  : http://localhost:3001
→ Origines différentes (ports différents)
→ CORS requis
```

> "**Solution :** Le serveur doit envoyer des headers CORS :
> - `Access-Control-Allow-Origin: http://localhost:5173`
> - `Access-Control-Allow-Methods: GET, POST, PATCH`
> - `Access-Control-Allow-Headers: Content-Type`
> 
> json-server les ajoute automatiquement en dev."

---

### Question 7 : Event Loop
> **Q :** "Comment fonctionne l'Event Loop JavaScript ?"

**Réponse :**
> "JavaScript est single-threaded, mais peut gérer des opérations asynchrones grâce à l'Event Loop."

**Schéma :**
```
┌─────────────────────┐
│   Call Stack        │  (Fonctions en exécution)
└─────────────────────┘
         ↑
         │
┌─────────────────────┐
│   Event Loop        │  (Vérifie en boucle)
└─────────────────────┘
         ↑
         │
┌─────────────────────┐
│   Task Queue        │  (Callbacks setTimeout, etc.)
└─────────────────────┘
         ↑
         │
┌─────────────────────┐
│   Microtask Queue   │  (Promises, async/await)
└─────────────────────┘
```

**Exemple :**
```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// Output: 1, 4, 3, 2
// Les Promises (microtasks) ont priorité sur setTimeout (tasks)
```

---

### Question 8 : useEffect Dependencies
> **Q :** "Pourquoi spécifier des dépendances dans useEffect ?"

**Réponse :**
> "Les dépendances déterminent QUAND l'effet doit se ré-exécuter."

```javascript
// 1. Pas de tableau : Execute à chaque render
useEffect(() => {
    console.log('Every render');
});

// 2. Tableau vide : Execute UNE FOIS (mount)
useEffect(() => {
    console.log('Component mounted');
}, []);

// 3. Avec dépendances : Execute quand les deps changent
useEffect(() => {
    console.log('searchTerm changed');
}, [searchTerm]);
```

> "**Règle :** Toute variable utilisée DANS l'effet doit être dans les dépendances (sauf fonctions de setState)."

```javascript
// ✅ Correct
useEffect(() => {
    fetchData(userId);  // userId utilisé
}, [userId]);  // userId dans les deps

// ❌ Incorrect (warning React)
useEffect(() => {
    fetchData(userId);  // userId utilisé
}, []);  // userId manquant
```

---

### Question 9 : React.memo
> **Q :** "À quoi sert React.memo ?"

**Réponse :**
> "React.memo est un HOC (Higher-Order Component) qui optimise les performances en **memoïzant** un composant."

```javascript
const ExpensiveComponent = React.memo(({ data }) => {
    // Rendu coûteux
    return <div>{/* ... */}</div>;
});

// Le composant ne se re-render QUE si `data` change
// Comparaison shallow par défaut
```

**Quand l'utiliser :**
- Composants avec rendu coûteux
- Props qui changent rarement
- Listes avec beaucoup d'éléments

**Attention :**
- Overhead si props changent souvent
- Comparaison personnalisée possible :

```javascript
const MyComponent = React.memo(
    (props) => { /* ... */ },
    (prevProps, nextProps) => {
        // true = ne PAS re-render
        return prevProps.id === nextProps.id;
    }
);
```

---

### Question 10 : JWT vs Session
> **Q :** "Différence entre JWT et sessions ?"

**Réponse :**

**Sessions (stateful) :**
```
Client                    Server
  │                         │
  │──── Login ─────────────>│
  │<──── Set-Cookie ────────│ (ID de session stocké en DB)
  │                         │
  │──── Request + Cookie ──>│
  │                         │ Cherche session en DB
  │<──── Response ──────────│
```

**JWT (stateless) :**
```
Client                    Server
  │                         │
  │──── Login ─────────────>│
  │<──── JWT token ─────────│ (Signé, contient les données)
  │                         │
  │──── Request + JWT ─────>│
  │                         │ Vérifie la signature
  │<──── Response ──────────│
```

**Comparaison :**

| Aspect | Session | JWT |
|--------|---------|-----|
| **Storage serveur** | Oui (DB/Redis) | Non |
| **Scalabilité** | Difficile (sticky sessions) | Facile |
| **Révocation** | Facile | Difficile* |
| **Size** | Petit (cookie ID) | Plus grand (contient data) |
| **Security** | Secure cookie | Stockage client |

> "*Révocation JWT : nécessite une blacklist côté serveur → perd l'avantage stateless."

---

# 🎯 CONCLUSION (30 secondes)

### Message final :

> "**Salfni** démontre :
> - ✅ Maîtrise de React moderne et de son écosystème
> - ✅ Capacité à structurer une application complexe
> - ✅ Attention aux détails UX et qualité du code
> - ✅ Compréhension des concepts web fondamentaux
> 
> Le projet est **complet, fonctionnel, et prêt pour la production** après sécurisation du backend.
> 
> Merci pour votre attention ! Des questions ?"

---

## 📋 Checklist Avant Présentation

### Technique
- [ ] json-server démarré (port 3001)
- [ ] React app démarré (port 5173)
- [ ] Pas d'erreurs console
- [ ] PDF de test prêt à montrer
- [ ] CSV d'export prêt

### Présentation
- [ ] VS Code ouvert sur le projet
- [ ] Navigateur avec l'app ouverte
- [ ] Console développeur accessible (F12)
- [ ] db.json avec données de démo
- [ ] README.md disponible

### Documents
- [ ] README.md
- [ ] GUIDE_TECHNIQUE_COMPLET.md
- [ ] BRIEF_COMPLET_REALISE.md
- [ ] Ce support (PRESENTATION_SOUTENANCE.md)

---

**Bonne chance pour votre présentation ! 🚀**

Vous êtes prêt ! 💪

