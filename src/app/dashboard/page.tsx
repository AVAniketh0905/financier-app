import { columns } from '@/components/dashboard/columns';
import { ExpensesTable } from '@/components/dashboard/expensesTable';
import { Card } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import React from 'react';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const allExpenses = await prisma.expenses.findMany({
    where: {
      userId: user?.id,
    },
  });

  return (
    <Card className='m-0 p-0'>
      <ExpensesTable data={allExpenses} columns={columns} />
    </Card>
  );
}
