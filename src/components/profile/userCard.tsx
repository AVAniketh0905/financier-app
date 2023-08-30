import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { BanIcon } from 'lucide-react';
import { User } from 'next-auth';
import React from 'react';
import { Card, CardContent } from '../ui/card';

export default function UserCard({ user }: { user?: User }) {
  return (
    <Card className='m-0 h-full self-center p-3'>
      <CardContent className='flex w-1/3 flex-col items-start justify-start gap-2'>
        <Avatar className='h-16 w-16 cursor-pointer hover:shadow-md hover:shadow-accent sm:h-32 sm:w-32'>
          <AvatarImage src={user?.image ?? ''} />
          <AvatarFallback>
            <BanIcon />
          </AvatarFallback>
        </Avatar>
        <span className='text-2xl font-bold text-primary'>{user?.name}</span>
        <span className='text-md font-light italic'>{user?.email}</span>
      </CardContent>
    </Card>
  );
}
