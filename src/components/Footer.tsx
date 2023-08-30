import { FinancierLogo } from '@/utils/logo';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className='flex h-[75px] border-t-2 border-primary'>
      <article className='container flex gap-x-2 gap-y-4 xs:gap-x-8 xs:py-6 md:justify-between lg:flex-row lg:py-4'>
        <section className='flex items-center gap-x-2 gap-y-4'>
          <Link href={'/'} className='rounded-lg border-2 border-primary p-1'>
            {FinancierLogo}
          </Link>
          <p className='hidden self-center xs:block'>
            Financier is a personal finance tracking app built with Next.js
          </p>
        </section>

        <section className='flex flex-row items-center justify-end gap-4 text-sm'>
          <Link href={'/'} className='hidden rounded-lg bg-accent p-1 xs:block'>
            Terms
          </Link>
          <Link href={'/'} className='rounded-lg bg-accent p-1'>
            About
          </Link>
        </section>
      </article>
    </footer>
  );
}
