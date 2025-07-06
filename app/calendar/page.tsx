import { Sidebar } from "@/components/sidebar"
import { CalendarView } from "@/components/calendar-view"

export default function CalendarPage() {
  return (
    <div className="flex min-h-screen gradient-bg">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <CalendarView />
      </main>
    </div>
  )
}
