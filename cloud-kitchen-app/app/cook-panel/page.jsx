"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  ChevronRight,
  Clock,
  DollarSign,
  Users,
  ShoppingBag,
  Star,
  Edit,
  Trash2,
  AlertCircle,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import CookHeader from "@/components/cook-header"
import LocationPermissionPopup from "@/components/location-permission-popup"

const mockOrders = [
  {
    id: "ORD-001",
    customer: "Rahul Mehta",
    items: [
      { name: "Butter Chicken", quantity: 1, price: 249 },
      { name: "Garlic Naan", quantity: 2, price: 49 },
    ],
    total: 347,
    status: "pending",
    time: "10:30 AM",
    address: "123 Main St, Mumbai",
    distance: "1.2 km",
  },
  {
    id: "ORD-002",
    customer: "Sneha Patel",
    items: [
      { name: "Paneer Tikka", quantity: 1, price: 199 },
      { name: "Jeera Rice", quantity: 1, price: 99 },
    ],
    total: 298,
    status: "preparing",
    time: "11:15 AM",
    address: "456 Park Ave, Mumbai",
    distance: "0.8 km",
  },
  {
    id: "ORD-003",
    customer: "Vikram Singh",
    items: [
      { name: "Butter Chicken", quantity: 2, price: 249 },
      { name: "Butter Naan", quantity: 4, price: 39 },
    ],
    total: 654,
    status: "ready",
    time: "12:00 PM",
    address: "789 Oak St, Mumbai",
    distance: "1.5 km",
  },
]

const mockDishes = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Tender chicken cooked in a rich and creamy tomato-based sauce with butter and spices.",
    price: 249,
    image: "/placeholder.svg?height=400&width=600&text=Butter+Chicken",
    category: "North Indian",
    isVeg: false,
    isAvailable: true,
    preparationTime: 30,
    rating: 4.8,
    reviews: 56,
  },
  {
    id: 2,
    name: "Paneer Tikka",
    description: "Chunks of paneer marinated in spices and grilled to perfection.",
    price: 199,
    image: "/placeholder.svg?height=400&width=600&text=Paneer+Tikka",
    category: "North Indian",
    isVeg: true,
    isAvailable: true,
    preparationTime: 25,
    rating: 4.7,
    reviews: 42,
  },
  {
    id: 3,
    name: "Butter Naan",
    description: "Soft and fluffy Indian bread brushed with butter.",
    price: 39,
    image: "/placeholder.svg?height=400&width=600&text=Butter+Naan",
    category: "Breads",
    isVeg: true,
    isAvailable: true,
    preparationTime: 15,
    rating: 4.9,
    reviews: 78,
  },
  {
    id: 4,
    name: "Jeera Rice",
    description: "Basmati rice flavored with cumin seeds.",
    price: 99,
    image: "/placeholder.svg?height=400&width=600&text=Jeera+Rice",
    category: "Rice",
    isVeg: true,
    isAvailable: true,
    preparationTime: 20,
    rating: 4.6,
    reviews: 35,
  },
]

const mockEarnings = {
  today: 1299,
  week: 8745,
  month: 32450,
  orders: {
    today: 5,
    week: 32,
    month: 124,
  },
  customers: {
    today: 4,
    week: 18,
    month: 56,
  },
}

