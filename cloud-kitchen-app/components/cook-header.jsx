"use client"

import { useState, useEffect } from "react"

import Link from "next/link"

import { useRouter } from "next/navigation"

import { Frame, Bell, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function CookHeader() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/cook-panel" className="flex items-center gap-2">
          <Frame className="w-6 h-6" />
          <Link href="/">
      <div className="font-bold text-xl bg-gradient-to-r from-orange-500 to-pink-600 text-transparent bg-clip-text cursor-pointer">
        QuickBytes
      </div>
    </Link>
        </Link>

        <div className="hidden md:flex items-center ml-4">
          <Badge variant="outline" className="text-xs">
            Cook Panel
          </Badge>
        </div>

        <div className="flex items-center ml-auto gap-4">
          <Button variant="outline" size="icon" className="relative hidden md:flex">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>{user?.name?.charAt(0) || "C"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/cook-panel/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/cook-panel/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-8">
            <Link href="/cook-panel" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </Link>
            <Link
              href="/cook-panel?tab=menu"
              className="text-lg font-medium"
              onClick={() => {
                setIsMobileMenuOpen(false)
                // This is a workaround since we're using tabs in the same page
                if (window.location.pathname === "/cook-panel") {
                  document.querySelector('[value="menu"]').click()
                }
              }}
            >
              My Menu
            </Link>
            <Link
              href="/cook-panel?tab=orders"
              className="text-lg font-medium"
              onClick={() => {
                setIsMobileMenuOpen(false)
                // This is a workaround since we're using tabs in the same page
                if (window.location.pathname === "/cook-panel") {
                  document.querySelector('[value="orders"]').click()
                }
              }}
            >
              Orders
            </Link>
            <Link
              href="/cook-panel?tab=earnings"
              className="text-lg font-medium"
              onClick={() => {
                setIsMobileMenuOpen(false)
                // This is a workaround since we're using tabs in the same page
                if (window.location.pathname === "/cook-panel") {
                  document.querySelector('[value="earnings"]').click()
                }
              }}
            >
              Earnings
            </Link>
            <Link href="/cook-panel/profile" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Profile
            </Link>
            <Link
              href="/cook-panel/settings"
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Settings
            </Link>
            <Button
              variant="ghost"
              className="justify-start p-0 text-lg font-medium"
              onClick={() => {
                handleLogout()
                setIsMobileMenuOpen(false)
              }}
            >
              Log out
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}