<template>
    <div class="d-flex flex-column h-100" :class="{ 'bg-dark text-white': isAdmin }">
      <HeaderComponent />
  
      <!-- Modal d'authentification -->
      <div id="authModal" class="auth-modal" :class="{ show: showAuth }">
        <div class="auth-modal-content">
          <h2 class="mb-4">Connexion requise</h2>
          <form id="authForm" @submit.prevent="login">
            <div class="mb-3">
              <label for="authEmail" class="form-label">Email</label>
              <input type="email" class="form-control" id="authEmail" required>
            </div>
            <div class="mb-3">
              <label for="authPassword" class="form-label">Mot de passe</label>
              <input type="password" class="form-control" id="authPassword" required>
            </div>
            <div class="alert alert-danger d-none" id="authError">{{ authError }}</div>
            <button type="button" class="btn btn-primary" @click="login">Se connecter</button>
          </form>
        </div>
      </div>
  
      <main class="flex-shrink-0">
        <div class="container mt-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>Nos commerciaux</h1>
            <button class="btn btn-success" @click="ajouterCommercial">
              <i class="fas fa-plus"></i> Ajouter un commercial
            </button>
          </div>
          <div id="commercials-container" class="row">
            <div v-if="commercials.length === 0" class="alert alert-info">Aucun commercial disponible</div>
            <div v-for="commercial in commercials" :key="commercial.id_commercial" class="col-md-4 mb-4">
              <div class="card h-100" :class="{ 'bg-dark text-white': isAdmin, 'border-primary': true }">
                <div class="card-body">
                  <h5 class="card-title">{{ commercial.prenom }} {{ commercial.nom }}</h5>
                  <div class="mt-3">
                    <p class="mb-2">
                      <span class="badge bg-info">Email: {{ commercial.email || 'N/A' }}</span>
                    </p>
                    <p class="mb-2">
                      <span class="badge" :class="commercial.est_actif ? 'bg-success' : 'bg-danger'">
                        {{ commercial.est_actif ? 'Actif' : 'Inactif' }}
                      </span>
                    </p>
                  </div>
                  <div class="mt-3 d-flex gap-2 justify-content-between">
                    <button class="btn btn-outline-primary" @click="voirDetails(commercial.id_commercial)">
                      <i class="fas fa-eye"></i> Voir
                    </button>
                    <button type="button" class="btn btn-warning" @click="modifierCommercial(commercial.id_commercial)">
                      <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn btn-danger" @click="supprimerCommercial(commercial.id_commercial)">
                      <i class="fas fa-trash"></i> Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <FooterComponent />

      <!-- Modal pour ajouter/modifier un commercial -->
      <div class="modal fade" id="commercialModal" tabindex="-1" ref="commercialModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ modalMode === 'add' ? 'Ajouter un commercial' : 'Modifier le commercial' }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitCommercial">
                <div class="mb-3">
                  <label class="form-label">Nom</label>
                  <input type="text" class="form-control" v-model="currentCommercial.nom" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Prénom</label>
                  <input type="text" class="form-control" v-model="currentCommercial.prenom" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" v-model="currentCommercial.email" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Téléphone</label>
                  <input type="tel" class="form-control" v-model="currentCommercial.telephone">
                </div>
                <div class="mb-3">
                  <label class="form-label">Statut</label>
                  <select class="form-control" v-model="currentCommercial.est_actif">
                    <option :value="true">Actif</option>
                    <option :value="false">Inactif</option>
                  </select>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                  <button type="submit" class="btn btn-primary">
                    {{ modalMode === 'add' ? 'Ajouter' : 'Modifier' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal pour voir les détails -->
      <div class="modal fade" id="detailsModal" tabindex="-1" ref="detailsModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Détails du commercial</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" v-if="currentCommercial">
              <div class="mb-3">
                <h6>Nom complet</h6>
                <p>{{ currentCommercial.prenom }} {{ currentCommercial.nom }}</p>
              </div>
              <div class="mb-3">
                <h6>Email</h6>
                <p>{{ currentCommercial.email }}</p>
              </div>
              <div class="mb-3">
                <h6>Téléphone</h6>
                <p>{{ currentCommercial.telephone || 'Non spécifié' }}</p>
              </div>
              <div class="mb-3">
                <h6>Statut</h6>
                <p>
                  <span class="badge" :class="currentCommercial.est_actif ? 'bg-success' : 'bg-danger'">
                    {{ currentCommercial.est_actif ? 'Actif' : 'Inactif' }}
                  </span>
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
import HeaderComponent from '../components/header.vue';
import FooterComponent from '../components/footer.vue';
import { Modal } from 'bootstrap';

export default {
  name: 'Commercials',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      commercials: [],
      isAdmin: false,
      showAuth: false,
      authError: '',
      modalMode: 'add',
      currentCommercial: {
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        est_actif: true
      },
      commercialModal: null,
      detailsModal: null
    };
  },
  methods: {
    async loadCommerciaux() {
      try {
        const response = await fetch('/api/commercials', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.commercials = data.data || [];
      } catch (error) {
        console.error('Erreur:', error);
        this.commercials = [];
      }
    },
    async login() {
      try {
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;

        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          this.showAuth = false;
          await this.loadCommerciaux();
        } else {
          this.authError = data.message || 'Erreur de connexion';
        }
      } catch (error) {
        console.error('Erreur:', error);
        this.authError = 'Erreur de connexion';
      }
    },
    ajouterCommercial() {
      this.modalMode = 'add';
      this.currentCommercial = {
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        est_actif: true
      };
      this.commercialModal.show();
    },
    modifierCommercial(id) {
      const commercial = this.commercials.find(c => c.id_commercial === id);
      if (commercial) {
        this.modalMode = 'edit';
        this.currentCommercial = { ...commercial };
        this.commercialModal.show();
      }
    },
    voirDetails(id) {
      const commercial = this.commercials.find(c => c.id_commercial === id);
      if (commercial) {
        this.currentCommercial = { ...commercial };
        this.detailsModal.show();
      }
    },
    async submitCommercial() {
      try {
        const method = this.modalMode === 'add' ? 'POST' : 'PUT';
        const url = this.modalMode === 'add' 
          ? '/api/commercials'
          : `/api/commercials/${this.currentCommercial.id_commercial}`;

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.currentCommercial)
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        await this.loadCommerciaux();
        this.commercialModal.hide();
        alert(this.modalMode === 'add' ? 'Commercial ajouté avec succès' : 'Commercial modifié avec succès');
      } catch (error) {
        console.error('Erreur:', error);
        alert(`Erreur lors de l'opération: ${error.message}`);
      }
    },
    async supprimerCommercial(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce commercial ?')) {
        try {
          const response = await fetch(`/api/commercials/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }

          await this.loadCommerciaux();
          alert('Commercial supprimé avec succès');
        } catch (error) {
          console.error('Erreur:', error);
          alert(`Erreur lors de la suppression du commercial: ${error.message}`);
        }
      }
    }
  },
  mounted() {
    this.commercialModal = new Modal(this.$refs.commercialModal);
    this.detailsModal = new Modal(this.$refs.detailsModal);
    this.loadCommerciaux();
    if (!localStorage.getItem('token')) {
      this.showAuth = true;
    }
  }
};
</script>

<style scoped>
.auth-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.auth-modal.show {
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
}

.modal-body h6 {
  color: #666;
  margin-bottom: 0.2em;
}

.modal-body p {
  margin-bottom: 1em;
  padding-left: 0.5em;
}

.badge {
  margin-right: 0.5em;
}
</style>