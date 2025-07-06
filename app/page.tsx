import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Dashboard />
      </main>
    </div>
  )
}
