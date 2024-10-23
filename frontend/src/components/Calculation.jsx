import React, { useState, useEffect } from 'react';
import publicRequest from './../requestMethods';
import Charts from './chart'; 

const Calculation = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [expensesData, setExpensesData] = useState([]);

  useEffect(() => {
    const fetchDataAndCalculateExpense = async () => {
      try {
        const res = await publicRequest.get('/expenses');
        const fetchedData = res.data;

        setExpensesData(fetchedData);

        const totalExpense = fetchedData
          .filter(item => item.transactionType === 'debit')
          .reduce((acc, curr) => acc + curr.amount, 0);
        setExpense(totalExpense);

        const totalIncome = fetchedData
          .filter(item => item.transactionType === 'credit')
          .reduce((acc, curr) => acc + curr.amount, 0);
        setIncome(totalIncome);

        setTotal(totalIncome - totalExpense);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAndCalculateExpense();
  }, []);


  const filteredExpenses = expensesData.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col items-center text-white py-8 px-5 rounded-xl w-full mx-auto'>
      <div className='flex flex-col items-center gap-1 w-full'>
        <h2 className='font-semibold text-base text-gray-400'>TOTAL BALANCE</h2>
        {total >= 0 ? (
          <h1 className='font-bold text-4xl text-green-400'>+₹{total}</h1>
        ) : (
          <h1 className='font-bold text-4xl text-red-400'>-₹{Math.abs(total)}</h1>
        )}
      </div>

      <div className='flex justify-between w-full mt-6'>
        <div className='flex flex-col items-center w-1/2'>
          <h2 className='font-semibold text-lg text-gray-400'>INCOME</h2>
          <h1 className='font-bold text-3xl text-green-400'>+₹{income}</h1>
        </div>
        <div className='flex flex-col items-center w-1/2'>
          <h2 className='font-semibold text-lg text-gray-400'>EXPENSES</h2>
          <h1 className='font-bold text-3xl text-red-400'>-₹{expense}</h1>
        </div>
      </div>


      <div className='flex justify-center w-full mt-6'>
        <input
          type='text'
          placeholder='Search Expenses...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='py-2 bg-gray-800 text-white px-4 w-full max-w-md rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

      </div>
      <div className=' d-flex justify-content-center w-full'>
        <div className='col-4 d-flex'>
          <div className='flex flex-col items-center w-full mt-4'>
            <h2 className='font-semibold text-lg text-gray-400'>Filtered Expenses</h2>
            <ul className='w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-4 mt-2'>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense, index) => (
                  <li key={index} className='text-white flex justify-between py-1'>
                    <span>{expense.description}</span>
                    <span>₹{expense.amount}</span>
                  </li>
                ))
              ) : (
                <li className='text-gray-500'>No expenses found.</li>
              )}
            </ul>
          </div>
        </div>
        <div className='col-6 d-flex justify-content-center align-items-center'>
          <Charts income={income} expense={expense} />
        </div>
      </div>

    </div>
  );
};

export default Calculation;
