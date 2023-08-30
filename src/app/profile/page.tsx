import UserCard from '@/components/profile/userCard';
import UserStats from '@/components/profile/userStats';
import { Card } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/session';
import React from 'react';

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <Card className='mt-10 flex h-full w-full flex-col items-center justify-center sm:flex-row'>
      <UserCard user={user} />
      <UserStats />
    </Card>
  );
}
