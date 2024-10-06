"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function Home() {
  const [console, setConsole] = useState<"ps4" | "ps5">("ps4")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [isMultiplayer, setIsMultiplayer] = useState(false)
  const [result, setResult] = useState<{ hours: number; minutes: number; cost: number } | null>(null)

  const calculateCost = (e: React.FormEvent) => {
    e.preventDefault()
    const start = new Date(`2000-01-01T${startTime}`)
    const end = new Date(`2000-01-01T${endTime}`)

    // If end time is earlier than start time, assume it's the next day
    if (end < start) {
      end.setDate(end.getDate() + 1)
    }

    const diffMs = end.getTime() - start.getTime()
    const diffMinutes = Math.ceil(diffMs / (1000 * 60)) // Round up to the nearest minute

    let rate
    if (console === "ps4") {
      rate = isMultiplayer ? 20 : 15
    } else {
      rate = isMultiplayer ? 30 : 25
    }

    const minuteRate = rate / 60 // Calculate rate per minute
    const cost = Math.round(diffMinutes * minuteRate) // Round to nearest integer

    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60

    setResult({ hours, minutes, cost })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">PS Time Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={calculateCost} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="console">Select Console</Label>
              <Select value={console} onValueChange={(value: "ps4" | "ps5") => setConsole(value)}>
                <SelectTrigger id="console">
                  <SelectValue placeholder="Select console" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ps4">PS4</SelectItem>
                  <SelectItem value="ps5">PS5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="multiplayer"
                checked={isMultiplayer}
                onCheckedChange={setIsMultiplayer}
              />
              <Label htmlFor="multiplayer">Multiplayer</Label>
            </div>
            <Button type="submit" className="w-full">
              Calculate
            </Button>
          </form>
          {result && (
            <div className="mt-4 p-4">
              <p className="font-bold mb-3">Total cost: {result.cost} EGP</p>
              <p>Time used: {result.hours} hour(s) {result.minutes > 0 ? `${result.minutes} minute(s)` : ''}</p>
              <p>Console: {console.toUpperCase()}</p>
              <p>Mode: {isMultiplayer ? "Multiplayer" : "Single Player"}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}