'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

export interface ClientExpense {
  amount: number;
  date: Date;
  category: string;
  description: string | null;
  userId: string;
}

interface ExpenseContextType {
  totalExpenses: ClientExpense[];
  setTotalExpenses: Dispatch<SetStateAction<ClientExpense[]>> | (() => void);
}

export const ExpenseContext = createContext<ExpenseContextType>({
  totalExpenses: [],
  setTotalExpenses: () => null,
});

interface ExpenseProviderProps {
  children: ReactNode;
  initial: ClientExpense[];
}

export function ExpenseProvider({ children, initial }: ExpenseProviderProps) {
  const [totalExpenses, setTotalExpenses] = useState<ClientExpense[]>(initial);

  return (
    <ExpenseContext.Provider value={{ totalExpenses, setTotalExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
}
