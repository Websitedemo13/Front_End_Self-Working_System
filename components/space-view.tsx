"use client"

import { useState } from "react"
import { Plus, Search, List, Kanban, Calendar, Target, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClickUpTaskCard } from "@/components/clickup-task-card"
import { ClickUpTaskDialog } from "@/components/clickup-task-dialog"

const spaceData = {
  "cong-ty": {
    name: "Công ty",
    tasks: [
      {
        id: "1",
        title: "Hoàn thành báo cáo tháng",
        description: "Tổng hợp và phân tích dữ liệu kinh doanh tháng 12, chuẩn bị báo cáo cho ban lãnh đạo",
        status: "in-progress",
        priority: "high",
        progress: 75,
        dueDate: "2024-01-15",
        createdDate: "2024-01-01",
        assignee: {
          name: "Quách Thành Long",
          email: "quachthanhlong@example.com",
          avatar: "",
        },
        client: {
          name: "Nguyễn Văn A",
          company: "ABC Corp",
          email: "nguyenvana@abc.com",
          phone: "+84 123 456 789",
        },
        workLinks: [
          {
            type: "sheets",
            url: "https://docs.google.com/spreadsheets/d/abc123",
            title: "Báo cáo dữ liệu tháng 12",
          },
          {
            type: "docs",
            url: "https://docs.google.com/document/d/def456",
            title: "Template báo cáo",
          },
        ],
        tags: ["báo cáo", "kinh doanh", "tháng 12"],
        timeTracked: 180,
        estimatedTime: 240,
        comments: 3,
        attachments: 2,
      },
      {
        id: "2",
        title: "Phát triển tính năng mới",
        description: "Xây dựng module quản lý khách hàng cho hệ thống CRM",
        status: "todo",
        priority: "medium",
        progress: 0,
        dueDate: "2024-01-20",
        createdDate: "2024-01-05",
        assignee: {
          name: "Quách Thành Long",
          email: "quachthanhlong@example.com",
          avatar: "",
        },
        client: {
          name: "Trần Thị B",
          company: "XYZ Ltd",
          email: "tranthib@xyz.com",
          phone: "+84 987 654 321",
        },
        workLinks: [
          {
            type: "github",
            url: "https://github.com/company/crm-project",
            title: "CRM Project Repository",
          },
          {
            type: "figma",
            url: "https://figma.com/design/crm-ui",
            title: "CRM UI Design",
          },
        ],
        tags: ["development", "crm", "frontend"],
        timeTracked: 0,
        estimatedTime: 480,
        comments: 1,
        attachments: 0,
      },
    ],
  },
  "du-an-ngoai": {
    name: "Dự án ngoài",
    tasks: [
      {
        id: "3",
        title: "Thiết kế website portfolio",
        description: "Tạo website portfolio cá nhân với React và Next.js",
        status: "in-progress",
        priority: "medium",
        progress: 60,
        dueDate: "2024-01-25",
        createdDate: "2024-01-10",
        assignee: {
          name: "Quách Thành Long",
          email: "quachthanhlong@example.com",
          avatar: "",
        },
        client: {
          name: "Cá nhân",
          company: "Freelance",
          email: "personal@example.com",
          phone: "+84 123 456 789",
        },
        workLinks: [
          {
            type: "github",
            url: "https://github.com/personal/portfolio",
            title: "Portfolio Repository",
          },
          {
            type: "drive",
            url: "https://drive.google.com/folder/portfolio-assets",
            title: "Portfolio Assets",
          },
        ],
        tags: ["portfolio", "react", "nextjs", "personal"],
        timeTracked: 300,
        estimatedTime: 500,
        comments: 0,
        attachments: 5,
      },
    ],
  },
  "hoc-tap": {
    name: "Học tập",
    tasks: [
      {
        id: "4",
        title: "Hoàn thành khóa học React Advanced",
        description: "Học các concept nâng cao của React: Context, Hooks, Performance Optimization",
        status: "in-progress",
        priority: "low",
        progress: 40,
        dueDate: "2024-02-01",
        createdDate: "2024-01-01",
        assignee: {
          name: "Quách Thành Long",
          email: "quachthanhlong@example.com",
          avatar: "",
        },
        client: {
          name: "Udemy",
          company: "Online Learning",
          email: "support@udemy.com",
          phone: "",
        },
        workLinks: [
          {
            type: "other",
            url: "https://udemy.com/course/react-advanced",
            title: "React Advanced Course",
          },
          {
            type: "docs",
            url: "https://docs.google.com/document/d/learning-notes",
            title: "Ghi chú học tập",
          },
        ],
        tags: ["learning", "react", "javascript", "frontend"],
        timeTracked: 120,
        estimatedTime: 300,
        comments: 2,
        attachments: 1,
      },
    ],
  },
}

