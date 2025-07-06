"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

const dayNames = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
const dayNamesShort = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]

// Mock events data
const mockEvents = {
  "2024-01-15": [
    { id: "1", title: "Họp team weekly", time: "09:00", type: "meeting", location: "Phòng họp A" },
    { id: "2", title: "Review code", time: "14:00", type: "work", location: "Online" },
  ],
  "2024-01-16": [
    { id: "3", title: "Phỏng vấn ứng viên", time: "10:00", type: "interview", location: "Phòng HR" },
    { id: "4", title: "Deadline dự án X", time: "18:00", type: "deadline", location: "" },
  ],
  "2024-01-18": [{ id: "5", title: "Sinh nhật bạn", time: "19:00", type: "personal", location: "Nhà hàng ABC" }],
  "2024-01-20": [{ id: "6", title: "Khóa học React", time: "09:00", type: "learning", location: "Online" }],
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [events, setEvents] = useState(mockEvents)

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
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
      case "deadline":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700"
      case "personal":
        return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700"
      case "learning":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
      case "work":
        return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const today = new Date()
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 sm:h-32" />)
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
        <div
          key={day}
          className="h-24 sm:h-32 border border-gray-200 dark:border-gray-700 p-1 sm:p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        >
          <div
            className={`text-sm font-medium mb-1 ${
              isToday ? "text-green-600 dark:text-green-400 font-bold" : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event, idx) => (
              <div key={idx} className={`text-xs p-1 rounded border ${getEventColor(event.type)} truncate`}>
                <div className="font-medium">{event.time}</div>
                <div className="truncate">{event.title}</div>
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 p-1">+{dayEvents.length - 3} khác</div>
            )}
          </div>
        </div>,
      )
    }

    return days
  }

  const selectedDateEvents = selectedDate
    ? events[
        formatDateKey(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
        ) as keyof typeof events
      ] || []
    : []

  return (
    <div className="min-h-screen gradient-bg">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Lịch cá nhân</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Quản lý lịch trình và sự kiện của bạn</p>
              </div>
            </div>
            <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm sự kiện
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Tạo sự kiện mới</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="event-title">Tiêu đề</Label>
                    <Input id="event-title" placeholder="Nhập tiêu đề sự kiện..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event-date">Ngày</Label>
                      <Input id="event-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="event-time">Giờ</Label>
                      <Input id="event-time" type="time" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="event-type">Loại sự kiện</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại sự kiện" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Họp</SelectItem>
                        <SelectItem value="work">Công việc</SelectItem>
                        <SelectItem value="personal">Cá nhân</SelectItem>
                        <SelectItem value="learning">Học tập</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="event-location">Địa điểm</Label>
                    <Input id="event-location" placeholder="Nhập địa điểm..." />
                  </div>
                  <div>
                    <Label htmlFor="event-description">Mô tả</Label>
                    <Textarea id="event-description" placeholder="Mô tả chi tiết..." rows={3} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                      Hủy
                    </Button>
                    <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                      Tạo sự kiện
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="xl:col-span-3">
            <Card className="glass-effect border-0 card-hover">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                      Hôm nay
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-0 mb-4">
                  {dayNamesShort.map((day) => (
                    <div
                      key={day}
                      className="h-10 flex items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-0 border border-gray-200 dark:border-gray-700">
                  {renderCalendar()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <Card className="glass-effect border-0 card-hover">
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedDate ? (
                    <>
                      {dayNames[selectedDate.getDay()]}, {selectedDate.getDate()}/{selectedDate.getMonth() + 1}
                    </>
                  ) : (
                    "Chọn ngày"
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  selectedDateEvents.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateEvents.map((event) => (
                        <div key={event.id} className={`p-3 rounded-lg border ${getEventColor(event.type)}`}>
                          <div className="font-medium mb-1">{event.title}</div>
                          <div className="flex items-center gap-2 text-sm mb-1">
                            <Clock className="w-3 h-3" />
                            {event.time}
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      Không có sự kiện nào trong ngày này
                    </p>
                  )
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">Chọn một ngày để xem chi tiết</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="glass-effect border-0 card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Thống kê tháng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tổng sự kiện</span>
                  <Badge variant="secondary">{Object.values(events).flat().length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Cuộc họp</span>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {
                      Object.values(events)
                        .flat()
                        .filter((e) => e.type === "meeting").length
                    }
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Deadline</span>
                  <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                    {
                      Object.values(events)
                        .flat()
                        .filter((e) => e.type === "deadline").length
                    }
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
