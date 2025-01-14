# Guide Simple Postman

## C'est quoi Postman ?
Postman est comme un navigateur web spécial qui permet de tester des API - imaginez que c'est comme envoyer des messages à un serveur et recevoir ses réponses.

Postman va nous permettre de tester les requêtes sans avoir besoin du front, ce qui facilite la compréhension et permet de détecter les erreurs plus facilement.

## Les bases importantes

### 1. Les Collections
- C'est comme un classeur qui range vos requêtes

- Par exemple : un dossier "Utilisateurs" qui contient :
  - "Voir tous les utilisateurs" 
  - "Créer un utilisateur"
  - "Modifier un utilisateur"
  - "Avoir la liste de tous les utilisateurs" 

### 2. Authorization
- Dans la partie Authorization, on peut définir un token qui permet de se connecter pour accéder aux endpoints protégés par un mécanisme d'authentification comme par exemple un token JWT.

### 3. Body
- La section Body permet de spécifier le contenu que vous souhaitez envoyer avec votre requête. Par exemple, si on veut réinitialiser le mots de passe, on va pouvoir fournir des détails comme le token, le nouveau mots de passe ainsi que la confirmation du nouvveau mots de passe en format JSON.

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU4MDMwYTRjMDc5YWYwMDM3NzdhNmYiLCJpYXQiOjE3Mjc0Mjk3MDEsImV4cCI6MTcyNzQzMzMwMX0.LSSdA6DQDU5HpPeTynelmcJeHwqAGk6DnWZxCTTo2lk",
  "newPassword": "nouveaumd",
  "confirmPassword": "nouveaumd"
}
