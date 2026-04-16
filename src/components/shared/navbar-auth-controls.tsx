'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

type NavbarAuthControlsProps = {
  accountTriggerClassName?: string
}

export function NavbarAuthControls({ accountTriggerClassName }: NavbarAuthControlsProps) {
  const { user, logout } = useAuth()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950',
              accountTriggerClassName,
            )}
            aria-label="Account menu"
          >
            <Avatar className="h-9 w-9 border border-neutral-200">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-neutral-200 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center gap-3 border-b border-neutral-100 p-3">
            <Avatar className="h-10 w-10 border border-neutral-200">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 flex flex-col">
              <span className="truncate text-sm font-medium text-neutral-950">{user?.name}</span>
              <span className="truncate text-xs text-neutral-500">{user?.email}</span>
            </div>
          </div>
          <div className="p-1">
            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer rounded-[var(--radius)] text-neutral-950 focus:bg-neutral-100 focus:text-neutral-950"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
