"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function MapView({ userLocation, selectedDish, dishes, onSelectDish }) {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [infoWindow, setInfoWindow] = useState(null)

  // Initialize map
  useEffect(() => {
    // Mock Google Maps API for prototype
    // In a real app, you would load the actual Google Maps API
    const mockGoogleMaps = {
      Map: (element, options) => ({
        setCenter: () => {},
        setZoom: () => {},
        panTo: () => {},
      }),
      Marker: (options) => ({
        setMap: () => {},
        addListener: (event, callback) => {},
        getPosition: () => options.position,
      }),
      InfoWindow: (options) => ({
        setContent: () => {},
        open: () => {},
        close: () => {},
      }),
      LatLng: (lat, lng) => ({ lat, lng }),
    }

    // Set default location if userLocation is null
    const defaultLocation = { lat: 19.076, lng: 72.8777 } // Mumbai
    const mapCenter = userLocation || defaultLocation

    // Mock initialization
    if (mapRef.current && !map) {
      // For the prototype, we're mocking the Google Maps API
      // In a real app, you would use the actual Google Maps API
      window.google = window.google || {}
      window.google.maps = window.google.maps || mockGoogleMaps

      const newMap = new mockGoogleMaps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 13,
      })
      setMap(newMap)

      const newInfoWindow = new mockGoogleMaps.InfoWindow()
      setInfoWindow(newInfoWindow)
    }
  }, [userLocation, map])

  // Add markers for dishes
  useEffect(() => {
    if (map && dishes && dishes.length > 0) {
      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null))

      // Default location if userLocation is null
      const defaultLocation = { lat: 19.076, lng: 72.8777 } // Mumbai
      const baseLocation = userLocation || defaultLocation

      // Mock Google Maps LatLng for prototype
      const mockLatLng = (distance) => {
        // Generate random coordinates based on distance
        const lat = baseLocation.lat + Math.random() * 0.01 * distance
        const lng = baseLocation.lng + Math.random() * 0.01 * distance
        return { lat, lng }
      }

      // Add new markers
      const newMarkers = dishes.map((dish) => {
        const distance = Number.parseFloat(dish.distance)
        const position = mockLatLng(distance)

        // Mock marker creation
        const marker = new window.google.maps.Marker({
          position,
          map,
          title: dish.name,
        })

        // Add click listener
        marker.addListener("click", () => {
          if (onSelectDish) {
            onSelectDish(dish)
          }

          if (infoWindow) {
            infoWindow.setContent(`
              <div style="padding: 8px; max-width: 200px;">
                <h3 style="margin: 0 0 8px; font-weight: 600;">${dish.name}</h3>
                <p style="margin: 0 0 4px; font-size: 12px;">By ${dish.cook}</p>
                <p style="margin: 0; font-size: 14px; font-weight: 500;">₹${dish.price}</p>
              </div>
            `)
            infoWindow.open(map, marker)
          }
        })

        return marker
      })

      setMarkers(newMarkers)

      // Center on selected dish if available
      if (selectedDish) {
        const selectedIndex = dishes.findIndex((d) => d.id === selectedDish.id)
        if (selectedIndex >= 0 && newMarkers[selectedIndex]) {
          const marker = newMarkers[selectedIndex]
          map.panTo(marker.getPosition())

          // Safely trigger click event
          if (typeof marker.addListener === "function") {
            marker.addListener("click")() // Trigger click event
          }
        }
      }
    }
  }, [map, dishes, selectedDish, infoWindow, userLocation, onSelectDish])

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full bg-muted/20">
        {/* Placeholder for map - in a real app this would be rendered by Google Maps */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center max-w-md px-4">
            Map view would display here with markers for each home cook.
            <br />
            In a real app, this would use the Google Maps API.
          </p>
        </div>
      </div>

      {/* User location button */}
      <Button
        className="absolute bottom-4 right-4 bg-background shadow-lg"
        size="icon"
        onClick={() => {
          if (map && userLocation) {
            map.panTo(userLocation)
          }
        }}
      >
        <Navigation className="h-4 w-4" />
        <span className="sr-only">My Location</span>
      </Button>

      {/* Selected dish info */}
      {selectedDish && (
        <Card className="absolute bottom-4 left-4 w-64 shadow-lg">
          <CardContent className="p-3">
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded overflow-hidden">
                <img
                  src={selectedDish.image || "/placeholder.svg"}
                  alt={selectedDish.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-sm">{selectedDish.name}</h4>
                <p className="text-xs text-muted-foreground">{selectedDish.cook}</p>
                <p className="text-sm font-medium mt-1">₹{selectedDish.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

