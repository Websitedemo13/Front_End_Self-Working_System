"use client"

import { useState } from "react"
import { User, Mail, Calendar, MapPin, Phone, Edit, Save, X, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function ProfileView() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Quách Thành Long",
    email: "quachthanhlong@example.com",
    phone: "+84 123 456 789",
    birthday: "2003-07-13",
    location: "Hồ Chí Minh, Việt Nam",
    bio: "Passionate IT & Business professional với kinh nghiệm trong phát triển web và quản lý dự án. Luôn tìm kiếm cơ hội học hỏi và phát triển bản thân.",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Project Management", "Business Analysis"],
    experience: "2+ năm kinh nghiệm",
    education: "Đại học Công nghệ Thông tin",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Profile saved:", profile)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original values if needed
  }

  const calculateAge = (birthday: string) => {
    const today = new Date()
    const birthDate = new Date(birthday)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 ring-4 ring-green-500/20">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-2xl font-bold">
                  QTL
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-green-500 hover:bg-green-600"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">IT & Business Professional</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      {calculateAge(profile.birthday)} tuổi
                    </Badge>
                    <Badge variant="secondary">{profile.experience}</Badge>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                  className={
                    !isEditing
                      ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      : ""
                  }
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Hủy
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-effect border-0 card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Thông tin cá nhân
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Họ và tên</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthday">Ngày sinh</Label>
                        <Input
                          id="birthday"
                          type="date"
                          value={profile.birthday}
                          onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="location">Địa chỉ</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bio">Giới thiệu bản thân</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <Button
                      onClick={handleSave}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Lưu thay đổi
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {new Date(profile.birthday).toLocaleDateString("vi-VN")} ({calculateAge(profile.birthday)} tuổi)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{profile.location}</span>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{profile.bio}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Skills & Education */}
          <div className="space-y-6">
            <Card className="glass-effect border-0 card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Kỹ năng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Học vấn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{profile.education}</p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Kinh nghiệm</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{profile.experience}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