export default function CookPanel() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showLocationPopup, setShowLocationPopup] = useState(false)
  const [location, setLocation] = useState(null)
  const [dishes, setDishes] = useState(mockDishes)
  const [orders, setOrders] = useState(mockOrders)
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    isVeg: false,
    preparationTime: "",
  })
  const [isAddDishOpen, setIsAddDishOpen] = useState(false)
  const [editingDish, setEditingDish] = useState(null)

  // const [username, setUsername] = useState("")

  const [username, setUsername] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("");
      return;
    }
  
    // Parse user data and set username
    const userData = JSON.parse(user);
    setUsername(userData.username || userData.name || "User");
  
    // Check role and redirect if not 'cook'
    if (userData.role !== "cook") {
      router.push("/buyer-panel");
      return;
    }
  
    // Show location popup on page load
    setShowLocationPopup(true);
  
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
                  });
                  setShowLocationPopup(false);
                },
                (error) => {
                  console.error("Geolocation error:", error);
                  // Set default location and don't hide popup
                  setLocation({ lat: 19.076, lng: 72.8777 }); // Default to Mumbai
                },
                { timeout: 10000, enableHighAccuracy: true }
              );
            }
          })
          .catch((error) => {
            console.error("Permission query error:", error);
            // Fallback for browsers that don't support permissions API
            setLocation({ lat: 19.076, lng: 72.8777 }); // Default to Mumbai
          });
    } else {
      // Geolocation not supported
      setLocation({ lat: 19.076, lng: 72.8777 }); // Default to Mumbai
      console.warn("Geolocation is not supported by this browser");
    }
  }, [router]);
  

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

  const handleAddDish = () => {
    if (editingDish) {
      // Update existing dish
      setDishes(
        dishes.map((dish) =>
          dish.id === editingDish.id
            ? {
                ...dish,
                name: newDish.name || dish.name,
                description: newDish.description || dish.description,
                price: Number.parseInt(newDish.price) || dish.price,
                category: newDish.category || dish.category,
                isVeg: newDish.isVeg,
                preparationTime: Number.parseInt(newDish.preparationTime) || dish.preparationTime,
              }
            : dish,
        ),
      )
    } else {
      // Add new dish
      const newId = Math.max(...dishes.map((dish) => dish.id)) + 1
      setDishes([
        ...dishes,
        {
          id: newId,
          name: newDish.name,
          description: newDish.description,
          price: Number.parseInt(newDish.price),
          image: `/placeholder.svg?height=400&width=600&text=${newDish.name.replace(/\s+/g, "+")}`,
          category: newDish.category,
          isVeg: newDish.isVeg,
          isAvailable: true,
          preparationTime: Number.parseInt(newDish.preparationTime),
          rating: 0,
          reviews: 0,
        },
      ])
    }

    // Reset form
    setNewDish({
      name: "",
      description: "",
      price: "",
      category: "",
      isVeg: false,
      preparationTime: "",
    })
    setEditingDish(null)
    setIsAddDishOpen(false)
  }

  const handleEditDish = (dish) => {
    setEditingDish(dish)
    setNewDish({
      name: dish.name,
      description: dish.description,
      price: dish.price.toString(),
      category: dish.category,
      isVeg: dish.isVeg,
      preparationTime: dish.preparationTime.toString(),
    })
    setIsAddDishOpen(true)
  }

  const handleDeleteDish = (id) => {
    setDishes(dishes.filter((dish) => dish.id !== id))
  }

  const handleToggleDishAvailability = (id) => {
    setDishes(dishes.map((dish) => (dish.id === id ? { ...dish, isAvailable: !dish.isAvailable } : dish)))
  }

  const handleUpdateOrderStatus = (id, status) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status } : order)))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CookHeader />
      <header className="p-4 bg-gray-800 text-white">
      <div className="container mx-auto">
        Welcome, {username}
      </div>
    </header>
      <main className="flex-1 bg-muted/40 pb-20">
        <div className="container py-6">
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-transparent border rounded-lg p-1">
              <TabsTrigger value="dashboard" className="rounded-md data-[state=active]:bg-background">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="menu" className="rounded-md data-[state=active]:bg-background">
                My Menu
              </TabsTrigger>
              <TabsTrigger value="orders" className="rounded-md data-[state=active]:bg-background">
                Orders
              </TabsTrigger>
              <TabsTrigger value="earnings" className="rounded-md data-[state=active]:bg-background">
                Earnings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Today's Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground mr-2" />
                      <div className="text-2xl font-bold">{mockEarnings.orders.today}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Today's Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
                      <div className="text-2xl font-bold">₹{mockEarnings.today}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Customers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-muted-foreground mr-2" />
                      <div className="text-2xl font-bold">{mockEarnings.customers.today}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Your most recent orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <div className="font-medium">{order.customer}</div>
                            <div className="text-sm text-muted-foreground">
                              {order.items.map((item) => `${item.quantity}x ${item.name}`).join(", ")}
                            </div>
                            <div className="text-sm font-medium mt-1">₹{order.total}</div>
                          </div>
                          <div>
                            <div
                              className={`text-xs px-2 py-1 rounded-full ${
                                order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "preparing"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{order.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full" onClick={() => setActiveTab("orders")}>
                      View All Orders
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Popular Dishes</CardTitle>
                    <CardDescription>Your most ordered dishes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dishes.slice(0, 3).map((dish) => (
                        <div key={dish.id} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                          <div className="w-12 h-12 rounded-md overflow-hidden">
                            <img
                              src={dish.image || "/placeholder.svg"}
                              alt={dish.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{dish.name}</div>
                            <div className="flex items-center text-sm">
                              <Star className="fill-yellow-400 stroke-yellow-400 h-3 w-3 mr-1" />
                              <span>{dish.rating}</span>
                              <span className="text-muted-foreground ml-1">({dish.reviews} reviews)</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹{dish.price}</div>
                            <div className="text-xs text-muted-foreground">{dish.preparationTime} min</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full" onClick={() => setActiveTab("menu")}>
                      View All Dishes
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="menu" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Menu</h2>
                <Dialog open={isAddDishOpen} onOpenChange={setIsAddDishOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                      <Plus className="h-4 w-4" />
                      Add New Dish
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingDish ? "Edit Dish" : "Add New Dish"}</DialogTitle>
                      <DialogDescription>
                        {editingDish ? "Update the details of your dish" : "Add a new dish to your menu"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Dish Name</Label>
                        <Input
                          id="name"
                          placeholder="e.g. Butter Chicken"
                          value={newDish.name}
                          onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your dish"
                          value={newDish.description}
                          onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price (₹)</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="e.g. 249"
                            value={newDish.price}
                            onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="preparationTime">Preparation Time (min)</Label>
                          <Input
                            id="preparationTime"
                            type="number"
                            placeholder="e.g. 30"
                            value={newDish.preparationTime}
                            onChange={(e) => setNewDish({ ...newDish, preparationTime: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newDish.category}
                          onValueChange={(value) => setNewDish({ ...newDish, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="North Indian">North Indian</SelectItem>
                            <SelectItem value="South Indian">South Indian</SelectItem>
                            <SelectItem value="Chinese">Chinese</SelectItem>
                            <SelectItem value="Continental">Continental</SelectItem>
                            <SelectItem value="Breads">Breads</SelectItem>
                            <SelectItem value="Rice">Rice</SelectItem>
                            <SelectItem value="Desserts">Desserts</SelectItem>
                            <SelectItem value="Beverages">Beverages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isVeg"
                          checked={newDish.isVeg}
                          onCheckedChange={(checked) => setNewDish({ ...newDish, isVeg: checked })}
                        />
                        <Label htmlFor="isVeg">Vegetarian</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsAddDishOpen(false)
                          setEditingDish(null)
                          setNewDish({
                            name: "",
                            description: "",
                            price: "",
                            category: "",
                            isVeg: false,
                            preparationTime: "",
                          })
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddDish}>{editingDish ? "Update Dish" : "Add Dish"}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dishes.map((dish) => (
                  <Card key={dish.id} className="overflow-hidden">
                    <div className="flex">
                      <div className="w-1/3">
                        <img
                          src={dish.image || "/placeholder.svg"}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{dish.name}</h3>
                            <div className="flex items-center mt-1">
                              <Star className="fill-yellow-400 stroke-yellow-400 h-3 w-3 mr-1" />
                              <span className="text-sm">{dish.rating}</span>
                              <span className="text-xs text-muted-foreground ml-1">({dish.reviews})</span>
                              {dish.isVeg ? (
                                <span className="ml-2 px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                                  Veg
                                </span>
                              ) : (
                                <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-800 text-xs rounded">
                                  Non-Veg
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹{dish.price}</div>
                            <div className="text-xs text-muted-foreground">{dish.preparationTime} min</div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{dish.description}</p>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`available-${dish.id}`}
                              checked={dish.isAvailable}
                              onCheckedChange={() => handleToggleDishAvailability(dish.id)}
                            />
                            <Label htmlFor={`available-${dish.id}`} className="text-sm">
                              {dish.isAvailable ? "Available" : "Unavailable"}
                            </Label>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditDish(dish)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteDish(dish.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <h2 className="text-2xl font-bold">Orders</h2>

              <div className="grid grid-cols-1 gap-6">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                          <CardDescription>{order.customer}</CardDescription>
                        </div>
                        <div
                          className={`text-xs px-3 py-1 rounded-full ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "preparing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border rounded-md p-4">
                          <h4 className="font-medium mb-2">Order Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {item.quantity}x {item.name}
                                </span>
                                <span>₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                            <div className="border-t mt-2 pt-2 font-medium flex justify-between">
                              <span>Total</span>
                              <span>₹{order.total}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="border rounded-md p-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <Clock className="h-4 w-4" />
                              <span>Order Time</span>
                            </div>
                            <div className="font-medium">{order.time}</div>
                          </div>

                          <div className="border rounded-md p-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <MapPin className="h-4 w-4" />
                              <span>Delivery Address</span>
                            </div>
                            <div className="font-medium">{order.address}</div>
                          </div>

                          <div className="border rounded-md p-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <AlertCircle className="h-4 w-4" />
                              <span>Distance</span>
                            </div>
                            <div className="font-medium">{order.distance}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 justify-end">
                      {order.status === "pending" && (
                        <Button
                          onClick={() => handleUpdateOrderStatus(order.id, "preparing")}
                          className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                        >
                          Accept & Start Preparing
                        </Button>
                      )}

                      {order.status === "preparing" && (
                        <Button
                          onClick={() => handleUpdateOrderStatus(order.id, "ready")}
                          className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                        >
                          Mark as Ready
                        </Button>
                      )}

                      {order.status === "ready" && (
                        <Button
                          onClick={() => handleUpdateOrderStatus(order.id, "completed")}
                          className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                        >
                          Complete Order
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-6">
              <h2 className="text-2xl font-bold">Earnings</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Today</CardTitle>
                    <CardDescription>Your earnings today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">₹{mockEarnings.today}</div>
                    <div className="text-sm text-muted-foreground mt-2">{mockEarnings.orders.today} orders</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>This Week</CardTitle>
                    <CardDescription>Your earnings this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">₹{mockEarnings.week}</div>
                    <div className="text-sm text-muted-foreground mt-2">{mockEarnings.orders.week} orders</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>This Month</CardTitle>
                    <CardDescription>Your earnings this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">₹{mockEarnings.month}</div>
                    <div className="text-sm text-muted-foreground mt-2">{mockEarnings.orders.month} orders</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Earnings Breakdown</CardTitle>
                  <CardDescription>Your earnings by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <p>Earnings chart will be displayed here</p>
                      <p className="text-sm">Showing data for the current month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {showLocationPopup && <LocationPermissionPopup onAllow={handleLocationPermission} />}
    </div>
  )
}

