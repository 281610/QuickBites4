"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LocationPermissionPopup({ onAllow }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAllow = () => {
    setIsLoading(true)
    try {
      onAllow()
    } catch (error) {
      console.error("Error allowing location:", error)
    }
    // Always reset loading state after a timeout
    setTimeout(() => setIsLoading(false), 3000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-xl text-center">Enable Location Services</CardTitle>
          <CardDescription className="text-center">
            HomeFeast needs access to your location to show you nearby home cooks and provide accurate delivery
            estimates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>By enabling location services, you'll be able to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Discover home cooks near you</li>
              <li>Get accurate delivery time estimates</li>
              <li>Track your order in real-time</li>
              <li>Receive location-based offers and promotions</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => onAllow(false)}>
            Not Now
          </Button>
          <Button
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
            onClick={handleAllow}
            disabled={isLoading}
          >
            {isLoading ? "Accessing Location..." : "Allow Location Access"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

