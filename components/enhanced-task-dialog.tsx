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
import { User, Link, FileText, Percent } from "lucide-react"

interface EnhancedTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  spaceName: string
}

export function EnhancedTaskDialog({ open, onOpenChange, spaceName }: EnhancedTaskDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    clientName: "",
    clientContact: "",
    workLink: "",
    progress: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ ...formData, space: spaceName })

    // Reset form
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      clientName: "",
      clientContact: "",
      workLink: "",
      progress: 0,
    })
    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Tạo Công Việc Mới
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
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
                <Label htmlFor="priority">Độ ưu tiên</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">🟢 Thấp</SelectItem>
                    <SelectItem value="medium">🟡 Trung bình</SelectItem>
                    <SelectItem value="high">🔴 Cao</SelectItem>
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
          </div>

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
                  placeholder="Tên công ty hoặc cá nhân..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="clientContact">Thông tin liên hệ</Label>
                <Input
                  id="clientContact"
                  value={formData.clientContact}
                  onChange={(e) => handleInputChange("clientContact", e.target.value)}
                  placeholder="Email, SĐT, hoặc thông tin khác..."
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Work Links & Progress */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Link className="w-4 h-4" />
              Liên kết & Tiến độ
            </h3>
            <div>
              <Label htmlFor="workLink">Đường link công việc</Label>
              <Input
                id="workLink"
                value={formData.workLink}
                onChange={(e) => handleInputChange("workLink", e.target.value)}
                placeholder="Google Drive, Docs, Sheets, GitHub..."
                className="mt-1"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Link đến tài liệu, drive, repository hoặc công cụ làm việc
              </p>
            </div>
            <div>
              <Label htmlFor="progress" className="flex items-center gap-2">
                <Percent className="w-4 h-4" />
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
          </div>

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
              Tạo Công Việc
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
