import express from 'express';
import commercialController from '../controllers/commercialController.js';
import authMiddleware from '../middleware/authmiddleware.js';
const router = express.Router();

router.get("/commercials", authMiddleware, commercialController.getAllCommercialsController);
router.get("/commercials/:id", authMiddleware, commercialController.getCommercialByIdController);
router.post("/commercials", authMiddleware, commercialController.createCommercialController);
router.put("/commercials/:id", authMiddleware, commercialController.updateCommercialController);
router.delete("/commercials/:id", authMiddleware, commercialController.deleteCommercialController);

export default router;