'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ClientExpense } from '@/context/expenseProvider';
import { categoryIcon } from '@/utils/category';
import {
  groupExpensesByYear,
  totalExpensesOnEachYear,
} from '@/utils/userStats';
import { Category } from '@prisma/client';
import React, { useState } from 'react';

export default function YearStats({
  totalExpenses,
}: {
  totalExpenses: ClientExpense[];
}) {
  const date = new Date();
  const thisYear = date.getFullYear();
  const [year, setYear] = useState<number>(thisYear);
  const YearExpenses = totalExpensesOnEachYear(totalExpenses)
    .map((monExp) => {
      if (monExp.year === String(year)) {
        return monExp;
      }
    })
    .filter((year) => year !== undefined)[0];
  const catExpenses = groupExpensesByYear(totalExpenses)
    [`${year}`].map((expense) => {
      return expense;
    })
    .sort((a, b) => b.amount - a.amount)
    .splice(0, 5);

  return (
    <Card>
      <CardContent className='flex justify-center text-lg'>
        <CardHeader>Total Expenses in {year}:</CardHeader>
        <CardContent className='flex self-center pb-0 text-center text-primary'>
          {YearExpenses?.total}
        </CardContent>
      </CardContent>
      <CardContent className='flex flex-col'>
        <CardHeader>Top 5 Most Expensive Expenses in {year}:</CardHeader>
        {catExpenses.map((expense, index) => {
          const Icon = categoryIcon[expense.category as Category];
          return (
            <Card key={index} className='flex justify-between'>
              <CardContent className='flex gap-1'>
                <Icon />
                <span className='hidden xs:inline'>{expense.category}</span>
              </CardContent>
              <CardContent>{expense.amount}</CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
