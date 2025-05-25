import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Bruno!</h2>
        <p className="">Domingo, 25 de maio</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <Search />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende com os melhores com FSW barber"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </>
  )
}
