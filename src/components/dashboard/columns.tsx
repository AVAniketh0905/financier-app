'use client';

import { categoryIcon } from '@/utils/category';
import { Category, Expenses } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';

export const columns: ColumnDef<Expenses>[] = [
  {
    accessorKey: 'category',
    header: () => {
      return (
        <Button variant='ghost'>
          <span className='m-0 p-0 text-sm text-primary sm:text-xl'>
            Category
          </span>
        </Button>
      );
    },
    cell: ({ row }) => {
      const category: Category = row.getValue('category');
      const Icon = categoryIcon[category];
      return (
        <div className='flex items-center gap-2 text-left'>
          <Icon />
          <span className='hidden sm:inline'>{category}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className='m-0 pr-2 text-sm text-primary sm:text-xl'>Date</span>
          <ArrowUpDown className='h-4 w-4 text-sm text-primary sm:text-xl' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: Date = row.getValue('date');
      const formatted = date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const formattedSmall = date.toLocaleDateString('en-IN', {
        month: 'numeric',
        day: 'numeric',
      });

      return (
        <div>
          <div className='sm:text-md hidden text-left text-xs sm:inline'>
            {formatted}
          </div>
          <div className='text-left text-xs sm:hidden sm:text-end'>
            {formattedSmall}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className='m-0 pr-2 text-sm text-primary sm:text-xl'>
            Amount
          </span>
          <ArrowUpDown className='h-4 w-4 text-sm text-primary sm:text-xl' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(amount);

      return (
        <div className='sm:text-md text-left text-xs font-medium'>
          {formatted}
        </div>
      );
    },
  },
];
