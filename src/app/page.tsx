import BarbershopItem from "@/components/barbershop-item"
import Header from "@/components/header"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { db } from "@/lib/prisma"
import { EyeIcon, Search } from "lucide-react"
import Image from "next/image"

const Home = async () => {
  const barbershops = await db.barberShop.findMany({})
  const popularBarbershops = await db.barberShop.findMany({
    orderBy: {
      name: "desc",
    },
  })

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

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          <Button className="gap-2" variant="secondary">
            <Image src="/cabelo.svg" alt="cabelo" width={16} height={16} />
            Cabelo
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image
              src="/acabamento.svg"
              alt="acabamento"
              width={16}
              height={16}
            />
            Acabamento
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/barba.svg" alt="barba" width={16} height={16} />
            Barba
          </Button>

          <Button className="gap-2" variant="secondary">
            <EyeIcon size={16} />
            Sobrancelha
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

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Maio</p>
              <p className="text-2xl">25</p>
              <p className="text-sm">14:00</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((popularBarbershop) => (
            <BarbershopItem
              key={popularBarbershop.id}
              barbershop={popularBarbershop}
            />
          ))}
        </div>
      </div>

      <footer>
        <Card className="rounded-none">
          <CardContent className="px-5 py-6">
            <p className="text-center text-sm text-gray-400">
              © 2023 Copyright <span className="font-bold">FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </>
  )
}

export default Home
