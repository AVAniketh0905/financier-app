import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ClientExpense } from '@/context/expenseProvider';
import { categoryIcon } from '@/utils/category';
import { totalExpensesOnEachCategory, totalSum } from '@/utils/userStats';
import { Category } from '@prisma/client';
import React from 'react';

export default function GeneralStats({
  totalExpenses,
}: {
  totalExpenses: ClientExpense[];
}) {
  const catExpenses = totalExpensesOnEachCategory(totalExpenses);
  return (
    <Card className='m-0 w-full p-0'>
      <CardContent className='text-md flex gap-2 sm:text-xl'>
        <CardHeader>Total Expenses: </CardHeader>
        <span className='flex self-center text-center text-primary'>
          {JSON.stringify(totalSum(totalExpenses))}
        </span>
      </CardContent>
      <CardContent className='flex flex-col'>
        <CardHeader>Total Expenses on Each Category:</CardHeader>
        {catExpenses.map((value, index) => {
          const Icon = categoryIcon[value.category as Category];
          return (
            <Card key={index} className='flex justify-between'>
              <CardContent className='flex gap-1'>
                <Icon />
                <span className='hidden xs:inline'>{value.category}</span>
              </CardContent>
              <CardContent>{value.total}</CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
