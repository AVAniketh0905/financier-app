import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const content = await req.json();
  const { amount, date, category, description, userId } = content;

  try {
    await prisma.expenses.create({
      data: {
        amount,
        date,
        category,
        description,
        userId,
      },
    });

    return new Response('Expense created', { status: 200 });
  } catch (error) {
    return new Response('Error creating expense', { status: 500 });
  }
}

export async function GET() {
  const user = await getCurrentUser();

  if (!user) return new Response('Unauthorized', { status: 401 });

  try {
    const expenses = await prisma.expenses.findMany({
      where: {
        userId: user.id,
      },
    });

    return new Response(JSON.stringify(expenses), { status: 200 });
  } catch (error) {
    return new Response('Error fetching expenses', { status: 500 });
  }
}
