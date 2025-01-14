# WebSockets et Socket.io

Les WebSockets sont une technologie qui permet de créer une connexion persistante entre un client (par exemple un navigateur web) et un serveur. Cela permet d'envoyer des messages entre le client et le serveur en temps réel, sans avoir besoin de recharger la page.

Socket.io est une bibliothèque JavaScript qui permet d'utiliser les WebSockets de manière simple et efficace. Elle fournit des fonctionnalités telles que la gestion des erreurs, la détection de la déconnexion, la mise en place de rooms (salons de discussion) et la gestion des événements.

Dans DAB, Socket.io est utilisé pour gérer les messages en temps réel entre les utilisateurs. Lorsqu'un utilisateur envoie un message, le serveur le reçoit et le redirige vers les autres utilisateurs qui sont connectés au même salon de discussion.

## Fonctionnement

1. Lorsqu'un utilisateur se connecte, le serveur crée une nouvelle instance de Socket.io et l'assigne à l'utilisateur.
2. Lorsqu'un utilisateur envoie un message, le navigateur envoie une requête HTTP au serveur avec le message en tant que donnée.
3. Le serveur reçoit la requête et l'envoie à Socket.io.
4. Socket.io redirige le message vers les autres utilisateurs qui sont connectés au même salon de discussion.
5. Les autres utilisateurs reçoivent le message et l'affichent dans leur navigateur.

## Avantages

* Les messages sont envoyés en temps réel, ce qui signifie que les utilisateurs peuvent voir les messages des autres utilisateurs en direct.
* Les utilisateurs ne doivent pas recharger la page pour voir les nouveaux messages.
* Les messages sont stockés sur le serveur, ce qui signifie que les utilisateurs peuvent voir l'historique des messages même si ils se déconnectent puis se reconnectent.

## Inconvénients

* Les WebSockets consomment plus de ressources que les requêtes HTTP classiques.
* Les WebSockets peuvent causer des problèmes de sécurité si ils ne sont pas correctement configurés.