import { Router } from 'express';
import { searchController } from '../controllers/search.controller';

const router = Router();

// Register the controller function as a route handler
router.get('/', searchController);

export default router;
