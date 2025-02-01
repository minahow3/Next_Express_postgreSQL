import React from "react"
import Image from "next/image"
import { useIntl } from 'react-intl'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Car, Train, MapPin, Home, Building, Utensils, Camera, Landmark } from 'lucide-react'

interface ItinerarySet {
  id: string
  location: string
  transport: string
  time: string
  transportType: 'car' | 'train' | 'walk'
  locationType: 'home' | 'building' | 'restaurant' | 'sightseeing' | 'landmark'
  showTransport: boolean
  imageUrl: string
}

interface DayItinerary {
  sets: ItinerarySet[]
}

interface TravelDetails {
  title: string
  startDate: string
  endDate: string
}

interface ViewItineraryProps {
  travelDetails: TravelDetails
  itinerary: Record<string, DayItinerary>
}

export default function ViewItinerary({ travelDetails, itinerary }: ViewItineraryProps) {
  const intl = useIntl()
  const [currentDay, setCurrentDay] = React.useState("1")

  const getLocationIcon = (type: ItinerarySet['locationType']) => {
    switch (type) {
      case 'home':
        return <Home className="h-4 w-4" />
      case 'building':
        return <Building className="h-4 w-4" />
      case 'restaurant':
        return <Utensils className="h-4 w-4" />
      case 'sightseeing':
        return <Camera className="h-4 w-4" />
      case 'landmark':
        return <Landmark className="h-4 w-4" />
    }
  }

  const getTransportIcon = (type: ItinerarySet['transportType']) => {
    switch (type) {
      case 'car':
        return <Car className="h-4 w-4" />
      case 'train':
        return <Train className="h-4 w-4" />
      case 'walk':
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{travelDetails.title}</h1>
        <p className="text-lg text-gray-600">{travelDetails.startDate} ~ {travelDetails.endDate}</p>
      </div>

      <Tabs value={currentDay} onValueChange={setCurrentDay}>
        <TabsList className="grid w-full grid-cols-7 bg-gray-100 p-1 rounded-xl">
          {Object.keys(itinerary).map((day) => (
            <TabsTrigger
              key={day}
              value={day}
              className="data-[state=active]:bg-white data-[state=active]:text-gray-800 rounded-lg transition-all duration-200 ease-in-out"
            >
              {intl.formatMessage({ id: 'day' }, { day })}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.keys(itinerary).map((day) => (
          <TabsContent key={day} value={day}>
            <div className="space-y-4">
              {itinerary[day].sets.map((set, index) => (
                <Card key={set.id} className="overflow-hidden border-gray-200">
                  <CardContent className="p-4 flex">
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center mb-2">
                        <div className="w-24 mr-2 text-gray-600">{set.time}</div>
                        <div className="flex items-center flex-1">
                          <div className="w-[120px] mr-2 text-gray-600">
                            {intl.formatMessage({ id: set.locationType })}
                          </div>
                          {getLocationIcon(set.locationType)}
                          <div className="ml-2 flex-1">{set.location}</div>
                        </div>
                      </div>

                      {index < itinerary[day].sets.length - 1 && set.showTransport && (
                        <div className="flex items-center mt-2 ml-[120px]">
                          <div className="w-[120px] mr-2 text-gray-600">
                            {intl.formatMessage({ id: set.transportType })}
                          </div>
                          <div className="flex items-center">
                            {getTransportIcon(set.transportType)}
                            <div className="ml-2 text-gray-600">{set.transport}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-32 h-32 relative ml-4">
                      <Image
                        src={set.imageUrl}
                        alt={set.location}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

