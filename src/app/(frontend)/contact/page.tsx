import React from 'react'

import { Footer } from '@/components/Footer'
import { GetInTouch } from '@/components/GetInTouch'
import { Header } from '@/components/Header'

export default async function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <GetInTouch />
      </main>
      <Footer showGetInTouch={false} />
    </div>
  )
}
