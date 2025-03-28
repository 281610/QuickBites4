"use client"

import { Search, Utensils, Clock, Truck } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: Search,
    title: "Discover Home Cooks",
    description: "Browse through a variety of talented home cooks in your neighborhood and explore their unique menus.",
  },
  {
    icon: Utensils,
    title: "Choose Your Meal",
    description: "Select from a wide range of authentic homemade dishes prepared with love and traditional recipes.",
  },
  {
    icon: Clock,
    title: "Place Your Order",
    description: "Order in advance or for same-day delivery, depending on the cook's availability and schedule.",
  },
  {
    icon: Truck,
    title: "Enjoy Home Cooking",
    description: "Receive your freshly prepared meal delivered right to your doorstep, ready to enjoy.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How HomeFeast Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform makes it easy to connect with talented home cooks and enjoy authentic homemade meals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Become a QuickBites Cook</h3>
              <p className="text-muted-foreground mb-6">
                Turn your cooking passion into income. Join thousands of home cooks who are sharing their culinary
                skills and earning money on their own schedule.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Share your authentic family recipes",
                  "Earn extra income on your own schedule",
                  "Build your reputation and customer base",
                  "Be part of a supportive cooking community",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-orange-500 to-pink-600 px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:from-orange-600 hover:to-pink-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <a href="/signup">Apply to Cook</a>
              </button>
            </div>
            <div className="relative h-64 md:h-auto">
              <img
                src="https://th.bing.com/th/id/OIP.Gv4G_f5z8Tb0K0rsl98UdAHaE8?rs=1&pid=ImgDetMain"
                alt="Home cook preparing food"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

