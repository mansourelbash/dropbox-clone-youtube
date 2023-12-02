import { Button } from '@/components/ui/button'
import Image from 'next/image'
export default function Home() {
  return (
    <main className="">
      {/* <UserButton afterSignOutUrl="/"/> */}
      <Button variant={"destructive"}>Here is Demo Button</Button>
     <h1>Dropbox clone</h1>
    </main>
  )
}
