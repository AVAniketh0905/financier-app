import DayCard from '@/components/day/dayCard';
import { ClientExpense, ExpenseProvider } from '@/context/expenseProvider';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import getDateFromSlug from '@/utils/getDateFromSlug';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function DateTransactions({
  params,
}: {
  params: { slug: string[] };
}) {
  if (params.slug.length > 3 || params.slug.includes('financier-logo.png')) {
    return notFound();
  }
  const date = getDateFromSlug(params.slug);

  const user = await getCurrentUser();
  if (!user) return <DayCard date={date} />;

  const prevExpenses: ClientExpense[] = await prisma.expenses.findMany({
    where: {
      date: new Date(date.toISOString().split('T')[0]),
      userId: user.id,
    },
    select: {
      id: false,
      amount: true,
      date: true,
      category: true,
      description: true,
      userId: true,
    },
  });

  return (
    <ExpenseProvider initial={prevExpenses}>
      <DayCard date={date} />
    </ExpenseProvider>
  );
}
