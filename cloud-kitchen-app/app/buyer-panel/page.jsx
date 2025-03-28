"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Star, MapPin, Clock, Filter, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BuyerHeader from "@/components/buyer-header"
import LocationPermissionPopup from "@/components/location-permission-popup"
import MapView from "@/components/map-view"

const categories = [
  "All",
  "North Indian",
  "South Indian",
  "Bengali",
  "Gujarati",
  "Punjabi",
  "Mughlai",
  "Chinese",
  "Continental",
]

const popularDishes = [
  {
    id: 1,
    name: "Homestyle Butter Chicken",
    image: "/placeholder.svg?height=400&width=600&text=Butter+Chicken",
    price: 249,
    rating: 4.8,
    reviews: 56,
    cook: "Priya Sharma",
    cookImage: "/placeholder.svg?height=100&width=100&text=PS",
    category: "North Indian",
    distance: "1.2 km",
    deliveryTime: "30-40 min",
  },
  {
    id: 2,
    name: "Traditional Masala Dosa",
    image: "/placeholder.svg?height=400&width=600&text=Masala+Dosa",
    price: 129,
    rating: 4.9,
    reviews: 42,
    cook: "Lakshmi Iyer",
    cookImage: "/placeholder.svg?height=100&width=100&text=LI",
    category: "South Indian",
    distance: "0.8 km",
    deliveryTime: "20-30 min",
  },
  {
    id: 3,
    name: "Authentic Hyderabadi Biryani",
    image: "/placeholder.svg?height=400&width=600&text=Biryani",
    price: 299,
    rating: 4.7,
    reviews: 38,
    cook: "Fatima Khan",
    cookImage: "/placeholder.svg?height=100&width=100&text=FK",
    category: "Mughlai",
    distance: "1.5 km",
    deliveryTime: "35-45 min",
  },
  {
    id: 4,
    name: "Homemade Gujarati Thali",
    image: "/placeholder.svg?height=400&width=600&text=Gujarati+Thali",
    price: 199,
    rating: 4.8,
    reviews: 29,
    cook: "Anita Desai",
    cookImage: "/placeholder.svg?height=100&width=100&text=AD",
    category: "Gujarati",
    distance: "2.1 km",
    deliveryTime: "40-50 min",
  },
  {
    id: 5,
    name: "Bengali Fish Curry",
    image: "/placeholder.svg?height=400&width=600&text=Fish+Curry",
    price: 279,
    rating: 4.6,
    reviews: 31,
    cook: "Mitali Sen",
    cookImage: "/placeholder.svg?height=100&width=100&text=MS",
    category: "Bengali",
    distance: "1.8 km",
    deliveryTime: "30-40 min",
  },
  {
    id: 6,
    name: "Punjabi Chole Bhature",
    image: "/placeholder.svg?height=400&width=600&text=Chole+Bhature",
    price: 179,
    rating: 4.7,
    reviews: 44,
    cook: "Harpreet Kaur",
    cookImage: "/placeholder.svg?height=100&width=100&text=HK",
    category: "Punjabi",
    distance: "1.3 km",
    deliveryTime: "25-35 min",
  },
]

