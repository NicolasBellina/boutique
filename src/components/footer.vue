<template>
    <footer class="footer py-4">
      <div class="container">
        <div class="row align-items-center g-4">
          <div class="col-md-4 text-center text-md-start">
            <h5 class="mb-3">Fashion Store</h5>
            <p class="text-muted mb-0">
              Votre destination mode préférée
            </p>
          </div>

          <div class="col-md-4 text-center">
            <div class="social-links">
              <a href="#" class="social-link" title="Facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-link" title="Instagram">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-link" title="Twitter">
                <i class="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div class="col-md-4 text-center text-md-end">
            <div class="footer-links">
              <a href="#" class="footer-link">CGV</a>
              <a href="#" class="footer-link">Contact</a>
              <a href="#" class="footer-link">Confidentialité</a>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-12 text-center">
            <small class="text-muted">
              &copy; {{ new Date().getFullYear() }} Fashion Store. Tous droits réservés.
            </small>
          </div>
        </div>
      </div>
    </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  margin-top: auto;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social-link {
  color: #6c757d;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.social-link:hover {
  color: #fff;
  background-color: #4a90e2;
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-link {
  color: #6c757d;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.9rem;
}

.footer-link:hover {
  color: #4a90e2;
}

h5 {
  color: #343a40;
  font-weight: 600;
}

@media (max-width: 768px) {
  .footer-links {
    margin-top: 1rem;
  }
  
  .social-links {
    margin: 1rem 0;
  }
}
</style>