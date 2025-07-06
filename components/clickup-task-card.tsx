"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  User,
  Link,
  MessageSquare,
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
  Phone,
  Mail,
  Flag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

interface TaskData {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high" | "urgent"
  progress: number
  dueDate: string
  createdDate: string
  assignee: {
    name: string
    avatar?: string
    email: string
  }
  client: {
    name: string
    company: string
    email: string
    phone: string
  }
  workLinks: {
    type: "drive" | "docs" | "sheets" | "github" | "figma" | "other"
    url: string
    title: string
  }[]
  tags: string[]
  timeTracked: number // in minutes
  estimatedTime: number // in minutes
  comments: number
  attachments: number
}

interface ClickUpTaskCardProps {
  task: TaskData
  onEdit: (task: TaskData) => void
  onDelete: (taskId: string) => void
  onStatusChange: (taskId: string, status: TaskData["status"]) => void
  onProgressChange: (taskId: string, progress: number) => void
}

export function ClickUpTaskCard({ task, onEdit, onDelete, onStatusChange, onProgressChange }: ClickUpTaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(task.status === "done")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
      case "in-progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "review":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
      case "done":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const getLinkIcon = (type: string) => {
    switch (type) {
      case "drive":
        return "🗂️"
      case "docs":
        return "📄"
      case "sheets":
        return "📊"
      case "github":
        return "🐙"
      case "figma":
        return "🎨"
      default:
        return "🔗"
    }
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const handleComplete = () => {
    const newStatus = isCompleted ? "todo" : "done"
    setIsCompleted(!isCompleted)
    onStatusChange(task.id, newStatus)
  }

  return (
    <div
      className={`task-card kanban-card ${task.priority === "high" ? "task-priority-high" : task.priority === "medium" ? "task-priority-medium" : "task-priority-low"}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={handleComplete}
            className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 mt-1 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-gray-900 dark:text-white text-sm sm:text-base line-clamp-2 ${isCompleted ? "line-through opacity-60" : ""}`}
            >
              {task.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{task.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Badge className={`${getPriorityColor(task.priority)} text-xs px-1 py-0.5`} variant="secondary">
            <Flag className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
            <span className="hidden sm:inline">{task.priority.toUpperCase()}</span>
            <span className="sm:hidden">{task.priority.charAt(0).toUpperCase()}</span>
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tiến độ</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{task.progress}%</span>
        </div>
        <Progress value={task.progress} className="h-2" />
      </div>

      {/* Client Info */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 sm:p-3 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
          <span className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Khách hàng</span>
        </div>
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
            {task.client.name}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{task.client.company}</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1 min-w-0">
              <Mail className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
              <span className="truncate">{task.client.email}</span>
            </div>
            <div className="flex items-center gap-1 min-w-0">
              <Phone className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
              <span className="truncate">{task.client.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Work Links */}
      {task.workLinks.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Link className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Liên kết</span>
          </div>
          <div className="space-y-1">
            {task.workLinks.slice(0, 2).map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-1.5 sm:p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-w-0"
              >
                <span className="text-sm flex-shrink-0">{getLinkIcon(link.type)}</span>
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">
                  {link.title}
                </span>
                <ExternalLink className="w-2 h-2 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0" />
              </a>
            ))}
            {task.workLinks.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                +{task.workLinks.length - 2} link khác
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-4">
          <Badge className={getStatusColor(task.status)} variant="secondary">
            {task.status === "todo"
              ? "Cần làm"
              : task.status === "in-progress"
                ? "Đang làm"
                : task.status === "review"
                  ? "Review"
                  : "Hoàn thành"}
          </Badge>

          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            {formatTime(task.timeTracked)} / {formatTime(task.estimatedTime)}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <MessageSquare className="w-3 h-3" />
            {task.comments}
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3" />
            {new Date(task.dueDate).toLocaleDateString("vi-VN")}
          </div>

          <Avatar className="w-6 h-6">
            <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-xs bg-gradient-to-br from-green-500 to-blue-500 text-white">
              {task.assignee.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}
