<template>
  <div class="d-flex flex-column h-100" :class="{ 'bg-dark text-white': isAdmin }">
    <HeaderComponent />

    <main class="flex-shrink-0">
      <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1>Nos produits</h1>
          <button class="btn btn-success" @click="ajouterProduit">
            <i class="fas fa-plus"></i> Ajouter un produit
          </button>
        </div>
        <div id="products-container" class="row">
          <div v-if="products.length === 0" class="alert alert-info">Aucun produit disponible</div>
          <div v-for="product in products" :key="product.id_produit" class="col-md-4 mb-4">
            <div class="card h-100" :class="{ 'bg-dark text-white': isAdmin, 'border-primary': true }">
              <div class="card-body">
                <h5 class="card-title">{{ product.nom }}</h5>
                <p class="card-text">{{ product.description || 'Aucune description' }}</p>
                <div class="mt-3">
                  <p class="mb-2">
                    <span class="badge bg-primary">Prix: {{ product.prix }} €</span>
                    <span class="badge bg-secondary">Stock: {{ product.quantite_stock }}</span>
                  </p>
                  <p class="mb-2">
                    <span class="badge bg-info">Type: {{ product.type_produit || 'N/A' }}</span>
                    <span class="badge bg-info">Taille: {{ product.taille_id || 'N/A' }}</span>
                  </p>
                  <p class="mb-2">
                    <span class="badge bg-info">Couleur: {{ product.couleur_id || 'N/A' }}</span>
                    <span class="badge bg-info">Marque: {{ product.marque_id || 'N/A' }}</span>
                  </p>
                </div>
                <div class="mt-3 d-flex gap-2 justify-content-between">
                  <button class="btn btn-outline-primary" @click="voirDetails(product.id_produit)">
                    <i class="fas fa-eye"></i> Voir
                  </button>
                  <button type="button" class="btn btn-warning" @click="modifierProduit(product.id_produit)">
                    <i class="fas fa-edit"></i> Modifier
                  </button>
                  <button class="btn btn-danger" @click="supprimerProduit(product.id_produit)">
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

    <!-- Modal pour ajouter/modifier un produit -->
    <div class="modal fade" id="productModal" tabindex="-1" ref="productModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalMode === 'add' ? 'Ajouter un produit' : 'Modifier le produit' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitProduct">
              <div class="mb-3">
                <label class="form-label">Nom</label>
                <input type="text" class="form-control" v-model="currentProduct.nom" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" v-model="currentProduct.description" rows="3"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Prix</label>
                <input type="number" class="form-control" v-model="currentProduct.prix" step="0.01" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Quantité en stock</label>
                <input type="number" class="form-control" v-model="currentProduct.quantite_stock" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Type de produit</label>
                <input type="number" class="form-control" v-model="currentProduct.type_produit" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Taille</label>
                <input type="text" class="form-control" v-model="currentProduct.taille_id">
              </div>
              <div class="mb-3">
                <label class="form-label">Couleur</label>
                <input type="text" class="form-control" v-model="currentProduct.couleur_id">
              </div>
              <div class="mb-3">
                <label class="form-label">Marque</label>
                <input type="text" class="form-control" v-model="currentProduct.marque_id">
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
            <h5 class="modal-title">Détails du produit</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-if="currentProduct">
            <div class="mb-3">
              <h6>Nom</h6>
              <p>{{ currentProduct.nom }}</p>
            </div>
            <div class="mb-3">
              <h6>Description</h6>
              <p>{{ currentProduct.description || 'Aucune description' }}</p>
            </div>
            <div class="mb-3">
              <h6>Prix</h6>
              <p>{{ currentProduct.prix }} €</p>
            </div>
            <div class="mb-3">
              <h6>Quantité en stock</h6>
              <p>{{ currentProduct.quantite_stock }}</p>
            </div>
            <div class="mb-3">
              <h6>Type de produit</h6>
              <p>{{ currentProduct.type_produit }}</p>
            </div>
            <div class="mb-3">
              <h6>Taille</h6>
              <p>{{ currentProduct.taille_id || 'Non spécifié' }}</p>
            </div>
            <div class="mb-3">
              <h6>Couleur</h6>
              <p>{{ currentProduct.couleur_id || 'Non spécifié' }}</p>
            </div>
            <div class="mb-3">
              <h6>Marque</h6>
              <p>{{ currentProduct.marque_id || 'Non spécifié' }}</p>
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
  name: 'Products',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      products: [],
      isAdmin: false, // Remplacez par la logique appropriée pour déterminer si l'utilisateur est admin
      modalMode: 'add',
      currentProduct: {
        nom: '',
        description: '',
        prix: 0,
        type_produit: 1,
        quantite_stock: 0,
        taille_id: '',
        couleur_id: '',
        marque_id: ''
      },
      productModal: null,
      detailsModal: null
    };
  },
  methods: {
    async loadProducts() {
      try {
        const response = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        this.products = Array.isArray(data) ? data : (data.data || []);
      } catch (error) {
        console.error('Erreur:', error);
        this.products = [];
      }
    },
    ajouterProduit() {
      this.modalMode = 'add';
      this.currentProduct = {
        nom: '',
        description: '',
        prix: 0,
        type_produit: 1,
        quantite_stock: 0,
        taille_id: '',
        couleur_id: '',
        marque_id: ''
      };
      this.productModal.show();
    },
    modifierProduit(id) {
      const product = this.products.find(p => p.id_produit === id);
      if (product) {
        this.modalMode = 'edit';
        this.currentProduct = { ...product };
        this.productModal.show();
      }
    },
    voirDetails(id) {
      const product = this.products.find(p => p.id_produit === id);
      if (product) {
        this.currentProduct = { ...product };
        this.detailsModal.show();
      }
    },
    async submitProduct() {
      try {
        const method = this.modalMode === 'add' ? 'POST' : 'PUT';
        const url = this.modalMode === 'add' 
          ? '/api/products'
          : `/api/products/${this.currentProduct.id_produit}`;

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.currentProduct)
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        await this.loadProducts();
        this.productModal.hide();
        alert(this.modalMode === 'add' ? 'Produit ajouté avec succès' : 'Produit modifié avec succès');
      } catch (error) {
        console.error('Erreur:', error);
        alert(`Erreur lors de l'opération: ${error.message}`);
      }
    },
    async supprimerProduit(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        try {
          const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }

          await this.loadProducts();
          alert('Produit supprimé avec succès');
        } catch (error) {
          console.error('Erreur:', error);
          alert(`Erreur lors de la suppression du produit: ${error.message}`);
        }
      }
    }
  },
  mounted() {
    this.productModal = new Modal(this.$refs.productModal);
    this.detailsModal = new Modal(this.$refs.detailsModal);
    this.loadProducts();
  }
};
</script>

<style scoped>
/* Ajoutez ici vos styles spécifiques au composant si nécessaire */
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