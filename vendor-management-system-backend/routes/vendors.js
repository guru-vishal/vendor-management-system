import express from 'express';
import {
  createVendor,
  getVendors,
  getVendor,
  updateVendor,
  deleteVendor
} from '../controllers/vendorController.js';
import requireAuth from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

router.post('/', createVendor);
router.get('/', getVendors);
router.get('/:id', getVendor);
router.put('/:id', updateVendor);
router.delete('/:id', deleteVendor);

export default router;