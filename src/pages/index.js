import { getProviders, getSession, useSession } from 'next-auth/react'

import Feed from '@/components/Feed/Feed'
import Sidebar from '@/components/Sidebar/Sidebar'
import Login from '@/components/Login/Login'
import Modal from '@/components/Modal/Modal'

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession()

  if (!session) return <Login providers={providers} />

  return (
    <main className="flex min-h-screen max-w-[1500px] mx-auto">
      <Sidebar />
      <Feed />
      <Modal />
    </main>
  )
}

export async function getServerSideProps(context) {
  // const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then((res) => res.json())
  // const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then((res) => res.json())
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      // trendingResults,
      // followResults,
      providers,
      session,
    },
  }
}
