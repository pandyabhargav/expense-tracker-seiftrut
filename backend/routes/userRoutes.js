import express from 'express';
import {signup, login } from '../Controolers/usercontroler.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

export default router;
