import createEmploye from '../methods/methodsEmploye/createEmploye.js';
import getAllEmploye from '../methods/methodsEmploye/getAllEmploye.js';
import getEmployeById from '../methods/methodsEmploye/getEmployeById.js';
import updateEmploye from '../methods/methodsEmploye/updateEmploye.js';
import deleteEmploye from '../methods/methodsEmploye/deleteEmploye.js';

const employeService = {
    create: createEmploye,
    getAll: getAllEmploye,
    getById: getEmployeById,
    update: updateEmploye,
    delete: deleteEmploye,
};

export default employeService; 