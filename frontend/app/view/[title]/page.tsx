import ViewItinerary from "@/components/view-itinerary";

interface TravelDetail {
  title: string;
  startDate: string;
  endDate: string;
}

interface ItinerarySet {
  id: string;
  location: string;
  transport: string;
  time: string;
  transportType: 'car' | 'train' | 'walk';
  locationType: 'home' | 'sightseeing' | 'landmark';
  showTransport: boolean;
  imageUrl: string;
}

interface Itinerary {
  [key: string]: {
    sets: ItinerarySet[];
  };
}

interface SampleData {
  travelDetails: TravelDetail;
  itinerary: Itinerary;
}

interface PageParams {
  title: string;
}

const getSampleData = (title: string): SampleData => ({
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
});

// props
type Props = {
  params: Promise<PageParams>;
};

export default async function ViewPage({ params }: Props) {
  const { title } = await params;  // 非同期でparamsを解決
  const data = getSampleData(title);  // 非同期処理後にデータを取得
  return <ViewItinerary {...data} />;
}
