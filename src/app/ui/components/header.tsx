import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <Link href="/" className="flex justify-between items-center mb-6">
      <Image
        src="/img/pokeball.png"
        alt="Pokeball"
        className="w-10 h-10 scale-x-[-1]"
        width={40}
        height={40}
      />
      <h1 className="text-2xl font-bold m-2">POCKET MONSTER ARENA</h1>
      <Image src="/img/pokeball.png" alt="Pokeball" className="w-10 h-10" width={40} height={40} />
    </Link>
  );
}
