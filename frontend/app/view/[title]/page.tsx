import ViewItinerary from '@/components/view-itinerary'

const getSampleData = (title: string) => ({
  travelDetails: {
    title: decodeURIComponent(title),
    startDate: "2024-01-01",
    endDate: "2024-01-03"
  },
  itinerary: {
    "1": {
      sets: [
        { id: "1", location: "xx旅館", transport: "0分", time: "9:00", transportType: 'car', locationType: 'home', showTransport: true, imageUrl: "/placeholder.svg?height=128&width=128" },
        { id: "2", location: "xx観光地", transport: "30分", time: "11:00", transportType: 'train', locationType: 'sightseeing', showTransport: true, imageUrl: "/placeholder.svg?height=128&width=128" },
      ]
    },
    "2": {
      sets: [
        { id: "3", location: "yy旅館", transport: "0分", time: "9:00", transportType: 'car', locationType: 'home', showTransport: true, imageUrl: "/placeholder.svg?height=128&width=128" },
        { id: "4", location: "yy名所", transport: "45分", time: "10:30", transportType: 'car', locationType: 'landmark', showTransport: true, imageUrl: "/placeholder.svg?height=128&width=128" },
      ]
    },
    "3": {
      sets: [
        { id: "5", location: "zz旅館", transport: "0分", time: "8:00", transportType: 'car', locationType: 'home', showTransport: true, imageUrl: "/placeholder.svg?height=128&width=128" },
        { id: "6", location: "zz公園", transport: "20分", time: "9:00", transportType: 'walk', locationType: 'sightseeing', showTransport: true, imageUrl: "/placeholder.svg?height=128&width=128" },
      ]
    }
  }
})

export default function ViewPage({ params }: { params: { title: string } }) {
  const data = getSampleData(params.title)
  
  return <ViewItinerary {...data} />
}

