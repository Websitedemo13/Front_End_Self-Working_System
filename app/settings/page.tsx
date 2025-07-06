import { Sidebar } from "@/components/sidebar"
import { SettingsView } from "@/components/settings-view"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen gradient-bg">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <SettingsView />
      </main>
    </div>
  )
}
