import BannerSVG from '@/components/BannerSVG';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <Card className='m-0 flex h-full flex-col justify-between p-0 sm:flex-row'>
      <CardContent className='flex flex-col justify-center sm:w-1/2'>
        <CardHeader>
          <p className='text-xl font-bold italic sm:text-4xl'>
            <span className='md:flex md:flex-row md:flex-nowrap'>
              Welcome to
            </span>
            <span className='ml-2 font-mono text-2xl italic text-primary sm:text-6xl md:m-0'>
              Financier!
            </span>
          </p>
        </CardHeader>
        <CardContent>
          Take control of your financial journey, one step at a time.
          <Button
            variant='link'
            className='group/link m-0 p-0 hover:bg-accent xs:p-3'
          >
            <Link href='/calendar'>Get Started</Link>
            <ChevronRight
              size={18}
              className=' group-hover/link:translate-x-2'
            />
          </Button>
        </CardContent>
      </CardContent>
      <CardContent className='sm:w-1/2'>
        <BannerSVG />
      </CardContent>
    </Card>
  );
}