export default function BuyerPanel() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showLocationPopup, setShowLocationPopup] = useState(false)
  const [location, setLocation] = useState(null)
  const [cart, setCart] = useState([])
  const [showMap, setShowMap] = useState(false)
  const [selectedDish, setSelectedDish] = useState(null)
  const [filters, setFilters] = useState({
    maxDistance: 5,
    maxPrice: 500,
    minRating: 4,
    vegOnly: false,
    sortBy: "popularity",
  })

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }

    // Show location popup on page load
    setShowLocationPopup(true)

    // Check if we already have location permission
    if (navigator.geolocation) {
      navigator.permissions &&
        navigator.permissions
          .query({ name: "geolocation" })
          .then((result) => {
            if (result.state === "granted") {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  })
                  setShowLocationPopup(false)
                },
                (error) => {
                  console.error("Geolocation error:", error)
                  // Set default location and don't hide popup
                  setLocation({ lat: 19.076, lng: 72.8777 }) // Default to Mumbai
                },
                { timeout: 10000, enableHighAccuracy: true },
              )
            }
          })
          .catch((error) => {
            console.error("Permission query error:", error)
            // Fallback for browsers that don't support permissions API
            setLocation({ lat: 19.076, lng: 72.8777 }) // Default to Mumbai
          })
    } else {
      // Geolocation not supported
      setLocation({ lat: 19.076, lng: 72.8777 }) // Default to Mumbai
      console.warn("Geolocation is not supported by this browser")
    }
  }, [router])

  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setShowLocationPopup(false)
        },
        (error) => {
          console.error("Geolocation error:", error)
          // Set default location and hide popup anyway
          setLocation({ lat: 19.076, lng: 72.8777 }) // Default to Mumbai
          setShowLocationPopup(false)
          // Show a toast or alert to inform the user
          alert("Could not access your location. Using default location instead.")
        },
        { timeout: 10000, enableHighAccuracy: true },
      )
    } else {
      // Geolocation not supported
      setLocation({ lat: 19.076, lng: 72.8777 }) // Default to Mumbai
      setShowLocationPopup(false)
      alert("Geolocation is not supported by your browser. Using default location.")
    }
  }

  const handleAddToCart = (dish) => {
    const existingItem = cart.find((item) => item.id === dish.id)

    if (existingItem) {
      setCart(cart.map((item) => (item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...dish, quantity: 1 }])
    }
  }

  const handleViewOnMap = (dish) => {
    setSelectedDish(dish)
    setShowMap(true)
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredDishes = popularDishes
    .filter((dish) => {
      // Category filter
      if (activeCategory !== "All" && dish.category !== activeCategory) return false

      // Search filter
      if (
        searchQuery &&
        !dish.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !dish.cook.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !dish.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Distance filter
      const distance = Number.parseFloat(dish.distance)
      if (distance > filters.maxDistance) return false

      // Price filter
      if (dish.price > filters.maxPrice) return false

      // Rating filter
      if (dish.rating < filters.minRating) return false

      return true
    })
    .sort((a, b) => {
      if (filters.sortBy === "price-low") return a.price - b.price
      if (filters.sortBy === "price-high") return b.price - a.price
      if (filters.sortBy === "rating") return b.rating - a.rating
      if (filters.sortBy === "distance") return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
      // Default: popularity (by reviews)
      return b.reviews - a.reviews
    })

  return (
    <div className="flex flex-col min-h-screen">
      <BuyerHeader cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />

      <main className="flex-1 bg-muted/40 pb-20">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search dishes, cooks, or cuisines..."
                className="pl-9 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Options</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div className="space-y-2">
                      <Label>Maximum Distance: {filters.maxDistance} km</Label>
                      <Slider
                        defaultValue={[filters.maxDistance]}
                        max={10}
                        step={0.5}
                        onValueChange={(value) => handleFilterChange("maxDistance", value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Maximum Price: ₹{filters.maxPrice}</Label>
                      <Slider
                        defaultValue={[filters.maxPrice]}
                        max={1000}
                        step={50}
                        onValueChange={(value) => handleFilterChange("maxPrice", value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Minimum Rating: {filters.minRating}</Label>
                      <Slider
                        defaultValue={[filters.minRating]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleFilterChange("minRating", value[0])}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="veg-only"
                        checked={filters.vegOnly}
                        onCheckedChange={(checked) => handleFilterChange("vegOnly", checked)}
                      />
                      <Label htmlFor="veg-only">Vegetarian Only</Label>
                    </div>

                    <div className="space-y-2">
                      <Label>Sort By</Label>
                      <Select
                        defaultValue={filters.sortBy}
                        onValueChange={(value) => handleFilterChange("sortBy", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popularity">Popularity</SelectItem>
                          <SelectItem value="rating">Rating</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="distance">Distance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Button variant="outline" className="gap-2" onClick={() => setShowMap(!showMap)}>
                <MapPin className="h-4 w-4" />
                {showMap ? "Hide Map" : "Show Map"}
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button className="gap-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700">
                    <ShoppingBag className="h-4 w-4" />
                    Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                  </SheetHeader>
                  {cart.length === 0 ? (
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
                  ) : (
                    <div className="py-4">
                      <div className="space-y-4 mb-6">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4 border-b pb-4">
                            <div className="w-20 h-20 rounded-md overflow-hidden">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.cook}</p>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => {
                                      if (item.quantity === 1) {
                                        setCart(cart.filter((i) => i.id !== item.id))
                                      } else {
                                        setCart(
                                          cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i)),
                                        )
                                      }
                                    }}
                                  >
                                    -
                                  </Button>
                                  <span>{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => {
                                      setCart(
                                        cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
                                      )
                                    }}
                                  >
                                    +
                                  </Button>
                                </div>
                                <p className="font-medium">₹{item.price * item.quantity}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 border-t pt-4">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee</span>
                          <span>₹40</span>
                        </div>
                        <div className="flex justify-between font-medium text-lg border-t pt-2">
                          <span>Total</span>
                          <span>₹{cart.reduce((total, item) => total + item.price * item.quantity, 0) + 40}</span>
                        </div>
                      </div>

                      <Button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                        Proceed to Checkout
                      </Button>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {showMap ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="h-[500px]">
                <MapView
                  userLocation={location}
                  selectedDish={selectedDish}
                  dishes={filteredDishes}
                  onSelectDish={setSelectedDish}
                />
              </div>
            </div>
          ) : (
            <>
              <Tabs defaultValue="All" className="w-full mb-6">
                <TabsList className="mb-4 flex flex-wrap h-auto bg-transparent space-x-2 space-y-2 sm:space-y-0">
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
              </Tabs>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDishes.length > 0 ? (
                  filteredDishes.map((dish) => (
                    <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
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

                        <div className="flex items-center gap-4 mt-2 mb-4">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {dish.distance}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {dish.deliveryTime}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewOnMap(dish)}>
                            View on Map
                          </Button>
                          <Button
                            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                            size="sm"
                            onClick={() => handleAddToCart(dish)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <div className="text-muted-foreground mb-4">
                      <Search className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No dishes found</h3>
                    </div>
                    <p className="text-muted-foreground text-center max-w-md">
                      Try adjusting your filters or search query to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {showLocationPopup && <LocationPermissionPopup onAllow={handleLocationPermission} />}
    </div>
  )
}

