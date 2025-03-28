import Link from "next/link"
import HeroSection from "@/components/hero-section"
import FeaturedCooks from "@/components/featured-cooks"
import PopularDishes from "@/components/popular-dishes"
import HowItWorks from "@/components/how-it-works"
import TestimonialSection from "@/components/testimonial-section"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="font-bold text-2xl bg-gradient-to-r from-orange-500 to-pink-600 text-transparent bg-clip-text">
              QuickBites
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-4 ml-10">
            <Link href="/explore" className="text-sm font-medium transition-colors hover:text-primary">
              Explore
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How it Works
            </Link>
            <Link href="/become-a-cook" className="text-sm font-medium transition-colors hover:text-primary">
              Become a Cook
            </Link>
          </div>
          <div className="flex items-center ml-auto gap-4">
            <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />
        <FeaturedCooks />
        <PopularDishes />
        <HowItWorks />
        <TestimonialSection />
      </main>

      <footer className="border-t bg-muted/40 bg-black">
        <div className="container py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-2xl bg-gradient-to-r from-orange-500 to-pink-600 text-transparent bg-clip-text mb-4 cursor-pointer">
                QuickBites
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting home cooks with food lovers for authentic homemade meals.
                
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/About us/Componentt/src/Components/AboutUs.jsx" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Cooks</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Join as a Cook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cook Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HomeFeast. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

