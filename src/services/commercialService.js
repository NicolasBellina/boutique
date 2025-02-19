import createCommercial from '../methods/methodsCommercial/createCommercial.js';
import getAllCommercials from '../methods/methodsCommercial/getAllCommercials.js';
import getCommercialById from '../methods/methodsCommercial/getCommercialById.js';
import updateCommercial from '../methods/methodsCommercial/updateCommercial.js';
import deleteCommercial from '../methods/methodsCommercial/deleteCommercial.js';

const commercialService = {
    create: createCommercial,
    getAll: getAllCommercials,
    getById: getCommercialById,
    update: updateCommercial,
    delete: deleteCommercial,
};

export default commercialService; 