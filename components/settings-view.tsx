"use client"

import { useState } from "react"
import { Settings, Bell, Shield, Palette, Database, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function SettingsView() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      desktop: false,
      taskReminders: true,
      dailyDigest: true,
    },
    appearance: {
      theme: "system",
      language: "vi",
      compactMode: false,
      animations: true,
    },
    privacy: {
      profileVisible: true,
      activityTracking: true,
      dataCollection: false,
    },
    productivity: {
      pomodoroLength: 25,
      shortBreak: 5,
      longBreak: 15,
      autoStartBreaks: false,
      soundEnabled: true,
    },
  })

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Cài đặt</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Tùy chỉnh trải nghiệm Life OS của bạn</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Notifications */}
          <Card className="glass-effect border-0 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-500" />
                Thông báo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Thông báo email</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Nhận thông báo qua email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => updateSetting("notifications", "email", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Thông báo đẩy</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Thông báo trên trình duyệt</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => updateSetting("notifications", "push", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="task-reminders">Nhắc nhở công việc</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Nhắc nhở khi công việc sắp đến hạn</p>
                </div>
                <Switch
                  id="task-reminders"
                  checked={settings.notifications.taskReminders}
                  onCheckedChange={(checked) => updateSetting("notifications", "taskReminders", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="daily-digest">Tóm tắt hàng ngày</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Báo cáo tiến độ cuối ngày</p>
                </div>
                <Switch
                  id="daily-digest"
                  checked={settings.notifications.dailyDigest}
                  onCheckedChange={(checked) => updateSetting("notifications", "dailyDigest", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="glass-effect border-0 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-purple-500" />
                Giao diện
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="theme">Chủ đề</Label>
                  <Select
                    value={settings.appearance.theme}
                    onValueChange={(value) => updateSetting("appearance", "theme", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Sáng</SelectItem>
                      <SelectItem value="dark">Tối</SelectItem>
                      <SelectItem value="system">Theo hệ thống</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Ngôn ngữ</Label>
                  <Select
                    value={settings.appearance.language}
                    onValueChange={(value) => updateSetting("appearance", "language", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compact-mode">Chế độ thu gọn</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Giảm khoảng cách giữa các phần tử</p>
                </div>
                <Switch
                  id="compact-mode"
                  checked={settings.appearance.compactMode}
                  onCheckedChange={(checked) => updateSetting("appearance", "compactMode", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="animations">Hiệu ứng động</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Bật/tắt các hiệu ứng chuyển động</p>
                </div>
                <Switch
                  id="animations"
                  checked={settings.appearance.animations}
                  onCheckedChange={(checked) => updateSetting("appearance", "animations", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="glass-effect border-0 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-500" />
                Quyền riêng tư
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profile-visible">Hồ sơ công khai</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cho phép người khác xem hồ sơ của bạn</p>
                </div>
                <Switch
                  id="profile-visible"
                  checked={settings.privacy.profileVisible}
                  onCheckedChange={(checked) => updateSetting("privacy", "profileVisible", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="activity-tracking">Theo dõi hoạt động</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Lưu lại lịch sử hoạt động để cải thiện trải nghiệm
                  </p>
                </div>
                <Switch
                  id="activity-tracking"
                  checked={settings.privacy.activityTracking}
                  onCheckedChange={(checked) => updateSetting("privacy", "activityTracking", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Productivity */}
          <Card className="glass-effect border-0 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-orange-500" />
                Năng suất
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="pomodoro-length">Thời gian học (phút)</Label>
                  <Select
                    value={settings.productivity.pomodoroLength.toString()}
                    onValueChange={(value) => updateSetting("productivity", "pomodoroLength", Number.parseInt(value))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 phút</SelectItem>
                      <SelectItem value="25">25 phút</SelectItem>
                      <SelectItem value="30">30 phút</SelectItem>
                      <SelectItem value="45">45 phút</SelectItem>
                      <SelectItem value="60">60 phút</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="short-break">Nghỉ ngắn (phút)</Label>
                  <Select
                    value={settings.productivity.shortBreak.toString()}
                    onValueChange={(value) => updateSetting("productivity", "shortBreak", Number.parseInt(value))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 phút</SelectItem>
                      <SelectItem value="5">5 phút</SelectItem>
                      <SelectItem value="10">10 phút</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="long-break">Nghỉ dài (phút)</Label>
                  <Select
                    value={settings.productivity.longBreak.toString()}
                    onValueChange={(value) => updateSetting("productivity", "longBreak", Number.parseInt(value))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 phút</SelectItem>
                      <SelectItem value="20">20 phút</SelectItem>
                      <SelectItem value="30">30 phút</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-start-breaks">Tự động bắt đầu nghỉ</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tự động chuyển sang giờ nghỉ khi hết thời gian học
                  </p>
                </div>
                <Switch
                  id="auto-start-breaks"
                  checked={settings.productivity.autoStartBreaks}
                  onCheckedChange={(checked) => updateSetting("productivity", "autoStartBreaks", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sound-enabled">Âm thanh thông báo</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phát âm thanh khi hết thời gian</p>
                </div>
                <Switch
                  id="sound-enabled"
                  checked={settings.productivity.soundEnabled}
                  onCheckedChange={(checked) => updateSetting("productivity", "soundEnabled", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              <Database className="w-4 h-4 mr-2" />
              Lưu cài đặt
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
