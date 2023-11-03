'use client'

import { BorrowForm } from '@/app/_components/borrow-form'
import { LendForm } from '@/app/_components/lend-form'
import { Header } from '@/components/header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <div className="min-h-full">
      <Header />
      <main className="mt-10 grid grid-cols-1">
        <Tabs className="mx-auto w-full max-w-2xl px-4" defaultValue="lend">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lend">Lend</TabsTrigger>
            <TabsTrigger value="borrow">Borrow</TabsTrigger>
          </TabsList>
          <TabsContent value="lend">
            <LendForm />
          </TabsContent>
          <TabsContent value="borrow">
            <BorrowForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
