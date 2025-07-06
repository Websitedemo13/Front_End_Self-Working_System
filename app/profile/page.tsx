import { Sidebar } from "@/components/sidebar"
import { ProfileView } from "@/components/profile-view"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen gradient-bg">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <ProfileView />
      </main>
    </div>
  )
}
