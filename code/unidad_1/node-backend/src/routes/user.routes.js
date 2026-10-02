import { Router } from 'express';
import { UserRepository } from '../repositories/user.repository.js';
import { UserService } from '../services/user.service.js';
import { UserController } from '../controllers/user.controller.js';

const router = Router();

// Inyección manual de dependencias
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

router.get('/:id', (req, res) => userController.getProfile(req, res));

export default router;
