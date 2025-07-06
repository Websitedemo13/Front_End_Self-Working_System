"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const monthNames = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
]

const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]

// Mock events data
const events = {
  "2024-01-15": [{ title: "Họp team", type: "meeting" }],
  "2024-01-16": [{ title: "Deadline dự án", type: "deadline" }],
  "2024-01-18": [{ title: "Sinh nhật", type: "personal" }],
  "2024-01-20": [{ title: "Khóa học", type: "learning" }],
}

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const today = new Date()

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "deadline":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      case "personal":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
      case "learning":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayEvents = events[dateKey as keyof typeof events] || []
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear()

      days.push(
        <div key={day} className="h-10 flex flex-col items-center justify-center relative group">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
              isToday
                ? "bg-green-500 text-white shadow-lg"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {day}
          </div>
          {dayEvents.length > 0 && (
            <div className="absolute -bottom-1 flex gap-1">
              {dayEvents.slice(0, 2).map((event, idx) => (
                <div key={idx} className={`w-1.5 h-1.5 rounded-full ${getEventColor(event.type).split(" ")[0]}`} />
              ))}
              {dayEvents.length > 2 && <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
            </div>
          )}
          {dayEvents.length > 0 && (
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none min-w-[120px]">
              {dayEvents.map((event, idx) => (
                <div key={idx} className="text-xs text-gray-700 dark:text-gray-300 mb-1 last:mb-0">
                  {event.title}
                </div>
              ))}
            </div>
          )}
        </div>,
      )
    }

    return days
  }

  return (
    <Card className="glass-effect border-0 card-hover">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-lg">Lịch</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[100px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="h-8 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          >
            Họp
          </Badge>
          <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
            Deadline
          </Badge>
          <Badge
            variant="secondary"
            className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
          >
            Cá nhân
          </Badge>
          <Badge
            variant="secondary"
            className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
          >
            Học tập
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
