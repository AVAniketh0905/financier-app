'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ClientExpense } from '@/context/expenseProvider';
import { categoryIcon } from '@/utils/category';
import { months } from '@/utils/timeUtils';
import {
  groupExpensesByMonth,
  totalExpensesOnEachMonth,
} from '@/utils/userStats';
import { Category } from '@prisma/client';
import React, { useState } from 'react';

export default function MonthStats({
  totalExpenses,
}: {
  totalExpenses: ClientExpense[];
}) {
  const date = new Date();
  const thisMonth = date.getMonth() + 1;
  const [month, setMonth] = useState<number>(thisMonth);
  const monthExpenses = totalExpensesOnEachMonth(totalExpenses)
    .map((monExp) => {
      if (monExp.month === String(month)) {
        return monExp;
      }
    })
    .filter((month) => month !== undefined)[0];
  const catExpenses = groupExpensesByMonth(totalExpenses)
    [`${month - 1}-2023`].map((expense) => {
      return expense;
    })
    .sort((a, b) => b.amount - a.amount)
    .splice(0, 5);

  return (
    <Card>
      <CardContent className='text-md flex sm:text-lg'>
        <CardHeader>Total Expenses in {months[month - 1]}:</CardHeader>
        <CardContent className='m-0 flex justify-center self-center p-0 text-center text-primary'>
          {monthExpenses?.total}
        </CardContent>
      </CardContent>
      <CardContent className='flex flex-col'>
        <CardHeader>
          Top 5 Most Expensive Expenses in {months[month - 1]}:
        </CardHeader>
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
