"use client"

import { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [location, setLocation] = useState("")

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <img
          src="https://th.bing.com/th/id/OIP.YgLvqf2gVhYLFgPmhcIs7AHaEL?rs=1&pid=ImgDetMain"
          alt="Delicious homemade food"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-20 py-20 md:py-32">
        <div className="max-w-2xl">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{fontSize:"80px"}}
          >
                     Welcome to <span style={{color:"red"}}>QuickBites </span> Homemade Happiness, Delivered!

          </motion.h1>

          <motion.p
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover and order delicious meals cooked with love by talented home cooks in your neighborhood.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 bg-white p-2 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex-1 flex items-center gap-2 bg-muted/30 rounded px-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your location"
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700">
              <Search className="mr-2 h-4 w-4" /> Find Food
            </Button>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=100&width=100&text=${i}`}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-white text-sm">
              <span className="font-bold">1,500+</span> happy customers this week
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

