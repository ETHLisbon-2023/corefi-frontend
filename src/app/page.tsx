'use client'

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
          <Card>
            <CardHeader>
              <CardTitle>Borrow</CardTitle>
              <CardDescription>
                The collateral amount is 0 Core tokens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="borrow-amount">Amount</Label>
                <Input defaultValue="0" id="borrow-amount" />
              </div>
              <div className="space-y-1">
                <Label className="mb-3 block" htmlFor="borrow-ratio">
                  Ratio
                </Label>
                <Slider
                  defaultValue={[1]}
                  id="borrow-ratio"
                  max={3}
                  min={1}
                  onValueChange={console.log}
                  step={0.1}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Borrow</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
