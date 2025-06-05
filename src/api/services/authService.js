// Constantes pour les clés du localStorage
const TOKEN_KEY = 'auth_token'
const USER_KEY = 'user_data'

export const authService = {
  // Sauvegarder le token et les données utilisateur
  setAuth(token, userData) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
  },

  // Récupérer le token
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  // Récupérer les données utilisateur
  getUser() {
    const userData = localStorage.getItem(USER_KEY)
    return userData ? JSON.parse(userData) : null
  },

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated() {
    return !!this.getToken()
  },

  // Déconnexion
  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }
} 