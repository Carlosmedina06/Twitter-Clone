import Feed from '@/components/Feed/Feed'
import Sidebar from '@/components/Sidebar/Sidebar'

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-[1500px] mx-auto">
      <Sidebar />
      <Feed />
    </main>
  )
}
