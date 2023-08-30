'use client';

import React, { useContext, useState } from 'react';
import { PlusCircleIcon } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import AddExpense from './addExpense';
import { z } from 'zod';
import { formSchema } from '@/utils/formSchema';
import { User } from 'next-auth';
import { ClientExpense, ExpenseContext } from '@/context/expenseProvider';

export default function FormSheet({
  user,
  date,
  orientation,
}: {
  user: User;
  date: Date;
  orientation: 'right' | 'bottom';
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setTotalExpenses } = useContext(ExpenseContext);

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const dataPacket: ClientExpense = {
      amount: values.amount,
      date: date,
      category: values.category,
      description: values.description ?? null,
      userId: user.id,
    };

    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataPacket),
    });

    if (response.ok) {
      console.log('Expense added successfully');
      setTotalExpenses((prev) => [...prev, dataPacket]);
    } else {
      console.log('Error adding expense');
    }
    closeSheet();
    setIsSubmitting(false);
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger onClick={openSheet}>
        <PlusCircleIcon className='h-12 w-12 text-primary opacity-50 hover:opacity-100' />
      </SheetTrigger>
      <SheetClose onClick={closeSheet} />
      <SheetContent side={orientation}>
        <SheetHeader>
          <SheetTitle className='text-2xl sm:text-4xl'>
            Add New Purchase
          </SheetTitle>
          <SheetDescription className='pb-3 text-lg sm:text-xl'>
            Add your purchase details here.
          </SheetDescription>
        </SheetHeader>
        <AddExpense
          onFormSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </SheetContent>
    </Sheet>
  );
}
