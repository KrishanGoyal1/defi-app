"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import CoinDetailHero from '@/components/CoinDetailHero';

export default function Coindetail(){

  const pathname = usePathname();
  const coinName = pathname.split('/')[1];

  return (
    <div>
      <div className="h-28">
      </div>

      <CoinDetailHero cryptoName={coinName} />

      <br />
      <br />
      <br />
      <br />

      <div>
      </div>

      <br />
      <br />
      <br />


    </div>
  )
}
