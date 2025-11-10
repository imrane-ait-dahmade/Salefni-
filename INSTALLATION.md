# Guide d'installation - Salfni

## 📦 Installation rapide

### Étape 1 : Installer les dépendances npm

```bash
npm install
```

### Étape 2 : Installer jsPDF (pour export PDF)

```bash
npm install jspdf
```

### Étape 3 : Installer json-server globalement

```bash
npm install -g json-server
```

OU localement dans le projet :

```bash
npm install --save-dev json-server
```

## 🚀 Démarrage

### Terminal 1 : Backend API (json-server)

```bash
json-server --watch db.json --port 3001
```

OU si installé localement :

```bash
npx json-server --watch db.json --port 3001
```

### Terminal 2 : Application React

```bash
npm start
```

L'application sera disponible sur : `http://localhost:3000`

## ✅ Vérification de l'installation

1. **Backend API** : Ouvrir `http://localhost:3001` dans un navigateur
   - Vous devriez voir les endpoints disponibles

2. **Application React** : Ouvrir `http://localhost:3000`
   - La page d'accueil devrait s'afficher

3. **Test de simulation** :
   - Aller sur `/simulation`
   - Remplir le formulaire
   - Cliquer sur "Calculer"
   - Les résultats devraient s'afficher

4. **Test admin** :
   - Aller sur `/login`
   - Identifiants : `admin@salfni.com` / `admin123`
   - Accès au dashboard

## 🐛 Problèmes courants

### "Cannot read properties of null (reading 'matches')"

Solution : Supprimer `node_modules` et réinstaller

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### "Port 3001 already in use"

Solution : Tuer le processus sur le port 3001

Windows PowerShell :
```powershell
netstat -ano | findstr :3001
taskkill /PID [PID_NUMBER] /F
```

Linux/Mac :
```bash
lsof -ti:3001 | xargs kill
```

### "Module not found: Can't resolve 'jspdf'"

Solution :
```bash
npm install jspdf
```

### Erreur CORS

Vérifier que json-server est bien démarré sur le port 3001.

## 📋 Dépendances requises

Le projet nécessite les dépendances suivantes (déjà dans package.json si présent) :

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "jspdf": "^2.x"
  },
  "devDependencies": {
    "json-server": "^0.17.x"
  }
}
```

## 🎯 Accès rapide

- **Page d'accueil** : http://localhost:3000/home
- **Simulation** : http://localhost:3000/simulation
- **Login Admin** : http://localhost:3000/login
- **Dashboard Admin** : http://localhost:3000/admin/dashboard (après connexion)
- **API Backend** : http://localhost:3001

## 📝 Données de test

### Compte Admin
- Email : `admin@salfni.com`
- Mot de passe : `admin123`

### Exemple de simulation
- Type de crédit : Immobilier
- Métier : Ingénieur
- Montant : 200000 €
- Durée : 25 ans
- Taux : 1.8%
- Assurance : 0.36%
- Frais : 2000 €

## 🔧 Configuration avancée

### Changer le port de l'API

Modifier tous les fetch dans le code :
```javascript
// De
fetch('http://localhost:3001/demandes')

// À
fetch('http://localhost:VOTRE_PORT/demandes')
```

### Mode production

```bash
npm run build
```

Pour servir le build :
```bash
npm install -g serve
serve -s build
```

## ✨ Fonctionnalités à tester

### En tant que visiteur
1. ✅ Simulation de crédit
2. ✅ Demande de crédit
3. ✅ Téléchargement PDF

### En tant qu'admin
1. ✅ Connexion
2. ✅ Voir liste des demandes
3. ✅ Filtrer par statut
4. ✅ Rechercher une demande
5. ✅ Voir détail d'une demande
6. ✅ Changer le statut
7. ✅ Ajouter des notes
8. ✅ Marquer prioritaire
9. ✅ Export CSV
10. ✅ Notifications

## 📞 Support

En cas de problème, vérifier :
1. Node.js est installé : `node --version`
2. npm fonctionne : `npm --version`
3. Les deux serveurs sont démarrés
4. Le fichier db.json existe
5. Pas d'erreurs dans la console du navigateur (F12)

---

Bon développement ! 🚀

