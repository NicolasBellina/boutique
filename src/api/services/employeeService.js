const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:3001/api';

const employeeService = {
  async getAllEmployees() {
    try {
      const response = await axios.get(`${API_URL}/employees`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des employés');
    }
  },

  async getEmployeeById(id) {
    try {
      const response = await axios.get(`${API_URL}/employees/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération de l\'employé');
    }
  },

  async createEmployee(employeeData) {
    try {
      const response = await axios.post(`${API_URL}/employees`, employeeData);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la création de l\'employé');
    }
  },

  async updateEmployee(id, employeeData) {
    try {
      const response = await axios.put(`${API_URL}/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de l\'employé');
    }
  },

  async deleteEmployee(id) {
    try {
      const response = await axios.delete(`${API_URL}/employees/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la suppression de l\'employé');
    }
  }
};

export default employeeService; 