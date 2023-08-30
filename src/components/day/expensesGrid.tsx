'use client';

import { ExpenseContext } from '@/context/expenseProvider';
import React, { useContext } from 'react';
import { categories } from '@/utils/category';
import CategoryExpense from './categoryExpense';

export default function ExpensesGrid() {
  const { totalExpenses } = useContext(ExpenseContext);

  return (
    <div
      className={`grid w-full grid-cols-1 gap-5 bg-accent sm:grid-cols-3 ${
        totalExpenses.length > 0 ? 'p-3' : ''
      }`}
    >
      {categories.map((category, index) => {
        const categoryExpenses = totalExpenses.filter(
          (expense) => expense.category === category
        );
        return (
          <CategoryExpense
            key={index}
            category={category}
            expenses={categoryExpenses}
          />
        );
      })}
    </div>
  );
}
