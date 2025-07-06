"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Link, FileText, Percent, Tag, Plus, X } from "lucide-react"

interface ClickUpTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  spaceName: string
  task?: any
  onSave: (taskData: any) => void
}

export function ClickUpTaskDialog({ open, onOpenChange, spaceName, task, onSave }: ClickUpTaskDialogProps) {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    status: task?.status || "todo",
    progress: task?.progress || 0,
    dueDate: task?.dueDate || "",
    estimatedTime: task?.estimatedTime || 60,

    // Client info
    clientName: task?.client?.name || "",
    clientCompany: task?.client?.company || "",
    clientEmail: task?.client?.email || "",
    clientPhone: task?.client?.phone || "",

    // Work links
    workLinks: task?.workLinks || [],

    // Tags
    tags: task?.tags || [],
    newTag: "",

    // Assignee
    assigneeName: task?.assignee?.name || "Quách Thành Long",
    assigneeEmail: task?.assignee?.email || "quachthanhlong@example.com",
  })

  const [newLink, setNewLink] = useState({ type: "drive", url: "", title: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const taskData = {
      id: task?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      progress: formData.progress,
      dueDate: formData.dueDate,
      createdDate: task?.createdDate || new Date().toISOString(),
      estimatedTime: formData.estimatedTime,
      timeTracked: task?.timeTracked || 0,

      assignee: {
        name: formData.assigneeName,
        email: formData.assigneeEmail,
        avatar: task?.assignee?.avatar,
      },

      client: {
        name: formData.clientName,
        company: formData.clientCompany,
        email: formData.clientEmail,
        phone: formData.clientPhone,
      },

      workLinks: formData.workLinks,
      tags: formData.tags,
      comments: task?.comments || 0,
      attachments: task?.attachments || 0,
      space: spaceName,
    }

    onSave(taskData)
    onOpenChange(false)

    // Reset form if creating new task
    if (!task) {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        progress: 0,
        dueDate: "",
        estimatedTime: 60,
        clientName: "",
        clientCompany: "",
        clientEmail: "",
        clientPhone: "",
        workLinks: [],
        tags: [],
        newTag: "",
        assigneeName: "Quách Thành Long",
        assigneeEmail: "quachthanhlong@example.com",
      })
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addWorkLink = () => {
    if (newLink.url && newLink.title) {
      setFormData((prev) => ({
        ...prev,
        workLinks: [...prev.workLinks, { ...newLink }],
      }))
      setNewLink({ type: "drive", url: "", title: "" })
    }
  }

  const removeWorkLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      workLinks: prev.workLinks.filter((_, i) => i !== index),
    }))
  }

  const addTag = () => {
    if (formData.newTag && !formData.tags.includes(formData.newTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag],
        newTag: "",
      }))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {task ? "Chỉnh sửa công việc" : "Tạo công việc mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Thông tin cơ bản
            </h3>

            <div>
              <Label htmlFor="title">Tiêu đề công việc *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Nhập tiêu đề công việc..."
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Mô tả chi tiết</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Mô tả chi tiết về công việc..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="priority">Độ ưu tiên</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">🟢 Thấp</SelectItem>
                    <SelectItem value="medium">🟡 Trung bình</SelectItem>
                    <SelectItem value="high">🟠 Cao</SelectItem>
                    <SelectItem value="urgent">🔴 Khẩn cấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">📋 Cần làm</SelectItem>
                    <SelectItem value="in-progress">⚡ Đang làm</SelectItem>
                    <SelectItem value="review">👀 Review</SelectItem>
                    <SelectItem value="done">✅ Hoàn thành</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dueDate">Ngày hết hạn</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Progress & Time */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Tiến độ & Thời gian
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="progress" className="flex items-center gap-2">
                  Tiến độ hiện tại: {formData.progress}%
                </Label>
                <div className="mt-2 space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={formData.progress}
                    onChange={(e) => handleInputChange("progress", Number.parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <Progress value={formData.progress} className="h-2" />
                </div>
              </div>

              <div>
                <Label htmlFor="estimatedTime">Thời gian ước tính (phút)</Label>
                <Input
                  id="estimatedTime"
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) => handleInputChange("estimatedTime", Number.parseInt(e.target.value) || 60)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Client Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" />
              Thông tin khách hàng
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientName">Tên khách hàng</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
                  placeholder="Tên khách hàng..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="clientCompany">Công ty</Label>
                <Input
                  id="clientCompany"
                  value={formData.clientCompany}
                  onChange={(e) => handleInputChange("clientCompany", e.target.value)}
                  placeholder="Tên công ty..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="clientEmail">Email</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                  placeholder="email@example.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="clientPhone">Số điện thoại</Label>
                <Input
                  id="clientPhone"
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange("clientPhone", e.target.value)}
                  placeholder="+84 123 456 789"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Work Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Link className="w-4 h-4" />
              Liên kết công việc
            </h3>

            {/* Add new link */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <Select value={newLink.type} onValueChange={(value) => setNewLink((prev) => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drive">🗂️ Google Drive</SelectItem>
                  <SelectItem value="docs">📄 Google Docs</SelectItem>
                  <SelectItem value="sheets">📊 Google Sheets</SelectItem>
                  <SelectItem value="github">🐙 GitHub</SelectItem>
                  <SelectItem value="figma">🎨 Figma</SelectItem>
                  <SelectItem value="other">🔗 Khác</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Tiêu đề..."
                value={newLink.title}
                onChange={(e) => setNewLink((prev) => ({ ...prev, title: e.target.value }))}
              />

              <Input
                placeholder="URL..."
                value={newLink.url}
                onChange={(e) => setNewLink((prev) => ({ ...prev, url: e.target.value }))}
              />

              <Button type="button" onClick={addWorkLink} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Existing links */}
            {formData.workLinks.length > 0 && (
              <div className="space-y-2">
                {formData.workLinks.map((link, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-lg">{getLinkIcon(link.type)}</span>
                    <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{link.title}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWorkLink(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Nhãn
            </h3>

            <div className="flex gap-2">
              <Input
                placeholder="Thêm nhãn..."
                value={formData.newTag}
                onChange={(e) => handleInputChange("newTag", e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(tag)}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Space Info */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Không gian</Label>
            <div className="mt-1 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
              >
                {spaceName}
              </Badge>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              {task ? "Cập nhật" : "Tạo công việc"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
