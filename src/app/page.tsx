'use client'

import { BorrowForm } from '@/app/_components/BorrowForm'
import { LendForm } from '@/app/_components/LendForm'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <main className="mt-10 grid min-h-full grid-cols-1">
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
  )
}
