# Boutique - API & Frontend

Application e-commerce avec API Node.js/Express et frontend Vue.js.

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement du projet](#lancement-du-projet)
- [Documentation API Swagger](#documentation-api-swagger)
- [Endpoints disponibles](#endpoints-disponibles)
- [Méthodes de test](#méthodes-de-test)

---

## Prérequis

- **Node.js** (v18+)
- **npm** (v9+)
- **Docker** et **Docker Compose**
- **macOS** (ou adaptable à d'autres systèmes)

---

## Installation

### 1. Cloner le projet
```bash
cd /Users/nicolasbellina/Desktop/boutique
```

### 2. Installer les dépendances du projet global
```bash
npm install
```

### 3. Installer les dépendances de l'API
```bash
cd src/api
npm install
cd ../..
```

### 4. Installer les dépendances du frontend (si nécessaire)
```bash
npm install
```

---

## ⚙️ Configuration

### 1. Fichier `.env` pour l'API (`src/api/.env`)

Crée ou vérifie le fichier `src/api/.env` avec les variables suivantes :

```env
# Base de données PostgreSQL
DB_NAME=boutique_db
DB_USER=postgres
DB_PASSWORD=BenjaminleGoat1!
DB_SERVER=localhost
DB_PORT=5432

# JWT
JWT_SECRET=test

# Serveur API
PORT=3001
```


### 2. Fichier `.env` racine (optionnel)

Pour la configuration globale du projet, crée un fichier `.env` à la racine :

```env
# Variables pour le frontend (Vite)
VITE_API_URL=http://localhost:3001

# Variables Docker Compose
POSTGRES_DB=boutique_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=BenjaminleGoat1!
```

---

## Lancement du projet

### Étape 1 : Démarrer la base de données (Docker)

```bash
cd /Users/nicolasbellina/Desktop/boutique
docker-compose up -d
```

Vérifie que PostgreSQL est prêt :
```bash
docker-compose ps
```

### Étape 2 : Lancer l'API

Depuis le dossier `src/api` :

**Option 1 : Avec npm start**
```bash
cd src/api
npm start
```

**Option 2 : Directement avec Node**
```bash
cd src/api
node app.js
```

Normalement :
```
Configuration de la base de données: {
  database: 'boutique_db',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
}
Serveur en cours d'exécution sur le port 3001
✅ Connexion à la base de données réussie.
✅ Synchronisation des modèles réussie.
```

### Étape 3 : Lancer le Frontend (dans un autre terminal)

```bash
cd /Users/nicolasbellina/Desktop/boutique
npm run dev
```

L'application Vue.js sera disponible à : **http://localhost:5173** (ou le port indiqué)

---

## Documentation API Swagger

### Accéder à Swagger

Une fois l'API lancée, accède à :

**http://localhost:3001/api-docs**

On y retrouvera :
- Toutes les routes API documentées
- Interface interactive pour tester les endpoints
- Schémas des requêtes et réponses
- Codes de réponse possibles

---

## Endpoints disponibles et tests

### 1. **Employés** (`/api/employes`)

#### GET - Récupérer tous les employés
- **Route** : `GET /api/employes`
- **Description** : Récupère la liste complète des employés
- **Réponse** : 
```json
[
  {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@example.com",
    "role": "Developer",
    "salaire": 3000,
    "date_naissance": "1990-05-15",
    "adresse": "123 Rue de Paris",
    "telephone": "0123456789"
  }
]
```

#### POST - Créer un employé
- **Route** : `POST /api/employes`
- **Body** (JSON) :
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "role": "Developer",
  "salaire": 3000,
  "date_naissance": "1990-05-15",
  "adresse": "123 Rue de Paris",
  "telephone": "0123456789"
}
```
- **Important** : L'email doit être valide (format : `user@example.com`)

#### GET - Récupérer un employé par ID
- **Route** : `GET /api/employes/:id`
- **Paramètre** : `id` (numéro)
- **Exemple** : `GET /api/employes/1`

#### PUT - Mettre à jour un employé
- **Route** : `PUT /api/employes/:id`
- **Paramètre** : `id` (numéro)
- **Body** (JSON) : Envoie les champs à mettre à jour
```json
{
  "salaire": 3500,
  "role": "Senior Developer"
}
```

#### DELETE - Supprimer un employé
- **Route** : `DELETE /api/employes/:id`
- **Paramètre** : `id` (numéro)
- **Réponse** : `204 No Content` (succès)

---



## Méthodes de test

### Méthode 1 : Interface graphique Swagger UI (Recommandé)

1. Accède à **http://localhost:3001/api-docs**
2. Clique sur un endpoint (par exemple `POST /api/employes`)
3. Clique sur le bouton `Try it out`
4. Remplis les champs requis avec des données valides
5. Clique sur `Execute`
6. Consulte la réponse dans la section `Response`

---

## Structure du projet

```
boutique/
├── src/
│   ├── api/
│   │   ├── app.js
│   │   ├── .env
│   │   ├── authRoutes.js
│   │   ├── controllers/
│   │   │   ├── commercialController.js
│   │   │   └── employesController.js
│   │   ├── routes/
│   │   │   └── employesRoutes.js
│   │   ├── models/
│   │   │   └── employeModel.js
│   │   ├── methods/
│   │   │   ├── methodsCommercial/
│   │   │   ├── methodsEmploye/
│   │   │   └── methodsProduct/
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── employeService.js
│   │   │   └── productService.js
│   │   └── package.json
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── views/
│   └── main.js
├── docker-compose.yml
├── .env
├── package.json
├── README.md
└── wait-for-db.sh
```
