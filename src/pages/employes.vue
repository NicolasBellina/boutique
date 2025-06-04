<template>
  <div class="d-flex flex-column h-100" :class="{ 'bg-dark text-white': isAdmin }">
    <HeaderComponent />

    <main class="flex-shrink-0">
      <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1>Nos employés</h1>
          <button class="btn btn-success" @click="ajouterEmploye">
            <i class="fas fa-plus"></i> Ajouter un employé
          </button>
        </div>
        <div id="employes-container" class="row">
          <div v-if="employes.length === 0" class="alert alert-info">Aucun employé disponible</div>
          <div v-for="employe in employes" :key="employe.id_employe" class="col-md-4 mb-4">
            <div class="card h-100" :class="{ 'bg-dark text-white': isAdmin, 'border-primary': true }">
              <div class="card-body">
                <h5 class="card-title">{{ employe.nom }} {{ employe.prenom }}</h5>
                <div class="mt-3">
                  <p class="mb-2">
                    <span class="badge bg-primary">Role: {{ employe.role || 'N/A' }}</span>
                    <span class="badge bg-secondary">Salaire: {{ employe.salaire }} €</span>
                  </p>
                  <p class="mb-2">
                    <span class="badge bg-info">Email: {{ employe.email }}</span>
                  </p>
                  <p class="mb-2">
                    <span class="badge bg-info">Téléphone: {{ employe.telephone || 'N/A' }}</span>
                  </p>
                </div>
                <div class="mt-3 d-flex gap-2 justify-content-between">
                  <button class="btn btn-outline-primary" @click="voirDetails(employe.id_employe)">
                    <i class="fas fa-eye"></i> Voir
                  </button>
                  <button type="button" class="btn btn-warning" @click="modifierEmploye(employe.id_employe)">
                    <i class="fas fa-edit"></i> Modifier
                  </button>
                  <button class="btn btn-danger" @click="supprimerEmploye(employe.id_employe)">
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

    <!-- Modal pour ajouter/modifier un employé -->
    <div class="modal fade" id="employeModal" tabindex="-1" ref="employeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalMode === 'add' ? 'Ajouter un employé' : 'Modifier l\'employé' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitEmploye">
              <div class="mb-3">
                <label class="form-label">Nom</label>
                <input type="text" class="form-control" v-model="currentEmploye.nom" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Prénom</label>
                <input type="text" class="form-control" v-model="currentEmploye.prenom" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" v-model="currentEmploye.email" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Rôle</label>
                <input type="text" class="form-control" v-model="currentEmploye.role">
              </div>
              <div class="mb-3">
                <label class="form-label">Salaire</label>
                <input type="number" class="form-control" v-model="currentEmploye.salaire" step="0.01" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Téléphone</label>
                <input type="tel" class="form-control" v-model="currentEmploye.telephone">
              </div>
              <div class="mb-3">
                <label class="form-label">Adresse</label>
                <input type="text" class="form-control" v-model="currentEmploye.adresse">
              </div>
              <div class="mb-3">
                <label class="form-label">Date de naissance</label>
                <input type="date" class="form-control" v-model="currentEmploye.date_naissance">
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
            <h5 class="modal-title">Détails de l'employé</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-if="currentEmploye">
            <div class="mb-3">
              <h6>Nom complet</h6>
              <p>{{ currentEmploye.nom }} {{ currentEmploye.prenom }}</p>
            </div>
            <div class="mb-3">
              <h6>Email</h6>
              <p>{{ currentEmploye.email }}</p>
            </div>
            <div class="mb-3">
              <h6>Rôle</h6>
              <p>{{ currentEmploye.role || 'Non spécifié' }}</p>
            </div>
            <div class="mb-3">
              <h6>Salaire</h6>
              <p>{{ currentEmploye.salaire }} €</p>
            </div>
            <div class="mb-3">
              <h6>Téléphone</h6>
              <p>{{ currentEmploye.telephone || 'Non spécifié' }}</p>
            </div>
            <div class="mb-3">
              <h6>Adresse</h6>
              <p>{{ currentEmploye.adresse || 'Non spécifiée' }}</p>
            </div>
            <div class="mb-3">
              <h6>Date de naissance</h6>
              <p>{{ formatDate(currentEmploye.date_naissance) }}</p>
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
  name: 'Employes',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      employes: [],
      isAdmin: false,
      modalMode: 'add',
      currentEmploye: {
        nom: '',
        prenom: '',
        email: '',
        role: '',
        salaire: 0,
        telephone: '',
        adresse: '',
        date_naissance: ''
      },
      employeModal: null,
      detailsModal: null
    };
  },
  methods: {
    async loadEmployes() {
      try {
        const response = await fetch('/api/employes');
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const responseData = await response.json();
        this.employes = Array.isArray(responseData.data) ? responseData.data : [];
      } catch (error) {
        console.error('Erreur:', error);
        alert(`Erreur lors du chargement des employés: ${error.message}`);
      }
    },
    ajouterEmploye() {
      this.modalMode = 'add';
      this.currentEmploye = {
        nom: '',
        prenom: '',
        email: '',
        role: '',
        salaire: 0,
        telephone: '',
        adresse: '',
        date_naissance: ''
      };
      this.employeModal.show();
    },
    modifierEmploye(id) {
      const employe = this.employes.find(e => e.id_employe === id);
      if (employe) {
        this.modalMode = 'edit';
        this.currentEmploye = { 
          ...employe,
          date_naissance: employe.date_naissance ? new Date(employe.date_naissance).toISOString().split('T')[0] : ''
        };
        this.employeModal.show();
      }
    },
    voirDetails(id) {
      const employe = this.employes.find(e => e.id_employe === id);
      if (employe) {
        this.currentEmploye = { ...employe };
        this.detailsModal.show();
      }
    },
    formatDate(date) {
      if (!date) return 'Non spécifiée';
      return new Date(date).toLocaleDateString('fr-FR');
    },
    async submitEmploye() {
      try {
        const method = this.modalMode === 'add' ? 'POST' : 'PUT';
        const url = this.modalMode === 'add' 
          ? '/api/employes'
          : `/api/employes/${this.currentEmploye.id_employe}`;

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.currentEmploye)
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        await this.loadEmployes();
        this.employeModal.hide();
        alert(this.modalMode === 'add' ? 'Employé ajouté avec succès' : 'Employé modifié avec succès');
      } catch (error) {
        console.error('Erreur:', error);
        alert(`Erreur lors de l'opération: ${error.message}`);
      }
    },
    async supprimerEmploye(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
        try {
          const response = await fetch(`/api/employes/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }

          await this.loadEmployes();
          alert('Employé supprimé avec succès');
        } catch (error) {
          console.error('Erreur:', error);
          alert(`Erreur lors de la suppression de l'employé: ${error.message}`);
        }
      }
    }
  },
  mounted() {
    this.employeModal = new Modal(this.$refs.employeModal);
    this.detailsModal = new Modal(this.$refs.detailsModal);
    this.loadEmployes();
  }
};
</script>

<style scoped>
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