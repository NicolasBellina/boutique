# HTTP

-> HyperText Transfert Protocol 

## Méthodes

Plusieurs méthodes : plusieurs sémantiques

- GET : récupérer des infos
- POST : envoyer des infos
- PUT : Modifier une info -> on remplace TOUT
- PATCH : Modifier une info -> on remplace PARTIELLEMENT
- DELETE : Suppression

## Réponses Status

- 1xx (Informatif)
- 2xx (Succès)
    - 200 : OK
    - 201 : Created
    - 204 : No Content
- 3xx (Redirection)
    - 301 : Moved Permanently
    - 302 : Found
    - 303 : See Other
    - 304 : Not Modified
    - 307 : Temporary Redirect
- 4xx (Erreur du client)
    - 400 : Bad Request
    - 401 : Unauthorized
    - 403 : Forbidden
    - 404 : Not Found
    - 405 : Method Not Allowed
    - 406 : Not Acceptable
    - 408 : Request Timeout
    - 409 : Conflict
    - 410 : Gone
    - 418 : I'm a teapot
- 5xx (Erreur du serveur)
    - 500 : Internal Server Error
    - 501 : Not Implemented
    - 502 : Bad Gateway
    - 503 : Service Unavailable
    - 504 : Gateway Timeout

## HTTPS

- HyperText Transfert Protocol **Secure**
- Le secure est géré par : un certificat SSL
    - SSL : authorité de certification qui garantit que votre serveur est sécurisé
    - les données transittent de manière encryptées sur le net et sont cryptés/décryptés au départ et à l'arrivée de la requête