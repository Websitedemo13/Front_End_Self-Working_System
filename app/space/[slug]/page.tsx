import { SpaceView } from "@/components/space-view"
import { Sidebar } from "@/components/sidebar"

export default function SpacePage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <SpaceView slug={params.slug} />
      </main>
    </div>
  )
}
