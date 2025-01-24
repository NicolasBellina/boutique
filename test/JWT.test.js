import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { 
    verifyToken, 
    generateToken, 
    decodeToken, 
    requireAdmin, 
    checkRole, 
    refreshToken 
} from '../src/middleware/JWT.js'; // Ajoutez l'extension .js

// Charger les variables d'environnement
dotenv.config();

describe('JWT Middleware', function() {
    let token;
    const user = { id: 1, username: 'testuser', role: 'user' };
    const adminUser = { id: 2, username: 'adminuser', role: 'admin' };

    // Générer un token avant les tests
    before(function() {
        token = generateToken(user);
    });

    describe('generateToken', function() {
        it('should generate a valid JWT token', function() {
            // Vérifie que le token généré est valide
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            expect(decoded).to.have.property('id', user.id);
            expect(decoded).to.have.property('username', user.username);
            expect(decoded).to.have.property('role', user.role);
        });
    });

    describe('decodeToken', function() {
        it('should decode a valid JWT token', function() {
            // Vérifie que le token est correctement décodé
            const decoded = decodeToken(token);
            expect(decoded).to.have.property('id', user.id);
            expect(decoded).to.have.property('username', user.username);
            expect(decoded).to.have.property('role', user.role);
        });

        it('should throw an error for an invalid token', function() {
            // Vérifie que la fonction lève une erreur pour un token invalide
            expect(() => decodeToken('invalidtoken')).to.throw('Token invalide ou expiré');
        });
    });

    describe('verifyToken', function() {
        it('should call next() if token is valid', function(done) {
            // Vérifie que le middleware appelle next() pour un token valide
            const req = { headers: { authorization: `Bearer ${token}` } };
            const res = {};
            const next = () => {
                expect(req).to.have.property('user');
                expect(req.user).to.have.property('id', user.id);
                done();
            };
            verifyToken(req, res, next);
        });

        it('should return 401 if token is missing', function(done) {
            // Vérifie que le middleware renvoie 401 si le token est manquant
            const req = { headers: {} };
            const res = {
                status: function(status) {
                    expect(status).to.equal(401);
                    return this;
                },
                json: function(response) {
                    expect(response).to.have.property('message', 'Token manquant');
                    done();
                }
            };
            verifyToken(req, res, () => {});
        });

        it('should return 401 if token is invalid', function(done) {
            // Vérifie que le middleware renvoie 401 si le token est invalide
            const invalidToken = jwt.sign({ id: user.id }, 'wrongsecret'); // Token bien formé mais avec une mauvaise clé secrète
            const req = { headers: { authorization: `Bearer ${invalidToken}` } };
            const res = {
                status: function(status) {
                    expect(status).to.equal(401);
                    return this;
                },
                json: function(response) {
                    expect(response).to.have.property('message', 'Token invalide');
                    done();
                }
            };
            verifyToken(req, res, () => {});
        });
    });

    describe('requireAdmin', function() {
        it('should call next() if user is admin', function(done) {
            // Vérifie que le middleware appelle next() si l'utilisateur est admin
            const req = { user: adminUser };
            const res = {};
            const next = done;
            requireAdmin(req, res, next);
        });

        it('should return 403 if user is not admin', function(done) {
            // Vérifie que le middleware renvoie 403 si l'utilisateur n'est pas admin
            const req = { user: user };
            const res = {
                status: function(status) {
                    expect(status).to.equal(403);
                    return this;
                },
                json: function(response) {
                    expect(response).to.have.property('message', 'Accès non autorisé');
                    done();
                }
            };
            requireAdmin(req, res, () => {});
        });
    });

    describe('checkRole', function() {
        it('should call next() if user has required role', function(done) {
            // Vérifie que le middleware appelle next() si l'utilisateur a le rôle requis
            const req = { user: user };
            const res = {};
            const next = done;
            checkRole(['user'])(req, res, next);
        });

        it('should return 403 if user does not have required role', function(done) {
            // Vérifie que le middleware renvoie 403 si l'utilisateur n'a pas le rôle requis
            const req = { user: user };
            const res = {
                status: function(status) {
                    expect(status).to.equal(403);
                    return this;
                },
                json: function(response) {
                    expect(response).to.have.property('message', 'Accès non autorisé pour ce rôle');
                    done();
                }
            };
            checkRole(['admin'])(req, res, () => {});
        });
    });

    describe('refreshToken', function() {
        it('should refresh a valid token', function() {
            // Vérifie que la fonction rafraîchit correctement un token valide
            const newToken = refreshToken(token);
            const decoded = jwt.verify(newToken, process.env.JWT_SECRET);
            expect(decoded).to.have.property('id', user.id);
            expect(decoded).to.have.property('username', user.username);
            expect(decoded).to.have.property('role', user.role);
        });

        it('should throw an error for an invalid token', function() {
            // Vérifie que la fonction lève une erreur pour un token invalide
            expect(() => refreshToken('invalidtoken')).to.throw('Impossible de rafraîchir le token');
        });
    });
});
