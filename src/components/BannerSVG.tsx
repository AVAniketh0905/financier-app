import Image from 'next/image';
import React from 'react';

export default function BannerSVG() {
  return (
    <div className='flex h-full w-full items-center justify-center self-center'>
      <Image
        src='/hero-svg.svg'
        alt='hero-svg'
        width={600}
        height={600}
        objectFit='contain'
      />
    </div>
  );
}