type ViewMode = "list" | "kanban" | "calendar"

export function SpaceView({ slug }: { slug: string }) {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [tasks, setTasks] = useState(spaceData[slug as keyof typeof spaceData]?.tasks || [])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const space = spaceData[slug as keyof typeof spaceData]

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

  const getTasksForDate = (date: string) => {
    return tasks.filter((task) => task.dueDate === date)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const today = new Date()
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayTasks = getTasksForDate(dateKey)
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear()

      days.push(
        <div
          key={day}
          className="calendar-day"
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        >
          <div
            className={`text-xs sm:text-sm font-medium mb-1 ${
              isToday ? "text-green-600 dark:text-green-400 font-bold" : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {day}
          </div>
          <div className="space-y-1 overflow-hidden">
            {dayTasks.slice(0, 3).map((task, idx) => (
              <div
                key={idx}
                className={`calendar-event ${
                  task.priority === "high"
                    ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300"
                    : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300"
                      : "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300"
                }`}
              >
                <div className="font-medium truncate">{task.title}</div>
              </div>
            ))}
            {dayTasks.length > 3 && (
              <div className="text-xs text-gray-500 dark:text-gray-400">+{dayTasks.length - 3}</div>
            )}
          </div>
        </div>,
      )
    }

    return days
  }

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

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleTaskSave = (taskData: any) => {
    if (editingTask) {
      setTasks((prev) => prev.map((task) => (task.id === taskData.id ? taskData : task)))
    } else {
      setTasks((prev) => [...prev, taskData])
    }
    setEditingTask(null)
  }

  const handleTaskEdit = (task: any) => {
    setEditingTask(task)
    setIsTaskDialogOpen(true)
  }

  const handleTaskDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const handleStatusChange = (taskId: string, status: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status, progress: status === "done" ? 100 : task.progress } : task,
      ),
    )
  }

  const handleProgressChange = (taskId: string, progress: number) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, progress } : task)))
  }

  const renderListView = () => (
    <div className="space-y-4">
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <List className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Chưa có công việc nào</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Hãy tạo công việc đầu tiên của bạn</p>
          <Button
            onClick={() => {
              setEditingTask(null)
              setIsTaskDialogOpen(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Tạo Công Việc Mới
          </Button>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <ClickUpTaskCard
            key={task.id}
            task={task}
            onEdit={handleTaskEdit}
            onDelete={handleTaskDelete}
            onStatusChange={handleStatusChange}
            onProgressChange={handleProgressChange}
          />
        ))
      )}
    </div>
  )

  const renderKanbanView = () => {
    const todoTasks = filteredTasks.filter((task) => task.status === "todo")
    const inProgressTasks = filteredTasks.filter((task) => task.status === "in-progress")
    const reviewTasks = filteredTasks.filter((task) => task.status === "review")
    const doneTasks = filteredTasks.filter((task) => task.status === "done")

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 overflow-x-auto">
        {/* Todo Column */}
        <div className="kanban-column space-y-4 min-w-[280px]">
          <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Cần làm</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">{todoTasks.length}</span>
          </div>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto">
            {todoTasks.map((task) => (
              <ClickUpTaskCard
                key={task.id}
                task={task}
                onEdit={handleTaskEdit}
                onDelete={handleTaskDelete}
                onStatusChange={handleStatusChange}
                onProgressChange={handleProgressChange}
              />
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="kanban-column space-y-4 min-w-[280px]">
          <div className="flex items-center justify-between p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Đang làm</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">{inProgressTasks.length}</span>
          </div>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto">
            {inProgressTasks.map((task) => (
              <ClickUpTaskCard
                key={task.id}
                task={task}
                onEdit={handleTaskEdit}
                onDelete={handleTaskDelete}
                onStatusChange={handleStatusChange}
                onProgressChange={handleProgressChange}
              />
            ))}
          </div>
        </div>

        {/* Review Column */}
        <div className="kanban-column space-y-4 min-w-[280px]">
          <div className="flex items-center justify-between p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Review</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">{reviewTasks.length}</span>
          </div>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto">
            {reviewTasks.map((task) => (
              <ClickUpTaskCard
                key={task.id}
                task={task}
                onEdit={handleTaskEdit}
                onDelete={handleTaskDelete}
                onStatusChange={handleStatusChange}
                onProgressChange={handleProgressChange}
              />
            ))}
          </div>
        </div>

        {/* Done Column */}
        <div className="kanban-column space-y-4 min-w-[280px]">
          <div className="flex items-center justify-between p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Hoàn thành</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">{doneTasks.length}</span>
          </div>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto">
            {doneTasks.map((task) => (
              <ClickUpTaskCard
                key={task.id}
                task={task}
                onEdit={handleTaskEdit}
                onDelete={handleTaskDelete}
                onStatusChange={handleStatusChange}
                onProgressChange={handleProgressChange}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderCalendarView = () => {
    return (
      <div className="space-y-6">
        {/* Calendar Header */}
        <div className="glass-effect rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
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

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-0 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="h-8 flex items-center justify-center text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="calendar-grid">{renderCalendar()}</div>
        </div>

        {/* Selected date details */}
        {selectedDate && (
          <div className="glass-effect rounded-2xl p-4 sm:p-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {selectedDate.toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h4>
            <div className="space-y-3">
              {getTasksForDate(
                formatDateKey(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()),
              ).map((task) => (
                <ClickUpTaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleTaskEdit}
                  onDelete={handleTaskDelete}
                  onStatusChange={handleStatusChange}
                  onProgressChange={handleProgressChange}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (!space) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Target className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Không tìm thấy không gian này</h3>
          <p className="text-gray-500 dark:text-gray-400">Vui lòng kiểm tra lại đường dẫn</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="glass-effect rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:!text-white line-clamp-1">
                  {space.name}
                </h1>
                <p className="text-gray-600 dark:!text-gray-300 mt-2 text-sm sm:text-base">
                  {tasks.length} công việc • {tasks.filter((t) => t.status === "done").length} hoàn thành
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <Button
                  onClick={() => {
                    setEditingTask(null)
                    setIsTaskDialogOpen(true)
                  }}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/25 flex-1 sm:flex-none text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Công Việc Mới</span>
                  <span className="sm:hidden">Mới</span>
                </Button>

                <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-xl p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`h-8 w-8 p-0 ${viewMode === "list" ? "bg-green-500 hover:bg-green-600" : ""}`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "kanban" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("kanban")}
                    className={`h-8 w-8 p-0 ${viewMode === "kanban" ? "bg-green-500 hover:bg-green-600" : ""}`}
                  >
                    <Kanban className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "calendar" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("calendar")}
                    className={`h-8 w-8 p-0 ${viewMode === "calendar" ? "bg-green-500 hover:bg-green-600" : ""}`}
                  >
                    <Calendar className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="glass-effect rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm công việc..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="todo">Cần làm</SelectItem>
                    <SelectItem value="in-progress">Đang làm</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="done">Hoàn thành</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50">
                    <SelectValue placeholder="Độ ưu tiên" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="urgent">Khẩn cấp</SelectItem>
                    <SelectItem value="high">Cao</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="low">Thấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {viewMode === "list" && renderListView()}
          {viewMode === "kanban" && renderKanbanView()}
          {viewMode === "calendar" && renderCalendarView()}
        </div>

        <ClickUpTaskDialog
          open={isTaskDialogOpen}
          onOpenChange={setIsTaskDialogOpen}
          spaceName={space.name}
          task={editingTask}
          onSave={handleTaskSave}
        />
      </div>
    </div>
  )
}
