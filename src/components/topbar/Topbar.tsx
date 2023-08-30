import React from 'react';
import Toggle from './toggle';
import ProfileMenu, { ProfileMenuMobile } from './profileMenu';
import { BanIcon, MenuIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getCurrentUser } from '@/lib/session';
import { FinancierLogo } from '@/utils/logo';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { links } from '@/utils/links';

function WebMenue() {
  return (
    <div className='flex flex-wrap justify-end gap-5 sm:flex-row'>
      <Toggle />
      <ProfileMenu />
    </div>
  );
}

async function MobileMenu() {
  const user = await getCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex flex-wrap justify-end gap-5 sm:flex-row'>
          <MenuIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col justify-end gap-5 border-primary'>
        <div className='flex justify-center'>
          <Toggle />
          <Avatar>
            <AvatarImage src={user?.image ?? ''} />
            <AvatarFallback>
              <BanIcon />
            </AvatarFallback>
          </Avatar>
        </div>
        <ProfileMenuMobile />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default async function Topbar() {
  return (
    <div className='flex w-full justify-between gap-3 border-b-2 border-primary bg-secondary p-3'>
      <Link
        href='/'
        className='flex gap-3 self-center pl-2 font-mono italic text-primary'
      >
        <span className='self-center text-primary'>
          <div className='rounded-full bg-secondary'>{FinancierLogo}</div>
        </span>
        <span className='hidden sm:block sm:text-3xl'>Financier</span>
      </Link>
      <Card className='m-0 hidden bg-accent p-1 sm:flex'>
        <CardContent className='m-0 flex gap-2 bg-accent p-0'>
          {links.map((link, index) => {
            if (link.name === 'Profile') {
              return;
            }
            return (
              <Button
                className='bg-secondary text-secondary-foreground shadow-inner'
                key={index}
              >
                <Link href={link.path}>{link.name}</Link>
              </Button>
            );
          })}
        </CardContent>
      </Card>
      <div className='hidden sm:flex'>
        <WebMenue />
      </div>
      <div className='sm:hidden'>
        <MobileMenu />
      </div>
    </div>
  );
}
