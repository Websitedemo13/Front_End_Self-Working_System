"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, Rocket, GraduationCap, Plus, User, LogOut, Settings, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { LiveClock } from "@/components/live-clock"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const spaces = [
  { id: "1", name: "Công ty", icon: Briefcase, href: "/space/cong-ty", color: "bg-blue-500" },
  { id: "2", name: "Dự án ngoài", icon: Rocket, href: "/space/du-an-ngoai", color: "bg-purple-500" },
  { id: "3", name: "Học tập", icon: GraduationCap, href: "/space/hoc-tap", color: "bg-orange-500" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-[320px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col shadow-xl">
      {/* Logo & Clock */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Life OS
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Hệ Điều Hành Cuộc Sống</p>
          </div>
          <ThemeToggle />
        </div>
        <LiveClock />
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6">
        {/* Dashboard */}
        <div>
          <Link
            href="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
              pathname === "/"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
            }`}
          >
            <div className={`p-2 rounded-lg ${pathname === "/" ? "bg-white/20" : "bg-green-100 dark:bg-green-900/30"}`}>
              <Home className="w-4 h-4" />
            </div>
            <span>Hôm nay</span>
            {pathname === "/" && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />}
          </Link>
        </div>

        {/* Spaces */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Không Gian
            </h3>
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-green-100 dark:hover:bg-green-900/30">
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          <div className="space-y-2">
            {spaces.map((space) => {
              const Icon = space.icon
              const isActive = pathname === space.href
              return (
                <Link
                  key={space.id}
                  href={space.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? "bg-white/20" : `${space.color}/10`}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{space.name}</span>
                  {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start p-3 h-auto hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="relative">
                  <Avatar className="w-10 h-10 ring-2 ring-green-500/20">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white font-semibold">
                      QTL
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Quách Thành Long</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">IT & Business</p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 glass-effect">
            <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white font-semibold">
                    QTL
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Quách Thành Long</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">IT & Business</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Sinh: 13/07/2003</p>
                </div>
              </div>
            </div>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center w-full">
                <User className="w-4 h-4 mr-3" />
                Hồ sơ cá nhân
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center w-full">
                <Settings className="w-4 h-4 mr-3" />
                Cài đặt
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/calendar" className="flex items-center w-full">
                <Calendar className="w-4 h-4 mr-3" />
                Lịch cá nhân
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
              <LogOut className="w-4 h-4 mr-3" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
