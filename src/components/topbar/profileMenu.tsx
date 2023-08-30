'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'next-auth';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { BanIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { links } from '@/utils/links';

function Profile({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        style={{
          outline: 'none',
        }}
      >
        <Avatar className='cursor-pointer'>
          <AvatarImage src={user?.image ?? ''} />
          <AvatarFallback>
            <BanIcon />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href='/dashboard'>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/profile'>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='text-destructive'
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function ProfileMenu() {
  const { data: session } = useSession();
  const user = session?.user;

  return user ? (
    <Profile user={user} />
  ) : (
    <Button variant='outline' onClick={() => signIn()}>
      Login
    </Button>
  );
}

export function ProfileMenuMobile() {
  const { data: session } = useSession();
  const user = session?.user;

  return user ? (
    <Card>
      {links.map((link) => (
        <Link href={link.path} key={link.path}>
          <CardContent>{link.name}</CardContent>
        </Link>
      ))}
      <CardContent>
        <Button
          className='text-destructive'
          variant='outline'
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  ) : (
    <Button variant='outline' onClick={() => signIn()}>
      Login
    </Button>
  );
}
