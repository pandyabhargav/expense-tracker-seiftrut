
import express from 'express';

import {
  addExpense,
  getAllExpenses,
  getRecentExpenses,
  updateExpense,
  deleteExpense,
} from '../Controolers/expense.js';

const router = express.Router();

s
router.post('/',addExpense); 
router.get('/', getAllExpenses); 
router.get('/recent', getRecentExpenses); 
router.put('/:id', updateExpense); 
router.delete('/:id', deleteExpense); 

export default router;
