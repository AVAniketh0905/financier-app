import { ClientExpense } from '@/context/expenseProvider';
import { Category } from '@prisma/client';
import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { categoryIcon } from '@/utils/category';
import { ToolTipFunc } from '../notif';

export default function CategoryExpense({
  category,
  expenses,
}: {
  category: Category;
  expenses: ClientExpense[];
}) {
  const totalSum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const Icon = categoryIcon[category];

  if (totalSum === 0) return <></>;

  return (
    <Card className='flex flex-col justify-center'>
      <CardHeader className='text-md text-primary'>
        <span className='flex gap-1 text-center'>
          <span className='hidden font-bold md:inline'>{category}</span>
          <span className='inline md:hidden'>
            <ToolTipFunc Icon={Icon} content={category} />
          </span>
          <span className='self-center text-center text-sm font-light italic'>
            ({expenses.length})
          </span>
        </span>
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center'>
        <span className='text-4xl font-bold text-primary'>₹{totalSum}</span>
      </CardContent>
    </Card>
  );
}
