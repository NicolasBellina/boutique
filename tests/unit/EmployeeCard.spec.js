import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmployeeCard from '@/components/EmployeeCard.vue'

// Test unitaire pour vérifier si le composant affiche le titre correctement
// Lancer le test : npm run test:unit
describe('EmployeeCard.vue', () => {
  it('affiche le titre', () => {
    const wrapper = mount(EmployeeCard)
    expect(wrapper.text()).toContain('Gestion des Employés')
  })
}) 