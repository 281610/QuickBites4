"use client"
import { Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const featuredCooks = [
  {
    id: 1,
    name: "Priya Sharma",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS7AiWKSLuNFQqtHEKxq6OgdTQYctWcUXR4g&s",
    cuisine: "North Indian",
    rating: 4.9,
    reviews: 124,
    specialty: "Butter Chicken, Naan, Biryani",
  },
  {
    id: 2,
    name: "Lakshmi Iyer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwPqKf_nf-ZGds89glVqoStkxRX_yzWdQ8pg&s",
    cuisine: "South Indian",
    rating: 4.8,
    reviews: 98,
    specialty: "Dosa, Idli, Sambar",
  },
  {
    id: 3,
    name: "Fatima Khan",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_k00ibnFvQaMvvSRBY3ZBpT3Cit1hn9ztHw&s",
    cuisine: "Mughlai",
    rating: 4.7,
    reviews: 87,
    specialty: "Kebabs, Biryani, Korma",
  },
  {
    id: 4,
    name: "Anita Desai",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8IIwKhMgGWPNxSUUqpWv3B3qEPR_Z5JLPw&s",
    cuisine: "Gujarati",
    rating: 4.9,
    reviews: 112,
    specialty: "Dhokla, Thepla, Undhiyu",
  },
]

export default function FeaturedCooks() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Home Cooks</h2>
            <p className="text-muted-foreground">Discover talented home cooks in your neighborhood</p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0">
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCooks.map((cook, index) => (
            <motion.div
              key={cook.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img src={cook.image || "/placeholder.svg"} alt={cook.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center text-white">
                      <Star className="fill-yellow-400 stroke-yellow-400 h-4 w-4 mr-1" />
                      <span className="font-medium">{cook.rating}</span>
                      <span className="text-xs text-white/80 ml-1">({cook.reviews})</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{cook.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{cook.cuisine} Cuisine</p>
                  <p className="text-xs">
                    <span className="font-medium">Specialty:</span> {cook.specialty}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

