"use client"

import { useState } from "react"
import { ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

const categories = ["All", "North Indian", "South Indian", "Bengali", "Gujarati", "Punjabi", "Mughlai"]

const popularDishes = [
  {
    id: 1,
    name: "Homestyle pigeon pea",
    image: "https://www.veganricha.com/wp-content/uploads/2010/11/nov-1-2B069.jpg",
    price: 129,
    rating: 4.8,
    reviews: 56,
    cook: "Priya Sharma",
    cookImage: "",
    category: "North Indian",
  },
  {
    id: 2,
    name: "Shahi Paneer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZDjesFQipdDCSlQFebTEYJTDzSBVS8hUpg&s",
    price: 249,
    rating: 4.9,
    reviews: 42,
    cook: "Lakshmi Iyer",
    cookImage: "/placeholder.svg?height=100&width=100&text=LI",
    category: "South Indian",
  },
  {
    id: 3,
    name: "Authentic Jeera Rice",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt9GhqB2SjVMNccOCFAfWEHNY2R5VSYl2Ig7dqbRQG23xZHP2fikhB8W_bpGrL9wDTaLg&usqp=CAU",
    price: 150,
    rating: 4.7,
    reviews: 38,
    cook: "Fatima Khan",
    cookImage: "/placeholder.svg?height=100&width=100&text=FK",
    category: "Mughlai",
  },
  {
    id: 4,
    name: "Chapati",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpvotSnSOCFDcocaKET8nS2d3qNc_lrFlLyw&s",
    price: 19,
    rating: 4.8,
    reviews: 29,
    cook: "Anita Desai",
    cookImage: "/placeholder.svg?height=100&width=100&text=AD",
    category: "Gujarati",
  },
  {
    id: 5,
    name: "Aloo Prantha",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlTrM8IUMYHbOP64FkNYqMrO0m8eZgJGxcIA&s",
    price: 50,
    rating: 4.6,
    reviews: 31,
    cook: "Mitali Sen",
    cookImage: "/placeholder.svg?height=100&width=100&text=MS",
    category: "Punjabi",
  },
  {
    id: 6,
    name: "Punjabi Chole Bhature",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUAO58g2MbPfsOadsiWgrsLvKVe1LzYXQXHg&s",
    price: 179,
    rating: 4.7,
    reviews: 44,
    cook: "Harpreet Kaur",
    cookImage: "/placeholder.svg?height=100&width=100&text=HK",
    category: "Punjabi",
  },
]

export default function PopularDishes() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredDishes =
    activeCategory === "All" ? popularDishes : popularDishes.filter((dish) => dish.category === activeCategory)

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Popular Dishes</h2>
            <p className="text-muted-foreground">Authentic homemade dishes loved by our community</p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0">
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <TabsList className="mb-8 flex flex-wrap h-auto bg-transparent space-x-2 space-y-2 sm:space-y-0">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-full px-4 py-2 border"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish, index) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-video relative">
                      <img
                        src={dish.image || "/placeholder.svg"}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-medium">
                        ₹{dish.price}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                          <img
                            src={dish.cookImage || "/placeholder.svg"}
                            alt={dish.cook}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{dish.cook}</span>
                        <div className="ml-auto flex items-center">
                          <Star className="fill-yellow-400 stroke-yellow-400 h-3 w-3 mr-1" />
                          <span className="text-xs font-medium">{dish.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">({dish.reviews})</span>
                        </div>
                      </div>
                      <h3 className="font-semibold">{dish.name}</h3>
                      <div className="mt-4">
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                          Order Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

