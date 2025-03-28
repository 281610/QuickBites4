"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Frame, ShoppingBag, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function BuyerHeader({ cartCount = 0 }) {
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
        <Link href="/buyer-panel" className="flex items-center gap-2">
          <Frame className="w-6 h-6" />
          <div className="font-bold text-xl bg-gradient-to-r from-orange-500 to-pink-600 text-transparent bg-clip-text">
            HomeFeast
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-4 ml-10">
          <Link href="/buyer-panel" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/buyer-panel/favorites" className="text-sm font-medium transition-colors hover:text-primary">
            Favorites
          </Link>
          <Link href="/buyer-panel/orders" className="text-sm font-medium transition-colors hover:text-primary">
            My Orders
          </Link>
        </nav>

        <div className="flex items-center ml-auto gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative md:flex">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="flex flex-col items-center justify-center h-[70vh]">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <Button
                    variant="link"
                    className="mt-2 text-primary"
                    onClick={() => document.querySelector("[data-radix-collection-item]").click()}
                  >
                    Start browsing
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/buyer-panel/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/buyer-panel/orders">Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/buyer-panel/addresses">Addresses</Link>
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
            <Link href="/buyer-panel" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link
              href="/buyer-panel/favorites"
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Favorites
            </Link>
            <Link href="/buyer-panel/orders" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              My Orders
            </Link>
            <Link
              href="/buyer-panel/profile"
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/buyer-panel/addresses"
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Addresses
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

