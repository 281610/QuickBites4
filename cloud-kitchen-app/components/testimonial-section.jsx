"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Rahul Mehta",
    location: "Mumbai",
    image: "https://trustmary.com/_next/image/?url=https%3A%2F%2Ftrustmary.se.seravo.com%2Fwp-content%2Fuploads%2F2024%2F06%2Fwhite-collar-man-happily-pointing-to-his-rigth-with-two-hands.jpg&w=1200&q=75",
    rating: 5,
    text: "QuickBites has completly changed how I eat. The food is authentic and reminds me of my mother's cooking. I've tried several home cooks and each one brings their unique touch to traditional recipes.",
  },
  {
    id: 2,
    name: "Sneha Patel",
    location: "Ahmedabad",
    image: "https://i.gadgets360cdn.com/large/lost_zee5_yami_gautam_review_1676467906679.jpg",
    rating: 5,
    text: "As someone who lives alone and misses home-cooked food, HomeFeast has been a blessing. The quality and taste of the food is incomparable to restaurant food. It truly feels like eating at home.",
  },
  {
    id: 3,
    name: "Vikram Singh",
    location: "Delhi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvVg3tHkKhfcPflqgpGkN1ibg6GO_G0OpG7w&sS",
    rating: 4,
    text: "I've been ordering from QuickBites for my family dinners and everyone loves it. The variety of cuisines available from different home cooks makes it exciting to try something new each time.",
  },
  {
    id: 4,
    name: "Meera Krishnan",
    location: "Bangalore",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt7fbQpdrDM3Unx2sS0pL-UD-bPGiKxSNcHg&s",
    rating: 5,
    text: "The platform is so easy to use and the home cooks are incredibly talented. I love being able to support local home cooks while enjoying delicious, authentic food. Highly recommended!",
  },
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from people who have experienced the joy of authentic homemade food through QuickBites
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-10 col-span-2 flex flex-col justify-center">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonials[currentIndex].rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
                      />
                    ))}
                  </div>

                  <p className="mb-6 text-lg italic">"{testimonials[currentIndex].text}"</p>
                  <div>
                    <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonials[currentIndex].location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-4">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 p-0 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </Button>
            ))}
            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-6">Ready to Experience Authentic Homemade Food?</h3>
          <Button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700 px-8 py-6 text-lg h-auto">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  )
}

