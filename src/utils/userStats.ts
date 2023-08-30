import { ClientExpense } from '@/context/expenseProvider';

export function getWeek(date: Date) {
  const firstDayofMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  return Math.ceil((date.getDate() - firstDayofMonth.getDate()) / 7);
}

export const totalSum = (totalExpenses: ClientExpense[]) =>
  totalExpenses.reduce((acc, curr) => acc + curr.amount, 0);

export const totalExpensesOnEachCategory = (totalExpenses: ClientExpense[]) =>
  Object.entries(
    totalExpenses.reduce(
      (acc, curr) => {
        if (acc[curr.category]) {
          acc[curr.category] += curr.amount;
        } else {
          acc[curr.category] = curr.amount;
        }
        return acc;
      },
      {} as Record<string, number>
    )
  ).map(([category, total]) => ({ category, total }));

export const totalExpensesOnEachWeek = (
  totalExpenses: ClientExpense[],
  month: number
) =>
  totalExpenses
    .filter((value) => {
      const currDate = new Date(value.date);
      return currDate.getMonth() === month - 1;
    })
    .reduce(
      (acc, curr) => {
        const week = getWeek(new Date(curr.date));
        if (acc[week]) {
          acc[week] += curr.amount;
        } else {
          acc[week] = curr.amount;
        }
        return acc;
      },
      {} as Record<string, number>
    );

export const totalExpensesOnEachMonth = (totalExpenses: ClientExpense[]) =>
  Object.entries(
    totalExpenses.reduce(
      (acc, curr) => {
        const currDate = new Date(curr.date);
        const month = currDate.getMonth() + 1;
        if (acc[month]) {
          acc[month] += curr.amount;
        } else {
          acc[month] = curr.amount;
        }
        return acc;
      },
      {} as Record<string, number>
    )
  ).map(([month, total]) => ({ month, total }));

export const groupExpensesByMonth = (expenses: ClientExpense[]) => {
  const groupedExpenses = expenses.reduce(
    (acc, expense) => {
      const date = new Date(expense.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      const key = `${month}-${year}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(expense);
      return acc;
    },
    {} as { [key: string]: ClientExpense[] }
  );
  return groupedExpenses;
};

export const groupExpensesByYear = (expenses: ClientExpense[]) => {
  const groupedExpenses = expenses.reduce(
    (acc, expense) => {
      const date = new Date(expense.date);
      const year = date.getFullYear();
      const key = `${year}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(expense);
      return acc;
    },
    {} as { [key: string]: ClientExpense[] }
  );
  return groupedExpenses;
};

export const totalExpensesOnEachYear = (totalExpenses: ClientExpense[]) =>
  Object.entries(
    totalExpenses.reduce(
      (acc, curr) => {
        const currDate = new Date(curr.date);
        const year = currDate.getFullYear();
        if (acc[year]) {
          acc[year] += curr.amount;
        } else {
          acc[year] = curr.amount;
        }
        return acc;
      },
      {} as Record<string, number>
    )
  ).map(([year, total]) => ({ year, total }));
