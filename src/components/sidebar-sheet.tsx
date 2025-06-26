"use client"

import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Avatar, AvatarImage } from "./ui/avatar"
import { quickSearchOptions } from "@/constants/search"
import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog"
import { signOut, useSession } from "next-auth/react"
import SignInDialog from "./sign-in-dialog"

const SidebarSheet = ({}) => {
  const { data } = useSession()
  const handleSignOutClick = () => signOut()

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {!data?.user ? (
        <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
          <h2 className="font-bold">Olá, faça seu login!</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <LogInIcon />
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[90%]">
              <SignInDialog />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="flex items-center gap-3 border-b border-solid py-5">
          <Avatar>
            <AvatarImage src={data?.user.image ?? ""} />
          </Avatar>

          <div>
            <p className="font-bold">{data?.user.name}</p>
            <p className="text-xs">{data?.user.email}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <Button
            key={option.title}
            className="justify-start gap-2"
            variant="ghost"
            asChild
          >
            <Link href={`/barbershops?service=${option.title}`}>
              <Image
                src={option.imageUrl}
                alt={option.title}
                width={18}
                height={18}
              />
              {option.title}
            </Link>
          </Button>
        ))}
      </div>

      <div className="gap-2py-5 flex flex-col">
        <Button
          variant="ghost"
          className="justify-start gap-2"
          onClick={handleSignOutClick}
        >
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
