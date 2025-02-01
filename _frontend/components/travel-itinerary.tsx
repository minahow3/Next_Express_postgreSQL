'use client'

import React, { useState, useEffect } from "react"
import Image from 'next/image'
import { motion, AnimatePresence } from "framer-motion"
import { useIntl } from 'react-intl'
import { useLanguage } from '@/components/LanguageProvider'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronUp, ChevronDown, Plus, MapPin, Clock, Car, Train, Home, Building, Utensils, Camera, Landmark, Share, Save } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { ShareDialog } from './share-dialog'

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

export default function TravelItinerary() {
  const intl = useIntl()
  const { locale, setLocale } = useLanguage()
  const [currentDay, setCurrentDay] = useState("1")
  const [itinerary, setItinerary] = useState<Record<string, DayItinerary>>({
    "1": {
      sets: [
        { id: "1", location: "xx旅館", transport: "0分", time: "9:00", transportType: 'car', locationType: 'home', showTransport: true, imageUrl: "/placeholder.svg?height=128&width=128" },
        { id: "2", location: "xx場所", transport: "30分", time: "11:00", transportType: 'train', locationType: 'sightseeing', showTransport: true, imageUrl: "/placeholder.svg?height=128&width=128" },
        { id: "3", location: "xx場所", transport: "15分", time: "13:00", transportType: 'walk', locationType: 'restaurant', showTransport: true, imageUrl: "/placeholder.svg?height=128&width=128" },
      ]
    }
  })
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
  const [travelDetails, setTravelDetails] = useState<TravelDetails>({
    title: "○○○○旅行",
    startDate: today,
    endDate: tomorrow
  });
  const [editingTravelDetails, setEditingTravelDetails] = useState<TravelDetails>(travelDetails);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    const dayCount = getDayCount(travelDetails.startDate, travelDetails.endDate);
    const newItinerary: Record<string, DayItinerary> = {};
    for (let i = 1; i <= Math.max(1, dayCount); i++) {
      newItinerary[i.toString()] = itinerary[i.toString()] || { sets: [] };
    }
    setItinerary(newItinerary);
    setCurrentDay("1");
  }, [travelDetails.startDate, travelDetails.endDate]);

  useEffect(() => {
    // クライアントサイドでのみ window オブジェクトにアクセス
    setShareUrl(`${window.location.origin}/view/${encodeURIComponent(travelDetails.title)}`)
  }, [travelDetails.title])

  const addNewSet = () => {
    const newSet: ItinerarySet = {
      id: Date.now().toString(),
      location: intl.formatMessage({ id: 'newLocation' }),
      transport: "0分",
      time: "",
      transportType: 'car',
      locationType: 'building',
      showTransport: true,
      imageUrl: "/placeholder.svg?height=128&width=128"
    }
    setItinerary(prev => ({
      ...prev,
      [currentDay]: {
        sets: [...prev[currentDay].sets, newSet]
      }
    }))
  }

  const updateSet = (index: number, updates: Partial<ItinerarySet>) => {
    setItinerary(prev => ({
      ...prev,
      [currentDay]: {
        sets: prev[currentDay].sets.map((set, i) =>
          i === index ? { ...set, ...updates } : set
        )
      }
    }))
  }

  const moveSet = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= itinerary[currentDay].sets.length) return

    const newSets = [...itinerary[currentDay].sets]
    const [movedItem] = newSets.splice(index, 1)
    newSets.splice(newIndex, 0, movedItem)

    setItinerary(prev => ({
      ...prev,
      [currentDay]: { sets: newSets }
    }))
  }

  const toggleTransportVisibility = (index: number) => {
    updateSet(index, { showTransport: !itinerary[currentDay].sets[index].showTransport })
  }

  const getDayCount = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const timeDiff = endDate.getTime() - startDate.getTime()
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
  }

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

  const handleSave = () => {
    toast({
      title: intl.formatMessage({ id: 'itinerarySaved' })
    })
  }

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen pb-16">
      {/* 言語切り替えボタン */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={() => setLocale(locale === 'ja' ? 'en' : 'ja')}
          variant="outline"
          className="bg-white text-gray-800 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
        >
          {locale === 'ja' ? 'En' : '日'}
        </Button>
      </div>

      {/* ヘッダー画像 */}
      <div className="relative h-96 mb-8 mt-16">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt={intl.formatMessage({ id: 'appTitle' })}
          layout="fill"
          objectFit="cover"
          className="rounded-b-3xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-b-3xl" />
        <Button
          className="absolute bottom-4 right-4 bg-white text-gray-800 hover:bg-gray-100"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                console.log('Selected file:', file.name);
                toast({
                  title: intl.formatMessage({ id: 'changeImage' }),
                  description: `画像が選択されました: ${file.name}`
                });
              }
            };
            input.click();
          }}
        >
          {intl.formatMessage({ id: 'changeImage' })}
        </Button>
      </div>

      {/* タイトルセクション */}
      <div className="px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">{travelDetails.title}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-100 text-gray-800"
              onClick={() => setIsShareDialogOpen(true)}
            >
              <Share className="w-4 h-4 mr-2" />
              {intl.formatMessage({ id: 'shareItinerary' })}
            </Button>
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-100 text-gray-800"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-2" />
              {intl.formatMessage({ id: 'saveItinerary' })}
            </Button>
            <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white hover:bg-gray-100 text-gray-800">
                  {intl.formatMessage({ id: 'travelDetails' })}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>{intl.formatMessage({ id: 'editTravelDetails' })}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      {intl.formatMessage({ id: 'title' })}
                    </Label>
                    <Input
                      id="title"
                      value={editingTravelDetails.title}
                      onChange={(e) => setEditingTravelDetails(prev => ({ ...prev, title: e.target.value }))}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      {intl.formatMessage({ id: 'startDate' })}
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={editingTravelDetails.startDate}
                      onChange={(e) => setEditingTravelDetails(prev => ({ ...prev, startDate: e.target.value }))}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endDate" className="text-right">
                      {intl.formatMessage({ id: 'endDate' })}
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={editingTravelDetails.endDate}
                      onChange={(e) => setEditingTravelDetails(prev => ({ ...prev, endDate: e.target.value }))}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={() => {
                  setTravelDetails(editingTravelDetails);
                  setIsDetailsDialogOpen(false);
                }} className="bg-gray-800 hover:bg-gray-700 text-white">
                  {intl.formatMessage({ id: 'save' })}
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col mb-6">
          {/* 日付範囲 */}
          <div className="flex justify-center items-center mb-4">
            <p className="text-lg text-gray-600">{travelDetails.startDate} ~ {travelDetails.endDate}</p>
          </div>

          {/* 日付セレクター */}
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
                {/* 旅程タイムライン */}
                <div className="space-y-4">
                  <AnimatePresence>
                    {itinerary[day].sets.map((set, index) => (
                      <motion.div
                        key={set.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="overflow-hidden border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-start">
                              {/* 矢印ボタン */}
                              <div className="flex flex-col mr-4">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => moveSet(index, 'up')}
                                  disabled={index === 0}
                                  className="mb-1"
                                >
                                  <ChevronUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => moveSet(index, 'down')}
                                  disabled={index === itinerary[day].sets.length - 1}
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </div>

                              {/* メインコンテンツ */}
                              <div className="flex-1 flex">
                                <div className="flex-1">
                                  <div className="flex flex-col">
                                    <div className="flex items-center mb-2">
                                      {/* 時間 */}
                                      <Input
                                        type="time"
                                        value={set.time}
                                        onChange={(e) => updateSet(index, { time: e.target.value })}
                                        className="w-24 mr-2"
                                      />

                                      {/* 場所タイプと名前 */}
                                      <div className="flex items-center flex-1">
                                        <Select
                                          value={set.locationType}
                                          onValueChange={(value) => updateSet(index, { locationType: value as ItinerarySet['locationType'] })}
                                        >
                                          <SelectTrigger className="w-[120px] mr-2">
                                            <SelectValue placeholder={intl.formatMessage({ id: 'locationType' })} />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="home">{intl.formatMessage({ id: 'home' })}</SelectItem>
                                            <SelectItem value="building">{intl.formatMessage({ id: 'building' })}</SelectItem>
                                            <SelectItem value="restaurant">{intl.formatMessage({ id: 'restaurant' })}</SelectItem>
                                            <SelectItem value="sightseeing">{intl.formatMessage({ id: 'sightseeing' })}</SelectItem>
                                            <SelectItem value="landmark">{intl.formatMessage({ id: 'landmark' })}</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        {getLocationIcon(set.locationType)}
                                        <Input
                                          value={set.location}
                                          onChange={(e) => updateSet(index, { location: e.target.value })}
                                          className="ml-2 flex-1"
                                          placeholder={intl.formatMessage({ id: 'locationName' })}
                                        />
                                      </div>
                                    </div>

                                    {index < itinerary[day].sets.length - 1 && set.showTransport && (
                                      <div className="flex items-center mt-2 ml-[120px]">
                                        {/* 交通手段 */}
                                        <Select
                                          value={set.transportType}
                                          onValueChange={(value) => updateSet(index, { transportType: value as ItinerarySet['transportType'] })}
                                        >
                                          <SelectTrigger className="w-[120px] mr-2">
                                            <SelectValue placeholder={intl.formatMessage({ id: 'transportType' })} />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="car">{intl.formatMessage({ id: 'car' })}</SelectItem>
                                            <SelectItem value="train">{intl.formatMessage({ id: 'train' })}</SelectItem>
                                            <SelectItem value="walk">{intl.formatMessage({ id: 'walk' })}</SelectItem>
                                          </SelectContent>
                                        </Select>

                                        {/* 交通手段アイコンと時間 */}
                                        <div className="flex items-center flex-1 mr-2">
                                          {getTransportIcon(set.transportType)}
                                          <Input
                                            value={set.transport}
                                            onChange={(e) => updateSet(index, { transport: e.target.value })}
                                            placeholder={intl.formatMessage({ id: 'travelTime' })}
                                            className="ml-2 w-24"
                                          />
                                        </div>
                                      </div>
                                    )}

                                    {index < itinerary[day].sets.length - 1 && (
                                      <div className="flex items-center mt-2 ml-[120px]">
                                        {/* チェックボックス */}
                                        <Checkbox
                                          id={`show-transport-${set.id}`}
                                          checked={set.showTransport}
                                          onCheckedChange={() => toggleTransportVisibility(index)}
                                        />
                                        <label
                                          htmlFor={`show-transport-${set.id}`}
                                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                                        >
                                          {intl.formatMessage({ id: 'showTravelTime' })}
                                        </label>
                                      </div>
                                    )}
                                  </div>
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
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* 下部の追加ボタン */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <Button onClick={addNewSet} className="w-full bg-gray-800 hover:bg-gray-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            {intl.formatMessage({ id: 'addNewItem' })}
          </Button>
        </div>
      </div>
      <ShareDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        shareUrl={shareUrl}
      />
    </div>
  )
}

